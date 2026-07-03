from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.db.database import engine
# from app.db.base import Base
# import app.models.conversation
# from app.models.sib_record import SIBRecord

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Create all database tables on startup
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

#     yield


app = FastAPI(
    title="Voice Recorder API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8132",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    api_router,
    prefix="/api/v1",
)


@app.get("/")
async def root():
    return {
        "message": "Voice Recorder Backend is running!"
    }