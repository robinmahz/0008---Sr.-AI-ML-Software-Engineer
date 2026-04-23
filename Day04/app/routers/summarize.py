from fastapi import APIRouter, HTTPException
from app.schemas.summarize import SummarizeRequest, SummarizeResponse

router = APIRouter()

@router.post("/summarize", response_model=SummarizeResponse)
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

    actual_sentences = summary.split(".")
    sentence_count = len([s for s in actual_sentences if s.strip()])

    return SummarizeResponse(
        summary=summary,
        original_length=len(text),
        summary_length=len(summary),
        sentence_count=sentence_count,
        message="Summary generated successfully"
    )
