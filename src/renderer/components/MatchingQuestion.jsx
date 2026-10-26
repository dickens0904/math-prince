import React, { useState, useRef, useEffect } from 'react';
import './MatchingQuestion.css';

export default function MatchingQuestion({ question, onAnswer }) {
  const [matches, setMatches] = useState({});
  const [dragItem, setDragItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const canvasRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});

  const { leftItems, rightItems, correctMatches } = question;

  useEffect(() => {
    drawLines();
  }, [matches]);

  const drawLines = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Object.entries(matches).forEach(([leftId, rightId]) => {
      const leftEl = leftRefs.current[leftId];
      const rightEl = rightRefs.current[rightId];

      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        const startX = leftRect.right - canvasRect.left;
        const startY = leftRect.top + leftRect.height / 2 - canvasRect.top;
        const endX = rightRect.left - canvasRect.left;
        const endY = rightRect.top + rightRect.height / 2 - canvasRect.top;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        if (submitted) {
          const isCorrect = correctMatches[leftId] === rightId;
          ctx.strokeStyle = isCorrect ? '#4caf50' : '#f44336';
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = '#667eea';
          ctx.lineWidth = 2;
        }

        ctx.stroke();
      }
    });
  };

  const handleDragStart = leftId => {
    if (submitted) return;
    setDragItem(leftId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = rightId => {
    if (!dragItem || submitted) return;

    setMatches(prev => {
      const newMatches = { ...prev };

      // 移除已有的连线（如果左边或右边已被连接）
      Object.entries(newMatches).forEach(([l, r]) => {
        if (l === dragItem || r === rightId) {
          delete newMatches[l];
        }
      });

      newMatches[dragItem] = rightId;
      return newMatches;
    });

    setDragItem(null);
  };

  const handleSubmit = () => {
    if (submitted) return;

    const allMatched = leftItems.every(item => matches[item.id]);
    if (!allMatched) {
      alert('请完成所有连线');
      return;
    }

    setSubmitted(true);

    const newResults = {};
    let correctCount = 0;

    Object.entries(matches).forEach(([leftId, rightId]) => {
      const isCorrect = correctMatches[leftId] === rightId;
      newResults[leftId] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResults(newResults);

    setTimeout(() => {
      onAnswer(matches, correctCount === leftItems.length);
    }, 2000);
  };

  const handleReset = () => {
    if (submitted) return;
    setMatches({});
  };

  return (
    <div className="matching-question">
      <div className="matching-header">
        <h3>将左右两边对应的内容连接起来</h3>
      </div>

      <div className="matching-container">
        <div className="matching-left">
          {leftItems.map(item => (
            <div
              key={item.id}
              ref={el => (leftRefs.current[item.id] = el)}
              className={`matching-item left ${
                matches[item.id] ? 'matched' : ''
              } ${submitted ? (results[item.id] ? 'correct' : 'wrong') : ''}`}
              draggable={!submitted}
              onDragStart={() => handleDragStart(item.id)}
            >
              <span className="item-id">{item.id}</span>
              <span className="item-content">{item.content}</span>
            </div>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className="matching-canvas"
          width={200}
          height={Math.max(leftItems.length, rightItems.length) * 60 + 40}
        />

        <div className="matching-right">
          {rightItems.map(item => (
            <div
              key={item.id}
              ref={el => (rightRefs.current[item.id] = el)}
              className={`matching-item right ${
                Object.values(matches).includes(item.id) ? 'matched' : ''
              } ${
                submitted
                  ? Object.entries(matches).find(
                      ([l, r]) => r === item.id && correctMatches[l] === item.id
                    )
                    ? 'correct'
                    : 'wrong'
                  : ''
              }`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(item.id)}
            >
              <span className="item-content">{item.content}</span>
              <span className="item-id">{item.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="matching-controls">
        {!submitted && (
          <>
            <button className="reset-btn" onClick={handleReset}>
              重新连线
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              提交答案
            </button>
          </>
        )}
      </div>

      {submitted && (
        <div className="matching-result">
          <div className="result-stats">
            正确连线：{Object.values(results).filter(Boolean).length} / {leftItems.length}
          </div>
          <div className="result-feedback">
            {Object.values(results).every(Boolean) ? (
              <div className="feedback correct">
                <span className="feedback-emoji">🎉</span>
                <span className="feedback-text">全部正确！</span>
              </div>
            ) : (
              <div className="feedback wrong">
                <span className="feedback-emoji">😅</span>
                <span className="feedback-text">部分错误，请查看正确连线</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
