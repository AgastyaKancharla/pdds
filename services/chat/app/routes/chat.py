from fastapi import APIRouter, HTTPException, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import logging

from app.services.rag_service import RAGService
from app.services.database import Database

router = APIRouter()
logger = logging.getLogger(__name__)

# Suggested questions to show user after detection
SUGGESTED_QUESTIONS = [
    "What is the recovery rate for this disease?",
    "Are there traditional or organic remedies?",
    "Can this spread to nearby plants?",
    "Is the crop still safe to eat?",
    "How long will treatment take?",
    "What caused this disease?",
    "How do I prevent this in future?",
]


class ChatMessage(BaseModel):
    detection_id: str
    question: str


@router.post("/message")
async def send_message(
    body: ChatMessage,
    x_user_id: Optional[str] = Header(None),
):
    """
    Send a question about a specific plant detection.
    Answers are grounded in the detection result and RAG knowledge base.
    """
    # Fetch detection context
    detection = await Database.get_detection(body.detection_id, x_user_id)
    if not detection:
        raise HTTPException(status_code=404, detail="Detection not found")

    detection_context = {
        "plant": detection["result"]["plant"],
        "disease": detection["result"]["disease"],
        "confidence": detection["result"]["confidence"],
        "severity": detection["result"]["severity"],
        "disease_info": detection.get("disease_info", {}),
    }

    # Retrieve RAG context
    retrieved_chunks = await RAGService.retrieve_context(
        body.question,
        detection_context["disease"],
    )

    # Generate answer
    chat_history = detection.get("chat_history", [])
    answer = await RAGService.generate_answer(
        body.question,
        detection_context,
        chat_history,
        retrieved_chunks,
    )

    # Save to chat history
    new_messages = [
        {"role": "user", "content": body.question, "timestamp": datetime.utcnow().isoformat()},
        {"role": "assistant", "content": answer, "timestamp": datetime.utcnow().isoformat()},
    ]
    await Database.append_chat_messages(body.detection_id, new_messages)

    return JSONResponse(content={
        "success": True,
        "data": {
            "answer": answer,
            "detection_id": body.detection_id,
        }
    })


@router.get("/suggestions")
async def get_suggestions():
    """Return pre-defined suggested questions for the chat panel."""
    return JSONResponse(content={"success": True, "data": SUGGESTED_QUESTIONS})


@router.get("/history/{detection_id}")
async def get_chat_history(
    detection_id: str,
    x_user_id: Optional[str] = Header(None),
):
    """Retrieve full chat history for a detection session."""
    detection = await Database.get_detection(detection_id, x_user_id)
    if not detection:
        raise HTTPException(status_code=404, detail="Detection not found")

    return JSONResponse(content={
        "success": True,
        "data": {
            "detection_id": detection_id,
            "chat_history": detection.get("chat_history", []),
        }
    })
