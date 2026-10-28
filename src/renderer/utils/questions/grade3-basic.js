// 三年级基础计算题 - 沪教版2024新教材

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============ 第一章：两步四则运算 ============

// 同级运算（从左往右）
export function genSameLevel() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(10, 50);
    const b = randInt(10, 40);
    const c = randInt(5, 30);
    return {
      content: `${a} + ${b} + ${c} = ?`,
      answer: String(a + b + c),
      type: '连加',
      difficulty: 1,
    };
  }
  const a = randInt(50, 99);
  const b = randInt(10, 40);
  const c = randInt(5, 30);
  return {
    content: `${a} - ${b} - ${c} = ?`,
    answer: String(a - b - c),
    type: '连减',
    difficulty: 1,
  };
}

// 加减混合（从左往右）
export function genAddSubMixed() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(20, 60);
    const b = randInt(10, 40);
    const c = randInt(5, 30);
    return {
      content: `${a} + ${b} - ${c} = ?`,
      answer: String(a + b - c),
      type: '加减混合',
      difficulty: 1,
    };
  }
  const a = randInt(50, 99);
  const b = randInt(10, 40);
  const c = randInt(10, 30);
  return {
    content: `${a} - ${b} + ${c} = ?`,
    answer: String(a - b + c),
    type: '加减混合',
    difficulty: 1,
  };
}

// 不同级运算（先乘除后加减）
export function genMixedPriority() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 9);
    const c = randInt(5, 30);
    return {
      content: `${a} × ${b} + ${c} = ?`,
      answer: String(a * b + c),
      type: '乘加',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(2, 8);
    const b = randInt(2, 9);
    const c = randInt(5, 30);
    return {
      content: `${a} × ${b} - ${c} = ?`,
      answer: String(a * b - c),
      type: '乘减',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const b = randInt(2, 9);
    const ans = randInt(2, 10);
    const a = b * ans;
    const c = randInt(5, 20);
    return {
      content: `${a} ÷ ${b} + ${c} = ?`,
      answer: String(ans + c),
      type: '除加',
      difficulty: 2,
    };
  }
  const b = randInt(2, 9);
  const ans = randInt(2, 10);
  const a = b * ans;
  const c = randInt(1, ans);
  return {
    content: `${a} ÷ ${b} - ${c} = ?`,
    answer: String(ans - c),
    type: '除减',
    difficulty: 2,
  };
}

// 含括号的运算
export function genParentheses() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(5, 30);
    const b = randInt(2, 8);
    const c = randInt(2, 6);
    return {
      content: `(${a} + ${b}) × ${c} = ?`,
      answer: String((a + b) * c),
      type: '括号乘法',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(20, 60);
    const b = randInt(5, 20);
    const c = randInt(2, 5);
    return {
      content: `(${a} - ${b}) ÷ ${c} = ?`,
      answer: String(Math.floor((a - b) / c)),
      type: '括号除法',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const a = randInt(2, 8);
    const b = randInt(2, 6);
    const c = randInt(5, 20);
    const d = randInt(2, 5);
    return {
      content: `${a} × ${b} + ${c} × ${d} = ?`,
      answer: String(a * b + c * d),
      type: '乘加混合',
      difficulty: 2,
    };
  }
  const a = randInt(10, 50);
  const b = randInt(2, 8);
  const c = randInt(2, 6);
  return {
    content: `(${a} + ${b}) ÷ ${c} = ?`,
    answer: String(Math.floor((a + b) / c)),
    type: '括号除法',
    difficulty: 2,
  };
}

// 填运算符
export function genFillOperator() {
  const a = randInt(2, 8);
  const b = randInt(2, 6);
  const ops = [
    { op: '+', fn: (x, y) => x + y },
    { op: '-', fn: (x, y) => x - y },
    { op: '×', fn: (x, y) => x * y },
  ];
  const chosen = pick(ops);
  const result = chosen.fn(a, b);
  return {
    content: `${a} ○ ${b} = ${result}, ○ 里填（ ）`,
    answer: chosen.op,
    type: '填运算符',
    difficulty: 1,
  };
}

// 两步方框填数
export function genTwoStepBox() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 6);
    const c = randInt(5, 30);
    return {
      content: `□ × ${b} + ${c} = ${a * b + c}, □ = ?`,
      answer: String(a),
      type: '方框填数',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(2, 8);
    const b = randInt(2, 6);
    const c = randInt(5, 20);
    return {
      content: `${a} × ${b} - □ = ${a * b - c}, □ = ?`,
      answer: String(c),
      type: '方框填数',
      difficulty: 2,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(2, 6);
  const ans = randInt(2, 8);
  return {
    content: `(□ + ${b}) × ${a} = ${(ans + b) * a}, □ = ?`,
    answer: String(ans),
    type: '方框填数',
    difficulty: 2,
  };
}

// 比大小（含乘除）
export function genCompareMixed() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 6);
    const c = randInt(5, 20);
    const d = randInt(10, 50);
    const left = a * b + c;
    const right = d;
    return {
      content: `${a}×${b}+${c} ○ ${d}（填 >、< 或 =）`,
      answer: left > right ? '>' : left < right ? '<' : '=',
      type: '比大小',
      difficulty: 2,
    };
  }
  const a = randInt(3, 7);
  const b = randInt(2, 5);
  const c = randInt(3, 7);
  const d = randInt(2, 5);
  const left = a * b;
  const right = c * d;
  return {
    content: `${a}×${b} ○ ${c}×${d}（填 >、< 或 =）`,
    answer: left > right ? '>' : left < right ? '<' : '=',
    type: '比大小',
    difficulty: 1,
  };
}

// 判断对错
export function genJudgeArithmetic() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 7);
    const b = randInt(2, 6);
    const c = randInt(3, 10);
    const wrong = randInt(-3, 3);
    const correct = a * b + c;
    const shown = wrong === 0 ? correct + 1 : correct + wrong;
    return {
      content: `${a} × ${b} + ${c} = ${shown}，对吗？（对/错）`,
      answer: shown === correct ? '对' : '错',
      type: '判断对错',
      difficulty: 1,
    };
  }
  const a = randInt(30, 80);
  const b = randInt(10, 30);
  const c = randInt(5, 20);
  const correct = a - b + c;
  const shown = correct + pick([-2, -1, 1, 2]);
  return {
    content: `${a} - ${b} + ${c} = ${shown}，对吗？（对/错）`,
    answer: shown === correct ? '对' : '错',
    type: '判断对错',
    difficulty: 1,
  };
}

// ============ 第二章：一位数乘整十整百数 ============

// 一位数乘整十数
export function genMulTens() {
  const a = randInt(1, 9);
  const b = randInt(1, 9) * 10;
  return { content: `${a} × ${b} = ?`, answer: String(a * b), type: '乘整十数', difficulty: 1 };
}

// 一位数乘整百数
export function genMulHundreds() {
  const a = randInt(1, 9);
  const b = randInt(1, 9) * 100;
  return { content: `${a} × ${b} = ?`, answer: String(a * b), type: '乘整百数', difficulty: 1 };
}

// 整十数乘整十数
export function genTensMulTens() {
  const a = randInt(1, 9) * 10;
  const b = randInt(1, 9) * 10;
  return { content: `${a} × ${b} = ?`, answer: String(a * b), type: '整十乘整十', difficulty: 1 };
}

// 估算
export function genMulEstimate() {
  const a = randInt(2, 9);
  const b = randInt(2, 9) * 100 + randInt(10, 99);
  const rounded = Math.round(b / 100) * 100;
  return {
    content: `${a} × ${b} ≈ ?`,
    answer: String(a * rounded),
    type: '乘法估算',
    difficulty: 2,
  };
}

// 口算填空
export function genMulFillBlank() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randInt(2, 9);
    const b = randInt(1, 9);
    return {
      content: `${a}0 × ${b} = ${a * b}0，这里用到的口诀是（ ）`,
      answer: `${a}×${b}=${a * b}`,
      type: '口算填空',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randInt(2, 9);
    return {
      content: `${a} × ${30} = ${a * 3}个十 = ${a * 30}`,
      answer: String(a * 3),
      type: '单位填空',
      difficulty: 1,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(1, 9);
  return {
    content: `${a}个百 × ${b} = ${a * b}个百 = ${a * b * 100}`,
    answer: String(a * b),
    type: '百位填空',
    difficulty: 1,
  };
}

// 逆运算
export function genMulReverse() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 9);
    const b = randInt(1, 9);
    return {
      content: `□ × ${b * 10} = ${a * b * 10}, □ = ?`,
      answer: String(a),
      type: '乘法逆运算',
      difficulty: 1,
    };
  }
  const a = randInt(2, 9);
  return { content: `${a * 100} ÷ ${a} = ?`, answer: '100', type: '除法逆运算', difficulty: 1 };
}

// 比大小
export function genMulCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const c = randInt(2, 9);
    const d = randInt(2, 9);
    const left = a * (b * 10);
    const right = c * (d * 10);
    return {
      content: `${a}×${b * 10} ○ ${c}×${d * 10}（填 >、< 或 =）`,
      answer: left > right ? '>' : left < right ? '<' : '=',
      type: '比大小',
      difficulty: 1,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(1, 5);
  const c = randInt(2, 9);
  return {
    content: `${a}×${b * 100} ○ ${c}×${b * 100}（填 >、< 或 =）`,
    answer: a > c ? '>' : a < c ? '<' : '=',
    type: '比大小',
    difficulty: 1,
  };
}

// ============ 第三章：长方形和正方形 ============

// 长方形周长
export function genRectPerimeter() {
  const l = randInt(3, 20);
  const w = randInt(2, l - 1);
  return {
    content: `长方形的长是${l}厘米，宽是${w}厘米，周长是多少厘米？`,
    answer: String(2 * (l + w)),
    type: '长方形周长',
    difficulty: 1,
  };
}

// 正方形周长
export function genSquarePerimeter() {
  const s = randInt(2, 15);
  return {
    content: `正方形的边长是${s}厘米，周长是多少厘米？`,
    answer: String(4 * s),
    type: '正方形周长',
    difficulty: 1,
  };
}

// 已知周长求边长
export function genPerimeterReverse() {
  const r = randInt(1, 2);
  if (r === 1) {
    const s = randInt(3, 15);
    const perimeter = 4 * s;
    return {
      content: `正方形的周长是${perimeter}厘米，边长是多少厘米？`,
      answer: String(s),
      type: '求边长',
      difficulty: 2,
    };
  }
  const l = randInt(5, 20);
  const w = randInt(3, l - 1);
  const perimeter = 2 * (l + w);
  return {
    content: `长方形的周长是${perimeter}厘米，长是${l}厘米，宽是多少厘米？`,
    answer: String(w),
    type: '求宽',
    difficulty: 2,
  };
}

// 长方形面积
export function genRectArea() {
  const l = randInt(3, 15);
  const w = randInt(2, 10);
  return {
    content: `长方形的长是${l}厘米，宽是${w}厘米，面积是多少平方厘米？`,
    answer: String(l * w),
    type: '长方形面积',
    difficulty: 2,
  };
}

// 正方形面积
export function genSquareArea() {
  const s = randInt(2, 12);
  return {
    content: `正方形的边长是${s}厘米，面积是多少平方厘米？`,
    answer: String(s * s),
    type: '正方形面积',
    difficulty: 2,
  };
}

// 图形判断
export function genShapeJudge() {
  const questions = [
    { content: '长方形的对边（ ）', answer: '相等', type: '图形特征' },
    { content: '正方形的四条边都（ ）', answer: '相等', type: '图形特征' },
    { content: '长方形和正方形都有（ ）个直角', answer: '4', type: '图形特征' },
    { content: '正方形是特殊的（ ）', answer: '长方形', type: '图形分类' },
    {
      content: '长方形的周长 = ( ) + ( ) + ( ) + ( ) = ( + ) × 2',
      answer: '长、宽、长、宽、长、宽',
      type: '周长公式',
    },
    { content: '正方形的周长 = （ ）× 4', answer: '边长', type: '周长公式' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 周长比较
export function genPerimeterCompare() {
  const s1 = randInt(3, 10);
  const s2 = randInt(3, 10);
  if (s1 === s2) return genPerimeterCompare();
  const p1 = 4 * s1;
  const p2 = 4 * s2;
  return {
    content: `边长${s1}厘米的正方形和边长${s2}厘米的正方形，哪个周长长？长多少？`,
    answer: `${Math.max(s1, s2)}厘米的正方形,长${Math.abs(p1 - p2)}厘米`,
    type: '周长比较',
    difficulty: 2,
  };
}

// 周长面积综合
export function genShapeMixed() {
  const r = randInt(1, 2);
  if (r === 1) {
    const l = randInt(5, 12);
    const w = randInt(3, 8);
    return {
      content: `一个长方形，长${l}厘米，宽${w}厘米，周长是（ ）厘米，面积是（ ）平方厘米`,
      answer: `周长${2 * (l + w)}厘米,面积${l * w}平方厘米`,
      type: '周长面积综合',
      difficulty: 2,
    };
  }
  const s = randInt(3, 10);
  return {
    content: `一个正方形，边长${s}厘米，周长是（ ）厘米，面积是（ ）平方厘米`,
    answer: `周长${4 * s}厘米,面积${s * s}平方厘米`,
    type: '周长面积综合',
    difficulty: 2,
  };
}

// ============ 第四章：分数的初步认识 ============

// 分数的读写
export function genFractionReadWrite() {
  const den = pick([2, 3, 4, 5, 6, 8, 10]);
  const num = randInt(1, den - 1);
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `${num}/${den}读作（ ）`,
      answer: `${den}分之${num}`,
      type: '读分数',
      difficulty: 1,
    };
  }
  const words = ['三分之一', '四分之一', '五分之二', '六分之五', '八分之三', '十分之七'];
  const vals = ['1/3', '1/4', '2/5', '5/6', '3/8', '7/10'];
  const i = randInt(0, words.length - 1);
  return { content: `${words[i]}写作（ ）`, answer: vals[i], type: '写分数', difficulty: 1 };
}

// 分数的意义
export function genFractionMeaning() {
  const r = randInt(1, 3);
  if (r === 1) {
    const den = pick([2, 3, 4, 5, 6, 8]);
    return {
      content: `把一个整体平均分成${den}份，取其中1份，用分数表示是（ ）`,
      answer: `1/${den}`,
      type: '分数意义',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const den = pick([3, 4, 5, 6, 8]);
    const num = randInt(1, den - 1);
    return {
      content: `把一个蛋糕平均分成${den}份，小明吃了${num}份，吃了这个蛋糕的（ ）`,
      answer: `${num}/${den}`,
      type: '分数意义',
      difficulty: 1,
    };
  }
  const den = pick([2, 3, 4, 5, 10]);
  return {
    content: `1/${den}表示把一个整体平均分成（ ）份，取其中（ ）份`,
    answer: `${den},1`,
    type: '分数意义',
    difficulty: 1,
  };
}

// 分数各部分名称
export function genFractionParts() {
  const den = pick([3, 4, 5, 6, 8]);
  const num = randInt(1, den - 1);
  const r = randInt(1, 3);
  if (r === 1)
    return {
      content: `在分数${num}/${den}中，${num}是（ ）`,
      answer: '分子',
      type: '分数组成',
      difficulty: 1,
    };
  if (r === 2)
    return {
      content: `在分数${num}/${den}中，${den}是（ ）`,
      answer: '分母',
      type: '分数组成',
      difficulty: 1,
    };
  return {
    content: `在分数${num}/${den}中，分数线下面的数叫（ ）`,
    answer: '分母',
    type: '分数组成',
    difficulty: 1,
  };
}

// 比较分数大小（同分母）
export function genFractionCompareSameDen() {
  const den = pick([3, 4, 5, 6, 8, 10]);
  const a = randInt(1, den - 2);
  const b = randInt(a + 1, den - 1);
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `${a}/${den} ○ ${b}/${den}（填 >、< 或 =）`,
      answer: '<',
      type: '分数比大小',
      difficulty: 1,
    };
  }
  return {
    content: `${b}/${den} ○ ${a}/${den}（填 >、< 或 =）`,
    answer: '>',
    type: '分数比大小',
    difficulty: 1,
  };
}

// 比较分数大小（同分子）
export function genFractionCompareSameNum() {
  const num = randInt(1, 3);
  const d1 = randInt(3, 6);
  const d2 = d1 + randInt(1, 4);
  return {
    content: `${num}/${d1} ○ ${num}/${d2}（填 >、< 或 =）`,
    answer: '>',
    type: '分数比大小',
    difficulty: 2,
  };
}

// 同分母加法
export function genFractionAdd() {
  const den = pick([3, 4, 5, 6, 8, 10]);
  const a = randInt(1, den - 2);
  const b = randInt(1, den - a - 1);
  const sum = a + b;
  const simplified = sum === den ? '1' : `${sum}/${den}`;
  return {
    content: `${a}/${den} + ${b}/${den} = ?`,
    answer: simplified,
    type: '同分母加法',
    difficulty: 1,
  };
}

// 同分母减法
export function genFractionSub() {
  const den = pick([3, 4, 5, 6, 8, 10]);
  const a = randInt(2, den - 1);
  const b = randInt(1, a - 1);
  return {
    content: `${a}/${den} - ${b}/${den} = ?`,
    answer: `${a - b}/${den}`,
    type: '同分母减法',
    difficulty: 1,
  };
}

// 分数填空
export function genFractionFill() {
  const r = randInt(1, 3);
  if (r === 1) {
    const den = pick([4, 5, 8, 10]);
    return { content: `1 = ${den}/（ ）`, answer: String(den), type: '分数填空', difficulty: 1 };
  }
  if (r === 2) {
    const den = pick([2, 3, 4, 5]);
    return { content: `${den}个1/${den}是（ ）`, answer: '1', type: '分数填空', difficulty: 1 };
  }
  const den = pick([4, 5, 6, 8, 10]);
  const half = den / 2;
  if (!Number.isInteger(half)) return genFractionFill();
  return {
    content: `${half}/${den} = 1/（ ）（化简后）`,
    answer: '2',
    type: '分数化简',
    difficulty: 2,
  };
}

// ============ 第五章：元角分与小数 ============

// 元角分换算
export function genMoneyConvert() {
  const r = randInt(1, 4);
  if (r === 1) return { content: '1元 = （ ）角', answer: '10', type: '元角换算', difficulty: 1 };
  if (r === 2) return { content: '1角 = （ ）分', answer: '10', type: '角分换算', difficulty: 1 };
  if (r === 3) {
    const yuan = randInt(1, 10);
    return {
      content: `${yuan}元 = （ ）角`,
      answer: String(yuan * 10),
      type: '元角换算',
      difficulty: 1,
    };
  }
  const jiao = randInt(1, 9);
  return {
    content: `${jiao}角 = （ ）分`,
    answer: String(jiao * 10),
    type: '角分换算',
    difficulty: 1,
  };
}

// 小数读写
export function genDecimalReadWrite() {
  const r = randInt(1, 4);
  if (r === 1) {
    const yuan = randInt(1, 9);
    const jiao = randInt(0, 9);
    return {
      content: `${yuan}元${jiao}角 = （ ）元`,
      answer: `${yuan}.${jiao}`,
      type: '小数写法',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const integer = randInt(1, 10);
    const decimal = randInt(1, 9);
    return {
      content: `${integer}.${decimal}元 = （ ）元（ ）角`,
      answer: `${integer}元${decimal}角`,
      type: '小数读法',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const m = randInt(1, 5);
    const dm = randInt(0, 9);
    return {
      content: `${m}米${dm}分米 = （ ）米`,
      answer: `${m}.${dm}`,
      type: '小数写法',
      difficulty: 1,
    };
  }
  const num = randInt(1, 9);
  const den = 10;
  return {
    content: `${num}/${den} = （ ）（小数）`,
    answer: `0.${num}`,
    type: '分数转小数',
    difficulty: 1,
  };
}

// 小数比较
export function genDecimalCompare() {
  const a = randInt(1, 9);
  const b = randInt(0, 9);
  const c = randInt(1, 9);
  const d = randInt(0, 9);
  const left = a + b / 10;
  const right = c + d / 10;
  return {
    content: `${a}.${b} ○ ${c}.${d}（填 >、< 或 =）`,
    answer: left > right ? '>' : left < right ? '<' : '=',
    type: '小数比大小',
    difficulty: 1,
  };
}

// 小数加减
export function genDecimalAddSub() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 8);
    const b = randInt(1, 5);
    const c = randInt(1, 9 - b);
    return {
      content: `${a}.${b} + 0.${c} = ?`,
      answer: `${a}.${b + c}`,
      type: '小数加法',
      difficulty: 1,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(1, b - 1);
  return {
    content: `${a}.${b} - 0.${c} = ?`,
    answer: `${a}.${b - c}`,
    type: '小数减法',
    difficulty: 1,
  };
}

// 价格计算
export function genPriceCalc() {
  const r = randInt(1, 3);
  if (r === 1) {
    const prices = [
      { item: '铅笔', price: 0.5 },
      { item: '橡皮', price: 0.3 },
      { item: '尺子', price: 1.5 },
      { item: '本子', price: 2.0 },
      { item: '彩笔', price: 3.5 },
    ];
    const a = pick(prices);
    const b = pick(prices.filter(x => x.item !== a.item));
    const sum = (a.price * 10 + b.price * 10) / 10;
    return {
      content: `买一支${a.item}${a.price}元和一块${b.item}${b.price}元，一共多少钱？`,
      answer: `${sum}元`,
      type: '价格计算',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const jiao = randInt(5, 9);
    return { content: `${jiao}角 = （ ）元`, answer: `0.${jiao}`, type: '角转元', difficulty: 1 };
  }
  const yuan = randInt(1, 5);
  const jiao = randInt(1, 9);
  const fen = pick([0, 5]);
  const total = yuan + jiao / 10 + fen / 100;
  return {
    content: `${yuan}元${jiao}角${fen}分 = （ ）元`,
    answer: `${total.toFixed(2).replace(/\.?0+$/, '')}`,
    type: '综合换算',
    difficulty: 2,
  };
}

// ============ 第六章：三位数加减法 ============

// 不进位加法
export function genThreeAddNoCarry() {
  const a = randInt(100, 499);
  const aH = Math.floor(a / 100);
  const aT = Math.floor(a / 10) % 10;
  const aU = a % 10;
  const bH = randInt(0, 9 - aH);
  const bT = randInt(0, 9 - aT);
  const bU = randInt(0, 9 - aU);
  const b = bH * 100 + bT * 10 + bU;
  if (b < 100) return genThreeAddNoCarry();
  return { content: `${a} + ${b} = ?`, answer: String(a + b), type: '不进位加法', difficulty: 1 };
}

// 进位加法
export function genThreeAddCarry() {
  const a = randInt(100, 499);
  const b = randInt(100, 499);
  return { content: `${a} + ${b} = ?`, answer: String(a + b), type: '进位加法', difficulty: 2 };
}

// 不退位减法
export function genThreeSubNoBorrow() {
  const a = randInt(200, 999);
  const aH = Math.floor(a / 100);
  const aT = Math.floor(a / 10) % 10;
  const aU = a % 10;
  const bH = randInt(0, aH);
  const bT = randInt(0, aT);
  const bU = randInt(0, aU);
  const b = bH * 100 + bT * 10 + bU;
  if (b < 100 || b >= a) return genThreeSubNoBorrow();
  return { content: `${a} - ${b} = ?`, answer: String(a - b), type: '不退位减法', difficulty: 1 };
}

// 退位减法
export function genThreeSubBorrow() {
  const a = randInt(300, 999);
  const b = randInt(100, a - 1);
  return { content: `${a} - ${b} = ?`, answer: String(a - b), type: '退位减法', difficulty: 2 };
}

// 验算
export function genCheckCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(100, 500);
    const b = randInt(100, 400);
    return {
      content: `${a} + ${b} = ${a + b}，验算：${a + b} - ${a} = ?`,
      answer: String(b),
      type: '加法验算',
      difficulty: 2,
    };
  }
  const a = randInt(300, 999);
  const b = randInt(100, a - 1);
  return {
    content: `${a} - ${b} = ${a - b}，验算：${a - b} + ${b} = ?`,
    answer: String(a),
    type: '减法验算',
    difficulty: 2,
  };
}

// 估算
export function genThreeEstimate() {
  const num = randInt(100, 999);
  const rounded = Math.round(num / 100) * 100;
  return {
    content: `${num} ≈ （ ）（估算到百位）`,
    answer: String(rounded),
    type: '估算',
    difficulty: 1,
  };
}

// 填空
export function genThreeFillBlank() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randInt(100, 500);
    const b = randInt(100, 400);
    return {
      content: `${a} + □ = ${a + b}, □ = ?`,
      answer: String(b),
      type: '方框填数',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(300, 999);
    const b = randInt(100, a - 1);
    return {
      content: `□ - ${b} = ${a - b}, □ = ?`,
      answer: String(a),
      type: '方框填数',
      difficulty: 2,
    };
  }
  const a = randInt(100, 800);
  const b = randInt(100, a);
  return {
    content: `${a} - □ = ${a - b}, □ = ?`,
    answer: String(b),
    type: '方框填数',
    difficulty: 2,
  };
}

// 比大小
export function genThreeCompare() {
  const a = randInt(100, 999);
  const b = randInt(100, 999);
  if (a === b) return genThreeCompare();
  return {
    content: `${a} ○ ${b}（填 >、< 或 =）`,
    answer: a > b ? '>' : '<',
    type: '比大小',
    difficulty: 1,
  };
}

// ============ 第七章：两位数乘两三位数 ============

// 两位数乘两位数（不进位）
export function genTwoMulTwoNoCarry() {
  const a = randInt(10, 25);
  const b = randInt(10, 15);
  return {
    content: `${a} × ${b} = ?`,
    answer: String(a * b),
    type: '两位数乘两位数',
    difficulty: 2,
  };
}

// 两位数乘两位数（一般）
export function genTwoMulTwo() {
  const a = randInt(11, 49);
  const b = randInt(11, 49);
  return {
    content: `${a} × ${b} = ?`,
    answer: String(a * b),
    type: '两位数乘两位数',
    difficulty: 3,
  };
}

// 两位数乘整百数
export function genTwoMulHundred() {
  const a = randInt(11, 99);
  const b = randInt(1, 9) * 100;
  return { content: `${a} × ${b} = ?`, answer: String(a * b), type: '乘整百数', difficulty: 2 };
}

// 两位数乘三位数
export function genTwoMulThree() {
  const a = randInt(11, 49);
  const b = randInt(100, 299);
  return {
    content: `${a} × ${b} = ?`,
    answer: String(a * b),
    type: '两位数乘三位数',
    difficulty: 3,
  };
}

// 乘法估算
export function genMulEstimateTwo() {
  const a = randInt(20, 90);
  const b = randInt(20, 90);
  const aR = Math.round(a / 10) * 10;
  const bR = Math.round(b / 10) * 10;
  return { content: `${a} × ${b} ≈ ?`, answer: String(aR * bR), type: '乘法估算', difficulty: 2 };
}

// 两位数乘法填空
export function genTwoMulFillBlank() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randInt(12, 30);
    const b = randInt(11, 30);
    return {
      content: `${a} × □ = ${a * b}, □ = ?`,
      answer: String(b),
      type: '乘法逆运算',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(12, 30);
    const b = randInt(11, 30);
    return {
      content: `□ × ${b} = ${a * b}, □ = ?`,
      answer: String(a),
      type: '乘法逆运算',
      difficulty: 2,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(2, 9);
  const d = randInt(2, 9);
  return {
    content: `${a} × ${b * 10} ○ ${c} × ${d * 10}（填 >、< 或 =）`,
    answer: a * b > c * d ? '>' : a * b < c * d ? '<' : '=',
    type: '比大小',
    difficulty: 2,
  };
}

// 乘法口诀应用
export function genMulFact() {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  return {
    content: `${a} × ${b} = （ ），所以${a * 10} × ${b} = （ ）`,
    answer: `${a * b}, ${a * b * 10}`,
    type: '口诀应用',
    difficulty: 1,
  };
}

// ============ 第八章：年月日 ============

// 大月小月
export function genMonthDays() {
  const r = randInt(1, 3);
  if (r === 1) {
    const bigMonth = pick([1, 3, 5, 7, 8, 10, 12]);
    const monthNames = ['一月', '三月', '五月', '七月', '八月', '十月', '十二月'];
    const idx = [1, 3, 5, 7, 8, 10, 12].indexOf(bigMonth);
    return {
      content: `${monthNames[idx]}有（ ）天`,
      answer: '31',
      type: '大月天数',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const smallMonth = pick([4, 6, 9, 11]);
    const monthNames = { 4: '四月', 6: '六月', 9: '九月', 11: '十一月' };
    return {
      content: `${monthNames[smallMonth]}有（ ）天`,
      answer: '30',
      type: '小月天数',
      difficulty: 1,
    };
  }
  return {
    content: '一年有（ ）个月，大月有（ ）天，小月有（ ）天',
    answer: '12,31,30',
    type: '月份知识',
    difficulty: 1,
  };
}

// 平年闰年
export function genLeapYear() {
  const r = randInt(1, 3);
  if (r === 1) {
    const year = pick([2020, 2024, 2028, 2016, 2012, 2008, 2004, 2000]);
    return {
      content: `${year}年是平年还是闰年？`,
      answer: '闰年',
      type: '判断闰年',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const year = pick([2021, 2022, 2023, 2019, 2018, 2017, 2015, 2014, 2013, 2011, 2100]);
    return {
      content: `${year}年是平年还是闰年？`,
      answer: year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? '闰年' : '平年',
      type: '判断闰年',
      difficulty: 1,
    };
  }
  return {
    content: '平年二月有（ ）天，闰年二月有（ ）天',
    answer: '28,29',
    type: '二月天数',
    difficulty: 1,
  };
}

// 24时计时法
export function gen24Hour() {
  const r = randInt(1, 4);
  if (r === 1) {
    const h = randInt(1, 12);
    return {
      content: `下午${h}时用24时计时法表示是（ ）时`,
      answer: String(h + 12),
      type: '24时计时法',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const h = randInt(13, 23);
    return {
      content: `${h}时用12时计时法表示是（ ）`,
      answer: `下午${h - 12}时`,
      type: '12时计时法',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const h = randInt(1, 11);
    return {
      content: `上午${h}时用24时计时法表示是（ ）时`,
      answer: String(h),
      type: '24时计时法',
      difficulty: 1,
    };
  }
  return {
    content: '一天有（ ）小时，钟表上时针一天转（ ）圈',
    answer: '24,2',
    type: '时间知识',
    difficulty: 1,
  };
}

// 时间计算
export function genTimeCalc() {
  const r = randInt(1, 3);
  if (r === 1) {
    const start = randInt(8, 14);
    const duration = randInt(1, 3);
    return {
      content: `${start}时经过${duration}小时后是（ ）时`,
      answer: String(start + duration),
      type: '时间计算',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const start = randInt(14, 20);
    const end = start + randInt(1, 3);
    return {
      content: `从${start}时到${end}时，经过了（ ）小时`,
      answer: String(end - start),
      type: '经过时间',
      difficulty: 1,
    };
  }
  const m1 = randInt(1, 6);
  const m2 = randInt(m1 + 1, 8);
  return {
    content: `从${m1}月到${m2}月，中间经过了（ ）个月`,
    answer: String(m2 - m1),
    type: '月份计算',
    difficulty: 1,
  };
}

// 年份判断填空
export function genYearFill() {
  const r = randInt(1, 3);
  if (r === 1) {
    return {
      content: '一年中大月的月份是：（ ）',
      answer: '1、3、5、7、8、10、12月',
      type: '月份填空',
      difficulty: 1,
    };
  }
  if (r === 2) {
    return {
      content: '一年中小月的月份是：（ ）',
      answer: '4、6、9、11月',
      type: '月份填空',
      difficulty: 1,
    };
  }
  return { content: `第三季度是（ ）月到（ ）月`, answer: '7,9', type: '季度', difficulty: 1 };
}

// 星期计算
export function genWeekCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const d = randInt(1, 25);
    return {
      content: `${d}日是星期一，${d + 7}日是星期（ ）`,
      answer: '一',
      type: '星期计算',
      difficulty: 1,
    };
  }
  const d = randInt(1, 20);
  return {
    content: `${d}日是星期三，${d + 3}日是星期（ ）`,
    answer: '六',
    type: '星期计算',
    difficulty: 1,
  };
}

// ============ 第九章：千米和米 ============

// 千米和米换算
export function genKmConvert() {
  const r = randInt(1, 4);
  if (r === 1)
    return { content: '1千米 = （ ）米', answer: '1000', type: '千米换算', difficulty: 1 };
  if (r === 2) {
    const km = randInt(1, 9);
    return {
      content: `${km}千米 = （ ）米`,
      answer: String(km * 1000),
      type: '千米换算',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const m = randInt(1, 9) * 1000;
    return {
      content: `${m}米 = （ ）千米`,
      answer: String(m / 1000),
      type: '米换千米',
      difficulty: 1,
    };
  }
  const km = randInt(1, 5);
  const m = randInt(100, 900);
  return {
    content: `${km}千米${m}米 = （ ）米`,
    answer: String(km * 1000 + m),
    type: '复合换算',
    difficulty: 2,
  };
}

// 长度单位换算
export function genLengthConvert() {
  const r = randInt(1, 4);
  if (r === 1) return { content: '1米 = （ ）分米', answer: '10', type: '米分米', difficulty: 1 };
  if (r === 2)
    return { content: '1分米 = （ ）厘米', answer: '10', type: '分米厘米', difficulty: 1 };
  if (r === 3) {
    const m = randInt(1, 5);
    return {
      content: `${m}米 = （ ）厘米`,
      answer: String(m * 100),
      type: '米厘米',
      difficulty: 1,
    };
  }
  const cm = randInt(1, 5) * 100;
  return {
    content: `${cm}厘米 = （ ）米`,
    answer: String(cm / 100),
    type: '厘米米',
    difficulty: 1,
  };
}

// 长度比大小
export function genLengthCompare() {
  const r = randInt(1, 3);
  if (r === 1) {
    const km = randInt(1, 5);
    const m = randInt(500, 5000);
    return {
      content: `${km}千米 ○ ${m}米（填 >、< 或 =）`,
      answer: km * 1000 > m ? '>' : km * 1000 < m ? '<' : '=',
      type: '长度比大小',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const m = randInt(1, 10);
    const dm = randInt(10, 100);
    return {
      content: `${m}米 ○ ${dm}分米（填 >、< 或 =）`,
      answer: m * 10 > dm ? '>' : m * 10 < dm ? '<' : '=',
      type: '长度比大小',
      difficulty: 1,
    };
  }
  const a = randInt(1, 9) * 100;
  const b = randInt(1, 9) * 100;
  return {
    content: `${a}厘米 ○ ${b}厘米（填 >、< 或 =）`,
    answer: a > b ? '>' : a < b ? '<' : '=',
    type: '长度比大小',
    difficulty: 1,
  };
}

// 长度判断
export function genLengthJudge() {
  const questions = [
    { content: '一棵大树高约10（ ）', answer: '米', type: '长度单位选择' },
    { content: '一张课桌高约7（ ）', answer: '分米', type: '长度单位选择' },
    { content: '一本数学书厚约8（ ）', answer: '毫米', type: '长度单位选择' },
    { content: '小明身高约130（ ）', answer: '厘米', type: '长度单位选择' },
    { content: '汽车每小时行60（ ）', answer: '千米', type: '长度单位选择' },
    { content: '操场跑道长200（ ）', answer: '米', type: '长度单位选择' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 长度排序
export function genLengthSort() {
  const r = randInt(1, 2);
  if (r === 1) {
    const values = [randInt(1, 5), randInt(10, 50), randInt(100, 500)];
    return {
      content: `将${values[2]}米、${values[0]}千米、${values[1]}分米从小到大排列`,
      answer: `${values[1]}分米 < ${values[2]}米 < ${values[0]}千米`,
      type: '长度排序',
      difficulty: 2,
    };
  }
  const km = randInt(1, 3);
  const m = randInt(100, 900);
  return {
    content: `${km}千米 + ${m}米 = （ ）米`,
    answer: String(km * 1000 + m),
    type: '长度加法',
    difficulty: 2,
  };
}

// ============ 第十章：面积 ============

// 面积单位认识
export function genAreaUnit() {
  const r = randInt(1, 4);
  if (r === 1)
    return {
      content: '边长1厘米的正方形，面积是（ ）',
      answer: '1平方厘米',
      type: '面积单位',
      difficulty: 1,
    };
  if (r === 2)
    return {
      content: '边长1分米的正方形，面积是（ ）',
      answer: '1平方分米',
      type: '面积单位',
      difficulty: 1,
    };
  if (r === 3)
    return {
      content: '边长1米的正方形，面积是（ ）',
      answer: '1平方米',
      type: '面积单位',
      difficulty: 1,
    };
  return { content: '1平方分米 = （ ）平方厘米', answer: '100', type: '面积换算', difficulty: 1 };
}

// 面积单位换算
export function genAreaConvert() {
  const r = randInt(1, 4);
  if (r === 1)
    return { content: '1平方米 = （ ）平方分米', answer: '100', type: '面积换算', difficulty: 1 };
  if (r === 2) {
    const n = randInt(2, 9);
    return {
      content: `${n}平方米 = （ ）平方分米`,
      answer: String(n * 100),
      type: '面积换算',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const n = randInt(2, 9);
    return {
      content: `${n}平方分米 = （ ）平方厘米`,
      answer: String(n * 100),
      type: '面积换算',
      difficulty: 1,
    };
  }
  const n = randInt(2, 9) * 100;
  return {
    content: `${n}平方厘米 = （ ）平方分米`,
    answer: String(n / 100),
    type: '面积换算',
    difficulty: 1,
  };
}

// 面积计算
export function genAreaCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const l = randInt(3, 15);
    const w = randInt(2, 10);
    return {
      content: `长方形长${l}米，宽${w}米，面积是（ ）平方米`,
      answer: String(l * w),
      type: '长方形面积',
      difficulty: 2,
    };
  }
  const s = randInt(2, 12);
  return {
    content: `正方形边长${s}分米，面积是（ ）平方分米`,
    answer: String(s * s),
    type: '正方形面积',
    difficulty: 2,
  };
}

// 面积比大小
export function genAreaCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 5) * 100;
    const b = randInt(1, 5) * 100;
    if (a === b) return genAreaCompare();
    return {
      content: `${a}平方分米 ○ ${b}平方厘米（填 >、< 或 =）`,
      answer: a * 100 > b ? '>' : a * 100 < b ? '<' : '=',
      type: '面积比大小',
      difficulty: 2,
    };
  }
  const a = randInt(1, 5);
  const b = randInt(1, 5);
  if (a === b) return genAreaCompare();
  return {
    content: `${a}平方米 ○ ${b}平方分米（填 >、< 或 =）`,
    answer: a * 100 > b ? '>' : '<',
    type: '面积比大小',
    difficulty: 2,
  };
}

// 面积单位选择
export function genAreaUnitSelect() {
  const questions = [
    { content: '一间教室的面积约50（ ）', answer: '平方米', type: '面积单位选择' },
    { content: '一本数学书封面面积约3（ ）', answer: '平方分米', type: '面积单位选择' },
    { content: '一枚邮票面积约6（ ）', answer: '平方厘米', type: '面积单位选择' },
    { content: '一块手帕面积约4（ ）', answer: '平方分米', type: '面积单位选择' },
    { content: '操场面积约2000（ ）', answer: '平方米', type: '面积单位选择' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 面积填空
export function genAreaFill() {
  const r = randInt(1, 3);
  if (r === 1) {
    const s = randInt(3, 10);
    return {
      content: `正方形周长是${4 * s}厘米，面积是（ ）平方厘米`,
      answer: String(s * s),
      type: '已知周长求面积',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const l = randInt(4, 12);
    const w = randInt(2, 8);
    const area = l * w;
    return {
      content: `长方形面积是${area}平方厘米，长是${l}厘米，宽是（ ）厘米`,
      answer: String(w),
      type: '已知面积求宽',
      difficulty: 2,
    };
  }
  const s = randInt(3, 10);
  return {
    content: `正方形面积是${s * s}平方分米，边长是（ ）分米`,
    answer: String(s),
    type: '已知面积求边长',
    difficulty: 2,
  };
}

// ============ 第十一章：统计 ============

// 平均数计算
export function genAverage() {
  const r = randInt(1, 3);
  if (r === 1) {
    const n = randInt(3, 6);
    const vals = Array.from({ length: n }, () => randInt(50, 100));
    const sum = vals.reduce((a, b) => a + b, 0);
    return {
      content: `${n}个同学的成绩分别是${vals.join('、')}分，平均成绩是多少分？`,
      answer: String(Math.floor(sum / n)),
      type: '求平均数',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const n = randInt(3, 5);
    const avg = randInt(60, 90);
    const vals = Array.from({ length: n - 1 }, () => avg + randInt(-10, 10));
    const last = n * avg - vals.reduce((a, b) => a + b, 0);
    return {
      content: `${n}个数的平均数是${avg}，其中${n - 1}个数是${vals.join('、')}，第${n}个数是多少？`,
      answer: String(last),
      type: '已知平均求个别',
      difficulty: 3,
    };
  }
  const n = randInt(4, 8);
  const avg = randInt(60, 90);
  return {
    content: `${n}个数的平均数是${avg}，这${n}个数的总和是多少？`,
    answer: String(n * avg),
    type: '平均数与总和',
    difficulty: 2,
  };
}

// 条形统计图读取
export function genBarChart() {
  const categories = ['苹果', '香蕉', '橘子', '葡萄', '西瓜'];
  const n = randInt(3, 5);
  const selected = categories.slice(0, n);
  const vals = Array.from({ length: n }, () => randInt(5, 30));
  const maxVal = Math.max(...vals);
  const maxIdx = vals.indexOf(maxVal);
  const minVal = Math.min(...vals);
  const minIdx = vals.indexOf(minVal);
  const sum = vals.reduce((a, b) => a + b, 0);
  const r = randInt(1, 3);
  if (r === 1) {
    return {
      content: `条形统计图显示：${selected.map((c, i) => `${c}${vals[i]}人`).join('、')}，喜欢${selected[maxIdx]}的有（ ）人，最多`,
      answer: String(maxVal),
      type: '读统计图',
      difficulty: 1,
    };
  }
  if (r === 2) {
    return {
      content: `${selected.map((c, i) => `${c}${vals[i]}人`).join('、')}，喜欢${selected[maxIdx]}的比喜欢${selected[minIdx]}的多（ ）人`,
      answer: String(maxVal - minVal),
      type: '统计比较',
      difficulty: 2,
    };
  }
  return {
    content: `${selected.map((c, i) => `${c}${vals[i]}人`).join('、')}，一共有（ ）人参与调查`,
    answer: String(sum),
    type: '统计求和',
    difficulty: 1,
  };
}

// 统计填空
export function genStatFill() {
  const r = randInt(1, 2);
  if (r === 1) {
    const n = randInt(4, 6);
    const avg = randInt(70, 90);
    const sum = n * avg;
    return {
      content: `${n}位同学数学平均成绩是${avg}分，总分是（ ）分`,
      answer: String(sum),
      type: '平均数填空',
      difficulty: 2,
    };
  }
  const n = randInt(3, 5);
  const sum = randInt(200, 400);
  const avg = Math.floor(sum / n);
  return {
    content: `${n}位同学总分是${sum}分，平均分是（ ）分`,
    answer: String(avg),
    type: '求平均',
    difficulty: 2,
  };
}

// 统计综合
export function genStatMixed() {
  const classes = ['三(1)班', '三(2)班', '三(3)班'];
  const scores = classes.map(() => randInt(80, 99));
  const avg = Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `${classes.map((c, i) => `${c}平均${scores[i]}分`).join('、')}，三个班平均分是多少？`,
      answer: String(avg),
      type: '班级平均',
      difficulty: 2,
    };
  }
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  return {
    content: `${classes.map((c, i) => `${c}平均${scores[i]}分`).join('、')}，最高与最低平均分相差（ ）分`,
    answer: String(max - min),
    type: '统计差值',
    difficulty: 2,
  };
}

// ============ 找规律填数 ============

// 找规律填数（等差步长为2/5/10及其倍数，或×2、÷2倍数规律）
export function genNumberPattern() {
  const r = randInt(1, 2);
  const shownCount = 5;
  const seq = [];
  if (r === 1) {
    // 等差数列：步长为2、5、10或其倍数
    const step = pick([2, 5, 10, 20, 25, 50, 100]);
    if (randInt(1, 2) === 1) {
      const start = randInt(1, 999 - step * shownCount);
      for (let i = 0; i < shownCount; i++) seq.push(start + i * step);
      return {
        content: `找规律填数：${seq.join('、')}、（ ）`,
        answer: String(seq[shownCount - 1] + step),
        type: '找规律填数',
        difficulty: 1,
      };
    }
    const start = randInt(step * (shownCount + 1) + 1, step * (shownCount + 1) + 300);
    for (let i = 0; i < shownCount; i++) seq.push(start - i * step);
    return {
      content: `找规律填数：${seq.join('、')}、（ ）`,
      answer: String(seq[shownCount - 1] - step),
      type: '找规律填数',
      difficulty: 1,
    };
  }
  // 倍数规律：×2 或 ÷2
  if (randInt(1, 2) === 1) {
    let cur = randInt(1, 30);
    for (let i = 0; i < shownCount; i++) {
      seq.push(cur);
      cur *= 2;
    }
    return {
      content: `找规律填数：${seq.join('、')}、（ ）`,
      answer: String(cur),
      type: '找规律填数',
      difficulty: 2,
    };
  }
  let cur = 32 * randInt(1, 30);
  for (let i = 0; i < shownCount; i++) {
    seq.push(cur);
    cur /= 2;
  }
  return {
    content: `找规律填数：${seq.join('、')}、（ ）`,
    answer: String(cur),
    type: '找规律填数',
    difficulty: 2,
  };
}

// ============ 比较大小（含乘除） ============

// 比较大小（含乘除的两步计算）
export function genCompareCalc() {
  const r = randInt(1, 3);
  if (r === 1) {
    // 乘减与乘加比大小
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const c = randInt(1, a * b);
    const d = randInt(2, 9);
    const e = randInt(2, 9);
    const f = randInt(1, 30);
    const left = a * b - c;
    const right = d * e + f;
    return {
      content: `${a}×${b}-${c} ○ ${d}×${e}+${f}（填 >、< 或 =）`,
      answer: left > right ? '>' : left < right ? '<' : '=',
      type: '比较大小',
      difficulty: 2,
    };
  }
  if (r === 2) {
    // 除加与乘减比大小
    const b = randInt(2, 9);
    const q = randInt(2, 9);
    const a = b * q;
    const c = randInt(2, 20);
    const d = randInt(2, 9);
    const e = randInt(2, 9);
    const f = randInt(1, d * e);
    const left = q + c;
    const right = d * e - f;
    return {
      content: `${a}÷${b}+${c} ○ ${d}×${e}-${f}（填 >、< 或 =）`,
      answer: left > right ? '>' : left < right ? '<' : '=',
      type: '比较大小',
      difficulty: 2,
    };
  }
  // 除加与乘法算式比大小
  const b = randInt(2, 9);
  const q = randInt(2, 9);
  const a = b * q;
  const c = randInt(2, 20);
  const d = randInt(2, 9);
  const e = randInt(2, 9);
  const left = q + c;
  const right = d * e;
  return {
    content: `${a}÷${b}+${c} ○ ${d}×${e}（填 >、< 或 =）`,
    answer: left > right ? '>' : left < right ? '<' : '=',
    type: '比较大小',
    difficulty: 2,
  };
}
