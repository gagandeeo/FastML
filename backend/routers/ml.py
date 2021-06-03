from fastapi import File, UploadFile, HTTPException, APIRouter, Form
import aiofiles
from sqlalchemy import sql
from fastapi.responses import FileResponse
from fastapi.params import Depends
from sqlalchemy.orm import Session
from ml.models import hyperparams, train_model, predict_model
from database import SessionLocal
import schemas
import models
from routers.users import oauth2_scheme
from ml import prepare_data

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/test/upload")
async def test_upload(user_id: int = Form(...), file: UploadFile = File(...), token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:

        async with aiofiles.open("./static/data/{}".format(file.filename), "wb") as out_file:
            content = await file.read()
            await out_file.write(content)
        url = str("static/data/"+file.filename)
        db_verify = db.query(models.DataIn).filter(
            models.DataIn.user_id == user_id, models.DataIn.url == url).first()
        if db_verify is None:
            db_request = models.DataIn(
                url=url, user_id=user_id,
            )
            db.add(db_request)
            db.commit()
            db.refresh(db_request)
        else:
            db.query(models.DataIn).filter(models.DataIn.id == db_verify.id).update({
                models.DataIn.url: url,
                models.DataIn.created_at: sql.func.now()
            })
            db.commit()

        return {"Result": url}
    except:
        raise HTTPException(
            status_code=500, detail="Data could not be loaded try again!")


@router.post("/test/select-model/{model_name}", response_model=schemas.HyperParams)
async def test_select_model(request: schemas.SelectModel, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        hyper_params = hyperparams.get_params(request.model_name)
        db_query = db.query(models.DataIn).filter(
            models.DataIn.user_id == request.user_id).order_by(models.DataIn.created_at.desc()).first()
        db_query.model_name = request.model_name
        db.commit()
        return {"hyper_params": hyper_params}
    except:
        raise HTTPException(status_code=500, detail='Try selecting again!')


@router.post("/test/train-model")
async def test_train_model(properties: schemas.TrainModelIn, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        db_query = db.query(models.DataIn).filter(models.DataIn.user_id ==
                                                  properties.user_id).order_by(models.DataIn.created_at.desc()).first()
        ml_model = train_model.TrainModel(
            data=db_query.url, targets=properties.targets, model_name=db_query.model_name, usecols=properties.usecols, index_col=properties.index_col, model_type=properties.model_type)
        ml_model.prepare_data(dropna=properties.dropna, imputer=properties.impute,
                              encoding=properties.encoding, scaling=properties.scaling)
        score, jblib_path = ml_model.train(
            hyperparams=properties.hyper_params, test_size=properties.test_size)
        db.query(models.DataIn).filter(models.DataIn.id ==
                                       db_query.id).update({models.DataIn.temp: jblib_path})
        db.commit()
        db.refresh(db_query)
        return score
    except:
        raise HTTPException(
            status_code=500, detail="Make sure your estimator is compatible with type data (i.e. clasifier/regressor/cluster)")


@router.post("/test/prepare-data")
async def test_upload(properties: schemas.UploadData, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    db_query = db.query(models.DataIn).filter(models.DataIn.user_id ==
                                              properties.user_id).order_by(models.DataIn.created_at.desc()).first()

    prepare_data.PrepareData(db_query.url,
                             properties.dropna).prepare()

    return {"Result": "Done"}


@router.post("/test/predict")
async def predict_data(user_id: int = Form(...), file: UploadFile = File(...), token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        async with aiofiles.open("./static/predict_data/{}".format(file.filename), "wb") as out_file:
            content = await file.read()
            await out_file.write(content)
        url = str("static/predict_data/"+file.filename)

        db_query = db.query(models.DataIn).filter(models.DataIn.user_id ==
                                                  user_id).order_by(models.DataIn.created_at.desc()).first()
        pred_path = predict_model.predict(url, db_query.temp)
        file_name = pred_path.split("/")
        return FileResponse(path=pred_path, filename=file_name[-1])
    except:

        raise HTTPException(
            status_code=500, detail="Make sure your data is in good format")


@router.get("/test/download-model")
async def download_model(request: schemas.DownloadData, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    db_query = db.query(models.DataIn).filter(models.DataIn.user_id ==
                                              request.user_id).order_by(models.DataIn.created_at.desc()).first()
    file_name = db_query.temp.split("/")
    return FileResponse(path=db_query.temp, filename=file_name[-1])
