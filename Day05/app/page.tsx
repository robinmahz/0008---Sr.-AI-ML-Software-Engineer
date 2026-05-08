"use client";

import { useState } from "react";

interface SummarizeResponse {
  summary: string;
  original_length: number;
  summary_length: number;
  sentence_count: number;
  message: string;
}

export default function Home() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<SummarizeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setStatus("loading");
    setResult(null);
    setErrorMessage("");

    try {
      // Artificially wait for 3 seconds to show the loading state
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Assuming Day 04 backend runs on localhost:8000
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          max_sentences: 3,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let message = "Failed to summarize text";
        
        if (typeof errorData.detail === "string") {
          message = errorData.detail;
        } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
          // Handle Pydantic validation errors
          message = errorData.detail[0].msg;
        }
        
        throw new Error(message);
      }

      const data: SummarizeResponse = await response.json();
      setResult(data);
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred");
      setStatus("error");
    }
  };

  return (
    <div className="container">
      <main className="card">
        <h1>AI Summarizer</h1>
        <p className="subtitle">Transform long text into concise summaries instantly.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text-input">Source Text</label>
            <textarea
              id="text-input"
              placeholder="Paste your long text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={status === "loading"}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={status === "loading" || !text.trim()}
          >
            {status === "loading" ? (
              <>
                <div className="loading-spinner" />
                Summarizing...
              </>
            ) : (
              "Summarize Now"
            )}
          </button>
        </form>

        {status === "error" && (
          <div className="result-area">
            <div className="status-box status-error">
              <span>⚠️</span> {errorMessage}
            </div>
          </div>
        )}

        {status === "success" && result && (
          <div className="result-area">
            <div className="status-box status-success">
              <span>✨</span> {result.message}
            </div>
            <div className="summary-content">
              {result.summary}
            </div>
            <div className="stats">
              <div className="stat-item">
                Sentences: <span className="stat-value">{result.sentence_count}</span>
              </div>
              <div className="stat-item">
                Reduction: <span className="stat-value">
                  {Math.round((1 - result.summary_length / result.original_length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Day 05 Outcome • Next.js + FastAPI
      </footer>
    </div>
  );
}
