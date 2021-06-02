from typing import Optional
from fastapi import HTTPException, APIRouter, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt

from database import SessionLocal
import schemas
import models

SECRET_KEY = "30844f81b23d1ce68b7c6960dd87092d0e6d3daf6ea15df2d4f1f8decd2532ed"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/test/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(email: str, db: Session = Depends(get_db)):
    user = db.query(models.UserIn).filter(models.UserIn.email == email).first()
    return user


def authenticate_user(email: str, password: str,  db: Session = Depends(get_db)):
    user = get_user(email, db)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    print(to_encode)
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/test/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    resp_user = {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
    }
    return {"user": resp_user, "token": access_token, "token_type": "bearer"}


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # print(token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user(email=token_data.email, db=db)
    if user is None:
        raise credentials_exception
    return user


@router.post('/test/get-user')
def sign_in(request: schemas.SignIn = Depends(get_current_user)):
    return {"username": request.username, "email": request.email}


@router.post('/test/signup')
def create_user(request: schemas.SignUp, db: Session = Depends(get_db)):
    db_user = db.query(models.UserIn).filter(
        models.UserIn.email == request.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail='Email already registered')

    hashed_password = get_password_hash(request.password)

    db_req = models.UserIn(
        email=request.email, password=hashed_password, username=request.username)
    db.add(db_req)
    db.commit()
    db.refresh(db_req)

    return {"user": db_req.username}
