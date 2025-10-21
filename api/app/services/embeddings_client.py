import os
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()  # Load .env file
# Create an async OpenAI client (since your function is async)
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def embed_text(text: str):
    """
    Generate an embedding for the given text using the new OpenAI API.
    Compatible with openai>=1.0.0.
    """
    text = text.replace("\n", " ")  # Clean input
    response = await client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding
