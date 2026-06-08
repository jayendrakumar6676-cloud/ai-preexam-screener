# 🎤 XPay AI Voice Screener

Fully voice-based AI pre-exam screener.
- **AI speaks** questions out loud
- **Candidate answers by voice**
- AI listens, evaluates, and qualifies or blocks

## ⚡ Zero installation

1. Download ZIP from GitHub
2. Extract anywhere
3. Open `index.html` in **Google Chrome**
4. Allow microphone when asked

## 🎯 Flow

```
Enter Name
  ↓
AI speaks: "Hello! I'll ask you 3 questions..."
AI speaks: "Question 1: What is Binary Search complexity?"
Candidate clicks mic → speaks answer → mic stops
AI speaks: "✅ Correct! Binary Search has O(log n)..."
  ↓ (repeat for all questions)
Result screen:
  🎉 Qualified → Proceed to Exam
  😔 Not Qualified → Try Again
```

## ✏️ Customize

Open `index.html` in Notepad and change:
- `QUESTIONS` — your questions, keywords, explanations
- `PASS_MARK` — correct answers needed (default 2/3)
- `EXAM_URL` — your exam link (default http://localhost:8080)

## ⚠️ Requires Google Chrome + Microphone permission
