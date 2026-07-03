from sqlalchemy.ext.asyncio import AsyncSession

from app.models.sib_record import SIBRecord


async def save_sib_record(
    db: AsyncSession,
    extracted_data: dict,
) -> SIBRecord:
    """
    Save extracted SIB JSON into the database.
    """

    record = SIBRecord(
        extracted_data=extracted_data,
    )

    db.add(record)

    try:
        await db.commit()
        await db.refresh(record)

    except Exception:
        await db.rollback()
        raise

    return record