// 各年级各章思考推理题 - 每章1道，需要更多思考但不超纲

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// ================================================================
// 一年级思考推理题（7章）
// ================================================================

// 第1章：10以内的数 - 逆向推理
export function thinkG1Ch1() {
  const a = randInt(2, 5);
  const b = randInt(2, 5);
  const c = a + b;
  return {
    content: `🐱 算算猫有${c}颗星星贴纸，它分成了两堆。一堆有${a}颗，另一堆有几颗？如果它想让两堆一样多，应该从多的那堆拿几颗给少的？`,
    answer: `${c - a},${a === c - a ? 0 : Math.abs(a - (c - a)) / 2}`,
    solution: `1. 总共${c}颗，一堆${a}颗\n2. 另一堆 = ${c} - ${a} = ${c - a}（颗）\n3. 两堆分别是${a}颗和${c - a}颗\n4. 要一样多，每堆应该是${c} ÷ 2 = ${c / 2}颗\n5. 从多的那堆拿${Math.abs(a - (c - a)) / 2}颗给少的`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第2章：10以内加减法 - 找规律
export function thinkG1Ch2() {
  const start = randInt(1, 3);
  const step = randInt(1, 3);
  const n1 = start;
  const n2 = start + step;
  const n3 = start + step * 2;
  const n4 = start + step * 3;
  const n5 = start + step * 4;
  return {
    content: `🦊 机灵狐发现了一串数字密码：${n1}、${n2}、${n3}、${n4}、__、${n5 + step}。请问空格里应该填几？这串数字的规律是什么？`,
    answer: String(n5),
    solution: `1. 观察这串数字：${n1}、${n2}、${n3}、${n4}、__、${n5 + step}\n2. ${n2} - ${n1} = ${step}，${n3} - ${n2} = ${step}，${n4} - ${n3} = ${step}\n3. 每次都增加${step}，这就是规律！\n4. 所以空格 = ${n4} + ${step} = ${n5}\n5. 验证：${n5} + ${step} = ${n5 + step} ✓`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第3章：20以内加减法 - 多步推理
export function thinkG1Ch3() {
  const total = randInt(12, 18);
  const a = randInt(3, total - 6);
  const b = randInt(2, total - a - 2);
  const c = total - a - b;
  return {
    content: `🐉 智慧龙有${total}块积木，它搭城堡用了一些，又搭小桥用了一些，最后还剩${c}块。已知城堡用了${a}块，小桥用了多少块？`,
    answer: String(b),
    solution: `1. 总共${total}块积木\n2. 城堡用了${a}块\n3. 还剩${c}块\n4. 搭城堡和小桥一共用了：${total} - ${c} = ${total - c}（块）\n5. 小桥用了：${total - c} - ${a} = ${b}（块）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第4章：认识图形 - 图形推理
export function thinkG1Ch4() {
  const s = randInt(3, 6);
  const t = randInt(2, 4);
  return {
    content: `🐱 算算猫用${s}个正方形和${t}个三角形拼了一幅画。它一共用了多少个图形？这些图形一共有多少条边？（正方形4条边，三角形3条边）`,
    answer: `${s + t}个,${s * 4 + t * 3}条边`,
    solution: `1. 正方形${s}个，三角形${t}个\n2. 图形总数：${s} + ${t} = ${s + t}（个）\n3. 正方形的边：${s} × 4 = ${s * 4}（条）\n4. 三角形的边：${t} × 3 = ${t * 3}（条）\n5. 总边数：${s * 4} + ${t * 3} = ${s * 4 + t * 3}（条）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第5章：位置 - 空间推理
export function thinkG1Ch5() {
  return {
    content: `🐧 企鹅博士坐在教室里，它的左边是🐱算算猫，右边是🐉智慧龙。🐱算算猫的左边是🦊机灵狐。请问从左到右的顺序是什么？`,
    answer: '机灵狐、算算猫、企鹅博士、智慧龙',
    solution: `1. 企鹅博士左边是算算猫，右边是智慧龙\n2. 所以顺序是：算算猫、企鹅博士、智慧龙\n3. 算算猫的左边是机灵狐\n4. 最终从左到右：机灵狐、算算猫、企鹅博士、智慧龙`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第6章：认识人民币 - 凑钱推理
export function thinkG1Ch6() {
  const price = randInt(3, 8);
  const have1 = randInt(1, price - 1);
  const have2 = randInt(1, price - have1);
  const need = price - have1 - have2;
  return {
    content: `🦊 机灵狐想买一个${price}元的玩具。它有${have1}元硬币和${have2}元纸币，还差多少钱？如果它再找到${need}元，够买吗？`,
    answer: `差${need}元,够了`,
    solution: `1. 玩具${price}元\n2. 机灵狐有${have1}元 + ${have2}元 = ${have1 + have2}（元）\n3. 还差：${price} - ${have1 + have2} = ${need}（元）\n4. 再找到${need}元：${have1 + have2} + ${need} = ${price}（元）\n5. 刚好够买！`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第7章：认识钟表 - 时间推理
export function thinkG1Ch7() {
  const h1 = randInt(2, 6);
  const mins = randInt(1, 3) * 30;
  const h2 = h1 + Math.floor(mins / 60);
  const m2 = mins % 60;
  return {
    content: `🐻 小熊老师开始看故事书的时候是${h1}时整。它看了${mins}分钟后，几点几分了？如果它要在${h2 + 1}时出门，还能看多少分钟？`,
    answer: `${h2}时${m2 === 0 ? '整' : m2 + '分'},${60 - m2}分钟`,
    solution: `1. 开始时间：${h1}时整\n2. 看了${mins}分钟\n3. ${mins}分钟 = ${Math.floor(mins / 60)}小时${m2}分钟\n4. 现在是${h1}时 + ${Math.floor(mins / 60)}小时${m2}分 = ${h2}时${m2}分\n5. 距离${h2 + 1}时还有：60 - ${m2} = ${60 - m2}（分钟）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// ================================================================
// 二年级思考推理题（13章）
// ================================================================

// 第1章：100以内加减法 - 多步推理
export function thinkG2Ch1() {
  const a = randInt(20, 50);
  const b = randInt(10, 30);
  const c = randInt(5, 15);
  return {
    content: `🐉 智慧龙有${a + b + c}元钱。它买文具花了${a}元，买零食花了${b}元。剩下的钱刚好够买一本故事书。这本故事书多少元？`,
    answer: String(c),
    solution: `1. 智慧龙原有${a + b + c}元\n2. 买文具花了${a}元\n3. 买零食花了${b}元\n4. 剩下的钱 = ${a + b + c} - ${a} - ${b} = ${c}（元）\n5. 故事书的价格就是剩下的钱：${c}元`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第2章：表内乘法 - 逆向推理
export function thinkG2Ch2() {
  const a = randInt(3, 7);
  const b = randInt(3, 7);
  const product = a * b;
  return {
    content: `🐱 算算猫有一些贴纸，它可以排成${a}行，每行${b}张，刚好排完。如果它想排成${b}行，每行几张？如果排成一行，一共多少张？`,
    answer: `${a}张,${product}张`,
    solution: `1. 排成${a}行，每行${b}张：${a} × ${b} = ${product}（张）\n2. 总共有${product}张贴纸\n3. 排成${b}行：${product} ÷ ${b} = ${a}（张/行）\n4. 排成一行：${product}张`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第3章：表内除法 - 余数推理
export function thinkG2Ch3() {
  const per = randInt(3, 6);
  const groups = randInt(2, 4);
  const extra = randInt(1, per - 1);
  const total = per * groups + extra;
  return {
    content: `🐧 企鹅博士有${total}块饼干🍪，平均分给${groups}个好朋友，每人分${per}块，还剩${extra}块。它又找到了${per - extra}块饼干，现在再分一次，每人能多分几块？还剩几块？`,
    answer: `多分1块,剩0块`,
    solution: `1. 原来${total}块，分${groups}人，每人${per}块，剩${extra}块\n2. 又找到${per - extra}块，现在有${total + per - extra}块\n3. ${total + per - extra} ÷ ${groups} = ${per + 1}（块）……0（块）\n4. 每人多分1块，刚好分完，不剩了！`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第4章：几何初步 - 周长推理
export function thinkG2Ch4() {
  const l = randInt(5, 10);
  const w = randInt(3, 6);
  return {
    content: `🦊 机灵狐用一根${2 * (l + w)}厘米的铁丝围成一个长方形，长是${l}厘米。宽是多少厘米？如果它把这根铁丝改围成正方形，边长是多少厘米？`,
    answer: `${w}厘米,${(l + w) / 2}厘米`,
    solution: `1. 铁丝长${2 * (l + w)}厘米，就是长方形的周长\n2. 周长 = (长 + 宽) × 2\n3. 长 + 宽 = ${2 * (l + w)} ÷ 2 = ${l + w}（厘米）\n4. 宽 = ${l + w} - ${l} = ${w}（厘米）\n5. 改围正方形：边长 = ${2 * (l + w)} ÷ 4 = ${(l + w) / 2}（厘米）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第5章：认识时分 - 时间推理
export function thinkG2Ch5() {
  const start = randInt(7, 9);
  const duration1 = randInt(20, 40);
  const duration2 = randInt(15, 30);
  const totalMin = duration1 + duration2;
  const endH = start + Math.floor(totalMin / 60);
  const endM = totalMin % 60;
  return {
    content: `🐻 小熊老师${start}:00开始做数学作业，做了${duration1}分钟；接着做语文作业，做了${duration2}分钟。它几点几分做完所有作业？`,
    answer: `${endH}:${endM === 0 ? '00' : endM}`,
    solution: `1. 数学作业：${duration1}分钟\n2. 语文作业：${duration2}分钟\n3. 总共用时：${duration1} + ${duration2} = ${totalMin}（分钟）\n4. ${totalMin}分钟 = ${Math.floor(totalMin / 60)}小时${totalMin % 60}分钟\n5. 开始时间${start}:00，经过${Math.floor(totalMin / 60)}小时${totalMin % 60}分钟\n6. 结束时间：${endH}:${endM === 0 ? '00' : endM}`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第6章：千以内数 - 数字推理
export function thinkG2Ch6() {
  const hundreds = randInt(1, 4);
  const tens = randInt(0, 9);
  const ones = randInt(0, 9);
  const num = hundreds * 100 + tens * 10 + ones;
  return {
    content: `🦉 猫头鹰老师出了一道数字谜题：一个三位数，百位是${hundreds}，十位和个位上的数字之和是${tens + ones}，十位比个位${tens >= ones ? '大' : '小'}${Math.abs(tens - ones)}。这个三位数是多少？`,
    answer: String(num),
    solution: `1. 百位是${hundreds}\n2. 十位 + 个位 = ${tens + ones}\n3. 十位比个位${tens >= ones ? '大' : '小'}${Math.abs(tens - ones)}\n4. 设个位是x，十位是${tens >= ones ? `x + ${Math.abs(tens - ones)}` : `x - ${Math.abs(tens - ones)}`}\n5. 解方程：${tens >= ones ? `x + ${Math.abs(tens - ones)} + x` : `x - ${Math.abs(tens - ones)} + x`} = ${tens + ones}\n6. 个位 = ${ones}，十位 = ${tens}\n7. 这个数是${num}`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第7章：三位数加减法 - 比较推理
export function thinkG2Ch7() {
  const a = randInt(100, 300);
  const b = randInt(50, 150);
  const c = randInt(50, 150);
  return {
    content: `🐉 智慧龙、🐱算算猫、🐧企鹅博士三人比赛收集邮票。智慧龙有${a}张，算算猫比智慧龙少${b}张，企鹅博士比算算猫多${c}张。谁收集的最多？最多的比最少的多多少张？`,
    answer: `${a >= a - b && a >= a - b + c ? '智慧龙' : a - b + c >= a && a - b + c >= a - b ? '企鹅博士' : '算算猫'}多${Math.max(a, a - b + c) - Math.min(a, a - b)}张`,
    solution: `1. 智慧龙：${a}张\n2. 算算猫比智慧龙少${b}张：${a} - ${b} = ${a - b}（张）\n3. 企鹅博士比算算猫多${c}张：${a - b} + ${c} = ${a - b + c}（张）\n4. 比较：${a}、${a - b}、${a - b + c}\n5. 最多的是${Math.max(a, a - b + c)}张，最少的是${Math.min(a, a - b)}张\n6. 相差：${Math.max(a, a - b + c)} - ${Math.min(a, a - b)} = ${Math.max(a, a - b + c) - Math.min(a, a - b)}（张）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第8章：克与千克 - 重量推理
export function thinkG2Ch8() {
  const a = randInt(2, 5);
  const b = randInt(500, 1500);
  const total = a * 1000 + b;
  return {
    content: `🐱 算算猫买了${a}袋面粉，每袋${a}千克，还买了${b}克糖。面粉比糖重多少克？如果把面粉和糖放在一起，一共多少千克多少克？`,
    answer: `${a * a * 1000 - b}克,${Math.floor(total / 1000)}千克${total % 1000}克`,
    solution: `1. 面粉：${a}袋 × ${a}千克 = ${a * a}千克 = ${a * a * 1000}克\n2. 糖：${b}克\n3. 面粉比糖重：${a * a * 1000} - ${b} = ${a * a * 1000 - b}（克）\n4. 总重量：${a * a * 1000} + ${b} = ${total}（克）\n5. 换算：${total}克 = ${Math.floor(total / 1000)}千克${total % 1000}克`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第9章：时分秒 - 时间计算
export function thinkG2Ch9() {
  const startMin = randInt(0, 30);
  const secs = randInt(20, 50);
  return {
    content: `🐻 小熊老师从${8}:${startMin < 10 ? '0' + startMin : startMin}开始跑步，跑了${secs}秒后休息，又跑了${secs}秒。它一共跑了多少秒？合多少分多少秒？`,
    answer: `${secs * 2}秒,${Math.floor((secs * 2) / 60)}分${(secs * 2) % 60}秒`,
    solution: `1. 第一次跑了${secs}秒\n2. 第二次跑了${secs}秒\n3. 总共：${secs} + ${secs} = ${secs * 2}（秒）\n4. ${secs * 2}秒 = ${Math.floor((secs * 2) / 60)}分${(secs * 2) % 60}秒`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第10章：东南西北 - 方向推理
export function thinkG2Ch10() {
  return {
    content: `🦊 机灵狐从家出发，先向北走了30米到书店，再向东走了40米到学校。请问：从学校直接回家，应该往什么方向走？大约要走多少米？（提示：可以画图看看）`,
    answer: `西南方向,50米`,
    solution: `1. 从家向北30米到书店\n2. 从书店向东40米到学校\n3. 这形成一个直角三角形\n4. 从学校回家：先向西40米，再向南30米\n5. 直接走斜线（西南方向）：用勾股定理估算 ≈ 50米\n6. 30² + 40² = 900 + 1600 = 2500，√2500 = 50`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第11章：轴对称 - 对称推理
export function thinkG2Ch11() {
  return {
    content: `🐱 算算猫剪了一张纸，对折后再剪一个洞。打开后，纸上会有几个洞？如果对折两次再剪呢？`,
    answer: `2个洞,4个洞`,
    solution: `1. 对折一次：纸变成2层\n2. 剪一个洞会穿过2层\n3. 打开后有2个洞（对称分布）\n4. 对折两次：纸变成4层\n5. 剪一个洞会穿过4层\n6. 打开后有4个洞`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第12章：三角形四边形 - 图形推理
export function thinkG2Ch12() {
  const side = randInt(3, 8);
  return {
    content: `🐉 智慧龙用${side}根同样长的小棒拼了一个正方形，还剩${side}根。它一共有多根小棒？如果用所有小棒拼三角形（每边${side}根），能拼几个？`,
    answer: `${side * 2}根,${Math.floor((side * 2) / 3)}个`,
    solution: `1. 拼正方形用了${side}根，剩${side}根\n2. 总共有：${side} + ${side} = ${side * 2}（根）\n3. 每个三角形需要3根\n4. 能拼：${side * 2} ÷ 3 = ${Math.floor((side * 2) / 3)}（个）……余${(side * 2) % 3}根`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第13章：连乘连除 - 分步推理
export function thinkG2Ch13() {
  const boxes = randInt(2, 4);
  const perBox = randInt(3, 6);
  const people = randInt(2, 4);
  return {
    content: `🐻 小熊老师买了${boxes}盒巧克力，每盒有${perBox}块。它要平均分给${people}个好朋友。每人分到几块？如果每人每天吃1块，可以吃几天？`,
    answer: `${(boxes * perBox) / people}块,${(boxes * perBox) / people}天`,
    solution: `1. 总共有：${boxes} × ${perBox} = ${boxes * perBox}（块）\n2. 平均分给${people}人：${boxes * perBox} ÷ ${people} = ${(boxes * perBox) / people}（块/人）\n3. 每人每天吃1块\n4. 可以吃：${(boxes * perBox) / people} ÷ 1 = ${(boxes * perBox) / people}（天）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// ================================================================
// 三年级思考推理题（11章）
// ================================================================

// 第1章：两步四则运算
export function thinkG3Ch1() {
  const total = randInt(50, 100);
  const a = randInt(10, 30);
  const b = randInt(5, 15);
  const c = total - a - b;
  return {
    content: `🐉 智慧龙有${total}元钱。它买了一本${a}元的书和一支${b}元的笔。老板说："如果你再买一个${c}元的橡皮，我给你打9折（总价×0.9）。"智慧龙带的钱够吗？`,
    answer: `够,还剩${Math.round(total - (a + b + c) * 0.9)}元`,
    solution: `1. 书${a}元，笔${b}元，橡皮${c}元\n2. 总价：${a} + ${b} + ${c} = ${a + b + c}（元）\n3. 打9折：${a + b + c} × 0.9 = ${Math.round((a + b + c) * 0.9)}（元）\n4. 智慧龙有${total}元\n5. ${total} > ${Math.round((a + b + c) * 0.9)}，够买\n6. 还剩：${total} - ${Math.round((a + b + c) * 0.9)} = ${Math.round(total - (a + b + c) * 0.9)}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第2章：一位数乘整十整百数
export function thinkG3Ch2() {
  const rows = randInt(5, 10);
  const seats = randInt(20, 50);
  const people = randInt(100, 200);
  return {
    content: `🦉 猫头鹰老师带${people}名同学去看演出。剧场有${rows}排座位，每排${seats}个。座位够吗？如果够，还剩多少空位？如果不够，还差多少？`,
    answer: `${rows * seats >= people ? '够,剩' + (rows * seats - people) + '个' : '不够,差' + (people - rows * seats) + '个'}`,
    solution: `1. 剧场座位：${rows}排 × ${seats}个/排 = ${rows * seats}（个）\n2. 需要：${people}个座位（含老师）\n3. 比较：${rows * seats} ${rows * seats >= people ? '≥' : '<'} ${people}\n4. ${rows * seats >= people ? `够坐，还剩 ${rows * seats} - ${people} = ${rows * seats - people}（个）空位` : `不够，还差 ${people} - ${rows * seats} = ${people - rows * seats}（个）座位`}`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第3章：长方形和正方形
export function thinkG3Ch3() {
  const l = randInt(8, 15);
  const w = randInt(4, 7);
  return {
    content: `🐱 算算猫有一根${2 * (l + w)}厘米的绳子。它先围了一个长${l}厘米、宽${w}厘米的长方形。然后用剩下的绳子围正方形，正方形的边长最大能是多少厘米？`,
    answer: `${2 * (l + w) - 2 * (l + w) === 0 ? 0 : '无法围成'}`,
    solution: `1. 绳子总长：${2 * (l + w)}厘米\n2. 长方形周长：(${l} + ${w}) × 2 = ${2 * (l + w)}（厘米）\n3. 剩余绳子：${2 * (l + w)} - ${2 * (l + w)} = 0（厘米）\n4. 绳子刚好用完，没有剩余，无法再围正方形！\n5. 这是一道陷阱题 😄`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第4章：分数的初步认识
export function thinkG3Ch4() {
  const total = pick([6, 8, 10, 12]);
  const a = randInt(1, total / 2 - 1);
  const b = randInt(1, total / 2 - a);
  return {
    content: `🐻 小熊老师把一个蛋糕平均切成${total}份。它吃了${a}份，🐧企鹅博士吃了${b}份。谁吃得多？多吃了这个蛋糕的几分之几？还剩几分之几？`,
    answer: `${a > b ? '小熊老师' : '企鹅博士'}多吃${Math.abs(a - b)}/${total},剩${total - a - b}/${total}`,
    solution: `1. 蛋糕切成${total}份\n2. 小熊老师吃了${a}份 = ${a}/${total}\n3. 企鹅博士吃了${b}份 = ${b}/${total}\n4. ${a > b ? '小熊老师' : '企鹅博士'}吃得多\n5. 多吃了：${Math.abs(a - b)}/${total}\n6. 共吃了：${a}/${total} + ${b}/${total} = ${a + b}/${total}\n7. 还剩：${total}/${total} - ${a + b}/${total} = ${total - a - b}/${total}`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第5章：元角分与小数
export function thinkG3Ch5() {
  const price = randInt(3, 8) + 0.5;
  const pay = Math.ceil(price) + randInt(1, 3);
  return {
    content: `🦊 机灵狐带了${pay}元去买文具。钢笔${price}元，笔记本${Math.floor(price / 2)}.5元。它买这两样东西够吗？如果够，还剩多少元？`,
    answer: `${pay >= price + Math.floor(price / 2) + 0.5 ? '够,剩' + (pay - price - Math.floor(price / 2) - 0.5).toFixed(1) + '元' : '不够'}`,
    solution: `1. 钢笔${price}元\n2. 笔记本${Math.floor(price / 2)}.5元\n3. 总价：${price} + ${Math.floor(price / 2)}.5 = ${(price + Math.floor(price / 2) + 0.5).toFixed(1)}（元）\n4. 带了${pay}元\n5. ${pay} ${pay >= price + Math.floor(price / 2) + 0.5 ? '≥' : '<'} ${(price + Math.floor(price / 2) + 0.5).toFixed(1)}\n6. ${pay >= price + Math.floor(price / 2) + 0.5 ? `够买，还剩 ${(pay - price - Math.floor(price / 2) - 0.5).toFixed(1)} 元` : '钱不够'}`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第6章：三位数加减法
export function thinkG3Ch6() {
  const a = randInt(200, 500);
  const b = randInt(100, 300);
  const c = randInt(50, 150);
  return {
    content: `🐉 智慧龙、🐱算算猫、🐧企鹅博士三人捐款。智慧龙捐了${a}元，算算猫比智慧龙少捐${b}元，企鹅博士比算算猫多捐${c}元。三人一共捐了多少元？`,
    answer: `${a + (a - b) + (a - b + c)}元`,
    solution: `1. 智慧龙：${a}元\n2. 算算猫比智慧龙少${b}元：${a} - ${b} = ${a - b}（元）\n3. 企鹅博士比算算猫多${c}元：${a - b} + ${c} = ${a - b + c}（元）\n4. 三人总共：${a} + ${a - b} + ${a - b + c} = ${a + (a - b) + (a - b + c)}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第7章：两位数乘两三位数
export function thinkG3Ch7() {
  const rows = randInt(12, 20);
  const cols = randInt(8, 15);
  const absent = randInt(2, 8);
  return {
    content: `🦉 猫头鹰老师班级有${rows}排座位，每排${cols}个。今天有${absent}个同学请假。教室里有多少个空座位？`,
    answer: `${rows * cols - (rows * cols - absent)}个,即${absent}个`,
    solution: `1. 总座位：${rows} × ${cols} = ${rows * cols}（个）\n2. 来了的同学：${rows * cols} - ${absent} = ${rows * cols - absent}（人）\n3. 空座位 = 总座位 - 来的同学\n4. = ${rows * cols} - ${rows * cols - absent} = ${absent}（个）\n5. 空座位就是请假同学的座位：${absent}个`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第8章：年月日
export function thinkG3Ch8() {
  const month = pick([1, 3, 5, 7, 8, 10, 12]);
  const day = randInt(1, 15);
  return {
    content: `🐱 算算猫在${month}月${day}日开始读一本故事书，每天读15页，到${month}月${day + 10}日读完了。这本书一共有多少页？它平均每天读多少页？`,
    answer: `${11 * 15}页,15页`,
    solution: `1. 从${month}月${day}日到${month}月${day + 10}日\n2. 一共读了：${day + 10} - ${day} + 1 = 11（天）\n3. 每天读15页\n4. 总页数：11 × 15 = 165（页）\n5. 平均每天：165 ÷ 11 = 15（页）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第9章：千米和米
export function thinkG3Ch9() {
  const dist = randInt(3, 8);
  const days = randInt(4, 6);
  return {
    content: `🐻 小熊老师每天上学要走${dist}千米。它一周（${days}天）上学一共走多少千米？放学回家的路一样远，一周来回一共走多少千米？`,
    answer: `${dist * days}千米,${dist * days * 2}千米`,
    solution: `1. 每天上学走${dist}千米\n2. 一周${days}天上学：${dist} × ${days} = ${dist * days}（千米）\n3. 放学回家一样远，每天来回：${dist} × 2 = ${dist * 2}（千米）\n4. 一周来回：${dist * 2} × ${days} = ${dist * days * 2}（千米）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第10章：面积
export function thinkG3Ch10() {
  const l = randInt(6, 12);
  const w = randInt(4, 8);
  const tile = randInt(2, 4);
  return {
    content: `🦊 机灵狐要给一个长${l}米、宽${w}米的房间铺地砖。每块地砖是${tile}米 × ${tile}米的正方形。至少需要多少块地砖？`,
    answer: `${Math.ceil((l * w) / (tile * tile))}块`,
    solution: `1. 房间面积：${l} × ${w} = ${l * w}（平方米）\n2. 每块地砖面积：${tile} × ${tile} = ${tile * tile}（平方米）\n3. 需要地砖：${l * w} ÷ ${tile * tile} = ${((l * w) / (tile * tile)).toFixed(1)}\n4. 不能买半块，向上取整：至少${Math.ceil((l * w) / (tile * tile))}块`,
    type: '思考推理',
    difficulty: 3,
  };
}

// 第11章：统计
export function thinkG3Ch11() {
  const scores = Array.from({ length: 5 }, () => randInt(70, 100));
  const avg = Math.round(scores.reduce((a, b) => a + b) / scores.length);
  return {
    content: `🐱 算算猫5次考试的成绩分别是：${scores.join('、')}分。如果第6次考了100分，平均分能提高多少分？`,
    answer: `${(Math.round((scores.reduce((a, b) => a + b) + 100) / 6) - avg).toFixed(1)}分`,
    solution: `1. 前5次总分：${scores.join(' + ')} = ${scores.reduce((a, b) => a + b)}（分）\n2. 前5次平均：${scores.reduce((a, b) => a + b)} ÷ 5 = ${avg}（分）\n3. 第6次考100分，6次总分：${scores.reduce((a, b) => a + b)} + 100 = ${scores.reduce((a, b) => a + b) + 100}（分）\n4. 6次平均：${scores.reduce((a, b) => a + b) + 100} ÷ 6 = ${Math.round((scores.reduce((a, b) => a + b) + 100) / 6)}（分）\n5. 平均分提高了：${Math.round((scores.reduce((a, b) => a + b) + 100) / 6)} - ${avg} = ${(Math.round((scores.reduce((a, b) => a + b) + 100) / 6) - avg).toFixed(1)}（分）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// ================================================================
// 四年级思考推理题（16章）
// ================================================================

export function thinkG4Ch1() {
  const a = randInt(1000, 5000);
  const b = randInt(100, 999);
  return {
    content: `🐉 智慧龙和机灵狐比赛收集卡片。智慧龙有${a}张，机灵狐有${a - b}张。智慧龙每天给机灵狐${Math.floor(b / 5)}张，几天后两人一样多？`,
    answer: `${Math.ceil(b / 2 / Math.floor(b / 5))}天`,
    solution: `1. 智慧龙${a}张，机灵狐${a - b}张\n2. 相差：${a} - ${a - b} = ${b}（张）\n3. 每天给${Math.floor(b / 5)}张，差距每天缩小${Math.floor(b / 5) * 2}张\n4. 需要天数：${b} ÷ ${Math.floor(b / 5) * 2} ≈ ${Math.ceil(b / (Math.floor(b / 5) * 2))}（天）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch2() {
  const a = randInt(2, 5);
  const b = randInt(3, 8);
  return {
    content: `🐱 算算猫买${a}支钢笔和${b}支铅笔共花${a * 15 + b * 3}元。已知钢笔每支15元，铅笔每支多少元？如果买${a + 1}支钢笔和${b - 1}支铅笔，要花多少钱？`,
    answer: `3元,${(a + 1) * 15 + (b - 1) * 3}元`,
    solution: `1. ${a}支钢笔：${a} × 15 = ${a * 15}（元）\n2. 铅笔总价：${a * 15 + b * 3} - ${a * 15} = ${b * 3}（元）\n3. 铅笔单价：${b * 3} ÷ ${b} = 3（元）\n4. 新组合：${a + 1}支钢笔 + ${b - 1}支铅笔\n5. = ${a + 1} × 15 + ${b - 1} × 3 = ${(a + 1) * 15} + ${(b - 1) * 3} = ${(a + 1) * 15 + (b - 1) * 3}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch3() {
  const d = pick([6, 8, 10, 12]);
  const a = randInt(1, d / 2 - 1);
  const b = randInt(1, d / 2 - a);
  return {
    content: `🐧 企鹅博士把一块巧克力平均分成${d}格。🦊机灵狐吃了${a}格，🐱算算猫吃了${b}格。剩下的占整块巧克力的几分之几？如果把剩下的平分给2人，每人得到几分之几？`,
    answer: `${d - a - b}/${d},${(d - a - b) / 2}/${d}即${d - a - b}/${d * 2}`,
    solution: `1. 巧克力分成${d}格\n2. 机灵狐吃了${a}格，算算猫吃了${b}格\n3. 共吃了：${a} + ${b} = ${a + b}（格）\n4. 剩下：${d} - ${a + b} = ${d - a - b}（格） = ${d - a - b}/${d}\n5. 平分给2人：${d - a - b} ÷ 2 = ${(d - a - b) / 2}（格）= ${(d - a - b) / 2}/${d}`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch4() {
  const rate = randInt(3, 8);
  const total = rate * randInt(5, 10);
  const days = total / rate;
  return {
    content: `🐻 小熊老师每天看${rate}页书，${days}天看完一本故事书。如果它每天多看2页，几天能看完？`,
    answer: `${Math.ceil(total / (rate + 2))}天`,
    solution: `1. 书的总页数：${rate} × ${days} = ${total}（页）\n2. 每天多看2页：${rate} + 2 = ${rate + 2}（页/天）\n3. 需要天数：${total} ÷ ${rate + 2} = ${(total / (rate + 2)).toFixed(1)}\n4. 向上取整：${Math.ceil(total / (rate + 2))}天`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch5() {
  const result = randInt(5, 15);
  const b = randInt(3, 8);
  const a = randInt(2, 5);
  return {
    content: `🦊 机灵狐在想一个数。这个数加上${b}，再除以${a}，结果是${result}。机灵狐想的数是多少？`,
    answer: String(result * a - b),
    solution: `1. 设这个数为x\n2. (x + ${b}) ÷ ${a} = ${result}\n3. x + ${b} = ${result} × ${a} = ${result * a}\n4. x = ${result * a} - ${b} = ${result * a - b}\n5. 验证：(${result * a - b} + ${b}) ÷ ${a} = ${result * a} ÷ ${a} = ${result} ✓`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch6() {
  return {
    content: `🐱 算算猫画了一个圆，量出直径是8厘米。它沿着圆的边缘滚了一圈，正好滚了25.12厘米。请问圆周率π大约是多少？`,
    answer: '3.14',
    solution: `1. 圆的直径 = 8厘米\n2. 圆的周长（滚一圈的距离）= 25.12厘米\n3. 圆周率 π = 周长 ÷ 直径\n4. π = 25.12 ÷ 8 = 3.14\n5. 所以π ≈ 3.14`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch7() {
  const n = randInt(3, 6);
  return {
    content: `🐉 智慧龙在纸上画了${n}个点，任意两点之间都连一条线段。它一共画了多少条线段？`,
    answer: `${(n * (n - 1)) / 2}条`,
    solution: `1. ${n}个点，每个点可以和其他${n - 1}个点连线\n2. 总连线数 = ${n} × ${n - 1} = ${n * (n - 1)}\n3. 但每条线被算了2次（A连B和B连A是同一条）\n4. 实际线段数 = ${n * (n - 1)} ÷ 2 = ${(n * (n - 1)) / 2}（条）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch8() {
  const a = randInt(1, 3);
  const b = randInt(200, 800);
  return {
    content: `🐻 小熊老师有一壶${a}升${b}毫升的果汁。倒出了500毫升后，又倒出了300毫升。还剩多少毫升？合多少升多少毫升？`,
    answer: `${a * 1000 + b - 800}毫升,${Math.floor((a * 1000 + b - 800) / 1000)}升${(a * 1000 + b - 800) % 1000}毫升`,
    solution: `1. 果汁总量：${a}升${b}毫升 = ${a * 1000 + b}毫升\n2. 倒出500毫升：${a * 1000 + b} - 500 = ${a * 1000 + b - 500}（毫升）\n3. 又倒出300毫升：${a * 1000 + b - 500} - 300 = ${a * 1000 + b - 800}（毫升）\n4. 换算：${a * 1000 + b - 800}毫升 = ${Math.floor((a * 1000 + b - 800) / 1000)}升${(a * 1000 + b - 800) % 1000}毫升`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch9() {
  const t = randInt(2, 5);
  const kg = randInt(100, 500);
  const perBox = randInt(3, 8);
  const totalKg = kg * perBox;
  return {
    content: `🦉 猫头鹰老师说：一辆货车载重${t}吨，现有${kg}箱货物，每箱重${perBox}千克。货车一次能运完吗？`,
    answer: totalKg <= t * 1000 ? '能' : '不能',
    solution: `1. 货车载重：${t}吨 = ${t * 1000}千克\n2. 每箱${perBox}千克\n3. 总重量：${kg} × ${perBox} = ${totalKg}千克\n4. ${totalKg} ${totalKg <= t * 1000 ? '≤' : '>'} ${t * 1000}\n5. 所以${totalKg <= t * 1000 ? '能' : '不能'}一次运完`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch10() {
  return {
    content: `🐱 算算猫说：上海市面积约6340平方千米，一个足球场面积约7000平方米。大约多少个足球场的面积等于1平方千米？`,
    answer: '约143个',
    solution: `1. 1平方千米 = 1000000平方米\n2. 足球场面积 ≈ 7000平方米\n3. 1000000 ÷ 7000 ≈ 143（个）\n4. 大约143个足球场等于1平方千米`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch11() {
  const prices = [randInt(3, 8), randInt(5, 12), randInt(2, 6)];
  const total = prices[0] * 3 + prices[1] * 2 + prices[2] * 5;
  return {
    content: `🦊 机灵狐去超市买了3支铅笔、2本笔记本和5块橡皮，共花了${total}元。已知铅笔每支${prices[0]}元，笔记本每本${prices[1]}元。橡皮每块多少元？`,
    answer: `${prices[2]}元`,
    solution: `1. 铅笔：${prices[0]} × 3 = ${prices[0] * 3}（元）\n2. 笔记本：${prices[1]} × 2 = ${prices[1] * 2}（元）\n3. 橡皮总价：${total} - ${prices[0] * 3} - ${prices[1] * 2} = ${total - prices[0] * 3 - prices[1] * 2}（元）\n4. 橡皮单价：${total - prices[0] * 3 - prices[1] * 2} ÷ 5 = ${prices[2]}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch12() {
  const price = randInt(3, 8) + 0.5;
  const count = randInt(3, 6);
  return {
    content: `🐉 智慧龙买苹果，每千克${price}元，买了${count}千克。付了${Math.ceil(price * count) + 5}元，找回多少元？`,
    answer: `${(Math.ceil(price * count) + 5 - price * count).toFixed(1)}元`,
    solution: `1. 苹果每千克${price}元，买了${count}千克\n2. 总价：${price} × ${count} = ${price * count}（元）\n3. 付了${Math.ceil(price * count) + 5}元\n4. 找回：${Math.ceil(price * count) + 5} - ${price * count} = ${(Math.ceil(price * count) + 5 - price * count).toFixed(1)}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch13() {
  const total = randInt(50, 200);
  const per = randInt(3, 8) + 0.5;
  const count = Math.floor(total / per);
  return {
    content: `🐻 小熊老师有${total}元，每本笔记本${per}元。最多能买多少本？还剩多少元？`,
    answer: `${count}本,${(total - count * per).toFixed(1)}元`,
    solution: `1. 总共${total}元\n2. 每本${per}元\n3. 能买：${total} ÷ ${per} ≈ ${(total / per).toFixed(1)}\n4. 最多买${count}本（不能买半本）\n5. 花费：${count} × ${per} = ${count * per}（元）\n6. 剩余：${total} - ${count * per} = ${(total - count * per).toFixed(1)}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch14() {
  return {
    content: `🦉 猫头鹰老师说：两条直线相交成4个角，其中一个角是60°。其他三个角分别是多少度？`,
    answer: `60°,120°,120°`,
    solution: `1. 两条直线相交，形成4个角\n2. 对角相等：所以有一个对角也是60°\n3. 相邻两角互补（和为180°）\n4. 180° - 60° = 120°\n5. 四个角分别是：60°、120°、60°、120°`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch15() {
  const a = randInt(5, 10);
  const h = randInt(4, 8);
  return {
    content: `🐱 算算猫把一个平行四边形剪开拼成了长方形。长方形的长是${a}厘米，宽是${h}厘米。原来的平行四边形面积是多少？如果底是${a}厘米，高是多少？`,
    answer: `${a * h}平方厘米,${h}厘米`,
    solution: `1. 剪拼后长方形长${a}厘米，宽${h}厘米\n2. 长方形面积 = ${a} × ${h} = ${a * h}（平方厘米）\n3. 剪拼不改变面积，所以平行四边形面积也是${a * h}平方厘米\n4. 平行四边形面积 = 底 × 高\n5. ${a * h} = ${a} × 高\n6. 高 = ${a * h} ÷ ${a} = ${h}（厘米）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG4Ch16() {
  const data = Array.from({ length: 7 }, () => randInt(15, 30));
  const avg = (data.reduce((a, b) => a + b) / 7).toFixed(1);
  return {
    content: `🐧 企鹅博士记录了一周每天的最高气温：${data.join('°C, ')}°C。这一周的平均最高气温是多少？有几天超过平均值？`,
    answer: `${avg}°C`,
    solution: `1. 七天气温：${data.join(', ')}\n2. 总和：${data.reduce((a, b) => a + b)}°C\n3. 平均：${data.reduce((a, b) => a + b)} ÷ 7 = ${avg}°C\n4. 超过${avg}°C的天数需要逐一比较`,
    type: '思考推理',
    difficulty: 3,
  };
}

// ================================================================
// 五年级思考推理题（12章）
// ================================================================

export function thinkG5Ch1() {
  const a = randInt(10, 30);
  const b = randInt(5, 15);
  return {
    content: `🐉 智慧龙在计算 25 × ${a} 时，不小心把${a}看成了${a + b}。它的计算结果比正确答案多了多少？`,
    answer: `${25 * b}`,
    solution: `1. 正确计算：25 × ${a} = ${25 * a}\n2. 错误计算：25 × ${a + b} = ${25 * (a + b)}\n3. 多算了：${25 * (a + b)} - ${25 * a} = ${25 * b}\n4. 其实就是 25 × ${b} = ${25 * b}`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch2() {
  const price = randInt(5, 15) + 0.5;
  const count = randInt(2, 5);
  const discount = pick([0.8, 0.9]);
  return {
    content: `🐱 算算猫买${count}千克苹果，每千克${price}元。如果满${Math.ceil(price * count)}元打${discount * 10}折，实际要付多少元？省了多少元？`,
    answer: `${(price * count * discount).toFixed(1)}元,省${(price * count * (1 - discount)).toFixed(1)}元`,
    solution: `1. 原价：${price} × ${count} = ${price * count}（元）\n2. 满${Math.ceil(price * count)}元可以打${discount * 10}折\n3. ${price * count} ≥ ${Math.ceil(price * count)}，满足条件\n4. 折后价：${price * count} × ${discount} = ${(price * count * discount).toFixed(1)}（元）\n5. 省了：${price * count} - ${(price * count * discount).toFixed(1)} = ${(price * count * (1 - discount)).toFixed(1)}（元）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch3() {
  const data = Array.from({ length: 5 }, () => randInt(60, 100));
  const avg = (data.reduce((a, b) => a + b) / 5).toFixed(1);
  return {
    content: `🐻 小熊老师5次测验的平均分是${avg}分。如果去掉最低分，剩下4次的平均分是${(
      data
        .sort((a, b) => a - b)
        .slice(1)
        .reduce((a, b) => a + b) / 4
    ).toFixed(1)}分。最低分是多少？`,
    answer: `${data[0]}分`,
    solution: `1. 5次总分：${avg} × 5 = ${(parseFloat(avg) * 5).toFixed(1)}（分）\n2. 去掉最低分后4次总分：${(
      data
        .sort((a, b) => a - b)
        .slice(1)
        .reduce((a, b) => a + b) / 4
    ).toFixed(1)} × 4 = ${data
      .sort((a, b) => a - b)
      .slice(1)
      .reduce(
        (a, b) => a + b
      )}（分）\n3. 最低分 = 总分 - 去掉后的总分\n4. = ${(parseFloat(avg) * 5).toFixed(1)} - ${data
      .sort((a, b) => a - b)
      .slice(1)
      .reduce((a, b) => a + b)} = ${data[0]}（分）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch4() {
  const x = randInt(5, 15);
  const a = randInt(2, 5);
  const b = randInt(10, 20);
  return {
    content: `🦊 机灵狐出了一道方程题：${a}x + ${b} = ${a * x + b}。x是多少？如果把${b}改成${b + 5}，x又是多少？`,
    answer: `${x},${x + 5 / a < 1 ? '不是整数' : x + 5 / a}`,
    solution: `1. 第一个方程：${a}x + ${b} = ${a * x + b}\n2. ${a}x = ${a * x + b} - ${b} = ${a * x}\n3. x = ${a * x} ÷ ${a} = ${x}\n4. 第二个方程：${a}x + ${b + 5} = ${a * x + b}\n5. ${a}x = ${a * x + b} - ${b + 5} = ${a * x - 5}\n6. x = ${a * x - 5} ÷ ${a} = ${((a * x - 5) / a).toFixed(2)}`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch5() {
  const base = randInt(6, 12);
  const h = randInt(4, 8);
  return {
    content: `🐱 算算猫把两个完全一样的三角形拼成了一个平行四边形。平行四边形的底是${base}厘米，高是${h}厘米。每个三角形的面积是多少？`,
    answer: `${(base * h) / 2}平方厘米`,
    solution: `1. 平行四边形面积 = 底 × 高 = ${base} × ${h} = ${base * h}（平方厘米）\n2. 两个完全一样的三角形拼成平行四边形\n3. 每个三角形面积 = 平行四边形面积 ÷ 2\n4. = ${base * h} ÷ 2 = ${(base * h) / 2}（平方厘米）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch6() {
  return {
    content: `🐉 智慧龙把一个三角形向右平移了5格，再向上平移了3格。原来三角形的一个顶点在(2,1)，平移后这个顶点在哪里？`,
    answer: `(7,4)`,
    solution: `1. 原来顶点坐标：(2, 1)\n2. 向右平移5格：x坐标 + 5 = 2 + 5 = 7\n3. 向上平移3格：y坐标 + 3 = 1 + 3 = 4\n4. 平移后坐标：(7, 4)`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch7() {
  const d1 = pick([4, 6, 8]);
  const d2 = pick([3, 5, 7]);
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  return {
    content: `🐻 小熊老师有 ${n1}/${d1} 千克面粉和 ${n2}/${d2} 千克糖。它做蛋糕用了 ${n1}/${d1} 千克面粉和 ${n2}/${d2} 千克糖。面粉和糖一共用了多少千克？`,
    answer: `${(n1 * d2 + n2 * d1) / (d1 * d2).toFixed(2) === (n1 * d2 + n2 * d1) / (d1 * d2) ? (n1 * d2 + n2 * d1) / (d1 * d2) : ((n1 * d2 + n2 * d1) / (d1 * d2)).toFixed(3)}千克`,
    solution: `1. 面粉：${n1}/${d1}千克\n2. 糖：${n2}/${d2}千克\n3. 异分母相加，先通分\n4. ${n1}/${d1} = ${n1 * d2}/${d1 * d2}，${n2}/${d2} = ${n2 * d1}/${d1 * d2}\n5. 总量 = ${n1 * d2}/${d1 * d2} + ${n2 * d1}/${d1 * d2} = ${n1 * d2 + n2 * d1}/${d1 * d2}`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch8() {
  const total = randInt(100, 300);
  const rate1 = randInt(2, 4);
  const rate2 = randInt(2, 4);
  return {
    content: `🦉 猫头鹰老师把${total}本书分给两个班级。一班分到总数的 ${rate1}/${rate1 + rate2}，二班分到总数的 ${rate2}/${rate1 + rate2}。一班比二班多分多少本？`,
    answer: `${(total * (rate1 - rate2)) / (rate1 + rate2)}本`,
    solution: `1. 一班分到：${total} × ${rate1}/${rate1 + rate2} = ${(total * rate1) / (rate1 + rate2)}（本）\n2. 二班分到：${total} × ${rate2}/${rate1 + rate2} = ${(total * rate2) / (rate1 + rate2)}（本）\n3. 一班比二班多：${(total * rate1) / (rate1 + rate2)} - ${(total * rate2) / (rate1 + rate2)} = ${(total * (rate1 - rate2)) / (rate1 + rate2)}（本）`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch9() {
  const l = randInt(5, 10);
  const w = randInt(3, 7);
  const h = randInt(2, 5);
  const water_h = randInt(1, h - 1);
  const capacity = l * w * (h - water_h);
  const injected = randInt(Math.floor(capacity * 0.5), Math.floor(capacity * 1.5));
  return {
    content: `🦊 机灵狐有一个长${l}厘米、宽${w}厘米、高${h}厘米的长方体容器，里面装了${water_h}厘米深的水。水的体积是多少？如果再注入${injected}立方厘米的水，水会溢出吗？`,
    answer: `${l * w * water_h}立方厘米,${injected > capacity ? '会' : '不会'}溢出`,
    solution: `1. 水的体积 = 长 × 宽 × 水深\n2. = ${l} × ${w} × ${water_h} = ${l * w * water_h}（立方厘米）\n3. 容器还能装：${l} × ${w} × (${h} - ${water_h}) = ${capacity}（立方厘米）\n4. 再注入${injected}立方厘米\n5. ${injected} ${injected > capacity ? '>' : '≤'} ${capacity}，${injected > capacity ? '会溢出' : '不会溢出'}`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch10() {
  return {
    content: `🐱 算算猫有一个袋子里有3个红球和2个蓝球。它随机摸出1个球，摸到红球的可能性是几分之几？摸到蓝球的可能性是几分之几？如果再放入1个红球，摸到红球的可能性变大了还是变小了？`,
    answer: `3/5,2/5,变大了`,
    solution: `1. 总共3红 + 2蓝 = 5个球\n2. 摸到红球：3/5\n3. 摸到蓝球：2/5\n4. 放入1个红球后：4红 + 2蓝 = 6个球\n5. 摸到红球：4/6 = 2/3\n6. 2/3 > 3/5，可能性变大了`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch11() {
  const age1 = randInt(8, 12);
  const age2 = age1 + randInt(20, 30);
  return {
    content: `🐉 智慧龙今年${age1}岁，爸爸今年${age2}岁。多少年前，爸爸的年龄是智慧龙的${Math.floor(age2 / age1)}倍？`,
    answer: `${age2 - Math.floor(age2 / age1) * age1 > 0 ? age2 - Math.floor(age2 / age1) * age1 : '需要更精确计算'}年前`,
    solution: `1. 智慧龙${age1}岁，爸爸${age2}岁\n2. 设x年前爸爸是智慧龙的${Math.floor(age2 / age1)}倍\n3. ${age2} - x = ${Math.floor(age2 / age1)} × (${age1} - x)\n4. ${age2} - x = ${Math.floor(age2 / age1) * age1} - ${Math.floor(age2 / age1)}x\n5. ${Math.floor(age2 / age1)}x - x = ${Math.floor(age2 / age1) * age1} - ${age2}\n6. x(${Math.floor(age2 / age1)} - 1) = ${Math.floor(age2 / age1) * age1 - age2}\n7. x = ${(Math.floor(age2 / age1) * age1 - age2) / (Math.floor(age2 / age1) - 1)}`,
    type: '思考推理',
    difficulty: 3,
  };
}

export function thinkG5Ch12() {
  const l = randInt(4, 8);
  const w = randInt(3, 6);
  const h = randInt(2, 5);
  return {
    content: `🐻 小熊老师要做一个无盖的长方体纸盒，长${l}厘米、宽${w}厘米、高${h}厘米。至少需要多少平方厘米的纸板？这个纸盒的体积是多少？`,
    answer: `${l * w + 2 * (l * h) + 2 * (w * h)}平方厘米,${l * w * h}立方厘米`,
    solution: `1. 无盖长方体表面积 = 底面积 + 4个侧面\n2. 底面积：${l} × ${w} = ${l * w}（平方厘米）\n3. 前后面：${l} × ${h} × 2 = ${l * h * 2}（平方厘米）\n4. 左右面：${w} × ${h} × 2 = ${w * h * 2}（平方厘米）\n5. 总面积：${l * w} + ${l * h * 2} + ${w * h * 2} = ${l * w + l * h * 2 + w * h * 2}（平方厘米）\n6. 体积：${l} × ${w} × ${h} = ${l * w * h}（立方厘米）`,
    type: '思考推理',
    difficulty: 3,
  };
}

// ================================================================
// 思考推理题索引
// ================================================================

export const thinkingQuestions = {
  1: [thinkG1Ch1, thinkG1Ch2, thinkG1Ch3, thinkG1Ch4, thinkG1Ch5, thinkG1Ch6, thinkG1Ch7],
  2: [
    thinkG2Ch1,
    thinkG2Ch2,
    thinkG2Ch3,
    thinkG2Ch4,
    thinkG2Ch5,
    thinkG2Ch6,
    thinkG2Ch7,
    thinkG2Ch8,
    thinkG2Ch9,
    thinkG2Ch10,
    thinkG2Ch11,
    thinkG2Ch12,
    thinkG2Ch13,
  ],
  3: [
    thinkG3Ch1,
    thinkG3Ch2,
    thinkG3Ch3,
    thinkG3Ch4,
    thinkG3Ch5,
    thinkG3Ch6,
    thinkG3Ch7,
    thinkG3Ch8,
    thinkG3Ch9,
    thinkG3Ch10,
    thinkG3Ch11,
  ],
  4: [
    thinkG4Ch1,
    thinkG4Ch2,
    thinkG4Ch3,
    thinkG4Ch4,
    thinkG4Ch5,
    thinkG4Ch6,
    thinkG4Ch7,
    thinkG4Ch8,
    thinkG4Ch9,
    thinkG4Ch10,
    thinkG4Ch11,
    thinkG4Ch12,
    thinkG4Ch13,
    thinkG4Ch14,
    thinkG4Ch15,
    thinkG4Ch16,
  ],
  5: [
    thinkG5Ch1,
    thinkG5Ch2,
    thinkG5Ch3,
    thinkG5Ch4,
    thinkG5Ch5,
    thinkG5Ch6,
    thinkG5Ch7,
    thinkG5Ch8,
    thinkG5Ch9,
    thinkG5Ch10,
    thinkG5Ch11,
    thinkG5Ch12,
  ],
};

export function getThinkingQuestion(grade, chapterIndex) {
  const questions = thinkingQuestions[grade];
  if (!questions || chapterIndex >= questions.length) return null;
  return questions[chapterIndex]();
}
