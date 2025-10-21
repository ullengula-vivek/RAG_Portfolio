# api/app/services/retriever.py

from api.app.services.db import db
from api.app.services.embeddings_client import embed_text
import numpy as np

def cosine_similarity(a, b):
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

async def retrieve_relevant_chunks(query: str, top_k: int = 3):
    """
    Retrieves top_k most relevant resume chunks for a given query.
    """
    query_embedding = await embed_text(query)
    docs = await db.docs.find().to_list(None)

    scored_docs = []
    for doc in docs:
        score = cosine_similarity(query_embedding, doc["embedding"])
        scored_docs.append((score, doc))

    top_chunks = sorted(scored_docs, key=lambda x: x[0], reverse=True)[:top_k]
    return [doc for _, doc in top_chunks]
