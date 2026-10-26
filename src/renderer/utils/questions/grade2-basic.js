// 二年级基础计算题 - 每个知识点50道

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============ 第一章：100以内加减法 ============

// 不进位加法
export function genAddNoCarry() {
  const aTen = randInt(1, 8);
  const aUnit = randInt(0, 9);
  const bUnit = randInt(0, 9 - aUnit);
  const bTen = randInt(0, 9 - aTen);
  const numA = aTen * 10 + aUnit;
  const numB = bTen === 0 && bUnit === 0 ? 10 : bTen * 10 + bUnit;
  return {
    content: `${numA} + ${numB} = ?`,
    answer: String(numA + numB),
    type: '不进位加法',
    difficulty: 1,
  };
}

// 进位加法
export function genAddCarry() {
  const aUnit = randInt(2, 9);
  const bUnit = randInt(10 - aUnit, 9);
  const aTen = randInt(1, 8);
  const bTen = randInt(0, 9 - aTen);
  const numA = aTen * 10 + aUnit;
  const numB = bTen * 10 + bUnit;
  return {
    content: `${numA} + ${numB} = ?`,
    answer: String(numA + numB),
    type: '进位加法',
    difficulty: 1,
  };
}

// 不退位减法
export function genSubNoBorrow() {
  const aTen = randInt(1, 9);
  const aUnit = randInt(0, 9);
  const bUnit = randInt(0, aUnit);
  const bTen = randInt(0, aTen);
  const numA = aTen * 10 + aUnit;
  const numB = bTen * 10 + bUnit;
  if (numA <= numB || numB === 0) return genSubNoBorrow();
  return {
    content: `${numA} - ${numB} = ?`,
    answer: String(numA - numB),
    type: '不退位减法',
    difficulty: 1,
  };
}

// 退位减法
export function genSubBorrow() {
  const aTen = randInt(2, 9);
  const aUnit = randInt(0, 5);
  const bTen = randInt(1, aTen - 1);
  const bUnit = randInt(aUnit + 1, 9);
  const numA = aTen * 10 + aUnit;
  const numB = bTen * 10 + bUnit;
  return {
    content: `${numA} - ${numB} = ?`,
    answer: String(numA - numB),
    type: '退位减法',
    difficulty: 1,
  };
}

// 加减混合
export function genAddSubMixed() {
  const r = randInt(1, 3);
  if (r === 1) {
    const a = randInt(10, 50);
    const b = randInt(10, 50);
    const c = randInt(1, 30);
    return {
      content: `${a} + ${b} - ${c} = ?`,
      answer: String(a + b - c),
      type: '加减混合',
      difficulty: 1,
    };
  } else if (r === 2) {
    const a = randInt(50, 99);
    const b = randInt(10, 40);
    const c = randInt(1, 30);
    return {
      content: `${a} - ${b} + ${c} = ?`,
      answer: String(a - b + c),
      type: '加减混合',
      difficulty: 1,
    };
  } else {
    const a = randInt(20, 60);
    const b = randInt(10, 30);
    const c = randInt(10, 30);
    return {
      content: `${a} + ${b} + ${c} = ?`,
      answer: String(a + b + c),
      type: '连加',
      difficulty: 1,
    };
  }
}

// 方框填数
export function genBoxEquation() {
  const r = randInt(1, 3);
  if (r === 1) {
    const x = randInt(1, 50);
    const b = randInt(1, 50);
    return {
      content: `□ + ${b} = ${x + b}, □ = ?`,
      answer: String(x),
      type: '方框填数',
      difficulty: 1,
    };
  } else if (r === 2) {
    const x = randInt(20, 99);
    const b = randInt(1, x - 1);
    return {
      content: `${x} - □ = ${x - b}, □ = ?`,
      answer: String(b),
      type: '方框填数',
      difficulty: 1,
    };
  } else {
    const x = randInt(1, 40);
    const b = randInt(1, 40);
    return {
      content: `□ - ${b} = ${x}, □ = ?`,
      answer: String(x + b),
      type: '方框填数',
      difficulty: 1,
    };
  }
}

// 比大小
export function genCompareAddSub() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(10, 80);
    const b = randInt(10, 80);
    const c = randInt(10, 80);
    const d = randInt(10, 80);
    const left = a + b;
    const right = c + d;
    return {
      content: `${a} + ${b} ○ ${c} + ${d}（填 >、< 或 =）`,
      answer: left > right ? '>' : left < right ? '<' : '=',
      type: '比大小',
      difficulty: 1,
    };
  } else {
    const a = randInt(30, 99);
    const b = randInt(10, a - 10);
    const c = randInt(30, 99);
    const d = randInt(10, c - 10);
    const left = a - b;
    const right = c - d;
    return {
      content: `${a} - ${b} ○ ${c} - ${d}（填 >、< 或 =）`,
      answer: left > right ? '>' : left < right ? '<' : '=',
      type: '比大小',
      difficulty: 1,
    };
  }
}

// ============ 第二章：表内乘法 ============

export function genMulTable(n) {
  const b = randInt(1, 9);
  return { content: `${n} × ${b} = ?`, answer: String(n * b), type: `${n}的乘法`, difficulty: 1 };
}

export function genMulGeneral() {
  const a = randInt(2, 9);
  const b = randInt(1, 9);
  return { content: `${a} × ${b} = ?`, answer: String(a * b), type: '乘法口诀', difficulty: 1 };
}

export function genMulReverse() {
  const a = randInt(2, 9);
  const b = randInt(1, 9);
  return {
    content: `( ) × ${b} = ${a * b}, 括号里填？`,
    answer: String(a),
    type: '乘法逆运算',
    difficulty: 1,
  };
}

export function genMulCompare() {
  const a = randInt(2, 9);
  const b = randInt(1, 9);
  const c = randInt(2, 9);
  const d = randInt(1, 9);
  const left = a * b;
  const right = c * d;
  return {
    content: `${a}×${b} ○ ${c}×${d}（填 >、< 或 =）`,
    answer: left > right ? '>' : left < right ? '<' : '=',
    type: '乘法比大小',
    difficulty: 1,
  };
}

// 倍
export function genTimes() {
  const r = randInt(1, 2);
  const base = randInt(2, 9);
  const times = randInt(2, 5);
  if (r === 1) {
    return {
      content: `${base} 的 ${times} 倍是多少？`,
      answer: String(base * times),
      type: '求几倍',
      difficulty: 1,
    };
  } else {
    return {
      content: `${base * times} 是 ${base} 的几倍？`,
      answer: String(times),
      type: '求倍数',
      difficulty: 1,
    };
  }
}

// 乘加乘减
export function genMulAdd() {
  const a = randInt(2, 7);
  const b = randInt(2, 5);
  const c = randInt(1, 5);
  const r = randInt(1, 2);
  if (r === 1) {
    return {
      content: `${a} × ${b} + ${c} = ?`,
      answer: String(a * b + c),
      type: '乘加',
      difficulty: 1,
    };
  } else {
    return {
      content: `${a} × ${b + 1} - ${c} = ?`,
      answer: String(a * (b + 1) - c),
      type: '乘减',
      difficulty: 1,
    };
  }
}

// ============ 第三章：表内除法 ============

export function genDivTable() {
  const b = randInt(2, 9);
  const ans = randInt(1, 9);
  const a = b * ans;
  return { content: `${a} ÷ ${b} = ?`, answer: String(ans), type: '表内除法', difficulty: 1 };
}

export function genDivWithRemainder() {
  const b = randInt(2, 9);
  const ans = randInt(1, 9);
  const rem = randInt(1, b - 1);
  const a = b * ans + rem;
  return {
    content: `${a} ÷ ${b} = ?`,
    answer: `${ans}……${rem}`,
    type: '有余数除法',
    difficulty: 1,
  };
}

export function genDivReverse() {
  const a = randInt(2, 9);
  const ans = randInt(1, 9);
  const b = a * ans;
  return {
    content: `${b} ÷ ( ) = ${ans}, 括号里填？`,
    answer: String(a),
    type: '除法逆运算',
    difficulty: 1,
  };
}

export function genDivCompare() {
  const b1 = randInt(2, 5);
  const ans1 = randInt(2, 6);
  const b2 = randInt(2, 5);
  const ans2 = randInt(2, 6);
  return {
    content: `${b1 * ans1}÷${b1} ○ ${b2 * ans2}÷${b2}（填 >、< 或 =）`,
    answer: ans1 > ans2 ? '>' : ans1 < ans2 ? '<' : '=',
    type: '除法比大小',
    difficulty: 1,
  };
}

// ============ 第四章：几何 ============

export function genGeometry() {
  const questions = [
    { content: '长方形有几条边？', answer: '4', type: '图形认识' },
    { content: '正方形有几条边？', answer: '4', type: '图形认识' },
    { content: '三角形有几条边？', answer: '3', type: '图形认识' },
    { content: '正方形的四条边长度都（ ）', answer: '相等', type: '图形特征' },
    { content: '一个直角是多少度？', answer: '90', type: '角的认识' },
    { content: '比直角小的角叫什么角？', answer: '锐角', type: '角的认识' },
    { content: '比直角大的角叫什么角？', answer: '钝角', type: '角的认识' },
    { content: '长方形的对边（ ）', answer: '相等', type: '图形特征' },
  ];
  return { ...questions[randInt(0, questions.length - 1)], difficulty: 1 };
}

// ============ 第五章：认识时分 ============

export function genTime() {
  const r = randInt(1, 4);
  if (r === 1)
    return { content: '1小时 = （ ）分钟', answer: '60', type: '时分关系', difficulty: 1 };
  if (r === 2) {
    const h = randInt(1, 12);
    return {
      content: `钟表上时针指向${h}，分针指向12，是（ ）时`,
      answer: String(h),
      type: '读整时',
      difficulty: 1,
    };
  }
  if (r === 3) {
    const h = randInt(1, 12);
    return { content: `${h}时半，分针指向（ ）`, answer: '6', type: '读半时', difficulty: 1 };
  }
  return { content: '半小时 = （ ）分钟', answer: '30', type: '时分换算', difficulty: 1 };
}

// ============ 第六章：千以内数 ============

export function genThousandNumber() {
  const num = randInt(100, 999);
  const r = randInt(1, 3);
  if (r === 1) {
    return {
      content: `${num}是由${Math.floor(num / 100)}个百、${Math.floor(num / 10) % 10}个十和${num % 10}个一组成`,
      answer: '对',
      type: '数的组成',
      difficulty: 1,
    };
  }
  if (r === 2) {
    const digit = randInt(1, 3);
    const names = ['个', '十', '百'];
    const vals = [num % 10, Math.floor(num / 10) % 10, Math.floor(num / 100)];
    return {
      content: `${num}中，${vals[digit - 1]}在（ ）位上`,
      answer: names[digit - 1],
      type: '数位认识',
      difficulty: 1,
    };
  }
  return {
    content: `${num}读作（ ）`,
    answer: `${Math.floor(num / 100)}百${Math.floor(num / 10) % 10 === 0 ? '零' : ''}${Math.floor(num / 10) % 10 === 0 ? '' : (Math.floor(num / 10) % 10) + '十'}${num % 10 === 0 ? '' : num % 10}`,
    type: '读数',
    difficulty: 1,
  };
}

// ============ 第七章：三位数加减法 ============

export function genThreeAdd() {
  const a = randInt(100, 499);
  const b = randInt(100, 999 - a);
  return { content: `${a} + ${b} = ?`, answer: String(a + b), type: '三位数加法', difficulty: 1 };
}

export function genThreeSub() {
  const a = randInt(200, 999);
  const b = randInt(100, a - 1);
  return { content: `${a} - ${b} = ?`, answer: String(a - b), type: '三位数减法', difficulty: 1 };
}

export function genEstimate() {
  const num = randInt(100, 999);
  const rounded = Math.round(num / 100) * 100;
  return { content: `${num} ≈ （ ）`, answer: String(rounded), type: '估算', difficulty: 1 };
}

export function genHundredCalc() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(1, 8) * 100;
    const b = randInt(1, 9 - Math.floor(a / 100)) * 100;
    return { content: `${a} + ${b} = ?`, answer: String(a + b), type: '整百加法', difficulty: 1 };
  }
  const a = randInt(2, 9) * 100;
  const b = randInt(1, Math.floor(a / 100) - 1) * 100;
  return { content: `${a} - ${b} = ?`, answer: String(a - b), type: '整百减法', difficulty: 1 };
}

// ============ 第八章：克与千克 ============

export function genWeight() {
  const r = randInt(1, 3);
  if (r === 1)
    return { content: '1千克 = （ ）克', answer: '1000', type: '重量单位', difficulty: 1 };
  if (r === 2) {
    const kg = randInt(1, 5);
    return {
      content: `${kg}千克 = （ ）克`,
      answer: String(kg * 1000),
      type: '千克换算',
      difficulty: 1,
    };
  }
  const g = randInt(1, 5) * 1000;
  return { content: `${g}克 = （ ）千克`, answer: String(g / 1000), type: '克换算', difficulty: 1 };
}

// ============ 第九章：时分秒 ============

export function genTimeSec() {
  const r = randInt(1, 3);
  if (r === 1) return { content: '1分钟 = （ ）秒', answer: '60', type: '分秒关系', difficulty: 1 };
  if (r === 2)
    return { content: '1小时 = （ ）秒', answer: '3600', type: '时秒关系', difficulty: 1 };
  const h = randInt(1, 12);
  const m = randInt(10, 59);
  return {
    content: `${h}时${m}分，电子表显示（ ）`,
    answer: `${h}:${String(m).padStart(2, '0')}`,
    type: '时间表示',
    difficulty: 1,
  };
}

// ============ 第十章：方向 ============

export function genDirection() {
  const questions = [
    { content: '面向北方时，后面是（ ）方', answer: '南', type: '方向' },
    { content: '面向东方时，左边是（ ）方', answer: '北', type: '方向' },
    { content: '面向南方时，右边是（ ）方', answer: '西', type: '方向' },
    { content: '地图通常是上（ ）下（ ）左西右东', answer: '北南', type: '方向' },
  ];
  return { ...questions[randInt(0, questions.length - 1)], difficulty: 1 };
}

// ============ 第十一章：轴对称 ============

export function genSymmetry() {
  const questions = [
    { content: '正方形有（ ）条对称轴', answer: '4', type: '轴对称' },
    { content: '长方形有（ ）条对称轴', answer: '2', type: '轴对称' },
    { content: '圆有（ ）条对称轴', answer: '无数', type: '轴对称' },
  ];
  return { ...questions[randInt(0, questions.length - 1)], difficulty: 1 };
}

// ============ 第十二章：三角形与四边形 ============

export function genTriangleQuad() {
  const questions = [
    { content: '三角形有（ ）条边，（ ）个角', answer: '3,3', type: '三角形' },
    { content: '三个角都是锐角的三角形是（ ）三角形', answer: '锐角', type: '三角形分类' },
    { content: '有一个直角的三角形是（ ）三角形', answer: '直角', type: '三角形分类' },
    { content: '有一个钝角的三角形是（ ）三角形', answer: '钝角', type: '三角形分类' },
    { content: '四边形有（ ）条边', answer: '4', type: '四边形' },
    { content: '四条边都相等的四边形可能是（ ）', answer: '正方形', type: '四边形分类' },
  ];
  return { ...questions[randInt(0, questions.length - 1)], difficulty: 1 };
}

// ============ 连乘连除 ============

export function genMulDivChain() {
  const r = randInt(1, 2);
  if (r === 1) {
    const a = randInt(2, 5);
    const b = randInt(2, 4);
    return {
      content: `${a} × ${b} × 2 = ?`,
      answer: String(a * b * 2),
      type: '连乘',
      difficulty: 1,
    };
  }
  const b = randInt(2, 4);
  const c = randInt(2, 4);
  const a = b * c * 2;
  return { content: `${a} ÷ ${b} ÷ ${c} = ?`, answer: String(2), type: '连除', difficulty: 1 };
}
