# API Test Examples

This document provides examples of how to test the Day 04 AI Backend API using `curl`.

## 1. Health Check
Checks if the API service is running.

**Request:**
```bash
curl -X GET "http://localhost:8000/health"
```

**Expected Response:**
```json
{
  "status": "ok",
  "service": "day04-fastapi"
}
```

---

## 2. Summarize Text (Success)
Summarizes the provided text based on the `max_sentences` parameter.

**Request:**
```bash
curl -X POST "http://localhost:8000/summarize" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "The quick brown fox jumps over the lazy dog. This is a second sentence for testing. And a third one.",
       "max_sentences": 2
     }'
```

**Expected Response:**
```json
{
  "summary": "The quick brown fox jumps over the lazy dog. This is a second sentence for testing.",
  "original_length": 92,
  "summary_length": 83,
  "sentence_count": 2,
  "message": "Summary generated successfully"
}
```

---

## 3. Summarize Text (Validation Error: Text Too Short)
Testing the `min_length` constraint (minimum 10 characters).

**Request:**
```bash
curl -X POST "http://localhost:8000/summarize" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "Short",
       "max_sentences": 1
     }'
```

**Expected Response (422 Unprocessable Entity):**
```json
{
  "detail": [
    {
      "type": "string_too_short",
      "loc": ["body", "text"],
      "msg": "String should have at least 10 characters",
      "input": "Short",
      "ctx": { "min_length": 10 }
    }
  ]
}
```

---

## 4. Summarize Text (Validation Error: Max Sentences Out of Range)
Testing the `le` (less than or equal to 5) constraint for `max_sentences`.

**Request:**
```bash
curl -X POST "http://localhost:8000/summarize" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "This is a long enough text to pass the length validation, but we want too many sentences.",
       "max_sentences": 10
     }'
```

**Expected Response (422 Unprocessable Entity):**
```json
{
  "detail": [
    {
      "type": "less_than_equal",
      "loc": ["body", "max_sentences"],
      "msg": "Input should be less than or equal to 5",
      "input": 10,
      "ctx": { "le": 5 }
    }
  ]
}
```

---

## 5. Summarize Text (Error: Empty Text)
Testing custom logic for empty or whitespace-only text.

**Request:**
```bash
curl -X POST "http://localhost:8000/summarize" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "          ",
       "max_sentences": 1
     }'
```

**Expected Response (400 Bad Request):**
```json
{
  "detail": "Text cannot be empty."
}
```
