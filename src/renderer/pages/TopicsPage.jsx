import React from 'react';
import { TOPICS } from '../data/topics.js';

// 奥数班主题选择页
export default function TopicsPage({ onSelectTopic, onBack }) {
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
        ← 返回首页
      </button>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px' }}>🧮</div>
        <h1 style={{ color: '#333', margin: '8px 0' }}>奥数班</h1>
        <p style={{ color: '#888', fontSize: '14px' }}>
          不分年级，按主题学习 · 动画讲概念 · 每课10-15分钟
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {TOPICS.map(topic => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            style={{
              padding: '20px',
              borderRadius: '16px',
              border: 'none',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              textAlign: 'center',
              borderTop: `4px solid ${topic.color}`,
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>{topic.icon}</div>
            <p style={{ margin: '0', color: '#333', fontWeight: 'bold', fontSize: '16px' }}>
              {topic.name}
            </p>
            <p style={{ margin: '4px 0 0', color: '#999', fontSize: '12px', lineHeight: 1.5 }}>
              {topic.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
