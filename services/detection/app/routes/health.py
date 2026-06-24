from fastapi import APIRouter
from app.services.model_service import ModelService

router = APIRouter()

@router.get("/")
async def health():
    return {
        "status": "ok",
        "service": "pdds-detection",
        "model_loaded": ModelService.model is not None,
        "device": str(ModelService.device) if ModelService.device else "unknown",
    }
