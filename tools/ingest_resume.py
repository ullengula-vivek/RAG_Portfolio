import os
import sys
import asyncio
from dotenv import load_dotenv

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.app.utils.chunker import chunk_text
from api.app.services.embeddings_client import embed_text
from api.app.services.db import db

load_dotenv()  # Load .env file

async def ingest_resume(file_path="resume.txt"):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    chunks = chunk_text(text)
    print(f"Chunking complete: {len(chunks)} chunks")

    for idx, chunk in enumerate(chunks):
        embedding = await embed_text(chunk)
        await db.docs.insert_one({
            "chunk_id": idx,
            "text": chunk,
            "embedding": embedding,
            "meta": {"source": "resume"}
        })
        print(f"✅ Inserted chunk {idx+1}/{len(chunks)}")

    print("🎉 Resume ingestion complete!")

if __name__ == "__main__":
    asyncio.run(ingest_resume())
