from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import aiofiles
from fastapi.responses import FileResponse
from fastapi.params import Depends
from sqlalchemy.orm import Session
import models
import schemas
from database import SessionLocal, engine
from ml.models import hyperparams, train_model, predict_model
from ml import prepare_data

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def land_page():
    return {"Hello": "World2"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/test/upload")
async def test_upload(file: UploadFile = File(...), db: Session = Depends(get_db)):
    print(type(file))
    async with aiofiles.open("./static/data/{}".format(file.filename), "wb") as out_file:
        content = await file.read()
        await out_file.write(content)
    url = str("static/data/"+file.filename)

    db_request = models.DataIn(
        url=url
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return {"Result": db_request.url}


@app.get("/test/select-model/{model_name}", response_model=schemas.HyperParams)
async def test_select_model(model_name: str, db: Session = Depends(get_db)):
    hyper_params = hyperparams.get_params(model_name)
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()
    db_query.model_name = model_name
    db.commit()
    return {"hyper_params": hyper_params}


@app.post("/test/train-model")
async def test_train_model(properties: schemas.TrainModelIn, db: Session = Depends(get_db)):
    # print(properties)
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()
    ml_model = train_model.TrainModel(
        data=db_query.url, targets=properties.targets, model_name=db_query.model_name, model_type=properties.model_type)
    ml_model.prepare_data(dropna=properties.dropna, imputer=properties.impute,
                          encoding=properties.encoding, scaling=properties.scaling)
    score, jblib_path = ml_model.train(
        hyperparams=properties.hyper_params, test_size=properties.test_size)
    db.query(models.DataIn).filter(models.DataIn.id ==
                                   db_query.id).update({models.DataIn.temp: jblib_path})
    db.commit()
    db.refresh(db_query)
    return score


@app.post("/test/prepare-data")
async def test_upload(properties: schemas.UploadData, db: Session = Depends(get_db)):
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()

    prepare_data.PrepareData(db_query.url,
                             properties.dropna).prepare()

    return {"Result": "Done"}


@app.post("/test/predict")
async def predict_data(test_req: schemas.PredictIn, db: Session = Depends(get_db)):
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()
    res = predict_model.predict(db_query.temp, test_req.x_data)[0]
    return {"prediction": res}


@app.get("/test/download-model")
async def download_model(db: Session = Depends(get_db)):
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()
    file_name = db_query.temp.split("/")
    # return FileResponse(path=db_query.temp, filename=file_name[-1])
    return {'url': db_query.temp}
