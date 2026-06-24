import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
import io
import os
import logging
from typing import List, Tuple

logger = logging.getLogger(__name__)

# PlantVillage 38-class disease labels
DISEASE_LABELS = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust",
    "Apple___healthy", "Blueberry___healthy", "Cherry___Powdery_mildew",
    "Cherry___healthy", "Corn___Cercospora_leaf_spot", "Corn___Common_rust",
    "Corn___Northern_Leaf_Blight", "Corn___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy", "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot", "Peach___healthy", "Pepper___Bacterial_spot",
    "Pepper___healthy", "Potato___Early_blight", "Potato___Late_blight",
    "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]

# Image preprocessing (matches EfficientNet-B4 training)
TRANSFORM = transforms.Compose([
    transforms.Resize((380, 380)),
    transforms.CenterCrop(380),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


class ModelService:
    model = None
    device = None

    @classmethod
    async def load_model(cls):
        """Load EfficientNet-B4 model at startup."""
        try:
            import timm
            cls.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            logger.info(f"Using device: {cls.device}")

            model_path = os.getenv("MODEL_PATH", "./ml/models/efficientnet_b4_plant.pt")

            if os.path.exists(model_path):
                # Load fine-tuned weights
                cls.model = timm.create_model(
                    "efficientnet_b4", pretrained=False, num_classes=len(DISEASE_LABELS)
                )
                cls.model.load_state_dict(torch.load(model_path, map_location=cls.device))
                logger.info(f"Loaded fine-tuned model from {model_path}")
            else:
                # Use pretrained backbone (inference will be limited until fine-tuned)
                logger.warning("Fine-tuned model not found. Using pretrained backbone.")
                cls.model = timm.create_model(
                    "efficientnet_b4", pretrained=True, num_classes=len(DISEASE_LABELS)
                )

            cls.model = cls.model.to(cls.device)
            cls.model.eval()
            logger.info("EfficientNet-B4 model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise

    @classmethod
    def preprocess_image(cls, image_bytes: bytes) -> torch.Tensor:
        """Preprocess a raw image bytes into a model-ready tensor."""
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        tensor = TRANSFORM(image).unsqueeze(0)
        return tensor.to(cls.device)

    @classmethod
    def infer_single(cls, image_bytes: bytes) -> Tuple[str, float, List]:
        """
        Run inference on a single image.
        Returns: (predicted_label, confidence, top5_predictions)
        """
        if cls.model is None:
            raise RuntimeError("Model not loaded")

        tensor = cls.preprocess_image(image_bytes)

        with torch.no_grad():
            logits = cls.model(tensor)
            probabilities = torch.softmax(logits, dim=1)[0]

        top5_probs, top5_indices = torch.topk(probabilities, 5)
        top5 = [
            {
                "label": DISEASE_LABELS[idx.item()],
                "confidence": round(prob.item() * 100, 2),
            }
            for prob, idx in zip(top5_probs, top5_indices)
        ]

        best_label = DISEASE_LABELS[top5_indices[0].item()]
        best_confidence = round(top5_probs[0].item() * 100, 2)

        return best_label, best_confidence, top5

    @classmethod
    def infer_ensemble(cls, images_bytes: List[bytes]) -> Tuple[str, float, List]:
        """
        Ensemble inference across multiple images of same plant.
        Averages softmax probabilities for higher accuracy.
        """
        if cls.model is None:
            raise RuntimeError("Model not loaded")

        all_probs = []
        for image_bytes in images_bytes:
            tensor = cls.preprocess_image(image_bytes)
            with torch.no_grad():
                logits = cls.model(tensor)
                probs = torch.softmax(logits, dim=1)[0]
                all_probs.append(probs)

        # Average across all images
        avg_probs = torch.stack(all_probs).mean(dim=0)
        top5_probs, top5_indices = torch.topk(avg_probs, 5)

        top5 = [
            {
                "label": DISEASE_LABELS[idx.item()],
                "confidence": round(prob.item() * 100, 2),
            }
            for prob, idx in zip(top5_probs, top5_indices)
        ]

        best_label = DISEASE_LABELS[top5_indices[0].item()]
        best_confidence = round(top5_probs[0].item() * 100, 2)

        return best_label, best_confidence, top5

    @staticmethod
    def parse_label(label: str) -> Tuple[str, str]:
        """Parse 'Tomato___Early_blight' → ('Tomato', 'Early Blight')"""
        parts = label.split("___")
        plant = parts[0].replace("_", " ")
        disease = parts[1].replace("_", " ").title() if len(parts) > 1 else "Unknown"
        return plant, disease

    @staticmethod
    def get_severity(confidence: float, disease: str) -> str:
        """Determine severity based on confidence and disease type."""
        if "healthy" in disease.lower():
            return "healthy"
        if confidence >= 85:
            return "critical"
        if confidence >= 65:
            return "moderate"
        return "mild"
