from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.post("/submit")
async def submit_scenario(data: Dict[str, Any]):

    return {
        "success": True,
    }


