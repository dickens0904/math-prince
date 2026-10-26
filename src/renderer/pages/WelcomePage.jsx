import React, { useState } from 'react';
import './WelcomePage.css';
import { characters } from '../utils/encouragement';

const avatars = [
  { id: 'prince', emoji: '👑', label: '小王子' },
  { id: 'wizard', emoji: '🧙', label: '魔法师' },
  { id: 'knight', emoji: '🦸', label: '骑士' },
  { id: 'cat', emoji: '🐱', label: '小猫咪' },
  { id: 'panda', emoji: '🐼', label: '大熊猫' },
  { id: 'rocket', emoji: '🚀', label: '火箭' },
  { id: 'star', emoji: '⭐', label: '星星' },
  { id: 'dragon', emoji: '🐉', label: '小龙' },
];

const grades = [
  { value: 1, label: '一年级', desc: '数的认识 · 20以内加减法', color: '#9C27B0' },
  { value: 2, label: '二年级', desc: '加减法 · 乘法口诀', color: '#4CAF50' },
  { value: 3, label: '三年级', desc: '乘除法 · 分数小数', color: '#2196F3' },
  { value: 4, label: '四年级', desc: '小数运算 · 几何图形', color: '#FF9800' },
  { value: 5, label: '五年级', desc: '分数运算 · 方程', color: '#E91E63' },
];

export default function WelcomePage({ onStart }) {
  const [step, setStep] = useState(1); // 1: 头像昵称, 2: 选伙伴, 3: 选年级
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('prince');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleNextStep = () => {
    if (nickname.trim()) {
      setStep(2);
    }
  };

  const handleStart = () => {
    if (selectedGrade) {
      onStart({
        nickname: nickname.trim(),
        avatar: selectedAvatar,
        grade: selectedGrade,
        character: selectedCharacter,
      });
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-bg-shapes">
        <div className="shape shape-1">+</div>
        <div className="shape shape-2">÷</div>
        <div className="shape shape-3">×</div>
        <div className="shape shape-4">=</div>
        <div className="shape shape-5">−</div>
        <div className="shape shape-6">+</div>
      </div>

      <div className="welcome-container">
        <div className="welcome-header">
          <div className="welcome-crown">👑</div>
          <h1 className="welcome-title">数学小王子</h1>
          <p className="welcome-subtitle">
            {step === 1
              ? '欢迎来到数学王国！先来认识一下你吧'
              : step === 2
                ? '选择你的学习伙伴吧！'
                : '选择你所在的年级'}
          </p>
        </div>

        {step === 1 ? (
          <div className="welcome-step step-1">
            <div className="form-group">
              <label className="form-label">你的昵称</label>
              <input
                type="text"
                className="form-input"
                placeholder="输入你的昵称..."
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                maxLength={10}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">选择头像</label>
              <div className="avatar-grid">
                {avatars.map(avatar => (
                  <button
                    key={avatar.id}
                    className={`avatar-btn ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    title={avatar.label}
                  >
                    <span className="avatar-emoji">{avatar.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="welcome-btn primary"
              onClick={handleNextStep}
              disabled={!nickname.trim()}
            >
              下一步 →
            </button>
          </div>
        ) : step === 2 ? (
          <div className="welcome-step step-2">
            <div className="form-group">
              <label className="form-label">选择学习伙伴 🎒</label>
              <div
                className="avatar-grid"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
              >
                {characters.map(char => (
                  <button
                    key={char.id}
                    className={`avatar-btn ${selectedCharacter?.id === char.id ? 'selected' : ''}`}
                    onClick={() => setSelectedCharacter(char)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px 8px',
                      gap: '6px',
                      borderColor: selectedCharacter?.id === char.id ? char.color : undefined,
                      background: selectedCharacter?.id === char.id ? `${char.color}15` : undefined,
                    }}
                  >
                    <span style={{ fontSize: '36px' }}>{char.emoji}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                      {char.name}
                    </span>
                    <span style={{ fontSize: '11px', color: '#888' }}>{char.personality}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedCharacter && (
              <div
                style={{
                  padding: '12px 16px',
                  margin: '12px 0',
                  borderRadius: '12px',
                  background: `${selectedCharacter.color}10`,
                  border: `1px solid ${selectedCharacter.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '28px' }}>{selectedCharacter.emoji}</span>
                <span style={{ fontSize: '14px', color: '#555' }}>
                  {selectedCharacter.greeting}
                </span>
              </div>
            )}

            <div className="step-2-buttons">
              <button className="welcome-btn secondary" onClick={() => setStep(1)}>
                ← 上一步
              </button>
              <button className="welcome-btn primary" onClick={() => setStep(3)}>
                下一步 →
              </button>
            </div>
          </div>
        ) : (
          <div className="welcome-step step-2">
            <div className="grade-grid">
              {grades.map(grade => (
                <button
                  key={grade.value}
                  className={`grade-card ${selectedGrade === grade.value ? 'selected' : ''}`}
                  onClick={() => setSelectedGrade(grade.value)}
                  style={{ '--grade-color': grade.color }}
                >
                  <div className="grade-year">{grade.label}</div>
                  <div className="grade-desc">{grade.desc}</div>
                  {selectedGrade === grade.value && <div className="grade-check">✓</div>}
                </button>
              ))}
            </div>

            <div className="step-2-buttons">
              <button className="welcome-btn secondary" onClick={() => setStep(2)}>
                ← 上一步
              </button>
              <button
                className="welcome-btn primary"
                onClick={handleStart}
                disabled={!selectedGrade}
              >
                开始学习！🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
