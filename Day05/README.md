# Day 05: AI Feature UI (Summarizer)

This project is a Next.js application that provides a modern, premium interface for the AI Summarization backend built on Day 04.

## Features
- **Modern Design**: Built with Vanilla CSS using glassmorphism, Google Fonts (Outfit), and custom animations.
- **Full Life-cycle Feedback**: Real-time loading, success, and error states.
- **Backend Integration**: Communicates with the FastAPI backend via JSON API.
- **Responsive Stats**: Shows summary metrics (sentence count and reduction percentage).

## Getting Started

### 1. Start the Backend (Day 04)
Navigate to the `Day04` directory and run:
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend should be running on `http://localhost:8000`.

### 2. Start the Frontend (Day 05)
Navigate to the `day05` directory and run:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application.

## Documentation
- [User Journey](./user_journey.md)
- [Reflection Doc](./reflection.md)
- [Teach-back Scripts](./teach-back.md)
