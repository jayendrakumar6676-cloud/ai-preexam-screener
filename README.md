# 🤖 AI Pre-Exam Screener

A standalone AI chatbot that screens candidates with 3 technical questions **before** they can enter the exam.

## ⚡ No installation needed!

Just:
1. Download the ZIP from GitHub
2. Extract it anywhere
3. Open `index.html` directly in Chrome — **that's it!**

No Node.js, no npm, no server needed.

---

## 🎯 How it works

1. Candidate enters their name
2. AI asks 3 screening questions one by one (with typing animation)
3. Candidate types answers
4. AI evaluates each answer and explains
5. Score ≥ 2/3 → **🎉 Qualified** → Proceed to Exam button
6. Score < 2/3 → **😔 Not Qualified** → Try Again button

---

## ✏️ Customize questions

Open `index.html` in any text editor and find this section:

```js
const QUESTIONS = [
  {
    question: "Your question here?",
    keywords: ["answer keyword", "another keyword"],
    explanation: "Explanation shown after answering."
  },
  ...
];
```

Change `PASS_MARK` to set how many correct answers are needed (default: 2 out of 3).

Change `EXAM_URL` to your exam link (default: `http://localhost:8080`).

---

## 🔗 Connect to XPay Exam Portal

Set `EXAM_URL = "http://localhost:8080"` inside `index.html` and the **Proceed to Exam** button will redirect there automatically after qualification.
