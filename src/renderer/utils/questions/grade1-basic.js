// 一年级基础计算题 - 每个知识点50道

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============ 第一章：10以内的数 ============

// 认识数字
export function genKnowNumber() {
  const num = randInt(1, 10);
  const questions = [
    { content: `${num}后面的一个数是几？`, answer: String(num + 1), type: '认识数字' },
    { content: `${num}前面的一个数是几？`, answer: String(num - 1), type: '认识数字' },
    { content: `从1数到${num}，一共有几个数？`, answer: String(num), type: '数数' },
  ];
  return { ...questions[randInt(0, questions.length - 1)], difficulty: 1 };
}

// 比大小
export function genCompare10() {
  const a = randInt(1, 10);
  const b = randInt(1, 10);
  if (a === b) return genCompare10();
  return {
    content: `${a} ○ ${b}（填 >、< 或 =）`,
    answer: a > b ? '>' : '<',
    type: '比大小',
    solution: `1. 比较${a}和${b}\n2. ${a} ${a > b ? '大于' : '小于'} ${b}\n3. 填 ${a > b ? '>' : '<'}`,
  };
}

// 分与合
export function genSplitCombine() {
  const total = randInt(2, 10);
  const part1 = randInt(1, total - 1);
  const part2 = total - part1;
  const isSplit = Math.random() > 0.5;
  if (isSplit) {
    return {
      content: `${total}可以分成${part1}和几？`,
      answer: String(part2),
      type: '分与合',
      solution: `1. ${total}可以分成两部分\n2. 一部分是${part1}\n3. 另一部分 = ${total} - ${part1} = ${part2}`,
    };
  }
  return {
    content: `${part1}和${part2}合起来是几？`,
    answer: String(total),
    type: '分与合',
    solution: `1. ${part1}和${part2}合起来\n2. ${part1} + ${part2} = ${total}`,
  };
}

// ============ 第二章：10以内加减法 ============

// 10以内加法
export function genAdd10() {
  const a = randInt(0, 10);
  const b = randInt(0, 10 - a);
  return {
    content: `${a} + ${b} = ?`,
    answer: String(a + b),
    type: '10以内加法',
    solution: `1. 计算 ${a} + ${b}\n2. ${a} + ${b} = ${a + b}`,
  };
}

// 10以内减法
export function genSub10() {
  const a = randInt(0, 10);
  const b = randInt(0, a);
  return {
    content: `${a} - ${b} = ?`,
    answer: String(a - b),
    type: '10以内减法',
    solution: `1. 计算 ${a} - ${b}\n2. ${a} - ${b} = ${a - b}`,
  };
}

// 连加连减
export function genChain10() {
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    const c = randInt(1, 10 - a - b);
    return {
      content: `${a} + ${b} + ${c} = ?`,
      answer: String(a + b + c),
      type: '连加',
      solution: `1. 先算 ${a} + ${b} = ${a + b}\n2. 再算 ${a + b} + ${c} = ${a + b + c}`,
    };
  } else {
    const a = randInt(5, 10);
    const b = randInt(1, a - 2);
    const c = randInt(1, a - b);
    return {
      content: `${a} - ${b} - ${c} = ?`,
      answer: String(a - b - c),
      type: '连减',
      solution: `1. 先算 ${a} - ${b} = ${a - b}\n2. 再算 ${a - b} - ${c} = ${a - b - c}`,
    };
  }
}

// 加减混合
export function genMixed10() {
  const a = randInt(2, 8);
  const b = randInt(1, 5);
  const c = randInt(1, a + b);
  return {
    content: `${a} + ${b} - ${c} = ?`,
    answer: String(a + b - c),
    type: '加减混合',
    solution: `1. 先算 ${a} + ${b} = ${a + b}\n2. 再算 ${a + b} - ${c} = ${a + b - c}`,
  };
}

// 填空
export function genFill10() {
  const a = randInt(1, 10);
  const b = randInt(1, 10 - a);
  const total = a + b;
  const r = randInt(1, 3);
  if (r === 1) {
    return {
      content: `${a} + ( ) = ${total}`,
      answer: String(b),
      type: '填空',
      solution: `1. 想：${a} + ? = ${total}\n2. ${total} - ${a} = ${b}\n3. 所以括号里填${b}`,
    };
  } else if (r === 2) {
    return {
      content: `( ) + ${b} = ${total}`,
      answer: String(a),
      type: '填空',
      solution: `1. 想：? + ${b} = ${total}\n2. ${total} - ${b} = ${a}\n3. 所以括号里填${a}`,
    };
  } else {
    return {
      content: `${total} - ${a} = ( )`,
      answer: String(b),
      type: '填空',
      solution: `1. 计算 ${total} - ${a}\n2. ${total} - ${a} = ${b}\n3. 括号里填${b}`,
    };
  }
}

// ============ 第三章：20以内加减法 ============

// 20以内不进位加法
export function genAdd20NoCarry() {
  const a = randInt(10, 19);
  const b = randInt(1, 19 - a);
  return {
    content: `${a} + ${b} = ?`,
    answer: String(a + b),
    type: '不进位加法',
    solution: `1. 个位：${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}\n2. 十位：${Math.floor(a / 10)}\n3. 结果：${a + b}`,
  };
}

// 20以内进位加法
export function genAdd20Carry() {
  const a = randInt(1, 9);
  const b = randInt(10 - a, 9);
  return {
    content: `${a} + ${b} = ?`,
    answer: String(a + b),
    type: '进位加法',
    solution: `1. 个位：${a} + ${b} = ${a + b}（满10进1）\n2. 十位：1\n3. 结果：${a + b}`,
  };
}

// 20以内不退位减法
export function genSub20NoBorrow() {
  const a = randInt(11, 19);
  const b = randInt(1, a % 10 || 1);
  return {
    content: `${a} - ${b} = ?`,
    answer: String(a - b),
    type: '不退位减法',
    solution: `1. 个位：${a % 10} - ${b} = ${(a % 10) - b}\n2. 十位：1\n3. 结果：${a - b}`,
  };
}

// 20以内退位减法
export function genSub20Borrow() {
  const a = randInt(11, 19);
  const b = randInt((a % 10) + 1, 9);
  return {
    content: `${a} - ${b} = ?`,
    answer: String(a - b),
    type: '退位减法',
    solution: `1. 个位不够减，向十位借1\n2. 10 + ${a % 10} - ${b} = ${10 + (a % 10) - b}\n3. 结果：${a - b}`,
  };
}

// 凑十法
export function genMakeTen() {
  const a = randInt(1, 9);
  const b = randInt(10 - a, 9);
  return {
    content: `${a} + ${b} = ?（用凑十法）`,
    answer: String(a + b),
    type: '凑十法',
    solution: `1. 把${b}分成${10 - a}和${b - (10 - a)}\n2. ${a} + ${10 - a} = 10\n3. 10 + ${b - (10 - a)} = ${a + b}`,
  };
}

// ============ 第四章：认识图形 ============

// 认识基本图形
export function genKnowShape() {
  const shapes = [
    { name: '正方形', edges: 4, angles: 4 },
    { name: '长方形', edges: 4, angles: 4 },
    { name: '三角形', edges: 3, angles: 3 },
    { name: '圆', edges: 0, angles: 0 },
  ];
  const shape = shapes[randInt(0, shapes.length - 1)];
  const r = randInt(1, 3);
  if (r === 1) {
    return {
      content: `${shape.name}有几条边？`,
      answer: String(shape.edges),
      type: '认识图形',
      solution: `1. ${shape.name}的特征\n2. ${shape.name}有${shape.edges}条边`,
    };
  } else if (r === 2) {
    return {
      content: `${shape.name}有几个角？`,
      answer: String(shape.angles),
      type: '认识图形',
      solution: `1. ${shape.name}的特征\n2. ${shape.name}有${shape.angles}个角`,
    };
  } else {
    return {
      content: `有${shape.edges}条边、${shape.angles}个角的图形是什么？`,
      answer: shape.name,
      type: '认识图形',
      solution: `1. 有${shape.edges}条边、${shape.angles}个角\n2. 这是${shape.name}的特征\n3. 所以是${shape.name}`,
    };
  }
}

// 数图形
export function genCountShape() {
  const squares = randInt(1, 3);
  const triangles = randInt(1, 3);
  const circles = randInt(1, 3);
  return {
    content: `图中有${squares}个正方形、${triangles}个三角形和${circles}个圆，一共有几个图形？`,
    answer: String(squares + triangles + circles),
    type: '数图形',
    solution: `1. 正方形：${squares}个\n2. 三角形：${triangles}个\n3. 圆：${circles}个\n4. 总数 = ${squares} + ${triangles} + ${circles} = ${squares + triangles + circles}（个）`,
  };
}

// ============ 第五章：位置 ============

// 认识位置
export function genPosition() {
  const questions = [
    { content: '小明坐在小红的前面，小红坐在小明的什么位置？', answer: '后面', type: '位置' },
    { content: '小明坐在小红的左边，小红坐在小明的什么位置？', answer: '右边', type: '位置' },
    { content: '书在桌子的上面，桌子在书的什么位置？', answer: '下面', type: '位置' },
  ];
  return { ...questions[randInt(0, questions.length - 1)], difficulty: 1 };
}

// ============ 第六章：认识人民币 ============

// 认识人民币
export function genKnowMoney() {
  const r = randInt(1, 3);
  if (r === 1) {
    return { content: '1元等于多少角？', answer: '10', type: '认识人民币', solution: '1元 = 10角' };
  } else if (r === 2) {
    return { content: '1角等于多少分？', answer: '10', type: '认识人民币', solution: '1角 = 10分' };
  } else {
    const yuan = randInt(1, 5);
    return {
      content: `${yuan}元等于多少角？`,
      answer: String(yuan * 10),
      type: '人民币换算',
      solution: `1. 1元 = 10角\n2. ${yuan}元 = ${yuan} × 10 = ${yuan * 10}角`,
    };
  }
}

// 简单购物
export function genSimpleShopping() {
  const price = randInt(1, 5);
  const pay = randInt(price, price + 3);
  const change = pay - price;
  return {
    content: `一支铅笔${price}元，付了${pay}元，找回多少元？`,
    answer: String(change),
    type: '简单购物',
    solution: `1. 铅笔${price}元\n2. 付了${pay}元\n3. 找回 = ${pay} - ${price} = ${change}（元）`,
  };
}

// ============ 第七章：认识钟表 ============

// 认识整时
export function genKnowTime() {
  const hour = randInt(1, 12);
  return {
    content: `钟表上时针指向${hour}，分针指向12，是几时？`,
    answer: `${hour}时`,
    type: '认识整时',
    solution: `1. 时针指向${hour}\n2. 分针指向12\n3. 这是整时，表示${hour}时`,
  };
}

// 认识半时
export function genKnowHalfTime() {
  const hour = randInt(1, 12);
  return {
    content: `${hour}时半，分针指向几？`,
    answer: '6',
    type: '认识半时',
    solution: `1. 半时就是30分钟\n2. 分针走半圈指向6\n3. 所以${hour}时半，分针指向6`,
  };
}
