// 四年级题目索引 - 沪教版2024新教材
// 整合基础题和应用题，定义章节结构

// ============ 导入基础题生成器 ============
import {
  genReadLargeNumber,
  genWriteLargeNumber,
  genNumberComposition,
  genDigitPosition,
  genCompareLargeNumber,
  genRoundToWan,
  genRoundToQian,
  genApproximateNumber,
  genLargeAddSub,
  genMulDivFirst,
  genThreeStepCalc,
  genBracketCalc,
  genCommutativeProperty,
  genAssociativeProperty,
  genDistributiveProperty,
  genQuickCalc,
  genFractionMeaning,
  genFractionReadWrite,
  genFractionCompare,
  genFractionCompareDiff,
  genFractionAdd,
  genFractionSub,
  genFractionWall,
  genTrueFalseFraction,
  genFractionDivision,
  genWorkEfficiency,
  genEfficiencyCompare,
  genCooperation,
  genEfficiencyChange,
  genWorkDistribution,
  genBasicReverse,
  genTwoStepReverse,
  genReverseTable,
  genReverseRestore,
  genCircleBasic,
  genRadiusDiameter,
  genCircleSymmetry,
  genDrawCircle,
  genCircleCompare,
  genLineTypes,
  genLineSegmentCount,
  genLineSegmentLength,
  genTwoPoints,
  genAngleLine,
  genCapacityBasic,
  genCapacityConvert,
  genCapacityCompare,
  genCapacityCalc,
  genCapacityApp,
  genTonBasic,
  genTonConvert,
  genTonCompare,
  genTonCalc,
  genTonMulDiv,
  genSqKmBasic,
  genSqKmConvert,
  genSqKmCompare,
  genSqKmCalc,
  genAreaComprehensive,
  genDecimalMeaning,
  genDecimalReadWrite,
  genDecimalPlace,
  genDecimalCompare,
  genDecimalAdd,
  genDecimalSub,
  genDecimalMixed,
  genDecimalMulInt,
  genDecimalMulDecimal,
  genDecimalMulApprox,
  genDecimalMulQuick,
  genDecimalMulApp,
  genDecimalDivInt,
  genDecimalDivDecimal,
  genDecimalDivApprox,
  genDecimalRepeat,
  genDecimalDivApp,
  genParallel,
  genPerpendicular,
  genParallelPerpJudge,
  genDrawParallelPerp,
  genParallelogram,
  genTrapezoid,
  genParallelogramArea,
  genTrapezoidArea,
  genShapeAreaCompare,
  genLineChartBasic,
  genLineChartRead,
  genLineChartTrend,
  genLineChartAverage,
  genLineChartChange,
} from './grade4-basic';

// ============ 导入应用题生成器 ============
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
  genAppCh13,
  genAppCh14,
  genAppCh15,
  genAppCh16,
  genAppMixed,
} from './grade4-app';

import { getThinkingQuestion } from './thinkingQuestions';

// ============ 工具函数 ============

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============ 章节定义 ============

export const chapters = [
  // ============ 上册 ============
  {
    id: 1,
    name: '大数的认识',
    unit: '上册',
    basicGenerators: [
      genReadLargeNumber,
      genWriteLargeNumber,
      genNumberComposition,
      genDigitPosition,
      genCompareLargeNumber,
      genRoundToWan,
      genRoundToQian,
      genApproximateNumber,
      genLargeAddSub,
    ],
    appGenerators: [genAppCh1, () => getThinkingQuestion(4, 0)],
  },
  {
    id: 2,
    name: '整数四则混合运算',
    unit: '上册',
    basicGenerators: [
      genMulDivFirst,
      genThreeStepCalc,
      genBracketCalc,
      genCommutativeProperty,
      genAssociativeProperty,
      genDistributiveProperty,
      genQuickCalc,
    ],
    appGenerators: [genAppCh2, () => getThinkingQuestion(4, 1)],
  },
  {
    id: 3,
    name: '分数',
    unit: '上册',
    basicGenerators: [
      genFractionMeaning,
      genFractionReadWrite,
      genFractionCompare,
      genFractionCompareDiff,
      genFractionAdd,
      genFractionSub,
      genFractionWall,
      genTrueFalseFraction,
      genFractionDivision,
    ],
    appGenerators: [genAppCh3, () => getThinkingQuestion(4, 2)],
  },
  {
    id: 4,
    name: '工作效率问题',
    unit: '上册',
    basicGenerators: [
      genWorkEfficiency,
      genEfficiencyCompare,
      genCooperation,
      genEfficiencyChange,
      genWorkDistribution,
    ],
    appGenerators: [genAppCh4, () => getThinkingQuestion(4, 3)],
  },
  {
    id: 5,
    name: '逆推',
    unit: '上册',
    basicGenerators: [genBasicReverse, genTwoStepReverse, genReverseTable, genReverseRestore],
    appGenerators: [genAppCh5, () => getThinkingQuestion(4, 4)],
  },
  {
    id: 6,
    name: '圆的初步认识',
    unit: '上册',
    basicGenerators: [
      genCircleBasic,
      genRadiusDiameter,
      genCircleSymmetry,
      genDrawCircle,
      genCircleCompare,
    ],
    appGenerators: [genAppCh6, () => getThinkingQuestion(4, 5)],
  },
  {
    id: 7,
    name: '线段、射线、直线',
    unit: '上册',
    basicGenerators: [
      genLineTypes,
      genLineSegmentCount,
      genLineSegmentLength,
      genTwoPoints,
      genAngleLine,
    ],
    appGenerators: [genAppCh7, () => getThinkingQuestion(4, 6)],
  },
  {
    id: 8,
    name: '毫升与升',
    unit: '上册',
    basicGenerators: [
      genCapacityBasic,
      genCapacityConvert,
      genCapacityCompare,
      genCapacityCalc,
      genCapacityApp,
    ],
    appGenerators: [genAppCh8, () => getThinkingQuestion(4, 7)],
  },
  {
    id: 9,
    name: '吨的认识',
    unit: '上册',
    basicGenerators: [genTonBasic, genTonConvert, genTonCompare, genTonCalc, genTonMulDiv],
    appGenerators: [genAppCh9, () => getThinkingQuestion(4, 8)],
  },
  {
    id: 10,
    name: '平方千米',
    unit: '上册',
    basicGenerators: [
      genSqKmBasic,
      genSqKmConvert,
      genSqKmCompare,
      genSqKmCalc,
      genAreaComprehensive,
    ],
    appGenerators: [genAppCh10, () => getThinkingQuestion(4, 9)],
  },
  // ============ 下册 ============
  {
    id: 11,
    name: '小数的认识与加减法',
    unit: '下册',
    basicGenerators: [
      genDecimalMeaning,
      genDecimalReadWrite,
      genDecimalPlace,
      genDecimalCompare,
      genDecimalAdd,
      genDecimalSub,
      genDecimalMixed,
    ],
    appGenerators: [genAppCh11, () => getThinkingQuestion(4, 10)],
  },
  {
    id: 12,
    name: '小数乘法',
    unit: '下册',
    basicGenerators: [
      genDecimalMulInt,
      genDecimalMulDecimal,
      genDecimalMulApprox,
      genDecimalMulQuick,
      genDecimalMulApp,
    ],
    appGenerators: [genAppCh12, () => getThinkingQuestion(4, 11)],
  },
  {
    id: 13,
    name: '小数除法',
    unit: '下册',
    basicGenerators: [
      genDecimalDivInt,
      genDecimalDivDecimal,
      genDecimalDivApprox,
      genDecimalRepeat,
      genDecimalDivApp,
    ],
    appGenerators: [genAppCh13, () => getThinkingQuestion(4, 12)],
  },
  {
    id: 14,
    name: '平行与垂直',
    unit: '下册',
    basicGenerators: [genParallel, genPerpendicular, genParallelPerpJudge, genDrawParallelPerp],
    appGenerators: [genAppCh14, () => getThinkingQuestion(4, 13)],
  },
  {
    id: 15,
    name: '平行四边形和梯形',
    unit: '下册',
    basicGenerators: [
      genParallelogram,
      genTrapezoid,
      genParallelogramArea,
      genTrapezoidArea,
      genShapeAreaCompare,
    ],
    appGenerators: [genAppCh15, () => getThinkingQuestion(4, 14)],
  },
  {
    id: 16,
    name: '统计',
    unit: '下册',
    basicGenerators: [
      genLineChartBasic,
      genLineChartRead,
      genLineChartTrend,
      genLineChartAverage,
      genLineChartChange,
    ],
    appGenerators: [genAppCh16, () => getThinkingQuestion(4, 15)],
  },
];

// ============ 生成函数 ============

/**
 * 生成某章的基础题
 * @param {number} chapterId 章节ID (1-16)
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
 * 生成某章的应用题
 * @param {number} chapterId 章节ID (1-16)
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
 * @param {number} chapterId 章节ID (1-16)
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
 * 生成专项应用题（跨章节综合题）
 * @param {number} count 题目数量
 * @returns {Array} 题目数组
 */
export function generateMixedApp(count = 10) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push({ ...genAppMixed(), id: i + 1 });
  }
  return questions;
}

/**
 * 按单元生成题目
 * @param {string} unit '上册' 或 '下册'
 * @param {number} count 每章题目数
 * @returns {Array} 题目数组
 */
export function generateByUnit(unit, count = 10) {
  const unitChapters = chapters.filter(c => c.unit === unit);
  const all = [];
  for (const chapter of unitChapters) {
    const basic = generateChapterBasic(chapter.id, Math.ceil(count * 0.5));
    const app = generateChapterApp(chapter.id, Math.floor(count * 0.5));
    all.push(...basic, ...app);
  }
  return all;
}

// 导出工具函数供外部使用
export { randInt, pick };
