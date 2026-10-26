import {
  generateQuestion,
  generateQuestions,
  generateQuestionsByTopic,
  grade1Chapters,
  grade2Chapters,
  grade3Chapters,
  grade4Chapters,
  grade5Chapters,
} from '../../src/renderer/utils/questionGenerator.js';

describe('generateQuestion - 单题生成', () => {
  test('生成单个题目', () => {
    const q = generateQuestion(3);
    expect(q).toHaveProperty('content');
    expect(q).toHaveProperty('answer');
    expect(q).toHaveProperty('type');
  });

  test('题目 content 非空', () => {
    const q = generateQuestion(3);
    expect(q.content.length).toBeGreaterThan(0);
  });

  test('题目 answer 非空', () => {
    const q = generateQuestion(3);
    expect(q.answer.length).toBeGreaterThan(0);
  });

  test('无效年级回退到3年级', () => {
    const q = generateQuestion(99);
    expect(q).toHaveProperty('content');
    expect(q).toHaveProperty('answer');
  });
});

describe('generateQuestions - 批量生成', () => {
  test('生成指定数量题目', () => {
    const qs = generateQuestions(3, 10);
    expect(qs).toHaveLength(10);
  });

  test('默认生成10题', () => {
    const qs = generateQuestions(3);
    expect(qs).toHaveLength(10);
  });

  test('每题都有 content 和 answer', () => {
    const qs = generateQuestions(3, 5);
    qs.forEach(q => {
      expect(q.content.length).toBeGreaterThan(0);
      expect(q.answer.length).toBeGreaterThan(0);
    });
  });

  test('支持1-5年级', () => {
    for (let grade = 1; grade <= 5; grade++) {
      const qs = generateQuestions(grade, 3);
      expect(qs).toHaveLength(3);
    }
  });

  test('生成1题', () => {
    const qs = generateQuestions(3, 1);
    expect(qs).toHaveLength(1);
  });
});

describe('generateQuestionsByTopic - 按章节生成', () => {
  test('按章节生成题目', () => {
    const chapters = grade3Chapters;
    const topic = chapters[0].name;
    const qs = generateQuestionsByTopic(3, topic, 5);
    expect(qs.length).toBeGreaterThan(0);
  });

  test('未找到章节时回退到随机生成', () => {
    const qs = generateQuestionsByTopic(3, '不存在的章节', 5);
    expect(qs.length).toBeGreaterThan(0);
  });

  test('每题都有必需字段', () => {
    const chapters = grade3Chapters;
    const topic = chapters[0].name;
    const qs = generateQuestionsByTopic(3, topic, 3);
    qs.forEach(q => {
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
    });
  });
});

describe('章节列表', () => {
  test('grade1Chapters 非空', () => {
    expect(grade1Chapters.length).toBeGreaterThan(0);
  });

  test('grade2Chapters 非空', () => {
    expect(grade2Chapters.length).toBeGreaterThan(0);
  });

  test('grade3Chapters 非空', () => {
    expect(grade3Chapters.length).toBeGreaterThan(0);
  });

  test('grade4Chapters 非空', () => {
    expect(grade4Chapters.length).toBeGreaterThan(0);
  });

  test('grade5Chapters 非空', () => {
    expect(grade5Chapters.length).toBeGreaterThan(0);
  });

  test('每个章节有 id/name/unit', () => {
    grade3Chapters.forEach(ch => {
      expect(ch).toHaveProperty('id');
      expect(ch).toHaveProperty('name');
      expect(ch).toHaveProperty('unit');
    });
  });

  test('章节包含上册和下册', () => {
    const units = new Set(grade3Chapters.map(c => c.unit));
    expect(units.has('上册')).toBe(true);
    expect(units.has('下册')).toBe(true);
  });
});
