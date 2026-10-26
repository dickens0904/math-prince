import React, { useState, useEffect } from 'react';
import './BadgePage.css';

const ALL_BADGES = [
  {
    id: 'first_step',
    name: '初学者',
    desc: '完成第一道题目',
    icon: '🌱',
    condition: 'totalQuestions >= 1',
  },
  {
    id: 'calculator',
    name: '计算小达人',
    desc: '连续答对10道题',
    icon: '🧮',
    condition: 'streakCorrect >= 10',
  },
  {
    id: 'hundred',
    name: '口算高手',
    desc: '完成100道口算题',
    icon: '💯',
    condition: 'totalQuestions >= 100',
  },
  {
    id: 'persistent',
    name: '坚持不懈',
    desc: '连续签到7天',
    icon: '🔥',
    condition: 'streakDays >= 7',
  },
  {
    id: 'thousand',
    name: '千题达人',
    desc: '完成1000道题',
    icon: '🏆',
    condition: 'totalQuestions >= 1000',
  },
  {
    id: 'perfect',
    name: '完美主义',
    desc: '单次练习全部答对',
    icon: '⭐',
    condition: 'perfectPractice >= 1',
  },
  {
    id: 'speed_king',
    name: '速度之王',
    desc: '计时挑战获得S级',
    icon: '⚡',
    condition: 'challengeGradeS >= 1',
  },
  {
    id: 'error_killer',
    name: '错题克星',
    desc: '掌握10道错题',
    icon: '🎯',
    condition: 'masteredErrors >= 10',
  },
  {
    id: 'math_star',
    name: '数学之星',
    desc: '获得1000积分',
    icon: '🌟',
    condition: 'totalExp >= 1000',
  },
  {
    id: 'week_warrior',
    name: '周战士',
    desc: '连续学习7天',
    icon: '🛡️',
    condition: 'streakDays >= 7',
  },
  {
    id: 'topic_master',
    name: '专项精通',
    desc: '单个知识点正确率90%+',
    icon: '📚',
    condition: 'topicMastery >= 1',
  },
  {
    id: 'champion',
    name: '全能冠军',
    desc: '所有功能都使用过',
    icon: '👑',
    condition: 'allFeaturesUsed >= 1',
  },
];

export default function BadgePage({ user, onBack }) {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    // 从localStorage获取已获得的徽章
    const saved = localStorage.getItem(`math-prince-badges-${user.id}`);
    if (saved) {
      setEarnedBadges(JSON.parse(saved));
    }
    checkBadges();
  }, [user.id]);

  // 检查并解锁徽章
  const checkBadges = () => {
    const records = JSON.parse(localStorage.getItem(`math-prince-records-${user.id}`) || '[]');
    const wrongQuestions = JSON.parse(localStorage.getItem(`math-prince-wrong-${user.id}`) || '[]');
    const savedBadges = JSON.parse(localStorage.getItem(`math-prince-badges-${user.id}`) || '[]');

    const stats = {
      totalQuestions: records.reduce((sum, r) => sum + r.total, 0),
      streakCorrect: calculateStreakCorrect(records),
      streakDays: calculateStreakDays(records),
      perfectPractice: records.filter(r => r.correct === r.total).length,
      challengeGradeS: parseInt(localStorage.getItem(`math-prince-s-grade-${user.id}`) || '0'),
      masteredErrors: wrongQuestions.filter(q => q.mastered).length,
      totalExp: user.exp || 0,
      topicMastery: calculateTopicMastery(records),
      allFeaturesUsed: checkAllFeaturesUsed(user.id),
    };

    const newBadges = [];

    ALL_BADGES.forEach(badge => {
      if (!savedBadges.includes(badge.id)) {
        const conditionMet = evalCondition(badge.condition, stats);
        if (conditionMet) {
          newBadges.push(badge.id);
        }
      }
    });

    if (newBadges.length > 0) {
      const updatedBadges = [...savedBadges, ...newBadges];
      localStorage.setItem(`math-prince-badges-${user.id}`, JSON.stringify(updatedBadges));
      setEarnedBadges(updatedBadges);
    }
  };

  const evalCondition = (condition, stats) => {
    try {
      const [key, op, value] = condition.split(/(>=|<=|>|<|=)/);
      const statValue = stats[key.trim()] || 0;
      const targetValue = parseInt(value.trim());
      switch (op) {
        case '>=':
          return statValue >= targetValue;
        case '<=':
          return statValue <= targetValue;
        case '>':
          return statValue > targetValue;
        case '<':
          return statValue < targetValue;
        case '=':
          return statValue === targetValue;
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const calculateStreakCorrect = records => {
    let maxStreak = 0;
    let currentStreak = 0;
    records.forEach(r => {
      if (r.details) {
        r.details.forEach(d => {
          if (d.isCorrect) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        });
      }
    });
    return maxStreak;
  };

  const calculateStreakDays = records => {
    const dates = [...new Set(records.map(r => r.date))].sort().reverse();
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date(now.getTime() - i * 86400000).toISOString().split('T')[0];
      if (dates.includes(expectedDate)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const calculateTopicMastery = records => {
    const typeStats = {};
    records.forEach(r => {
      if (r.details) {
        r.details.forEach(d => {
          if (!typeStats[d.type]) typeStats[d.type] = { total: 0, correct: 0 };
          typeStats[d.type].total++;
          if (d.isCorrect) typeStats[d.type].correct++;
        });
      }
    });
    return Object.values(typeStats).filter(s => s.total >= 10 && s.correct / s.total >= 0.9).length;
  };

  const checkAllFeaturesUsed = userId => {
    const hasPractice = localStorage.getItem(`math-prince-records-${userId}`);
    const hasChallenge = localStorage.getItem(`math-prince-s-grade-${userId}`);
    const hasWrong = localStorage.getItem(`math-prince-wrong-${userId}`);
    return hasPractice && hasChallenge && hasWrong ? 1 : 0;
  };

  const earnedCount = earnedBadges.length;
  const totalCount = ALL_BADGES.length;
  const progress = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="badge-page">
      <div className="badge-container">
        <div className="badge-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="badge-title">🏆 徽章收集</h1>
          <p className="badge-subtitle">
            已获得 {earnedCount} / {totalCount} 个徽章
          </p>
        </div>

        <div className="badge-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>

        <div className="badge-grid">
          {ALL_BADGES.map(badge => {
            const isEarned = earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`badge-card ${isEarned ? 'earned' : 'locked'}`}
                onClick={() => setSelectedBadge(badge)}
              >
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-name">{badge.name}</div>
                {isEarned && <div className="badge-check">✓</div>}
              </div>
            );
          })}
        </div>

        {selectedBadge && (
          <div className="badge-detail" onClick={() => setSelectedBadge(null)}>
            <div className="detail-content" onClick={e => e.stopPropagation()}>
              <div className="detail-icon">{selectedBadge.icon}</div>
              <h3 className="detail-name">{selectedBadge.name}</h3>
              <p className="detail-desc">{selectedBadge.desc}</p>
              <div
                className={`detail-status ${earnedBadges.includes(selectedBadge.id) ? 'earned' : 'locked'}`}
              >
                {earnedBadges.includes(selectedBadge.id) ? '已获得' : '未解锁'}
              </div>
              <button className="detail-close" onClick={() => setSelectedBadge(null)}>
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 导出检查徽章的函数
export function checkBadgeProgress(userId, user) {
  const records = JSON.parse(localStorage.getItem(`math-prince-records-${userId}`) || '[]');
  const wrongQuestions = JSON.parse(localStorage.getItem(`math-prince-wrong-${userId}`) || '[]');
  const savedBadges = JSON.parse(localStorage.getItem(`math-prince-badges-${userId}`) || '[]');

  const newBadges = [];
  const totalQuestions = records.reduce((sum, r) => sum + r.total, 0);
  const totalExp = user.exp || 0;

  // 检查简单条件
  if (totalQuestions >= 1 && !savedBadges.includes('first_step')) newBadges.push('first_step');
  if (totalQuestions >= 100 && !savedBadges.includes('hundred')) newBadges.push('hundred');
  if (totalQuestions >= 1000 && !savedBadges.includes('thousand')) newBadges.push('thousand');
  if (totalExp >= 1000 && !savedBadges.includes('math_star')) newBadges.push('math_star');

  if (newBadges.length > 0) {
    const updated = [...savedBadges, ...newBadges];
    localStorage.setItem(`math-prince-badges-${userId}`, JSON.stringify(updated));
    return newBadges;
  }
  return [];
}
