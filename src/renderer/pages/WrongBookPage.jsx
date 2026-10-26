import React, { useState, useEffect } from 'react';
import './WrongBookPage.css';

export default function WrongBookPage({ user, onBack }) {
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [practiceResults, setPracticeResults] = useState([]);
  const [practiceFinished, setPracticeFinished] = useState(false);

  // 从localStorage加载错题
  useEffect(() => {
    const saved = localStorage.getItem(`math-prince-wrong-${user.id}`);
    if (saved) {
      setWrongQuestions(JSON.parse(saved));
    }
  }, [user.id]);

  // 保存错题到localStorage
  const saveWrongQuestions = questions => {
    localStorage.setItem(`math-prince-wrong-${user.id}`, JSON.stringify(questions));
    setWrongQuestions(questions);
  };

  // 添加错题（供外部调用）
  const addWrongQuestion = question => {
    const exists = wrongQuestions.find(q => q.content === question.content);
    if (!exists) {
      const newQuestion = {
        ...question,
        id: Date.now(),
        wrongCount: 1,
        lastWrongAt: new Date().toISOString(),
        mastered: false,
      };
      saveWrongQuestions([newQuestion, ...wrongQuestions]);
    } else {
      const updated = wrongQuestions.map(q =>
        q.content === question.content
          ? { ...q, wrongCount: q.wrongCount + 1, lastWrongAt: new Date().toISOString() }
          : q
      );
      saveWrongQuestions(updated);
    }
  };

  // 标记为已掌握
  const markMastered = id => {
    const updated = wrongQuestions.map(q => (q.id === id ? { ...q, mastered: true } : q));
    saveWrongQuestions(updated);
  };

  // 删除错题
  const deleteQuestion = id => {
    const updated = wrongQuestions.filter(q => q.id !== id);
    saveWrongQuestions(updated);
  };

  // 开始练习错题
  const startPractice = () => {
    const unmastered = wrongQuestions.filter(q => !q.mastered);
    if (unmastered.length > 0) {
      setPracticeMode(true);
      setCurrentIndex(0);
      setPracticeResults([]);
      setPracticeFinished(false);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  // 提交练习答案
  const handlePracticeSubmit = e => {
    e.preventDefault();
    const unmastered = wrongQuestions.filter(q => !q.mastered);
    const currentQ = unmastered[currentIndex];
    const isCorrect = userAnswer.trim() === currentQ.answer;

    setPracticeResults([
      ...practiceResults,
      { ...currentQ, userAnswer: userAnswer.trim(), isCorrect },
    ]);

    if (isCorrect) {
      markMastered(currentQ.id);
    }

    setTimeout(() => {
      if (currentIndex < unmastered.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setShowAnswer(false);
      } else {
        setPracticeFinished(true);
      }
    }, 1000);
  };

  const unmasteredQuestions = wrongQuestions.filter(q => !q.mastered);
  const masteredQuestions = wrongQuestions.filter(q => q.mastered);

  // 练习结果页面
  if (practiceMode && practiceFinished) {
    const correctCount = practiceResults.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / practiceResults.length) * 100);

    return (
      <div className="wrong-page">
        <div className="wrong-container">
          <div className="practice-result">
            <div className="result-emoji">{accuracy >= 80 ? '🎉' : '💪'}</div>
            <h2 className="result-title">错题练习完成！</h2>
            <div className="result-stats">
              <div className="stat-item">
                <div className="stat-number">{practiceResults.length}</div>
                <div className="stat-label">练习题数</div>
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
            <div className="result-detail">
              {practiceResults.map((r, i) => (
                <div key={i} className={`result-row ${r.isCorrect ? 'correct' : 'wrong'}`}>
                  <span className="result-q">{r.content}</span>
                  <span className="result-icon">{r.isCorrect ? '✅' : '❌'}</span>
                </div>
              ))}
            </div>
            <div className="result-buttons">
              <button
                className="wrong-btn secondary"
                onClick={() => {
                  setPracticeMode(false);
                  setPracticeFinished(false);
                }}
              >
                返回错题本
              </button>
              <button className="wrong-btn primary" onClick={startPractice}>
                再练一次
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 练习模式
  if (practiceMode && unmasteredQuestions.length > 0) {
    const currentQ = unmasteredQuestions[currentIndex];

    return (
      <div className="wrong-page">
        <div className="wrong-container">
          <div className="practice-header">
            <button className="back-btn" onClick={() => setPracticeMode(false)}>
              ← 返回
            </button>
            <span className="practice-progress">
              {currentIndex + 1} / {unmasteredQuestions.length}
            </span>
          </div>
          <div className="practice-card">
            <div className="question-type">{currentQ.type}</div>
            <div className="question-content">{currentQ.content}</div>
            {showAnswer && <div className="answer-reveal">正确答案：{currentQ.answer}</div>}
            <form className="answer-form" onSubmit={handlePracticeSubmit}>
              <input
                type="text"
                className="answer-input"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="输入你的答案..."
                autoFocus
              />
              <button type="submit" className="submit-btn">
                确定
              </button>
            </form>
            {!showAnswer && (
              <button className="show-answer-btn" onClick={() => setShowAnswer(true)}>
                查看答案
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 错题本主页
  return (
    <div className="wrong-page">
      <div className="wrong-container">
        <div className="wrong-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="wrong-title">📕 错题本</h1>
          <p className="wrong-subtitle">共 {wrongQuestions.length} 道错题</p>
        </div>

        <div className="wrong-actions">
          <button
            className="action-btn primary"
            onClick={startPractice}
            disabled={unmasteredQuestions.length === 0}
          >
            练习错题 ({unmasteredQuestions.length})
          </button>
        </div>

        {wrongQuestions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-emoji">📝</div>
            <h3>还没有错题</h3>
            <p>在练习中答错的题目会自动收录到这里</p>
          </div>
        ) : (
          <>
            <div className="wrong-section">
              <h3 className="section-title">未掌握 ({unmasteredQuestions.length})</h3>
              {unmasteredQuestions.map(q => (
                <div key={q.id} className="wrong-card">
                  <div className="wrong-info">
                    <div className="wrong-type">{q.type}</div>
                    <div className="wrong-content">{q.content}</div>
                    <div className="wrong-answer">正确答案：{q.answer}</div>
                    <div className="wrong-meta">
                      <span>错误次数：{q.wrongCount}</span>
                    </div>
                  </div>
                  <div className="wrong-actions">
                    <button className="action-btn small" onClick={() => markMastered(q.id)}>
                      标记掌握
                    </button>
                    <button
                      className="action-btn small danger"
                      onClick={() => deleteQuestion(q.id)}
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {masteredQuestions.length > 0 && (
              <div className="wrong-section mastered">
                <h3 className="section-title">已掌握 ({masteredQuestions.length})</h3>
                {masteredQuestions.map(q => (
                  <div key={q.id} className="wrong-card mastered">
                    <div className="wrong-info">
                      <div className="wrong-type">{q.type}</div>
                      <div className="wrong-content">{q.content}</div>
                      <div className="wrong-answer">答案：{q.answer}</div>
                    </div>
                    <button
                      className="action-btn small danger"
                      onClick={() => deleteQuestion(q.id)}
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 导出添加错题的函数供其他页面使用
export function addWrongQuestionToStorage(userId, question) {
  const saved = localStorage.getItem(`math-prince-wrong-${userId}`);
  let wrongQuestions = saved ? JSON.parse(saved) : [];

  const exists = wrongQuestions.find(q => q.content === question.content && !q.mastered);
  if (!exists) {
    const newQuestion = {
      ...question,
      id: Date.now(),
      wrongCount: 1,
      lastWrongAt: new Date().toISOString(),
      mastered: false,
    };
    wrongQuestions = [newQuestion, ...wrongQuestions];
  } else {
    wrongQuestions = wrongQuestions.map(q =>
      q.content === question.content
        ? { ...q, wrongCount: q.wrongCount + 1, lastWrongAt: new Date().toISOString() }
        : q
    );
  }

  localStorage.setItem(`math-prince-wrong-${userId}`, JSON.stringify(wrongQuestions));
}
