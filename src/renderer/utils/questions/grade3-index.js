// 三年级题目索引 - 整合基础题和应用题
// 沪教版2024新教材

import {
  // 第一章：两步四则运算
  genSameLevel,
  genAddSubMixed,
  genMixedPriority,
  genParentheses,
  genFillOperator,
  genTwoStepBox,
  genCompareMixed,
  genJudgeArithmetic,
  // 第二章：一位数乘整十整百数
  genMulTens,
  genMulHundreds,
  genTensMulTens,
  genMulEstimate,
  genMulFillBlank,
  genMulReverse,
  genMulCompare,
  // 第三章：长方形和正方形
  genRectPerimeter,
  genSquarePerimeter,
  genPerimeterReverse,
  genRectArea,
  genSquareArea,
  genShapeJudge,
  genPerimeterCompare,
  genShapeMixed,
  // 第四章：分数的初步认识
  genFractionReadWrite,
  genFractionMeaning,
  genFractionParts,
  genFractionCompareSameDen,
  genFractionCompareSameNum,
  genFractionAdd,
  genFractionSub,
  genFractionFill,
  // 第五章：元角分与小数
  genMoneyConvert,
  genDecimalReadWrite,
  genDecimalCompare,
  genDecimalAddSub,
  genPriceCalc,
  // 第六章：三位数加减法
  genThreeAddNoCarry,
  genThreeAddCarry,
  genThreeSubNoBorrow,
  genThreeSubBorrow,
  genCheckCalc,
  genThreeEstimate,
  genThreeFillBlank,
  genThreeCompare,
  // 第七章：两位数乘两三位数
  genTwoMulTwoNoCarry,
  genTwoMulTwo,
  genTwoMulHundred,
  genTwoMulThree,
  genMulEstimateTwo,
  genTwoMulFillBlank,
  genMulFact,
  // 第八章：年月日
  genMonthDays,
  genLeapYear,
  gen24Hour,
  genTimeCalc,
  genYearFill,
  genWeekCalc,
  // 第九章：千米和米
  genKmConvert,
  genLengthConvert,
  genLengthCompare,
  genLengthJudge,
  genLengthSort,
  // 第十章：面积
  genAreaUnit,
  genAreaConvert,
  genAreaCalc,
  genAreaCompare,
  genAreaUnitSelect,
  genAreaFill,
  // 第十一章：统计
  genAverage,
  genBarChart,
  genStatFill,
  genStatMixed,
  // 找规律填数与比较大小
  genNumberPattern,
  genCompareCalc,
} from './grade3-basic';

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
} from './grade3-app';

import { getThinkingQuestion } from './thinkingQuestions';

// 章节定义：每章包含基础题生成器和应用题生成器
export const chapters = [
  {
    id: 1,
    name: '两步四则运算',
    unit: '上册',
    basicGenerators: [
      genSameLevel,
      genAddSubMixed,
      genMixedPriority,
      genParentheses,
      genFillOperator,
      genTwoStepBox,
      genCompareMixed,
      genJudgeArithmetic,
      genCompareCalc,
    ],
    appGenerators: [genAppCh1, () => getThinkingQuestion(3, 0)],
  },
  {
    id: 2,
    name: '一位数乘整十整百数',
    unit: '上册',
    basicGenerators: [
      genMulTens,
      genMulHundreds,
      genTensMulTens,
      genMulEstimate,
      genMulFillBlank,
      genMulReverse,
      genMulCompare,
    ],
    appGenerators: [genAppCh2, () => getThinkingQuestion(3, 1)],
  },
  {
    id: 3,
    name: '长方形和正方形',
    unit: '上册',
    basicGenerators: [
      genRectPerimeter,
      genSquarePerimeter,
      genPerimeterReverse,
      genRectArea,
      genSquareArea,
      genShapeJudge,
      genPerimeterCompare,
      genShapeMixed,
    ],
    appGenerators: [genAppCh3, () => getThinkingQuestion(3, 2)],
  },
  {
    id: 4,
    name: '分数的初步认识',
    unit: '上册',
    basicGenerators: [
      genFractionReadWrite,
      genFractionMeaning,
      genFractionParts,
      genFractionCompareSameDen,
      genFractionCompareSameNum,
      genFractionAdd,
      genFractionSub,
      genFractionFill,
    ],
    appGenerators: [genAppCh4, () => getThinkingQuestion(3, 3)],
  },
  {
    id: 5,
    name: '元角分与小数',
    unit: '上册',
    basicGenerators: [
      genMoneyConvert,
      genDecimalReadWrite,
      genDecimalCompare,
      genDecimalAddSub,
      genPriceCalc,
    ],
    appGenerators: [genAppCh5, () => getThinkingQuestion(3, 4)],
  },
  {
    id: 6,
    name: '三位数加减法',
    unit: '下册',
    basicGenerators: [
      genThreeAddNoCarry,
      genThreeAddCarry,
      genThreeSubNoBorrow,
      genThreeSubBorrow,
      genCheckCalc,
      genThreeEstimate,
      genThreeFillBlank,
      genThreeCompare,
      genNumberPattern,
    ],
    appGenerators: [genAppCh6, () => getThinkingQuestion(3, 5)],
  },
  {
    id: 7,
    name: '两位数乘两三位数',
    unit: '下册',
    basicGenerators: [
      genTwoMulTwoNoCarry,
      genTwoMulTwo,
      genTwoMulHundred,
      genTwoMulThree,
      genMulEstimateTwo,
      genTwoMulFillBlank,
      genMulFact,
    ],
    appGenerators: [genAppCh7, () => getThinkingQuestion(3, 6)],
  },
  {
    id: 8,
    name: '年月日',
    unit: '下册',
    basicGenerators: [genMonthDays, genLeapYear, gen24Hour, genTimeCalc, genYearFill, genWeekCalc],
    appGenerators: [genAppCh8, () => getThinkingQuestion(3, 7)],
  },
  {
    id: 9,
    name: '千米和米',
    unit: '下册',
    basicGenerators: [
      genKmConvert,
      genLengthConvert,
      genLengthCompare,
      genLengthJudge,
      genLengthSort,
    ],
    appGenerators: [genAppCh9, () => getThinkingQuestion(3, 8)],
  },
  {
    id: 10,
    name: '面积',
    unit: '下册',
    basicGenerators: [
      genAreaUnit,
      genAreaConvert,
      genAreaCalc,
      genAreaCompare,
      genAreaUnitSelect,
      genAreaFill,
    ],
    appGenerators: [genAppCh10, () => getThinkingQuestion(3, 9)],
  },
  {
    id: 11,
    name: '统计',
    unit: '下册',
    basicGenerators: [genAverage, genBarChart, genStatFill, genStatMixed],
    appGenerators: [genAppCh11, () => getThinkingQuestion(3, 10)],
  },
];

/**
 * 生成某章的基础题
 * @param {number} chapterId 章节ID (1-11)
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
 * @param {number} chapterId 章节ID (1-11)
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
    const basic = generateChapterBasic(chapter.id, Math.ceil(count * 0.6));
    const app = generateChapterApp(chapter.id, Math.floor(count * 0.4));
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
 */
export function generateRandomQuestions(count = 10) {
  const chapter = pick(chapters);
  return generateChapterMixed(chapter.id, Math.ceil(count * 0.6), Math.floor(count * 0.4));
}

// 工具函数
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
