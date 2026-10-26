import {
  DIFFICULTY_LEVELS,
  calculateSuggestedDifficulty,
  analyzeWeakTopics,
  generateAdaptiveReport,
} from '../../src/renderer/utils/adaptiveEngine.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: key => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
globalThis.localStorage = localStorageMock;

describe('难度等级定义', () => {
  test('包含 EASY/MEDIUM/HARD 三个级别', () => {
    expect(DIFFICULTY_LEVELS).toHaveProperty('EASY');
    expect(DIFFICULTY_LEVELS).toHaveProperty('MEDIUM');
    expect(DIFFICULTY_LEVELS).toHaveProperty('HARD');
  });

  test('每个级别有 id/name/multiplier', () => {
    Object.values(DIFFICULTY_LEVELS).forEach(level => {
      expect(level).toHaveProperty('id');
      expect(level).toHaveProperty('name');
      expect(level).toHaveProperty('multiplier');
    });
  });

  test('难度系数递增', () => {
    expect(DIFFICULTY_LEVELS.EASY.multiplier).toBeLessThan(DIFFICULTY_LEVELS.MEDIUM.multiplier);
    expect(DIFFICULTY_LEVELS.MEDIUM.multiplier).toBeLessThan(DIFFICULTY_LEVELS.HARD.multiplier);
  });
});

describe('calculateSuggestedDifficulty', () => {
  test('空历史返回当前难度不变', () => {
    const result = calculateSuggestedDifficulty([], 'medium');
    expect(result.difficulty).toBe('medium');
    expect(result.shouldChange).toBe(false);
  });

  test('连续答对3题提升到困难', () => {
    const history = [{ isCorrect: true }, { isCorrect: true }, { isCorrect: true }];
    const result = calculateSuggestedDifficulty(history, 'medium');
    expect(result.difficulty).toBe('hard');
    expect(result.shouldChange).toBe(true);
  });

  test('连续答错2题降低到简单', () => {
    const history = [{ isCorrect: true }, { isCorrect: false }, { isCorrect: false }];
    const result = calculateSuggestedDifficulty(history, 'medium');
    expect(result.difficulty).toBe('easy');
    expect(result.shouldChange).toBe(true);
  });

  test('正确率60-80%保持中等（无连错）', () => {
    const history = [
      { isCorrect: false },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
    ]; // 60%, last=false, streak=-1
    const result = calculateSuggestedDifficulty(history, 'medium');
    // streak=-1 but no declining trend (need prev5 for trend), so accuracy check runs
    expect(result.difficulty).toBe('medium');
    expect(result.shouldChange).toBe(false);
  });

  test('正确率低于60%且历史>=3条降低难度', () => {
    const history = [
      { isCorrect: false },
      { isCorrect: true },
      { isCorrect: false },
      { isCorrect: false },
      { isCorrect: true },
    ]; // 40%, last=true, streak=+1
    const result = calculateSuggestedDifficulty(history, 'hard');
    expect(result.difficulty).toBe('medium');
    expect(result.shouldChange).toBe(true);
  });

  test('正确率高于85%且历史>=3条提升难度', () => {
    const history = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
    ]; // 80% - not quite 85%, let's make it higher
    const history2 = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
    ]; // 90%
    const result = calculateSuggestedDifficulty(history2, 'easy');
    expect(result.difficulty).toBe('medium');
    expect(result.shouldChange).toBe(true);
  });

  test('返回值包含 reason 字段', () => {
    const history = [{ isCorrect: true }, { isCorrect: true }, { isCorrect: true }];
    const result = calculateSuggestedDifficulty(history, 'medium');
    expect(result).toHaveProperty('reason');
    expect(typeof result.reason).toBe('string');
  });
});

describe('analyzeWeakTopics', () => {
  test('空历史返回空数组', () => {
    expect(analyzeWeakTopics([])).toEqual([]);
  });

  test('正确率高于70%的主题不算薄弱', () => {
    const history = [
      { topic: '加法', isCorrect: true },
      { topic: '加法', isCorrect: true },
      { topic: '加法', isCorrect: true },
      { topic: '加法', isCorrect: false },
    ]; // 75%
    const weak = analyzeWeakTopics(history);
    expect(weak).toHaveLength(0);
  });

  test('正确率低于70%且>=2题的主题算薄弱', () => {
    const history = [
      { topic: '乘法', isCorrect: true },
      { topic: '乘法', isCorrect: false },
      { topic: '乘法', isCorrect: false },
      { topic: '乘法', isCorrect: false },
    ]; // 25%
    const weak = analyzeWeakTopics(history);
    expect(weak).toHaveLength(1);
    expect(weak[0].topic).toBe('乘法');
    expect(weak[0].accuracy).toBe(0.25);
  });

  test('只有1题的主题不算薄弱', () => {
    const history = [{ topic: '除法', isCorrect: false }];
    const weak = analyzeWeakTopics(history);
    expect(weak).toHaveLength(0);
  });

  test('薄弱主题按正确率升序排列', () => {
    const history = [
      { topic: 'A', isCorrect: true },
      { topic: 'A', isCorrect: false },
      { topic: 'A', isCorrect: false },
      { topic: 'B', isCorrect: false },
      { topic: 'B', isCorrect: false },
      { topic: 'B', isCorrect: false },
    ];
    const weak = analyzeWeakTopics(history);
    expect(weak.length).toBeGreaterThanOrEqual(2);
    expect(weak[0].accuracy).toBeLessThanOrEqual(weak[1].accuracy);
  });

  test('无topic字段归为未分类', () => {
    const history = [{ isCorrect: false }, { isCorrect: false }, { isCorrect: false }];
    const weak = analyzeWeakTopics(history);
    expect(weak[0].topic).toBe('未分类');
  });
});

describe('generateAdaptiveReport', () => {
  test('生成完整报告结构', () => {
    const history = [
      { isCorrect: true, topic: '加法' },
      { isCorrect: true, topic: '加法' },
      { isCorrect: false, topic: '乘法' },
    ];
    const report = generateAdaptiveReport(history, []);

    expect(report).toHaveProperty('totalQuestions');
    expect(report).toHaveProperty('correctCount');
    expect(report).toHaveProperty('accuracy');
    expect(report).toHaveProperty('maxStreak');
    expect(report).toHaveProperty('difficultyChanges');
    expect(report).toHaveProperty('weakTopics');
    expect(report).toHaveProperty('level');

    expect(report.totalQuestions).toBe(3);
    expect(report.correctCount).toBe(2);
    expect(report.accuracy).toBe(67); // Math.round(2/3 * 100)
  });

  test('全对报告等级为S', () => {
    const history = Array(10)
      .fill(null)
      .map(() => ({ isCorrect: true }));
    const report = generateAdaptiveReport(history, []);
    expect(report.level.grade).toBe('S');
    expect(report.accuracy).toBe(100);
  });

  test('全错报告等级为D', () => {
    const history = Array(10)
      .fill(null)
      .map(() => ({ isCorrect: false }));
    const report = generateAdaptiveReport(history, []);
    expect(report.level.grade).toBe('D');
    expect(report.accuracy).toBe(0);
  });

  test('maxStreak 正确计算最长连对', () => {
    const history = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
    ];
    const report = generateAdaptiveReport(history, []);
    expect(report.maxStreak).toBe(3);
  });

  test('difficultyChanges 透传到报告', () => {
    const changes = [{ from: 'medium', to: 'hard', reason: '测试' }];
    const history = [{ isCorrect: true }];
    const report = generateAdaptiveReport(history, changes);
    expect(report.difficultyChanges).toEqual(changes);
  });

  test('等级映射正确', () => {
    const testCases = [
      { accuracy: 0.96, grade: 'S' },
      { accuracy: 0.9, grade: 'A' },
      { accuracy: 0.8, grade: 'B' },
      { accuracy: 0.65, grade: 'C' },
      { accuracy: 0.4, grade: 'D' },
    ];

    testCases.forEach(({ accuracy, grade }) => {
      const history = Array(100)
        .fill(null)
        .map((_, i) => ({
          isCorrect: i < accuracy * 100,
        }));
      const report = generateAdaptiveReport(history, []);
      expect(report.level.grade).toBe(grade);
    });
  });
});
