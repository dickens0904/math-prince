import React, { useState, useEffect, useRef, useCallback } from 'react';
import './PracticePage.css';
import '../utils/animations.css';
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
} from '../utils/soundEffects';
import {
  getRandomCharacter,
  getCorrectMessage,
  getWrongMessage,
  getResultComment,
  getCharacterDialogue,
  getQuestionEmoji,
  generateFireworkParticles,
  celebrationColors,
} from '../utils/encouragement';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PracticePage({ user, onBack, onFinish, initialQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [character] = useState(() => getRandomCharacter());
  const [charMessage, setCharMessage] = useState('');
  const [showCombo, setShowCombo] = useState(null);
  const [fireworks, setFireworks] = useState([]);
  const [floatTexts, setFloatTexts] = useState([]);
  const [questionAnim, setQuestionAnim] = useState('');
  const inputRef = useRef(null);
  const floatIdRef = useRef(0);

  useEffect(() => {
    let generatedQuestions = initialQuestions || generateQuestions(user.grade, 10);
    generatedQuestions = convertBatchToChoice(generatedQuestions, 0.4);
    const matchingQuestions = [];
    for (let i = 0; i < Math.ceil(generatedQuestions.length / 5); i++) {
      matchingQuestions.push(generateRandomMatch());
    }
    const allQuestions = [];
    let matchIndex = 0;
    generatedQuestions.forEach((q, i) => {
      allQuestions.push(q);
      if ((i + 1) % 5 === 0 && matchIndex < matchingQuestions.length) {
        allQuestions.push(matchingQuestions[matchIndex++]);
      }
    });
    setQuestions(allQuestions.map((q, i) => ({ ...q, id: i + 1 })));
    setCharMessage(getCharacterDialogue(character, 'start'));
    playStart();
  }, [initialQuestions, user.grade, character]);

  useEffect(() => {
    if (
      inputRef.current &&
      !finished &&
      questions[currentIndex]?.questionType !== 'matching' &&
      questions[currentIndex]?.questionType !== 'choice'
    ) {
      inputRef.current.focus();
    }
  }, [currentIndex, finished, questions]);

  // 浮动文字效果
  const addFloatText = useCallback((text, x, y, color = '#4CAF50') => {
    const id = ++floatIdRef.current;
    setFloatTexts(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatTexts(prev => prev.filter(f => f.id !== id));
    }, 1200);
  }, []);

  // 烟花效果
  const showFireworks = useCallback((count = 2) => {
    const newFireworks = [];
    for (let i = 0; i < count; i++) {
      const cx = 100 + Math.random() * (window.innerWidth - 200);
      const cy = 100 + Math.random() * 300;
      const particles = generateFireworkParticles(cx, cy, 15);
      newFireworks.push({ id: Date.now() + i, particles });
    }
    setFireworks(prev => [...prev, ...newFireworks]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => !newFireworks.find(nf => nf.id === f.id)));
    }, 1500);
  }, []);

  // 处理答对
  const handleCorrect = useCallback(
    newStreak => {
      playCorrect();
      setStreak(newStreak);
      setQuestionAnim('celebrate-bounce');

      const msg = getCorrectMessage(character, newStreak);
      setCharMessage(msg);

      // 浮动文字
      const x = window.innerWidth / 2 - 50 + (Math.random() - 0.5) * 100;
      const y = window.innerHeight / 2 - 100;
      addFloatText(pick(['✨', '⭐', '🌟', '💫', '🎯']), x, y - 30, '#FFD700');
      addFloatText('正确！', x, y, '#4CAF50');

      // 连击效果
      if (newStreak === 3) {
        playCombo();
        setShowCombo({ text: '🔥 三连击！', color: '#FF9800' });
        showFireworks(1);
      } else if (newStreak === 5) {
        playSuperCombo();
        setShowCombo({ text: '🔥🔥 五连击！🔥🔥', color: '#FF5722' });
        showFireworks(2);
      } else if (newStreak === 7) {
        playSuperCombo();
        setShowCombo({ text: '👑 七连击！无敌！👑', color: '#9C27B0' });
        showFireworks(3);
      } else if (newStreak >= 10 && newStreak % 5 === 0) {
        playSuperCombo();
        setShowCombo({ text: `🏆 ${newStreak}连击！数学之王！🏆`, color: '#FFD700' });
        showFireworks(4);
      }

      setTimeout(() => {
        setShowCombo(null);
        setQuestionAnim('');
      }, 1200);
    },
    [character, addFloatText, showFireworks]
  );

  // 处理答错
  const handleWrong = useCallback(() => {
    playWrong();
    setStreak(0);
    setQuestionAnim('wrong-shake');
    const msg = getWrongMessage(character);
    setCharMessage(msg);

    addFloatText('💪', window.innerWidth / 2, window.innerHeight / 2 - 100, '#FF6B6B');

    setTimeout(() => setQuestionAnim(''), 500);
  }, [character, addFloatText]);

  const handleInputSubmit = e => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const trimmed = userAnswer.trim();
    const currentQ = questions[currentIndex];
    const isCorrect = trimmed === currentQ.answer;
    const result = { ...currentQ, userAnswer: trimmed, isCorrect };

    setResults(prev => [...prev, result]);
    setShowResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      handleCorrect(streak + 1);
    } else {
      handleWrong();
    }

    setTimeout(() => {
      setShowResult(null);
      setUserAnswer('');
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setFinished(true);
        playFinish();
        setCharMessage(getCharacterDialogue(character, 'finish'));
      }
    }, 1200);
  };

  const handleChoiceAnswer = (selected, isCorrect) => {
    const currentQ = questions[currentIndex];
    const result = { ...currentQ, userAnswer: selected, isCorrect };
    setResults(prev => [...prev, result]);

    if (isCorrect) {
      handleCorrect(streak + 1);
    } else {
      handleWrong();
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setFinished(true);
        playFinish();
        setCharMessage(getCharacterDialogue(character, 'finish'));
      }
    }, 500);
  };

  const handleMatchingAnswer = (matches, allCorrect) => {
    const currentQ = questions[currentIndex];
    const result = { ...currentQ, userAnswer: matches, isCorrect: allCorrect };
    setResults(prev => [...prev, result]);

    if (allCorrect) {
      handleCorrect(streak + 1);
    } else {
      handleWrong();
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setFinished(true);
        playFinish();
        setCharMessage(getCharacterDialogue(character, 'finish'));
      }
    }, 500);
  };

  const correctCount = results.filter(r => r.isCorrect).length;
  const totalAnswered = results.length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  if (questions.length === 0) {
    return <div className="loading">加载中...</div>;
  }

  // 练习完成页面
  if (finished) {
    const resultComment = getResultComment(accuracy);
    return (
      <div className="practice-page">
        {/* 烟花特效 */}
        <div className="firework-container">
          {fireworks.map(fw => (
            <div key={fw.id}>
              {fw.particles.map((p, i) => (
                <div
                  key={i}
                  className="firework-particle"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    '--x': `${p.targetX}px`,
                    '--y': `${p.targetY}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="practice-result-card bounce-in">
          {accuracy >= 80 && <div className="result-crown crown-pop">👑</div>}
          <div className="result-emoji" style={{ fontSize: '64px' }}>
            {resultComment.emoji}
          </div>
          <h2 className={`result-title ${accuracy >= 95 ? 'shimmer-gold' : ''}`}>
            {resultComment.text}
          </h2>
          <div
            className="result-grade"
            style={{
              fontSize: '36px',
              fontWeight: '900',
              margin: '8px 0',
              color:
                accuracy >= 95
                  ? '#FFD700'
                  : accuracy >= 85
                    ? '#4CAF50'
                    : accuracy >= 70
                      ? '#2196F3'
                      : '#FF9800',
            }}
          >
            {resultComment.level}
          </div>

          {/* 角色评价 */}
          <div
            className="character-feedback"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              margin: '12px auto',
              maxWidth: '400px',
              background: `${character.color}15`,
              borderRadius: '16px',
              border: `2px solid ${character.color}30`,
            }}
          >
            <span style={{ fontSize: '40px' }}>{character.emoji}</span>
            <span style={{ fontSize: '15px', color: '#555' }}>{charMessage}</span>
          </div>

          <div className="result-stats">
            <div className="stat-item">
              <div className="stat-number">{questions.length}</div>
              <div className="stat-label">总题数</div>
            </div>
            <div className="stat-item correct">
              <div className="stat-number">{correctCount}</div>
              <div className="stat-label">答对</div>
            </div>
            <div className="stat-item accuracy">
              <div className="stat-number animate-progress">{accuracy}%</div>
              <div className="stat-label">正确率</div>
            </div>
          </div>

          <div className="result-detail">
            {results.map((r, i) => (
              <div
                key={i}
                className={`result-row ${r.isCorrect ? 'correct' : 'wrong'} slide-in-up`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="result-q">{r.content}</span>
                <span className="result-a">
                  {r.questionType === 'matching' ? '连线题' : `你的答案: ${r.userAnswer}`}
                  {!r.isCorrect && r.questionType !== 'matching' && (
                    <span className="correct-answer"> (正确: {r.answer})</span>
                  )}
                </span>
                <span className="result-icon">{r.isCorrect ? '✅' : '❌'}</span>
              </div>
            ))}
          </div>

          <div className="result-buttons">
            <button className="practice-btn secondary" onClick={onBack}>
              返回首页
            </button>
            <button className="practice-btn primary" onClick={() => onFinish(results)}>
              再来一轮
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const questionEmoji = getQuestionEmoji(currentQ?.type);

  return (
    <div className="practice-page">
      {/* 烟花特效层 */}
      <div className="firework-container">
        {fireworks.map(fw => (
          <div key={fw.id}>
            {fw.particles.map((p, i) => (
              <div
                key={i}
                className="firework-particle"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  '--x': `${p.targetX}px`,
                  '--y': `${p.targetY}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* 浮动文字层 */}
      {floatTexts.map(ft => (
        <div
          key={ft.id}
          className="float-up-text"
          style={{ left: ft.x, top: ft.y, color: ft.color }}
        >
          {ft.text}
        </div>
      ))}

      {/* 连击显示 */}
      {showCombo && (
        <div className="combo-display entering" style={{ color: showCombo.color }}>
          {showCombo.text}
        </div>
      )}

      {/* 顶部信息栏 */}
      <div className="practice-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <div className="practice-progress">
          <span className="progress-text">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="progress-bar">
            <div className="progress-fill animate-progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="practice-score">
          ✅ {correctCount} / {totalAnswered}
          {streak >= 3 && (
            <span
              className="streak-badge"
              style={{
                marginLeft: '8px',
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              🔥 {streak}连击
            </span>
          )}
        </div>
      </div>

      {/* 角色对话条 */}
      <div
        className="character-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          margin: '0 auto 12px',
          maxWidth: '600px',
          background: `linear-gradient(135deg, ${character.color}10, ${character.color}05)`,
          borderRadius: '12px',
          border: `1px solid ${character.color}20`,
        }}
      >
        <span style={{ fontSize: '28px', animation: 'breathe 2s infinite' }}>
          {character.emoji}
        </span>
        <span style={{ fontSize: '14px', color: '#666', flex: 1 }}>
          {charMessage || character.greeting}
        </span>
      </div>

      {/* 题目卡片 */}
      <div className={`question-card ${questionAnim}`}>
        {currentQ.questionType === 'choice' ? (
          <ChoiceQuestion question={currentQ} onAnswer={handleChoiceAnswer} />
        ) : currentQ.questionType === 'matching' ? (
          <MatchingQuestion question={currentQ} onAnswer={handleMatchingAnswer} />
        ) : (
          <>
            <div
              className="question-type"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{questionEmoji}</span>
              <span>{currentQ.type}</span>
            </div>
            <div className="question-content">{currentQ.content}</div>

            {showResult && (
              <div className={`feedback-overlay ${showResult}`}>
                <div className="feedback-emoji">{showResult === 'correct' ? '🎉' : '😅'}</div>
                <div className="feedback-text">
                  {showResult === 'correct'
                    ? getCorrectMessage(character, streak + 1)
                    : `正确答案是 ${currentQ.answer}`}
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
                placeholder="输入你的答案..."
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
