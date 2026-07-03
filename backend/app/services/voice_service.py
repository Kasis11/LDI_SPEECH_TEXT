from fastapi import UploadFile

from app.services.audio_service import save_audio
from app.services.speech_service import transcribe_audio
from app.services.llm_service import extract_scenario_data
# from app.services.conversation_service import save_conversation

async def process_audio(
    file: UploadFile,
):
    """
    Complete audio processing workflow:
    1. Save audio
    2. Transcribe audio
    3. Generate AI assistant reply
    4. Return response
    """

    audio = await save_audio(file)

    transcript = await transcribe_audio(
        audio["file_path"]
    )

    assistant_reply = await extract_scenario_data(transcript)

    # await save_conversation(
    #     db=db,
    #     transcript=transcript,
    #     extracted_answers=assistant_reply,
    # )
    return {
        "success": True,
        "filename": audio["filename"],
        "transcript": transcript,
        "answers": assistant_reply,

        # "assistant_reply": assistant_reply,
    }


