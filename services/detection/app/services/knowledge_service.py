import logging
from app.services.database import Database

logger = logging.getLogger(__name__)

# Fallback static knowledge for common diseases
FALLBACK_KNOWLEDGE = {
    "Early Blight": {
        "causes": [
            "Fungal infection by Alternaria solani",
            "Warm, humid weather (24–29°C)",
            "Overhead irrigation wetting foliage",
            "Poor air circulation",
        ],
        "treatment_steps": [
            "Remove and destroy infected leaves immediately",
            "Apply copper-based fungicide every 7–10 days",
            "Improve air circulation by pruning",
            "Avoid overhead watering; water at the base",
            "Apply organic mulch to prevent soil splash",
        ],
        "prevention": [
            "Rotate crops — avoid planting tomatoes/potatoes in same spot for 3 years",
            "Use disease-resistant varieties",
            "Maintain proper plant spacing",
            "Apply preventive copper fungicide at first sign of wet weather",
        ],
        "affected_parts": ["Leaves", "Stems", "Fruit"],
        "spread_risk": "Moderate — spreads via wind and water splash",
        "recovery_rate": "High (85%) with early treatment",
        "time_to_recovery": "2–3 weeks with consistent treatment",
        "organic_remedies": [
            "Neem oil spray (2 tbsp per gallon water)",
            "Baking soda solution (1 tsp per quart water)",
            "Compost tea foliar spray",
        ],
        "sources": [
            {"title": "FAO Plant Disease Management", "url": "https://www.fao.org"},
            {"title": "Cornell Plant Disease Diagnostic Clinic", "url": "https://plantdisease.cornell.edu"},
        ],
    },
    "Late Blight": {
        "causes": [
            "Water mould Phytophthora infestans",
            "Cool, wet conditions (10–25°C)",
            "Dense planting with poor airflow",
            "Infected seed tubers or transplants",
        ],
        "treatment_steps": [
            "Remove and bag infected plant material — do not compost",
            "Apply chlorothalonil or mancozeb fungicide immediately",
            "Spray every 5–7 days during wet weather",
            "Destroy severely infected plants to prevent spread",
            "Avoid moving between plants when wet",
        ],
        "prevention": [
            "Plant certified disease-free seed",
            "Use resistant varieties (e.g. Sarpo Mira for potatoes)",
            "Hill soil around plants to protect tubers",
            "Monitor weather forecasts — spray before rain",
        ],
        "affected_parts": ["Leaves", "Stems", "Tubers", "Fruit"],
        "spread_risk": "Very High — can destroy a field in days under ideal conditions",
        "recovery_rate": "Moderate (60%) — early intervention critical",
        "time_to_recovery": "3–5 weeks, may lose current crop",
        "organic_remedies": [
            "Bordeaux mixture (copper sulfate + lime)",
            "Copper hydroxide spray",
        ],
        "sources": [
            {"title": "FAO Late Blight Management", "url": "https://www.fao.org"},
            {"title": "American Phytopathological Society", "url": "https://www.apsnet.org"},
        ],
    },
}


class KnowledgeService:
    @staticmethod
    async def get_disease_info(disease_name: str, plant_name: str) -> dict:
        """
        Fetch disease information from MongoDB.
        Falls back to static knowledge if not found.
        """
        try:
            db = Database.get_mongo()
            if db:
                doc = await db.diseases.find_one(
                    {"name": disease_name, "plant_types": {"$in": [plant_name, "all"]}}
                )
                if doc:
                    doc.pop("_id", None)
                    return doc
        except Exception as e:
            logger.warning(f"MongoDB lookup failed, using fallback: {e}")

        # Fallback to static knowledge
        return FALLBACK_KNOWLEDGE.get(disease_name, {
            "causes": ["Pathogen infection — detailed info coming soon"],
            "treatment_steps": ["Consult a local agronomist for treatment specific to your region"],
            "prevention": ["Maintain good plant hygiene and air circulation"],
            "affected_parts": ["Various plant parts"],
            "spread_risk": "Unknown",
            "recovery_rate": "Varies",
            "time_to_recovery": "Varies with treatment",
            "organic_remedies": [],
            "sources": [{"title": "FAO Plant Protection", "url": "https://www.fao.org"}],
        })
