// 四年级基础计算题 - 沪教版2024新教材
// 每个知识点多种题型，每次调用随机生成不同题目

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============ 第一章：大数的认识 ============

// 读数（万以内）
export function genReadLargeNumber() {
  const r = randInt(1, 3);
  if (r === 1) {
    const num = randInt(1000, 9999);
    const qian = Math.floor(num / 1000);
    const bai = Math.floor(num / 100) % 10;
    const shi = Math.floor(num / 10) % 10;
    const ge = num % 10;
    let read = qian + '千';
    if (bai === 0 && (shi !== 0 || ge !== 0)) read += '零';
    else if (bai !== 0) read += bai + '百';
    if (shi === 0 && ge !== 0) read += '零';
    else if (shi !== 0) read += shi + '十';
    if (ge !== 0) read += String(ge);
    return { content: `${num}读作（ ）`, answer: read, type: '读数', difficulty: 1 };
  }
  if (r === 2) {
    const num = randInt(10000, 99999);
    const wan = Math.floor(num / 10000);
    const qian = Math.floor(num / 1000) % 10;
    const bai = Math.floor(num / 100) % 10;
    const shi = Math.floor(num / 10) % 10;
    const ge = num % 10;
    let read = wan + '万';
    if (qian === 0 && (bai !== 0 || shi !== 0 || ge !== 0)) read += '零';
    else if (qian !== 0) read += qian + '千';
    if (bai === 0 && (shi !== 0 || ge !== 0)) read += '零';
    else if (bai !== 0) read += bai + '百';
    if (shi === 0 && ge !== 0) read += '零';
    else if (shi !== 0) read += shi + '十';
    if (ge !== 0) read += String(ge);
    return { content: `${num}读作（ ）`, answer: read, type: '读数', difficulty: 2 };
  }
  const num = randInt(100000, 999999);
  const shiwan = Math.floor(num / 100000);
  const wan = Math.floor(num / 10000) % 10;
  const qian = Math.floor(num / 1000) % 10;
  const bai = Math.floor(num / 100) % 10;
  const shi = Math.floor(num / 10) % 10;
  const ge = num % 10;
  let read = shiwan + '十' + wan + '万';
  if (qian !== 0) read += qian + '千';
  else if (bai !== 0 || shi !== 0 || ge !== 0) read += '零';
  if (bai !== 0) read += bai + '百';
  else if (shi !== 0 || ge !== 0) read += '零';
  if (shi !== 0) read += shi + '十';
  if (ge !== 0) read += String(ge);
  return { content: `${num}读作（ ）`, answer: read, type: '读数', difficulty: 3 };
}

// 写数
export function genWriteLargeNumber() {
  const r = randInt(1, 2);
  if (r === 1) {
    const qian = randInt(1, 9);
    const bai = randInt(0, 9);
    const shi = randInt(0, 9);
    const ge = randInt(1, 9);
    const num = qian * 1000 + bai * 100 + shi * 10 + ge;
    return {
      content: `${qian}千${bai !== 0 ? bai + '百' : ''}${shi !== 0 ? shi + '十' : ''}${ge}写作（ ）`,
      answer: String(num),
      type: '写数',
      difficulty: 1,
    };
  }
  const wan = randInt(1, 9);
  const qian = randInt(0, 9);
  const bai = randInt(0, 9);
  const shi = randInt(0, 9);
  const ge = randInt(1, 9);
  const num = wan * 10000 + qian * 1000 + bai * 100 + shi * 10 + ge;
  return {
    content: `${wan}万${qian !== 0 ? qian + '千' : ''}${bai !== 0 ? bai + '百' : ''}${shi !== 0 ? shi + '十' : ''}${ge}写作（ ）`,
    answer: String(num),
    type: '写数',
    difficulty: 2,
  };
}

// 数的组成
export function genNumberComposition() {
  const num = randInt(1000, 99999);
  const digits = String(num).split('').map(Number);
  const places = ['个', '十', '百', '千', '万'].slice(0, digits.length);
  const parts = digits
    .map((d, i) => (d !== 0 ? `${d}个${places[digits.length - 1 - i]}` : null))
    .filter(Boolean)
    .join('、');
  return { content: `${num}是由${parts}组成`, answer: '对', type: '数的组成', difficulty: 1 };
}

// 数位顺序
export function genDigitPosition() {
  const num = randInt(1000, 99999);
  const digits = String(num).split('').map(Number);
  const places = ['个位', '十位', '百位', '千位', '万位'].slice(0, digits.length);
  const idx = randInt(0, digits.length - 1);
  return {
    content: `${num}中，${digits[idx]}在（ ）位上`,
    answer: places[digits.length - 1 - idx],
    type: '数位认识',
    difficulty: 1,
  };
}

// 比较大小
export function genCompareLargeNumber() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1000, 99999);
    let b = randInt(1000, 99999);
    while (b === a) b = randInt(1000, 99999);
    return {
      content: `${a} ○ ${b}（填 >、< 或 =）`,
      answer: a > b ? '>' : '<',
      type: '比较大小',
      difficulty: 1,
    };
  }
  const a = randInt(1000, 9999);
  const b = randInt(1000, 9999);
  const c = randInt(1000, 9999);
  const nums = [a, b, c].sort((x, y) => x - y);
  return {
    content: `将${a}、${b}、${c}从小到大排列：`,
    answer: nums.join('<'),
    type: '排序',
    difficulty: 2,
  };
}

// 四舍五入到万位
export function genRoundToWan() {
  const num = randInt(10000, 999999);
  return {
    content: `${num}≈（ ）万`,
    answer: String(Math.round(num / 10000)),
    type: '四舍五入到万',
    difficulty: 2,
  };
}

// 四舍五入到千位
export function genRoundToQian() {
  const num = randInt(1000, 99999);
  return {
    content: `${num}≈（ ）千`,
    answer: String(Math.round(num / 1000)),
    type: '四舍五入到千',
    difficulty: 2,
  };
}

// 近似数
export function genApproximateNumber() {
  const num = randInt(1000, 99999);
  const r = randInt(1, 2);
  if (r === 1) {
    const approx = Math.round(num / 100) * 100;
    return {
      content: `${num}的近似数（精确到百位）是（ ）`,
      answer: String(approx),
      type: '近似数',
      difficulty: 2,
    };
  }
  const approx = Math.round(num / 1000) * 1000;
  return {
    content: `${num}的近似数（精确到千位）是（ ）`,
    answer: String(approx),
    type: '近似数',
    difficulty: 2,
  };
}

// 万以内加减法
export function genLargeAddSub() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1000, 8999);
    const b = randInt(1000, 9999 - a);
    return { content: `${a} + ${b} = ?`, answer: String(a + b), type: '万以内加法', difficulty: 1 };
  }
  const a = randInt(2000, 9999);
  const b = randInt(1000, a - 1);
  return { content: `${a} - ${b} = ?`, answer: String(a - b), type: '万以内减法', difficulty: 1 };
}

// ============ 第二章：整数四则混合运算 ============

// 先乘除后加减
export function genMulDivFirst() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(2, 9);
    const b = randInt(2, 6);
    const c = randInt(10, 30);
    return {
      content: `${a} × ${b} + ${c} = ?`,
      answer: String(a * b + c),
      type: '乘加混合',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const a = randInt(2, 9);
    const b = randInt(2, 6);
    const c = randInt(5, a * b - 1);
    return {
      content: `${a} × ${b} - ${c} = ?`,
      answer: String(a * b - c),
      type: '乘减混合',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const b = randInt(2, 6);
    const ans = randInt(3, 9);
    const a = b * ans;
    const c = randInt(5, 20);
    return {
      content: `${a} ÷ ${b} + ${c} = ?`,
      answer: String(ans + c),
      type: '除加混合',
      difficulty: 1,
    };
  }
  const b = randInt(2, 6);
  const ans = randInt(10, 30);
  const a = b * ans;
  const c = randInt(5, 15);
  return {
    content: `${a} ÷ ${b} - ${c} = ?`,
    answer: String(ans - c),
    type: '除减混合',
    difficulty: 1,
  };
}

// 三步计算式题
export function genThreeStepCalc() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 5);
    const c = randInt(2, 5);
    const d = randInt(1, 10);
    return {
      content: `${a} × ${b} + ${c} × ${d} = ?`,
      answer: String(a * b + c * d),
      type: '三步计算',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(10, 50);
    const b = randInt(2, 5);
    const c = randInt(2, 4);
    const d = b * c;
    return {
      content: `${a} + ${b} × ${c} = ?`,
      answer: String(a + d),
      type: '三步计算',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const b = randInt(2, 5);
    const c = randInt(2, 5);
    const d = b * c;
    const a = randInt(d + 5, d + 30);
    return {
      content: `${a} - ${b} × ${c} = ?`,
      answer: String(a - d),
      type: '三步计算',
      difficulty: 1,
    };
  }
  const b = randInt(2, 4);
  const c = randInt(2, 4);
  const d = b * c;
  const a = randInt(d * 2, d * 6);
  if (a % b !== 0) return genThreeStepCalc();
  return {
    content: `${a} ÷ ${b} + ${c} = ?`,
    answer: String(a / b + c),
    type: '三步计算',
    difficulty: 1,
  };
}

// 有括号的运算
export function genBracketCalc() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 5);
    const c = randInt(1, 10);
    return {
      content: `${a} × (${b} + ${c}) = ?`,
      answer: String(a * (b + c)),
      type: '括号运算',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(2, 8);
    const b = randInt(5, 15);
    const c = randInt(1, b - 1);
    return {
      content: `${a} × (${b} - ${c}) = ?`,
      answer: String(a * (b - c)),
      type: '括号运算',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const a = randInt(10, 50);
    const b = randInt(2, 8);
    const c = randInt(2, 5);
    return {
      content: `(${a} + ${b}) × ${c} = ?`,
      answer: String((a + b) * c),
      type: '括号运算',
      difficulty: 2,
    };
  }
  const a = randInt(20, 80);
  const b = randInt(5, a - 5);
  const c = randInt(2, 5);
  return {
    content: `(${a} - ${b}) × ${c} = ?`,
    answer: String((a - b) * c),
    type: '括号运算',
    difficulty: 2,
  };
}

// 交换律
export function genCommutativeProperty() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(10, 99);
    const b = randInt(10, 99);
    return {
      content: `${a} + ${b} = ${b} + □, □ = ?`,
      answer: String(a),
      type: '加法交换律',
      difficulty: 1,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  return {
    content: `${a} × ${b} = ${b} × □, □ = ?`,
    answer: String(a),
    type: '乘法交换律',
    difficulty: 1,
  };
}

// 结合律
export function genAssociativeProperty() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(10, 50);
    const b = randInt(10, 50);
    const c = randInt(10, 50);
    return {
      content: `(${a} + ${b}) + ${c} = ${a} + (${b} + ${c}), 这是（ ）律`,
      answer: '加法结合',
      type: '结合律识别',
      difficulty: 1,
    };
  }
  const a = randInt(2, 5);
  const b = randInt(2, 5);
  const c = randInt(2, 5);
  return {
    content: `(${a} × ${b}) × ${c} = ${a} × (${b} × ${c}), 这是（ ）律`,
    answer: '乘法结合',
    type: '结合律识别',
    difficulty: 1,
  };
}

// 分配律
export function genDistributiveProperty() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const c = randInt(2, 9);
    return {
      content: `${a} × ${b} + ${a} × ${c} = ${a} × (□ + □)`,
      answer: `${b} + ${c}`,
      type: '乘法分配律',
      difficulty: 2,
    };
  }
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(2, 9);
  return {
    content: `${a} × (${b} + ${c}) = ${a} × □ + ${a} × □`,
    answer: `${b}和${c}`,
    type: '乘法分配律',
    difficulty: 2,
  };
}

// 简便计算
export function genQuickCalc() {
  const r = randInt(1, 4);
  if (r === 1) {
    const a = randInt(20, 80);
    const b = randInt(10, 40);
    return {
      content: `${a} + ${b} + ${100 - a} = ?（用凑整法）`,
      answer: String(100 + b),
      type: '凑整法',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const a = randInt(20, 80);
    const b = randInt(20, 80);
    const c = randInt(1, 20);
    return {
      content: `${a} + ${c} + ${b} = ?（用凑整法）`,
      answer: String(a + b + c),
      type: '凑整法',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const a = randInt(2, 8);
    const b = randInt(10, 30);
    return {
      content: `${a} × ${b} + ${a} × ${100 - b} = ?（用分配律）`,
      answer: String(a * 100),
      type: '分配律简便',
      difficulty: 2,
    };
  }
  const a = randInt(2, 8);
  const b = randInt(2, 6);
  const c = randInt(2, 4);
  return {
    content: `${a} × ${b} × ${c} = ${a} × (${b} × ${c}) = ?`,
    answer: String(a * b * c),
    type: '结合律简便',
    difficulty: 2,
  };
}

// ============ 第三章：分数 ============

// 分数的意义
export function genFractionMeaning() {
  const r = randInt(1, 3);
  if (r === 1) {
    const total = randInt(2, 8);
    const part = randInt(1, total - 1);
    return {
      content: `把一个整体平均分成${total}份，取其中${part}份，用分数表示是（ ）`,
      answer: `${part}/${total}`,
      type: '分数意义',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const total = randInt(4, 12);
    const part = randInt(1, total - 1);
    return {
      content: `${part}/${total}表示把整体平均分成（ ）份，取其中（ ）份`,
      answer: `${total}份、${part}份`,
      type: '分数意义',
      difficulty: 1,
    };
  }
  const total = randInt(3, 10);
  const part = randInt(1, total - 1);
  return {
    content: `一个班有${total}人，其中${part}人是女生，女生占全班的（ ）`,
    answer: `${part}/${total}`,
    type: '分数应用',
    difficulty: 1,
  };
}

// 分数的读写
export function genFractionReadWrite() {
  const r = randInt(1, 2);
  if (r === 1) {
    const denominators = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const d = pick(denominators);
    const n = randInt(1, d - 1);
    return {
      content: `${n}/${d}读作（ ）`,
      answer: `${d}分之${n}`,
      type: '分数读法',
      difficulty: 1,
    };
  }
  const denominators = [2, 3, 4, 5, 6, 8, 10];
  const d = pick(denominators);
  const n = randInt(1, d - 1);
  const names = ['二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const nNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return {
    content: `${names[d - 2]}分之${nNames[n - 1]}写作（ ）`,
    answer: `${n}/${d}`,
    type: '分数写法',
    difficulty: 1,
  };
}

// 同分母分数比较
export function genFractionCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const d = randInt(3, 10);
    const a = randInt(1, d - 1);
    let b = randInt(1, d - 1);
    while (b === a) b = randInt(1, d - 1);
    return {
      content: `${a}/${d} ○ ${b}/${d}（填 >、< 或 =）`,
      answer: a > b ? '>' : '<',
      type: '同分母比较',
      difficulty: 1,
    };
  }
  const d = randInt(4, 12);
  const a = randInt(1, d - 1);
  const b = randInt(1, d - 1);
  const c = randInt(1, d - 1);
  const fracs = [
    [a, d],
    [b, d],
    [c, d],
  ].sort((x, y) => x[0] - y[0]);
  return {
    content: `将${a}/${d}、${b}/${d}、${c}/${d}从小到大排列：`,
    answer: fracs.map(f => `${f[0]}/${f[1]}`).join('<'),
    type: '分数排序',
    difficulty: 2,
  };
}

// 异分母分数比较
export function genFractionCompareDiff() {
  const d1 = pick([2, 3, 4, 6, 8, 12]);
  const d2 = pick([2, 3, 4, 6, 8, 12]);
  if (d1 === d2) return genFractionCompareDiff();
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const v1 = n1 / d1;
  const v2 = n2 / d2;
  return {
    content: `${n1}/${d1} ○ ${n2}/${d2}（填 >、< 或 =）`,
    answer: v1 > v2 ? '>' : v1 < v2 ? '<' : '=',
    type: '异分母比较',
    difficulty: 2,
  };
}

// 同分母分数加法
export function genFractionAdd() {
  const d = pick([3, 4, 5, 6, 7, 8, 9, 10]);
  const a = randInt(1, d - 2);
  const b = randInt(1, d - a - 1);
  const sum = a + b;
  return {
    content: `${a}/${d} + ${b}/${d} = ?`,
    answer: sum < d ? `${sum}/${d}` : `${Math.floor(sum / d)}又${sum % d}/${d}`,
    type: '同分母加法',
    difficulty: 1,
  };
}

// 同分母分数减法
export function genFractionSub() {
  const d = pick([3, 4, 5, 6, 7, 8, 9, 10]);
  const a = randInt(2, d - 1);
  const b = randInt(1, a - 1);
  return {
    content: `${a}/${d} - ${b}/${d} = ?`,
    answer: `${a - b}/${d}`,
    type: '同分母减法',
    difficulty: 1,
  };
}

// 分数墙
export function genFractionWall() {
  const r = randInt(1, 3);
  if (r === 1) {
    return {
      content: '1/2 + 1/2 = ?（提示：用整数表示）',
      answer: '1',
      type: '分数墙',
      difficulty: 1,
    };
  }
  if (r === 2) {
    return {
      content: '1/4 + 1/4 + 1/4 + 1/4 = ?（提示：用整数表示）',
      answer: '1',
      type: '分数墙',
      difficulty: 1,
    };
  }
  const d = pick([3, 4, 5, 6, 8]);
  return { content: `${d}个1/${d}相加等于（ ）`, answer: '1', type: '分数墙', difficulty: 1 };
}

// 真分数与假分数
export function genTrueFalseFraction() {
  const r = randInt(1, 2);
  if (r === 1) {
    const d = pick([3, 4, 5, 6, 7, 8]);
    const n = randInt(1, d - 1);
    return {
      content: `${n}/${d}是（ ）分数（填"真"或"假"）`,
      answer: '真',
      type: '真分数',
      difficulty: 1,
    };
  }
  const d = pick([3, 4, 5, 6]);
  const n = randInt(d, d * 2);
  return {
    content: `${n}/${d}是（ ）分数（填"真"或"假"）`,
    answer: '假',
    type: '假分数',
    difficulty: 1,
  };
}

// 分数与除法关系
export function genFractionDivision() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 9);
    const b = randInt(2, 10);
    return {
      content: `${a} ÷ ${b} = ( )/( )`,
      answer: `${a}/${b}`,
      type: '分数除法',
      difficulty: 1,
    };
  }
  const d = randInt(2, 10);
  const n = randInt(1, d - 1);
  return {
    content: `${n}/${d} = ( ) ÷ ( )`,
    answer: `${n} ÷ ${d}`,
    type: '除法分数',
    difficulty: 1,
  };
}

// ============ 第四章：工作效率问题 ============

// 工作效率×时间=工作量
export function genWorkEfficiency() {
  const r = randInt(1, 3);
  if (r === 1) {
    const efficiency = randInt(5, 20);
    const time = randInt(2, 8);
    return {
      content: `工作效率为每小时完成${efficiency}个，工作${time}小时，完成的工作量是（ ）`,
      answer: String(efficiency * time),
      type: '求工作量',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const total = randInt(20, 100);
    const time = randInt(2, 8);
    if (total % time !== 0) return genWorkEfficiency();
    return {
      content: `完成${total}个零件用了${time}小时，每小时完成（ ）个`,
      answer: String(total / time),
      type: '求效率',
      difficulty: 1,
    };
  }
  const efficiency = randInt(5, 20);
  const total = efficiency * randInt(3, 8);
  return {
    content: `每小时完成${efficiency}个，要完成${total}个，需要（ ）小时`,
    answer: String(total / efficiency),
    type: '求时间',
    difficulty: 1,
  };
}

// 效率比较
export function genEfficiencyCompare() {
  const a = randInt(5, 15);
  const b = randInt(5, 15);
  const time = randInt(2, 5);
  const workA = a * time;
  const workB = b * time;
  return {
    content: `甲每小时做${a}个零件，乙每小时做${b}个零件，各做${time}小时，甲比乙多做（ ）个`,
    answer: String(workA - workB),
    type: '效率比较',
    difficulty: 2,
  };
}

// 合作问题
export function genCooperation() {
  const a = randInt(5, 15);
  const b = randInt(5, 15);
  const time = randInt(2, 4);
  return {
    content: `甲每小时做${a}个，乙每小时做${b}个，两人合作${time}小时，共做（ ）个`,
    answer: String((a + b) * time),
    type: '合作问题',
    difficulty: 2,
  };
}

// 效率变化
export function genEfficiencyChange() {
  const base = randInt(8, 20);
  const increase = randInt(2, 5);
  const time = randInt(2, 5);
  return {
    content: `原来每小时做${base}个零件，改进后每小时多做${increase}个，改进后${time}小时做（ ）个`,
    answer: String((base + increase) * time),
    type: '效率变化',
    difficulty: 2,
  };
}

// 总工作量分配
export function genWorkDistribution() {
  const total = randInt(60, 200);
  const time = randInt(3, 8);
  if (total % time !== 0) return genWorkDistribution();
  const perHour = total / time;
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `一批货物共${total}吨，${time}天运完，平均每天运（ ）吨`,
      answer: String(perHour),
      type: '平均分配',
      difficulty: 1,
    };
  }
  return {
    content: `要生产${total}个零件，每小时生产${perHour}个，需要（ ）小时`,
    answer: String(time),
    type: '求时间',
    difficulty: 1,
  };
}

// ============ 第五章：逆推 ============

// 基本逆推
export function genBasicReverse() {
  const r = randInt(1, 4);
  if (r === 1) {
    const ans = randInt(5, 30);
    const add = randInt(3, 15);
    const result = ans + add;
    return {
      content: `一个数加上${add}等于${result}，这个数是（ ）`,
      answer: String(ans),
      type: '逆推加法',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const ans = randInt(10, 50);
    const sub = randInt(3, ans - 1);
    const result = ans - sub;
    return {
      content: `一个数减去${sub}等于${result}，这个数是（ ）`,
      answer: String(ans),
      type: '逆推减法',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const ans = randInt(2, 12);
    const mul = randInt(2, 5);
    const result = ans * mul;
    return {
      content: `一个数乘以${mul}等于${result}，这个数是（ ）`,
      answer: String(ans),
      type: '逆推乘法',
      difficulty: 1,
    };
  }
  const mul = randInt(2, 6);
  const ans = randInt(3, 15);
  const result = ans * mul;
  return {
    content: `一个数除以${mul}等于${ans}，这个数是（ ）`,
    answer: String(result),
    type: '逆推除法',
    difficulty: 1,
  };
}

// 两步逆推
export function genTwoStepReverse() {
  const r = randInt(1, 4);
  if (r === 1) {
    const x = randInt(5, 20);
    const a = randInt(3, 10);
    const b = randInt(2, 8);
    const result = (x + a) * b;
    return {
      content: `一个数加上${a}，再乘以${b}，结果是${result}，这个数是（ ）`,
      answer: String(x),
      type: '两步逆推',
      difficulty: 2,
    };
  }
  if (r === 2) {
    const x = randInt(10, 50);
    const a = randInt(3, 15);
    const b = randInt(2, 5);
    const result = (x - a) * b;
    return {
      content: `一个数减去${a}，再乘以${b}，结果是${result}，这个数是（ ）`,
      answer: String(x),
      type: '两步逆推',
      difficulty: 2,
    };
  }
  if (r === 3) {
    const x = randInt(2, 10);
    const a = randInt(2, 5);
    const b = randInt(3, 10);
    const result = x * a + b;
    return {
      content: `一个数乘以${a}，再加上${b}，结果是${result}，这个数是（ ）`,
      answer: String(x),
      type: '两步逆推',
      difficulty: 2,
    };
  }
  const x = randInt(3, 12);
  const a = randInt(2, 5);
  const b = randInt(2, 10);
  const result = x * a - b;
  return {
    content: `一个数乘以${a}，再减去${b}，结果是${result}，这个数是（ ）`,
    answer: String(x),
    type: '两步逆推',
    difficulty: 2,
  };
}

// 逆推填表
export function genReverseTable() {
  const x = randInt(5, 30);
  const a = randInt(3, 10);
  const b = randInt(2, 6);
  return {
    content: `按照规则：先加${a}，再乘${b}，得到${(x + a) * b}，原数是（ ）`,
    answer: String(x),
    type: '逆推填表',
    difficulty: 2,
  };
}

// 逆推还原
export function genReverseRestore() {
  const x = randInt(10, 50);
  const half = x / 2;
  if (!Number.isInteger(half)) return genReverseRestore();
  const add = randInt(5, 15);
  const result = half + add;
  return {
    content: `小明有一些钱，花掉一半后又花了${add}元，还剩${result - add}元，原来有（ ）元`,
    answer: String(x),
    type: '逆推还原',
    difficulty: 2,
  };
}

// ============ 第六章：圆的初步认识 ============

// 圆的基本概念
export function genCircleBasic() {
  const r = randInt(1, 5);
  if (r === 1)
    return { content: '圆中心的一点叫做（ ）', answer: '圆心', type: '圆的认识', difficulty: 1 };
  if (r === 2)
    return {
      content: '连接圆心和圆上任意一点的线段叫做（ ）',
      answer: '半径',
      type: '圆的认识',
      difficulty: 1,
    };
  if (r === 3)
    return {
      content: '通过圆心并且两端都在圆上的线段叫做（ ）',
      answer: '直径',
      type: '圆的认识',
      difficulty: 1,
    };
  if (r === 4)
    return {
      content: '在同一个圆里，直径的长度是半径的（ ）倍',
      answer: '2',
      type: '圆的认识',
      difficulty: 1,
    };
  return {
    content: '在同一个圆里，半径的长度是直径的（ ）',
    answer: '一半',
    type: '圆的认识',
    difficulty: 1,
  };
}

// 半径直径关系
export function genRadiusDiameter() {
  const r = randInt(1, 2);
  if (r === 1) {
    const radius = randInt(1, 10);
    return {
      content: `一个圆的半径是${radius}厘米，直径是（ ）厘米`,
      answer: String(radius * 2),
      type: '求直径',
      difficulty: 1,
    };
  }
  const diameter = randInt(2, 20);
  if (diameter % 2 !== 0) return genRadiusDiameter();
  return {
    content: `一个圆的直径是${diameter}厘米，半径是（ ）厘米`,
    answer: String(diameter / 2),
    type: '求半径',
    difficulty: 1,
  };
}

// 圆的对称性
export function genCircleSymmetry() {
  const r = randInt(1, 2);
  if (r === 1)
    return { content: '圆有（ ）条对称轴', answer: '无数', type: '圆的对称', difficulty: 1 };
  return {
    content: '圆的任意一条（ ）都是对称轴',
    answer: '直径',
    type: '圆的对称',
    difficulty: 1,
  };
}

// 画圆
export function genDrawCircle() {
  const r = randInt(1, 2);
  if (r === 1)
    return {
      content: '画圆时，圆规两脚之间的距离决定了圆的（ ）',
      answer: '大小',
      type: '画圆',
      difficulty: 1,
    };
  return {
    content: '用圆规画圆时，针尖固定的一点是圆的（ ）',
    answer: '圆心',
    type: '画圆',
    difficulty: 1,
  };
}

// 圆与其他图形
export function genCircleCompare() {
  const questions = [
    { content: '正方形有（ ）条对称轴，圆有（ ）条对称轴', answer: '4,无数', type: '图形比较' },
    { content: '长方形有（ ）条对称轴，圆有（ ）条对称轴', answer: '2,无数', type: '图形比较' },
    { content: '圆和正方形相比，（ ）的对称轴更多', answer: '圆', type: '图形比较' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// ============ 第七章：线段、射线、直线 ============

// 线段射线直线认识
export function genLineTypes() {
  const questions = [
    { content: '线段有（ ）个端点', answer: '2', type: '线段认识' },
    { content: '射线有（ ）个端点', answer: '1', type: '射线认识' },
    { content: '直线有（ ）个端点', answer: '0', type: '直线认识' },
    { content: '（ ）可以度量长度', answer: '线段', type: '线段特征' },
    { content: '（ ）不可以度量长度', answer: '射线和直线', type: '线段特征' },
    { content: '（ ）可以向两端无限延伸', answer: '直线', type: '直线特征' },
    { content: '（ ）可以向一端无限延伸', answer: '射线', type: '射线特征' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 线段计数
export function genLineSegmentCount() {
  const r = randInt(1, 2);
  if (r === 1) {
    const n = randInt(2, 4);
    const count = (n * (n - 1)) / 2;
    return {
      content: `一条直线上有${n}个点，一共有（ ）条线段`,
      answer: String(count),
      type: '线段计数',
      difficulty: 2,
    };
  }
  const n = randInt(3, 5);
  const count = (n * (n + 1)) / 2;
  return {
    content: `一条线段上有${n}个等分点（包括两端），一共有（ ）条线段`,
    answer: String(count),
    type: '线段计数',
    difficulty: 2,
  };
}

// 线段长度
export function genLineSegmentLength() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    return {
      content: `一条线段长${a}厘米，另一条线段长${b}厘米，两条线段一共长（ ）厘米`,
      answer: String(a + b),
      type: '线段加法',
      difficulty: 1,
    };
  }
  const a = randInt(5, 20);
  const b = randInt(2, a - 1);
  return {
    content: `一条线段长${a}厘米，另一条线段长${b}厘米，长的比短的长（ ）厘米`,
    answer: String(a - b),
    type: '线段减法',
    difficulty: 1,
  };
}

// 两点之间
export function genTwoPoints() {
  const questions = [
    { content: '两点之间（ ）最短', answer: '线段', type: '两点之间' },
    { content: '经过一点可以画（ ）条直线', answer: '无数', type: '直线性质' },
    { content: '经过两点可以画（ ）条直线', answer: '1', type: '直线性质' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 角与线
export function genAngleLine() {
  const questions = [
    { content: '从一点引出两条（ ）所组成的图形叫做角', answer: '射线', type: '角的认识' },
    { content: '角的两条边是两条（ ）', answer: '射线', type: '角的认识' },
    { content: '一个直角是（ ）度', answer: '90', type: '角的度数' },
    { content: '一个平角是（ ）度', answer: '180', type: '角的度数' },
    { content: '一个周角是（ ）度', answer: '360', type: '角的度数' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// ============ 第八章：毫升与升 ============

// 容量单位认识
export function genCapacityBasic() {
  const questions = [
    { content: '计量液体的多少，通常用（ ）和（ ）作单位', answer: '毫升、升', type: '容量单位' },
    { content: '1升 = （ ）毫升', answer: '1000', type: '容量换算' },
    { content: '一个水杯大约能装水200（ ）', answer: '毫升', type: '容量估计' },
    { content: '一个热水瓶大约能装水2（ ）', answer: '升', type: '容量估计' },
    { content: '一瓶矿泉水大约是500（ ）', answer: '毫升', type: '容量估计' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 容量换算
export function genCapacityConvert() {
  const r = randInt(1, 3);
  if (r === 1) {
    const L = randInt(1, 10);
    return {
      content: `${L}升 = （ ）毫升`,
      answer: String(L * 1000),
      type: '升转毫升',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const mL = randInt(1, 10) * 1000;
    return {
      content: `${mL}毫升 = （ ）升`,
      answer: String(mL / 1000),
      type: '毫升转升',
      difficulty: 1,
    };
  }
  const L = randInt(1, 5);
  const mL = randInt(100, 900);
  return {
    content: `${L}升${mL}毫升 = （ ）毫升`,
    answer: String(L * 1000 + mL),
    type: '复合换算',
    difficulty: 2,
  };
}

// 容量比较
export function genCapacityCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 5);
    const b = randInt(1000, 5000);
    return {
      content: `${a}升 ○ ${b}毫升（填 >、< 或 =）`,
      answer: a * 1000 > b ? '>' : a * 1000 < b ? '<' : '=',
      type: '容量比较',
      difficulty: 1,
    };
  }
  const a = randInt(1, 3);
  const b = randInt(500, 2500);
  return {
    content: `${a}升${b}毫升 ○ ${a * 1000 + b}毫升（填 >、< 或 =）`,
    answer: '=',
    type: '容量比较',
    difficulty: 2,
  };
}

// 容量加减
export function genCapacityCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 3);
    const b = randInt(200, 800);
    return {
      content: `一瓶水有${a}升${b}毫升，喝掉${b}毫升，还剩（ ）毫升`,
      answer: String(a * 1000),
      type: '容量减法',
      difficulty: 2,
    };
  }
  const a = randInt(500, 2000);
  const b = randInt(500, 2000);
  return {
    content: `一杯水${a}毫升，另一杯水${b}毫升，两杯一共（ ）毫升`,
    answer: String(a + b),
    type: '容量加法',
    difficulty: 1,
  };
}

// 容量应用
export function genCapacityApp() {
  const r = randInt(1, 2);
  if (r === 1) {
    const per = randInt(200, 500);
    const times = randInt(2, 5);
    return {
      content: `每次喝${per}毫升水，一天喝${times}次，一天共喝（ ）毫升`,
      answer: String(per * times),
      type: '容量乘法',
      difficulty: 1,
    };
  }
  const total = randInt(1000, 3000);
  const per = randInt(200, 500);
  const times = total / per;
  if (!Number.isInteger(times)) return genCapacityApp();
  return {
    content: `一瓶${total}毫升的水，每次喝${per}毫升，可以喝（ ）次`,
    answer: String(times),
    type: '容量除法',
    difficulty: 1,
  };
}

// ============ 第九章：吨的认识 ============

// 吨的认识
export function genTonBasic() {
  const questions = [
    { content: '计量较重的物品，通常用（ ）作单位', answer: '吨', type: '吨的认识' },
    { content: '1吨 = （ ）千克', answer: '1000', type: '吨的换算' },
    { content: '一头大象大约重4（ ）', answer: '吨', type: '吨的估计' },
    { content: '一辆卡车的载重量大约是5（ ）', answer: '吨', type: '吨的估计' },
    { content: '一个三年级学生的体重大约是30（ ）', answer: '千克', type: '质量单位选择' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 吨与千克换算
export function genTonConvert() {
  const r = randInt(1, 3);
  if (r === 1) {
    const t = randInt(1, 10);
    return {
      content: `${t}吨 = （ ）千克`,
      answer: String(t * 1000),
      type: '吨转千克',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const kg = randInt(1, 10) * 1000;
    return {
      content: `${kg}千克 = （ ）吨`,
      answer: String(kg / 1000),
      type: '千克转吨',
      difficulty: 1,
    };
  }
  const t = randInt(1, 5);
  const kg = randInt(100, 900);
  return {
    content: `${t}吨${kg}千克 = （ ）千克`,
    answer: String(t * 1000 + kg),
    type: '复合换算',
    difficulty: 2,
  };
}

// 吨的比较
export function genTonCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 10);
    const b = randInt(500, 9000);
    return {
      content: `${a}吨 ○ ${b}千克（填 >、< 或 =）`,
      answer: a * 1000 > b ? '>' : a * 1000 < b ? '<' : '=',
      type: '质量比较',
      difficulty: 1,
    };
  }
  const a = randInt(1, 5);
  const b = randInt(200, 800);
  return {
    content: `${a}吨${b}千克 ○ ${a * 1000 + b + 1}千克（填 >、< 或 =）`,
    answer: '<',
    type: '质量比较',
    difficulty: 2,
  };
}

// 吨的加减
export function genTonCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 8);
    const b = randInt(1, a - 1);
    return {
      content: `一堆沙子${a}吨，运走${b}吨，还剩（ ）吨`,
      answer: String(a - b),
      type: '吨的减法',
      difficulty: 1,
    };
  }
  const a = randInt(2, 5);
  const b = randInt(2, 5);
  return {
    content: `仓库有大米${a}吨，面粉${b}吨，一共有（ ）吨`,
    answer: String(a + b),
    type: '吨的加法',
    difficulty: 1,
  };
}

// 吨的乘除
export function genTonMulDiv() {
  const r = randInt(1, 2);
  if (r === 1) {
    const per = randInt(2, 5);
    const count = randInt(3, 6);
    return {
      content: `每辆车装${per}吨货物，${count}辆车共装（ ）吨`,
      answer: String(per * count),
      type: '吨的乘法',
      difficulty: 1,
    };
  }
  const total = randInt(10, 50);
  const per = randInt(2, 5);
  if (total % per !== 0) return genTonMulDiv();
  return {
    content: `${total}吨货物，每辆车装${per}吨，需要（ ）辆车`,
    answer: String(total / per),
    type: '吨的除法',
    difficulty: 1,
  };
}

// ============ 第十章：平方千米 ============

// 平方千米认识
export function genSqKmBasic() {
  const questions = [
    { content: '计量大面积的土地，通常用（ ）作单位', answer: '平方千米', type: '面积单位' },
    { content: '1平方千米 = （ ）平方米', answer: '1000000', type: '面积换算' },
    { content: '1平方千米 = （ ）公顷', answer: '100', type: '面积换算' },
    { content: '1公顷 = （ ）平方米', answer: '10000', type: '面积换算' },
    { content: '一个足球场的面积大约是1（ ）', answer: '公顷', type: '面积估计' },
    { content: '一个城市的面积大约是100（ ）', answer: '平方千米', type: '面积估计' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 面积换算
export function genSqKmConvert() {
  const r = randInt(1, 4);
  if (r === 1) {
    const sqkm = randInt(1, 10);
    return {
      content: `${sqkm}平方千米 = （ ）公顷`,
      answer: String(sqkm * 100),
      type: '平方千米转公顷',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const ha = randInt(1, 10) * 100;
    return {
      content: `${ha}公顷 = （ ）平方千米`,
      answer: String(ha / 100),
      type: '公顷转平方千米',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const ha = randInt(1, 10);
    return {
      content: `${ha}公顷 = （ ）平方米`,
      answer: String(ha * 10000),
      type: '公顷转平方米',
      difficulty: 1,
    };
  }
  const sqm = randInt(1, 10) * 10000;
  return {
    content: `${sqm}平方米 = （ ）公顷`,
    answer: String(sqm / 10000),
    type: '平方米转公顷',
    difficulty: 1,
  };
}

// 面积比较
export function genSqKmCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 10);
    const b = randInt(50, 500);
    return {
      content: `${a}平方千米 ○ ${b}公顷（填 >、< 或 =）`,
      answer: a * 100 > b ? '>' : a * 100 < b ? '<' : '=',
      type: '面积比较',
      difficulty: 1,
    };
  }
  const a = randInt(1, 10);
  const b = randInt(1000, 90000);
  return {
    content: `${a}公顷 ○ ${b}平方米（填 >、< 或 =）`,
    answer: a * 10000 > b ? '>' : a * 10000 < b ? '<' : '=',
    type: '面积比较',
    difficulty: 1,
  };
}

// 面积计算
export function genSqKmCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const l = randInt(100, 1000);
    const w = randInt(100, 1000);
    return {
      content: `一块长方形土地，长${l}米，宽${w}米，面积是（ ）平方米`,
      answer: String(l * w),
      type: '面积计算',
      difficulty: 2,
    };
  }
  const s = randInt(100, 500);
  return {
    content: `一块正方形土地，边长${s}米，面积是（ ）平方米`,
    answer: String(s * s),
    type: '面积计算',
    difficulty: 2,
  };
}

// 综合面积
export function genAreaComprehensive() {
  const sqkm = randInt(1, 5);
  const ha = randInt(1, 99);
  return {
    content: `${sqkm}平方千米${ha}公顷 = （ ）公顷`,
    answer: String(sqkm * 100 + ha),
    type: '复合面积',
    difficulty: 2,
  };
}

// ============ 第十一章：小数的认识与加减法 ============

// 小数意义
export function genDecimalMeaning() {
  const r = randInt(1, 3);
  if (r === 1) {
    const tenth = randInt(1, 9);
    return {
      content: `${tenth}/10用小数表示是（ ）`,
      answer: `0.${tenth}`,
      type: '小数意义',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const hundredth = randInt(1, 99);
    return {
      content: `${hundredth}/100用小数表示是（ ）`,
      answer: `${Math.floor(hundredth / 10)}.${hundredth % 10}`,
      type: '小数意义',
      difficulty: 1,
    };
  }
  const num = randInt(1, 9);
  const tenth = randInt(1, 9);
  return {
    content: `${num}个1和${tenth}个0.1组成的小数是（ ）`,
    answer: `${num}.${tenth}`,
    type: '小数组成',
    difficulty: 1,
  };
}

// 小数读写
export function genDecimalReadWrite() {
  const r = randInt(1, 2);
  if (r === 1) {
    const whole = randInt(0, 99);
    const tenth = randInt(0, 9);
    const hundredth = randInt(0, 9);
    return {
      content: `${whole}.${tenth}${hundredth}读作（ ）`,
      answer: `${whole}点${tenth}${hundredth}`,
      type: '小数读法',
      difficulty: 1,
    };
  }
  const whole = randInt(0, 99);
  const tenth = randInt(0, 9);
  const hundredth = randInt(0, 9);
  return {
    content: `${whole}点${tenth}${hundredth}写作（ ）`,
    answer: `${whole}.${tenth}${hundredth}`,
    type: '小数写法',
    difficulty: 1,
  };
}

// 小数数位
export function genDecimalPlace() {
  const whole = randInt(1, 99);
  const tenth = randInt(0, 9);
  const hundredth = randInt(0, 9);
  const num = `${whole}.${tenth}${hundredth}`;
  const r = randInt(1, 3);
  if (r === 1)
    return {
      content: `${num}中，${tenth}在（ ）位上`,
      answer: '十分',
      type: '小数数位',
      difficulty: 1,
    };
  if (r === 2)
    return {
      content: `${num}中，${hundredth}在（ ）位上`,
      answer: '百分',
      type: '小数数位',
      difficulty: 1,
    };
  return {
    content: `${num}中，${whole}在（ ）位上`,
    answer: '个',
    type: '小数数位',
    difficulty: 1,
  };
}

// 小数比较
export function genDecimalCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 9) + randInt(1, 9) / 10;
    const b = randInt(1, 9) + randInt(1, 9) / 10;
    if (a === b) return genDecimalCompare();
    return {
      content: `${a.toFixed(1)} ○ ${b.toFixed(1)}（填 >、< 或 =）`,
      answer: a > b ? '>' : '<',
      type: '小数比较',
      difficulty: 1,
    };
  }
  const nums = Array.from({ length: 3 }, () => (randInt(1, 99) / 10).toFixed(1));
  const sorted = [...nums].sort((a, b) => parseFloat(a) - parseFloat(b));
  return {
    content: `将${nums.join('、')}从小到大排列：`,
    answer: sorted.join('<'),
    type: '小数排序',
    difficulty: 2,
  };
}

// 小数加法
export function genDecimalAdd() {
  const a = randInt(1, 99) / 10;
  const b = randInt(1, 99) / 10;
  const sum = (a + b).toFixed(1);
  return {
    content: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`,
    answer: sum,
    type: '小数加法',
    difficulty: 1,
  };
}

// 小数减法
export function genDecimalSub() {
  const a = randInt(20, 99) / 10;
  const b = randInt(1, Math.floor(a * 10 - 1)) / 10;
  const diff = (a - b).toFixed(1);
  return {
    content: `${a.toFixed(1)} - ${b.toFixed(1)} = ?`,
    answer: diff,
    type: '小数减法',
    difficulty: 1,
  };
}

// 小数加减混合
export function genDecimalMixed() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(10, 50) / 10;
    const b = randInt(10, 50) / 10;
    const c = randInt(5, 30) / 10;
    return {
      content: `${a.toFixed(1)} + ${b.toFixed(1)} - ${c.toFixed(1)} = ?`,
      answer: (a + b - c).toFixed(1),
      type: '小数混合',
      difficulty: 2,
    };
  }
  const a = randInt(50, 99) / 10;
  const b = randInt(10, 40) / 10;
  const c = randInt(10, 30) / 10;
  return {
    content: `${a.toFixed(1)} - ${b.toFixed(1)} + ${c.toFixed(1)} = ?`,
    answer: (a - b + c).toFixed(1),
    type: '小数混合',
    difficulty: 2,
  };
}

// ============ 第十二章：小数乘法 ============

// 小数乘整数
export function genDecimalMulInt() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 9) / 10;
    const b = randInt(2, 9);
    return {
      content: `${a.toFixed(1)} × ${b} = ?`,
      answer: (a * b).toFixed(1),
      type: '小数乘整数',
      difficulty: 1,
    };
  }
  const a = randInt(10, 99) / 10;
  const b = randInt(2, 5);
  return {
    content: `${a.toFixed(1)} × ${b} = ?`,
    answer: (a * b).toFixed(1),
    type: '小数乘整数',
    difficulty: 2,
  };
}

// 小数乘小数
export function genDecimalMulDecimal() {
  const a = randInt(1, 9) / 10;
  const b = randInt(1, 9) / 10;
  return {
    content: `${a.toFixed(1)} × ${b.toFixed(1)} = ?`,
    answer: (a * b).toFixed(2),
    type: '小数乘小数',
    difficulty: 2,
  };
}

// 积的近似值
export function genDecimalMulApprox() {
  const a = randInt(10, 99) / 10;
  const b = randInt(2, 5);
  const product = a * b;
  const approx = Math.round(product * 10) / 10;
  return {
    content: `${a.toFixed(1)} × ${b}的积保留一位小数约是（ ）`,
    answer: approx.toFixed(1),
    type: '积的近似值',
    difficulty: 2,
  };
}

// 小数乘法简便
export function genDecimalMulQuick() {
  const a = randInt(1, 9) / 10;
  const b = randInt(2, 8);
  const c = randInt(2, 8);
  return {
    content: `${a.toFixed(1)} × ${b} × ${c} = ${a.toFixed(1)} × (${b} × ${c}) = ?`,
    answer: (a * b * c).toFixed(1),
    type: '结合律简便',
    difficulty: 2,
  };
}

// 小数乘法应用
export function genDecimalMulApp() {
  const price = randInt(10, 99) / 10;
  const count = randInt(2, 5);
  return {
    content: `每支笔${price.toFixed(1)}元，买${count}支需要（ ）元`,
    answer: (price * count).toFixed(1),
    type: '小数乘法应用',
    difficulty: 1,
  };
}

// ============ 第十三章：小数除法 ============

// 小数除以整数
export function genDecimalDivInt() {
  const r = randInt(1, 2);
  if (r === 1) {
    const divisor = randInt(2, 5);
    const quotient = randInt(1, 9) / 10;
    const dividend = quotient * divisor;
    return {
      content: `${dividend.toFixed(1)} ÷ ${divisor} = ?`,
      answer: quotient.toFixed(1),
      type: '小数除以整数',
      difficulty: 1,
    };
  }
  const divisor = randInt(2, 5);
  const quotient = randInt(10, 99) / 10;
  const dividend = quotient * divisor;
  return {
    content: `${dividend.toFixed(1)} ÷ ${divisor} = ?`,
    answer: quotient.toFixed(1),
    type: '小数除以整数',
    difficulty: 2,
  };
}

// 小数除以小数
export function genDecimalDivDecimal() {
  const divisor = randInt(2, 9) / 10;
  const quotient = randInt(1, 9);
  const dividend = quotient * divisor;
  return {
    content: `${dividend.toFixed(1)} ÷ ${divisor.toFixed(1)} = ?`,
    answer: String(quotient),
    type: '小数除以小数',
    difficulty: 2,
  };
}

// 商的近似值
export function genDecimalDivApprox() {
  const divisor = randInt(2, 7);
  const dividend = randInt(10, 99);
  const quotient = dividend / divisor;
  const approx = Math.round(quotient * 100) / 100;
  return {
    content: `${dividend} ÷ ${divisor}的商保留两位小数约是（ ）`,
    answer: approx.toFixed(2),
    type: '商的近似值',
    difficulty: 2,
  };
}

// 循环小数判断
export function genDecimalRepeat() {
  const divisor = pick([3, 6, 7, 9, 11, 12]);
  const dividend = randInt(1, 20);
  const quotient = dividend / divisor;
  const isRepeating = !Number.isFinite(quotient);
  return {
    content: `${dividend} ÷ ${divisor}的结果是（ ）小数`,
    answer: isRepeating ? '循环' : '有限',
    type: '循环小数',
    difficulty: 2,
  };
}

// 小数除法应用
export function genDecimalDivApp() {
  const total = randInt(20, 100) / 10;
  const count = randInt(2, 5);
  return {
    content: `${total.toFixed(1)}千克糖果平均分给${count}人，每人分到（ ）千克`,
    answer: (total / count).toFixed(1),
    type: '小数除法应用',
    difficulty: 1,
  };
}

// ============ 第十四章：平行与垂直 ============

// 平行线认识
export function genParallel() {
  const questions = [
    { content: '在同一平面内，不相交的两条直线叫做（ ）', answer: '平行线', type: '平行线定义' },
    { content: '平行线之间的距离处处（ ）', answer: '相等', type: '平行线特征' },
    { content: '长方形的对边是（ ）的', answer: '平行', type: '平行应用' },
    { content: '正方形的对边是（ ）的', answer: '平行', type: '平行应用' },
    { content: '平行四边形的对边是（ ）的', answer: '平行', type: '平行应用' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 垂直线认识
export function genPerpendicular() {
  const questions = [
    { content: '两条直线相交成直角，这两条直线互相（ ）', answer: '垂直', type: '垂直定义' },
    { content: '长方形的邻边是互相（ ）的', answer: '垂直', type: '垂直应用' },
    { content: '正方形的邻边是互相（ ）的', answer: '垂直', type: '垂直应用' },
    { content: '从直线外一点到直线的所有线段中，（ ）最短', answer: '垂直线段', type: '垂直性质' },
    { content: '两条互相垂直的直线组成的角是（ ）度', answer: '90', type: '垂直角度' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 平行垂直判断
export function genParallelPerpJudge() {
  const r = randInt(1, 2);
  if (r === 1) {
    const pairs = [
      { q: '黑板的上下两条边', a: '平行' },
      { q: '黑板的上下边和左右边', a: '垂直' },
      { q: '铁轨的两条轨道', a: '平行' },
      { q: '十字路口的两条路', a: '垂直' },
    ];
    const pair = pick(pairs);
    return { content: `${pair.q}互相（ ）`, answer: pair.a, type: '平行垂直判断', difficulty: 1 };
  }
  return {
    content: '如果直线a平行于直线b，直线b平行于直线c，那么直线a（ ）直线c',
    answer: '平行于',
    type: '平行传递',
    difficulty: 2,
  };
}

// 画平行线和垂线
export function genDrawParallelPerp() {
  const questions = [
    { content: '画平行线可以用（ ）和三角尺', answer: '直尺', type: '画平行线' },
    { content: '画垂线可以用（ ）', answer: '三角尺', type: '画垂线' },
    { content: '过直线外一点，能画（ ）条直线与已知直线平行', answer: '1', type: '平行性质' },
    { content: '过直线外一点，能画（ ）条直线与已知直线垂直', answer: '1', type: '垂直性质' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// ============ 第十五章：平行四边形和梯形 ============

// 平行四边形特征
export function genParallelogram() {
  const questions = [
    {
      content: '平行四边形的两组对边分别（ ）且（ ）',
      answer: '平行、相等',
      type: '平行四边形特征',
    },
    { content: '平行四边形有（ ）组对边平行', answer: '2', type: '平行四边形特征' },
    { content: '长方形是特殊的（ ）', answer: '平行四边形', type: '图形关系' },
    { content: '正方形是特殊的（ ）', answer: '长方形', type: '图形关系' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 梯形特征
export function genTrapezoid() {
  const questions = [
    { content: '梯形只有（ ）组对边平行', answer: '1', type: '梯形特征' },
    { content: '梯形平行的一组对边分别叫做（ ）和（ ）', answer: '上底、下底', type: '梯形认识' },
    { content: '梯形不平行的一组对边叫做（ ）', answer: '腰', type: '梯形认识' },
    { content: '两腰相等的梯形叫做（ ）梯形', answer: '等腰', type: '梯形分类' },
    { content: '有一个角是直角的梯形叫做（ ）梯形', answer: '直角', type: '梯形分类' },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 平行四边形面积
export function genParallelogramArea() {
  const base = randInt(3, 15);
  const height = randInt(2, 10);
  return {
    content: `一个平行四边形，底${base}厘米，高${height}厘米，面积是（ ）平方厘米`,
    answer: String(base * height),
    type: '平行四边形面积',
    difficulty: 1,
  };
}

// 梯形面积
export function genTrapezoidArea() {
  const a = randInt(3, 10);
  const b = randInt(a + 2, 20);
  const h = randInt(2, 10);
  const area = ((a + b) * h) / 2;
  return {
    content: `一个梯形，上底${a}厘米，下底${b}厘米，高${h}厘米，面积是（ ）平方厘米`,
    answer: String(area),
    type: '梯形面积',
    difficulty: 2,
  };
}

// 图形面积比较
export function genShapeAreaCompare() {
  const r = randInt(1, 2);
  if (r === 1) {
    const base = randInt(5, 10);
    const h1 = randInt(3, 8);
    const h2 = randInt(3, 8);
    const area1 = base * h1;
    const area2 = base * h2;
    return {
      content: `两个平行四边形等底，高分别是${h1}cm和${h2}cm，面积分别为（ ）cm²和（ ）cm²`,
      answer: `${area1}和${area2}`,
      type: '面积比较',
      difficulty: 1,
    };
  }
  const a = randInt(3, 8);
  const b = randInt(a + 2, 15);
  const h = randInt(3, 8);
  return {
    content: `梯形上底${a}cm，下底${b}cm，高${h}cm，面积是（ ）cm²`,
    answer: String(((a + b) * h) / 2),
    type: '梯形面积',
    difficulty: 2,
  };
}

// ============ 第十六章：统计 ============

// 折线统计图认识
export function genLineChartBasic() {
  const questions = [
    {
      content: '折线统计图不仅能看出数量的多少，还能看出数量的（ ）',
      answer: '变化趋势',
      type: '折线统计图',
    },
    { content: '折线统计图用（ ）的高低表示数量的多少', answer: '点', type: '折线统计图' },
    {
      content: '折线统计图相邻两点之间的线段上升表示数量（ ）',
      answer: '增加',
      type: '折线统计图',
    },
    {
      content: '折线统计图相邻两点之间的线段下降表示数量（ ）',
      answer: '减少',
      type: '折线统计图',
    },
  ];
  return { ...pick(questions), difficulty: 1 };
}

// 读取数据
export function genLineChartRead() {
  const days = ['周一', '周二', '周三', '周四', '周五'];
  const values = Array.from({ length: 5 }, () => randInt(10, 50));
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const maxDay = days[values.indexOf(maxVal)];
  const minDay = days[values.indexOf(minVal)];
  return {
    content: `某校一周用水量统计：${days.map((d, i) => d + values[i] + '吨').join('、')}，用水最多的是（ ），最少的是（ ）`,
    answer: `${maxDay}、${minDay}`,
    type: '读取数据',
    difficulty: 1,
  };
}

// 趋势分析
export function genLineChartTrend() {
  const months = ['1月', '2月', '3月', '4月', '5月'];
  const values = [];
  let v = randInt(20, 40);
  for (let i = 0; i < 5; i++) {
    v += randInt(-5, 8);
    v = Math.max(5, v);
    values.push(v);
  }
  const trend = values[4] > values[0] ? '上升' : values[4] < values[0] ? '下降' : '基本持平';
  return {
    content: `某商品价格变化：${months.map((m, i) => m + values[i] + '元').join('、')}，总体趋势是（ ）`,
    answer: trend,
    type: '趋势分析',
    difficulty: 2,
  };
}

// 计算平均数
export function genLineChartAverage() {
  const count = randInt(4, 6);
  const values = Array.from({ length: count }, () => randInt(10, 50));
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = (sum / count).toFixed(1);
  const labels = ['周一', '周二', '周三', '周四', '周五', '周六'].slice(0, count);
  return {
    content: `${labels.map((l, i) => l + values[i] + '件').join('、')}，平均每天销售（ ）件`,
    answer: avg,
    type: '计算平均',
    difficulty: 2,
  };
}

// 增减分析
export function genLineChartChange() {
  const values = Array.from({ length: 4 }, () => randInt(20, 80));
  const labels = ['第一季度', '第二季度', '第三季度', '第四季度'];
  const diffs = [];
  for (let i = 1; i < values.length; i++) {
    diffs.push(values[i] - values[i - 1]);
  }
  const maxIncrease = Math.max(...diffs);
  const maxIncreaseIdx = diffs.indexOf(maxIncrease);
  return {
    content: `某产品销量：${labels.map((l, i) => l + values[i] + '台').join('、')}，增长最多的是（ ）`,
    answer: labels[maxIncreaseIdx + 1],
    type: '增减分析',
    difficulty: 2,
  };
}
