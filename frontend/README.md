# MotherCode

**Submit your code. Receive the verdict.**

A brutally honest AI-powered code reviewer built with React, TypeScript, and FastAPI. Paste your code and let the Mother judge it — feedback is organized by severity: Critical, Warning, and Suggestion.

🔗 **[Live Demo](https://mothercode-frontend.onrender.com)**

---

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- react-markdown + remark-gfm

**Backend**
- FastAPI (Python)
- Anthropic Claude API (claude-sonnet-4-6)
- Uvicorn

**Deployed on Render**

---

## Features

- Paste any code and receive structured AI feedback
- Feedback organized by severity: 🔴 Critical, 🟡 Warning, 💡 Suggestion
- Markdown rendering with syntax-highlighted code blocks
- Input validation, HTTP error handling, and network error detection
- Environment-based API URL configuration for local and production

---

## Running Locally

**Backend**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create a .env file with your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env

uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5174`

---

## Project Structure

```
mothercode/
├── backend/
│   ├── main.py          # FastAPI app with /review endpoint
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.tsx               # Root component, state management
    │   └── components/
    │       ├── CodeInput.tsx     # Controlled textarea component
    │       ├── ReviewButton.tsx  # Submit button with loading state
    │       └── FeedbackDisplay.tsx # Markdown feedback renderer
    └── index.html
```