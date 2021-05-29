from typing import Dict, List, Text, Optional
from pydantic import BaseModel


class SignUp(BaseModel):
    email: str
    password: str
    username: str

    class Config:
        orm_mode = True


class SignIn(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True


# class UserIn(BaseModel):
#     id: int

#     class Config:
#         orm_mode = True


class UploadData(BaseModel):
    dropna: bool
    # targets: str


class DataIn(BaseModel):
    temp: str
    url: str
    model_name: str


class HyperParams(BaseModel):
    hyper_params: Optional[Dict] = {}


class TrainModelIn(BaseModel):
    model_type: int
    hyper_params: Optional[Dict] = {}
    usecols: str
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
