from fastapi import FastAPI
from app.routers import summarize

app = FastAPI(title="Day 04 AI Backend")

# Health check route
@app.get("/health")
def health():
    return {"status": "ok", "service": "day04-fastapi"}

# Include routers
app.include_router(summarize.router)