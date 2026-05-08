# User Journey: Day 05 AI Summarizer

This document outlines the step-by-step experience of a user interacting with the AI Summarizer tool.

### Phase 1: Entry & Discovery
- **Action**: User opens the application.
- **Visuals**: A sleek, dark-themed interface with glassmorphism effects. The primary focus is a large text area labeled "Source Text."
- **Feeling**: Professional and "high-tech."

### Phase 2: Input & Trigger
- **Action**: User pastes a long article or multiple paragraphs into the text area and clicks the **"Summarize Now"** button.
- **Visuals**: The button changes color slightly on hover, indicating interactivity.

### Phase 3: Processing (Artificial Delay)
- **Action**: The system begins processing the request.
- **Visuals**: 
  - The button transforms to show a **loading spinner**.
  - Button text changes to **"Summarizing..."**.
  - The text area and button are disabled to prevent duplicate requests.
- **Duration**: 3 seconds (artificial delay added for state visualization).
- **Feeling**: Reassured that the system is working.

### Phase 4: Outcome (Success)
- **Action**: The backend returns the summary.
- **Visuals**: 
  - A green-tinted success box appears with a "✨" icon and the message "Summary generated successfully."
  - The summary content is displayed in a clean, focused block.
  - **Stats Card**: Shows "Sentence Count" and "Reduction %" (e.g., "Reduction: 65%").
- **Feeling**: Gratification and immediate value.

### Phase 5: Outcome (Error Handling)
- **Action**: User tries to summarize an empty text box or the backend is offline.
- **Visuals**: 
  - A red-tinted error box appears with a "⚠️" icon.
  - Clear feedback is provided (e.g., "Text cannot be empty" or "Failed to summarize text").
- **Recovery**: User can edit the text and try again immediately.
