from pydantic import BaseModel
from typing import List, Optional


class ScenarioSubmitSchema(BaseModel):
    pattern_name: Optional[str] = None
    investigator_role: Optional[str] = None
    business_unit: Optional[str] = None
    product_type: Optional[str] = None
    geography: Optional[str] = None
    customer_type: Optional[str] = None
    industry: Optional[str] = None
    risk_level: Optional[str] = None
    confidence_score: Optional[int] = None
    first_seen_date: Optional[str] = None
    repeat_frequency: Optional[str] = None
    trigger_event: Optional[str] = None

    behavioral_indicators: List[str] = []

    velocity_pattern: Optional[str] = None
    why_suspicious: Optional[str] = None
    false_positive_differentiation: Optional[str] = None
    escalation_trigger: Optional[str] = None
    key_sequence: Optional[str] = None
    confirming_evidence: Optional[str] = None

    bureau_field_tags: List[str] = []

    suggested_typology: Optional[str] = None
    notes: Optional[str] = None