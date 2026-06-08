# 🤖 AI Pre-Exam Screener

A standalone demo that shows an AI chatbot asking screening questions to a candidate **before** they can enter the exam. If they qualify, they proceed. If not, they are blocked.

## How it works

1. Candidate enters their name
2. AI asks 3 screening questions one by one
3. Candidate types answers
4. AI evaluates each answer (keyword-based scoring)
5. If score >= 2/3 → **Qualified** → Proceed to Exam
6. If score < 2/3 → **Not Qualified** → Blocked

## Run it

```bash
npm install
npm run dev
```

Open: http://localhost:5173
