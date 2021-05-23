from typing import Optional
from sqlalchemy import Column, String, Integer, DateTime, sql
# from sqlalchemy_utils import URLType
from database import Base


class DataIn(Base):
    __tablename__ = 'data_upload'

    id = Column(Integer, primary_key=True, index=True)
    temp = Column(String, nullable=True)
    url = Column(String, nullable=True)
    model_name = Column(String, nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=sql.func.now(), autoincrement=True
    )
