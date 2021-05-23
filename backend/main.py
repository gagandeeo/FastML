from typing import Optional
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import aiofiles
from fastapi.params import Depends
from sqlalchemy.orm import Session
import pandas as pd
import models
import schemas
from database import SessionLocal, engine
from ml.models import hyperparams, train_model
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

# app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def land_page():
    return {"Hello": "World2"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @app.post("/upload_data")
# def upload_data(request: schemas.DataIn, db: Session = Depends(get_db)):
#     db_request = models.DataIn(
#         temp=request.temp
#     )
#     db.add(db_request)
#     db.commit()
#     db.refresh(db_request)
#     return {"temp": db_request.temp}


@app.post("/test/upload")
async def test_upload(file: UploadFile = File(...), db: Session = Depends(get_db)):
    print(type(file))
    async with aiofiles.open("./static/{}".format(file.filename), "wb") as out_file:
        content = await file.read()
        await out_file.write(content)
    url = str("static/"+file.filename)

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
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()
    ml_model = train_model.TrainModel(
        data=db_query.url, targets=properties.targets, model_name=db_query.model_name)
    # data=db_query.url, targets=properties.targets, model_name=db_query.model_name)
    score = ml_model.train(properties.hyper_params)
    return {"score": score}


@app.post("/test/prepare-data")
async def test_upload(properties: schemas.UploadData, db: Session = Depends(get_db)):
    db_query = db.query(models.DataIn).order_by(
        models.DataIn.id.desc()).first()

    prepare_data.PrepareData(db_query.url,
                             properties.dropna).prepare()

    return {"Result": "Done"}
