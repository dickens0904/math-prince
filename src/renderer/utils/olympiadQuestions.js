// 数学小王子 · 奥数班题目生成器
// 16课的练习和测评生成器
// 每题返回 { content, answer, solution, type }

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========== 数论 ==========

// 奇偶性
export function genOddEven() {
  const n = randInt(5, 15);
  return {
    content: `${n}是奇数还是偶数？`,
    answer: n % 2 === 0 ? '偶数' : '奇数',
    solution: n % 2 === 0 ? `${n}能被2整除，是偶数` : `${n}除以2余1，是奇数`,
    type: '奇偶性',
  };
}
export function genOddEvenHard() {
  const n = randInt(15, 30);
  const q = `${n}是奇数还是偶数？`;
  return {
    content: q,
    answer: n % 2 === 0 ? '偶数' : '奇数',
    solution: n % 2 === 0 ? `${n}÷2=${n/2}，整除，偶数` : `${n}÷2=${Math.floor(n/2)}余1，奇数`,
    type: '奇偶性',
  };
}

// 余数
export function genRemainder() {
  const total = randInt(10, 20);
  const per = randInt(3, 5);
  const r = total % per;
  return {
    content: `${total}颗糖，每${per}颗装一袋，能装几袋？还剩几颗？`,
    answer: `${Math.floor(total/per)}袋，剩${r}颗`,
    solution: `${total}÷${per}=${Math.floor(total/per)}余${r}`,
    type: '余数',
  };
}
export function genRemainderHard() {
  const total = randInt(20, 35);
  const per = randInt(4, 6);
  const r = total % per;
  return {
    content: `${total}除以${per}，商几余几？`,
    answer: `商${Math.floor(total/per)}，余${r}`,
    solution: `${total}÷${per}=${Math.floor(total/per)}余${r}`,
    type: '余数',
  };
}

// 整除
export function genDivisible() {
  const divisor = randInt(3, 5);
  const quotient = randInt(3, 6);
  const num = divisor * quotient;
  return {
    content: `${num}能被${divisor}整除吗？`,
    answer: '能',
    solution: `${num}÷${divisor}=${quotient}，能整除`,
    type: '整除',
  };
}
export function genDivisibleHard() {
  const divisor = randInt(3, 7);
  const quotient = randInt(4, 8);
  const num = divisor * quotient;
  return {
    content: `${num}÷${divisor}=？`,
    answer: String(quotient),
    solution: `${num}÷${divisor}=${quotient}`,
    type: '整除',
  };
}

// 质数
export function genPrime() {
  const n = randInt(2, 20);
  const isPrime = n > 1 && [2,3,5,7,11,13,17,19].includes(n);
  return {
    content: `${n}是质数还是合数？`,
    answer: isPrime ? '质数' : '合数',
    solution: isPrime ? `${n}只能被1和${n}整除，是质数` : `${n}除了1和${n}还能被别的数整除，是合数`,
    type: '质数',
  };
}
export function genPrimeHard() {
  const n = randInt(2, 30);
  const primes = [2,3,5,7,11,13,17,19,23,29];
  const isPrime = primes.includes(n);
  return {
    content: `判断：${n}是质数吗？`,
    answer: isPrime ? '是质数' : '不是质数',
    solution: isPrime ? `${n}是质数` : `${n}不是质数`,
    type: '质数',
  };
}

// ========== 几何 ==========

// 周长
export function genPerimeter() {
  const l = randInt(4, 8);
  const w = randInt(3, 6);
  return {
    content: `长方形长${l}格，宽${w}格，周长是多少？`,
    answer: String((l + w) * 2),
    solution: `周长 = （${l}+${w}）×2 = ${(l+w)*2}`,
    type: '周长',
  };
}
export function genPerimeterHard() {
  const l = randInt(5, 10);
  const w = randInt(4, 8);
  return {
    content: `长方形长${l}，宽${w}，周长？`,
    answer: String((l + w) * 2),
    solution: `周长 = （${l}+${w}）×2 = ${(l+w)*2}`,
    type: '周长',
  };
}

// 长方形面积
export function genRectArea() {
  const l = randInt(4, 8);
  const w = randInt(3, 6);
  return {
    content: `长方形长${l}格，宽${w}格，面积是多少？`,
    answer: String(l * w),
    solution: `面积 = ${l}×${w} = ${l*w}`,
    type: '长方形面积',
  };
}
export function genRectAreaHard() {
  const l = randInt(5, 10);
  const w = randInt(4, 8);
  return {
    content: `长方形长${l}，宽${w}，面积？`,
    answer: String(l * w),
    solution: `面积 = ${l}×${w} = ${l*w}`,
    type: '长方形面积',
  };
}

// 三角形面积
export function genTriArea() {
  const base = randInt(4, 8);
  const height = randInt(4, 6);
  return {
    content: `三角形底${base}格，高${height}格，面积是多少？`,
    answer: String((base * height) / 2),
    solution: `面积 = ${base}×${height}÷2 = ${(base*height)/2}`,
    type: '三角形面积',
  };
}
export function genTriAreaHard() {
  const base = randInt(6, 10);
  const height = randInt(5, 8);
  return {
    content: `三角形底${base}，高${height}，面积？`,
    answer: String((base * height) / 2),
    solution: `面积 = ${base}×${height}÷2 = ${(base*height)/2}`,
    type: '三角形面积',
  };
}

// 正方形面积
export function genSquareArea() {
  const side = randInt(4, 8);
  return {
    content: `正方形边长${side}格，面积是多少？`,
    answer: String(side * side),
    solution: `面积 = ${side}×${side} = ${side*side}`,
    type: '正方形面积',
  };
}
export function genSquareAreaHard() {
  const side = randInt(5, 10);
  return {
    content: `正方形边长${side}，面积？`,
    answer: String(side * side),
    solution: `面积 = ${side}×${side} = ${side*side}`,
    type: '正方形面积',
  };
}

// ========== 组合 ==========

// 加法原理
export function genAddPrinciple() {
  const a = randInt(2, 4);
  const b = randInt(2, 4);
  return {
    content: `从家到学校有${a}条路，从学校到图书馆有${b}条路，一共几条路？`,
    answer: String(a + b),
    solution: `${a}+${b}=${a+b}（加法原理：分类相加）`,
    type: '加法原理',
  };
}
export function genAddPrincipleHard() {
  const a = randInt(3, 5);
  const b = randInt(3, 5);
  const c = randInt(2, 4);
  return {
    content: `三段路分别有${a}、${b}、${c}条，一共几条？`,
    answer: String(a + b + c),
    solution: `${a}+${b}+${c}=${a+b+c}`,
    type: '加法原理',
  };
}

// 乘法原理
export function genMulPrinciple() {
  const a = randInt(2, 4);
  const b = randInt(2, 5);
  return {
    content: `上衣${a}件，裤子${b}条，一共几种穿法？`,
    answer: String(a * b),
    solution: `${a}×${b}=${a*b}（乘法原理：分步相乘）`,
    type: '乘法原理',
  };
}
export function genMulPrincipleHard() {
  const a = randInt(3, 5);
  const b = randInt(3, 5);
  const c = randInt(2, 4);
  return {
    content: `甲到乙${a}条路，乙到丙${b}条路，丙到丁${c}条路，一共几条？`,
    answer: String(a * b * c),
    solution: `${a}×${b}×${c}=${a*b*c}`,
    type: '乘法原理',
  };
}

// 排列
export function genPermutation() {
  const n = randInt(2, 4);
  const nums = [];
  for (let i = 0; i < n; i++) nums.push(i + 1);
  const fact = nums.reduce((acc, v) => acc * v, 1);
  return {
    content: `用${nums.join('、')}排成${n}位数，有几种排法？`,
    answer: String(fact),
    solution: `${n}! = ${nums.join('×')} = ${fact}`,
    type: '排列',
  };
}
export function genPermutationHard() {
  const n = randInt(3, 5);
  const nums = [];
  for (let i = 0; i < n; i++) nums.push(i + 1);
  const fact = nums.reduce((acc, v) => acc * v, 1);
  return {
    content: `用${nums.join('、')}排成${n}位数，有几种排法？`,
    answer: String(fact),
    solution: `${n}! = ${fact}`,
    type: '排列',
  };
}

// 组合
export function genCombination() {
  const n = randInt(3, 5);
  const k = randInt(2, Math.max(2, n - 1));
  // 简单组合数计算
  const combos = [];
  const nums = [];
  for (let i = 0; i < n; i++) nums.push(i + 1);
  const combine = (arr, kk) => {
    if (kk === 0) return [[]];
    if (arr.length === 0) return [];
    const result = [];
    const head = arr[0];
    const rest = arr.slice(1);
    for (const c of combine(rest, kk - 1)) result.push([head, ...c]);
    for (const c of combine(rest, kk)) result.push(c);
    return result;
  };
  const count = combine(nums, k).length;
  return {
    content: `从${nums.join('、')}里选${k}个，有几种选法？`,
    answer: String(count),
    solution: `C(${n},${k}) = ${count}`,
    type: '组合',
  };
}
export function genCombinationHard() {
  const n = randInt(4, 6);
  const k = randInt(2, 3);
  const nums = [];
  for (let i = 0; i < n; i++) nums.push(i + 1);
  const combine = (arr, kk) => {
    if (kk === 0) return [[]];
    if (arr.length === 0) return [];
    const result = [];
    const head = arr[0];
    const rest = arr.slice(1);
    for (const c of combine(rest, kk - 1)) result.push([head, ...c]);
    for (const c of combine(rest, kk)) result.push(c);
    return result;
  };
  const count = combine(nums, k).length;
  return {
    content: `从${nums.join('、')}里选${k}个，有几种选法？`,
    answer: String(count),
    solution: `C(${n},${k}) = ${count}`,
    type: '组合',
  };
}

// ========== 应用题 ==========

// 和差问题
export function genSumDiff() {
  const sum = randInt(8, 20);
  const diff = randInt(2, 6);
  const big = (sum + diff) / 2;
  const small = (sum - diff) / 2;
  return {
    content: `两数之和${sum}，差${diff}，求两数`,
    answer: `${big}和${small}`,
    solution: `大数=（${sum}+${diff}）÷2=${big}，小数=${small}`,
    type: '和差问题',
  };
}
export function genSumDiffHard() {
  const sum = randInt(15, 30);
  const diff = randInt(4, 10);
  const big = (sum + diff) / 2;
  const small = (sum - diff) / 2;
  return {
    content: `两数之和${sum}，差${diff}，求两数`,
    answer: `${big}和${small}`,
    solution: `大数=（${sum}+${diff}）÷2=${big}，小数=${small}`,
    type: '和差问题',
  };
}

// 和倍问题
export function genSumRatio() {
  const ratio = randInt(2, 4);
  const small = randInt(3, 8);
  const big = small * ratio;
  const sum = small + big;
  return {
    content: `两数之和${sum}，大数是小数的${ratio}倍，求两数`,
    answer: `${big}和${small}`,
    solution: `小数=${sum}÷（${ratio}+1）=${small}，大数=${small}×${ratio}=${big}`,
    type: '和倍问题',
  };
}
export function genSumRatioHard() {
  const ratio = randInt(2, 5);
  const small = randInt(4, 10);
  const big = small * ratio;
  const sum = small + big;
  return {
    content: `两数之和${sum}，大数是小数的${ratio}倍，求两数`,
    answer: `${big}和${small}`,
    solution: `小数=${sum}÷（${ratio}+1）=${small}，大数=${big}`,
    type: '和倍问题',
  };
}

// 差倍问题
export function genDiffRatio() {
  const ratio = randInt(2, 4);
  const small = randInt(3, 8);
  const big = small * ratio;
  const diff = big - small;
  return {
    content: `两数之差${diff}，大数是小数的${ratio}倍，求两数`,
    answer: `${big}和${small}`,
    solution: `小数=${diff}÷（${ratio}-1）=${small}，大数=${big}`,
    type: '差倍问题',
  };
}
export function genDiffRatioHard() {
  const ratio = randInt(2, 5);
  const small = randInt(4, 10);
  const big = small * ratio;
  const diff = big - small;
  return {
    content: `两数之差${diff}，大数是小数的${ratio}倍，求两数`,
    answer: `${big}和${small}`,
    solution: `小数=${diff}÷（${ratio}-1）=${small}，大数=${big}`,
    type: '差倍问题',
  };
}

// 鸡兔同笼
export function genChickenRabbit() {
  const heads = randInt(8, 15);
  const rabbits = randInt(2, Math.floor(heads / 2));
  const chickens = heads - rabbits;
  const legs = chickens * 2 + rabbits * 4;
  return {
    content: `鸡兔共${heads}个头，${legs}条腿，鸡兔各几只？`,
    answer: `鸡${chickens}只，兔${rabbits}只`,
    solution: `兔=（${legs}-${heads}×2）÷2=${rabbits}，鸡=${chickens}`,
    type: '鸡兔同笼',
  };
}
export function genChickenRabbitHard() {
  const heads = randInt(10, 20);
  const rabbits = randInt(3, Math.floor(heads / 2));
  const chickens = heads - rabbits;
  const legs = chickens * 2 + rabbits * 4;
  return {
    content: `鸡兔共${heads}个头，${legs}条腿，鸡兔各几只？`,
    answer: `鸡${chickens}只，兔${rabbits}只`,
    solution: `兔=（${legs}-${heads}×2）÷2=${rabbits}，鸡=${chickens}`,
    type: '鸡兔同笼',
  };
}

// 生成器注册表
export const GENERATORS = {
  genOddEven, genOddEvenHard,
  genRemainder, genRemainderHard,
  genDivisible, genDivisibleHard,
  genPrime, genPrimeHard,
  genPerimeter, genPerimeterHard,
  genRectArea, genRectAreaHard,
  genTriArea, genTriAreaHard,
  genSquareArea, genSquareAreaHard,
  genAddPrinciple, genAddPrincipleHard,
  genMulPrinciple, genMulPrincipleHard,
  genPermutation, genPermutationHard,
  genCombination, genCombinationHard,
  genSumDiff, genSumDiffHard,
  genSumRatio, genSumRatioHard,
  genDiffRatio, genDiffRatioHard,
  genChickenRabbit, genChickenRabbitHard,
};

// 按生成器名字生成题目
export function generateByName(generatorName, count = 5) {
  const gen = GENERATORS[generatorName];
  if (!gen) return [];
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push({ ...gen(), id: i + 1 });
  }
  return questions;
}
