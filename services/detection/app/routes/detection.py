from fastapi import APIRouter, UploadFile, File, HTTPException, Header
from fastapi.responses import JSONResponse
from typing import List, Optional
import uuid
import logging
from datetime import datetime

from app.services.model_service import ModelService
from app.services.database import Database
from app.services.knowledge_service import KnowledgeService
from app.services.storage_service import StorageService

router = APIRouter()
logger = logging.getLogger(__name__)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
CONFIDENCE_THRESHOLD = 60.0


@router.post("/")
async def detect_disease(
    images: List[UploadFile] = File(..., description="1–4 plant images"),
    plant_type: Optional[str] = None,
    x_user_id: Optional[str] = Header(None),
):
    """
    Detect plant disease from uploaded images.
    Accepts 1–4 images for ensemble inference.
    Returns disease name, confidence, severity, and treatment information.
    """
    # ─── Validation ───────────────────────────────────────
    if len(images) > 4:
        raise HTTPException(status_code=400, detail="Maximum 4 images allowed per detection")

    image_bytes_list = []
    for img in images:
        if img.content_type not in ALLOWED_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type: {img.content_type}. Use JPEG, PNG, or WebP."
            )
        content = await img.read()
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"File {img.filename} exceeds 10MB limit")
        image_bytes_list.append(content)

    # ─── Inference ────────────────────────────────────────
    try:
        if len(image_bytes_list) == 1:
            label, confidence, top5 = ModelService.infer_single(image_bytes_list[0])
        else:
            label, confidence, top5 = ModelService.infer_ensemble(image_bytes_list)
    except Exception as e:
        logger.error(f"Inference failed: {e}")
        raise HTTPException(status_code=500, detail="Disease detection failed")

    # ─── Parse Result ─────────────────────────────────────
    plant_name, disease_name = ModelService.parse_label(label)
    severity = ModelService.get_severity(confidence, disease_name)
    low_confidence = confidence < CONFIDENCE_THRESHOLD

    # ─── Fetch Disease Knowledge ──────────────────────────
    disease_info = await KnowledgeService.get_disease_info(disease_name, plant_name)

    # ─── Upload Images to Storage ─────────────────────────
    detection_id = str(uuid.uuid4())
    image_urls = []
    for i, img_bytes in enumerate(image_bytes_list):
        url = await StorageService.upload_image(
            img_bytes, f"detections/{detection_id}/image_{i}.jpg"
        )
        image_urls.append(url)

    # ─── Save to MongoDB ──────────────────────────────────
    detection_doc = {
        "_id": detection_id,
        "user_id": x_user_id,
        "images": image_urls,
        "plant_type_hint": plant_type,
        "result": {
            "label": label,
            "plant": plant_name,
            "disease": disease_name,
            "confidence": confidence,
            "severity": severity,
            "is_healthy": "healthy" in label.lower(),
            "low_confidence": low_confidence,
            "top5_predictions": top5,
        },
        "disease_info": disease_info,
        "chat_history": [],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    await Database.save_detection(detection_doc)

    # ─── Response ─────────────────────────────────────────
    return JSONResponse(content={
        "success": True,
        "data": {
            "detection_id": detection_id,
            "plant": plant_name,
            "disease": disease_name,
            "confidence": confidence,
            "severity": severity,
            "is_healthy": "healthy" in label.lower(),
            "low_confidence": low_confidence,
            "low_confidence_message": (
                "We're not fully certain. Consider describing symptoms too."
                if low_confidence else None
            ),
            "images": image_urls,
            "disease_info": disease_info,
            "top5_predictions": top5,
        }
    })


@router.get("/{detection_id}")
async def get_detection(
    detection_id: str,
    x_user_id: Optional[str] = Header(None),
):
    """Retrieve a saved detection result by ID."""
    detection = await Database.get_detection(detection_id, x_user_id)
    if not detection:
        raise HTTPException(status_code=404, detail="Detection not found")
    detection["_id"] = str(detection["_id"])
    return JSONResponse(content={"success": True, "data": detection})
