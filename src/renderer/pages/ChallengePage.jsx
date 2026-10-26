import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChallengePage.css';
import { generateQuestions } from '../utils/questionGenerator';
import { convertBatchToChoice } from '../utils/questionTypes/choiceGenerator';
import { generateRandomMatch } from '../utils/questionTypes/matchingGenerator';
import ChoiceQuestion from '../components/ChoiceQuestion';
import MatchingQuestion from '../components/MatchingQuestion';
import {
  playCorrect,
  playWrong,
  playCombo,
  playSuperCombo,
  playStart,
  playFinish,
  playTick,
  playTimeUp,
} from '../utils/soundEffects';
import {
  getRandomCharacter,
  getCorrectMessage,
  getWrongMessage,
  getResultComment,
  getCharacterDialogue,
} from '../utils/encouragement';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const TIME_OPTIONS = [
  { seconds: 60, label: '1分钟', questions: 8 },
  { seconds: 120, label: '2分钟', questions: 15 },
  { seconds: 180, label: '3分钟', questions: 20 },
];

export default function ChallengePage({ user, onBack, onFinish }) {
  const [phase, setPhase] = useState('select'); // select | countdown | playing | finished
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[1]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [streak, setStreak] = useState(0);
  const [character] = useState(() => getRandomCharacter());
  const [charMessage, setCharMessage] = useState('');
  const [countdownNum, setCountdownNum] = useState(3);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const startChallenge = useCallback(() => {
    playStart();
    setPhase('countdown');
    setCountdownNum(3);
  }, []);

  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdownNum <= 0) {
      // 开始游戏
      const qs = generateQuestions(user.grade, selectedTime.questions);
      const converted = convertBatchToChoice(qs, 0.4);
      const matchingQs = [];
      for (let i = 0; i < Math.ceil(converted.length / 5); i++) {
        matchingQs.push(generateRandomMatch());
      }
      const all = [];
      let mi = 0;
      converted.forEach((q, i) => {
        all.push(q);
        if ((i + 1) % 5 === 0 && mi < matchingQs.length) {
          all.push(matchingQs[mi++]);
        }
      });
      setQuestions(all.map((q, i) => ({ ...q, id: i + 1 })));
      setCurrentIndex(0);
      setResults([]);
      setStreak(0);
      setTimeLeft(selectedTime.seconds);
      setCharMessage('开始挑战！加油！');
      setPhase('playing');
      return;
    }
    const t = setTimeout(() => setCountdownNum(prev => prev - 1), 800);
    return () => clearTimeout(t);
  }, [phase, countdownNum, user.grade, selectedTime]);

  // 倒计时
  useEffect(() => {
    if (phase !== 'playing' || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          playTimeUp();
          setPhase('finished');
          return 0;
        }
        if (prev <= 10) playTick();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (
      inputRef.current &&
      phase === 'playing' &&
      questions[currentIndex]?.questionType !== 'matching' &&
      questions[currentIndex]?.questionType !== 'choice'
    ) {
      inputRef.current.focus();
    }
  }, [currentIndex, phase, questions]);

  const handleCorrect = useCallback(
    newStreak => {
      playCorrect();
      setStreak(newStreak);
      setCharMessage(getCorrectMessage(character, newStreak));
      if (newStreak === 3) playCombo();
      if (newStreak === 5) playSuperCombo();
    },
    [character]
  );

  const handleWrong = useCallback(() => {
    playWrong();
    setStreak(0);
    setCharMessage(getWrongMessage(character));
  }, [character]);

  const processAnswer = useCallback(
    (isCorrect, currentQ, userAns) => {
      const result = { ...currentQ, userAnswer: userAns, isCorrect };
      const newResults = [...results, result];
      setResults(newResults);
      setShowResult(isCorrect ? 'correct' : 'wrong');

      if (isCorrect) handleCorrect(streak + 1);
      else handleWrong();

      setTimeout(() => {
        setShowResult(null);
        setUserAnswer('');
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(timerRef.current);
          setPhase('finished');
          playFinish();
        }
      }, 600);
    },
    [results, streak, currentIndex, questions, handleCorrect, handleWrong]
  );

  const handleInputSubmit = e => {
    e.preventDefault();
    if (!userAnswer.trim() || showResult) return;
    const currentQ = questions[currentIndex];
    processAnswer(userAnswer.trim() === currentQ.answer, currentQ, userAnswer.trim());
  };

  const handleChoiceAnswer = (selected, isCorrect) => {
    const currentQ = questions[currentIndex];
    processAnswer(isCorrect, currentQ, selected);
  };

  const handleMatchingAnswer = (matches, allCorrect) => {
    const currentQ = questions[currentIndex];
    processAnswer(allCorrect, currentQ, matches);
  };

  const finishChallenge = () => {
    onFinish(results);
  };

  const correctCount = results.filter(r => r.isCorrect).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
  const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // 选择时间界面
  if (phase === 'select') {
    return (
      <div className="challenge-page">
        <div className="challenge-container">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="challenge-title">⏱️ 计时挑战</h1>
          <p className="challenge-subtitle">选择挑战时长，看看能做对多少题！</p>

          <div className="time-options">
            {TIME_OPTIONS.map(opt => (
              <button
                key={opt.seconds}
                className={`time-card ${selectedTime.seconds === opt.seconds ? 'selected' : ''}`}
                onClick={() => setSelectedTime(opt)}
              >
                <div className="time-label">{opt.label}</div>
                <div className="time-questions">约 {opt.questions} 题</div>
              </button>
            ))}
          </div>

          <button className="start-btn" onClick={startChallenge}>
            🚀 开始挑战
          </button>
        </div>
      </div>
    );
  }

  // 倒计时
  if (phase === 'countdown') {
    return (
      <div className="challenge-page">
        <div className="countdown-overlay">
          <div className="countdown-number" key={countdownNum}>
            {countdownNum > 0 ? countdownNum : 'GO!'}
          </div>
        </div>
      </div>
    );
  }

  // 挑战完成
  if (phase === 'finished') {
    const resultComment = getResultComment(accuracy);
    return (
      <div className="challenge-page">
        <div className="challenge-result bounce-in">
          <div className="result-emoji" style={{ fontSize: '64px' }}>
            {resultComment.emoji}
          </div>
          <h2 className="result-title">{resultComment.text}</h2>
          <div className="result-stats">
            <div className="stat-item">
              <div className="stat-number">{results.length}</div>
              <div className="stat-label">总题数</div>
            </div>
            <div className="stat-item correct">
              <div className="stat-number">{correctCount}</div>
              <div className="stat-label">答对</div>
            </div>
            <div className="stat-item accuracy">
              <div className="stat-number">{accuracy}%</div>
              <div className="stat-label">正确率</div>
            </div>
          </div>
          <div className="result-buttons">
            <button className="challenge-btn secondary" onClick={onBack}>
              返回首页
            </button>
            <button className="challenge-btn primary" onClick={finishChallenge}>
              再来一轮
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 答题中
  const currentQ = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="challenge-page">
      <div className="challenge-header">
        <button
          className="back-btn"
          onClick={() => {
            clearInterval(timerRef.current);
            onBack();
          }}
        >
          ← 返回
        </button>
        <div className="timer-display">
          <span className={`timer-text ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>
        <div className="challenge-score">
          ✅ {correctCount}/{results.length}
          {streak >= 3 && <span className="streak-badge">🔥{streak}</span>}
        </div>
      </div>

      <div className="challenge-progress-bar">
        <div className="challenge-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="character-bar">
        <span className="character-emoji">{character.emoji}</span>
        <span className="character-msg">{charMessage || character.greeting}</span>
      </div>

      <div className="question-card">
        {currentQ.questionType === 'choice' ? (
          <ChoiceQuestion question={currentQ} onAnswer={handleChoiceAnswer} />
        ) : currentQ.questionType === 'matching' ? (
          <MatchingQuestion question={currentQ} onAnswer={handleMatchingAnswer} />
        ) : (
          <>
            <div className="question-type">{currentQ.type}</div>
            <div className="question-content">{currentQ.content}</div>

            {showResult && (
              <div className={`feedback-overlay ${showResult}`}>
                <div className="feedback-text">
                  {showResult === 'correct' ? '✓ 正确！' : `✗ 正确答案: ${currentQ.answer}`}
                </div>
              </div>
            )}

            <form className="answer-form" onSubmit={handleInputSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="answer-input"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="输入答案..."
                disabled={showResult !== null}
                autoComplete="off"
              />
              <button
                type="submit"
                className="submit-btn"
                disabled={showResult !== null || !userAnswer.trim()}
              >
                确定
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
