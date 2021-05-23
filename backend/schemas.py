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
    hyper_params: Optional[Dict] = {}
    targets: str
