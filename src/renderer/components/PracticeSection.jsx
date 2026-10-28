import React, { useState, useEffect } from 'react';
import { generateByName } from '../utils/olympiadQuestions.js';
import AnimationCanvas from './AnimationCanvas.jsx';

// 练习段：5道题，动态生成，答题反馈
export default function PracticeSection({ lesson, onNext }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const qs = generateByName(lesson.practice.generator, lesson.practice.count);
    setQuestions(qs);
  }, [lesson]);

  const handleSubmit = () => {
    if (!userAnswer) return;
    const q = questions[current];
    const correct = userAnswer.trim() === q.answer.trim();
    setFeedback({ correct, solution: q.solution });
    setResults(prev => [...prev, { correct }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      onNext(results);
    }
  };

  const q = questions[current];
  const correctCount = results.filter(r => r.correct).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>✏️ 动手练习</h2>
      <p style={{ color: '#888' }}>第 {current + 1} / {questions.length} 题</p>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '640px' }}>
        {lesson.practice.animation && (
          <div style={{ width: '300px', height: '300px', flexShrink: 0, background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <AnimationCanvas animation={lesson.practice.animation} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '20px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.8 }}>{q?.content}</p>
          </div>

          {!feedback ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="输入答案"
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #ddd',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#4ECDC4',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                提交答案
              </button>
            </div>
          ) : (
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: feedback.correct ? '#E8F5E9' : '#FFEBEE',
            }}>
              <p style={{
                color: feedback.correct ? '#2E7D32' : '#C62828',
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center',
              }}>
                {feedback.correct ? '✅ 答对了！' : '❌ 再想想'}
              </p>
              <p style={{ color: '#555', marginTop: '8px', fontSize: '14px' }}>
                正确答案：{q.answer}
              </p>
              <p style={{ color: '#888', marginTop: '8px', fontSize: '13px' }}>
                解题思路：{feedback.solution}
              </p>
              <button
                onClick={handleNext}
                style={{
                  marginTop: '12px',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  border: 'none',
                  background: '#FF6B6B',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {current < questions.length - 1 ? '下一题 →' : '完成练习 →'}
              </button>
            </div>
          )}
        </div>
      </div>

      <p style={{ color: '#888', fontSize: '13px' }}>
        已答对 {correctCount} / {questions.length} 题
      </p>
    </div>
  );
}
