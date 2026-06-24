import os
import logging
import anthropic
from typing import List, Optional

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are Plant Doctor, an expert AI assistant for PDDS (Plant Disease Detection System).

You help farmers, gardeners, and plant enthusiasts understand plant diseases and how to treat them.

RULES:
1. Always ground your answers in the provided detection context and retrieved knowledge
2. If you don't know something, say so clearly — never guess on treatment or chemicals
3. Be practical and actionable — farmers need clear steps, not academic explanations
4. When recommending chemicals, always mention safety precautions
5. Mention organic/traditional alternatives when available
6. Always reference the detected disease in your answers
7. Keep answers concise but complete — the user may be in a field without much time
8. If the question is outside plant health scope, politely redirect

RESPONSE FORMAT:
- Use simple language appropriate for farmers and gardeners
- Use bullet points for steps and lists
- Highlight critical warnings with ⚠️
- Keep responses under 300 words unless the question requires more detail
"""


class RAGService:
    pinecone_index = None
    anthropic_client = None

    @classmethod
    async def initialize(cls):
        """Initialize Pinecone and Anthropic clients."""
        try:
            cls.anthropic_client = anthropic.Anthropic(
                api_key=os.getenv("ANTHROPIC_API_KEY")
            )
            logger.info("Anthropic client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize Anthropic: {e}")

        try:
            from pinecone import Pinecone
            pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
            index_name = os.getenv("PINECONE_INDEX", "pdds-knowledge-base")
            if index_name in [i.name for i in pc.list_indexes()]:
                cls.pinecone_index = pc.Index(index_name)
                logger.info(f"Pinecone index '{index_name}' connected")
            else:
                logger.warning(f"Pinecone index '{index_name}' not found. RAG disabled.")
        except Exception as e:
            logger.warning(f"Pinecone initialization failed: {e}. Proceeding without RAG.")

    @classmethod
    async def retrieve_context(cls, query: str, disease_name: str, top_k: int = 5) -> List[str]:
        """Vector search Pinecone for relevant disease knowledge."""
        if cls.pinecone_index is None:
            return []
        try:
            # In production: embed query with text-embedding-3-small or similar
            # For now, return empty (RAG context comes from detection knowledge_service)
            return []
        except Exception as e:
            logger.error(f"RAG retrieval failed: {e}")
            return []

    @classmethod
    async def generate_answer(
        cls,
        question: str,
        detection_context: dict,
        chat_history: List[dict],
        retrieved_chunks: List[str],
    ) -> str:
        """Generate a grounded answer using Claude."""
        if cls.anthropic_client is None:
            return "Plant Doctor is currently unavailable. Please try again later."

        # Build context block
        disease_info = detection_context.get("disease_info", {})
        context_block = f"""
DETECTION RESULT:
- Plant: {detection_context.get('plant', 'Unknown')}
- Disease: {detection_context.get('disease', 'Unknown')}
- Confidence: {detection_context.get('confidence', 0)}%
- Severity: {detection_context.get('severity', 'Unknown')}

KNOWN DISEASE INFORMATION:
Causes: {', '.join(disease_info.get('causes', []))}
Treatment: {'; '.join(disease_info.get('treatment_steps', []))}
Prevention: {'; '.join(disease_info.get('prevention', []))}
Recovery Rate: {disease_info.get('recovery_rate', 'Unknown')}
Spread Risk: {disease_info.get('spread_risk', 'Unknown')}
"""

        if retrieved_chunks:
            context_block += f"\nADDITIONAL KNOWLEDGE:\n" + "\n".join(retrieved_chunks)

        # Build messages
        messages = []
        for msg in chat_history[-10:]:  # Last 10 messages for context window
            messages.append({"role": msg["role"], "content": msg["content"]})

        messages.append({
            "role": "user",
            "content": f"Context about this plant detection:\n{context_block}\n\nUser question: {question}"
        })

        try:
            response = cls.anthropic_client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=512,
                system=SYSTEM_PROMPT,
                messages=messages,
            )
            return response.content[0].text
        except Exception as e:
            logger.error(f"Claude API error: {e}")
            return "I'm having trouble generating an answer right now. Please try again."
