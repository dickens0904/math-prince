import React, { useState } from 'react';
import './TopicPage.css';
import {
  grade1Chapters,
  grade2Chapters,
  grade3Chapters,
  grade4Chapters,
  grade5Chapters,
  generateQuestionsByTopic,
} from '../utils/questionGenerator';

const allChapters = {
  1: grade1Chapters,
  2: grade2Chapters,
  3: grade3Chapters,
  4: grade4Chapters,
  5: grade5Chapters,
};

export default function TopicPage({ user, onBack, onStartPractice }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);

  const chapters = allChapters[user.grade] || allChapters[3];

  const handleStart = () => {
    if (selectedTopic) {
      const questions = generateQuestionsByTopic(user.grade, selectedTopic, questionCount);
      onStartPractice(selectedTopic, questions);
    }
  };

  const getTopicIcon = topic => {
    const iconMap = {
      加: '➕',
      减: '➖',
      乘: '✖️',
      除: '➗',
      分数: '🔢',
      小数: '📐',
      方程: '🔤',
      体积: '📦',
      因数: '🔗',
      倍: '✖️',
      读法: '📖',
      表示: '📝',
      面积: '📏',
      周长: '📐',
      元: '💰',
      角: '📐',
      年: '📅',
      时: '⏰',
      重量: '⚖️',
      方向: '🧭',
      对称: '🪞',
      三角: '🔺',
      四边: '⬜',
    };
    for (const [key, icon] of Object.entries(iconMap)) {
      if (topic.includes(key)) return icon;
    }
    return '📝';
  };

  const getChapterIcon = chapter => {
    const iconMap = {
      加减: '➕',
      乘法: '✖️',
      除法: '➗',
      几何: '📐',
      时分: '⏰',
      千以: '🔢',
      三位: '📊',
      克: '⚖️',
      方向: '🧭',
      对称: '🪞',
      三角: '🔺',
      连乘: '✖️',
    };
    for (const [key, icon] of Object.entries(iconMap)) {
      if (chapter.name.includes(key)) return icon;
    }
    return '📝';
  };

  return (
    <div className="topic-page">
      <div className="topic-container">
        <div className="topic-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="topic-title">📚 专项突破</h1>
          <p className="topic-subtitle">选择章节，每个章节包含基础题和综合应用题</p>
        </div>

        {/* 按章节显示 - 所有年级通用 */}
        <div className="chapter-section">
          <h3 className="section-label">📗 上册</h3>
          <div className="topic-grid">
            {chapters
              .filter(c => c.unit === '上册')
              .map(chapter => (
                <button
                  key={chapter.id}
                  className={`topic-card ${selectedTopic === chapter.name ? 'selected' : ''}`}
                  onClick={() => setSelectedTopic(chapter.name)}
                >
                  <span className="topic-icon">{getChapterIcon(chapter)}</span>
                  <span className="topic-name">{chapter.name}</span>
                  {selectedTopic === chapter.name && <span className="topic-check">✓</span>}
                </button>
              ))}
          </div>
        </div>

        <div className="chapter-section">
          <h3 className="section-label">📘 下册</h3>
          <div className="topic-grid">
            {chapters
              .filter(c => c.unit === '下册')
              .map(chapter => (
                <button
                  key={chapter.id}
                  className={`topic-card ${selectedTopic === chapter.name ? 'selected' : ''}`}
                  onClick={() => setSelectedTopic(chapter.name)}
                >
                  <span className="topic-icon">{getChapterIcon(chapter)}</span>
                  <span className="topic-name">{chapter.name}</span>
                  {selectedTopic === chapter.name && <span className="topic-check">✓</span>}
                </button>
              ))}
          </div>
        </div>

        {selectedTopic && (
          <div className="topic-settings">
            <div className="setting-group">
              <label className="setting-label">题目数量</label>
              <div className="count-options">
                {[10, 20, 30, 50].map(count => (
                  <button
                    key={count}
                    className={`count-btn ${questionCount === count ? 'selected' : ''}`}
                    onClick={() => setQuestionCount(count)}
                  >
                    {count}题
                  </button>
                ))}
              </div>
            </div>

            <button className="start-btn" onClick={handleStart}>
              开始练习
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
