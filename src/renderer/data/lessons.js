// 数学小王子 · 奥数班课程数据
// 4主题 × 4课 = 16课，每课四段式（概念动画→例题动画→练习→测评）
// 面向2年级普通孩子，只做入门级，确保能看懂

// ================================================================
// 数论（4课）
// ================================================================

const numberTheoryLessons = [
  {
    id: 'nt-1',
    title: '奇偶性',
    objective: '认识奇数和偶数，知道偶数能分成两堆一样多，奇数会剩1个',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'particle-split', seed: 42, params: { count: 8 } },
      narration: '小朋友，我们来玩分糖果的游戏。8颗糖分给2个人，每人一样多吗？可以！因为8是偶数。7颗糖呢？每人3颗，还剩1颗。7是奇数。能分成两堆一样多的就是偶数，会剩1个的就是奇数。',
    },
    example: {
      question: '有9颗糖，分给2个小朋友，能平均分吗？',
      solution: ['9是奇数', '9 = 4 + 4 + 1', '每人分4颗，剩1颗', '所以不能平均分'],
      animation: { type: 'candy-split', seed: 108, params: { total: 9 } },
    },
    practice: {
      generator: 'genOddEven',
      count: 5,
      animation: { type: 'candy-drag', seed: 256 },
    },
    assessment: {
      generator: 'genOddEvenHard',
      count: 3,
    },
  },
  {
    id: 'nt-2',
    title: '余数',
    objective: '理解余数的概念：分不完剩下的数就是余数',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'circle-loop', seed: 7, params: { total: 10, step: 3 } },
      narration: '10个小朋友排队报数，每次数3个：1、2、3，1、2、3……最后剩下1个人。这个剩下的人就是余数。10除以3等于3余1，余数就是1。',
    },
    example: {
      question: '13颗糖，每4颗装一袋，能装几袋？还剩几颗？',
      solution: ['13 ÷ 4 = 3 余 1', '装了3袋', '还剩1颗'],
      animation: { type: 'candy-bag', seed: 33, params: { total: 13, per: 4 } },
    },
    practice: {
      generator: 'genRemainder',
      count: 5,
      animation: { type: 'circle-loop', seed: 101 },
    },
    assessment: {
      generator: 'genRemainderHard',
      count: 3,
    },
  },
  {
    id: 'nt-3',
    title: '整除',
    objective: '理解整除：能排成完整方阵的就是整除',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'grid-fill', seed: 6, params: { rows: 4, cols: 4 } },
      narration: '12颗糖能排成3行4列的方阵，每行每列都一样多，这就是整除！12能被3整除，也能被4整除。但如果13颗糖，排3行的话最后一行会少1颗，13不能被3整除。',
    },
    example: {
      question: '18颗糖，排成3行，每行几颗？能排整齐吗？',
      solution: ['18 ÷ 3 = 6', '每行6颗', '能排整齐，18能被3整除'],
      animation: { type: 'grid-fill', seed: 99, params: { rows: 3, cols: 6 } },
    },
    practice: {
      generator: 'genDivisible',
      count: 5,
      animation: { type: 'grid-fill', seed: 200 },
    },
    assessment: {
      generator: 'genDivisibleHard',
      count: 3,
    },
  },
  {
    id: 'nt-4',
    title: '质数',
    objective: '认识质数：只能被1和它自己整除的数',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'sieve-particle', seed: 2, params: { max: 30 } },
      narration: '质数是数学里的"独行侠"——除了1和它自己，没有别的数能整除它。比如7，只有1和7能整除它，所以7是质数。6呢？1、2、3、6都能整除它，所以6不是质数。我们用筛法把非质数筛掉，剩下的就是质数！',
    },
    example: {
      question: '1到10里，哪些是质数？',
      solution: ['2：只有1和2能整除 → 质数', '3：只有1和3能整除 → 质数', '4：1、2、4能整除 → 不是', '5：只有1和5能整除 → 质数', '7：只有1和7能整除 → 质数', '质数有：2、3、5、7'],
      animation: { type: 'sieve-particle', seed: 50, params: { max: 10 } },
    },
    practice: {
      generator: 'genPrime',
      count: 5,
      animation: { type: 'sieve-particle', seed: 300 },
    },
    assessment: {
      generator: 'genPrimeHard',
      count: 3,
    },
  },
];

// ================================================================
// 几何（4课）
// ================================================================

const geometryLessons = [
  {
    id: 'geo-1',
    title: '周长',
    objective: '理解周长：绕图形一圈的长度',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'border-walk', seed: 1, params: { shape: 'rect', w: 5, h: 3 } },
      narration: '周长就是绕图形走一圈的长度。一个长方形，长5格宽3格，走一圈：上边5格，右边3格，下边5格，左边3格，一共16格。周长 = （长 + 宽）× 2。',
    },
    example: {
      question: '长方形长6格，宽4格，周长是多少？',
      solution: ['周长 = （长 + 宽）× 2', '= （6 + 4）× 2', '= 10 × 2', '= 20（格）'],
      animation: { type: 'border-walk', seed: 77, params: { shape: 'rect', w: 6, h: 4 } },
    },
    practice: {
      generator: 'genPerimeter',
      count: 5,
      animation: { type: 'border-walk', seed: 400 },
    },
    assessment: {
      generator: 'genPerimeterHard',
      count: 3,
    },
  },
  {
    id: 'geo-2',
    title: '长方形面积',
    objective: '理解面积：长方形面积 = 长 × 宽',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'grid-fill', seed: 8, params: { rows: 4, cols: 6 } },
      narration: '面积就是图形里面有多少个小格子。长方形长6格宽4格，里面能铺 6 × 4 = 24 个小格子。面积 = 长 × 宽。',
    },
    example: {
      question: '长方形长7格，宽5格，面积是多少？',
      solution: ['面积 = 长 × 宽', '= 7 × 5', '= 35（格）'],
      animation: { type: 'grid-fill', seed: 150, params: { rows: 5, cols: 7 } },
    },
    practice: {
      generator: 'genRectArea',
      count: 5,
      animation: { type: 'grid-fill', seed: 500 },
    },
    assessment: {
      generator: 'genRectAreaHard',
      count: 3,
    },
  },
  {
    id: 'geo-3',
    title: '三角形面积',
    objective: '理解三角形面积：三角形 = 长方形的一半',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'cut-rearrange', seed: 3, params: { shape: 'triangle', w: 6, h: 4 } },
      narration: '三角形的面积是长方形的一半。一个长6格宽4格的长方形，面积是24格。沿着对角线切开，得到两个三角形，每个三角形的面积就是 24 ÷ 2 = 12 格。三角形面积 = 底 × 高 ÷ 2。',
    },
    example: {
      question: '三角形底8格，高4格，面积是多少？',
      solution: ['面积 = 底 × 高 ÷ 2', '= 8 × 4 ÷ 2', '= 32 ÷ 2', '= 16（格）'],
      animation: { type: 'cut-rearrange', seed: 200, params: { shape: 'triangle', w: 8, h: 4 } },
    },
    practice: {
      generator: 'genTriArea',
      count: 5,
      animation: { type: 'cut-rearrange', seed: 600 },
    },
    assessment: {
      generator: 'genTriAreaHard',
      count: 3,
    },
  },
  {
    id: 'geo-4',
    title: '正方形面积',
    objective: '理解正方形面积：边长 × 边长',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'grid-fill', seed: 9, params: { rows: 5, cols: 5 } },
      narration: '正方形是特殊的长方形，四条边都一样长。边长5格的正方形，面积就是 5 × 5 = 25 格。正方形面积 = 边长 × 边长 = 边长的平方。',
    },
    example: {
      question: '正方形边长6格，面积是多少？',
      solution: ['面积 = 边长 × 边长', '= 6 × 6', '= 36（格）'],
      animation: { type: 'grid-fill', seed: 250, params: { rows: 6, cols: 6 } },
    },
    practice: {
      generator: 'genSquareArea',
      count: 5,
      animation: { type: 'grid-fill', seed: 700 },
    },
    assessment: {
      generator: 'genSquareAreaHard',
      count: 3,
    },
  },
];

// ================================================================
// 组合（4课）
// ================================================================

const combinatoricsLessons = [
  {
    id: 'comb-1',
    title: '加法原理',
    objective: '理解加法原理：分类相加',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'branch-path', seed: 1, params: { branches: 3 } },
      narration: '从家到学校有两条路，从学校到图书馆有三条路。从家到图书馆有几条路？2 + 3 = 5条！这就是加法原理——分类相加，把每种选择加起来。',
    },
    example: {
      question: '小明有3件上衣和2条裤子，一共有几种穿法？（提示：这是乘法原理，不是加法）',
      solution: ['选上衣：3种选择', '选裤子：2种选择', '总穿法 = 3 × 2 = 6种', '（加法原理是分类：如走路上）'],
      animation: { type: 'branch-path', seed: 88, params: { branches: 5 } },
    },
    practice: {
      generator: 'genAddPrinciple',
      count: 5,
      animation: { type: 'branch-path', seed: 800 },
    },
    assessment: {
      generator: 'genAddPrincipleHard',
      count: 3,
    },
  },
  {
    id: 'comb-2',
    title: '乘法原理',
    objective: '理解乘法原理：分步相乘',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'dual-path', seed: 2, params: { step1: 3, step2: 4 } },
      narration: '小明有3件上衣和2条裤子，选一件上衣再选一条裤子，一共有几种搭配？3 × 2 = 6种！这就是乘法原理——分步相乘，每一步的选择数相乘。',
    },
    example: {
      question: '从甲地到乙地有2条路，从乙地到丙地有3条路，从甲到丙有几种走法？',
      solution: ['第一步：甲到乙，2种选择', '第二步：乙到丙，3种选择', '总走法 = 2 × 3 = 6种'],
      animation: { type: 'dual-path', seed: 120, params: { step1: 2, step2: 3 } },
    },
    practice: {
      generator: 'genMulPrinciple',
      count: 5,
      animation: { type: 'dual-path', seed: 900 },
    },
    assessment: {
      generator: 'genMulPrincipleHard',
      count: 3,
    },
  },
  {
    id: 'comb-3',
    title: '简单排列',
    objective: '理解排列：顺序不同算不同的排列',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'particle-arrange', seed: 4, params: { items: 3 } },
      narration: '红、黄、蓝三个球排成一排，有几种排法？红黄蓝和黄红蓝是两种不同的排法哦！第一个位置3种选择，第二个位置2种，第三个位置1种，一共 3 × 2 × 1 = 6种。',
    },
    example: {
      question: '用1、2、3三个数字排成三位数，有几种排法？',
      solution: ['百位：3种选择（1、2、3）', '十位：2种选择', '个位：1种选择', '总排法 = 3 × 2 × 1 = 6种'],
      animation: { type: 'particle-arrange', seed: 180, params: { items: 3 } },
    },
    practice: {
      generator: 'genPermutation',
      count: 5,
      animation: { type: 'particle-arrange', seed: 1000 },
    },
    assessment: {
      generator: 'genPermutationHard',
      count: 3,
    },
  },
  {
    id: 'comb-4',
    title: '简单组合',
    objective: '理解组合：顺序不同算同一种组合',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'particle-combine', seed: 5, params: { items: 4, pick: 2 } },
      narration: '从红、黄、蓝、绿4个球里选2个，有几种选法？红黄和黄红是同一种选法！所以比排列少。一共6种：红黄、红蓝、红绿、黄蓝、黄绿、蓝绿。',
    },
    example: {
      question: '从1、2、3、4四个数里选2个，有几种选法？',
      solution: ['1和2、1和3、1和4', '2和3、2和4', '3和4', '一共6种选法'],
      animation: { type: 'particle-combine', seed: 220, params: { items: 4, pick: 2 } },
    },
    practice: {
      generator: 'genCombination',
      count: 5,
      animation: { type: 'particle-combine', seed: 1100 },
    },
    assessment: {
      generator: 'genCombinationHard',
      count: 3,
    },
  },
];

// ================================================================
// 应用题（4课）
// ================================================================

const wordProblemLessons = [
  {
    id: 'wp-1',
    title: '和差问题',
    objective: '掌握和差问题：已知两数之和与差，求两数',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'balance-scale', seed: 1, params: { sum: 10, diff: 2 } },
      narration: '小明和小红一共有10颗糖，小明比小红多2颗。小明几颗？小红几颗？把多出来的2颗先拿走，10-2=8颗，两人一样多，每人4颗。小明拿回2颗就是6颗。和差问题：大数 = （和+差）÷ 2，小数 = （和-差）÷ 2。',
    },
    example: {
      question: '两数之和是12，差是4，求这两个数',
      solution: ['大数 = （和+差）÷ 2', '= （12+4）÷ 2', '= 16 ÷ 2 = 8', '小数 = （12-4）÷ 2 = 4', '两个数是8和4'],
      animation: { type: 'balance-scale', seed: 160, params: { sum: 12, diff: 4 } },
    },
    practice: {
      generator: 'genSumDiff',
      count: 5,
      animation: { type: 'balance-scale', seed: 1200 },
    },
    assessment: {
      generator: 'genSumDiffHard',
      count: 3,
    },
  },
  {
    id: 'wp-2',
    title: '和倍问题',
    objective: '掌握和倍问题：已知两数之和与倍数，求两数',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'ratio-bar', seed: 2, params: { sum: 12, ratio: 2 } },
      narration: '小明和小红一共有12颗糖，小明的糖是小红的2倍。小红几颗？把小红的糖看成1份，小明的就是2份，一共3份。12÷3=4颗，每份4颗。小红4颗，小明8颗。和倍问题：小数 = 和 ÷ （倍数+1），大数 = 小数 × 倍数。',
    },
    example: {
      question: '两数之和是15，大数是小数的2倍，求这两个数',
      solution: ['份数 = 倍数 + 1 = 2 + 1 = 3', '小数 = 15 ÷ 3 = 5', '大数 = 5 × 2 = 10', '两个数是10和5'],
      animation: { type: 'ratio-bar', seed: 240, params: { sum: 15, ratio: 2 } },
    },
    practice: {
      generator: 'genSumRatio',
      count: 5,
      animation: { type: 'ratio-bar', seed: 1300 },
    },
    assessment: {
      generator: 'genSumRatioHard',
      count: 3,
    },
  },
  {
    id: 'wp-3',
    title: '差倍问题',
    objective: '掌握差倍问题：已知两数之差与倍数，求两数',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'ratio-bar', seed: 3, params: { diff: 6, ratio: 2 } },
      narration: '小明比小红多6颗糖，小明的糖是小红的2倍。小红几颗？小明比小红多1份，这1份就是6颗。小红6颗，小明12颗。差倍问题：小数 = 差 ÷ （倍数-1），大数 = 小数 × 倍数。',
    },
    example: {
      question: '两数之差是8，大数是小数的3倍，求这两个数',
      solution: ['份数差 = 倍数 - 1 = 3 - 1 = 2', '小数 = 8 ÷ 2 = 4', '大数 = 4 × 3 = 12', '两个数是12和4'],
      animation: { type: 'ratio-bar', seed: 320, params: { diff: 8, ratio: 3 } },
    },
    practice: {
      generator: 'genDiffRatio',
      count: 5,
      animation: { type: 'ratio-bar', seed: 1400 },
    },
    assessment: {
      generator: 'genDiffRatioHard',
      count: 3,
    },
  },
  {
    id: 'wp-4',
    title: '鸡兔同笼',
    objective: '掌握鸡兔同笼：抬腿法',
    estimatedMinutes: 12,
    concept: {
      animation: { type: 'leg-lift', seed: 4, params: { heads: 10, legs: 28 } },
      narration: '鸡和兔关在同一个笼子里，数头有10个，数腿有28条。几只鸡几只兔？让所有动物都抬起两条腿，鸡抬起2条（坐地上了），兔抬起2条还剩2条。腿总数28-20=8条，每只兔剩2条，兔有8÷2=4只。鸡有10-4=6只。',
    },
    example: {
      question: '鸡兔共8个头，22条腿，鸡兔各几只？',
      solution: ['假设全是鸡：8×2=16条腿', '实际22条，多了6条', '每只兔多2条腿：6÷2=3只兔', '鸡：8-3=5只', '答：鸡5只，兔3只'],
      animation: { type: 'leg-lift', seed: 400, params: { heads: 8, legs: 22 } },
    },
    practice: {
      generator: 'genChickenRabbit',
      count: 5,
      animation: { type: 'leg-lift', seed: 1500 },
    },
    assessment: {
      generator: 'genChickenRabbitHard',
      count: 3,
    },
  },
];

// ================================================================
// 导出课程数据
// ================================================================

export const LESSONS = {
  'number-theory': numberTheoryLessons,
  'geometry': geometryLessons,
  'combinatorics': combinatoricsLessons,
  'word-problems': wordProblemLessons,
};

// 获取某主题的所有课程
export function getLessons(topicId) {
  return LESSONS[topicId] || [];
}

// 获取某节课
export function getLesson(topicId, lessonId) {
  const lessons = LESSONS[topicId] || [];
  return lessons.find(l => l.id === lessonId);
}

// 获取所有课程（扁平化）
export function getAllLessons() {
  return Object.entries(LESSONS).flatMap(([topicId, lessons]) =>
    lessons.map(l => ({ ...l, topicId }))
  );
}
