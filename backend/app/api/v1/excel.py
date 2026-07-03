from fastapi import APIRouter, Depends, File, UploadFile
from app.services.excel_service import process_excel

router = APIRouter()


@router.post("/upload")
async def upload_excel(
    file: UploadFile = File(...),
):
    return await process_excel(file)