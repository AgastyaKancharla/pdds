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
            logger.info("MongoDB connected successfully")
        except Exception as e:
            logger.error(f"MongoDB connection failed: {e}")
            cls.db = None

    @classmethod
    async def disconnect(cls):
        if cls.client:
            cls.client.close()

    @classmethod
    def get_mongo(cls):
        return cls.db

    @classmethod
    async def save_detection(cls, doc: dict):
        if cls.db is None:
            logger.warning("MongoDB not available, skipping save")
            return
        await cls.db.detections.insert_one(doc)

    @classmethod
    async def get_detection(cls, detection_id: str, user_id: str = None):
        if cls.db is None:
            return None
        query = {"_id": detection_id}
        if user_id:
            query["user_id"] = user_id
        return await cls.db.detections.find_one(query)
