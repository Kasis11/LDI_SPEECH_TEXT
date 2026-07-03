from pathlib import Path
from uuid import uuid4
from fastapi import UploadFile
from app.core.config import settings
from app.utils.audio_validator import validate_audio_file


UPLOAD_PATH = Path(settings.UPLOAD_DIR)


UPLOAD_PATH.mkdir(
    parents=True,
    exist_ok=True,
)


async def save_audio(file: UploadFile) -> str:
    """
    Save uploaded audio file and return its path.
    """

    extension = Path(file.filename).suffix

    await validate_audio_file(file)

    filename = f"{uuid4()}{extension}"

    file_path = UPLOAD_PATH / filename

    content = await file.read()

    with open(file_path, "wb") as audio:
        audio.write(content)

    return {
    "filename": filename,
    "file_path": str(file_path),
}