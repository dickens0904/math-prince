// 连线题生成器 - 匹配对应关系

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 生成乘法口诀连线题
 */
export function generateMulMatch() {
  const pairs = [];
  const usedA = new Set();

  while (pairs.length < 4) {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    if (!usedA.has(a)) {
      usedA.add(a);
      pairs.push({
        left: `${a} × ${b}`,
        right: String(a * b),
      });
    }
  }

  const leftItems = pairs.map((p, i) => ({ id: `L${i}`, content: p.left }));
  const rightItems = shuffleArray(pairs.map((p, i) => ({ id: `R${i}`, content: p.right })));

  const correctMatches = {};
  pairs.forEach((p, i) => {
    const rightItem = rightItems.find(r => r.content === p.right);
    correctMatches[`L${i}`] = rightItem.id;
  });

  return {
    type: 'matching',
    content: '将乘法算式与正确答案连线',
    leftItems,
    rightItems,
    correctMatches,
    questionType: 'matching',
  };
}

/**
 * 生成除法连线题
 */
export function generateDivMatch() {
  const pairs = [];
  const used = new Set();

  while (pairs.length < 4) {
    const b = randInt(2, 9);
    const ans = randInt(1, 9);
    const key = `${b}-${ans}`;
    if (!used.has(key)) {
      used.add(key);
      pairs.push({
        left: `${b * ans} ÷ ${b}`,
        right: String(ans),
      });
    }
  }

  const leftItems = pairs.map((p, i) => ({ id: `L${i}`, content: p.left }));
  const rightItems = shuffleArray(pairs.map((p, i) => ({ id: `R${i}`, content: p.right })));

  const correctMatches = {};
  pairs.forEach((p, i) => {
    const rightItem = rightItems.find(r => r.content === p.right);
    correctMatches[`L${i}`] = rightItem.id;
  });

  return {
    type: 'matching',
    content: '将除法算式与正确答案连线',
    leftItems,
    rightItems,
    correctMatches,
    questionType: 'matching',
  };
}

/**
 * 生成图形连线题
 */
export function generateShapeMatch() {
  const shapes = [
    { shape: '三角形', edges: '3条边', angles: '3个角' },
    { shape: '正方形', edges: '4条边', angles: '4个直角' },
    { shape: '长方形', edges: '4条边', angles: '4个直角' },
    { shape: '圆', edges: '0条边', angles: '0个角' },
  ];

  const selected = shuffleArray(shapes).slice(0, 4);

  const leftItems = selected.map((s, i) => ({ id: `L${i}`, content: s.shape }));
  const rightItems = shuffleArray(
    selected.map((s, i) => ({ id: `R${i}`, content: `${s.edges}，${s.angles}` }))
  );

  const correctMatches = {};
  selected.forEach((s, i) => {
    const rightItem = rightItems.find(r => r.content === `${s.edges}，${s.angles}`);
    correctMatches[`L${i}`] = rightItem.id;
  });

  return {
    type: 'matching',
    content: '将图形与其特征连线',
    leftItems,
    rightItems,
    correctMatches,
    questionType: 'matching',
  };
}

/**
 * 生成方向连线题
 */
export function generateDirectionMatch() {
  const directions = [
    { from: '面向北', to: '后面是南' },
    { from: '面向东', to: '左边是北' },
    { from: '面向南', to: '右边是西' },
    { from: '面向西', to: '后面是东' },
  ];

  const selected = shuffleArray(directions).slice(0, 4);

  const leftItems = selected.map((d, i) => ({ id: `L${i}`, content: d.from }));
  const rightItems = shuffleArray(selected.map((d, i) => ({ id: `R${i}`, content: d.to })));

  const correctMatches = {};
  selected.forEach((d, i) => {
    const rightItem = rightItems.find(r => r.content === d.to);
    correctMatches[`L${i}`] = rightItem.id;
  });

  return {
    type: 'matching',
    content: '将方向与对应关系连线',
    leftItems,
    rightItems,
    correctMatches,
    questionType: 'matching',
  };
}

/**
 * 生成时间连线题
 */
export function generateTimeMatch() {
  const pairs = [
    { left: '1小时', right: '60分钟' },
    { left: '半小时', right: '30分钟' },
    { left: '1分钟', right: '60秒' },
    { left: '2小时', right: '120分钟' },
  ];

  const leftItems = pairs.map((p, i) => ({ id: `L${i}`, content: p.left }));
  const rightItems = shuffleArray(pairs.map((p, i) => ({ id: `R${i}`, content: p.right })));

  const correctMatches = {};
  pairs.forEach((p, i) => {
    const rightItem = rightItems.find(r => r.content === p.right);
    correctMatches[`L${i}`] = rightItem.id;
  });

  return {
    type: 'matching',
    content: '将时间单位与对应值连线',
    leftItems,
    rightItems,
    correctMatches,
    questionType: 'matching',
  };
}

/**
 * 生成重量连线题
 */
export function generateWeightMatch() {
  const pairs = [
    { left: '1千克', right: '1000克' },
    { left: '2千克', right: '2000克' },
    { left: '3千克', right: '3000克' },
    { left: '5千克', right: '5000克' },
  ];

  const leftItems = pairs.map((p, i) => ({ id: `L${i}`, content: p.left }));
  const rightItems = shuffleArray(pairs.map((p, i) => ({ id: `R${i}`, content: p.right })));

  const correctMatches = {};
  pairs.forEach((p, i) => {
    const rightItem = rightItems.find(r => r.content === p.right);
    correctMatches[`L${i}`] = rightItem.id;
  });

  return {
    type: 'matching',
    content: '将千克与克的对应关系连线',
    leftItems,
    rightItems,
    correctMatches,
    questionType: 'matching',
  };
}

/**
 * 随机生成连线题
 */
export function generateRandomMatch() {
  const generators = [
    generateMulMatch,
    generateDivMatch,
    generateShapeMatch,
    generateDirectionMatch,
    generateTimeMatch,
    generateWeightMatch,
  ];

  const gen = generators[randInt(0, generators.length - 1)];
  return gen();
}
