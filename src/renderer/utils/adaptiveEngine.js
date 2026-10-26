// 自适应难度引擎
// 根据学生答题表现动态调整题目难度

import logger from './logger';

// 难度等级定义
export const DIFFICULTY_LEVELS = {
  EASY: { id: 'easy', name: '简单', multiplier: 0.7 },
  MEDIUM: { id: 'medium', name: '中等', multiplier: 1.0 },
  HARD: { id: 'hard', name: '困难', multiplier: 1.3 },
};

// 学习状态分析
function analyzePerformance(history) {
  if (history.length === 0) {
    return { accuracy: 0, streak: 0, recentTrend: 'stable' };
  }

  const correctCount = history.filter(h => h.isCorrect).length;
  const accuracy = correctCount / history.length;

  // 计算当前连对/连错
  let streak = 0;
  const lastResult = history[history.length - 1].isCorrect;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].isCorrect === lastResult) {
      streak++;
    } else {
      break;
    }
  }
  streak = lastResult ? streak : -streak;

  // 分析最近趋势（最近5题 vs 前5题）
  const recent5 = history.slice(-5);
  const prev5 = history.slice(-10, -5);
  let recentTrend = 'stable';
  if (recent5.length >= 3 && prev5.length >= 3) {
    const recentAcc = recent5.filter(h => h.isCorrect).length / recent5.length;
    const prevAcc = prev5.filter(h => h.isCorrect).length / prev5.length;
    if (recentAcc > prevAcc + 0.2) recentTrend = 'improving';
    else if (recentAcc < prevAcc - 0.2) recentTrend = 'declining';
  }

  return { accuracy, streak, recentTrend };
}

// 计算建议难度
export function calculateSuggestedDifficulty(history, currentDifficulty) {
  const { accuracy, streak, recentTrend } = analyzePerformance(history);
  logger.debug('AdaptiveEngine', `分析表现`, {
    accuracy: Math.round(accuracy * 100) + '%',
    streak,
    trend: recentTrend,
    currentDifficulty,
  });

  let suggestedDifficulty = currentDifficulty;

  // 连对3题：提升难度
  if (streak >= 3) {
    suggestedDifficulty = 'hard';
  }
  // 连对2题且趋势上升：倾向提升
  else if (streak >= 2 && recentTrend === 'improving') {
    suggestedDifficulty = currentDifficulty === 'easy' ? 'medium' : 'hard';
  }
  // 连错2题：降低难度
  else if (streak <= -2) {
    suggestedDifficulty = 'easy';
  }
  // 连错且趋势下降：倾向降低
  else if (streak <= -1 && recentTrend === 'declining') {
    suggestedDifficulty = currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  // 正确率在60-80%：保持中等
  else if (accuracy >= 0.6 && accuracy <= 0.8) {
    suggestedDifficulty = 'medium';
  }
  // 正确率低于60%：降低
  else if (accuracy < 0.6 && history.length >= 3) {
    suggestedDifficulty = currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  // 正确率高于85%：提升
  else if (accuracy > 0.85 && history.length >= 3) {
    suggestedDifficulty = currentDifficulty === 'easy' ? 'medium' : 'hard';
  }

  const shouldChange = suggestedDifficulty !== currentDifficulty;
  const reason = getDifficultyChangeReason(streak, accuracy, recentTrend);
  if (shouldChange) {
    logger.info('AdaptiveEngine', `难度调整: ${currentDifficulty} → ${suggestedDifficulty}`, {
      reason,
    });
  }

  return {
    difficulty: suggestedDifficulty,
    shouldChange,
    reason,
  };
}

// 获取难度变化原因
function getDifficultyChangeReason(streak, accuracy, trend) {
  if (streak >= 3) return '连续答对，挑战更高难度！';
  if (streak <= -2) return '连续答错，先从简单开始';
  if (trend === 'improving') return '表现进步，提升难度';
  if (trend === 'declining') return '需要巩固，降低难度';
  if (accuracy < 0.6) return '正确率较低，建议降低难度';
  if (accuracy > 0.85) return '正确率很高，可以挑战更难';
  return '';
}

// 知识点薄弱分析
export function analyzeWeakTopics(history) {
  const topicStats = {};

  history.forEach(h => {
    const topic = h.topic || '未分类';
    if (!topicStats[topic]) {
      topicStats[topic] = { total: 0, correct: 0 };
    }
    topicStats[topic].total++;
    if (h.isCorrect) topicStats[topic].correct++;
  });

  // 按正确率排序，找出薄弱点
  const weakTopics = Object.entries(topicStats)
    .map(([topic, stats]) => ({
      topic,
      accuracy: stats.correct / stats.total,
      total: stats.total,
    }))
    .filter(t => t.total >= 2 && t.accuracy < 0.7)
    .sort((a, b) => a.accuracy - b.accuracy);

  return weakTopics;
}

// 生成自适应测试结果报告
export function generateAdaptiveReport(history, difficultyChanges) {
  logger.info('AdaptiveEngine', '生成自适应报告', {
    totalHistory: history.length,
    changes: difficultyChanges.length,
  });
  const { accuracy, streak: _streak } = analyzePerformance(history);
  const weakTopics = analyzeWeakTopics(history);
  const correctCount = history.filter(h => h.isCorrect).length;
  const report = {
    totalQuestions: history.length,
    correctCount,
    accuracy: Math.round(accuracy * 100),
    maxStreak: Math.max(
      ...history.map((_, i) => {
        let streak = 0;
        for (let j = i; j < history.length && history[j].isCorrect; j++) streak++;
        return streak;
      }),
      0
    ),
    difficultyChanges,
    weakTopics,
    level: getLevelByAccuracy(accuracy),
  };
  logger.info(
    'AdaptiveEngine',
    `报告生成完成: 等级${report.level.grade} 正确率${report.accuracy}%`,
    { weakTopics: weakTopics.length }
  );
  return report;
}

// 根据正确率获取等级
function getLevelByAccuracy(accuracy) {
  if (accuracy >= 0.95) return { grade: 'S', text: '完美通关', color: '#FFD700' };
  if (accuracy >= 0.85) return { grade: 'A', text: '优秀', color: '#4CAF50' };
  if (accuracy >= 0.75) return { grade: 'B', text: '良好', color: '#2196F3' };
  if (accuracy >= 0.6) return { grade: 'C', text: '及格', color: '#FF9800' };
  return { grade: 'D', text: '需努力', color: '#FF5722' };
}

// 存储历史记录
const STORAGE_KEY = 'math-prince-adaptive-history';

export function loadHistory(userId) {
  const key = `${STORAGE_KEY}-${userId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveHistory(userId, history) {
  const key = `${STORAGE_KEY}-${userId}`;
  // 只保留最近100条记录
  const trimmed = history.slice(-100);
  localStorage.setItem(key, JSON.stringify(trimmed));
}

export function addHistoryRecord(userId, record) {
  logger.debug('AdaptiveEngine', `记录答题`, {
    isCorrect: record.isCorrect,
    topic: record.topic,
    difficulty: record.difficulty,
  });
  const history = loadHistory(userId);
  history.push({
    ...record,
    timestamp: Date.now(),
  });
  saveHistory(userId, history);
  return history;
}
