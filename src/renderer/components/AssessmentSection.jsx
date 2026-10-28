import React, { useState, useEffect } from 'react';
import { generateByName } from '../utils/olympiadQuestions.js';

// 测评段：3道题，完成后显示"今天我学会了"
export default function AssessmentSection({ lesson, onComplete, onBack }) {
  const [phase, setPhase] = useState('quiz'); // 'quiz' | 'done'
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const qs = generateByName(lesson.assessment.generator, lesson.assessment.count);
    setQuestions(qs);
  }, [lesson]);

  const handleSubmit = () => {
    if (!userAnswer) return;
    const q = questions[current];
    const correct = userAnswer.trim() === q.answer.trim();
    setFeedback({ correct, solution: q.solution });
    setResults(prev => [...prev, { correct, question: q, userAnswer: userAnswer.trim() }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      setPhase('done');
      // 错题记录（无论是否全对都要上报完成，保证经验值结算）
      const wrong = results.filter(r => !r.correct);
      if (onComplete) {
        onComplete(results, wrong);
      }
    }
  };

  const q = questions[current];
  const correctCount = results.filter(r => r.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);

  if (phase === 'done') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px' }}>🎉</div>
        <h2 style={{ color: '#FF6B6B', fontSize: '28px' }}>今天我学会了！</h2>
        <p style={{ color: '#666', fontSize: '18px' }}>{lesson.title}</p>
        <div style={{
          fontSize: '48px',
          color: score >= 80 ? '#4CAF50' : '#FF9800',
          fontWeight: 'bold',
        }}>
          {score}分
        </div>
        <p style={{ color: '#888' }}>答对 {correctCount} / {questions.length} 题</p>
        {score >= 80 && (
          <div style={{
            padding: '12px 24px',
            background: '#E8F5E9',
            borderRadius: '20px',
            color: '#2E7D32',
            fontSize: '16px',
          }}>
            ⭐ 太棒了！你已经掌握了这个知识点
          </div>
        )}
        {score < 80 && (
          <div style={{
            padding: '12px 24px',
            background: '#FFF8F0',
            borderRadius: '20px',
            color: '#5D4E37',
            fontSize: '16px',
          }}>
            💡 没关系，错题会自动加入复习，下次再来！
          </div>
        )}
        <button
          onClick={onBack}
          style={{
            marginTop: '20px',
            padding: '12px 32px',
            borderRadius: '25px',
            border: 'none',
            background: '#4ECDC4',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          返回课程 →
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>🎯 小测验</h2>
      <p style={{ color: '#888' }}>第 {current + 1} / {questions.length} 题</p>

      <div style={{
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.8 }}>{q?.content}</p>
      </div>

      {!feedback ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
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
              background: '#FF6B6B',
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
          maxWidth: '400px',
          width: '100%',
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
          <button
            onClick={handleNext}
            style={{
              marginTop: '12px',
              padding: '8px 24px',
              borderRadius: '20px',
              border: 'none',
              background: '#4ECDC4',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {current < questions.length - 1 ? '下一题 →' : '查看结果 →'}
          </button>
        </div>
      )}
    </div>
  );
}
