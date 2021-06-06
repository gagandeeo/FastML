from sqlalchemy import create_engine
import os
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv("../api.env")

user = os.environ["POSTGRES_USER"]
password = os.environ["POSTGRES_PASSWORD"]
server = os.environ["POSTGRES_SERVER"]
port = os.environ["POSTGRES_PORT"]
db = os.environ["POSTGRES_DB"]

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{server}/{db}"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, pool_size=3, max_overflow=0
)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)
