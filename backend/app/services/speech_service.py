from pathlib import Path
from openai import AsyncOpenAI
from app.core.config import settings

client = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY
)

async def transcribe_audio(file_path: str) -> str:
    """
    Convert an audio file into text using GPT-4o Transcribe.

    Args:
        file_path: Path to the saved audio file.

    Returns:
        Transcript text.
    """
    with open(file_path, "rb") as audio_file:
        response = await client.audio.transcriptions.create(
            model="gpt-4o-transcribe",
            file=audio_file,
        )

    return response.text