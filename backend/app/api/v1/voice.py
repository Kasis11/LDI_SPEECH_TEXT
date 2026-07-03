from fastapi import APIRouter, File, UploadFile

from app.services.audio_service import save_audio

router = APIRouter()


@router.get("/health")
async def health():
    return {
        "status": "Backend is running"
    }

from app.schemas.audio_schema import AudioUploadResponse

from app.services.voice_service import process_audio

from fastapi import Depends



@router.post("/upload")
async def upload_audio(
    file: UploadFile = File(...),
):
    return await process_audio(file)