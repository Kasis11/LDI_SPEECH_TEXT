from app.services.llm_service import extract_scenario_data


async def process_chat(message: str):
    reply = await extract_scenario_data(message)

    return {
        "reply": reply,
    }