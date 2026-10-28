import React, { useState, useEffect, useRef } from 'react';
import AnimationCanvas from './AnimationCanvas.jsx';
import { speak, stopSpeaking } from '../utils/speech.js';

// 概念段：概念动画 + 讲解（文字 + 语音）
export default function ConceptSection({ lesson, onNext }) {
  const [showNarration, setShowNarration] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const mountedRef = useRef(true);

  const narration = lesson.concept.narration;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopSpeaking();
    };
  }, []);

  const handleSpeak = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setShowNarration(true);
    setSpeaking(true);
    const ok = await speak(narration, {
      rate: 0.95,
      onEnd: () => {
        if (mountedRef.current) setSpeaking(false);
      },
    });
    if (!ok) {
      // 没有可用语音时至少把文字展示出来
      if (mountedRef.current) setSpeaking(false);
      setShowNarration(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>💡 概念学习</h2>
      <h3 style={{ color: '#666' }}>{lesson.title}</h3>
      <p style={{ color: '#888', textAlign: 'center' }}>{lesson.objective}</p>

      <div style={{ width: '300px', height: '300px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <AnimationCanvas animation={lesson.concept.animation} />
      </div>

      <button
        onClick={handleSpeak}
        style={{
          padding: '8px 20px',
          borderRadius: '20px',
          border: 'none',
          background: speaking ? '#FF6B6B' : '#4ECDC4',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        {speaking ? '⏹ 停止讲解' : '🔊 听讲解'}
      </button>

      {showNarration && (
        <div style={{
          maxWidth: '400px',
          padding: '16px',
          background: '#FFF8F0',
          borderRadius: '12px',
          color: '#5D4E37',
          lineHeight: 1.8,
          fontSize: '15px',
        }}>
          {narration}
        </div>
      )}

      <button
        onClick={() => {
          stopSpeaking();
          onNext();
        }}
        style={{
          marginTop: '20px',
          padding: '12px 32px',
          borderRadius: '25px',
          border: 'none',
          background: '#FF6B6B',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        下一站：例题 →
      </button>
    </div>
  );
}
