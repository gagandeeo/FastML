from sqlalchemy import Column, String, Integer, DateTime, sql
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.schema import ForeignKey

Base = declarative_base()
metadata = Base.metadata


class UserIn(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    username = Column(String)
    created_at = Column(
        DateTime(timezone=True),
        server_default=sql.func.now(), autoincrement=True,
    )
    user = relationship("DataIn", back_populates="ml_data")


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
    user_id = Column(Integer, ForeignKey('users.id'))
    ml_data = relationship("UserIn", back_populates="user")
