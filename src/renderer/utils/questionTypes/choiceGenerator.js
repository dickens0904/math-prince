// 选择题生成器 - 为计算题生成干扰项

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成干扰选项
 * @param {string} correctAnswer 正确答案
 * @param {string} type 题目类型
 * @param {number} count 干扰项数量
 */
export function generateDistractors(correctAnswer, type, count = 3) {
  const distractors = [];
  const numAnswer = parseFloat(correctAnswer);

  if (!isNaN(numAnswer)) {
    // 数字答案：生成相近的干扰项
    const strategies = [
      () => String(numAnswer + randInt(1, 5)), // 稍大
      () => String(numAnswer - randInt(1, 5)), // 稍小
      () => String(numAnswer + randInt(10, 20)), // 差很多
      () => String(numAnswer * 2), // 翻倍
      () => String(Math.floor(numAnswer / 2)), // 减半
      () => String(numAnswer + randInt(1, 3) * 10), // 加几十
    ];

    while (distractors.length < count) {
      const strategy = strategies[randInt(0, strategies.length - 1)];
      const distractor = strategy();
      if (
        distractor !== correctAnswer &&
        !distractors.includes(distractor) &&
        parseFloat(distractor) > 0
      ) {
        distractors.push(distractor);
      }
    }
  } else {
    // 文字答案：生成相似的干扰项
    const textDistractors = {
      锐角: ['直角', '钝角', '平角'],
      直角: ['锐角', '钝角', '平角'],
      钝角: ['锐角', '直角', '平角'],
      相等: ['不相等', '更长', '更短'],
      南: ['北', '东', '西'],
      北: ['南', '东', '西'],
      东: ['西', '南', '北'],
      西: ['东', '南', '北'],
      因数: ['倍数', '商', '积'],
      倍数: ['因数', '商', '积'],
    };

    const possible = textDistractors[correctAnswer] || ['选项A', '选项B', '选项C'];
    for (let i = 0; i < Math.min(count, possible.length); i++) {
      distractors.push(possible[i]);
    }
  }

  return distractors;
}

/**
 * 将填空题转换为选择题
 * @param {Object} question 原题目
 * @returns {Object} 选择题
 */
export function convertToChoice(question) {
  const distractors = generateDistractors(question.answer, question.type);
  const options = [question.answer, ...distractors];

  // 打乱选项顺序
  for (let i = options.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    ...question,
    type: 'choice',
    originalType: question.type,
    options: options,
    questionType: 'choice',
  };
}

/**
 * 批量生成选择题
 * @param {Array} questions 题目数组
 * @param {number} ratio 选择题比例 (0-1)
 */
export function convertBatchToChoice(questions, ratio = 0.5) {
  return questions.map(q => {
    if (Math.random() < ratio && !q.isText) {
      return convertToChoice(q);
    }
    return q;
  });
}
