import React from 'react';
import './HomePage.css';

const avatarMap = {
  prince: '👑',
  wizard: '🧙',
  knight: '🦸',
  cat: '🐱',
  panda: '🐼',
  rocket: '🚀',
  star: '⭐',
  dragon: '🐉',
};

const levelNames = ['新手', '铜牌', '银牌', '金牌', '钻石'];
const levelThresholds = [0, 100, 500, 1500, 5000];

function getLevelInfo(exp) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (exp >= levelThresholds[i]) {
      const current = levelThresholds[i];
      const next = levelThresholds[i + 1] || current;
      const progress = next > current ? ((exp - current) / (next - current)) * 100 : 100;
      return { level: i + 1, name: levelNames[i], progress: Math.min(progress, 100) };
    }
  }
  return { level: 1, name: '新手', progress: 0 };
}

export default function HomePage({ user, onNavigate }) {
  const levelInfo = getLevelInfo(user.exp || 0);

  const menuItems = [
    { id: 'olympiad', icon: '🧮', title: '奥数班', desc: '动画学奥数，不分年级', color: '#FF6B6B' },
    { id: 'practice', icon: '📝', title: '日常练习', desc: '每日推荐练习题', color: '#4CAF50' },
    { id: 'challenge', icon: '⏱️', title: '计时挑战', desc: '限时计算训练', color: '#FF9800' },
    { id: 'topic', icon: '📚', title: '专项突破', desc: '按知识点练习', color: '#2196F3' },
    { id: 'exam', icon: '📋', title: '自动出卷', desc: '生成打印试卷', color: '#009688' },
    { id: 'wrong', icon: '📕', title: '错题本', desc: '复习错题', color: '#E91E63' },
    { id: 'report', icon: '📊', title: '学习报告', desc: '查看学习数据', color: '#9C27B0' },
    { id: 'badge', icon: '🏆', title: '我的徽章', desc: '成就收集', color: '#FF5722' },
  ];

  return (
    <div className="home-page">
      {/* 用户信息卡片 */}
      <div className="user-card">
        <div className="user-avatar">{avatarMap[user.avatar] || '👑'}</div>
        <div className="user-info">
          <h2 className="user-nickname">{user.nickname}</h2>
          <div className="user-grade">{['一', '二', '三', '四', '五'][user.grade - 1]}年级</div>
        </div>
        <div className="user-level">
          <div className="level-badge">{levelInfo.name}</div>
          <div className="level-bar">
            <div className="level-fill" style={{ width: `${levelInfo.progress}%` }}></div>
          </div>
          <div className="level-exp">
            {user.exp || 0} / {levelThresholds[levelInfo.level] || '∞'} 经验
          </div>
        </div>
      </div>

      {/* 功能入口 */}
      <div className="menu-grid">
        {menuItems.map(item => (
          <button
            key={item.id}
            className="menu-card"
            onClick={() => onNavigate(item.id)}
            style={{ '--card-color': item.color }}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-title">{item.title}</span>
            <span className="menu-desc">{item.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
