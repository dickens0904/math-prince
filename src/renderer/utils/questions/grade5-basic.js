// 五年级基础计算题 - 沪教版2024新教材

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function randDec(min, max, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

function roundTo(val, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function simplifyFrac(num, den) {
  const g = gcd(num, den);
  return [num / g, den / g];
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// ============ 第一章：复习与提高 ============

// 整数四则混合运算
export function genIntMixedOps() {
  const r = randInt(1, 5);
  if (r === 1) {
    const a = randInt(10, 99);
    const b = randInt(10, 50);
    const c = randInt(2, 9);
    return {
      content: `${a} + ${b} × ${c} = ?`,
      answer: String(a + b * c),
      type: '四则混合',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const c = randInt(2, 9);
    const b = randInt(10, 50);
    const a = b * c + randInt(1, 50);
    return {
      content: `${a} - ${b} × ${c} = ?`,
      answer: String(a - b * c),
      type: '四则混合',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const b = randInt(2, 8);
    const c = randInt(2, 8);
    const a = b * c * randInt(2, 5);
    return {
      content: `${a} ÷ ${b} - ${c} = ?`,
      answer: String(a / b - c),
      type: '四则混合',
      difficulty: 1,
    };
  }
  if (r === 4) {
    const a = randInt(20, 80);
    const b = randInt(2, 9);
    const c = randInt(2, 5);
    return {
      content: `(${a} + ${b * c}) ÷ ${c} = ?`,
      answer: String((a + b * c) / c),
      type: '四则混合',
      difficulty: 2,
    };
  }
  const a = randInt(10, 50);
  const b = randInt(2, 5);
  const c = randInt(2, 5);
  return {
    content: `${a} × ${b} + ${c} × ${c} = ?`,
    answer: String(a * b + c * c),
    type: '四则混合',
    difficulty: 1,
  };
}

// 小数加减法
export function genDecAddSub() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randDec(1, 10, 1);
    const b = randDec(1, 10, 1);
    return {
      content: `${a} + ${b} = ?`,
      answer: String(roundTo(a + b, 1)),
      type: '小数加法',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randDec(5, 20, 1);
    const b = randDec(0.1, a - 0.1, 1);
    return {
      content: `${a} - ${b} = ?`,
      answer: String(roundTo(a - b, 1)),
      type: '小数减法',
      difficulty: 1,
    };
  }
  const a = randDec(1, 10, 2);
  const b = randDec(1, 10, 2);
  return {
    content: `${a} + ${b} = ?`,
    answer: String(roundTo(a + b, 2)),
    type: '小数加法（两位）',
    difficulty: 1,
  };
}

// 简便运算
export function genEasyCalc() {
  const r = randInt(1, 5);
  if (r === 1) {
    const a = randInt(10, 50);
    const b = randInt(10, 50);
    return {
      content: `${a} + ${99 - a} + ${b} = ? （用凑整法）`,
      answer: String(99 + b),
      type: '简便运算（凑整）',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(20, 90);
    return {
      content: `${a} × 99 + ${a} = ? （用乘法分配律）`,
      answer: String(a * 100),
      type: '简便运算（分配律）',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    return {
      content: `${a} × 25 × ${b} × 4 = ? （用结合律）`,
      answer: String(a * b * 100),
      type: '简便运算（结合律）',
      difficulty: 2,
    };
  }
  if (r === 4) {
    const a = randInt(10, 50);
    return {
      content: `${a} × 101 = ? （用分配律）`,
      answer: String(a * 101),
      type: '简便运算（分配律）',
      difficulty: 2,
    };
  }
  const a = randInt(10, 50);
  return {
    content: `${a} × 102 - ${a} × 2 = ?`,
    answer: String(a * 100),
    type: '简便运算（提取公因数）',
    difficulty: 2,
  };
}

// 分数与小数转化
export function genFracDecConvert() {
  const pairs = [
    [1, 2, 0.5],
    [1, 4, 0.25],
    [3, 4, 0.75],
    [1, 5, 0.2],
    [2, 5, 0.4],
    [3, 5, 0.6],
    [4, 5, 0.8],
    [1, 8, 0.125],
    [3, 8, 0.375],
    [5, 8, 0.625],
    [7, 8, 0.875],
    [1, 10, 0.1],
    [3, 10, 0.3],
    [7, 10, 0.7],
    [9, 10, 0.9],
    [1, 20, 0.05],
    [1, 3, null],
    [2, 3, null],
  ];
  const r = randInt(1, 2);
  if (r === 1) {
    // 分数转小数（有限小数的）
    const finitePairs = pairs.filter(p => p[2] !== null);
    const [num, den, dec] = pick(finitePairs);
    return {
      content: `将 ${num}/${den} 化为小数`,
      answer: String(dec),
      type: '分数转小数',
      difficulty: 1,
    };
  }
  // 小数转分数
  const finitePairs = pairs.filter(p => p[2] !== null);
  const [num, den, dec] = pick(finitePairs);
  return {
    content: `将 ${dec} 化为分数（最简分数）`,
    answer: `${simplifyFrac(num, den)[0]}/${simplifyFrac(num, den)[1]}`,
    type: '小数转分数',
    difficulty: 1,
  };
}

// 组合图形面积（基础）
export function genCompositeArea() {
  const r = randInt(1, 3);
  if (r === 1) {
    // 两个长方形拼合
    const l1 = randInt(3, 8);
    const w1 = randInt(2, 5);
    const l2 = randInt(3, 8);
    const w2 = w1;
    const totalArea = l1 * w1 + l2 * w2;
    return {
      content: `一个组合图形由两个长方形组成，第一个长${l1}厘米宽${w1}厘米，第二个长${l2}厘米宽${w2}厘米，总面积是多少？`,
      answer: `${totalArea}平方厘米`,
      type: '组合图形面积',
      difficulty: 2,
    };
  }
  if (r === 2) {
    // 正方形挖去小正方形
    const big = randInt(5, 10);
    const small = randInt(1, big - 2);
    return {
      content: `一个大正方形边长${big}厘米，中间挖去一个小正方形（边长${small}厘米），剩余面积是多少？`,
      answer: `${big * big - small * small}平方厘米`,
      type: '组合图形面积',
      difficulty: 2,
    };
  }
  // 长方形+三角形
  const l = randInt(4, 10);
  const w = randInt(3, 6);
  const triBase = l;
  const triH = randInt(2, 5);
  const totalArea = l * w + (triBase * triH) / 2;
  return {
    content: `一个组合图形下方是长${l}厘米宽${w}厘米的长方形，上方是一个底${triBase}厘米高${triH}厘米的三角形，总面积是多少？`,
    answer: `${totalArea}平方厘米`,
    type: '组合图形面积',
    difficulty: 2,
  };
}

// 小数比大小
export function genDecCompare() {
  const a = randDec(0.1, 10, randInt(1, 2));
  const b = randDec(0.1, 10, randInt(1, 2));
  if (a === b) return genDecCompare();
  return {
    content: `${a} ○ ${b}（填 >、< 或 =）`,
    answer: a > b ? '>' : '<',
    type: '小数比大小',
    difficulty: 1,
  };
}

// ============ 第二章：小数乘除法 ============

// 小数乘整数
export function genDecMulInt() {
  const a = randDec(0.1, 9.9, 1);
  const b = randInt(2, 9);
  return {
    content: `${a} × ${b} = ?`,
    answer: String(roundTo(a * b, 1)),
    type: '小数乘整数',
    difficulty: 1,
  };
}

// 小数乘小数
export function genDecMulDec() {
  const a = randDec(0.1, 9.9, 1);
  const b = randDec(0.1, 9.9, 1);
  return {
    content: `${a} × ${b} = ?`,
    answer: String(roundTo(a * b, 2)),
    type: '小数乘小数',
    difficulty: 2,
  };
}

// 小数除以整数
export function genDecDivInt() {
  const b = randInt(2, 8);
  const ans = randDec(0.1, 9.9, 1);
  const a = roundTo(b * ans, 1);
  return { content: `${a} ÷ ${b} = ?`, answer: String(ans), type: '小数除以整数', difficulty: 1 };
}

// 小数除以小数
export function genDecDivDec() {
  const ans = randDec(0.1, 9.9, 1);
  const b = randDec(0.2, 4.9, 1);
  const a = roundTo(ans * b, 2);
  return {
    content: `${a} ÷ ${b} = ?`,
    answer: String(roundTo(ans, 1)),
    type: '小数除以小数',
    difficulty: 2,
  };
}

// 积的近似值
export function genProductApprox() {
  const a = randDec(0.1, 9.9, 2);
  const b = randDec(0.1, 9.9, 2);
  const product = a * b;
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `${a} × ${b} ≈ ?（保留一位小数）`,
      answer: String(roundTo(product, 1)),
      type: '积的近似值',
      difficulty: 2,
    };
  }
  return {
    content: `${a} × ${b} ≈ ?（保留两位小数）`,
    answer: String(roundTo(product, 2)),
    type: '积的近似值',
    difficulty: 2,
  };
}

// 商的近似值
export function genQuotientApprox() {
  const b = randInt(2, 7);
  const a = randDec(1, 20, 1);
  const quotient = a / b;
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `${a} ÷ ${b} ≈ ?（保留一位小数）`,
      answer: String(roundTo(quotient, 1)),
      type: '商的近似值',
      difficulty: 2,
    };
  }
  return {
    content: `${a} ÷ ${b} ≈ ?（保留两位小数）`,
    answer: String(roundTo(quotient, 2)),
    type: '商的近似值',
    difficulty: 2,
  };
}

// 循环小数识别
export function genRepeatingDec() {
  const examples = [
    { frac: '1÷3', result: '0.333…', notation: '0.3̇', name: '0.3循环' },
    { frac: '2÷3', result: '0.666…', notation: '0.6̇', name: '0.6循环' },
    { frac: '1÷6', result: '0.1666…', notation: '0.16̇', name: '0.6循环' },
    { frac: '1÷7', result: '0.142857…', notation: '0.1̇4̇2̇8̇5̇7̇', name: '循环小数' },
    { frac: '5÷6', result: '0.8333…', notation: '0.83̇', name: '0.3循环' },
    { frac: '4÷9', result: '0.444…', notation: '0.4̇', name: '0.4循环' },
    { frac: '5÷9', result: '0.555…', notation: '0.5̇', name: '0.5循环' },
    { frac: '7÷11', result: '0.6363…', notation: '0.6̇3̇', name: '63循环' },
  ];
  const ex = pick(examples);
  return {
    content: `${ex.frac} 的结果是什么小数？`,
    answer: ex.result,
    type: '循环小数',
    difficulty: 2,
  };
}

// 小数四则混合
export function genDecMixedOps() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randDec(1, 5, 1);
    const b = randDec(1, 5, 1);
    const c = randDec(0.1, 3, 1);
    return {
      content: `${a} + ${b} × ${c} = ?`,
      answer: String(roundTo(a + b * c, 2)),
      type: '小数混合运算',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const b = randDec(1, 5, 1);
    const c = randInt(2, 5);
    const a = roundTo(b * c + randDec(0.1, 5, 1), 1);
    return {
      content: `${a} - ${b} × ${c} = ?`,
      answer: String(roundTo(a - b * c, 1)),
      type: '小数混合运算',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const c = randInt(2, 5);
    const b = randDec(1, 5, 1);
    const a = roundTo(b * c * randInt(2, 4), 1);
    return {
      content: `${a} ÷ ${b} - ${c} = ?`,
      answer: String(roundTo(a / b - c, 1)),
      type: '小数混合运算',
      difficulty: 2,
    };
  }
  const a = randDec(1, 5, 1);
  const b = randDec(1, 5, 1);
  const c = randInt(2, 4);
  return {
    content: `(${a} + ${b}) × ${c} = ?`,
    answer: String(roundTo((a + b) * c, 1)),
    type: '小数混合运算',
    difficulty: 2,
  };
}

// ============ 第三章：统计 ============

// 读统计表（根据描述计算）
export function genReadTable() {
  const subjects = ['语文', '数学', '英语', '科学'];
  const s1 = pick(subjects);
  const s2 = pick(subjects.filter(s => s !== s1));
  const score1 = randInt(70, 99);
  const score2 = randInt(70, 99);
  return {
    content: `小明${s1}考了${score1}分，${s2}考了${score2}分，两科总分是多少？`,
    answer: String(score1 + score2),
    type: '读统计表',
    difficulty: 1,
  };
}

// 计算平均数
export function genCalcAverage() {
  const r = randInt(1, 3);
  if (r === 1) {
    const n = randInt(3, 6);
    const scores = [];
    for (let i = 0; i < n; i++) scores.push(randInt(60, 100));
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = roundTo(sum / n, 1);
    return {
      content: `${n}次测试成绩分别为：${scores.join('、')}分，平均成绩是多少？`,
      answer: String(avg),
      type: '计算平均数',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const n = randInt(3, 5);
    const avg = randInt(75, 95);
    const total = n * avg;
    return {
      content: `${n}位同学的平均身高是${avg}厘米，他们的身高总和是多少厘米？`,
      answer: String(total),
      type: '由平均数求总数',
      difficulty: 1,
    };
  }
  const n = randInt(4, 8);
  const sum = randInt(300, 800);
  const avg = roundTo(sum / n, 1);
  return {
    content: `${n}个数的总和是${sum}，平均数是多少？`,
    answer: String(avg),
    type: '计算平均数',
    difficulty: 1,
  };
}

// 求总和
export function genFindTotal() {
  const count = randInt(3, 8);
  const avg = randInt(70, 95);
  return {
    content: `${count}个人的平均成绩是${avg}分，总分是多少分？`,
    answer: String(count * avg),
    type: '由平均数求总数',
    difficulty: 1,
  };
}

// 比较数据
export function genCompareData() {
  const avg1 = randInt(75, 95);
  const avg2 = randInt(75, 95);
  if (avg1 === avg2) return genCompareData();
  return {
    content: `甲班平均分${avg1}分，乙班平均分${avg2}分，哪个班平均分高？高几分？`,
    answer: `${avg1 > avg2 ? '甲' : '乙'}班高${Math.abs(avg1 - avg2)}分`,
    type: '比较数据',
    difficulty: 1,
  };
}

// 加权平均
export function genWeightedAverage() {
  const s1 = randInt(80, 100);
  const s2 = randInt(70, 95);
  const w1 = pick([0.4, 0.6]);
  const w2 = roundTo(1 - w1, 1);
  const result = roundTo(s1 * w1 + s2 * w2, 1);
  return {
    content: `平时成绩${s1}分（占${w1}），期末成绩${s2}分（占${w2}），综合成绩是多少？`,
    answer: String(result),
    type: '加权平均',
    difficulty: 2,
  };
}

// 数据分析 - 求某数使平均达到目标
export function genDataAnalysis() {
  const n = randInt(3, 5);
  const targetAvg = randInt(80, 95);
  const scores = [];
  for (let i = 0; i < n; i++) scores.push(randInt(65, 98));
  const currentSum = scores.reduce((a, b) => a + b, 0);
  const needed = (n + 1) * targetAvg - currentSum;
  if (needed < 0 || needed > 100) return genDataAnalysis();
  return {
    content: `前${n}次成绩为${scores.join('、')}分，要使${n + 1}次的平均分达到${targetAvg}分，第${n + 1}次至少要考多少分？`,
    answer: String(needed),
    type: '数据分析',
    difficulty: 3,
  };
}

// ============ 第四章：简易方程（一） ============

// 用字母表示数
export function genLetterNum() {
  const r = randInt(1, 4);
  if (r === 1) {
    const n = randInt(3, 12);
    return {
      content: `小明今年a岁，${n}年后他几岁？（用含a的式子表示）`,
      answer: `a+${n}`,
      type: '字母表示数',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const n = randInt(2, 8);
    return {
      content: `铅笔每支a元，买${n}支需要多少钱？`,
      answer: `${n}a元`,
      type: '字母表示数',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const n = randInt(2, 5);
    return {
      content: `一辆公交车上有a人，到站后上来${n}人，现在有几人？`,
      answer: `a+${n}`,
      type: '字母表示数',
      difficulty: 1,
    };
  }
  return {
    content: `正方形的边长是a厘米，周长是多少厘米？`,
    answer: '4a厘米',
    type: '字母表示数',
    difficulty: 1,
  };
}

// 判断是否是方程
export function genIdentifyEquation() {
  const examples = [
    { expr: '3x + 5 = 20', answer: '是', explain: '含有未知数x的等式' },
    { expr: '2 + 3 = 5', answer: '不是', explain: '是等式但不含未知数' },
    { expr: '4x > 12', answer: '不是', explain: '含未知数但不是等式' },
    { expr: '7y = 35', answer: '是', explain: '含有未知数y的等式' },
    { expr: 'x - 3', answer: '不是', explain: '含未知数但不是等式' },
    { expr: 'a + b = 10', answer: '是', explain: '含有未知数的等式' },
    { expr: '5x - 1 < 14', answer: '不是', explain: '含未知数但不是等式' },
    { expr: '2(x+3) = 16', answer: '是', explain: '含有未知数x的等式' },
  ];
  const ex = pick(examples);
  return { content: `"${ex.expr}"是方程吗？`, answer: ex.answer, type: '判断方程', difficulty: 1 };
}

// 解方程 x + a = b
export function genSolveXPlusA() {
  const a = randInt(5, 50);
  const x = randInt(5, 50);
  const b = x + a;
  return {
    content: `解方程：x + ${a} = ${b}`,
    answer: `x=${x}`,
    type: '解方程 x+a=b',
    difficulty: 1,
  };
}

// 解方程 ax = b
export function genSolveAx() {
  const a = randInt(2, 12);
  const x = randInt(2, 15);
  const b = a * x;
  return { content: `解方程：${a}x = ${b}`, answer: `x=${x}`, type: '解方程 ax=b', difficulty: 1 };
}

// 解方程 ax + b = c
export function genSolveAxBc() {
  const a = randInt(2, 10);
  const x = randInt(2, 15);
  const b = randInt(3, 30);
  const c = a * x + b;
  return {
    content: `解方程：${a}x + ${b} = ${c}`,
    answer: `x=${x}`,
    type: '解方程 ax+b=c',
    difficulty: 2,
  };
}

// 解方程 a(x + b) = c
export function genSolveAxBc2() {
  const a = randInt(2, 8);
  const inner = randInt(3, 15);
  const c = a * inner;
  const x = inner - randInt(1, inner - 1);
  const b = inner - x;
  return {
    content: `解方程：${a}(x + ${b}) = ${c}`,
    answer: `x=${x}`,
    type: '解方程 a(x+b)=c',
    difficulty: 2,
  };
}

// 等式性质判断
export function genEqualityProp() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    return {
      content: `如果 ${a} + x = ${b} + x，那么${a}○${b}（填 >、< 或 =）`,
      answer: '=',
      type: '等式性质',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    return {
      content: `如果 ${a}x = ${b}x，那么${a}○${b}（填 >、< 或 =）`,
      answer: '=',
      type: '等式性质',
      difficulty: 1,
    };
  }
  if (r === 3) {
    return {
      content: `等式两边同时加上同一个数，等式还成立吗？`,
      answer: '成立',
      type: '等式性质',
      difficulty: 1,
    };
  }
  return {
    content: `等式两边同时乘以同一个不为0的数，等式还成立吗？`,
    answer: '成立',
    type: '等式性质',
    difficulty: 1,
  };
}

// ============ 第五章：几何小实践 ============

// 平行四边形面积
export function genParallelogramArea() {
  const base = randInt(3, 15);
  const height = randInt(2, 10);
  return {
    content: `一个平行四边形，底是${base}厘米，高是${height}厘米，面积是多少？`,
    answer: `${base * height}平方厘米`,
    type: '平行四边形面积',
    difficulty: 1,
  };
}

// 三角形面积
export function genTriangleArea() {
  const base = randInt(4, 16);
  const height = randInt(3, 12);
  const area = (base * height) / 2;
  return {
    content: `一个三角形，底是${base}厘米，高是${height}厘米，面积是多少？`,
    answer: `${area}平方厘米`,
    type: '三角形面积',
    difficulty: 1,
  };
}

// 梯形面积
export function genTrapezoidArea() {
  const a = randInt(3, 12);
  const b = randInt(a + 1, 20);
  const h = randInt(2, 10);
  const area = ((a + b) * h) / 2;
  return {
    content: `一个梯形，上底${a}厘米，下底${b}厘米，高${h}厘米，面积是多少？`,
    answer: `${area}平方厘米`,
    type: '梯形面积',
    difficulty: 1,
  };
}

// 等积变形
export function genEqualAreaTransform() {
  const base = randInt(4, 12);
  const height = randInt(3, 10);
  const area = base * height;
  return {
    content: `一个平行四边形底${base}厘米、高${height}厘米，把它剪拼成长方形，长方形面积是多少？`,
    answer: `${area}平方厘米`,
    type: '等积变形',
    difficulty: 2,
  };
}

// 已知面积求底或高
export function genFindBaseOrHeight() {
  const r = randInt(1, 3);
  if (r === 1) {
    const base = randInt(4, 12);
    const height = randInt(3, 10);
    const area = base * height;
    return {
      content: `平行四边形面积是${area}平方厘米，高是${height}厘米，底是多少厘米？`,
      answer: `${base}厘米`,
      type: '求底或高',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const base = randInt(4, 16);
    const height = randInt(4, 12);
    const area = (base * height) / 2;
    return {
      content: `三角形面积是${area}平方厘米，底是${base}厘米，高是多少厘米？`,
      answer: `${height}厘米`,
      type: '求底或高',
      difficulty: 2,
    };
  }
  const a = randInt(3, 10);
  const b = randInt(a + 2, 18);
  const h = randInt(4, 12);
  const area = ((a + b) * h) / 2;
  return {
    content: `梯形面积是${area}平方厘米，上底${a}厘米，下底${b}厘米，高是多少厘米？`,
    answer: `${h}厘米`,
    type: '求底或高',
    difficulty: 2,
  };
}

// 底和高的概念
export function genBaseHeightConcept() {
  const questions = [
    {
      content: '平行四边形的高是从一条边上的一点向（ ）边作的垂线段',
      answer: '对',
      type: '底和高概念',
      difficulty: 1,
    },
    { content: '三角形有（ ）组底和高', answer: '3', type: '底和高概念', difficulty: 1 },
    { content: '平行四边形有（ ）组底和高', answer: '无数', type: '底和高概念', difficulty: 1 },
    { content: '梯形有（ ）条高', answer: '无数', type: '底和高概念', difficulty: 1 },
    { content: '三角形的面积公式是什么？', answer: '底×高÷2', type: '面积公式', difficulty: 1 },
    {
      content: '梯形的面积公式是什么？',
      answer: '(上底+下底)×高÷2',
      type: '面积公式',
      difficulty: 1,
    },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 组合图形面积（几何章节）
export function genGeoCompositeArea() {
  const r = randInt(1, 3);
  if (r === 1) {
    // 平行四边形 + 三角形
    const base = randInt(6, 12);
    const h1 = randInt(3, 8);
    const h2 = randInt(2, 6);
    const triBase = base;
    return {
      content: `组合图形：下半部分是底${base}cm高${h1}cm的平行四边形，上半部分是底${triBase}cm高${h2}cm的三角形，总面积是多少？`,
      answer: `${base * h1 + (triBase * h2) / 2}平方厘米`,
      type: '组合图形面积',
      difficulty: 3,
    };
  }
  if (r === 2) {
    // 长方形 - 三角形
    const l = randInt(8, 15);
    const w = randInt(5, 10);
    const triBase = randInt(3, l - 2);
    const triH = randInt(2, w - 1);
    return {
      content: `一个长${l}cm宽${w}cm的长方形，剪去一个底${triBase}cm高${triH}cm的三角形，剩余面积是多少？`,
      answer: `${l * w - (triBase * triH) / 2}平方厘米`,
      type: '组合图形面积',
      difficulty: 3,
    };
  }
  // 梯形 + 三角形
  const a = randInt(4, 8);
  const b = randInt(a + 2, 14);
  const h1 = randInt(3, 8);
  const triBase = b;
  const triH = randInt(2, 6);
  return {
    content: `下半部分是上底${a}cm下底${b}cm高${h1}cm的梯形，上半部分是底${triBase}cm高${triH}cm的三角形，总面积是多少？`,
    answer: `${((a + b) * h1) / 2 + (triBase * triH) / 2}平方厘米`,
    type: '组合图形面积',
    difficulty: 3,
  };
}

// ============ 第六章：整理与提高 ============

// 平移
export function genTranslation() {
  const questions = [
    () => {
      const dx = randInt(2, 8);
      const dir = pick(['右', '左']);
      return {
        content: `一个三角形向${dir}平移${dx}格，图形的形状和大小会改变吗？`,
        answer: '不会改变',
        type: '平移',
        difficulty: 1,
      };
    },
    () => {
      const dx = randInt(3, 10);
      return {
        content: `点A(2,3)向右平移${dx}格后，新坐标是什么？`,
        answer: `(${2 + dx},3)`,
        type: '平移坐标',
        difficulty: 2,
      };
    },
    () => {
      const dy = randInt(3, 8);
      return {
        content: `点B(5,4)向下平移${dy}格后，新坐标是什么？`,
        answer: `(5,${4 - dy})`,
        type: '平移坐标',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(questions)(), difficulty: 1 };
}

// 旋转
export function genRotation() {
  const questions = [
    () => {
      const angle = pick([90, 180, 270, 360]);
      return {
        content: `一个图形绕某点旋转${angle}°后，图形的形状和大小会改变吗？`,
        answer: '不会改变',
        type: '旋转',
        difficulty: 1,
      };
    },
    () => {
      return {
        content: '钟表的时针从12时走到3时，旋转了多少度？',
        answer: '90度',
        type: '旋转角度',
        difficulty: 1,
      };
    },
    () => {
      return {
        content: '钟表的分针转一圈（360°），走了多少分钟？',
        answer: '60分钟',
        type: '旋转应用',
        difficulty: 1,
      };
    },
    () => {
      const deg = pick([90, 180, 270]);
      return {
        content: `旋转${deg}°后，与原图形相比，什么不变？什么可能改变？`,
        answer: '形状大小不变，位置改变',
        type: '旋转性质',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(questions)(), difficulty: 1 };
}

// 编码
export function genEncoding() {
  const r = randInt(1, 4);
  if (r === 1) {
    return {
      content: `某学校学生编号规则：入学年份(4位)+班级(2位)+学号(2位)。2024年入学3班15号学生的编号是什么？`,
      answer: '20240315',
      type: '数字编码',
      difficulty: 2,
    };
  }
  if (r === 2) {
    return {
      content: `邮政编码由几位数字组成？`,
      answer: '6位',
      type: '数字编码',
      difficulty: 1,
    };
  }
  if (r === 3) {
    return {
      content: `身份证号码有几位数字？`,
      answer: '18位',
      type: '数字编码',
      difficulty: 1,
    };
  }
  return {
    content: `用数字1、0编码，3位二进制可以表示几种状态？`,
    answer: '8种',
    type: '编码',
    difficulty: 2,
  };
}

// 综合计算
export function genComprehensiveCalc() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randInt(10, 50);
    const b = randInt(2, 9);
    const c = randInt(5, 30);
    return {
      content: `${a} × ${b} + ${c} ÷ ${c} = ?`,
      answer: String(a * b + 1),
      type: '综合计算',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randDec(1, 10, 1);
    const b = randInt(2, 5);
    const c = randDec(1, 10, 1);
    return {
      content: `${a} × ${b} - ${c} = ?`,
      answer: String(roundTo(a * b - c, 1)),
      type: '综合计算',
      difficulty: 2,
    };
  }
  const a = randDec(1, 10, 1);
  const b = randDec(0.1, 5, 1);
  const c = randDec(1, 10, 1);
  return {
    content: `(${a} + ${b}) × ${c} = ?`,
    answer: String(roundTo((a + b) * c, 2)),
    type: '综合计算',
    difficulty: 2,
  };
}

// 图形运动综合
export function genShapeMovement() {
  const questions = [
    () => {
      return {
        content: '平移和旋转都不改变图形的什么？',
        answer: '形状和大小',
        type: '图形运动',
        difficulty: 1,
      };
    },
    () => {
      return { content: '平移改变图形的什么？', answer: '位置', type: '图形运动', difficulty: 1 };
    },
    () => {
      const n = pick([3, 4, 5, 6]);
      return {
        content: `正${n}边形绕中心旋转${360 / n}°后，能与原来的图形重合吗？`,
        answer: '能',
        type: '图形运动',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(questions)(), difficulty: 1 };
}

// ============ 第七章：分数的加减法 ============

// 同分母分数加法
export function genSameDenAdd() {
  const den = pick([3, 4, 5, 6, 7, 8, 9, 10, 12]);
  const a = randInt(1, den - 1);
  const b = randInt(1, den - a);
  const [sn, sd] = simplifyFrac(a + b, den);
  return {
    content: `${a}/${den} + ${b}/${den} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '同分母加法',
    difficulty: 1,
  };
}

// 同分母分数减法
export function genSameDenSub() {
  const den = pick([3, 4, 5, 6, 7, 8, 9, 10, 12]);
  const a = randInt(2, den - 1);
  const b = randInt(1, a - 1);
  const [sn, sd] = simplifyFrac(a - b, den);
  return {
    content: `${a}/${den} - ${b}/${den} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '同分母减法',
    difficulty: 1,
  };
}

// 异分母分数加法
export function genDiffDenAdd() {
  const d1 = pick([2, 3, 4, 5, 6]);
  const d2 = pick([3, 4, 5, 6, 7, 8, 10, 12].filter(d => d !== d1));
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const commonDen = lcm(d1, d2);
  const resultNum = n1 * (commonDen / d1) + n2 * (commonDen / d2);
  const [sn, sd] = simplifyFrac(resultNum, commonDen);
  return {
    content: `${n1}/${d1} + ${n2}/${d2} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '异分母加法',
    difficulty: 2,
  };
}

// 异分母分数减法
export function genDiffDenSub() {
  const d1 = pick([3, 4, 5, 6, 8, 10]);
  const d2 = pick([2, 3, 4, 5, 6, 8, 10, 12].filter(d => d !== d1));
  const commonDen = lcm(d1, d2);
  const n1Times = randInt(1, d1 - 1);
  const n2Times = randInt(1, Math.min(d2 - 1, n1Times * (commonDen / d1) - 1));
  if (n2Times >= n1Times * (commonDen / d1)) return genDiffDenSub();
  const resultNum = n1Times * (commonDen / d1) - n2Times;
  const [sn, sd] = simplifyFrac(resultNum, commonDen);
  return {
    content: `${n1Times}/${d1} - ${n2Times}/${d2} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '异分母减法',
    difficulty: 2,
  };
}

// 分数与小数互化
export function genFracDecConvert2() {
  const r = randInt(1, 2);
  if (r === 1) {
    const den = pick([2, 4, 5, 8, 10, 20, 25]);
    const num = randInt(1, den - 1);
    const dec = roundTo(num / den, 4);
    const [sn, sd] = simplifyFrac(num, den);
    return {
      content: `将 ${sn}/${sd} 化成小数`,
      answer: String(dec),
      type: '分数转小数',
      difficulty: 1,
    };
  }
  const pairs = [
    [0.5, '1/2'],
    [0.25, '1/4'],
    [0.75, '3/4'],
    [0.2, '1/5'],
    [0.4, '2/5'],
    [0.6, '3/5'],
    [0.8, '4/5'],
    [0.125, '1/8'],
    [0.375, '3/8'],
    [0.05, '1/20'],
  ];
  const [dec, frac] = pick(pairs);
  return {
    content: `将 ${dec} 化成分数`,
    answer: frac,
    type: '小数转分数',
    difficulty: 1,
  };
}

// 分数比较大小
export function genFracCompare() {
  const d = pick([5, 6, 7, 8, 9, 10, 12]);
  const a = randInt(1, d - 1);
  let b = randInt(1, d - 1);
  if (a === b) b = (b % (d - 1)) + 1;
  return {
    content: `${a}/${d} ○ ${b}/${d}（填 >、< 或 =）`,
    answer: a > b ? '>' : a < b ? '<' : '=',
    type: '分数比较',
    difficulty: 1,
  };
}

// 分数加减混合
export function genFracMixedOps() {
  const den = pick([4, 5, 6, 8, 10]);
  const a = randInt(1, den - 1);
  const b = randInt(1, den - 1);
  const c = randInt(1, Math.min(den - 1, a + b - 1));
  const resultNum = a + b - c;
  if (resultNum <= 0) return genFracMixedOps();
  const [sn, sd] = simplifyFrac(resultNum, den);
  return {
    content: `${a}/${den} + ${b}/${den} - ${c}/${den} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '分数加减混合',
    difficulty: 2,
  };
}

// ============ 第八章：分数乘除法 ============

// 分数乘整数
export function genFracMulInt() {
  const den = pick([2, 3, 4, 5, 6, 8, 10]);
  const num = randInt(1, den - 1);
  const n = randInt(2, 6);
  const resultNum = num * n;
  const [sn, sd] = simplifyFrac(resultNum, den);
  return {
    content: `${num}/${den} × ${n} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '分数乘整数',
    difficulty: 1,
  };
}

// 分数乘分数
export function genFracMulFrac() {
  const d1 = pick([2, 3, 4, 5, 6, 8]);
  const d2 = pick([2, 3, 4, 5, 6, 8]);
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const resultNum = n1 * n2;
  const resultDen = d1 * d2;
  const [sn, sd] = simplifyFrac(resultNum, resultDen);
  return {
    content: `${n1}/${d1} × ${n2}/${d2} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '分数乘分数',
    difficulty: 2,
  };
}

// 分数除以整数
export function genFracDivInt() {
  const den = pick([2, 3, 4, 5, 6, 8, 10]);
  const num = randInt(1, den - 1);
  const n = pick([2, 3, 4, 5]);
  const resultNum = num;
  const resultDen = den * n;
  const [sn, sd] = simplifyFrac(resultNum, resultDen);
  return {
    content: `${num}/${den} ÷ ${n} = ?`,
    answer: `${sn}/${sd}`,
    type: '分数除以整数',
    difficulty: 1,
  };
}

// 分数除以分数
export function genFracDivFrac() {
  const d1 = pick([2, 3, 4, 5, 6, 8]);
  const d2 = pick([2, 3, 4, 5]);
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const resultNum = n1 * d2;
  const resultDen = d1 * n2;
  const [sn, sd] = simplifyFrac(resultNum, resultDen);
  return {
    content: `${n1}/${d1} ÷ ${n2}/${d2} = ?`,
    answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
    type: '分数除以分数',
    difficulty: 2,
  };
}

// 求倒数
export function genReciprocal() {
  const r = randInt(1, 3);
  if (r === 1) {
    const n = randInt(2, 12);
    return { content: `${n}的倒数是多少？`, answer: `1/${n}`, type: '求倒数', difficulty: 1 };
  }
  if (r === 2) {
    const d = pick([2, 3, 4, 5, 6, 7, 8]);
    const n = randInt(1, d - 1);
    const [sn, sd] = simplifyFrac(n, d);
    return {
      content: `${sn}/${sd}的倒数是多少？`,
      answer: `${sd}/${sn}`,
      type: '求倒数',
      difficulty: 1,
    };
  }
  return { content: '1的倒数是多少？', answer: '1', type: '求倒数', difficulty: 1 };
}

// 分数四则混合
export function genFracAllOps() {
  const r = randInt(1, 3);
  if (r === 1) {
    const d1 = pick([3, 4, 5, 6]);
    const d2 = pick([3, 4, 5, 6]);
    const n1 = randInt(1, d1 - 1);
    const n2 = randInt(1, d2 - 1);
    const n3 = randInt(1, d2 - 1);
    return {
      content: `${n1}/${d1} + ${n2}/${d2} × ${d2}/${n3} = ?`,
      answer: `${n1}/${d1} + ${n2}/${n3}`,
      type: '分数混合运算',
      difficulty: 3,
    };
  }
  if (r === 2) {
    const d = pick([4, 5, 6, 8]);
    const n1 = randInt(1, d - 1);
    const n2 = randInt(1, d - 1);
    const n3 = randInt(2, 4);
    const sum = n1 + n2;
    const [sn, sd] = simplifyFrac(sum, d);
    return {
      content: `(${n1}/${d} + ${n2}/${d}) × ${n3} = ?`,
      answer: sd === 1 ? String(sn * n3) : `${sn * n3}/${sd}`,
      type: '分数混合运算',
      difficulty: 2,
    };
  }
  const d = pick([3, 4, 5, 6]);
  const n1 = randInt(2, d - 1);
  const n2 = randInt(1, n1 - 1);
  const n3 = pick([2, 3]);
  const diff = n1 - n2;
  const [sn, sd] = simplifyFrac(diff, d * n3);
  return {
    content: `(${n1}/${d} - ${n2}/${d}) ÷ ${n3} = ?`,
    answer: `${sn}/${sd}`,
    type: '分数混合运算',
    difficulty: 2,
  };
}

// ============ 第九章：长方体和正方体 ============

// 长方体的棱长和
export function genRectPrismEdge() {
  const l = randInt(3, 10);
  const w = randInt(2, 8);
  const h = randInt(2, 8);
  return {
    content: `一个长方体，长${l}厘米，宽${w}厘米，高${h}厘米，棱长总和是多少厘米？`,
    answer: `${4 * (l + w + h)}厘米`,
    type: '长方体棱长',
    difficulty: 1,
  };
}

// 正方体的棱长和
export function genCubeEdge() {
  const a = randInt(2, 10);
  return {
    content: `一个正方体棱长${a}厘米，棱长总和是多少厘米？`,
    answer: `${12 * a}厘米`,
    type: '正方体棱长',
    difficulty: 1,
  };
}

// 长方体表面积
export function genRectPrismSA() {
  const l = randInt(3, 10);
  const w = randInt(2, 8);
  const h = randInt(2, 8);
  const sa = 2 * (l * w + l * h + w * h);
  return {
    content: `长方体长${l}cm、宽${w}cm、高${h}cm，表面积是多少？`,
    answer: `${sa}平方厘米`,
    type: '长方体表面积',
    difficulty: 2,
  };
}

// 正方体表面积
export function genCubeSA() {
  const a = randInt(2, 10);
  return {
    content: `正方体棱长${a}cm，表面积是多少？`,
    answer: `${6 * a * a}平方厘米`,
    type: '正方体表面积',
    difficulty: 1,
  };
}

// 长方体体积
export function genRectPrismVol() {
  const l = randInt(3, 12);
  const w = randInt(2, 8);
  const h = randInt(2, 8);
  return {
    content: `长方体长${l}cm、宽${w}cm、高${h}cm，体积是多少？`,
    answer: `${l * w * h}立方厘米`,
    type: '长方体体积',
    difficulty: 1,
  };
}

// 正方体体积
export function genCubeVol() {
  const a = randInt(2, 10);
  return {
    content: `正方体棱长${a}cm，体积是多少？`,
    answer: `${a * a * a}立方厘米`,
    type: '正方体体积',
    difficulty: 1,
  };
}

// 体积单位换算
export function genVolUnitConvert() {
  const r = randInt(1, 6);
  if (r === 1)
    return {
      content: '1立方分米 = （ ）立方厘米',
      answer: '1000',
      type: '体积换算',
      difficulty: 1,
    };
  if (r === 2)
    return { content: '1立方米 = （ ）立方分米', answer: '1000', type: '体积换算', difficulty: 1 };
  if (r === 3) {
    const n = randInt(2, 8);
    return {
      content: `${n}立方米 = （ ）立方分米`,
      answer: String(n * 1000),
      type: '体积换算',
      difficulty: 1,
    };
  }
  if (r === 4) {
    const n = randInt(2, 8);
    return {
      content: `${n}立方分米 = （ ）立方厘米`,
      answer: String(n * 1000),
      type: '体积换算',
      difficulty: 1,
    };
  }
  if (r === 5) {
    const n = randInt(2, 8) * 1000;
    return {
      content: `${n}立方厘米 = （ ）立方分米`,
      answer: String(n / 1000),
      type: '体积换算',
      difficulty: 1,
    };
  }
  return { content: '1升 = （ ）立方分米', answer: '1', type: '体积换算', difficulty: 1 };
}

// 已知体积求边长
export function genFindSideFromVol() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 8);
    const vol = a * a * a;
    return {
      content: `正方体体积是${vol}立方厘米，棱长是多少厘米？`,
      answer: `${a}厘米`,
      type: '求棱长',
      difficulty: 2,
    };
  }
  const l = randInt(3, 10);
  const w = randInt(2, 8);
  const h = randInt(2, 8);
  const vol = l * w * h;
  return {
    content: `长方体体积是${vol}立方厘米，长${l}cm、宽${w}cm，高是多少cm？`,
    answer: `${h}厘米`,
    type: '求高',
    difficulty: 2,
  };
}

// ============ 第十章：可能性 ============

// 判断可能性大小
export function genPossibilityJudge() {
  const questions = [
    () => {
      const total = pick([2, 4, 5, 10]);
      const red = randInt(1, total - 1);
      return {
        content: `盒子里有${total}个球，其中${red}个红球，任意摸一个，摸到红球的可能性是多少？`,
        answer: `${red}/${total}`,
        type: '可能性大小',
        difficulty: 1,
      };
    },
    () => {
      return {
        content: '掷一枚硬币，正面朝上的可能性是多少？',
        answer: '1/2',
        type: '可能性大小',
        difficulty: 1,
      };
    },
    () => {
      const n = pick([6, 10, 12]);
      return {
        content: `袋子里有${n}个球（红蓝各一半），摸到红球的可能性是几分之几？`,
        answer: `1/2`,
        type: '可能性大小',
        difficulty: 1,
      };
    },
  ];
  return { ...pick(questions)(), difficulty: 1 };
}

// 用分数表示可能性
export function genPossibilityFrac() {
  const total = randInt(4, 12);
  const favorable = randInt(1, total - 1);
  const [sn, sd] = simplifyFrac(favorable, total);
  return {
    content: `一个转盘分成${total}等份，其中${favorable}份是红色区域，指针停在红色区域的可能性是几分之几？`,
    answer: `${sn}/${sd}`,
    type: '分数表示可能性',
    difficulty: 1,
  };
}

// 比较可能性
export function genComparePossibility() {
  const d1 = pick([4, 5, 6, 8, 10]);
  const d2 = pick([4, 5, 6, 8, 10]);
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const val1 = n1 / d1;
  const val2 = n2 / d2;
  return {
    content: `甲事件可能性为${n1}/${d1}，乙事件可能性为${n2}/${d2}，哪个可能性更大？`,
    answer: val1 > val2 ? '甲' : val1 < val2 ? '乙' : '一样大',
    type: '比较可能性',
    difficulty: 2,
  };
}

// 等可能事件
export function genEqualPossibility() {
  const n = pick([6, 10, 12, 20]);
  const [sn, sd] = simplifyFrac(1, n);
  return {
    content: `从${n}张完全相同的卡片中随机抽一张，抽到任何一张的可能性是几分之几？`,
    answer: `${sn}/${sd}`,
    type: '等可能事件',
    difficulty: 1,
  };
}

// 可能性加法
export function genPossibilityAdd() {
  const total = pick([6, 8, 10, 12]);
  const r = randInt(1, total - 2);
  const b = randInt(1, total - r - 1);
  const sum = r + b;
  const [sn, sd] = simplifyFrac(sum, total);
  return {
    content: `盒子里有${total}个球，${r}个红球和${b}个蓝球，摸到红球或蓝球的可能性是几分之几？`,
    answer: `${sn}/${sd}`,
    type: '可能性加法',
    difficulty: 2,
  };
}

// 不可能与必然
export function genImpossibleCertain() {
  const r = randInt(1, 3);
  if (r === 1)
    return {
      content: '太阳从西方升起的可能性是多少？',
      answer: '0（不可能）',
      type: '不可能事件',
      difficulty: 1,
    };
  if (r === 2)
    return {
      content: '抛一枚骰子，点数小于7的可能性是多少？',
      answer: '1（必然事件）',
      type: '必然事件',
      difficulty: 1,
    };
  return {
    content: '明天会下雨的可能性，用0到1之间的数表示，0表示什么？1表示什么？',
    answer: '0表示不可能，1表示必然发生',
    type: '可能性范围',
    difficulty: 1,
  };
}

// ============ 第十一章：方程与代数 ============

// 列方程
export function genFormEquation() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(5, 30);
    const b = randInt(10, 50);
    return {
      content: `一个数加上${a}等于${b}，设这个数为x，列出方程`,
      answer: `x+${a}=${b}`,
      type: '列方程',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randInt(3, 9);
    const b = randInt(20, 90);
    return {
      content: `${a}乘一个数等于${b}，设这个数为x，列出方程`,
      answer: `${a}x=${b}`,
      type: '列方程',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const a = randInt(2, 8);
    const b = randInt(5, 20);
    const c = randInt(30, 80);
    return {
      content: `一个数的${a}倍减去${b}等于${c}，设这个数为x，列出方程`,
      answer: `${a}x-${b}=${c}`,
      type: '列方程',
      difficulty: 2,
    };
  }
  const a = randInt(3, 10);
  const b = randInt(20, 60);
  return {
    content: `一个数的${a}倍等于${b}，设这个数为x，列出方程`,
    answer: `${a}x=${b}`,
    type: '列方程',
    difficulty: 1,
  };
}

// 解复杂方程
export function genSolveComplexEq() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(2, 8);
    const x = randInt(3, 12);
    const b = randInt(5, 30);
    const c = a * x + b;
    return {
      content: `解方程：${a}x + ${b} = ${c}`,
      answer: `x=${x}`,
      type: '解方程',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(2, 6);
    const x = randInt(3, 12);
    const b = randInt(5, 20);
    const c = a * x - b;
    return {
      content: `解方程：${a}x - ${b} = ${c}`,
      answer: `x=${x}`,
      type: '解方程',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const a = randInt(2, 5);
    const b = randInt(2, 8);
    const x = randInt(3, 10);
    const inner = x + b;
    const c = a * inner;
    return {
      content: `解方程：${a}(x + ${b}) = ${c}`,
      answer: `x=${x}`,
      type: '解方程',
      difficulty: 3,
    };
  }
  const a = randInt(2, 6);
  const b = randInt(3, 10);
  const x = randInt(3, 10);
  const c = a * (x - b);
  return {
    content: `解方程：${a}(x - ${b}) = ${c}`,
    answer: `x=${x}`,
    type: '解方程',
    difficulty: 3,
  };
}

// 方程验算
export function genCheckEquation() {
  const a = randInt(2, 8);
  const x = randInt(3, 12);
  const b = randInt(5, 20);
  const c = a * x + b;
  return {
    content: `x=${x}是方程 ${a}x+${b}=${c} 的解吗？请验算`,
    answer: `是。验算：${a}×${x}+${b}=${a * x}+${b}=${c}，等式成立`,
    type: '方程验算',
    difficulty: 2,
  };
}

// 含两个未知数的等式
export function genTwoUnknowns() {
  const a = randInt(2, 8);
  const sum = randInt(20, 60);
  return {
    content: `如果 a + b = ${sum}，a = ${a * 3}，那么 b = ?`,
    answer: String(sum - a * 3),
    type: '双未知数',
    difficulty: 2,
  };
}

// 方程建模
export function genEqModeling() {
  const r = randInt(1, 3);
  if (r === 1) {
    const x = randInt(5, 20);
    const a = randInt(2, 6);
    const total = x * a;
    return {
      content: `买了${a}本同样的笔记本，共花${total}元，每本多少元？（列方程解）`,
      answer: `每本${x}元。方程：${a}x=${total}，解得x=${x}`,
      type: '方程建模',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(10, 50);
    const b = randInt(5, 30);
    return {
      content: `小明有${a + b}元，花了${b}元后还剩多少？（列方程解）`,
      answer: `还剩${a}元。方程：x+${b}=${a + b}，解得x=${a}`,
      type: '方程建模',
      difficulty: 2,
    };
  }
  const x = randInt(5, 20);
  const a = randInt(3, 8);
  const b = randInt(5, 15);
  const c = a * x + b;
  return {
    content: `买了${a}支同样的笔和一块${b}元的橡皮，共花${c}元，每支笔多少元？`,
    answer: `每支笔${x}元。方程：${a}x+${b}=${c}，解得x=${x}`,
    type: '方程建模',
    difficulty: 2,
  };
}

// ============ 第十二章：总复习 ============

// 混合运算
export function genReviewMixed() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randDec(1, 10, 1);
    const b = randDec(1, 10, 1);
    return {
      content: `${a} × ${b} = ?`,
      answer: String(roundTo(a * b, 2)),
      type: '综合复习',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randDec(5, 20, 1);
    const b = randDec(1, 5, 1);
    return {
      content: `${a} ÷ ${b} = ?`,
      answer: String(roundTo(a / b, 1)),
      type: '综合复习',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const d = pick([4, 5, 6, 8, 10]);
    const n1 = randInt(1, d - 1);
    const n2 = randInt(1, d - 1);
    const sum = n1 + n2;
    const [sn, sd] = simplifyFrac(sum, d);
    return {
      content: `${n1}/${d} + ${n2}/${d} = ?`,
      answer: sd === 1 ? String(sn) : `${sn}/${sd}`,
      type: '综合复习',
      difficulty: 1,
    };
  }
  const d1 = pick([3, 4, 5, 6]);
  const d2 = pick([3, 4, 5, 6, 8].filter(d => d !== d1));
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const cd = lcm(d1, d2);
  const rn = n1 * (cd / d1) * n2;
  const [sn, sd] = simplifyFrac(rn, d1 * d2);
  return {
    content: `${n1}/${d1} × ${n2}/${d2} = ?`,
    answer: `${sn}/${sd}`,
    type: '综合复习',
    difficulty: 2,
  };
}

// 几何综合
export function genReviewGeo() {
  const r = randInt(1, 4);
  if (r === 1) {
    const base = randInt(4, 12);
    const h = randInt(3, 8);
    return {
      content: `平行四边形底${base}cm、高${h}cm，面积是多少？`,
      answer: `${base * h}平方厘米`,
      type: '几何综合',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randInt(2, 8);
    const vol = a * a * a;
    return {
      content: `正方体棱长${a}cm，体积是多少？`,
      answer: `${vol}立方厘米`,
      type: '几何综合',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const l = randInt(5, 12);
    const w = randInt(3, 8);
    const h = randInt(3, 8);
    const sa = 2 * (l * w + l * h + w * h);
    return {
      content: `长方体长${l}cm、宽${w}cm、高${h}cm，表面积是多少？`,
      answer: `${sa}平方厘米`,
      type: '几何综合',
      difficulty: 2,
    };
  }
  const a = randInt(3, 10);
  const b = randInt(a + 2, 16);
  const h = randInt(3, 10);
  return {
    content: `梯形上底${a}cm、下底${b}cm、高${h}cm，面积是多少？`,
    answer: `${((a + b) * h) / 2}平方厘米`,
    type: '几何综合',
    difficulty: 1,
  };
}

// 方程综合
export function genReviewEq() {
  const r = randInt(1, 3);
  if (r === 1) {
    const x = randInt(5, 20);
    const a = randInt(5, 30);
    return {
      content: `解方程：x + ${a} = ${x + a}`,
      answer: `x=${x}`,
      type: '方程综合',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randInt(3, 10);
    const x = randInt(3, 15);
    return {
      content: `解方程：${a}x = ${a * x}`,
      answer: `x=${x}`,
      type: '方程综合',
      difficulty: 1,
    };
  }
  const a = randInt(2, 8);
  const x = randInt(3, 12);
  const b = randInt(5, 20);
  return {
    content: `解方程：${a}x - ${b} = ${a * x - b}`,
    answer: `x=${x}`,
    type: '方程综合',
    difficulty: 2,
  };
}

// 统计综合
export function genReviewStats() {
  const n = randInt(4, 8);
  const avg = randInt(75, 95);
  const total = n * avg;
  return {
    content: `${n}位同学的平均体重是${avg}千克，总体重是多少千克？`,
    answer: `${total}千克`,
    type: '统计综合',
    difficulty: 1,
  };
}

// 分数小数综合
export function genReviewFracDec() {
  const r = randInt(1, 3);
  if (r === 1) {
    const d = pick([2, 4, 5, 8, 10]);
    const n = randInt(1, d - 1);
    const [sn, sd] = simplifyFrac(n, d);
    return {
      content: `${sn}/${sd}化成小数是多少？`,
      answer: String(roundTo(sn / sd, 3)),
      type: '分数小数综合',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const dec = pick([0.5, 0.25, 0.75, 0.2, 0.4, 0.6, 0.8, 0.125]);
    const pairs = {
      0.5: '1/2',
      0.25: '1/4',
      0.75: '3/4',
      0.2: '1/5',
      0.4: '2/5',
      0.6: '3/5',
      0.8: '4/5',
      0.125: '1/8',
    };
    return {
      content: `${dec}化成分数是多少？`,
      answer: pairs[dec],
      type: '分数小数综合',
      difficulty: 1,
    };
  }
  const a = randDec(1, 5, 1);
  const d = pick([4, 5, 8, 10]);
  const n = randInt(1, d - 1);
  const decResult = roundTo(a + n / d, 2);
  return {
    content: `${a} + ${n}/${d} = ?（用小数表示）`,
    answer: String(decResult),
    type: '分数小数综合',
    difficulty: 2,
  };
}
