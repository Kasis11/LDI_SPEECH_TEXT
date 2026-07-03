from fastapi import APIRouter

from app.api.v1.voice import router as voice_router
from app.api.v1.chat import router as chat_router
from app.api.v1.excel import router as excel_router
from app.api.v1.scenario import router as submit_scenario

api_router = APIRouter()

api_router.include_router(
    voice_router,
    prefix="/voice",
    tags=["Voice"],
)

api_router.include_router(
    chat_router,
    prefix="/chat",
    tags=["Chat"],
)

api_router.include_router(
    excel_router,
    prefix="/excel",
    tags=["Excel"],
)

api_router.include_router(
    submit_scenario,
    prefix="/scenario",
    tags=["Scenario"],
)