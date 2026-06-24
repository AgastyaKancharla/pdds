from fastapi import APIRouter
from app.services.rag_service import RAGService

router = APIRouter()

@router.get("/")
async def health():
    return {
        "status": "ok",
        "service": "pdds-chat",
        "rag_enabled": RAGService.pinecone_index is not None,
        "llm_enabled": RAGService.anthropic_client is not None,
    }
