// 五年级综合应用题 - 沪教版2024新教材
// 角色库：算算猫🐱、智慧龙🐉、企鹅博士🐧、小熊老师🐻、机灵狐🦊、猫头鹰🦉、小兔子🐰、小青蛙🐸
// 后续章节综合前面知识点，每道题有solution字段

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

// 角色名字常量
const CAT = '算算猫🐱';
const DRAGON = '智慧龙🐉';
const PENGUIN = '企鹅博士🐧';
const BEAR = '小熊老师🐻';
const FOX = '机灵狐🦊';
const OWL = '猫头鹰🦉';
const RABBIT = '小兔子🐰';
const FROG = '小青蛙🐸';

// ============ 第一章应用题：复习与提高（12个模板） ============

export function genAppCh1() {
  const templates = [
    // 综合计算
    () => {
      const price1 = randDec(3, 15, 1);
      const count1 = randInt(2, 5);
      const price2 = randDec(2, 10, 1);
      const count2 = randInt(1, 4);
      const total = roundTo(price1 * count1 + price2 * count2, 1);
      return {
        content: `${CAT}去超市买苹果每千克${price1}元，买了${count1}千克；橘子每千克${price2}元，买了${count2}千克。一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. 苹果：${price1} × ${count1} = ${roundTo(price1 * count1, 1)}（元）\n2. 橘子：${price2} × ${count2} = ${roundTo(price2 * count2, 1)}（元）\n3. 总计 = ${roundTo(price1 * count1, 1)} + ${roundTo(price2 * count2, 1)} = ${total}（元）`,
        type: '综合计算',
        difficulty: 2,
      };
    },
    // 简便运算应用
    () => {
      const price = randInt(10, 50);
      return {
        content: `${BEAR}在文具店买99本笔记本，每本${price}元。用简便方法计算总价是多少元？`,
        answer: `${price * 99}元`,
        solution: `1. 用简便方法：${price} × 99 = ${price} × (100 - 1)\n2. = ${price} × 100 - ${price} × 1\n3. = ${price * 100} - ${price} = ${price * 99}（元）`,
        type: '简便运算应用',
        difficulty: 2,
      };
    },
    // 分数小数转化
    () => {
      const pairs = [
        [1, 2, 0.5],
        [1, 4, 0.25],
        [3, 4, 0.75],
        [1, 5, 0.2],
        [2, 5, 0.4],
        [4, 5, 0.8],
      ];
      const [n, d, dec] = pick(pairs);
      return {
        content: `${DRAGON}把一块蛋糕平均分成${d}份，吃了其中${n}份。用小数表示他吃了这块蛋糕的多少？`,
        answer: `${dec}`,
        solution: `1. 蛋糕分成${d}份，吃了${n}份，即${n}/${d}\n2. 转为小数：${n} ÷ ${d} = ${dec}\n3. 吃了${dec}块蛋糕`,
        type: '分数小数转化',
        difficulty: 1,
      };
    },
    // 组合图形面积
    () => {
      const l = randInt(5, 10);
      const w = randInt(3, 6);
      const triBase = l;
      const triH = randInt(2, 5);
      const area = l * w + (triBase * triH) / 2;
      return {
        content: `一块地的形状：下方是长${l}米宽${w}米的长方形，上方是底${triBase}米高${triH}米的三角形。面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 长方形面积 = ${l} × ${w} = ${l * w}（平方米）\n2. 三角形面积 = ${triBase} × ${triH} ÷ 2 = ${(triBase * triH) / 2}（平方米）\n3. 总面积 = ${l * w} + ${(triBase * triH) / 2} = ${area}（平方米）`,
        type: '面积应用',
        difficulty: 2,
      };
    },
    // 购物综合
    () => {
      const items = [
        { name: '书包', price: randInt(30, 80) },
        { name: '文具盒', price: randInt(10, 30) },
      ];
      const total = items[0].price + items[1].price;
      const pay = total + randInt(5, 30);
      return {
        content: `${FOX}买了一个${items[0].name}${items[0].price}元和一个${items[1].name}${items[1].price}元，付了${pay}元，应找回多少元？`,
        answer: `${pay - total}元`,
        solution: `1. ${items[0].name}${items[0].price}元，${items[1].name}${items[1].price}元\n2. 总花费 = ${items[0].price} + ${items[1].price} = ${total}（元）\n3. 找回 = ${pay} - ${total} = ${pay - total}（元）`,
        type: '购物应用',
        difficulty: 1,
      };
    },
    // 旅行综合
    () => {
      const speed = randInt(30, 80);
      const time = randInt(2, 5);
      const dist = speed * time;
      return {
        content: `${PENGUIN}一家自驾旅行，每小时行驶${speed}千米，行驶了${time}小时，一共行驶了多少千米？`,
        answer: `${dist}千米`,
        solution: `1. 速度 = ${speed}千米/小时\n2. 时间 = ${time}小时\n3. 路程 = ${speed} × ${time} = ${dist}（千米）`,
        type: '行程应用',
        difficulty: 1,
      };
    },
    // 工程综合
    () => {
      const total = randInt(50, 200);
      const n = randInt(3, 6);
      const per = Math.floor(total / n);
      const rem = total % n;
      return {
        content: `${RABBIT}学校买了${total}本课外书，平均分给${n}个班级，每班分到几本？还剩几本？`,
        answer: `每班${per}本，剩余${rem}本`,
        solution: `1. 总共${total}本\n2. 分给${n}个班\n3. ${total} ÷ ${n} = ${per}……${rem}\n4. 每班${per}本，剩${rem}本`,
        type: '分配应用',
        difficulty: 1,
      };
    },
    // 农场经营
    () => {
      const chicken = randInt(50, 200);
      const egg = randInt(1, 3);
      const days = randInt(5, 10);
      return {
        content: `${BEAR}的农场有${chicken}只母鸡，每只每天下${egg}个蛋，${days}天一共能收多少个蛋？`,
        answer: `${chicken * egg * days}个`,
        solution: `1. ${chicken}只母鸡，每只每天${egg}个\n2. 每天总产 = ${chicken} × ${egg} = ${chicken * egg}（个）\n3. ${days}天 = ${chicken * egg} × ${days} = ${chicken * egg * days}（个）`,
        type: '农场经营',
        difficulty: 2,
      };
    },
    // 科学实验
    () => {
      const a = randDec(0.5, 3, 1);
      const b = randDec(0.5, 3, 1);
      const total = roundTo(a + b, 1);
      return {
        content: `${OWL}科学实验用了${a}升液体和${b}升水混合，混合后总体积是多少升？`,
        answer: `${total}升`,
        solution: `1. 液体${a}升\n2. 水${b}升\n3. 总体积 = ${a} + ${b} = ${total}（升）`,
        type: '科学实验',
        difficulty: 1,
      };
    },
    // 运动统计
    () => {
      const n = randInt(4, 6);
      const scores = [];
      for (let i = 0; i < n; i++) scores.push(randInt(65, 100));
      const sum = scores.reduce((a, b) => a + b, 0);
      const avg = roundTo(sum / n, 1);
      return {
        content: `${FROG}的跳远成绩：${scores.join('、')}米。平均成绩是多少米？`,
        answer: `${avg}米`,
        solution: `1. 成绩：${scores.join('、')}\n2. 总分 = ${scores.join(' + ')} = ${sum}\n3. 平均 = ${sum} ÷ ${n} = ${avg}（米）`,
        type: '运动统计',
        difficulty: 2,
      };
    },
    // 建筑设计
    () => {
      const l = randInt(5, 10);
      const w = randInt(3, 6);
      const perim = 2 * (l + w);
      const area = l * w;
      return {
        content: `${DRAGON}设计了一个长${l}米宽${w}米的花园。四周围上篱笆，篱笆长多少米？花园面积多少平方米？`,
        answer: `篱笆${perim}米，面积${area}平方米`,
        solution: `1. 周长 = (长 + 宽) × 2 = (${l} + ${w}) × 2 = ${perim}（米）\n2. 面积 = 长 × 宽 = ${l} × ${w} = ${area}（平方米）`,
        type: '建筑设计',
        difficulty: 2,
      };
    },
    // 编程游戏
    () => {
      const a = randInt(5, 20);
      const b = randInt(2, 5);
      const c = randInt(3, 10);
      const result = a * b + c;
      return {
        content: `${CAT}在编程游戏中，一个程序先将输入的数乘以${b}，再加上${c}，得到${result}。输入的数是多少？`,
        answer: `${a}`,
        solution: `1. 设输入的数为□\n2. □ × ${b} + ${c} = ${result}\n3. □ × ${b} = ${result} - ${c} = ${result - c}\n4. □ = ${result - c} ÷ ${b} = ${a}`,
        type: '编程游戏',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第二章应用题：小数乘除法（15个模板） ============

export function genAppCh2() {
  const templates = [
    // 购物计算
    () => {
      const price = randDec(2.5, 15, 1);
      const weight = randDec(0.5, 5, 1);
      const total = roundTo(price * weight, 2);
      return {
        content: `${CAT}去水果店买苹果，每千克${price}元，买了${weight}千克，应付多少钱？`,
        answer: `${total}元`,
        solution: `1. 单价：${price}元/千克\n2. 重量：${weight}千克\n3. 总价 = ${price} × ${weight} = ${total}（元）`,
        type: '购物计算',
        difficulty: 2,
      };
    },
    // 面积体积
    () => {
      const l = randDec(3, 10, 1);
      const w = randDec(2, 8, 1);
      const area = roundTo(l * w, 2);
      return {
        content: `一块长方形菜地长${l}米，宽${w}米，面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 长${l}米，宽${w}米\n2. 面积 = ${l} × ${w} = ${area}（平方米）`,
        type: '面积体积',
        difficulty: 2,
      };
    },
    // 路程速度
    () => {
      const speed = randDec(3, 8, 1);
      const time = randDec(1, 4, 1);
      const dist = roundTo(speed * time, 1);
      return {
        content: `${DRAGON}骑自行车每小时行${speed}千米，骑了${time}小时，行了多少千米？`,
        answer: `${dist}千米`,
        solution: `1. 速度：${speed}千米/小时\n2. 时间：${time}小时\n3. 路程 = ${speed} × ${time} = ${dist}（千米）`,
        type: '路程速度',
        difficulty: 2,
      };
    },
    // 工资计算
    () => {
      const per = randDec(50, 150, 1);
      const days = randInt(20, 30);
      const total = roundTo(per * days, 1);
      return {
        content: `工人每天工资${per}元，工作了${days}天，一共挣了多少钱？`,
        answer: `${total}元`,
        solution: `1. 每天${per}元\n2. 工作${days}天\n3. 总工资 = ${per} × ${days} = ${total}（元）`,
        type: '工资计算',
        difficulty: 2,
      };
    },
    // 材料用量
    () => {
      const per = randDec(2, 8, 1);
      const count = randInt(3, 10);
      const total = roundTo(per * count, 1);
      return {
        content: `每米布料${per}元，${RABBIT}买了${count}米，一共多少钱？`,
        answer: `${total}元`,
        solution: `1. 每米${per}元\n2. 买了${count}米\n3. 总价 = ${per} × ${count} = ${total}（元）`,
        type: '材料用量',
        difficulty: 2,
      };
    },
    // 产量计算
    () => {
      const per = randDec(2, 8, 1);
      const time = randDec(2, 6, 1);
      const work = roundTo(per * time, 1);
      return {
        content: `一台机器每小时生产${per}个零件，工作${time}小时后生产了多少个零件？`,
        answer: `${work}个`,
        solution: `1. 每小时${per}个\n2. 工作${time}小时\n3. 总产量 = ${per} × ${time} = ${work}（个）`,
        type: '产量计算',
        difficulty: 2,
      };
    },
    // 折扣优惠
    () => {
      const original = randInt(20, 100);
      const discount = pick([0.8, 0.9, 0.7, 0.85]);
      const dName =
        discount === 0.8 ? '八' : discount === 0.9 ? '九' : discount === 0.7 ? '七' : '八五';
      const sale = roundTo(original * discount, 1);
      return {
        content: `${FOX}看中一件衣服原价${original}元，打${dName}折后售价是多少元？`,
        answer: `${sale}元`,
        solution: `1. 原价${original}元\n2. 打${dName}折 = 按${discount}倍计算\n3. 售价 = ${original} × ${discount} = ${sale}（元）`,
        type: '折扣优惠',
        difficulty: 2,
      };
    },
    // 汇率换算
    () => {
      const rate = randDec(6.5, 7.5, 2);
      const amount = randInt(10, 100);
      const result = roundTo(rate * amount, 2);
      return {
        content: `1美元兑换${rate}元人民币，${PENGUIN}有${amount}美元，可以兑换多少元人民币？`,
        answer: `${result}元`,
        solution: `1. 汇率：1美元 = ${rate}元\n2. ${amount}美元\n3. 人民币 = ${amount} × ${rate} = ${result}（元）`,
        type: '汇率换算',
        difficulty: 2,
      };
    },
    // 比例分配
    () => {
      const total = randDec(5, 30, 1);
      const n = randInt(2, 6);
      const per = roundTo(total / n, 2);
      return {
        content: `${total}升果汁平均分给${n}个小朋友，每人分到多少升？`,
        answer: `${per}升`,
        solution: `1. 总共${total}升\n2. 分给${n}人\n3. 每人 = ${total} ÷ ${n} = ${per}（升）`,
        type: '比例分配',
        difficulty: 2,
      };
    },
    // 效率计算
    () => {
      const dividend = randInt(10, 50);
      const divisor = randInt(3, 7);
      const quotient = roundTo(dividend / divisor, 2);
      return {
        content: `${BEAR}有${dividend}个苹果，平均分给${divisor}个孩子，每人分到多少个？（保留两位小数）`,
        answer: `${quotient}个`,
        solution: `1. ${dividend} ÷ ${divisor} = ${dividend / divisor}...\n2. 保留两位小数 ≈ ${quotient}`,
        type: '效率计算',
        difficulty: 2,
      };
    },
    // 浓度配比
    () => {
      const salt = randDec(5, 30, 1);
      const water = randDec(100, 500, 1);
      const conc = roundTo((salt / (salt + water)) * 100, 1);
      return {
        content: `${OWL}把${salt}克盐溶解在${water}克水中，盐水的浓度是多少%？`,
        answer: `${conc}%`,
        solution: `1. 盐${salt}克，水${water}克\n2. 盐水总量 = ${salt} + ${water} = ${roundTo(salt + water, 1)}（克）\n3. 浓度 = ${salt} ÷ ${roundTo(salt + water, 1)} × 100% ≈ ${conc}%`,
        type: '浓度配比',
        difficulty: 3,
      };
    },
    // 油耗计算
    () => {
      const fuel = randDec(3, 10, 1);
      const dist = randDec(30, 100, 1);
      const perKm = roundTo(fuel / dist, 2);
      return {
        content: `汽车行驶${dist}千米用了${fuel}升汽油，平均每千米耗油多少升？`,
        answer: `${perKm}升`,
        solution: `1. 行驶${dist}千米\n2. 用油${fuel}升\n3. 每千米耗油 = ${fuel} ÷ ${dist} = ${perKm}（升）`,
        type: '油耗计算',
        difficulty: 2,
      };
    },
    // 电费水费
    () => {
      const elec = randDec(50, 200, 1);
      const price = randDec(0.4, 0.8, 2);
      const total = roundTo(elec * price, 2);
      return {
        content: `这个月用电${elec}度，每度${price}元，电费多少元？`,
        answer: `${total}元`,
        solution: `1. 用电${elec}度\n2. 每度${price}元\n3. 电费 = ${elec} × ${price} = ${total}（元）`,
        type: '电费水费',
        difficulty: 2,
      };
    },
    // 快递计费
    () => {
      const weight = randDec(1, 5, 1);
      const perKg = randDec(5, 15, 1);
      const total = roundTo(weight * perKg, 1);
      return {
        content: `快递费每千克${perKg}元，一个包裹重${weight}千克，运费多少元？`,
        answer: `${total}元`,
        solution: `1. 重量${weight}千克\n2. 每千克${perKg}元\n3. 运费 = ${weight} × ${perKg} = ${total}（元）`,
        type: '快递计费',
        difficulty: 2,
      };
    },
    // 温度转换
    () => {
      const c = randInt(-10, 40);
      const f = roundTo((c * 9) / 5 + 32, 1);
      return {
        content: `温度转换公式：华氏度 = 摄氏度 × 1.8 + 32。${c}℃等于多少华氏度？`,
        answer: `${f}华氏度`,
        solution: `1. 摄氏度 = ${c}℃\n2. 华氏度 = ${c} × 1.8 + 32\n3. = ${roundTo(c * 1.8, 1)} + 32 = ${f}（华氏度）`,
        type: '温度转换',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第三章应用题：统计（10个模板） ============

export function genAppCh3() {
  const templates = [
    // 成绩分析
    () => {
      const n = randInt(4, 6);
      const scores = [];
      for (let i = 0; i < n; i++) scores.push(randInt(65, 100));
      const sum = scores.reduce((a, b) => a + b, 0);
      const avg = roundTo(sum / n, 1);
      return {
        content: `${n}位同学的数学成绩分别为：${scores.join('、')}分。他们的平均成绩是多少分？`,
        answer: `${avg}分`,
        solution: `1. 总分：${scores.join(' + ')} = ${sum}分\n2. 平均 = ${sum} ÷ ${n} = ${avg}（分）`,
        type: '成绩分析',
        difficulty: 1,
      };
    },
    // 气温分析
    () => {
      const temps = [];
      for (let i = 0; i < 5; i++) temps.push(randInt(15, 35));
      const sum = temps.reduce((a, b) => a + b, 0);
      const avg = roundTo(sum / 5, 1);
      const max = Math.max(...temps);
      const min = Math.min(...temps);
      return {
        content: `${PENGUIN}记录5天气温：${temps.join('℃、')}℃，平均气温多少℃？最高最低相差多少℃？`,
        answer: `平均${avg}℃，相差${max - min}℃`,
        solution: `1. 气温：${temps.join('、')}℃\n2. 平均 = (${temps.join(' + ')}) ÷ 5 = ${sum} ÷ 5 = ${avg}℃\n3. 温差 = ${max} - ${min} = ${max - min}℃`,
        type: '气温分析',
        difficulty: 2,
      };
    },
    // 运动数据分析
    () => {
      const last = randInt(60, 90);
      const growth = randInt(5, 20);
      const now = last + growth;
      const avg = roundTo((last + now) / 2, 1);
      return {
        content: `${FROG}去年跑步平均分${last}分，今年提高了${growth}分。两年的平均分是多少？`,
        answer: `${avg}分`,
        solution: `1. 去年：${last}分\n2. 今年：${last} + ${growth} = ${now}分\n3. 两年平均 = (${last} + ${now}) ÷ 2 = ${avg}（分）`,
        type: '运动数据分析',
        difficulty: 2,
      };
    },
    // 消费分析
    () => {
      const daily = randInt(80, 100);
      const exam = randInt(70, 100);
      const result = roundTo(daily * 0.4 + exam * 0.6, 1);
      return {
        content: `学期成绩：平时占40%，期末占60%。${RABBIT}平时${daily}分，期末${exam}分，学期成绩多少分？`,
        answer: `${result}分`,
        solution: `1. 平时${daily}分 × 40% = ${roundTo(daily * 0.4, 1)}\n2. 期末${exam}分 × 60% = ${roundTo(exam * 0.6, 1)}\n3. 学期成绩 = ${roundTo(daily * 0.4, 1)} + ${roundTo(exam * 0.6, 1)} = ${result}（分）`,
        type: '消费分析',
        difficulty: 2,
      };
    },
    // 人口分析
    () => {
      const n = randInt(3, 5);
      const avg = randInt(35, 50);
      const total = n * avg;
      return {
        content: `${n}个小朋友的平均体重是${avg}千克，他们的总体重是多少千克？`,
        answer: `${total}千克`,
        solution: `1. 平均体重${avg}千克\n2. ${n}人\n3. 总体重 = ${avg} × ${n} = ${total}（千克）`,
        type: '人口分析',
        difficulty: 1,
      };
    },
    // 销售分析
    () => {
      const n = randInt(4, 6);
      const targetAvg = randInt(80, 95);
      const scores = [];
      for (let i = 0; i < n - 1; i++) scores.push(randInt(65, 98));
      const sum = scores.reduce((a, b) => a + b, 0);
      const needed = n * targetAvg - sum;
      if (needed < 0 || needed > 100) return genAppCh3();
      return {
        content: `${CAT}前${n - 1}次测试成绩为${scores.join('、')}分。要使${n}次平均分达到${targetAvg}分，最后一次至少要考多少分？`,
        answer: `${needed}分`,
        solution: `1. 前${n - 1}次总分：${scores.join(' + ')} = ${sum}分\n2. 总分需要：${targetAvg} × ${n} = ${n * targetAvg}分\n3. 最后一次至少：${n * targetAvg} - ${sum} = ${needed}（分）`,
        type: '求缺失数据',
        difficulty: 3,
      };
    },
    // 体重身高分析
    () => {
      const count = randInt(4, 6);
      const values = Array.from({ length: count }, () => randInt(30, 50));
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = roundTo(sum / count, 1);
      const labels = ['周一', '周二', '周三', '周四', '周五', '周六'].slice(0, count);
      return {
        content: `${OWL}记录一周每天跑步距离（千米）：${values.map((v, i) => labels[i] + v).join('、')}。平均每天跑多少千米？`,
        answer: `${avg}千米`,
        solution: `1. 距离：${values.join('、')}千米\n2. 总距离 = ${values.join(' + ')} = ${sum}千米\n3. 平均 = ${sum} ÷ ${count} = ${avg}（千米）`,
        type: '体重身高分析',
        difficulty: 2,
      };
    },
    // 图书借阅分析
    () => {
      const m1 = randInt(70, 95);
      const m2 = randInt(70, 95);
      const f1 = randInt(70, 95);
      const f2 = randInt(70, 95);
      return {
        content: `复式统计表：男生语文平均${m1}分、数学${m2}分；女生语文${f1}分、数学${f2}分。哪科平均分更高？`,
        answer: `${m1 + f1 >= m2 + f2 ? '语文' : '数学'}平均分更高`,
        solution: `1. 语文总分 = ${m1} + ${f1} = ${m1 + f1}\n2. 数学总分 = ${m2} + ${f2} = ${m2 + f2}\n3. ${m1 + f1} ${m1 + f1 >= m2 + f2 ? '≥' : '<'} ${m2 + f2}\n4. ${m1 + f1 >= m2 + f2 ? '语文' : '数学'}平均分更高`,
        type: '图书借阅分析',
        difficulty: 2,
      };
    },
    // 天气统计
    () => {
      const vals = Array.from({ length: 5 }, () => randInt(20, 80));
      const maxVal = Math.max(...vals);
      const minVal = Math.min(...vals);
      const labels = ['周一', '周二', '周三', '周四', '周五'];
      return {
        content: `某商店5天销售量：${labels.map((l, i) => l + vals[i] + '件').join('、')}。哪天最多？哪天最少？`,
        answer: `最多：${labels[vals.indexOf(maxVal)]}（${maxVal}件），最少：${labels[vals.indexOf(minVal)]}（${minVal}件）`,
        solution: `1. 数据：${labels.map((l, i) => l + vals[i]).join('、')}\n2. 最多：${maxVal}件（${labels[vals.indexOf(maxVal)]}）\n3. 最少：${minVal}件（${labels[vals.indexOf(minVal)]}）`,
        type: '天气统计',
        difficulty: 1,
      };
    },
    // 比赛成绩
    () => {
      const values = Array.from({ length: 4 }, () => randInt(30, 80));
      const labels = ['第一季度', '第二季度', '第三季度', '第四季度'];
      const diffs = [];
      for (let i = 1; i < values.length; i++) diffs.push(values[i] - values[i - 1]);
      const maxIncrease = Math.max(...diffs);
      const maxIdx = diffs.indexOf(maxIncrease);
      return {
        content: `某产品销量：${labels.map((l, i) => l + values[i] + '台').join('、')}。增长最多的是哪个季度？`,
        answer: labels[maxIdx + 1],
        solution: `1. 各季度增长量计算\n2. ${labels[maxIdx]}到${labels[maxIdx + 1]}增长最多\n3. 增长了${maxIncrease}台`,
        type: '比赛成绩',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第四章应用题：简易方程一（12个模板） ============

export function genAppCh4() {
  const templates = [
    // 年龄问题
    () => {
      const childAge = randInt(6, 12);
      const diff = randInt(24, 35);
      const parentAge = childAge + diff;
      return {
        content: `${RABBIT}今年${childAge}岁，妈妈比她大${diff}岁。妈妈今年多少岁？（列方程解）`,
        answer: `妈妈${parentAge}岁`,
        solution: `1. 设妈妈今年x岁\n2. 妈妈比${RABBIT}大${diff}岁\n3. 方程：x - ${childAge} = ${diff}\n4. x = ${childAge} + ${diff} = ${parentAge}\n5. 妈妈${parentAge}岁`,
        type: '年龄方程',
        difficulty: 2,
      };
    },
    // 购物问题
    () => {
      const price = randInt(3, 12);
      const count = randInt(3, 8);
      const total = price * count;
      return {
        content: `买了${count}支同样的铅笔，共花${total}元。每支铅笔多少元？（列方程解）`,
        answer: `每支${price}元`,
        solution: `1. 设每支铅笔x元\n2. 方程：${count}x = ${total}\n3. x = ${total} ÷ ${count} = ${price}\n4. 每支${price}元`,
        type: '购物方程',
        difficulty: 2,
      };
    },
    // 行程问题
    () => {
      const speed = randInt(40, 80);
      const time = randInt(2, 5);
      const dist = speed * time;
      return {
        content: `一辆汽车${time}小时行驶了${dist}千米，平均每小时行驶多少千米？（列方程解）`,
        answer: `每小时${speed}千米`,
        solution: `1. 设每小时x千米\n2. 方程：${time}x = ${dist}\n3. x = ${dist} ÷ ${time} = ${speed}\n4. 平均每小时${speed}千米`,
        type: '路程方程',
        difficulty: 2,
      };
    },
    // 工程问题
    () => {
      const daily = randInt(8, 20);
      const days = randInt(3, 7);
      const total = daily * days;
      return {
        content: `工程队每天修路${daily}米，修了若干天后共修${total}米。修了多少天？（列方程解）`,
        answer: `修了${days}天`,
        solution: `1. 设修了x天\n2. 方程：${daily}x = ${total}\n3. x = ${total} ÷ ${daily} = ${days}\n4. 修了${days}天`,
        type: '工程方程',
        difficulty: 2,
      };
    },
    // 配比问题
    () => {
      const a = randInt(3, 8);
      const b = randInt(10, 30);
      const c = a * randInt(5, 15) + b;
      const x = (c - b) / a;
      return {
        content: `${CAT}买了${a}支同样的笔和一个${b}元的橡皮，共花${c}元。每支笔多少元？（列方程解）`,
        answer: `每支笔${x}元`,
        solution: `1. 设每支笔x元\n2. 方程：${a}x + ${b} = ${c}\n3. ${a}x = ${c} - ${b} = ${c - b}\n4. x = ${c - b} ÷ ${a} = ${x}\n5. 每支笔${x}元`,
        type: '配比问题',
        difficulty: 3,
      };
    },
    // 数字问题
    () => {
      const x = randInt(5, 20);
      const a = randInt(2, 5);
      const b = randInt(3, 10);
      const result = x * a + b;
      return {
        content: `${DRAGON}的谜题：一个数乘以${a}再加${b}等于${result}，这个数是多少？（列方程解）`,
        answer: `${x}`,
        solution: `1. 设这个数为x\n2. 方程：${a}x + ${b} = ${result}\n3. ${a}x = ${result} - ${b} = ${result - b}\n4. x = ${result - b} ÷ ${a} = ${x}`,
        type: '数字问题',
        difficulty: 2,
      };
    },
    // 面积问题
    () => {
      const base = randInt(5, 12);
      const height = randInt(4, 10);
      const area = base * height;
      return {
        content: `平行四边形面积是${area}平方厘米，底是${base}厘米，高是多少厘米？（列方程解）`,
        answer: `高${height}厘米`,
        solution: `1. 设高为x厘米\n2. 方程：${base} × x = ${area}\n3. x = ${area} ÷ ${base} = ${height}\n4. 高是${height}厘米`,
        type: '面积方程',
        difficulty: 2,
      };
    },
    // 分数问题
    () => {
      const d = pick([3, 4, 5]);
      const n = randInt(1, d - 1);
      const part = randInt(5, 20);
      const total = (part * d) / n;
      if (!Number.isInteger(total)) return genAppCh4();
      return {
        content: `${FOX}看了${part}页书，正好看了全书的${n}/${d}。这本书一共多少页？（列方程解）`,
        answer: `${total}页`,
        solution: `1. 设全书x页\n2. 方程：x × ${n}/${d} = ${part}\n3. x = ${part} ÷ ${n}/${d} = ${part} × ${d}/${n} = ${total}\n4. 全书${total}页`,
        type: '分数方程',
        difficulty: 2,
      };
    },
    // 倍数问题
    () => {
      const x = randInt(8, 20);
      const times = randInt(2, 5);
      const sum = x + x * times;
      return {
        content: `${RABBIT}和${FROG}一共有${sum}颗糖，${FROG}是${RABBIT}的${times}倍。${RABBIT}有多少颗？（列方程解）`,
        answer: `${x}颗`,
        solution: `1. 设${RABBIT}有x颗\n2. ${FROG}有${times}x颗\n3. 方程：x + ${times}x = ${sum}\n4. ${times + 1}x = ${sum}\n5. x = ${sum} ÷ ${times + 1} = ${x}`,
        type: '倍数方程',
        difficulty: 3,
      };
    },
    // 和差问题
    () => {
      const a = randInt(20, 50);
      const b = randInt(5, 20);
      return {
        content: `${OWL}有${a + b}本书，比${FROG}多${b}本。${FROG}有多少本？（列方程解）`,
        answer: `${a}本`,
        solution: `1. 设${FROG}有x本\n2. 方程：x + ${b} = ${a + b}\n3. x = ${a + b} - ${b} = ${a}\n4. ${FROG}有${a}本`,
        type: '和差方程',
        difficulty: 2,
      };
    },
    // 鸡兔同笼
    () => {
      const chicken = randInt(5, 15);
      const rabbit = randInt(3, 10);
      const heads = chicken + rabbit;
      const legs = chicken * 2 + rabbit * 4;
      return {
        content: `笼子里有鸡和兔共${heads}只，${legs}条腿。鸡和兔各多少只？（列方程解）`,
        answer: `鸡${chicken}只，兔${rabbit}只`,
        solution: `1. 设鸡x只，则兔${heads} - x只\n2. 方程：2x + 4(${heads} - x) = ${legs}\n3. 2x + ${4 * heads} - 4x = ${legs}\n4. -2x = ${legs - 4 * heads}\n5. x = ${chicken}，兔 = ${heads} - ${chicken} = ${rabbit}`,
        type: '鸡兔同笼',
        difficulty: 3,
      };
    },
    // 利润问题
    () => {
      const cost = randInt(5, 20);
      const profit = randInt(2, 8);
      const count = randInt(3, 8);
      const totalProfit = profit * count;
      return {
        content: `${PENGUIN}每件商品进价${cost}元，售价${cost + profit}元，卖出${count}件赚了多少元？（列方程解）`,
        answer: `${totalProfit}元`,
        solution: `1. 每件利润 = 售价 - 进价 = ${cost + profit} - ${cost} = ${profit}（元）\n2. 方程：利润 = ${profit} × ${count} = ${totalProfit}（元）`,
        type: '利润问题',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第五章应用题：几何小实践（10个模板） ============

export function genAppCh5() {
  const templates = [
    // 平行四边形面积
    () => {
      const base = randInt(5, 15);
      const height = randInt(3, 10);
      return {
        content: `${BEAR}的平行四边形菜地，底${base}米，高${height}米，面积是多少平方米？`,
        answer: `${base * height}平方米`,
        solution: `1. 面积 = 底 × 高\n2. = ${base} × ${height} = ${base * height}（平方米）`,
        type: '平行四边形应用',
        difficulty: 1,
      };
    },
    // 三角形面积
    () => {
      const base = randInt(6, 16);
      const height = randInt(4, 12);
      const area = (base * height) / 2;
      return {
        content: `一面三角形小旗底${base}厘米，高${height}厘米，面积是多少平方厘米？`,
        answer: `${area}平方厘米`,
        solution: `1. 三角形面积 = 底 × 高 ÷ 2\n2. = ${base} × ${height} ÷ 2 = ${area}（平方厘米）`,
        type: '三角形应用',
        difficulty: 1,
      };
    },
    // 梯形面积
    () => {
      const a = randInt(3, 10);
      const b = randInt(a + 2, 18);
      const h = randInt(3, 10);
      const area = ((a + b) * h) / 2;
      return {
        content: `${RABBIT}的梯形花坛，上底${a}米，下底${b}米，高${h}米，面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 面积 = (上底 + 下底) × 高 ÷ 2\n2. = (${a} + ${b}) × ${h} ÷ 2 = ${area}（平方米）`,
        type: '梯形应用',
        difficulty: 1,
      };
    },
    // 组合图形面积
    () => {
      const l = randInt(6, 12);
      const w = randInt(3, 8);
      const triH = randInt(2, 6);
      const area = l * w + (l * triH) / 2;
      return {
        content: `一块地下面是长${l}米宽${w}米的长方形，上面是底${l}米高${triH}米的三角形。总面积多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 长方形面积 = ${l} × ${w} = ${l * w}（平方米）\n2. 三角形面积 = ${l} × ${triH} ÷ 2 = ${(l * triH) / 2}（平方米）\n3. 总面积 = ${l * w} + ${(l * triH) / 2} = ${area}（平方米）`,
        type: '组合图形',
        difficulty: 2,
      };
    },
    // 等积变形
    () => {
      const base = randInt(6, 14);
      const height = randInt(4, 10);
      const area = base * height;
      return {
        content: `一块平行四边形的地，底${base}米，高${height}米。把它改造成同面积的长方形，面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 平行四边形面积 = ${base} × ${height} = ${area}（平方米）\n2. 等积变形，面积不变\n3. 长方形面积也是${area}平方米`,
        type: '等积变形',
        difficulty: 2,
      };
    },
    // 求底求高
    () => {
      const base = randInt(5, 12);
      const height = randInt(3, 8);
      const area = base * height;
      return {
        content: `平行四边形钢板面积${area}平方米，高${height}米，底是多少米？`,
        answer: `${base}米`,
        solution: `1. 面积 = 底 × 高\n2. 底 = 面积 ÷ 高 = ${area} ÷ ${height} = ${base}（米）`,
        type: '求底高应用',
        difficulty: 2,
      };
    },
    // 花坛面积
    () => {
      const base = randInt(8, 16);
      const height = randInt(5, 12);
      const price = randInt(5, 15);
      const area = base * height;
      return {
        content: `${FOX}的平行四边形草坪底${base}米，高${height}米。每平方米种草${price}元，种完需要多少钱？`,
        answer: `${area * price}元`,
        solution: `1. 面积 = ${base} × ${height} = ${area}（平方米）\n2. 每平方米${price}元\n3. 总费用 = ${area} × ${price} = ${area * price}（元）`,
        type: '花坛面积',
        difficulty: 2,
      };
    },
    // 旗帜面积
    () => {
      const base = randInt(6, 14);
      const height = randInt(4, 10);
      return {
        content: `一面三角形旗帜底${base}厘米，高${height}厘米，面积是多少平方厘米？`,
        answer: `${(base * height) / 2}平方厘米`,
        solution: `1. 面积 = 底 × 高 ÷ 2\n2. = ${base} × ${height} ÷ 2 = ${(base * height) / 2}（平方厘米）`,
        type: '旗帜面积',
        difficulty: 1,
      };
    },
    // 园地面积
    () => {
      const l = randInt(6, 12);
      const h = randInt(3, 6);
      const triH = randInt(2, 4);
      const area = l * h + (l * triH) / 2;
      const price = randInt(8, 20);
      return {
        content: `一面墙下面是长${l}米高${h}米的长方形，上面是底${l}米高${triH}米的三角形。每平方米粉刷费${price}元，共需多少钱？`,
        answer: `${area * price}元`,
        solution: `1. 长方形面积 = ${l} × ${h} = ${l * h}平方米\n2. 三角形面积 = ${l} × ${triH} ÷ 2 = ${(l * triH) / 2}平方米\n3. 总面积 = ${area}平方米\n4. 费用 = ${area} × ${price} = ${area * price}（元）`,
        type: '园地面积',
        difficulty: 3,
      };
    },
    // 屋顶面积
    () => {
      const base = randInt(8, 15);
      const height = randInt(4, 10);
      const area = (base * height) / 2;
      return {
        content: `${PENGUIN}家的屋顶截面是三角形，底${base}米，高${height}米，截面面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 三角形面积 = 底 × 高 ÷ 2\n2. = ${base} × ${height} ÷ 2 = ${area}（平方米）`,
        type: '屋顶面积',
        difficulty: 1,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第六章应用题：整理与提高（8个模板） ============

export function genAppCh6() {
  const templates = [
    // 图形平移
    () => {
      const dx = randInt(3, 8);
      const dy = randInt(2, 6);
      return {
        content: `在方格纸上，点A从(1,1)出发，先向右平移${dx}格，再向上平移${dy}格，到达点B。点B的坐标是什么？`,
        answer: `(${1 + dx},${1 + dy})`,
        solution: `1. 起点A(1,1)\n2. 向右平移${dx}格：x + ${dx}\n3. 向上平移${dy}格：y + ${dy}\n4. B = (${1 + dx},${1 + dy})`,
        type: '图形平移',
        difficulty: 2,
      };
    },
    // 图形旋转
    () => {
      return {
        content: `${DRAGON}观察钟表，时针从3时走到6时旋转了多少度？分针从12时走到3时旋转了多少度？`,
        answer: `时针90°，分针180°`,
        solution: `1. 时针：12小时360°，每小时30°\n2. 3时到6时 = 3小时 = 3 × 30° = 90°\n3. 分针：60分钟360°，每分钟6°\n4. 12时到3时 = 15分钟 = 15 × 6° = 90°`,
        type: '图形旋转',
        difficulty: 2,
      };
    },
    // 编码设计
    () => {
      const year = randInt(2020, 2025);
      const cls = randInt(1, 12);
      const num = randInt(1, 45);
      return {
        content: `学校编号规则：入学年份(4位)+班级(2位)+学号(2位)。${year}年入学${cls}班${num}号同学的编号是什么？`,
        answer: `${year}${String(cls).padStart(2, '0')}${String(num).padStart(2, '0')}`,
        solution: `1. 入学年份：${year}\n2. 班级：${cls} → ${String(cls).padStart(2, '0')}\n3. 学号：${num} → ${String(num).padStart(2, '0')}\n4. 编号 = ${year}${String(cls).padStart(2, '0')}${String(num).padStart(2, '0')}`,
        type: '编码设计',
        difficulty: 2,
      };
    },
    // 综合应用
    () => {
      const l = randInt(5, 10);
      const w = randInt(3, 6);
      const perim = 2 * (l + w);
      const area = l * w;
      return {
        content: `一个长方形花园长${l}米宽${w}米，四周围篱笆。篱笆长多少米？面积多少平方米？`,
        answer: `篱笆${perim}米，面积${area}平方米`,
        solution: `1. 篱笆 = 周长 = (${l} + ${w}) × 2 = ${perim}（米）\n2. 面积 = ${l} × ${w} = ${area}（平方米）`,
        type: '综合计算',
        difficulty: 2,
      };
    },
    // 知识整合
    () => {
      const base = randInt(5, 12);
      const height = randInt(3, 8);
      return {
        content: `平行四边形底${base}厘米、高${height}厘米，平移后面积会变吗？面积是多少？`,
        answer: `不变，都是${base * height}平方厘米`,
        solution: `1. 面积 = ${base} × ${height} = ${base * height}平方厘米\n2. 平移不改变形状和大小\n3. 所以面积不变`,
        type: '平移面积',
        difficulty: 1,
      };
    },
    // 跨学科应用
    () => {
      return {
        content: `${CAT}的身份证号码是310115201503150018，他是哪一年出生的？`,
        answer: '2015年',
        solution: `1. 身份证号码：310115201503150018\n2. 第7-14位是出生日期\n3. 第7-10位：2015\n4. 2015年出生`,
        type: '身份证编码',
        difficulty: 1,
      };
    },
    // 实际问题
    () => {
      const city = pick(['北京', '上海', '广州']);
      const codes = { 北京: '100000', 上海: '200000', 广州: '510000' };
      return {
        content: `${city}的邮政编码前两位是什么？完整编码是什么？`,
        answer: `${codes[city].substring(0, 2)}，${codes[city]}`,
        solution: `1. 邮编共6位，前两位表示省（区、市）\n2. ${city}编码：${codes[city]}\n3. 前两位：${codes[city].substring(0, 2)}`,
        type: '邮编应用',
        difficulty: 1,
      };
    },
    // 开放探究
    () => {
      const base = randInt(6, 12);
      const h1 = randInt(4, 8);
      const h2 = randInt(3, 7);
      return {
        content: `两个等底的平行四边形，高分别是${h1}米和${h2}米，哪个面积大？大多少？`,
        answer: `高${Math.max(h1, h2)}米的大，大${Math.abs(h1 - h2) * base}平方米`,
        solution: `1. 底${base}米\n2. 面积1 = ${base} × ${h1} = ${base * h1}平方米\n3. 面积2 = ${base} × ${h2} = ${base * h2}平方米\n4. 相差 = ${Math.abs(base * h1 - base * h2)}平方米`,
        type: '面积比较',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第七章应用题：分数加减法（12个模板） ============

export function genAppCh7() {
  const templates = [
    // 食谱配方
    () => {
      const d = pick([4, 6, 8]);
      const a = randInt(1, d - 2);
      const b = randInt(1, d - a - 1);
      const sum = a + b;
      const [sn, sd] = simplifyFrac(sum, d);
      return {
        content: `${RABBIT}做蛋糕，用了面粉${a}/${d}千克，糖${b}/${d}千克。面粉和糖一共多少千克？`,
        answer: `${sn}/${sd}千克`,
        solution: `1. 面粉${a}/${d}千克\n2. 糖${b}/${d}千克\n3. 同分母相加 = (${a}+${b})/${d} = ${sum}/${d}\n4. 化简 = ${sn}/${sd}（千克）`,
        type: '分数加法应用',
        difficulty: 1,
      };
    },
    // 时间分配
    () => {
      const d = pick([3, 4, 5, 6]);
      const a = randInt(1, d - 1);
      const b = randInt(1, d - a);
      const [sn, sd] = simplifyFrac(a + b, d);
      return {
        content: `一瓶水分成${d}等份，上午喝${a}/${d}瓶，下午喝${b}/${d}瓶，一天共喝多少瓶？`,
        answer: `${sn}/${sd}瓶`,
        solution: `1. 上午${a}/${d}瓶\n2. 下午${b}/${d}瓶\n3. 共喝 = (${a}+${b})/${d} = ${a + b}/${d} = ${sn}/${sd}（瓶）`,
        type: '喝水应用',
        difficulty: 1,
      };
    },
    // 面积分配
    () => {
      const d = pick([3, 4, 5]);
      const d2 = pick([4, 5, 6, 8].filter(x => x !== d));
      const n1 = randInt(1, d - 1);
      const n2 = randInt(1, d2 - 1);
      const cd = (d * d2) / gcd(d, d2);
      const sum = n1 * (cd / d) + n2 * (cd / d2);
      const [sn, sd] = simplifyFrac(sum, cd);
      return {
        content: `${OWL}第一天看了全书的${n1}/${d}，第二天看了${n2}/${d2}，两天共看了几分之几？`,
        answer: `${sn}/${sd}`,
        solution: `1. 第一天${n1}/${d}\n2. 第二天${n2}/${d2}\n3. 通分：${n1}/${d} = ${n1 * (cd / d)}/${cd}\n4. 相加 = ${sum}/${cd}\n5. 化简 = ${sn}/${sd}`,
        type: '异分母加法',
        difficulty: 2,
      };
    },
    // 材料分配
    () => {
      const d = pick([5, 6, 8, 10]);
      const total = randInt(3, d - 1);
      const used = randInt(1, total - 1);
      const [sn, sd] = simplifyFrac(total - used, d);
      return {
        content: `一根绳子长${total}/${d}米，用去${used}/${d}米，还剩多少米？`,
        answer: `${sn}/${sd}米`,
        solution: `1. 总长${total}/${d}米\n2. 用去${used}/${d}米\n3. 剩余 = ${total}/${d} - ${used}/${d} = ${total - used}/${d} = ${sn}/${sd}（米）`,
        type: '分数减法应用',
        difficulty: 1,
      };
    },
    // 进度计算
    () => {
      const d1 = pick([3, 4, 5, 6]);
      const d2 = pick([4, 5, 6, 8, 10].filter(x => x !== d1));
      const cd = (d1 * d2) / gcd(d1, d2);
      const n1 = randInt(2, d1 - 1);
      const maxN2 = Math.floor(n1 * (cd / d1) - 1);
      if (maxN2 < 1) return genAppCh7();
      const n2 = randInt(1, Math.min(d2 - 1, maxN2));
      const resultNum = n1 * (cd / d1) - n2 * (cd / d2);
      const [sn, sd] = simplifyFrac(resultNum, cd);
      return {
        content: `一桶油有${n1}/${d1}升，用了${n2}/${d2}升，还剩多少升？`,
        answer: `${sn}/${sd}升`,
        solution: `1. 一桶油${n1}/${d1}升\n2. 用了${n2}/${d2}升\n3. 通分后相减\n4. 化简 = ${sn}/${sd}（升）`,
        type: '异分母减法',
        difficulty: 2,
      };
    },
    // 成绩比例
    () => {
      const a = randDec(0.5, 3, 1);
      const d = pick([4, 5, 8, 10]);
      const n = randInt(1, d - 1);
      const decFrac = roundTo(n / d, 3);
      const result = roundTo(a + n / d, 2);
      return {
        content: `${CAT}跑了${a}千米，又跑了${n}/${d}千米，一共跑了多少千米？（用小数表示）`,
        answer: `${result}千米`,
        solution: `1. 第一段${a}千米\n2. 第二段${n}/${d}千米 = ${decFrac}千米\n3. 总路程 = ${a} + ${decFrac} = ${result}（千米）`,
        type: '分数小数混合',
        difficulty: 2,
      };
    },
    // 果汁混合
    () => {
      const d = pick([4, 5, 6, 8]);
      const n1 = randInt(1, d - 2);
      const n2 = randInt(1, d - n1 - 1);
      const n3 = randInt(1, d - n1 - n2);
      const sum = n1 + n2 + n3;
      const [sn, sd] = simplifyFrac(sum, d);
      return {
        content: `做手工用了一张纸的${n1}/${d}做花朵，${n2}/${d}做小鸟，${n3}/${d}做飞机。共用了几分之几？`,
        answer: `${sn}/${sd}`,
        solution: `1. 花朵${n1}/${d}\n2. 小鸟${n2}/${d}\n3. 飞机${n3}/${d}\n4. 共用 = (${n1}+${n2}+${n3})/${d} = ${sum}/${d} = ${sn}/${sd}`,
        type: '手工应用',
        difficulty: 2,
      };
    },
    // 土地分配
    () => {
      const d = pick([5, 6, 8, 10]);
      const n1 = randInt(1, d - 2);
      const n2 = randInt(1, d - n1 - 1);
      return {
        content: `一块地的${n1}/${d}种小麦，${n2}/${d}种稻谷，其余种蔬菜。种蔬菜的占几分之几？`,
        answer: `${d - n1 - n2}/${d}`,
        solution: `1. 小麦${n1}/${d}\n2. 稻谷${n2}/${d}\n3. 蔬菜 = 1 - ${n1}/${d} - ${n2}/${d} = ${d - n1 - n2}/${d}`,
        type: '土地分配',
        difficulty: 1,
      };
    },
    // 读书进度
    () => {
      const d = pick([5, 6, 10]);
      const n1 = randInt(1, d - 2);
      const n2 = randInt(1, d - n1 - 1);
      return {
        content: `${DRAGON}看故事书，第一天看了${n1}/${d}，第二天看了${n2}/${d}，还剩几分之几没看？`,
        answer: `${d - n1 - n2}/${d}`,
        solution: `1. 第一天${n1}/${d}\n2. 第二天${n2}/${d}\n3. 已看 = ${n1 + n2}/${d}\n4. 剩余 = ${d}/${d} - ${n1 + n2}/${d} = ${d - n1 - n2}/${d}`,
        type: '读书进度',
        difficulty: 1,
      };
    },
    // 路程分配
    () => {
      const d = pick([6, 8, 10]);
      const a = randInt(1, d - 2);
      const b = randInt(1, d - a - 1);
      return {
        content: `${FROG}从家到学校走了全程的${a}/${d}，坐车${b}/${d}，其余骑车。骑车占全程几分之几？`,
        answer: `${d - a - b}/${d}`,
        solution: `1. 走路${a}/${d}\n2. 坐车${b}/${d}\n3. 骑车 = 1 - ${a}/${d} - ${b}/${d} = ${d - a - b}/${d}`,
        type: '路程分配',
        difficulty: 1,
      };
    },
    // 任务完成
    () => {
      const d = pick([4, 5, 8]);
      const a = randInt(1, d - 2);
      const b = randInt(1, d - a - 1);
      return {
        content: `一项任务第一天完成${a}/${d}，第二天完成${b}/${d}。两天共完成几分之几？`,
        answer: `${a + b}/${d}`,
        solution: `1. 第一天${a}/${d}\n2. 第二天${b}/${d}\n3. 共完成 = ${a}/${d} + ${b}/${d} = ${a + b}/${d}`,
        type: '任务完成',
        difficulty: 1,
      };
    },
    // 投票比例
    () => {
      const total = randInt(30, 50);
      const a = randInt(10, total - 10);
      const b = randInt(5, total - a - 5);
      const [snA, sdA] = simplifyFrac(a, total);
      return {
        content: `${total}人投票，${CAT}得${a}票，${DRAGON}得${b}票。${CAT}得票占总票数的几分之几？`,
        answer: `${snA}/${sdA}`,
        solution: `1. 总票数${total}\n2. ${CAT}${a}票\n3. 比例 = ${a}/${total} = ${snA}/${sdA}`,
        type: '投票比例',
        difficulty: 1,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第八章应用题：分数乘除法（12个模板） ============

export function genAppCh8() {
  const templates = [
    // 折扣计算
    () => {
      const price = randInt(10, 50);
      const d = pick([2, 3, 4, 5]);
      const n = randInt(1, d - 1);
      const discount = roundTo((price * n) / d, 1);
      return {
        content: `一件衣服原价${price}元，打${n}/${d}折后售价是多少元？`,
        answer: `${discount}元`,
        solution: `1. 原价${price}元\n2. 打${n}/${d}折 = 按${n}/${d}销售\n3. 售价 = ${price} × ${n}/${d} = ${discount}（元）`,
        type: '打折应用',
        difficulty: 2,
      };
    },
    // 比例计算
    () => {
      const total = randInt(20, 60);
      const d = pick([3, 4, 5]);
      const n = randInt(1, d - 1);
      const result = (total * n) / d;
      return {
        content: `${total}人参加合唱队，其中${n}/${d}是女生，女生有多少人？`,
        answer: `${result}人`,
        solution: `1. 总人数${total}人\n2. 女生占${n}/${d}\n3. 女生 = ${total} × ${n}/${d} = ${total * n} ÷ ${d} = ${result}（人）`,
        type: '分数乘法应用',
        difficulty: 2,
      };
    },
    // 面积计算
    () => {
      const d = pick([3, 4, 5]);
      const n = randInt(1, d - 1);
      const part = randInt(5, 20);
      const total = (part * d) / n;
      if (!Number.isInteger(total)) return genAppCh8();
      return {
        content: `${FOX}看了${part}页书，正好看了全书的${n}/${d}，这本书一共多少页？`,
        answer: `${total}页`,
        solution: `1. 已看${part}页，占全书${n}/${d}\n2. 设全书x页\n3. x × ${n}/${d} = ${part}\n4. x = ${part} ÷ ${n}/${d} = ${part} × ${d}/${n} = ${total}（页）`,
        type: '分数除法应用',
        difficulty: 2,
      };
    },
    // 速度计算
    () => {
      const total = randInt(40, 100);
      const d1 = pick([4, 5]);
      const n1 = randInt(1, d1 - 1);
      const used = Math.floor((total * n1) / d1);
      return {
        content: `图书馆有${total}本书，借出了${n1}/${d1}，借出了多少本？还剩多少本？`,
        answer: `借出${used}本，剩${total - used}本`,
        solution: `1. 总共${total}本书\n2. 借出${n1}/${d1}\n3. 借出 = ${total} × ${n1}/${d1} = ${used}（本）\n4. 剩余 = ${total} - ${used} = ${total - used}（本）`,
        type: '分数综合',
        difficulty: 2,
      };
    },
    // 效率计算
    () => {
      const d = pick([3, 4, 5]);
      const n = randInt(1, d - 1);
      const days = randInt(5, 15);
      const [sn, sd] = simplifyFrac(n, d * days);
      return {
        content: `一项工程${days}天完成了全部的${n}/${d}，每天完成几分之几？`,
        answer: `${sn}/${sd}`,
        solution: `1. ${days}天完成${n}/${d}\n2. 每天 = ${n}/${d} ÷ ${days}\n3. = ${n}/${d} × 1/${days} = ${n}/${d * days}\n4. 化简 = ${sn}/${sd}`,
        type: '工程分数',
        difficulty: 2,
      };
    },
    // 浓度配比
    () => {
      const total = randInt(40, 100);
      const d1 = pick([4, 5]);
      const n1 = randInt(1, d1 - 1);
      const used = (total * n1) / d1;
      const d2 = pick([3, 4]);
      const n2 = randInt(1, d2 - 1);
      const remain = total - used;
      const result = roundTo((remain * n2) / d2, 1);
      return {
        content: `图书馆有${total}本书，借出${n1}/${d1}后，剩余的${n2}/${d2}是科技书。科技书多少本？`,
        answer: `${result}本`,
        solution: `1. 借出${n1}/${d1}，即${total} × ${n1}/${d1} = ${used}本\n2. 剩余 = ${total} - ${used} = ${remain}本\n3. 科技书 = ${remain} × ${n2}/${d2} = ${result}（本）`,
        type: '分数混合',
        difficulty: 3,
      };
    },
    // 人口比例
    () => {
      const total = randInt(200, 500);
      const d = pick([4, 5, 8]);
      const n = randInt(1, d - 1);
      const result = Math.floor((total * n) / d);
      return {
        content: `一个${total}人的小镇，${n}/${d}的人在工厂工作，工厂有多少人？`,
        answer: `${result}人`,
        solution: `1. 总人口${total}人\n2. 在工厂的占${n}/${d}\n3. 工厂人数 = ${total} × ${n}/${d} ≈ ${result}（人）`,
        type: '人口比例',
        difficulty: 2,
      };
    },
    // 成绩计算
    () => {
      const daily = randInt(80, 100);
      const exam = randInt(70, 100);
      const result = roundTo(daily * 0.4 + exam * 0.6, 1);
      return {
        content: `学期成绩：平时占40%，期末占60%。${CAT}平时${daily}分，期末${exam}分，学期总评多少分？`,
        answer: `${result}分`,
        solution: `1. 平时${daily} × 0.4 = ${roundTo(daily * 0.4, 1)}\n2. 期末${exam} × 0.6 = ${roundTo(exam * 0.6, 1)}\n3. 总评 = ${roundTo(daily * 0.4, 1)} + ${roundTo(exam * 0.6, 1)} = ${result}（分）`,
        type: '成绩计算',
        difficulty: 2,
      };
    },
    // 材料用量
    () => {
      const per = randDec(0.5, 3, 1);
      const count = randInt(3, 8);
      const total = roundTo(per * count, 1);
      return {
        content: `每件衣服用布${per}米，做${count}件共用多少米布？`,
        answer: `${total}米`,
        solution: `1. 每件${per}米\n2. ${count}件\n3. 总用布 = ${per} × ${count} = ${total}（米）`,
        type: '材料用量',
        difficulty: 2,
      };
    },
    // 产量计算
    () => {
      const a = randInt(2, 10);
      return {
        content: `${BEAR}出题：一个自然数${a}与它的倒数的和是多少？`,
        answer: `${a}又1/${a}`,
        solution: `1. ${a}的倒数是1/${a}\n2. 和 = ${a} + 1/${a} = ${a}又1/${a}`,
        type: '倒数和',
        difficulty: 2,
      };
    },
    // 投资收益
    () => {
      const d = pick([3, 4, 5, 6]);
      const n = randInt(1, d - 1);
      return {
        content: `一个数是${n}/${d}，它的倒数与它的乘积是多少？`,
        answer: '1',
        solution: `1. ${n}/${d}的倒数是${d}/${n}\n2. 互为倒数的两个数乘积为1\n3. ${n}/${d} × ${d}/${n} = 1`,
        type: '倒数应用',
        difficulty: 1,
      };
    },
    // 时间分配
    () => {
      const per = randInt(30, 80) / 10;
      const n = randInt(2, 6);
      const total = roundTo(per * n, 1);
      return {
        content: `${RABBIT}每次锻炼${per}小时，一周锻炼${n}次，一周共锻炼多少小时？`,
        answer: `${total}小时`,
        solution: `1. 每次${per}小时\n2. 一周${n}次\n3. 总时间 = ${per} × ${n} = ${total}（小时）`,
        type: '时间分配',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第九章应用题：长方体和正方体（12个模板） ============

export function genAppCh9() {
  const templates = [
    // 鱼缸设计
    () => {
      const l = randInt(5, 15);
      const w = randInt(3, 10);
      const h = randInt(3, 8);
      const vol = l * w * h;
      return {
        content: `${PENGUIN}设计一个长${l}分米、宽${w}分米、高${h}分米的长方体鱼缸，最多能装多少升水？`,
        answer: `${vol}升`,
        solution: `1. 体积 = 长 × 宽 × 高\n2. = ${l} × ${w} × ${h} = ${vol}（立方分米）\n3. 1立方分米 = 1升\n4. 能装${vol}升`,
        type: '容积应用',
        difficulty: 2,
      };
    },
    // 礼物包装
    () => {
      const a = randInt(3, 10);
      const sa = 6 * a * a;
      return {
        content: `${RABBIT}做一个棱长${a}厘米的正方体礼品盒，至少需要多少平方厘米的包装纸？`,
        answer: `${sa}平方厘米`,
        solution: `1. 正方体表面积 = 6 × 棱长²\n2. = 6 × ${a}² = 6 × ${a * a} = ${sa}（平方厘米）`,
        type: '正方体表面积',
        difficulty: 1,
      };
    },
    // 房间粉刷
    () => {
      const l = randInt(8, 15);
      const w = randInt(5, 10);
      const h = randInt(3, 6);
      const walls = 2 * (l * h + w * h);
      const ceiling = l * w;
      const total = walls + ceiling;
      const price = randInt(5, 15);
      return {
        content: `房间长${l}米、宽${w}米、高${h}米。四面墙和天花板刷油漆，每平方米${price}元，共需多少钱？（不算地面）`,
        answer: `${total * price}元`,
        solution: `1. 四面墙 = 2×(${l}×${h}+${w}×${h}) = ${walls}平方米\n2. 天花板 = ${l}×${w} = ${ceiling}平方米\n3. 总面积 = ${total}平方米\n4. 费用 = ${total}×${price} = ${total * price}（元）`,
        type: '刷油漆',
        difficulty: 3,
      };
    },
    // 水箱容量
    () => {
      const l = randInt(5, 12);
      const w = randInt(3, 8);
      const h = randInt(2, 5);
      const vol = l * w * h;
      return {
        content: `挖一个长${l}米、宽${w}米、深${h}米的水池，需要挖出多少立方米的土？`,
        answer: `${vol}立方米`,
        solution: `1. 体积 = 长 × 宽 × 深\n2. = ${l} × ${w} × ${h} = ${vol}（立方米）`,
        type: '挖土方',
        difficulty: 2,
      };
    },
    // 砖块数量
    () => {
      const l = randInt(5, 12);
      const w = randInt(3, 8);
      const h = randInt(2, 6);
      const edge = 4 * (l + w + h);
      return {
        content: `用铁丝做一个长${l}cm、宽${w}cm、高${h}cm的长方体框架，至少需要多少厘米铁丝？`,
        answer: `${edge}厘米`,
        solution: `1. 长方体12条棱：4条长、4条宽、4条高\n2. 总和 = 4×(${l}+${w}+${h}) = 4×${l + w + h} = ${edge}（厘米）`,
        type: '棱长应用',
        difficulty: 2,
      };
    },
    // 纸箱体积
    () => {
      const l = randInt(5, 12);
      const w = randInt(3, 8);
      const h = randInt(2, 6);
      const sa = 2 * (l * w + l * h + w * h);
      return {
        content: `做一个长${l}cm、宽${w}cm、高${h}cm的纸盒，至少需要多少平方厘米纸板？`,
        answer: `${sa}平方厘米`,
        solution: `1. 表面积 = 2×(长×宽 + 长×高 + 宽×高)\n2. = 2×(${l}×${w} + ${l}×${h} + ${w}×${h})\n3. = 2×(${l * w} + ${l * h} + ${w * h}) = ${sa}（平方厘米）`,
        type: '表面积应用',
        difficulty: 2,
      };
    },
    // 冰块融化
    () => {
      const a = randInt(3, 8);
      const vol = a * a * a;
      return {
        content: `一个正方体冰块棱长${a}分米，融化成水后体积是多少立方分米？（假设体积不变）`,
        answer: `${vol}立方分米`,
        solution: `1. 正方体体积 = 棱长³\n2. = ${a}³ = ${a * a * a}（立方分米）\n3. 融化后体积不变`,
        type: '正方体体积',
        difficulty: 1,
      };
    },
    // 仓库容量
    () => {
      const l = randInt(3, 8);
      const w = randInt(2, 6);
      const h = randInt(2, 5);
      const volDm = l * w * h;
      const volCm = volDm * 1000;
      return {
        content: `一个容器长${l}分米、宽${w}分米、高${h}分米，容积是多少立方分米？合多少立方厘米？`,
        answer: `${volDm}立方分米，${volCm}立方厘米`,
        solution: `1. 容积 = ${l} × ${w} × ${h} = ${volDm}（立方分米）\n2. 1立方分米 = 1000立方厘米\n3. ${volDm} × 1000 = ${volCm}（立方厘米）`,
        type: '容积换算',
        difficulty: 2,
      };
    },
    // 游泳池
    () => {
      const l = randInt(10, 25);
      const w = randInt(5, 15);
      const h = randInt(1, 3);
      const vol = l * w * h;
      return {
        content: `游泳池长${l}米、宽${w}米、深${h}米，需要多少立方米的水才能注满？`,
        answer: `${vol}立方米`,
        solution: `1. 体积 = ${l} × ${w} × ${h} = ${vol}（立方米）\n2. 需要${vol}立方米水`,
        type: '游泳池',
        difficulty: 2,
      };
    },
    // 集装箱
    () => {
      const l = randInt(5, 12);
      const w = randInt(3, 8);
      const h = randInt(3, 8);
      const vol = l * w * h;
      return {
        content: `集装箱内部尺寸：长${l}米、宽${w}米、高${h}米，容积是多少立方米？`,
        answer: `${vol}立方米`,
        solution: `1. 容积 = 长 × 宽 × 高\n2. = ${l} × ${w} × ${h} = ${vol}（立方米）`,
        type: '集装箱',
        difficulty: 2,
      };
    },
    // 积木搭建
    () => {
      const a = randInt(2, 5);
      const n = randInt(4, 10);
      const vol = a * a * a;
      const totalVol = vol * n;
      return {
        content: `${DRAGON}用${n}个棱长${a}厘米的正方体积木搭成长方体，总体积是多少立方厘米？`,
        answer: `${totalVol}立方厘米`,
        solution: `1. 每个体积 = ${a}³ = ${vol}（立方厘米）\n2. ${n}个总体积 = ${vol} × ${n} = ${totalVol}（立方厘米）`,
        type: '积木搭建',
        difficulty: 1,
      };
    },
    // 沙坑填沙
    () => {
      const l = randInt(5, 10);
      const w = randInt(3, 8);
      const h = randInt(1, 3);
      const vol = l * w * h;
      const per = randInt(50, 200);
      return {
        content: `沙坑长${l}米、宽${w}米、深${h}米，每车运${per}千克沙（密度约1500千克/立方米），至少需要多少车？`,
        answer: `${Math.ceil((vol * 1.5) / (per / 1000))}车`,
        solution: `1. 体积 = ${l} × ${w} × ${h} = ${vol}（立方米）\n2. 沙重 ≈ ${vol} × 1.5 = ${roundTo(vol * 1.5, 1)}（吨）\n3. 每车${per / 1000}吨\n4. 需要车次 = ${roundTo(vol * 1.5, 1)} ÷ ${per / 1000}，向上取整`,
        type: '沙坑填沙',
        difficulty: 3,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十章应用题：可能性（8个模板） ============

export function genAppCh10() {
  const templates = [
    // 抽奖概率
    () => {
      const total = randInt(8, 20);
      const win = randInt(1, Math.floor(total / 2));
      const [sn, sd] = simplifyFrac(win, total);
      return {
        content: `箱子里有${total}张纸条，其中${win}张写着"中奖"。抽一张，中奖的可能性是几分之几？`,
        answer: `${sn}/${sd}`,
        solution: `1. 总共${total}张\n2. 中奖${win}张\n3. 可能性 = ${win}/${total} = ${sn}/${sd}`,
        type: '抽签问题',
        difficulty: 1,
      };
    },
    // 转盘游戏
    () => {
      const total = pick([6, 8, 10, 12]);
      const red = randInt(1, total - 2);
      const blue = randInt(1, total - red - 1);
      const green = total - red - blue;
      const [sn, sd] = simplifyFrac(red + blue, total);
      return {
        content: `转盘${total}等份：${red}份红、${blue}份蓝、${green}份绿。指针停在红色或蓝色区域的可能性是几分之几？`,
        answer: `${sn}/${sd}`,
        solution: `1. 红色${red}份 + 蓝色${blue}份 = ${red + blue}份\n2. 总共${total}份\n3. 可能性 = ${red + blue}/${total} = ${sn}/${sd}`,
        type: '转盘游戏',
        difficulty: 2,
      };
    },
    // 摸球问题
    () => {
      const total = randInt(6, 12);
      const red = randInt(1, total - 1);
      const blue = total - red;
      return {
        content: `盒子里${total}个球（${red}红${blue}蓝），随机摸一个。摸到红球的可能性是几分之几？`,
        answer: `${red}/${total}`,
        solution: `1. 共${total}个球\n2. 红球${red}个\n3. 摸到红球 = ${red}/${total}`,
        type: '摸球问题',
        difficulty: 1,
      };
    },
    // 掷骰子
    () => {
      const target = randInt(1, 6);
      return {
        content: `${FROG}掷一个标准骰子，掷出${target}的可能性是几分之几？掷出偶数呢？`,
        answer: `${target}的可能性是1/6，偶数是1/2`,
        solution: `1. 骰子有6个面\n2. 掷出${target}：1种情况，可能性 = 1/6\n3. 偶数有2、4、6共3个\n4. 偶数可能性 = 3/6 = 1/2`,
        type: '骰子问题',
        difficulty: 1,
      };
    },
    // 天气预报
    () => {
      const total1 = pick([4, 5, 6, 10]);
      const n1 = randInt(1, total1 - 1);
      const total2 = pick([4, 5, 6, 10]);
      const n2 = randInt(1, total2 - 1);
      const v1 = n1 / total1;
      const v2 = n2 / total2;
      return {
        content: `甲箱${total1}个球中${n1}个红球，乙箱${total2}个球中${n2}个红球。从哪个箱摸到红球的可能性更大？`,
        answer: `${v1 > v2 ? '甲' : v1 < v2 ? '乙' : '一样大'}箱`,
        solution: `1. 甲箱：${n1}/${total1} ≈ ${roundTo(v1, 2)}\n2. 乙箱：${n2}/${total2} ≈ ${roundTo(v2, 2)}\n3. ${roundTo(v1, 2)} ${v1 > v2 ? '>' : v1 < v2 ? '<' : '='} ${roundTo(v2, 2)}\n4. ${v1 > v2 ? '甲' : v1 < v2 ? '乙' : '两个'}箱可能性更大`,
        type: '比较可能性',
        difficulty: 2,
      };
    },
    // 中奖概率
    () => {
      const total = randInt(10, 20);
      const r = randInt(2, 5);
      const b = randInt(2, 5);
      const g = total - r - b;
      if (g <= 0) return genAppCh10();
      return {
        content: `袋子里${total}个球：${r}红${b}蓝${g}绿。摸到哪种颜色球的可能性最大？`,
        answer: `${r >= b && r >= g ? '红' : b >= r && b >= g ? '蓝' : '绿'}球`,
        solution: `1. 红球${r}/${total}\n2. 蓝球${b}/${total}\n3. 绿球${g}/${total}\n4. ${Math.max(r, b, g)}最大，所以${r >= b && r >= g ? '红' : b >= r && b >= g ? '蓝' : '绿'}球可能性最大`,
        type: '中奖概率',
        difficulty: 2,
      };
    },
    // 分组概率
    () => {
      return {
        content: `从一副扑克牌（52张）中随机抽一张，抽到红心A的可能性是多少？抽到A呢？`,
        answer: `红心A：1/52，A：1/13`,
        solution: `1. 红心A只有1张：1/52\n2. A有4张：4/52 = 1/13`,
        type: '扑克牌问题',
        difficulty: 2,
      };
    },
    // 配对概率
    () => {
      const total = randInt(6, 12);
      const red = randInt(1, total - 1);
      const blue = total - red;
      return {
        content: `${CAT}盒子里${total}个球（${red}红${blue}蓝），摸到红球和摸到蓝球的可能性加起来是多少？`,
        answer: `1（即${total}/${total}）`,
        solution: `1. 摸到红球 = ${red}/${total}\n2. 摸到蓝球 = ${blue}/${total}\n3. 合计 = ${red}/${total} + ${blue}/${total} = ${total}/${total} = 1\n4. 所有可能性之和为1`,
        type: '配对概率',
        difficulty: 1,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十一章应用题：方程与代数（10个模板） ============

export function genAppCh11() {
  const templates = [
    // 复杂年龄问题
    () => {
      const child = randInt(6, 12);
      const diff = randInt(25, 35);
      const parent = child + diff;
      return {
        content: `今年妈妈的年龄是${RABBIT}的${roundTo(parent / child, 1)}倍，妈妈比${RABBIT}大${diff}岁。她们各多少岁？（列方程解）`,
        answer: `${RABBIT}${child}岁，妈妈${parent}岁`,
        solution: `1. 设${RABBIT}x岁\n2. 妈妈 = x + ${diff}\n3. 用差来解\n4. ${RABBIT}${child}岁，妈妈${parent}岁`,
        type: '年龄方程',
        difficulty: 3,
      };
    },
    // 行程相遇
    () => {
      const speed1 = randInt(40, 70);
      const speed2 = randInt(50, 80);
      const time = randInt(2, 5);
      const diff = (speed2 - speed1) * time;
      return {
        content: `甲乙两车同向出发，甲${speed1}千米/小时，乙${speed2}千米/小时。${time}小时后相距多少千米？（列方程解）`,
        answer: `${diff}千米`,
        solution: `1. 甲走${speed1} × ${time} = ${speed1 * time}千米\n2. 乙走${speed2} × ${time} = ${speed2 * time}千米\n3. 相距${diff}千米`,
        type: '行程方程',
        difficulty: 2,
      };
    },
    // 工程合作
    () => {
      const daily = randInt(10, 25);
      const days = randInt(4, 8);
      const total = daily * days;
      return {
        content: `修一条${total}米长的路，每天修${daily}米，几天修完？（列方程解）`,
        answer: `${days}天`,
        solution: `1. 设x天修完\n2. 方程：${daily}x = ${total}\n3. x = ${total} ÷ ${daily} = ${days}`,
        type: '工程方程',
        difficulty: 2,
      };
    },
    // 浓度配比
    () => {
      const n = randInt(3, 6);
      const per = randInt(8, 20);
      const total = n * per;
      return {
        content: `老师把${total}本书平均分给${n}组，每组几本？（列方程解）`,
        answer: `每组${per}本`,
        solution: `1. 设每组x本\n2. 方程：${n}x = ${total}\n3. x = ${total} ÷ ${n} = ${per}`,
        type: '分配方程',
        difficulty: 2,
      };
    },
    // 利润问题
    () => {
      const a = randInt(3, 8);
      const price = randInt(5, 15);
      const extra = randInt(10, 30);
      const total = a * price + extra;
      return {
        content: `${OWL}买了${a}支同样的笔和一个${extra}元的书签，共花${total}元。每支笔多少元？（列方程解）`,
        answer: `每支笔${price}元`,
        solution: `1. 设每支笔x元\n2. 方程：${a}x + ${extra} = ${total}\n3. ${a}x = ${total} - ${extra} = ${a * price}\n4. x = ${price}`,
        type: '复合方程',
        difficulty: 3,
      };
    },
    // 数字谜题
    () => {
      const x = randInt(5, 20);
      const add = randInt(3, 15);
      const mul = randInt(2, 5);
      const result = (x + add) * mul;
      return {
        content: `${DRAGON}的谜题：一个数加上${add}，再乘以${mul}，结果是${result}。这个数是多少？（列方程解）`,
        answer: `${x}`,
        solution: `1. 设这个数为x\n2. 方程：(x + ${add}) × ${mul} = ${result}\n3. x + ${add} = ${result} ÷ ${mul} = ${result / mul}\n4. x = ${result / mul} - ${add} = ${x}`,
        type: '数字谜题',
        difficulty: 2,
      };
    },
    // 图形面积
    () => {
      const base = randInt(5, 12);
      const height = randInt(4, 10);
      const area = base * height;
      return {
        content: `平行四边形面积${area}平方厘米，底${base}厘米，高多少？（列方程解）`,
        answer: `${height}厘米`,
        solution: `1. 设高为x厘米\n2. 方程：${base}x = ${area}\n3. x = ${area} ÷ ${base} = ${height}`,
        type: '面积方程',
        difficulty: 2,
      };
    },
    // 分数方程
    () => {
      const price = randInt(3, 12);
      const count = randInt(3, 8);
      const pay = price * count + randInt(10, 30);
      const change = pay - price * count;
      return {
        content: `每本笔记本${price}元，买了若干本后付了${pay}元找回${change}元。买了几本？（列方程解）`,
        answer: `${count}本`,
        solution: `1. 设买了x本\n2. 实际花费 = ${pay} - ${change} = ${price * count}元\n3. 方程：${price}x = ${price * count}\n4. x = ${count}`,
        type: '总价方程',
        difficulty: 2,
      };
    },
    // 多步方程
    () => {
      const x = randInt(3, 15);
      const sub = randInt(2, 8);
      const mul = randInt(2, 4);
      const result = (x - sub) * mul;
      return {
        content: `一个数减去${sub}，再乘以${mul}，结果是${result}。这个数是多少？（列方程解）`,
        answer: `${x}`,
        solution: `1. 设这个数为x\n2. 方程：(x - ${sub}) × ${mul} = ${result}\n3. x - ${sub} = ${result} ÷ ${mul} = ${result / mul}\n4. x = ${result / mul} + ${sub} = ${x}`,
        type: '两步逆推',
        difficulty: 2,
      };
    },
    // 实际建模
    () => {
      const speed = randInt(40, 80);
      const time = randInt(2, 5);
      const dist = speed * time;
      return {
        content: `${CAT}和${DRAGON}相距${dist}千米，同时出发相向而行。${CAT}每小时${speed}千米，${time}小时后相遇。${DRAGON}每小时多少千米？（列方程解）`,
        answer: `${(dist / time - speed).toFixed(0)}千米（需两人速度和=总路程÷时间）`,
        solution: `1. 设${DRAGON}每小时x千米\n2. 方程：(${speed} + x) × ${time} = ${dist}\n3. ${speed} + x = ${dist} ÷ ${time} = ${dist / time}\n4. x = ${dist / time} - ${speed} ≈ ${roundTo(dist / time - speed, 0)}`,
        type: '行程相遇',
        difficulty: 3,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十二章应用题：总复习（10个模板） ============

export function genAppCh12() {
  const templates = [
    // 综合计算
    () => {
      const price1 = randDec(3, 15, 1);
      const count1 = randInt(2, 5);
      const price2 = randDec(2, 10, 1);
      const count2 = randInt(1, 4);
      const total = roundTo(price1 * count1 + price2 * count2, 1);
      return {
        content: `苹果每千克${price1}元，买${count1}千克；香蕉每千克${price2}元，买${count2}千克。一共多少钱？`,
        answer: `${total}元`,
        solution: `1. 苹果${price1} × ${count1} = ${roundTo(price1 * count1, 1)}元\n2. 香蕉${price2} × ${count2} = ${roundTo(price2 * count2, 1)}元\n3. 总计 = ${total}（元）`,
        type: '综合购物',
        difficulty: 2,
      };
    },
    // 几何综合
    () => {
      const l = randInt(5, 12);
      const w = randInt(3, 8);
      const h = randInt(3, 8);
      const vol = l * w * h;
      const sa = 2 * (l * w + l * h + w * h);
      return {
        content: `一个长方体长${l}cm、宽${w}cm、高${h}cm。求表面积和体积。`,
        answer: `表面积${sa}平方厘米，体积${vol}立方厘米`,
        solution: `1. 表面积 = 2×(${l}×${w} + ${l}×${h} + ${w}×${h}) = ${sa}（平方厘米）\n2. 体积 = ${l} × ${w} × ${h} = ${vol}（立方厘米）`,
        type: '几何综合',
        difficulty: 2,
      };
    },
    // 方程综合
    () => {
      const a = randInt(3, 8);
      const x = randInt(5, 15);
      const b = randInt(10, 30);
      const c = a * x + b;
      return {
        content: `买了${a}本同样的书和一个${b}元的笔袋，共花${c}元。每本书多少元？（列方程解）`,
        answer: `每本${x}元`,
        solution: `1. 设每本书x元\n2. 方程：${a}x + ${b} = ${c}\n3. ${a}x = ${c} - ${b} = ${a * x}\n4. x = ${x}`,
        type: '方程综合',
        difficulty: 2,
      };
    },
    // 统计综合
    () => {
      const n = randInt(4, 6);
      const scores = Array.from({ length: n }, () => randInt(70, 100));
      const sum = scores.reduce((a, b) => a + b, 0);
      const avg = roundTo(sum / n, 1);
      return {
        content: `${n}位同学数学成绩：${scores.join('、')}分。平均分是多少？`,
        answer: `${avg}分`,
        solution: `1. 总分 = ${scores.join('+')} = ${sum}\n2. 平均 = ${sum} ÷ ${n} = ${avg}（分）`,
        type: '统计综合',
        difficulty: 2,
      };
    },
    // 分数综合
    () => {
      const total = randInt(40, 100);
      const d1 = pick([4, 5]);
      const n1 = randInt(1, d1 - 1);
      const used = Math.floor((total * n1) / d1);
      return {
        content: `图书馆${total}本书，借出${n1}/${d1}，借出多少本？还剩多少本？`,
        answer: `借出${used}本，剩${total - used}本`,
        solution: `1. 借出 = ${total} × ${n1}/${d1} = ${used}本\n2. 剩余 = ${total} - ${used} = ${total - used}本`,
        type: '分数综合',
        difficulty: 2,
      };
    },
    // 小数综合
    () => {
      const speed = randDec(3, 8, 1);
      const time = randDec(1.5, 5, 1);
      const dist = roundTo(speed * time, 1);
      return {
        content: `${PENGUIN}骑自行车每小时行${speed}千米，骑了${time}小时。行了多少千米？`,
        answer: `${dist}千米`,
        solution: `1. 路程 = ${speed} × ${time} = ${dist}（千米）`,
        type: '行程综合',
        difficulty: 1,
      };
    },
    // 面积体积综合
    () => {
      const total = randInt(8, 16);
      const r = randInt(2, 6);
      const b = randInt(1, total - r - 1);
      const g = total - r - b;
      const [snR, sdR] = simplifyFrac(r, total);
      return {
        content: `盒子里${total}个球（${r}红${b}蓝${g}绿），摸到红球的可能性是几分之几？`,
        answer: `${snR}/${sdR}`,
        solution: `1. 共${total}个球\n2. 红球${r}个\n3. 可能性 = ${r}/${total} = ${snR}/${sdR}`,
        type: '可能性综合',
        difficulty: 1,
      };
    },
    // 比例综合
    () => {
      const year = 2024;
      const cls = randInt(1, 12);
      const num = randInt(1, 40);
      const code = `${year}${String(cls).padStart(2, '0')}${String(num).padStart(2, '0')}`;
      return {
        content: `编号规则：入学年份(4位)+班级(2位)+学号(2位)。${year}年入学${cls}班${num}号的编号是多少？`,
        answer: code,
        solution: `1. 年份${year}\n2. 班级${cls} → ${String(cls).padStart(2, '0')}\n3. 学号${num} → ${String(num).padStart(2, '0')}\n4. 编号${code}`,
        type: '编码综合',
        difficulty: 1,
      };
    },
    // 实际问题综合
    () => {
      const base = randInt(6, 14);
      const height = randInt(4, 10);
      const price = randDec(2, 10, 1);
      const area = base * height;
      const total = roundTo(area * price, 1);
      return {
        content: `平行四边形菜地底${base}米、高${height}米，每平方米产蔬菜${price}千克。共产蔬菜多少千克？`,
        answer: `${total}千克`,
        solution: `1. 面积 = ${base} × ${height} = ${area}（平方米）\n2. 总产 = ${area} × ${price} = ${total}（千克）`,
        type: '图形计算',
        difficulty: 2,
      };
    },
    // 跨学科综合
    () => {
      const efficiency = randInt(10, 30);
      const time = randInt(3, 8);
      const total = efficiency * time;
      return {
        content: `一批零件${total}个，${time}小时完成。平均每小时做多少个？效率提高到2倍需要几小时？`,
        answer: `${efficiency}个/小时，${time / 2}小时`,
        solution: `1. 效率 = ${total} ÷ ${time} = ${efficiency}（个/小时）\n2. 2倍效率 = ${efficiency * 2}（个/小时）\n3. 时间 = ${total} ÷ ${efficiency * 2} = ${time / 2}（小时）`,
        type: '效率逆推',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}
