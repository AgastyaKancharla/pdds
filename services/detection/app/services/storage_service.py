import os
import boto3
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)


class StorageService:
    _client = None

    @classmethod
    def _get_client(cls):
        if cls._client is None:
            endpoint = os.getenv("MINIO_ENDPOINT")
            if endpoint:
                cls._client = boto3.client(
                    "s3",
                    endpoint_url=f"http://{endpoint}",
                    aws_access_key_id=os.getenv("MINIO_ACCESS_KEY", "pdds_minio"),
                    aws_secret_access_key=os.getenv("MINIO_SECRET_KEY", "pdds_minio_secret"),
                )
            else:
                cls._client = boto3.client(
                    "s3",
                    region_name=os.getenv("AWS_REGION", "us-east-1"),
                )
        return cls._client

    @classmethod
    async def upload_image(cls, image_bytes: bytes, key: str) -> str:
        """Upload image bytes to S3/MinIO and return the URL."""
        bucket = os.getenv("AWS_S3_BUCKET", "pdds-plant-images")
        try:
            client = cls._get_client()
            client.put_object(
                Bucket=bucket,
                Key=key,
                Body=image_bytes,
                ContentType="image/jpeg",
            )
            endpoint = os.getenv("MINIO_ENDPOINT")
            if endpoint:
                return f"http://{endpoint}/{bucket}/{key}"
            return f"https://{bucket}.s3.amazonaws.com/{key}"
        except Exception as e:
            logger.warning(f"Storage upload failed: {e}. Returning placeholder.")
            return f"/images/{key}"
