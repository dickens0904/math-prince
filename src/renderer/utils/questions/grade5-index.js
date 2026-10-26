// 五年级题目索引 - 沪教版2024新教材
// 整合基础题和应用题，定义章节结构

import {
  // 第一章：复习与提高
  genIntMixedOps,
  genDecAddSub,
  genEasyCalc,
  genFracDecConvert,
  genCompositeArea,
  genDecCompare,
  // 第二章：小数乘除法
  genDecMulInt,
  genDecMulDec,
  genDecDivInt,
  genDecDivDec,
  genProductApprox,
  genQuotientApprox,
  genRepeatingDec,
  genDecMixedOps,
  // 第三章：统计
  genReadTable,
  genCalcAverage,
  genFindTotal,
  genCompareData,
  genWeightedAverage,
  genDataAnalysis,
  // 第四章：简易方程（一）
  genLetterNum,
  genIdentifyEquation,
  genSolveXPlusA,
  genSolveAx,
  genSolveAxBc,
  genSolveAxBc2,
  genEqualityProp,
  // 第五章：几何小实践
  genParallelogramArea,
  genTriangleArea,
  genTrapezoidArea,
  genEqualAreaTransform,
  genFindBaseOrHeight,
  genBaseHeightConcept,
  genGeoCompositeArea,
  // 第六章：整理与提高
  genTranslation,
  genRotation,
  genEncoding,
  genComprehensiveCalc,
  genShapeMovement,
  // 第七章：分数的加减法
  genSameDenAdd,
  genSameDenSub,
  genDiffDenAdd,
  genDiffDenSub,
  genFracDecConvert2,
  genFracCompare,
  genFracMixedOps,
  // 第八章：分数乘除法
  genFracMulInt,
  genFracMulFrac,
  genFracDivInt,
  genFracDivFrac,
  genReciprocal,
  genFracAllOps,
  // 第九章：长方体和正方体
  genRectPrismEdge,
  genCubeEdge,
  genRectPrismSA,
  genCubeSA,
  genRectPrismVol,
  genCubeVol,
  genVolUnitConvert,
  genFindSideFromVol,
  // 第十章：可能性
  genPossibilityJudge,
  genPossibilityFrac,
  genComparePossibility,
  genEqualPossibility,
  genPossibilityAdd,
  genImpossibleCertain,
  // 第十一章：方程与代数
  genFormEquation,
  genSolveComplexEq,
  genCheckEquation,
  genTwoUnknowns,
  genEqModeling,
  // 第十二章：总复习
  genReviewMixed,
  genReviewGeo,
  genReviewEq,
  genReviewStats,
  genReviewFracDec,
} from './grade5-basic';

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
} from './grade5-app';

import { getThinkingQuestion } from './thinkingQuestions';

// 随机选取工具函数
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 章节定义：每章包含基础题生成器和应用题生成器
export const chapters = [
  {
    id: 1,
    name: '复习与提高',
    unit: '上册',
    basicGenerators: [
      genIntMixedOps,
      genDecAddSub,
      genEasyCalc,
      genFracDecConvert,
      genCompositeArea,
      genDecCompare,
    ],
    appGenerators: [genAppCh1, () => getThinkingQuestion(5, 0)],
  },
  {
    id: 2,
    name: '小数乘除法',
    unit: '上册',
    basicGenerators: [
      genDecMulInt,
      genDecMulDec,
      genDecDivInt,
      genDecDivDec,
      genProductApprox,
      genQuotientApprox,
      genRepeatingDec,
      genDecMixedOps,
    ],
    appGenerators: [genAppCh2, () => getThinkingQuestion(5, 1)],
  },
  {
    id: 3,
    name: '统计',
    unit: '上册',
    basicGenerators: [
      genReadTable,
      genCalcAverage,
      genFindTotal,
      genCompareData,
      genWeightedAverage,
      genDataAnalysis,
    ],
    appGenerators: [genAppCh3, () => getThinkingQuestion(5, 2)],
  },
  {
    id: 4,
    name: '简易方程（一）',
    unit: '上册',
    basicGenerators: [
      genLetterNum,
      genIdentifyEquation,
      genSolveXPlusA,
      genSolveAx,
      genSolveAxBc,
      genSolveAxBc2,
      genEqualityProp,
    ],
    appGenerators: [genAppCh4, () => getThinkingQuestion(5, 3)],
  },
  {
    id: 5,
    name: '几何小实践',
    unit: '上册',
    basicGenerators: [
      genParallelogramArea,
      genTriangleArea,
      genTrapezoidArea,
      genEqualAreaTransform,
      genFindBaseOrHeight,
      genBaseHeightConcept,
      genGeoCompositeArea,
    ],
    appGenerators: [genAppCh5, () => getThinkingQuestion(5, 4)],
  },
  {
    id: 6,
    name: '整理与提高',
    unit: '上册',
    basicGenerators: [
      genTranslation,
      genRotation,
      genEncoding,
      genComprehensiveCalc,
      genShapeMovement,
    ],
    appGenerators: [genAppCh6, () => getThinkingQuestion(5, 5)],
  },
  {
    id: 7,
    name: '分数的加减法',
    unit: '下册',
    basicGenerators: [
      genSameDenAdd,
      genSameDenSub,
      genDiffDenAdd,
      genDiffDenSub,
      genFracDecConvert2,
      genFracCompare,
      genFracMixedOps,
    ],
    appGenerators: [genAppCh7, () => getThinkingQuestion(5, 6)],
  },
  {
    id: 8,
    name: '分数乘除法',
    unit: '下册',
    basicGenerators: [
      genFracMulInt,
      genFracMulFrac,
      genFracDivInt,
      genFracDivFrac,
      genReciprocal,
      genFracAllOps,
    ],
    appGenerators: [genAppCh8, () => getThinkingQuestion(5, 7)],
  },
  {
    id: 9,
    name: '长方体和正方体',
    unit: '下册',
    basicGenerators: [
      genRectPrismEdge,
      genCubeEdge,
      genRectPrismSA,
      genCubeSA,
      genRectPrismVol,
      genCubeVol,
      genVolUnitConvert,
      genFindSideFromVol,
    ],
    appGenerators: [genAppCh9, () => getThinkingQuestion(5, 8)],
  },
  {
    id: 10,
    name: '可能性',
    unit: '下册',
    basicGenerators: [
      genPossibilityJudge,
      genPossibilityFrac,
      genComparePossibility,
      genEqualPossibility,
      genPossibilityAdd,
      genImpossibleCertain,
    ],
    appGenerators: [genAppCh10, () => getThinkingQuestion(5, 9)],
  },
  {
    id: 11,
    name: '方程与代数',
    unit: '下册',
    basicGenerators: [
      genFormEquation,
      genSolveComplexEq,
      genCheckEquation,
      genTwoUnknowns,
      genEqModeling,
    ],
    appGenerators: [genAppCh11, () => getThinkingQuestion(5, 10)],
  },
  {
    id: 12,
    name: '总复习',
    unit: '下册',
    basicGenerators: [genReviewMixed, genReviewGeo, genReviewEq, genReviewStats, genReviewFracDec],
    appGenerators: [genAppCh12, () => getThinkingQuestion(5, 11)],
  },
];

/**
 * 生成某章的基础题
 * @param {number} chapterId 章节ID (1-12)
 * @param {number} count 题目数量
 * @returns {Array} 题目数组
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
 * @param {number} chapterId 章节ID (1-12)
 * @param {number} count 题目数量
 * @returns {Array} 题目数组
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
 * @param {number} chapterId 章节ID (1-12)
 * @param {number} basicCount 基础题数量
 * @param {number} appCount 应用题数量
 * @returns {Array} 题目数组
 */
export function generateChapterMixed(chapterId, basicCount = 30, appCount = 20) {
  const basic = generateChapterBasic(chapterId, basicCount);
  const app = generateChapterApp(chapterId, appCount);
  return [...basic, ...app.map((q, i) => ({ ...q, id: basicCount + i + 1 }))];
}

/**
 * 生成全册题目（所有章节混合）
 * @param {number} count 每章题目数
 * @returns {Array} 题目数组
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
 * @param {number} count 题目数量
 * @returns {Array} 题目数组
 */
export function generateRandomQuestions(count = 10) {
  const chapter = pick(chapters);
  return generateChapterMixed(chapter.id, Math.ceil(count * 0.5), Math.floor(count * 0.5));
}

/**
 * 生成指定学期的题目
 * @param {string} semester '上册' 或 '下册'
 * @param {number} count 每章题目数
 * @returns {Array} 题目数组
 */
export function generateSemesterQuestions(semester, count = 10) {
  const semesterChapters = chapters.filter(c => c.unit === semester);
  const all = [];
  for (const chapter of semesterChapters) {
    const basic = generateChapterBasic(chapter.id, Math.ceil(count * 0.5));
    const app = generateChapterApp(chapter.id, Math.floor(count * 0.5));
    all.push(...basic, ...app);
  }
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.map((q, i) => ({ ...q, id: i + 1 }));
}

/**
 * 按难度筛选题目
 * @param {number} difficulty 难度等级 (1-3)
 * @param {number} count 题目数量
 * @returns {Array} 题目数组
 */
export function generateByDifficulty(difficulty, count = 10) {
  const questions = [];
  let attempts = 0;
  while (questions.length < count && attempts < count * 10) {
    const chapter = pick(chapters);
    const gen = pick([...chapter.basicGenerators, ...chapter.appGenerators]);
    const q = gen();
    if (q.difficulty === difficulty) {
      questions.push({ ...q, id: questions.length + 1 });
    }
    attempts++;
  }
  return questions;
}

export { randInt, pick };
