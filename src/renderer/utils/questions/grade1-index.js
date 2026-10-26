// 一年级题目索引 - 整合基础题和应用题

import {
  genKnowNumber,
  genCompare10,
  genSplitCombine,
  genAdd10,
  genSub10,
  genChain10,
  genMixed10,
  genFill10,
  genAdd20NoCarry,
  genAdd20Carry,
  genSub20NoBorrow,
  genSub20Borrow,
  genMakeTen,
  genKnowShape,
  genCountShape,
  genPosition,
  genKnowMoney,
  genSimpleShopping,
  genKnowTime,
  genKnowHalfTime,
} from './grade1-basic';

import {
  genAppCh1,
  genAppCh2,
  genAppCh3,
  genAppCh4,
  genAppCh5,
  genAppCh6,
  genAppCh7,
  genAppMixed,
} from './grade1-app';
import { getThinkingQuestion } from './thinkingQuestions';

// 章节定义
export const chapters = [
  {
    id: 1,
    name: '10以内的数',
    unit: '上册',
    basicGenerators: [genKnowNumber, genCompare10, genSplitCombine],
    appGenerators: [genAppCh1, genAppCh2, () => getThinkingQuestion(1, 0)],
  },
  {
    id: 2,
    name: '10以内加减法',
    unit: '上册',
    basicGenerators: [genAdd10, genSub10, genChain10, genMixed10, genFill10],
    appGenerators: [genAppCh2, genAppMixed, () => getThinkingQuestion(1, 1)],
  },
  {
    id: 3,
    name: '20以内加减法',
    unit: '下册',
    basicGenerators: [genAdd20NoCarry, genAdd20Carry, genSub20NoBorrow, genSub20Borrow, genMakeTen],
    appGenerators: [genAppCh3, genAppMixed, () => getThinkingQuestion(1, 2)],
  },
  {
    id: 4,
    name: '认识图形',
    unit: '上册',
    basicGenerators: [genKnowShape, genCountShape],
    appGenerators: [genAppCh4, () => getThinkingQuestion(1, 3)],
  },
  {
    id: 5,
    name: '位置',
    unit: '上册',
    basicGenerators: [genPosition],
    appGenerators: [genAppCh5, () => getThinkingQuestion(1, 4)],
  },
  {
    id: 6,
    name: '认识人民币',
    unit: '下册',
    basicGenerators: [genKnowMoney, genSimpleShopping],
    appGenerators: [genAppCh6, () => getThinkingQuestion(1, 5)],
  },
  {
    id: 7,
    name: '认识钟表',
    unit: '上册',
    basicGenerators: [genKnowTime, genKnowHalfTime],
    appGenerators: [genAppCh7, genAppMixed, () => getThinkingQuestion(1, 6)],
  },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

export function generateChapterMixed(chapterId, basicCount = 30, appCount = 20) {
  const basic = generateChapterBasic(chapterId, basicCount);
  const app = generateChapterApp(chapterId, appCount);
  return [...basic, ...app.map((q, i) => ({ ...q, id: basicCount + i + 1 }))];
}

export function generateAllChapters(count = 10) {
  const all = [];
  for (const chapter of chapters) {
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

export function generateRandomQuestions(count = 10) {
  const chapter = pick(chapters);
  return generateChapterMixed(chapter.id, Math.ceil(count * 0.5), Math.floor(count * 0.5));
}
