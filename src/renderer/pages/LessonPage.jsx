import React, { useState } from 'react';
import { getTopic } from '../data/topics.js';
import { getLessons } from '../data/lessons.js';
import LessonFlow from '../components/LessonFlow.jsx';

// 课程入口页：展示某主题的所有课程
export default function LessonPage({ topicId, onBack, onComplete }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const topic = getTopic(topicId);
  const lessons = getLessons(topicId);

  // 进入某节课
  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button
          onClick={() => setSelectedLesson(null)}
          style={{
            padding: '6px 16px',
            borderRadius: '15px',
            border: 'none',
            background: '#e0e0e0',
            cursor: 'pointer',
            fontSize: '13px',
            marginBottom: '16px',
          }}
        >
          ← 返回课程列表
        </button>
        <LessonFlow
          lesson={lesson}
          onBack={() => setSelectedLesson(null)}
          onComplete={onComplete}
        />
      </div>
    );
  }

  // 课程列表
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          padding: '6px 16px',
          borderRadius: '15px',
          border: 'none',
          background: '#e0e0e0',
          cursor: 'pointer',
          fontSize: '13px',
          marginBottom: '16px',
        }}
      >
        ← 返回奥数班
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <span style={{ fontSize: '40px' }}>{topic?.icon}</span>
        <div>
          <h1 style={{ color: '#333', margin: '0' }}>{topic?.name}</h1>
          <p style={{ color: '#888', margin: '4px 0 0', fontSize: '14px' }}>{topic?.description}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {lessons.map((lesson, i) => (
          <button
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson.id)}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: 'none',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: topic?.color || '#FF6B6B',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              flexShrink: 0,
            }}>
              {i + 1}
            </div>
            <div>
              <p style={{ margin: '0', color: '#333', fontWeight: 'bold', fontSize: '15px' }}>
                {lesson.title}
              </p>
              <p style={{ margin: '4px 0 0', color: '#999', fontSize: '13px' }}>
                {lesson.objective}
              </p>
              <p style={{ margin: '4px 0 0', color: '#ccc', fontSize: '12px' }}>
                约 {lesson.estimatedMinutes} 分钟
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
