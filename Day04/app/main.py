from fastapi import FastAPI, HTTPException
from app.models.summarize import SummarizeRequest, SummarizeResponse

app = FastAPI(title="Day 04 AI Backend")

@app.get("/health")
def health():
    return {"status": "ok", "service": "day04-fastapi"}

@app.post("/summarize", response_model=SummarizeResponse)
def summarize(req: SummarizeRequest):
    text = req.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    sentences = [s.strip() for s in text.split(".") if s.strip()]
    if not sentences:
        raise HTTPException(status_code=400, detail="No valid sentences found.")

    summary = ". ".join(sentences[:req.max_sentences])
    if summary and not summary.endswith("."):
        summary += "."

    return SummarizeResponse(
        summary=summary,
        original_length=len(text),
        message="Summary generated successfully"
    )