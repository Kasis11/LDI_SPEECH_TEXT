from pathlib import Path
from fastapi import HTTPException, UploadFile
from app.core.config import settings

async def validate_audio_file(file: UploadFile):
    """
    Validate uploaded audio file.
    """

    extension = Path(file.filename).suffix.lower()

    allowed_extensions = [
        ext.strip().lower()
        for ext in settings.ALLOWED_AUDIO_EXTENSIONS.split(",")
    ]

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}",
        )

    content = await file.read()

    size_mb = len(content) / (1024 * 1024)

    if size_mb > settings.MAX_AUDIO_SIZE_MB:
        raise HTTPException(
            status_code=413,
            detail=f"Maximum upload size is {settings.MAX_AUDIO_SIZE_MB} MB.",
        )

    await file.seek(0)