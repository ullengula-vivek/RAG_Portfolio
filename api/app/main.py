from fastapi import FastAPI
from app.routes import health

app = FastAPI(title="Vivek Portfolio API")
app.include_router(health.router, prefix="/health", tags=["health"])
