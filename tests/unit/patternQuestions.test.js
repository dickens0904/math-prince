import { genNumberPattern as genGrade2Pattern } from '../../src/renderer/utils/questions/grade2-basic.js';
import { genNumberPattern as genGrade3Pattern } from '../../src/renderer/utils/questions/grade3-basic.js';
import { genNumberPattern as genGrade4Pattern } from '../../src/renderer/utils/questions/grade4-basic.js';
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

// 从 content 中解析数列（如 "找规律填数：2、4、6、8、（ ）"）
function parseSequence(content) {
  const nums = content.match(/\d+/g);
  return nums ? nums.map(Number) : [];
}

function diffsOf(seq) {
  return seq.slice(1).map((v, i) => v - seq[i]);
}

// 按常见规律家族（等差、交替加减、等比、乘加混合）推导下一项
function predictNext(seq) {
  const n = seq.length;
  const diffs = diffsOf(seq);

  // 规律1：等差
  if (new Set(diffs).size === 1) return seq[n - 1] + diffs[0];

  // 规律2：两层交替（+a、-b 或 +a、+b 循环）
  if (diffs.length >= 4 && diffs[0] !== diffs[1] && diffs[0] === diffs[2] && diffs[1] === diffs[3]) {
    return seq[n - 1] + diffs[0];
  }

  // 规律3：等比（×m 或 ÷m）
  let ratio = null;
  let isGeometric = seq[0] !== 0;
  for (let i = 1; i < n && isGeometric; i++) {
    if (seq[i - 1] === 0) {
      isGeometric = false;
      break;
    }
    const r = seq[i] / seq[i - 1];
    if (ratio === null) ratio = r;
    else if (r !== ratio) isGeometric = false;
  }
  if (
    isGeometric &&
    ratio !== null &&
    [2, 5, 10, 0.5].includes(ratio) &&
    Number.isInteger(seq[n - 1] * ratio)
  ) {
    return seq[n - 1] * ratio;
  }

  // 规律4：乘加混合 a[i+1] = a[i]×m + c
  for (let m = 2; m <= 9; m++) {
    const c = seq[1] - seq[0] * m;
    let ok = true;
    for (let i = 1; i < n; i++) {
      if (seq[i] !== seq[i - 1] * m + c) {
        ok = false;
        break;
      }
    }
    if (ok) return seq[n - 1] * m + c;
  }

  return null;
}

describe('二年级 找规律填数 genNumberPattern', () => {
  test('批量生成30题，字段齐全', () => {
    for (let i = 0; i < 30; i++) {
      const q = genGrade2Pattern();
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('difficulty');
      expect(q.type).toBe('找规律填数');
      expect(q.difficulty).toBe(1);
      expect(q.content).toContain('找规律填数');
      expect(q.content).toContain('（ ）');
      expect(q.content.length).toBeGreaterThan(0);
      expect(q.answer).toMatch(/^\d+$/);
    }
  });

  test('数列为等差数列，答案按步长推导正确，步长在1-5之间', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade2Pattern();
      const seq = parseSequence(q.content);
      expect(seq.length).toBeGreaterThanOrEqual(4);
      const diffs = diffsOf(seq);
      expect(new Set(diffs).size).toBe(1);
      const step = Math.abs(diffs[0]);
      expect(step).toBeGreaterThanOrEqual(1);
      expect(step).toBeLessThanOrEqual(5);
      expect(q.answer).toBe(String(seq[seq.length - 1] + diffs[0]));
    }
  });

  test('数列与答案均在100以内', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade2Pattern();
      const seq = parseSequence(q.content);
      seq.forEach(v => expect(v).toBeLessThanOrEqual(100));
      expect(Number(q.answer)).toBeLessThanOrEqual(100);
    }
  });
});

describe('三年级 找规律填数 genNumberPattern', () => {
  test('批量生成30题，字段齐全', () => {
    for (let i = 0; i < 30; i++) {
      const q = genGrade3Pattern();
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('difficulty');
      expect(q.type).toBe('找规律填数');
      expect([1, 2]).toContain(q.difficulty);
      expect(q.content).toContain('找规律填数');
      expect(q.content).toContain('（ ）');
      expect(q.answer).toMatch(/^\d+$/);
    }
  });

  test('答案符合等差或倍数规律（由已知项推导校验）', () => {
    for (let i = 0; i < 100; i++) {
      const q = genGrade3Pattern();
      const seq = parseSequence(q.content);
      expect(seq.length).toBe(5);
      const predicted = predictNext(seq);
      expect(predicted).not.toBeNull();
      expect(q.answer).toBe(String(predicted));
    }
  });

  test('等差数列的步长为2/5/10的倍数', () => {
    let checked = 0;
    for (let i = 0; i < 200 && checked < 30; i++) {
      const q = genGrade3Pattern();
      const seq = parseSequence(q.content);
      const diffs = diffsOf(seq);
      if (new Set(diffs).size === 1) {
        const step = Math.abs(diffs[0]);
        expect(step % 2 === 0 || step % 5 === 0).toBe(true);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });

  test('数列与答案均不超过1000', () => {
    for (let i = 0; i < 50; i++) {
      const q = genGrade3Pattern();
      const seq = parseSequence(q.content);
      seq.forEach(v => expect(v).toBeLessThanOrEqual(1000));
      expect(Number(q.answer)).toBeLessThanOrEqual(1000);
    }
  });
});

describe('四年级 找规律填数 genNumberPattern', () => {
  test('批量生成30题，字段齐全', () => {
    for (let i = 0; i < 30; i++) {
      const q = genGrade4Pattern();
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('answer');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('difficulty');
      expect(q.type).toBe('找规律填数');
      expect([2, 3]).toContain(q.difficulty);
      expect(q.content).toContain('找规律填数');
      expect(q.content).toContain('（ ）');
      expect(q.answer).toMatch(/^\d+$/);
      expect(Number(q.answer)).toBeLessThanOrEqual(9999);
    }
  });

  test('答案符合两层规律（交替加减或乘加混合，由已知项推导校验）', () => {
    for (let i = 0; i < 100; i++) {
      const q = genGrade4Pattern();
      const seq = parseSequence(q.content);
      expect(seq.length).toBe(5);
      const predicted = predictNext(seq);
      expect(predicted).not.toBeNull();
      expect(q.answer).toBe(String(predicted));
    }
  });

  test('交替规律与乘加规律两类都会出现', () => {
    const kinds = new Set();
    for (let i = 0; i < 300; i++) {
      const q = genGrade4Pattern();
      const seq = parseSequence(q.content);
      const diffs = diffsOf(seq);
      if (new Set(diffs).size === 1) {
        kinds.add('等差');
      } else if (diffs[0] === diffs[2] && diffs[1] === diffs[3]) {
        kinds.add('交替');
      } else {
        kinds.add('乘加');
      }
    }
    expect(kinds.has('交替')).toBe(true);
    expect(kinds.has('乘加')).toBe(true);
  });
});

describe('找规律填数注册到章节生成清单', () => {
  test('二年级挂在「100以内加减法」章节', () => {
    const ch = grade2Chapters.find(c => c.name === '100以内加减法');
    expect(ch).toBeDefined();
    expect(ch.basicGenerators).toContain(genGrade2Pattern);
  });

  test('三年级挂在「三位数加减法」章节', () => {
    const ch = grade3Chapters.find(c => c.name === '三位数加减法');
    expect(ch).toBeDefined();
    expect(ch.basicGenerators).toContain(genGrade3Pattern);
  });

  test('四年级挂在「整数四则混合运算」章节', () => {
    const ch = grade4Chapters.find(c => c.name === '整数四则混合运算');
    expect(ch).toBeDefined();
    expect(ch.basicGenerators).toContain(genGrade4Pattern);
  });
});

describe('找规律填数可被章节随机命中', () => {
  test('二年级章节抽题能命中找规律题型', () => {
    const questions = generateGrade2ChapterBasic(1, 200);
    expect(questions.some(q => q.type === '找规律填数')).toBe(true);
  });

  test('三年级章节抽题能命中找规律题型', () => {
    const questions = generateGrade3ChapterBasic(6, 200);
    expect(questions.some(q => q.type === '找规律填数')).toBe(true);
  });

  test('四年级章节抽题能命中找规律题型', () => {
    const questions = generateGrade4ChapterBasic(2, 200);
    expect(questions.some(q => q.type === '找规律填数')).toBe(true);
  });
});
