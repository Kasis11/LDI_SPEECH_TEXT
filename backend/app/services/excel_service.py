import os
import tempfile

import pandas as pd
from fastapi import HTTPException, UploadFile

from app.services.llm_service import extract_scenario_data
# from app.services.sib_service import save_sib_record


SKIP_SHEETS = {
    "Instructions",
    "Read Me",
    "AI Prompt Generation",
}


async def process_excel(
    file: UploadFile,
):
    """
    Complete Excel processing workflow.

    1. Validate Excel file
    2. Read all sheets
    3. Convert Excel into plain text
    4. Send text to LLM
    5. Save extracted JSON into DB
    6. Return extracted JSON
    """

    # Validate file type
    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(
            status_code=400,
            detail="Only Excel files are allowed.",
        )

    temp_path = None

    try:
        # Save uploaded Excel temporarily
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".xlsx",
        ) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        # Read all sheets
        sheets = pd.read_excel(
            temp_path,
            sheet_name=None,
        )

        # Convert Excel into structured text
        text = excel_to_text(sheets)

        # Send to LLM
        extracted_data = await extract_scenario_data(text)

        # # Save into database
        # record = await save_sib_record(
        #     db=db,
        #     extracted_data=extracted_data,
        # )

        return {
            "success": True,
            "data": extracted_data,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


def excel_to_text(sheets: dict) -> str:
    """
    Convert all relevant Excel sheets into one structured text block
    for LLM processing.
    """

    sections = []

    for sheet_name, df in sheets.items():

        if sheet_name in SKIP_SHEETS:
            continue

        sections.append(f"\n===== {sheet_name} =====\n")

        df = df.fillna("")

        for _, row in df.iterrows():

            values = []

            for column, value in row.items():

                value = str(value).strip()

                if not value:
                    continue

                # Prevent extremely large cells from bloating prompt
                if len(value) > 2000:
                    value = value[:2000]

                values.append(f"{column}: {value}")

            if values:
                sections.append("\n".join(values))
                sections.append("")

    return "\n".join(sections)