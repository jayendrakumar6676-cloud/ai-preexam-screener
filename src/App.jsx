import { useState, useRef, useEffect } from 'react';
import { SCREENING_QUESTIONS, PASS_THRESHOLD, evaluateAnswer } from './questions.js';
import styles from './App.module.css';

const STEP = {
  NAME: 'name',
  CHAT: 'chat',
  RESULT: 'result',
};

const AI_NAME = 'XPay AI';

function TypingDots() {
  return (
    <div className={styles.typingBubble}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(STEP.NAME);
  const [candidateName, setCandidateName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputLocked, setInputLocked] = useState(false);
  const [qualified, setQualified] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (role, text, extra = {}) => {
    setMessages(prev => [...prev, { role, text, ...extra }]);
  };

  const aiSay = (text, delay = 1200) => {
    return new Promise(resolve => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', text);
        resolve();
      }, delay);
    });
  };

  const startChat = async (name) => {
    setStep(STEP.CHAT);
    setCandidateName(name);
    setInputLocked(true);
    await aiSay(`👋 Hello ${name}! I'm ${AI_NAME}, your screening assistant.`, 800);
    await aiSay(`I'll ask you ${SCREENING_QUESTIONS.length} quick technical questions. Answer them to qualify for the exam.`, 1400);
    await aiSay(`Let's begin! Here's Question 1 of ${SCREENING_QUESTIONS.length}:`, 1000);
    await aiSay(`❓ ${SCREENING_QUESTIONS[0].question}`, 1200);
    setInputLocked(false);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const name = nameInput.trim();
    if (!name) return;
    startChat(name);
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    const answer = userInput.trim();
    if (!answer || inputLocked) return;

    addMessage('user', answer);
    setUserInput('');
    setInputLocked(true);

    const q = SCREENING_QUESTIONS[currentQ];
    const correct = evaluateAnswer(q, answer);
    const newScores = [...scores, { qId: q.id, correct, answer }];
    setScores(newScores);

    if (correct) {
      await aiSay(`✅ Correct! ${q.explanation}`, 1200);
    } else {
      await aiSay(`❌ Not quite. ${q.explanation}`, 1200);
    }

    const nextQ = currentQ + 1;

    if (nextQ < SCREENING_QUESTIONS.length) {
      setCurrentQ(nextQ);
      await aiSay(`Question ${nextQ + 1} of ${SCREENING_QUESTIONS.length}:`, 800);
      await aiSay(`❓ ${SCREENING_QUESTIONS[nextQ].question}`, 1200);
      setInputLocked(false);
    } else {
      // All questions done — evaluate
      const totalCorrect = newScores.filter(s => s.correct).length;
      const pass = totalCorrect >= PASS_THRESHOLD;
      setQualified(pass);

      await aiSay(`📊 Screening complete! You got ${totalCorrect} out of ${SCREENING_QUESTIONS.length} correct.`, 1200);

      if (pass) {
        await aiSay(`🎉 Congratulations ${candidateName}! You have qualified. Proceeding to the exam...`, 1400);
      } else {
        await aiSay(`😔 Sorry ${candidateName}, you need at least ${PASS_THRESHOLD} correct answers to qualify. You scored ${totalCorrect}/${SCREENING_QUESTIONS.length}.`, 1400);
      }

      setTimeout(() => setStep(STEP.RESULT), 2000);
    }
  };

  // ── STEP: Enter Name ──
  if (step === STEP.NAME) {
    return (
      <div className={styles.nameScreen}>
        <div className={styles.nameCard}>
          <div className={styles.aiAvatar}>🤖</div>
          <h1 className={styles.title}>AI Pre-Exam Screener</h1>
          <p className={styles.subtitle}>Answer {SCREENING_QUESTIONS.length} questions to qualify for the exam</p>
          <form onSubmit={handleNameSubmit} className={styles.nameForm}>
            <input
              className={styles.nameInput}
              placeholder="Enter your full name..."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className={styles.startBtn} disabled={!nameInput.trim()}>
              Start Screening →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── STEP: Result ──
  if (step === STEP.RESULT) {
    const total = scores.filter(s => s.correct).length;
    return (
      <div className={styles.resultScreen}>
        <div className={styles.resultCard}>
          <div className={styles.resultIcon}>{qualified ? '🎉' : '😔'}</div>
          <h2 className={qualified ? styles.passTitle : styles.failTitle}>
            {qualified ? 'You Qualified!' : 'Not Qualified'}
          </h2>
          <p className={styles.scoreText}>
            Score: <strong>{total} / {SCREENING_QUESTIONS.length}</strong>
          </p>
          <div className={styles.answerSummary}>
            {scores.map((s, i) => (
              <div key={i} className={`${styles.answerRow} ${s.correct ? styles.correct : styles.wrong}`}>
                <span>{s.correct ? '✅' : '❌'}</span>
                <span>Q{i + 1}: {SCREENING_QUESTIONS[i].question.slice(0, 50)}...</span>
              </div>
            ))}
          </div>
          {qualified ? (
            <button
              className={styles.proceedBtn}
              onClick={() => alert('✅ Redirecting to Exam... (connect your exam URL here)')}
            >
              Proceed to Exam →
            </button>
          ) : (
            <button
              className={styles.retryBtn}
              onClick={() => {
                setStep(STEP.NAME);
                setMessages([]);
                setScores([]);
                setCurrentQ(0);
                setNameInput('');
                setQualified(false);
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── STEP: Chat ──
  return (
    <div className={styles.chatScreen}>
      <div className={styles.chatHeader}>
        <span className={styles.aiDot} />
        <span className={styles.chatHeaderTitle}>🤖 {AI_NAME} — Screening {currentQ + 1}/{SCREENING_QUESTIONS.length}</span>
        <span className={styles.candidateLabel}>👤 {candidateName}</span>
      </div>

      <div className={styles.chatBody}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'ai' ? styles.aiBubbleWrap : styles.userBubbleWrap}>
            {msg.role === 'ai' && <div className={styles.aiIcon}>🤖</div>}
            <div className={msg.role === 'ai' ? styles.aiBubble : styles.userBubble}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className={styles.aiBubbleWrap}>
            <div className={styles.aiIcon}>🤖</div>
            <TypingDots />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form className={styles.chatInput} onSubmit={handleAnswer}>
        <input
          className={styles.inputBox}
          placeholder={inputLocked ? 'AI is thinking...' : 'Type your answer here...'}
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          disabled={inputLocked}
          autoFocus
        />
        <button type="submit" className={styles.sendBtn} disabled={inputLocked || !userInput.trim()}>
          Send ➤
        </button>
      </form>
    </div>
  );
}
