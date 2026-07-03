from fastapi import APIRouter

from app.schemas.chat_schema import ChatRequest
from app.services.chat_service import process_chat

router = APIRouter()


@router.post("/")
async def chat(request: ChatRequest):
    return await process_chat(request.message)