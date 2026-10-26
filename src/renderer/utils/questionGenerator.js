// 题目生成器 - 统一入口
// 所有年级均使用章节+应用题系统

import logger from './logger';
import {
  chapters as grade1Chapters,
  generateChapterBasic as generateGrade1ChapterBasic,
  generateChapterApp as generateGrade1ChapterApp,
  generateChapterMixed as generateGrade1ChapterMixed,
  generateRandomQuestions as generateGrade1RandomQuestions,
} from './questions/grade1-index';

import {
  chapters as grade2Chapters,
  generateChapterBasic as generateGrade2ChapterBasic,
  generateChapterApp as generateGrade2ChapterApp,
  generateChapterMixed as generateGrade2ChapterMixed,
  generateRandomQuestions as generateGrade2RandomQuestions,
} from './questions/grade2-index';

import {
  chapters as grade3Chapters,
  generateChapterBasic as generateGrade3ChapterBasic,
  generateChapterApp as generateGrade3ChapterApp,
  generateChapterMixed as generateGrade3ChapterMixed,
  generateRandomQuestions as generateGrade3RandomQuestions,
} from './questions/grade3-index';

import {
  chapters as grade4Chapters,
  generateChapterBasic as generateGrade4ChapterBasic,
  generateChapterApp as generateGrade4ChapterApp,
  generateChapterMixed as generateGrade4ChapterMixed,
  generateRandomQuestions as generateGrade4RandomQuestions,
} from './questions/grade4-index';

import {
  chapters as grade5Chapters,
  generateChapterBasic as generateGrade5ChapterBasic,
  generateChapterApp as generateGrade5ChapterApp,
  generateChapterMixed as generateGrade5ChapterMixed,
  generateRandomQuestions as generateGrade5RandomQuestions,
} from './questions/grade5-index';

// ================================================================
// 统一入口
// ================================================================

const gradeRandomGenerators = {
  1: generateGrade1RandomQuestions,
  2: generateGrade2RandomQuestions,
  3: generateGrade3RandomQuestions,
  4: generateGrade4RandomQuestions,
  5: generateGrade5RandomQuestions,
};

const gradeChapterMap = {
  1: {
    chapters: grade1Chapters,
    basic: generateGrade1ChapterBasic,
    app: generateGrade1ChapterApp,
    mixed: generateGrade1ChapterMixed,
  },
  2: {
    chapters: grade2Chapters,
    basic: generateGrade2ChapterBasic,
    app: generateGrade2ChapterApp,
    mixed: generateGrade2ChapterMixed,
  },
  3: {
    chapters: grade3Chapters,
    basic: generateGrade3ChapterBasic,
    app: generateGrade3ChapterApp,
    mixed: generateGrade3ChapterMixed,
  },
  4: {
    chapters: grade4Chapters,
    basic: generateGrade4ChapterBasic,
    app: generateGrade4ChapterApp,
    mixed: generateGrade4ChapterMixed,
  },
  5: {
    chapters: grade5Chapters,
    basic: generateGrade5ChapterBasic,
    app: generateGrade5ChapterApp,
    mixed: generateGrade5ChapterMixed,
  },
};

export function generateQuestion(grade) {
  logger.debug('QuestionGenerator', `生成单题`, { grade });
  const gen = gradeRandomGenerators[grade] || gradeRandomGenerators[3];
  const q = gen(1)[0];
  logger.debug('QuestionGenerator', `题目生成完成`, {
    type: q.type,
    content: q.content?.substring(0, 30),
  });
  return q;
}

export function generateQuestions(grade, count = 10) {
  logger.info('QuestionGenerator', `生成随机题目`, { grade, count });
  const gen = gradeRandomGenerators[grade] || gradeRandomGenerators[3];
  const questions = gen(count);
  logger.info('QuestionGenerator', `题目生成完成: ${questions.length}题`);
  return questions;
}

// ================================================================
// 章节列表（供专项突破和出卷页面使用）
// ================================================================

export { grade1Chapters, grade2Chapters, grade3Chapters, grade4Chapters, grade5Chapters };

// 按章节生成题目
export function generateQuestionsByTopic(grade, topic, count = 10) {
  logger.info('QuestionGenerator', `按章节生成题目`, { grade, topic, count });
  const gcm = gradeChapterMap[grade] || gradeChapterMap[3];
  const chapter = gcm.chapters.find(c => c.name === topic);
  if (chapter) {
    const questions = gcm.mixed(chapter.id, Math.ceil(count * 0.6), Math.floor(count * 0.4));
    logger.info('QuestionGenerator', `章节题目生成完成: ${questions.length}题`, {
      topic,
      chapterId: chapter.id,
    });
    return questions;
  }
  logger.warn('QuestionGenerator', `未找到章节 "${topic}"，使用随机生成`);
  const gen = gradeRandomGenerators[grade] || gradeRandomGenerators[3];
  return gen(count);
}

// 导出各年级章节相关函数
export {
  generateGrade1ChapterBasic,
  generateGrade1ChapterApp,
  generateGrade1ChapterMixed,
  generateGrade1RandomQuestions,
};
export {
  generateGrade2ChapterBasic,
  generateGrade2ChapterApp,
  generateGrade2ChapterMixed,
  generateGrade2RandomQuestions,
};
export {
  generateGrade3ChapterBasic,
  generateGrade3ChapterApp,
  generateGrade3ChapterMixed,
  generateGrade3RandomQuestions,
};
export {
  generateGrade4ChapterBasic,
  generateGrade4ChapterApp,
  generateGrade4ChapterMixed,
  generateGrade4RandomQuestions,
};
export {
  generateGrade5ChapterBasic,
  generateGrade5ChapterApp,
  generateGrade5ChapterMixed,
  generateGrade5RandomQuestions,
};
