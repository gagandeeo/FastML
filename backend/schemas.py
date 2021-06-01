from typing import Dict, List, Text, Optional
from pydantic import BaseModel


class SignUp(BaseModel):
    email: str
    password: str
    username: str

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    user_id: int
    email: str

    class Config:
        orm_mode = True


class SignIn(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class SelectModel(BaseModel):
    user_id: int
    model_name: str

    class Config:
        orm_mode = True


class DownloadData(BaseModel):
    user_id: int


class UploadData(BaseModel):
    user_id: int
    dropna: bool


class DataIn(BaseModel):
    temp: str
    url: str
    model_name: str


class HyperParams(BaseModel):
    hyper_params: Optional[Dict] = {}


class TrainModelIn(BaseModel):
    user_id: int
    model_type: int
    hyper_params: Optional[Dict] = {}
    usecols: Optional[str] = None
    index_col: Optional[int] = 10000
    targets: str
    test_size: float = 0.25
    dropna: bool = True
    impute: Optional[str] = None
    encoding: Optional[str] = None
    scaling: Optional[str] = None

    class Config:
        orm_mode = True


class PredictIn(BaseModel):
    x_data: List[float]
