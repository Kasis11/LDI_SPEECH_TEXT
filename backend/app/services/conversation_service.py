import json

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.conversation import Conversation


async def save_conversation(
    db: AsyncSession,
    transcript: str,
    extracted_answers: dict,
):
    conversation = Conversation(
        transcript=transcript,
        extracted_answers=json.dumps(extracted_answers),
    )

    db.add(conversation)

    await db.commit()

    await db.refresh(conversation)

    return conversation