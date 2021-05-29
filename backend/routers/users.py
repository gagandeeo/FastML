from fastapi import File, UploadFile, HTTPException, APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import schemas
import models

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post('/user/signin')
def get_user(request: schemas.SignIn, db: Session = Depends(get_db)):
    db_user = db.query(models.UserIn).filter(
        models.UserIn.email == request.email).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User Not Found")
    return {'user': db_user.id}


@router.post('/user/signup')
def create_user(request: schemas.SignUp, db: Session = Depends(get_db)):
    db_user = db.query(models.UserIn).filter(
        models.UserIn.email == request.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail='User already exists')

    db_req = models.UserIn(
        email=request.email, password=request.password, username=request.username)
    db.add(db_req)
    db.commit()
    db.refresh(db_req)

    return {"user": db_req.username}
