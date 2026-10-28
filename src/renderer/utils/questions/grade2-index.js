// 二年级题目索引 - 整合基础题和应用题

import {
  genAddNoCarry,
  genAddCarry,
  genSubNoBorrow,
  genSubBorrow,
  genAddSubMixed,
  genBoxEquation,
  genCompareAddSub,
  genMulTable,
  genMulGeneral,
  genMulReverse,
  genMulCompare,
  genTimes,
  genMulAdd,
  genDivTable,
  genDivWithRemainder,
  genDivReverse,
  genDivCompare,
  genGeometry,
  genTime,
  genThousandNumber,
  genThreeAdd,
  genThreeSub,
  genEstimate,
  genHundredCalc,
  genWeight,
  genTimeSec,
  genDirection,
  genSymmetry,
  genTriangleQuad,
  genMulDivChain,
  genNumberPattern,
  genCompareCalc,
} from './grade2-basic';

import {
  genAppCh1,
  genAppCh2,
  genAppCh3,
  genAppCh4,
  genAppCh5,
  genAppCh6,
  genAppCh7,
  genAppCh8,
  genAppCh9,
  genAppCh10,
  genAppCh11,
  genAppCh12,
  genAppMulDivChain,
} from './grade2-app';

import {
  genShoppingApp,
  genLifeApp,
  genSportsApp,
  genNatureApp,
  genTimeApp,
  genShapeApp,
  genMixedApp,
} from './grade2-app-extra';

import { getThinkingQuestion } from './thinkingQuestions';

// 章节定义：每章包含基础题生成器和应用题生成器
export const chapters = [
  {
    id: 1,
    name: '100以内加减法',
    unit: '上册',
    basicGenerators: [
      genAddNoCarry,
      genAddCarry,
      genSubNoBorrow,
      genSubBorrow,
      genAddSubMixed,
      genBoxEquation,
      genCompareAddSub,
      genCompareCalc,
      genNumberPattern,
    ],
    appGenerators: [genAppCh1, genShoppingApp, genLifeApp, () => getThinkingQuestion(2, 0)],
  },
  {
    id: 2,
    name: '表内乘法',
    unit: '上册',
    basicGenerators: [
      () => genMulTable(2),
      () => genMulTable(3),
      () => genMulTable(4),
      () => genMulTable(5),
      () => genMulTable(6),
      () => genMulTable(7),
      () => genMulTable(8),
      () => genMulTable(9),
      genMulGeneral,
      genMulReverse,
      genMulCompare,
      genTimes,
      genMulAdd,
    ],
    appGenerators: [genAppCh2, genSportsApp, genNatureApp, () => getThinkingQuestion(2, 1)],
  },
  {
    id: 3,
    name: '表内除法',
    unit: '上册',
    basicGenerators: [genDivTable, genDivWithRemainder, genDivReverse, genDivCompare],
    appGenerators: [genAppCh3, genLifeApp, genNatureApp, () => getThinkingQuestion(2, 2)],
  },
  {
    id: 4,
    name: '几何初步',
    unit: '上册',
    basicGenerators: [genGeometry],
    appGenerators: [genAppCh4, genShapeApp, () => getThinkingQuestion(2, 3)],
  },
  {
    id: 5,
    name: '认识时分',
    unit: '上册',
    basicGenerators: [genTime],
    appGenerators: [genAppCh5, genTimeApp, () => getThinkingQuestion(2, 4)],
  },
  {
    id: 6,
    name: '千以内数的认识',
    unit: '下册',
    basicGenerators: [genThousandNumber],
    appGenerators: [genAppCh6, genMixedApp, () => getThinkingQuestion(2, 5)],
  },
  {
    id: 7,
    name: '三位数加减法',
    unit: '下册',
    basicGenerators: [genThreeAdd, genThreeSub, genEstimate, genHundredCalc],
    appGenerators: [genAppCh7, genShoppingApp, genMixedApp, () => getThinkingQuestion(2, 6)],
  },
  {
    id: 8,
    name: '克与千克',
    unit: '下册',
    basicGenerators: [genWeight],
    appGenerators: [genAppCh8, genLifeApp, () => getThinkingQuestion(2, 7)],
  },
  {
    id: 9,
    name: '时分秒',
    unit: '下册',
    basicGenerators: [genTimeSec],
    appGenerators: [genAppCh9, genTimeApp, () => getThinkingQuestion(2, 8)],
  },
  {
    id: 10,
    name: '东南西北',
    unit: '下册',
    basicGenerators: [genDirection],
    appGenerators: [genAppCh10, genMixedApp, () => getThinkingQuestion(2, 9)],
  },
  {
    id: 11,
    name: '轴对称',
    unit: '下册',
    basicGenerators: [genSymmetry],
    appGenerators: [genAppCh11, genShapeApp, () => getThinkingQuestion(2, 10)],
  },
  {
    id: 12,
    name: '三角形与四边形',
    unit: '下册',
    basicGenerators: [genTriangleQuad],
    appGenerators: [genAppCh12, genShapeApp, () => getThinkingQuestion(2, 11)],
  },
  {
    id: 13,
    name: '连乘连除',
    unit: '下册',
    basicGenerators: [genMulDivChain],
    appGenerators: [genAppMulDivChain, genMixedApp, () => getThinkingQuestion(2, 12)],
  },
];

// 随机选取
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 生成某章的基础题
 * @param {number} chapterId 章节ID (1-13)
 * @param {number} count 题目数量
 */
export function generateChapterBasic(chapterId, count = 50) {
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) return [];
  const questions = [];
  for (let i = 0; i < count; i++) {
    const gen = pick(chapter.basicGenerators);
    questions.push({ ...gen(), id: i + 1 });
  }
  return questions;
}

/**
 * 生成某章的应用题（综合前面章节知识）
 * @param {number} chapterId 章节ID (1-13)
 * @param {number} count 题目数量
 */
export function generateChapterApp(chapterId, count = 50) {
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) return [];
  const questions = [];
  for (let i = 0; i < count; i++) {
    const gen = pick(chapter.appGenerators);
    questions.push({ ...gen(), id: i + 1 });
  }
  return questions;
}

/**
 * 生成某章的混合题目（基础+应用）
 * @param {number} chapterId
 * @param {number} basicCount 基础题数量
 * @param {number} appCount 应用题数量
 */
export function generateChapterMixed(chapterId, basicCount = 30, appCount = 20) {
  const basic = generateChapterBasic(chapterId, basicCount);
  const app = generateChapterApp(chapterId, appCount);
  return [...basic, ...app.map((q, i) => ({ ...q, id: basicCount + i + 1 }))];
}

/**
 * 生成全册题目（所有章节混合）
 * @param {number} count 每章题目数
 */
export function generateAllChapters(count = 10) {
  const all = [];
  for (const chapter of chapters) {
    const basic = generateChapterBasic(chapter.id, Math.ceil(count * 0.5));
    const app = generateChapterApp(chapter.id, Math.floor(count * 0.5));
    all.push(...basic, ...app);
  }
  // 打乱顺序
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.map((q, i) => ({ ...q, id: i + 1 }));
}

/**
 * 随机生成题目（日常练习用）
 */
export function generateRandomQuestions(count = 10) {
  const chapter = pick(chapters);
  return generateChapterMixed(chapter.id, Math.ceil(count * 0.5), Math.floor(count * 0.5));
}

/**
 * 生成专项应用题
 * @param {string} type 应用题类型
 * @param {number} count 题目数量
 */
export function generateSpecialApp(type, count = 10) {
  const generators = {
    shopping: genShoppingApp,
    life: genLifeApp,
    sports: genSportsApp,
    nature: genNatureApp,
    time: genTimeApp,
    shape: genShapeApp,
    mixed: genMixedApp,
  };

  const gen = generators[type] || genMixedApp;
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push({ ...gen(), id: i + 1 });
  }
  return questions;
}
