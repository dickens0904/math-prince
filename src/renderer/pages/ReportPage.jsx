import React, { useState, useEffect } from 'react';
import './ReportPage.css';

export default function ReportPage({ user, onBack }) {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctCount: 0,
    accuracy: 0,
    totalTime: 0,
    streakDays: 0,
    typeStats: {},
  });
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    // 从localStorage获取练习记录
    const records = JSON.parse(localStorage.getItem(`math-prince-records-${user.id}`) || '[]');
    calculateStats(records);
  }, [user.id, period]);

  const calculateStats = records => {
    const now = new Date();
    let filteredRecords = records;

    // 根据时间段筛选
    if (period === 'today') {
      const today = now.toISOString().split('T')[0];
      filteredRecords = records.filter(r => r.date === today);
    } else if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 86400000);
      filteredRecords = records.filter(r => new Date(r.date) >= weekAgo);
    } else if (period === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 86400000);
      filteredRecords = records.filter(r => new Date(r.date) >= monthAgo);
    }

    const totalQuestions = filteredRecords.reduce((sum, r) => sum + r.total, 0);
    const correctCount = filteredRecords.reduce((sum, r) => sum + r.correct, 0);
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const totalTime = filteredRecords.reduce((sum, r) => sum + r.time, 0);

    // 按题型统计
    const typeStats = {};
    filteredRecords.forEach(r => {
      if (r.details) {
        r.details.forEach(d => {
          if (!typeStats[d.type]) {
            typeStats[d.type] = { total: 0, correct: 0 };
          }
          typeStats[d.type].total++;
          if (d.isCorrect) typeStats[d.type].correct++;
        });
      }
    });

    // 计算连续学习天数
    const dates = [...new Set(records.map(r => r.date))].sort().reverse();
    let streakDays = 0;
    const today = now.toISOString().split('T')[0];
    let checkDate = new Date();

    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date(checkDate.getTime() - i * 86400000).toISOString().split('T')[0];
      if (dates.includes(expectedDate)) {
        streakDays++;
      } else {
        break;
      }
    }

    setStats({
      totalQuestions,
      correctCount,
      accuracy,
      totalTime,
      streakDays,
      typeStats,
    });
  };

  const formatTime = seconds => {
    if (seconds < 60) return `${seconds}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟`;
    return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分钟`;
  };

  const periodOptions = [
    { value: 'today', label: '今日' },
    { value: 'week', label: '本周' },
    { value: 'month', label: '本月' },
    { value: 'all', label: '全部' },
  ];

  // 计算各题型正确率
  const typeStatsArray = Object.entries(stats.typeStats)
    .map(([type, data]) => ({
      type,
      total: data.total,
      correct: data.correct,
      accuracy: Math.round((data.correct / data.total) * 100),
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="report-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="report-title">📊 学习报告</h1>
        </div>

        <div className="period-selector">
          {periodOptions.map(option => (
            <button
              key={option.value}
              className={`period-btn ${period === option.value ? 'selected' : ''}`}
              onClick={() => setPeriod(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="stats-overview">
          <div className="stat-card main">
            <div className="stat-number">{stats.totalQuestions}</div>
            <div className="stat-label">总题数</div>
          </div>
          <div className="stat-card correct">
            <div className="stat-number">{stats.correctCount}</div>
            <div className="stat-label">答对</div>
          </div>
          <div className="stat-card accuracy">
            <div className="stat-number">{stats.accuracy}%</div>
            <div className="stat-label">正确率</div>
          </div>
        </div>

        <div className="stats-detail">
          <div className="detail-card">
            <div className="detail-icon">⏱️</div>
            <div className="detail-info">
              <div className="detail-label">练习时长</div>
              <div className="detail-value">{formatTime(stats.totalTime)}</div>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-icon">🔥</div>
            <div className="detail-info">
              <div className="detail-label">连续学习</div>
              <div className="detail-value">{stats.streakDays} 天</div>
            </div>
          </div>
        </div>

        {/* 正确率图表 */}
        <div className="chart-section">
          <h3 className="section-title">正确率统计</h3>
          <div className="accuracy-chart">
            <div className="chart-bar-container">
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: `${stats.accuracy}%` }}></div>
              </div>
              <div className="chart-label">{stats.accuracy}%</div>
            </div>
            <div className="chart-description">
              {stats.accuracy >= 90
                ? '太棒了！继续保持！'
                : stats.accuracy >= 70
                  ? '很不错，继续加油！'
                  : stats.accuracy > 0
                    ? '需要多加练习哦！'
                    : '暂无数据'}
            </div>
          </div>
        </div>

        {/* 题型统计 */}
        {typeStatsArray.length > 0 && (
          <div className="chart-section">
            <h3 className="section-title">题型分析</h3>
            <div className="type-stats">
              {typeStatsArray.map((item, index) => (
                <div key={index} className="type-row">
                  <div className="type-name">{item.type}</div>
                  <div className="type-bar">
                    <div className="type-fill" style={{ width: `${item.accuracy}%` }}></div>
                  </div>
                  <div className="type-accuracy">{item.accuracy}%</div>
                  <div className="type-count">{item.total}题</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 学习建议 */}
        <div className="chart-section">
          <h3 className="section-title">学习建议</h3>
          <div className="suggestions">
            {stats.accuracy < 70 && stats.totalQuestions > 0 && (
              <div className="suggestion-item">
                <span className="suggestion-icon">📚</span>
                <span className="suggestion-text">正确率较低，建议先从基础题目开始练习</span>
              </div>
            )}
            {stats.totalQuestions < 10 && (
              <div className="suggestion-item">
                <span className="suggestion-icon">💪</span>
                <span className="suggestion-text">练习量不足，建议每天至少练习10道题</span>
              </div>
            )}
            {stats.streakDays >= 3 && (
              <div className="suggestion-item">
                <span className="suggestion-icon">🔥</span>
                <span className="suggestion-text">连续学习{stats.streakDays}天，继续保持！</span>
              </div>
            )}
            {stats.accuracy >= 90 && (
              <div className="suggestion-item">
                <span className="suggestion-icon">⭐</span>
                <span className="suggestion-text">正确率很高！可以尝试更高难度的题目</span>
              </div>
            )}
            {stats.totalQuestions === 0 && (
              <div className="suggestion-item">
                <span className="suggestion-icon">🚀</span>
                <span className="suggestion-text">还没有练习记录，快去开始练习吧！</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 导出保存练习记录的函数
export function savePracticeRecord(userId, record) {
  const records = JSON.parse(localStorage.getItem(`math-prince-records-${userId}`) || '[]');
  const today = new Date().toISOString().split('T')[0];

  records.push({
    date: today,
    total: record.total,
    correct: record.correct,
    time: record.time,
    details: record.details,
  });

  localStorage.setItem(`math-prince-records-${userId}`, JSON.stringify(records));
}
