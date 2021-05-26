from typing import Dict, List, Text, Optional
from fastapi import File, UploadFile
from pydantic import BaseModel
from pydantic.networks import HttpUrl


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
    targets: str
    test_size: float = 0.25
    dropna: bool = True
    impute: Optional[str] = None
    encoding: Optional[str] = None
    scaling: Optional[str] = None


class PredictIn(BaseModel):
    x_data: List[float]
