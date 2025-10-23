from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.app.services.retriever import retrieve_relevant_chunks
from openai import AsyncOpenAI
import os

router = APIRouter()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class QueryRequest(BaseModel):
    query: str

@router.post("/query_resume")
async def query_resume(request: QueryRequest):
    query = request.query
    relevant_chunks = await retrieve_relevant_chunks(query)

    if not relevant_chunks:
        raise HTTPException(status_code=404, detail="No relevant information found")

    context = "\n\n".join([doc["text"] for doc in relevant_chunks])

    prompt = f"""
You are Vivek's resume assistant. Answer using ONLY this context:

{context}

Question: {query}

Rules:
- Answer in 1-2 sentences maximum
- Be direct and factual
- No fluff or explanations
- If not in context: "I don't have that information in my resume"
- Focus on skills, experience, education, projects
"""

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"answer": response.choices[0].message.content.strip()}
