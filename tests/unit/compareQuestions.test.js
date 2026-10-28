import { genCompareCalc as genGrade2Compare } from '../../src/renderer/utils/questions/grade2-basic.js';
import { genCompareCalc as genGrade3Compare } from '../../src/renderer/utils/questions/grade3-basic.js';
import { genCompareCalc as genGrade4Compare } from '../../src/renderer/utils/questions/grade4-basic.js';
import {
  chapters as grade2Chapters,
  generateChapterBasic as generateGrade2ChapterBasic,
} from '../../src/renderer/utils/questions/grade2-index.js';
import {
  chapters as grade3Chapters,
  generateChapterBasic as generateGrade3ChapterBasic,
} from '../../src/renderer/utils/questions/grade3-index.js';
import {
  chapters as grade4Chapters,
  generateChapterBasic as generateGrade4ChapterBasic,
} from '../../src/renderer/utils/questions/grade4-index.js';

// 将 "a ○ b（填 >、< 或 =）" 拆成左右两部分
function splitCompare(content) {
  const m = content.match(/^(.+?)\s*○\s*(.+?)（填 >、< 或 =）$/);
  expect(m).not.toBeNull();
  return { left: m[1], right: m[2] };
}

// 求值算式（如 "25 + 17"、"3×4-5"、"(24 + 18) ÷ 7"）
function evaluate(expr) {
  const normalized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\s/g, '');
  return Function(`"use strict"; return (${normalized});`)();
}

// 算式求值后校验方向符正确
function checkDirection(q) {
  const { left, right } = splitCompare(q.content);
  const lv = evaluate(left);
  const rv = evaluate(right);
  const expected = lv > rv ? '>' : lv < rv ? '<' : '=';
  expect(q.answer).toBe(expected);
}

describe('二年级 比较大小 genCompareCalc', () => {
  test('批量生成30题，字段齐全且方向符合法', () => {
    for (let i = 0; i < 30; i++) {
      const q = genGrade2Compare();
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('difficulty');
      expect(q.type).toBe('比较大小');
      expect(q.difficulty).toBe(1);
      expect(q.content).toContain('○');
      expect(['>', '<', '=']).toContain(q.answer);
    }
  });

  test('算式求值后方向符正确', () => {
    for (let i = 0; i < 50; i++) {
      checkDirection(genGrade2Compare());
    }
  });

  test('算式中所有数不超过100', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade2Compare();
      const nums = q.content.match(/\d+/g).map(Number);
      nums.forEach(v => expect(v).toBeLessThanOrEqual(100));
    }
  });
});

describe('三年级 比较大小 genCompareCalc', () => {
  test('批量生成30题，字段齐全且方向符合法', () => {
    for (let i = 0; i < 30; i++) {
      const q = genGrade3Compare();
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('difficulty');
      expect(q.type).toBe('比较大小');
      expect(q.difficulty).toBe(2);
      expect(q.content).toContain('○');
      expect(['>', '<', '=']).toContain(q.answer);
    }
  });

  test('算式均含乘或除，求值后方向符正确', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade3Compare();
      expect(q.content).toMatch(/[×÷]/);
      checkDirection(q);
    }
  });

  test('除法计算结果均为整数（能整除）', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade3Compare();
      const { left, right } = splitCompare(q.content);
      [left, right].forEach(expr => {
        if (expr.includes('÷')) {
          expect(Number.isInteger(evaluate(expr))).toBe(true);
        }
      });
    }
  });
});

describe('四年级 比较大小 genCompareCalc', () => {
  test('批量生成30题，字段齐全且方向符合法', () => {
    for (let i = 0; i < 30; i++) {
      const q = genGrade4Compare();
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('difficulty');
      expect(q.type).toBe('比较大小');
      expect(q.difficulty).toBe(2);
      expect(q.content).toContain('○');
      expect(['>', '<', '=']).toContain(q.answer);
    }
  });

  test('算式求值后方向符正确', () => {
    for (let i = 0; i < 50; i++) {
      checkDirection(genGrade4Compare());
    }
  });

  test('至少一侧为两步混合运算', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade4Compare();
      const { left, right } = splitCompare(q.content);
      const opCount = s => (s.match(/[+\-×÷]/g) || []).length;
      expect(Math.max(opCount(left), opCount(right))).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('比较大小注册到章节生成清单', () => {
  test('二年级挂在「100以内加减法」章节', () => {
    const ch = grade2Chapters.find(c => c.name === '100以内加减法');
    expect(ch).toBeDefined();
    expect(ch.basicGenerators).toContain(genGrade2Compare);
  });

  test('三年级挂在「两步四则运算」章节', () => {
    const ch = grade3Chapters.find(c => c.name === '两步四则运算');
    expect(ch).toBeDefined();
    expect(ch.basicGenerators).toContain(genGrade3Compare);
  });

  test('四年级挂在「整数四则混合运算」章节', () => {
    const ch = grade4Chapters.find(c => c.name === '整数四则混合运算');
    expect(ch).toBeDefined();
    expect(ch.basicGenerators).toContain(genGrade4Compare);
  });
});

describe('比较大小可被章节随机命中', () => {
  test('二年级章节抽题能命中比较大小题型', () => {
    const questions = generateGrade2ChapterBasic(1, 200);
    expect(questions.some(q => q.type === '比较大小')).toBe(true);
  });

  test('三年级章节抽题能命中比较大小题型', () => {
    const questions = generateGrade3ChapterBasic(1, 200);
    expect(questions.some(q => q.type === '比较大小')).toBe(true);
  });

  test('四年级章节抽题能命中比较大小题型', () => {
    const questions = generateGrade4ChapterBasic(2, 200);
    expect(questions.some(q => q.type === '比较大小')).toBe(true);
  });
});
