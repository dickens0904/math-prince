import React, { useState, useEffect } from 'react';
import AnimationCanvas from './AnimationCanvas.jsx';
import { speak, stopSpeaking } from '../utils/speech.js';

// 例题段：例题动画 + 分步解答 + 说思路
export default function ExampleSection({ lesson, onNext }) {
  const [step, setStep] = useState(0);
  const [showSpeak, setShowSpeak] = useState(false);
  const [spoken, setSpoken] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(false);
  const solution = lesson.example.solution;

  useEffect(() => () => stopSpeaking(), []);

  // 朗读解题步骤
  const speakSolution = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    setSpeechError(false);
    const ok = await speak(solution.join('，'), {
      rate: 0.9,
      onEnd: () => setSpeaking(false),
    });
    if (ok) setSpoken(true);
    else {
      setSpeaking(false);
      setSpeechError(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>📖 例题讲解</h2>

      <div style={{
        maxWidth: '400px',
        padding: '16px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>{lesson.example.question}</p>
      </div>

      <div style={{ width: '300px', height: '300px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <AnimationCanvas animation={lesson.example.animation} />
      </div>

      {/* 分步解答 */}
      <div style={{
        maxWidth: '400px',
        padding: '16px',
        background: '#F0F8FF',
        borderRadius: '12px',
        minHeight: '100px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <p style={{ color: '#555', marginBottom: '8px', fontWeight: 'bold' }}>解题步骤：</p>
        {solution.slice(0, step + 1).map((s, i) => (
          <p key={i} style={{ color: '#333', lineHeight: 1.8 }}>{s}</p>
        ))}
      </div>

      {/* 下一步按钮 */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={speakSolution}
          style={{
            padding: '8px 20px',
            borderRadius: '20px',
            border: 'none',
            background: '#FFE66D',
            color: '#333',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {speaking ? '⏹ 停止朗读' : '🔊 朗读解题思路'}
        </button>
        {step < solution.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              border: 'none',
              background: '#4ECDC4',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            下一步 →
          </button>
        ) : (
          <button
            onClick={() => { setShowSpeak(true); }}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              border: 'none',
              background: '#FF6B6B',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            完成 →
          </button>
        )}
      </div>

      {showSpeak && (
        <div style={{
          maxWidth: '400px',
          padding: '16px',
          background: '#FFF8F0',
          borderRadius: '12px',
          color: '#5D4E37',
        }}>
          <p style={{ fontWeight: 'bold' }}>💡 说思路</p>
          <p style={{ fontSize: '14px' }}>
            小朋友，用你自己的话说说这道题是怎么做的？可以点上面的"朗读解题思路"听一遍示范，然后告诉爸爸妈妈你学会了什么。
          </p>
          {speechError && (
            <p style={{ color: '#FF9800', fontSize: '13px' }}>
              ⚠️ 当前环境没有中文语音，请由家长朗读或检查系统语音设置
            </p>
          )}
          {spoken && <p style={{ color: '#4CAF50' }}>✓ 已朗读示范，你已经说出来了！</p>}
          <button
            onClick={() => { stopSpeaking(); onNext(); }}
            style={{
              marginTop: '12px',
              padding: '10px 24px',
              borderRadius: '20px',
              border: 'none',
              background: '#FF6B6B',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            进入练习 →
          </button>
        </div>
      )}
    </div>
  );
}
