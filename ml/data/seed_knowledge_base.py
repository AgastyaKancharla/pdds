"""Seed ChromaDB with plant disease knowledge base for RAG."""
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

CHUNKS = [
    {"id":"kb-001","disease":"Early Blight","source":"FAO","content":"Early Blight (Alternaria solani) appears as dark brown spots with concentric rings and yellow halos on tomato and potato leaves. Starts on older lower leaves and spreads upward. Favoured by warm temperatures 24-29C and high humidity above 90%."},
    {"id":"kb-002","disease":"Early Blight","source":"Cornell Extension","content":"Treatment: remove infected leaves immediately, apply copper-based fungicide every 7-10 days, improve air circulation, avoid overhead watering. Recovery expected in 6-8 weeks with consistent treatment."},
    {"id":"kb-003","disease":"Early Blight","source":"UC IPM","content":"Early Blight spreads through wind and water splash from spores on infected tissue. Can infect nearby Solanaceae family plants. Disinfect tools between plants with 10% bleach solution."},
    {"id":"kb-004","disease":"Late Blight","source":"FAO","content":"Late Blight (Phytophthora infestans) caused the Irish Famine. Water-soaked lesions turn dark brown-black rapidly. Entire crop can collapse within days. Apply systemic fungicide (metalaxyl) immediately at first sign."},
    {"id":"kb-005","disease":"General","source":"Organic Farming Research Foundation","content":"Organic fungicide options: neem oil 2% solution every 5-7 days, copper soap, potassium bicarbonate for powdery mildew, Bacillus subtilis (Serenade) safe for edible crops. Apply in early morning or evening to avoid leaf burn."},
    {"id":"kb-006","disease":"Powdery Mildew","source":"Penn State Extension","content":"Powdery Mildew thrives in warm dry conditions with high humidity — unique among fungi it does not need free water to germinate. Potassium bicarbonate is the most effective organic treatment. Ensure good air circulation as primary prevention."},
    {"id":"kb-007","disease":"Spider Mites","source":"UC IPM","content":"Spider mites thrive in hot dry conditions. Knock off with strong water spray first. Apply insecticidal soap or neem oil every 3-5 days. Introduce predatory mite Phytoseiulus persimilis for biological control. Avoid broad-spectrum pesticides."},
    {"id":"kb-008","disease":"General","source":"University of Minnesota Extension","content":"Disease spread prevention: maintain proper plant spacing for airflow, use drip irrigation not overhead, remove plant debris at end of season, practice crop rotation of minimum 2-3 years, inspect transplants before introducing to garden."},
]

def main():
    client = chromadb.HttpClient(host="localhost", port=8001)
    ef = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
    col = client.get_or_create_collection("plant_knowledge", embedding_function=ef)
    col.upsert(
        ids=[c["id"] for c in CHUNKS],
        documents=[c["content"] for c in CHUNKS],
        metadatas=[{"source":c["source"],"disease":c["disease"]} for c in CHUNKS],
    )
    print(f"Seeded {col.count()} chunks into ChromaDB")

if __name__ == "__main__":
    main()
