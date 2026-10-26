import {
  generateDistractors,
  convertToChoice,
  convertBatchToChoice,
} from '../../src/renderer/utils/questionTypes/choiceGenerator.js';

describe('generateDistractors', () => {
  test('数字答案生成3个干扰项', () => {
    const distractors = generateDistractors('10', '计算题', 3);
    expect(distractors).toHaveLength(3);
  });

  test('干扰项不包含正确答案', () => {
    for (let i = 0; i < 20; i++) {
      const distractors = generateDistractors('15', '计算题', 3);
      expect(distractors).not.toContain('15');
    }
  });

  test('干扰项互不重复', () => {
    const distractors = generateDistractors('10', '计算题', 3);
    const unique = new Set(distractors);
    expect(unique.size).toBe(distractors.length);
  });

  test('干扰项都是正数', () => {
    for (let i = 0; i < 20; i++) {
      const distractors = generateDistractors('3', '计算题', 3);
      distractors.forEach(d => {
        expect(Number(d)).toBeGreaterThan(0);
      });
    }
  });

  test('文字答案使用预定义干扰项', () => {
    const distractors = generateDistractors('锐角', '角度题', 3);
    expect(distractors).toContain('直角');
    expect(distractors).toContain('钝角');
  });

  test('方向答案生成正确干扰项', () => {
    const distractors = generateDistractors('南', '方向题', 3);
    expect(distractors).toContain('北');
    expect(distractors).toContain('东');
    expect(distractors).toContain('西');
  });

  test('自定义干扰项数量', () => {
    const d2 = generateDistractors('10', '计算题', 2);
    expect(d2).toHaveLength(2);
    const d5 = generateDistractors('10', '计算题', 5);
    expect(d5).toHaveLength(5);
  });
});

describe('convertToChoice', () => {
  test('转换后包含 options 字段', () => {
    const question = { content: '1+1=?', answer: '2', type: '计算' };
    const choice = convertToChoice(question);
    expect(choice).toHaveProperty('options');
    expect(choice.options).toHaveLength(4); // 1 correct + 3 distractors
  });

  test('options 包含正确答案', () => {
    const question = { content: '3+4=?', answer: '7', type: '计算' };
    const choice = convertToChoice(question);
    expect(choice.options).toContain('7');
  });

  test('设置 questionType 为 choice', () => {
    const question = { content: '5+5=?', answer: '10', type: '计算' };
    const choice = convertToChoice(question);
    expect(choice.questionType).toBe('choice');
  });

  test('保留原始 type 到 originalType', () => {
    const question = { content: '2+2=?', answer: '4', type: '加法' };
    const choice = convertToChoice(question);
    expect(choice.originalType).toBe('加法');
  });

  test('保留原始 content', () => {
    const question = { content: '一个苹果加两个苹果', answer: '3', type: '应用' };
    const choice = convertToChoice(question);
    expect(choice.content).toBe(question.content);
  });

  test('选项顺序被打乱（多次运行不完全相同）', () => {
    const question = { content: '1+1=?', answer: '2', type: '计算' };
    const orders = new Set();
    for (let i = 0; i < 20; i++) {
      const choice = convertToChoice(question);
      orders.add(choice.options.join(','));
    }
    // 20次运行应该有多种排列
    expect(orders.size).toBeGreaterThan(1);
  });
});

describe('convertBatchToChoice', () => {
  const questions = [
    { content: '1+1=?', answer: '2', type: '计算' },
    { content: '2+2=?', answer: '4', type: '计算' },
    { content: '3+3=?', answer: '6', type: '计算' },
    { content: '4+4=?', answer: '8', type: '计算' },
    { content: '一篇作文', answer: '略', type: '作文', isText: true },
  ];

  test('ratio=0 时全部保持原样', () => {
    const result = convertBatchToChoice(questions, 0);
    result.forEach(q => {
      expect(q.questionType).not.toBe('choice');
    });
  });

  test('ratio=1 时非文字题全部转为选择题', () => {
    const result = convertBatchToChoice(questions, 1);
    const nonText = result.filter(q => !q.isText);
    nonText.forEach(q => {
      expect(q.questionType).toBe('choice');
    });
  });

  test('文字题不被转换', () => {
    const result = convertBatchToChoice(questions, 1);
    const textQ = result.find(q => q.isText);
    expect(textQ.questionType).not.toBe('choice');
  });

  test('返回数组长度与输入相同', () => {
    const result = convertBatchToChoice(questions, 0.5);
    expect(result).toHaveLength(questions.length);
  });
});
