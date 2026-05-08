from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import summarize

app = FastAPI(title="Day 04 AI Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; refine for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check route
@app.get("/health")
def health():
    return {"status": "ok", "service": "day04-fastapi"}

# Include routers
app.include_router(summarize.router)