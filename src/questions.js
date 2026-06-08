// ─────────────────────────────────────────────────────────
// AI Screening Questions + Evaluation Logic
// Edit these questions freely to match your exam topic.
// Each question has keywords — if candidate answer contains
// any of them, it is marked correct.
// ─────────────────────────────────────────────────────────

export const SCREENING_QUESTIONS = [
  {
    id: 1,
    question: "What is the time complexity of Binary Search?",
    hint: "Think about how many steps it takes as input grows...",
    keywords: ["o(log n)", "log n", "logarithmic", "log"],
    explanation: "Binary Search has O(log n) time complexity because it halves the search space each step."
  },
  {
    id: 2,
    question: "What does OOP stand for and name one of its core principles?",
    hint: "It's a programming paradigm used in Java, Python, C++...",
    keywords: ["object oriented", "object-oriented", "encapsulation", "inheritance", "polymorphism", "abstraction", "oop"],
    explanation: "OOP stands for Object-Oriented Programming. Its core principles are Encapsulation, Inheritance, Polymorphism, and Abstraction."
  },
  {
    id: 3,
    question: "What is a primary key in a database?",
    hint: "Think about uniqueness in database tables...",
    keywords: ["unique", "uniquely identify", "identifier", "primary", "not null", "unique identifier"],
    explanation: "A primary key is a column (or set of columns) that uniquely identifies each row in a table. It must be unique and not null."
  }
];

export const PASS_THRESHOLD = 2; // out of 3 — candidate must get at least 2 correct

export function evaluateAnswer(question, userAnswer) {
  const lower = userAnswer.toLowerCase().trim();
  if (!lower || lower.length < 2) return false;
  return question.keywords.some(kw => lower.includes(kw.toLowerCase()));
}
