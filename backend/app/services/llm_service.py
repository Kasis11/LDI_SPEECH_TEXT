from openai import AsyncOpenAI
from app.core.config import settings
import json

client = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY
)

SYSTEM_PROMPT = """
You are a Bureau Intelligence extraction engine processing an AML investigator's scenario 
description. Your job is to extract structured data from either a voice transcript or free-form 
text into a precise JSON schema.

EXTRACTION RULES:
1. Extract only what is explicitly stated or strongly implied — do not invent details
2. If a field cannot be determined from the input, return null for that field
3. For bureau_field_tags, return the Bureau Taxonomy field NAMES (not IDs).
Use the official Bureau taxonomy field names exactly as defined.
Do not return field IDs such as S02_F11 or S03_F09.
4. For suggested_typology, only suggest a typology label if the pattern clearly matches one
5. behavioral_indicators: extract up to 5 distinct behavioral observations as an array
6. Keep all text fields concise — one to two sentences maximum per field

BUREAU FIELD MAPPING REFERENCE (most common):
- Structuring / sub-threshold deposits → S02_F06, S02_F07
- Rapid movement of funds → S02_F11
- Layering → S02_F09
- No apparent economic purpose → S02_F15
- High cash activity → S03_F01
- Crypto activity → S03_F09
- Crypto conversion follows wire receipt → S03_F10
- High value wire activity → S03_F04
- Counterparty identity unverifiable → S05_F04
- Third-party payment pattern → S05_F07
- Income inconsistent with activity → S06_F04
- Occupation-activity mismatch → S06_F05
- Source of funds inconsistent → S06_F02
- KYC deficiency → S01_F01
- Adverse media → S01_F11
- Prior suspicious activity history → S09_F04
- SAR not filed or late → S09_F09
- Alert closed without investigation → S09_F12
- Funnel account → S08_F05
- Structuring typology → S08_F01
- Shell company layering → S08_F03
- Fraud proceeds laundering → S08_F06
- Human trafficking indicators → S08_F08
- Terrorist financing → S08_F11
- Crypto on-ramp from proceeds → S08_F12

OUTPUT: Return only valid JSON matching this exact schema. No preamble, no explanation.

{
  "pattern_name": string or null,
  "investigator_role": string or null,
  "business_unit": string or null,
  "product_type": string or null,
  "geography": string or null,
  "customer_type": "individual" | "business" | null,
  "industry": string or null,
  "risk_level": "low" | "medium" | "high" | "critical" | null,
  "confidence_score": integer 1-10 or null,
  "first_seen_date": "YYYY-MM-DD" or null,
  "repeat_frequency": "one-off" | "occasional" | "frequent" | "systematic" | null,
  "trigger_event": string or null,
  "behavioral_indicators": [string, string, ...] (max 5),
  "velocity_pattern": string or null,
  "why_suspicious": string or null,
  "false_positive_differentiation": string or null,
  "escalation_trigger": string or null,
  "key_sequence": string or null,
  "confirming_evidence": string or null,
  "bureau_field_tags": [string, ...] (Bureau field names only)
  "suggested_typology": string or null,
  "notes": string or null
}
"""


# SYSTEM_PROMPT = """
#     You are a helpful assistant.
#     Your job is to have a Conversation with the user based on the provided transcript.
#     You should respond in a friendly and engaging manner, providing relevant information and asking follow-up questions to keep the conversation going.

#     Be polite.
#     Be concise.
#     Ask follow-up questions whenever appropriate.
#     """


async def extract_scenario_data(input_text: str):
    """
    Generate a response based on the provided transcript using GPT-4o.

    Args:
        transcript: The transcript of the user's speech.

    Returns:
        Generated response text.
    """
    response = await client.chat.completions.create(
        model="gpt-4o",
        response_format={
            "type": "json_object"
        },
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": input_text,
            },
        ],
        temperature=0,
    )
    content = response.choices[0].message.content.strip()

    # Remove markdown code fences if present
    if content.startswith("```json"):
        content = content.replace("```json", "", 1)

    if content.startswith("```"):
        content = content.replace("```", "", 1)

    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    try:
        return json.loads(content)

    except json.JSONDecodeError:
        return {
            "error": "LLM returned invalid JSON",
            "raw_response": content,
        }

