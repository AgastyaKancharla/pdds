import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient

logger = logging.getLogger(__name__)


class Database:
    client = None
    db = None

    @classmethod
    async def connect(cls):
        try:
            mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/pdds")
            cls.client = AsyncIOMotorClient(mongo_url)
            cls.db = cls.client.pdds
            await cls.client.admin.command("ping")
            logger.info("Chat service: MongoDB connected")
        except Exception as e:
            logger.error(f"MongoDB connection failed: {e}")

    @classmethod
    async def disconnect(cls):
        if cls.client:
            cls.client.close()

    @classmethod
    async def get_detection(cls, detection_id: str, user_id: str = None):
        if cls.db is None:
            return None
        query = {"_id": detection_id}
        if user_id:
            query["user_id"] = user_id
        return await cls.db.detections.find_one(query)

    @classmethod
    async def append_chat_messages(cls, detection_id: str, messages: list):
        if cls.db is None:
            return
        from datetime import datetime
        await cls.db.detections.update_one(
            {"_id": detection_id},
            {
                "$push": {"chat_history": {"$each": messages}},
                "$set": {"updated_at": datetime.utcnow()},
            }
        )
