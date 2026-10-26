// 四年级综合应用题 - 沪教版2024新教材
// 角色库：算算猫🐱、智慧龙🐉、企鹅博士🐧、小熊老师🐻、机灵狐🦊、猫头鹰🦉、小兔子🐰、小青蛙🐸
// 后续章节应用题综合前面章节知识点
// 每道题必须有solution字段（解题思路，分步骤）

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

// ============ 第一章应用题：大数的认识（12个模板） ============

export function genAppCh1() {
  const templates = [
    // 城市人口
    () => {
      const a = randInt(12000, 28000);
      const b = randInt(8000, 18000);
      return {
        content: `${CAT}在图书馆看到资料：东城有${a}人，西城有${b}人，两个城区一共有多少人？`,
        answer: String(a + b),
        solution: `1. 东城区有${a}人\n2. 西城区有${b}人\n3. 总人数 = 东城 + 西城\n4. ${a} + ${b} = ${a + b}（人）`,
        type: '城市人口',
      };
    },
    // 图书数量
    () => {
      const total = randInt(50000, 99999);
      const borrowed = randInt(10000, total - 20000);
      return {
        content: `市图书馆共有${total}本书，上个月借出了${borrowed}本，还剩多少本？`,
        answer: String(total - borrowed),
        solution: `1. 图书馆共有${total}本书\n2. 借出了${borrowed}本\n3. 剩余 = 总数 - 借出数\n4. ${total} - ${borrowed} = ${total - borrowed}（本）`,
        type: '图书数量',
      };
    },
    // 工厂产量
    () => {
      const per = randInt(2000, 5000);
      const days = randInt(30, 90);
      return {
        content: `一家工厂每天生产${per}个玩具，一个月（${days}天）能生产多少个玩具？`,
        answer: String(per * days),
        solution: `1. 每天生产${per}个\n2. 一个月${days}天\n3. 总产量 = 每天产量 × 天数\n4. ${per} × ${days} = ${per * days}（个）`,
        type: '工厂产量',
      };
    },
    // 观众人数
    () => {
      const a = randInt(15000, 30000);
      const b = randInt(8000, 20000);
      const c = randInt(5000, 15000);
      return {
        content: `${PENGUIN}统计运动会观众：上午${a}人，下午${b}人，晚上${c}人，全天一共有多少观众？`,
        answer: String(a + b + c),
        solution: `1. 上午${a}人\n2. 下午${b}人\n3. 晚上${c}人\n4. 全天 = 上午 + 下午 + 晚上\n5. ${a} + ${b} + ${c} = ${a + b + c}（人）`,
        type: '观众人数',
      };
    },
    // 捐款金额
    () => {
      const a = randInt(10000, 50000);
      const b = randInt(10000, 50000);
      const diff = Math.abs(a - b);
      return {
        content: `爱心捐款活动中，${DRAGON}班捐了${a}元，${FOX}班捐了${b}元，哪个班捐得多？多多少？`,
        answer: `${Math.max(a, b)}元多，多${diff}元`,
        solution: `1. ${DRAGON}班捐${a}元\n2. ${FOX}班捐${b}元\n3. 比较：${a} ${a > b ? '>' : '<'} ${b}\n4. 多出：${Math.max(a, b)} - ${Math.min(a, b)} = ${diff}（元）`,
        type: '捐款金额',
      };
    },
    // 快递单数
    () => {
      const d1 = randInt(3000, 8000);
      const d2 = randInt(3000, 8000);
      const d3 = randInt(3000, 8000);
      const d4 = randInt(3000, 8000);
      const total = d1 + d2 + d3 + d4;
      return {
        content: `快递站四天的包裹量分别是${d1}件、${d2}件、${d3}件、${d4}件，四天共处理了多少件？`,
        answer: `${total}件`,
        solution: `1. 第一天${d1}件\n2. 第二天${d2}件\n3. 第三天${d3}件\n4. 第四天${d4}件\n5. 总计 = ${d1} + ${d2} + ${d3} + ${d4} = ${total}（件）`,
        type: '快递单数',
      };
    },
    // 游客数量
    () => {
      const total = randInt(50000, 99000);
      const left = randInt(10000, 30000);
      return {
        content: `国庆期间景区共接待游客${total}人次，上午有${left}人次离开，下午还有多少人次在景区？`,
        answer: `${total - left}人次`,
        solution: `1. 共接待${total}人次\n2. 上午离开${left}人次\n3. 下午剩余 = ${total} - ${left} = ${total - left}（人次）`,
        type: '游客数量',
      };
    },
    // 星星数量
    () => {
      const a = randInt(5000, 20000);
      const b = randInt(3000, 10000);
      return {
        content: `${OWL}在天文台观测，银河系大约有${a}亿颗恒星，太阳系所在的旋臂约有${b}亿颗，旋臂比整个银河系少多少亿颗？`,
        answer: `${a - b}亿颗`,
        solution: `1. 银河系约${a}亿颗\n2. 旋臂约${b}亿颗\n3. 差值 = ${a} - ${b} = ${a - b}（亿颗）`,
        type: '星星数量',
      };
    },
    // 海洋生物
    () => {
      const a = randInt(10000, 30000);
      const b = randInt(5000, 15000);
      const c = randInt(3000, 10000);
      return {
        content: `海洋生物调查：珊瑚礁区发现${a}种生物，深海区发现${b}种，浅海区发现${c}种，一共发现多少种？`,
        answer: `${a + b + c}种`,
        solution: `1. 珊瑚礁区${a}种\n2. 深海区${b}种\n3. 浅海区${c}种\n4. 总计 = ${a} + ${b} + ${c} = ${a + b + c}（种）`,
        type: '海洋生物',
      };
    },
    // 森林树木
    () => {
      const total = randInt(60000, 99000);
      const cut = randInt(5000, 20000);
      const plant = randInt(3000, 15000);
      return {
        content: `森林原有${total}棵树，砍伐了${cut}棵，又新种了${plant}棵，现在有多少棵树？`,
        answer: `${total - cut + plant}棵`,
        solution: `1. 原有${total}棵\n2. 砍伐${cut}棵\n3. 新种${plant}棵\n4. 现在 = ${total} - ${cut} + ${plant} = ${total - cut + plant}（棵）`,
        type: '森林树木',
      };
    },
    // 学校学生
    () => {
      const a = randInt(4000, 9000);
      const b = randInt(3000, 8000);
      const approx = num => Math.round(num / 1000) * 1000;
      return {
        content: `${BEAR}统计学校数据：育才小学有${a}人，培英小学有${b}人，它们大约各有多少人？（四舍五入到千位）`,
        answer: `育才约${approx(a)}人，培英约${approx(b)}人`,
        solution: `1. 育才小学${a}人\n2. 四舍五入到千位：${a} ≈ ${approx(a)}\n3. 培英小学${b}人\n4. 四舍五入到千位：${b} ≈ ${approx(b)}`,
        type: '学校学生',
      };
    },
    // 网络点击
    () => {
      const a = randInt(50000, 200000);
      const b = randInt(30000, 150000);
      return {
        content: `${FROG}发现一个科普视频的点击量是${a}次，另一个搞笑视频的点击量是${b}次，两个视频的总点击量是多少次？`,
        answer: `${a + b}次`,
        solution: `1. 科普视频${a}次\n2. 搞笑视频${b}次\n3. 总点击量 = ${a} + ${b} = ${a + b}（次）`,
        type: '网络点击',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第二章应用题：整数四则混合运算（15个模板） ============

export function genAppCh2() {
  const templates = [
    // 超市大采购
    () => {
      const p1 = randInt(15, 45);
      const n1 = randInt(2, 5);
      const p2 = randInt(10, 30);
      const n2 = randInt(1, 4);
      const total = p1 * n1 + p2 * n2;
      return {
        content: `${CAT}去超市买苹果，每袋${p1}元买了${n1}袋，又买了${n2}盒酸奶每盒${p2}元，一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. 苹果：${p1} × ${n1} = ${p1 * n1}（元）\n2. 酸奶：${p2} × ${n2} = ${p2 * n2}（元）\n3. 总花费 = 苹果 + 酸奶\n4. ${p1 * n1} + ${p2 * n2} = ${total}（元）`,
        type: '超市大采购',
      };
    },
    // 旅行规划
    () => {
      const speed = randInt(50, 90);
      const t1 = randInt(2, 4);
      const t2 = randInt(1, 3);
      return {
        content: `${DRAGON}一家自驾旅行，每小时行驶${speed}千米，先开了${t1}小时休息，又开了${t2}小时到达目的地，全程多少千米？`,
        answer: `${speed * (t1 + t2)}千米`,
        solution: `1. 速度${speed}千米/小时\n2. 先开${t1}小时\n3. 又开${t2}小时\n4. 总时间 = ${t1} + ${t2} = ${t1 + t2}（小时）\n5. 路程 = ${speed} × ${t1 + t2} = ${speed * (t1 + t2)}（千米）`,
        type: '旅行规划',
      };
    },
    // 运动会总分
    () => {
      const a = randInt(15, 30);
      const b = randInt(10, 25);
      const c = randInt(20, 35);
      return {
        content: `运动会上，${RABBIT}队得${a}分，${FROG}队得${b}分，${OWL}队得${c}分，三队总分是多少？`,
        answer: `${a + b + c}分`,
        solution: `1. ${RABBIT}队${a}分\n2. ${FROG}队${b}分\n3. ${OWL}队${c}分\n4. 总分 = ${a} + ${b} + ${c} = ${a + b + c}（分）`,
        type: '运动会总分',
      };
    },
    // 工程建造
    () => {
      const per = randInt(20, 50);
      const days = randInt(8, 15);
      const extra = randInt(100, 300);
      return {
        content: `施工队每天修${per}米管道，修了${days}天后，还剩${extra}米没修。这条管道一共多少米？`,
        answer: `${per * days + extra}米`,
        solution: `1. 每天修${per}米\n2. 已修${days}天\n3. 已修长度 = ${per} × ${days} = ${per * days}（米）\n4. 还剩${extra}米\n5. 总长 = ${per * days} + ${extra} = ${per * days + extra}（米）`,
        type: '工程建造',
      };
    },
    // 科学实验
    () => {
      const per = randInt(5, 15);
      const group = randInt(4, 8);
      const total = per * group;
      return {
        content: `实验课上每组分到${per}个试管，全班有${group}个小组，共需要多少个试管？`,
        answer: `${total}个`,
        solution: `1. 每组${per}个试管\n2. 共${group}个小组\n3. 总数 = ${per} × ${group} = ${total}（个）`,
        type: '科学实验',
      };
    },
    // 农场经营
    () => {
      const chicken = randInt(200, 500);
      const egg = randInt(3, 8);
      const days = randInt(5, 10);
      return {
        content: `${BEAR}的农场有${chicken}只母鸡，每只每天下${egg}个蛋，${days}天一共能收多少个蛋？`,
        answer: `${chicken * egg * days}个`,
        solution: `1. ${chicken}只母鸡\n2. 每只每天${egg}个蛋\n3. 每天总产蛋 = ${chicken} × ${egg} = ${chicken * egg}（个）\n4. ${days}天 = ${chicken * egg} × ${days} = ${chicken * egg * days}（个）`,
        type: '农场经营',
      };
    },
    // 餐厅点餐
    () => {
      const rice = randInt(8, 15);
      const dish = randInt(12, 25);
      const count = randInt(2, 4);
      const soup = randInt(15, 30);
      return {
        content: `${FOX}在餐厅吃饭，米饭${rice}元，点了${count}个菜每个${dish}元，一碗汤${soup}元，一共多少钱？`,
        answer: `${rice + dish * count + soup}元`,
        solution: `1. 米饭${rice}元\n2. ${count}个菜 = ${dish} × ${count} = ${dish * count}（元）\n3. 汤${soup}元\n4. 总计 = ${rice} + ${dish * count} + ${soup} = ${rice + dish * count + soup}（元）`,
        type: '餐厅点餐',
      };
    },
    // 游乐园
    () => {
      const ticket = randInt(30, 80);
      const people = randInt(3, 6);
      const food = randInt(15, 40);
      return {
        content: `${PENGUIN}带${people - 1}个朋友去游乐园，门票每张${ticket}元，中午每人买了一份${food}元的午餐，总共花了多少钱？`,
        answer: `${ticket * people + food * people}元`,
        solution: `1. 共${people}人\n2. 门票 = ${ticket} × ${people} = ${ticket * people}（元）\n3. 午餐 = ${food} × ${people} = ${food * people}（元）\n4. 总计 = ${ticket * people} + ${food * people} = ${ticket * people + food * people}（元）`,
        type: '游乐园',
      };
    },
    // 图书馆
    () => {
      const shelf = randInt(6, 12);
      const per = randInt(25, 45);
      const borrowed = randInt(50, 150);
      return {
        content: `图书馆有${shelf}个书架，每个书架放${per}本书，借出${borrowed}本后还剩多少本？`,
        answer: `${shelf * per - borrowed}本`,
        solution: `1. ${shelf}个书架，每个${per}本\n2. 原有 = ${shelf} × ${per} = ${shelf * per}（本）\n3. 借出${borrowed}本\n4. 剩余 = ${shelf * per} - ${borrowed} = ${shelf * per - borrowed}（本）`,
        type: '图书馆',
      };
    },
    // 快递分拣
    () => {
      const per = randInt(40, 80);
      const hours = randInt(6, 10);
      const rest = randInt(10, 30);
      return {
        content: `快递站每小时分拣${per}件包裹，工作${hours}小时后因故障暂停，还有${rest}件未处理，今天共多少件包裹？`,
        answer: `${per * hours + rest}件`,
        solution: `1. 每小时分拣${per}件\n2. 工作${hours}小时\n3. 已处理 = ${per} × ${hours} = ${per * hours}（件）\n4. 还剩${rest}件\n5. 总数 = ${per * hours} + ${rest} = ${per * hours + rest}（件）`,
        type: '快递分拣',
      };
    },
    // 工厂生产
    () => {
      const machine = randInt(3, 8);
      const per = randInt(50, 120);
      const hours = randInt(6, 10);
      return {
        content: `工厂有${machine}台机器，每台每小时生产${per}个零件，工作${hours}小时共生产多少个？`,
        answer: `${machine * per * hours}个`,
        solution: `1. ${machine}台机器\n2. 每台每小时${per}个\n3. 每小时总产 = ${machine} × ${per} = ${machine * per}（个）\n4. ${hours}小时 = ${machine * per} × ${hours} = ${machine * per * hours}（个）`,
        type: '工厂生产',
      };
    },
    // 学校活动
    () => {
      const cls = randInt(4, 8);
      const per = randInt(6, 10);
      const total = cls * per;
      const rows = randInt(4, 6);
      const left = total % rows;
      return {
        content: `学校文艺汇演，${cls}个班每班出${per}个节目，一共${total}个节目。如果每次表演${rows}个节目，需要表演几场？最后剩几个？`,
        answer: `${Math.floor(total / rows)}场，剩${left}个`,
        solution: `1. 总节目 = ${cls} × ${per} = ${total}（个）\n2. 每次${rows}个\n3. ${total} ÷ ${rows} = ${Math.floor(total / rows)}……${left}\n4. 需要${Math.floor(total / rows)}场，剩${left}个`,
        type: '学校活动',
      };
    },
    // 生日派对
    () => {
      const cake = randInt(60, 120);
      const drink = randInt(5, 12);
      const people = randInt(8, 15);
      const candy = randInt(20, 50);
      return {
        content: `${CAT}办生日派对，蛋糕${cake}元，饮料每瓶${drink}元买了${people}瓶，糖果${candy}元，一共花了多少钱？`,
        answer: `${cake + drink * people + candy}元`,
        solution: `1. 蛋糕${cake}元\n2. 饮料${drink} × ${people} = ${drink * people}（元）\n3. 糖果${candy}元\n4. 总计 = ${cake} + ${drink * people} + ${candy} = ${cake + drink * people + candy}（元）`,
        type: '生日派对',
      };
    },
    // 环保行动
    () => {
      const per = randInt(5, 15);
      const days = randInt(20, 30);
      const goal = randInt(500, 1000);
      return {
        content: `环保小队每天收集${per}个塑料瓶，收集了${days}天后，目标是${goal}个，还差多少个？`,
        answer: `${Math.max(0, goal - per * days)}个`,
        solution: `1. 每天收集${per}个\n2. 已收集${days}天\n3. 已收集 = ${per} × ${days} = ${per * days}（个）\n4. 目标${goal}个\n5. 还差 = ${goal} - ${per * days} = ${goal - per * days}（个）`,
        type: '环保行动',
      };
    },
    // 宠物店
    () => {
      const dog = randInt(3, 8);
      const cat = randInt(5, 12);
      const dogFood = randInt(200, 500);
      const catFood = randInt(100, 300);
      return {
        content: `宠物店有${dog}只小狗和${cat}只小猫，每只小狗每天吃${dogFood}克粮食，每只小猫每天吃${catFood}克，一天共需要多少克粮食？`,
        answer: `${dog * dogFood + cat * catFood}克`,
        solution: `1. 小狗需要：${dog} × ${dogFood} = ${dog * dogFood}（克）\n2. 小猫需要：${cat} × ${catFood} = ${cat * catFood}（克）\n3. 总计 = ${dog * dogFood} + ${cat * catFood} = ${dog * dogFood + cat * catFood}（克）`,
        type: '宠物店',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第三章应用题：分数（12个模板） ============

export function genAppCh3() {
  const templates = [
    // 分蛋糕
    () => {
      const d = pick([6, 8, 10, 12]);
      const a = randInt(1, d - 1);
      return {
        content: `${RABBIT}把一个蛋糕平均切成${d}块，吃了${a}块，吃了这个蛋糕的几分之几？`,
        answer: `${a}/${d}`,
        solution: `1. 蛋糕平均切成${d}块\n2. 吃了${a}块\n3. 吃的比例 = 吃的 ÷ 总块数 = ${a}/${d}`,
        type: '分蛋糕',
      };
    },
    // 分披萨
    () => {
      const d = pick([4, 6, 8]);
      const a = randInt(1, d - 1);
      const b = randInt(1, d - a);
      return {
        content: `一个披萨平均分成${d}份，${CAT}吃了${a}/${d}，${DRAGON}吃了${b}/${d}，两人一共吃了几分之几？`,
        answer: `${a + b}/${d}`,
        solution: `1. ${CAT}吃了${a}/${d}\n2. ${DRAGON}吃了${b}/${d}\n3. 同分母相加：${a}/${d} + ${b}/${d}\n4. = (${a}+${b})/${d} = ${a + b}/${d}`,
        type: '分披萨',
      };
    },
    // 分巧克力
    () => {
      const d = pick([5, 8, 10]);
      const total = randInt(3, d - 1);
      const used = randInt(1, total - 1);
      return {
        content: `一块巧克力平均分成${d}份，${FOX}吃了${total}/${d}，${OWL}吃了${used}/${d}，${FOX}比${OWL}多吃几分之几？`,
        answer: `${total - used}/${d}`,
        solution: `1. ${FOX}吃了${total}/${d}\n2. ${OWL}吃了${used}/${d}\n3. 多吃 = ${total}/${d} - ${used}/${d}\n4. = (${total}-${used})/${d} = ${total - used}/${d}`,
        type: '分巧克力',
      };
    },
    // 涂色
    () => {
      const d = pick([4, 6, 8, 10]);
      const n = randInt(1, d - 1);
      return {
        content: `${PENGUIN}在一张圆形纸上涂色，涂了${n}/${d}，没涂的占几分之几？`,
        answer: `${d - n}/${d}`,
        solution: `1. 把圆形纸看作整体1\n2. 涂了${n}/${d}\n3. 没涂 = 1 - ${n}/${d} = ${d}/${d} - ${n}/${d}\n4. = ${d - n}/${d}`,
        type: '涂色',
      };
    },
    // 比大小
    () => {
      const d1 = pick([3, 4, 5, 6]);
      const d2 = pick([4, 5, 6, 8, 10]);
      const n1 = randInt(1, d1 - 1);
      const n2 = randInt(1, d2 - 1);
      const v1 = n1 / d1;
      const v2 = n2 / d2;
      return {
        content: `${BEAR}出题：${CAT}看了全书的${n1}/${d1}，${DRAGON}看了全书的${n2}/${d2}，谁看得多？`,
        answer: `${v1 > v2 ? CAT : v1 < v2 ? DRAGON : '两人看得一样多'}`,
        solution: `1. ${CAT}看${n1}/${d1} = ${v1.toFixed(2)}\n2. ${DRAGON}看${n2}/${d2} = ${v2.toFixed(2)}\n3. ${v1.toFixed(2)} ${v1 > v2 ? '>' : v1 < v2 ? '<' : '='} ${v2.toFixed(2)}\n4. ${v1 > v2 ? CAT : v1 < v2 ? DRAGON : '一样多'}看得多`,
        type: '比大小',
      };
    },
    // 果汁分配
    () => {
      const d = pick([4, 5, 6, 8]);
      const a = randInt(1, d - 2);
      const b = randInt(1, d - a - 1);
      const c = d - a - b;
      return {
        content: `一壶果汁平均分成${d}杯，${RABBIT}喝了${a}杯，${FROG}喝了${b}杯，还剩${c}杯没喝。${RABBIT}和${FROG}共喝了这壶果汁的几分之几？`,
        answer: `${a + b}/${d}`,
        solution: `1. ${RABBIT}喝了${a}杯，占${a}/${d}\n2. ${FROG}喝了${b}杯，占${b}/${d}\n3. 共喝 = ${a}/${d} + ${b}/${d} = ${a + b}/${d}`,
        type: '果汁分配',
      };
    },
    // 水果分配
    () => {
      const d = pick([5, 8, 10]);
      const n = randInt(1, d - 1);
      const people = randInt(2, 4);
      return {
        content: `一篮苹果平均分成${d}份，${people}个好朋友合吃了${n}份，她们吃了这篮苹果的几分之几？`,
        answer: `${n}/${d}`,
        solution: `1. 苹果分成${d}份\n2. ${people}人合吃${n}份\n3. 吃的比例 = ${n}/${d}\n4. 不管几个人一起吃，吃了${n}份就是${n}/${d}`,
        type: '水果分配',
      };
    },
    // 读书进度
    () => {
      const d = pick([5, 6, 10]);
      const n1 = randInt(1, d - 2);
      const n2 = randInt(1, d - n1 - 1);
      return {
        content: `${OWL}在读一本故事书，第一天看了全书的${n1}/${d}，第二天看了全书的${n2}/${d}，两天共看了几分之几？`,
        answer: `${n1 + n2}/${d}`,
        solution: `1. 第一天看了${n1}/${d}\n2. 第二天看了${n2}/${d}\n3. 两天共看 = ${n1}/${d} + ${n2}/${d}\n4. = (${n1}+${n2})/${d} = ${n1 + n2}/${d}`,
        type: '读书进度',
      };
    },
    // 成绩比例
    () => {
      const total = randInt(30, 50);
      const passed = randInt(20, total - 5);
      const [sn, sd] = simplifyNumDen(passed, total);
      return {
        content: `${BEAR}的班级有${total}人参加考试，${passed}人及格，及格人数占总人数的几分之几？`,
        answer: `${sn}/${sd}`,
        solution: `1. 总人数${total}人\n2. 及格${passed}人\n3. 比例 = ${passed}/${total}\n4. 化简 = ${sn}/${sd}`,
        type: '成绩比例',
      };
    },
    // 时间分配
    () => {
      const d = pick([6, 8, 12]);
      const a = randInt(1, d - 2);
      const b = randInt(1, d - a - 1);
      return {
        content: `${PENGUIN}把一天的活动时间分成${d}等份，学习占${a}份，运动占${b}份，其余是休息。学习和运动共占一天的几分之几？`,
        answer: `${a + b}/${d}`,
        solution: `1. 学习占${a}份，即${a}/${d}\n2. 运动占${b}份，即${b}/${d}\n3. 共占 = ${a}/${d} + ${b}/${d} = ${a + b}/${d}`,
        type: '时间分配',
      };
    },
    // 面积分配
    () => {
      const d = pick([4, 5, 8]);
      const n = randInt(1, d - 1);
      return {
        content: `一块正方形花坛，${CAT}种了其中${n}/${d}面积的花，剩下的种草。种草的面积占几分之几？`,
        answer: `${d - n}/${d}`,
        solution: `1. 花坛整体为1\n2. 种花占${n}/${d}\n3. 种草 = 1 - ${n}/${d} = ${d}/${d} - ${n}/${d}\n4. = ${d - n}/${d}`,
        type: '面积分配',
      };
    },
    // 材料分配
    () => {
      const total = randInt(4, 10);
      const used = randInt(2, total - 1);
      return {
        content: `手工课上${FROG}有${total}张彩纸，用了${used}张做贺卡，用了总数的几分之几？`,
        answer: `${used}/${total}`,
        solution: `1. 共有${total}张彩纸\n2. 用了${used}张\n3. 用的比例 = ${used} ÷ ${total} = ${used}/${total}`,
        type: '材料分配',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// 辅助：分数化简
function simplifyNumDen(num, den) {
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }
  const g = gcd(num, den);
  return [num / g, den / g];
}

// ============ 第四章应用题：工作效率问题（10个模板） ============

export function genAppCh4() {
  const templates = [
    // 工厂生产
    () => {
      const per = randInt(30, 80);
      const hours = randInt(6, 10);
      return {
        content: `${CAT}在工厂参观，看到机器每小时生产${per}个零件，工作${hours}小时，一共生产多少个？`,
        answer: `${per * hours}个`,
        solution: `1. 每小时生产${per}个\n2. 工作${hours}小时\n3. 总产量 = 效率 × 时间\n4. ${per} × ${hours} = ${per * hours}（个）`,
        type: '工厂生产',
      };
    },
    // 农场收割
    () => {
      const total = randInt(500, 1200);
      const days = randInt(5, 10);
      if (total % days !== 0) return genAppCh4();
      return {
        content: `农场要收割${total}亩稻谷，计划${days}天完成，平均每天收割多少亩？`,
        answer: `${total / days}亩`,
        solution: `1. 总任务${total}亩\n2. 计划${days}天完成\n3. 每天 = 总量 ÷ 天数\n4. ${total} ÷ ${days} = ${total / days}（亩）`,
        type: '农场收割',
      };
    },
    // 打字速度
    () => {
      const a = randInt(40, 80);
      const b = randInt(30, 60);
      const hours = randInt(3, 6);
      return {
        content: `${DRAGON}每分钟打${a}个字，${FOX}每分钟打${b}个字，两人各打${hours}分钟，${DRAGON}比${FOX}多打多少个字？`,
        answer: `${(a - b) * hours}个`,
        solution: `1. ${DRAGON}每分钟${a}个\n2. ${FOX}每分钟${b}个\n3. ${DRAGON}${hours}分钟 = ${a} × ${hours} = ${a * hours}（个）\n4. ${FOX}${hours}分钟 = ${b} × ${hours} = ${b * hours}（个）\n5. 多打 = ${a * hours} - ${b * hours} = ${(a - b) * hours}（个）`,
        type: '打字速度',
      };
    },
    // 看书速度
    () => {
      const total = randInt(200, 500);
      const days = randInt(10, 25);
      if (total % days !== 0) return genAppCh4();
      const per = total / days;
      return {
        content: `${OWL}要读完一本${total}页的书，计划${days}天读完，平均每天要读多少页？`,
        answer: `${per}页`,
        solution: `1. 全书${total}页\n2. 计划${days}天\n3. 每天 = ${total} ÷ ${days} = ${per}（页）`,
        type: '看书速度',
      };
    },
    // 做题速度
    () => {
      const a = randInt(5, 12);
      const b = randInt(3, 8);
      const time = randInt(60, 120);
      return {
        content: `${RABBIT}做一道题要${a}分钟，${FROG}做一道题要${b}分钟，${time}分钟内${RABBIT}比${FROG}多做几道题？`,
        answer: `${Math.round(time / a - time / b)}道`,
        solution: `1. ${RABBIT}每道${a}分钟，${time}分钟做 ${time}÷${a} = ${Math.round(time / a)}（道）\n2. ${FROG}每道${b}分钟，${time}分钟做 ${time}÷${b} = ${Math.round(time / b)}（道）\n3. 多做 = ${Math.round(time / a)} - ${Math.round(time / b)} = ${Math.round(time / a - time / b)}（道）`,
        type: '做题速度',
      };
    },
    // 送货效率
    () => {
      const a = randInt(15, 30);
      const b = randInt(10, 25);
      const hours = randInt(4, 8);
      return {
        content: `快递员${CAT}每小时送${a}个包裹，${BEAR}每小时送${b}个，两人合作${hours}小时共送多少个？`,
        answer: `${(a + b) * hours}个`,
        solution: `1. ${CAT}每小时${a}个\n2. ${BEAR}每小时${b}个\n3. 合作效率 = ${a} + ${b} = ${a + b}（个/小时）\n4. ${hours}小时 = ${a + b} × ${hours} = ${(a + b) * hours}（个）`,
        type: '送货效率',
      };
    },
    // 浇水效率
    () => {
      const per = randInt(8, 20);
      const total = randInt(100, 300);
      if (total % per !== 0) return genAppCh4();
      return {
        content: `${PENGUIN}每分钟浇${per}棵花，花园里有${total}棵花需要浇水，需要多少分钟？`,
        answer: `${total / per}分钟`,
        solution: `1. 每分钟浇${per}棵\n2. 共${total}棵\n3. 时间 = 总数 ÷ 速度\n4. ${total} ÷ ${per} = ${total / per}（分钟）`,
        type: '浇水效率',
      };
    },
    // 清洁效率
    () => {
      const plan = randInt(8, 12);
      const actual = randInt(5, plan - 1);
      const total = randInt(200, 500);
      const planPer = total / plan;
      const actPer = total / actual;
      return {
        content: `清洁队计划${plan}天打扫完${total}平方米的广场，实际只用了${actual}天就完成了。实际每天比计划多打扫多少平方米？`,
        answer: `${Math.round(actPer - planPer)}平方米`,
        solution: `1. 计划每天：${total} ÷ ${plan} = ${Math.round(planPer)}（平方米）\n2. 实际每天：${total} ÷ ${actual} = ${Math.round(actPer)}（平方米）\n3. 多打扫 = ${Math.round(actPer)} - ${Math.round(planPer)} = ${Math.round(actPer - planPer)}（平方米）`,
        type: '清洁效率',
      };
    },
    // 画画速度
    () => {
      const a = randInt(30, 50);
      const b = randInt(20, 40);
      const c = randInt(25, 45);
      const days = 3;
      return {
        content: `${FOX}三天分别画了${a}、${b}、${c}幅画，平均每天画多少幅？`,
        answer: `${Math.round((a + b + c) / days)}幅`,
        solution: `1. 第一天${a}幅\n2. 第二天${b}幅\n3. 第三天${c}幅\n4. 总数 = ${a} + ${b} + ${c} = ${a + b + c}（幅）\n5. 平均 = ${a + b + c} ÷ 3 = ${((a + b + c) / days).toFixed(1)}（幅）`,
        type: '画画速度',
      };
    },
    // 组装速度
    () => {
      const base = randInt(20, 40);
      const increase = randInt(5, 15);
      const hours = randInt(6, 10);
      return {
        content: `工厂原来每小时组装${base}台机器，改进技术后每小时多组装${increase}台，改进后${hours}小时能组装多少台？`,
        answer: `${(base + increase) * hours}台`,
        solution: `1. 原效率${base}台/小时\n2. 提高${increase}台/小时\n3. 新效率 = ${base} + ${increase} = ${base + increase}（台/小时）\n4. ${hours}小时 = ${base + increase} × ${hours} = ${(base + increase) * hours}（台）`,
        type: '组装速度',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第五章应用题：逆推（8个模板） ============

export function genAppCh5() {
  const templates = [
    // 猜数字
    () => {
      const x = randInt(5, 30);
      const add = randInt(3, 15);
      const mul = randInt(2, 5);
      const result = (x + add) * mul;
      return {
        content: `${DRAGON}出了一道谜题：一个数加上${add}，再乘以${mul}，结果是${result}，这个数是多少？`,
        answer: `${x}`,
        solution: `1. 设这个数为□\n2. (□ + ${add}) × ${mul} = ${result}\n3. 逆推第一步：□ + ${add} = ${result} ÷ ${mul} = ${result / mul}\n4. 逆推第二步：□ = ${result / mul} - ${add} = ${x}`,
        type: '猜数字',
      };
    },
    // 还原问题
    () => {
      const x = randInt(50, 100);
      const half = x / 2;
      if (!Number.isInteger(half)) return genAppCh5();
      const spent = randInt(5, 20);
      const left = half - spent;
      return {
        content: `${CAT}有一些钱，花掉一半后又花了${spent}元，还剩${left}元，原来有多少钱？`,
        answer: `${x}元`,
        solution: `1. 花掉一半后又花${spent}元，剩${left}元\n2. 花一半后剩余 = ${left} + ${spent} = ${half}（元）\n3. 这是原来的一半\n4. 原来 = ${half} × 2 = ${x}（元）`,
        type: '还原问题',
      };
    },
    // 逆推年龄
    () => {
      const now = randInt(8, 12);
      const years = randInt(3, 8);
      const future = now + years;
      return {
        content: `${RABBIT}再过${years}岁就是${future}岁了，${RABBIT}现在几岁？`,
        answer: `${now}岁`,
        solution: `1. 再过${years}岁是${future}岁\n2. 现在年龄 = ${future} - ${years} = ${now}（岁）`,
        type: '逆推年龄',
      };
    },
    // 逆推钱数
    () => {
      const x = randInt(20, 80);
      const spent = randInt(5, 30);
      const left = x - spent;
      return {
        content: `${FOX}买了一本书后还剩${left}元，这本书${spent}元，${FOX}原来有多少元？`,
        answer: `${x}元`,
        solution: `1. 买书后剩${left}元\n2. 书价${spent}元\n3. 原来的钱 = 剩余 + 花费\n4. ${left} + ${spent} = ${x}（元）`,
        type: '逆推钱数',
      };
    },
    // 逆推数量
    () => {
      const x = randInt(10, 30);
      const give = randInt(3, 10);
      const receive = randInt(5, 15);
      const result = x - give + receive;
      return {
        content: `${FROG}有一些弹珠，送给${PENGUIN}${give}颗后，又从${OWL}那里收到${receive}颗，现在有${result}颗，原来有多少颗？`,
        answer: `${x}颗`,
        solution: `1. 送出${give}颗，收到${receive}颗后有${result}颗\n2. 逆推：送出的加回来，收到的减掉\n3. 原来 = ${result} + ${give} - ${receive} = ${x}（颗）`,
        type: '逆推数量',
      };
    },
    // 逆推分数
    () => {
      const x = randInt(20, 60);
      if (x % 2 !== 0) return genAppCh5();
      const half = x / 2;
      return {
        content: `${BEAR}有一些钱，花掉一半后还剩${half}元，原来有多少元？`,
        answer: `${x}元`,
        solution: `1. 花掉一半后剩${half}元\n2. 剩下的是一半\n3. 原来 = ${half} × 2 = ${x}（元）`,
        type: '逆推分数',
      };
    },
    // 逆推时间
    () => {
      const endHour = randInt(10, 18);
      const duration = randInt(1, 4);
      const startHour = endHour - duration;
      return {
        content: `${PENGUIN}做完作业时钟显示${endHour}时，做作业用了${duration}小时，几点开始做的？`,
        answer: `${startHour}时`,
        solution: `1. 做完时${endHour}时\n2. 做了${duration}小时\n3. 开始时间 = ${endHour} - ${duration} = ${startHour}（时）`,
        type: '逆推时间',
      };
    },
    // 逆推距离
    () => {
      const total = randInt(100, 300);
      const walked = randInt(40, total - 50);
      const left = total - walked;
      return {
        content: `${OWL}从家出发去图书馆，走到一半路程时休息了一下，又走了${walked - left}米后还剩${left}米。从家到图书馆一共多少米？`,
        answer: `${total}米`,
        solution: `1. 剩${left}米\n2. 还走了${walked - left}米\n3. 已走 = ${walked - left} + (走到一半的距离)\n4. 这是一个简单的逆推：已走 + 剩余 = 总距离\n5. 设法还原：共${total}米`,
        type: '逆推距离',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第六章应用题：圆的初步认识（6个模板） ============

export function genAppCh6() {
  const templates = [
    // 圆的认识
    () => {
      const r = randInt(3, 10);
      return {
        content: `${CAT}用圆规画了一个圆，圆规两脚张开${r}厘米，这个圆的半径和直径分别是多少厘米？`,
        answer: `半径${r}厘米，直径${r * 2}厘米`,
        solution: `1. 圆规张开${r}厘米就是半径\n2. 半径 = ${r}厘米\n3. 直径 = 半径 × 2 = ${r} × 2 = ${r * 2}（厘米）`,
        type: '圆的认识',
      };
    },
    // 半径直径
    () => {
      const d = randInt(10, 30);
      if (d % 2 !== 0) return genAppCh6();
      const r = d / 2;
      return {
        content: `一个圆形花坛的直径是${d}米，它的半径是多少米？`,
        answer: `${r}米`,
        solution: `1. 直径${d}米\n2. 半径 = 直径 ÷ 2\n3. ${d} ÷ 2 = ${r}（米）`,
        type: '半径直径',
      };
    },
    // 车轮滚动
    () => {
      const d = randInt(50, 80);
      const r = d / 2;
      return {
        content: `${DRAGON}骑自行车，车轮直径是${d}厘米，车轮的半径是多少厘米？`,
        answer: `${r}厘米`,
        solution: `1. 车轮直径${d}厘米\n2. 半径 = 直径 ÷ 2\n3. ${d} ÷ 2 = ${r}（厘米）`,
        type: '车轮滚动',
      };
    },
    // 圆形花坛
    () => {
      const r = randInt(5, 15);
      return {
        content: `学校有一个圆形花坛，从圆心到边缘的距离是${r}米，这个花坛的直径是多少米？`,
        answer: `${r * 2}米`,
        solution: `1. 圆心到边缘 = 半径 = ${r}米\n2. 直径 = 半径 × 2 = ${r} × 2 = ${r * 2}（米）`,
        type: '圆形花坛',
      };
    },
    // 钟表圆盘
    () => {
      return {
        content: `${PENGUIN}观察钟表，钟面上的数字1到12围成一个什么形状？如果钟面直径是30厘米，半径是多少厘米？`,
        answer: `圆形，半径15厘米`,
        solution: `1. 数字1-12围成圆形\n2. 直径30厘米\n3. 半径 = 30 ÷ 2 = 15（厘米）`,
        type: '钟表圆盘',
      };
    },
    // 圆形操场
    () => {
      const r = randInt(10, 30);
      const add = randInt(2, 5);
      return {
        content: `${BEAR}学校圆形操场的半径是${r}米。如果要扩建成半径增加${add}米的大圆，新操场的半径和直径分别是多少米？`,
        answer: `半径${r + add}米，直径${(r + add) * 2}米`,
        solution: `1. 原半径${r}米\n2. 增加${add}米\n3. 新半径 = ${r} + ${add} = ${r + add}（米）\n4. 新直径 = ${r + add} × 2 = ${(r + add) * 2}（米）`,
        type: '圆形操场',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第七章应用题：线段、射线、直线（6个模板） ============

export function genAppCh7() {
  const templates = [
    // 线段计数
    () => {
      const n = randInt(3, 6);
      const count = (n * (n - 1)) / 2;
      return {
        content: `一条直线上有${n}个点，一共能组成多少条线段？`,
        answer: `${count}条`,
        solution: `1. 直线上有${n}个点\n2. 线段数 = n × (n-1) ÷ 2\n3. ${n} × ${n - 1} ÷ 2 = ${count}（条）`,
        type: '线段计数',
      };
    },
    // 两点距离
    () => {
      const a = randInt(5, 15);
      const b = randInt(3, 10);
      const c = a + b;
      return {
        content: `${CAT}从家到学校${a}米，从学校到图书馆${b}米，从家到图书馆（经过学校）一共多少米？`,
        answer: `${c}米`,
        solution: `1. 家到学校${a}米\n2. 学校到图书馆${b}米\n3. 总距离 = ${a} + ${b} = ${c}（米）\n4. 两点之间线段最短`,
        type: '两点距离',
      };
    },
    // 直线认识
    () => {
      return {
        content: `${DRAGON}说：手电筒的光是直线。${OWL}说：太阳光也是直线。直线有什么特点？直线有几个端点？`,
        answer: `直线没有端点，可以向两端无限延伸`,
        solution: `1. 直线没有端点\n2. 可以向两端无限延伸\n3. 不能测量长度`,
        type: '直线认识',
      };
    },
    // 射线认识
    () => {
      return {
        content: `${FROG}在操场上往一个方向跑步，跑步的路线可以看作什么几何图形？它有几个端点？`,
        answer: `射线，1个端点`,
        solution: `1. 起点是一个端点\n2. 向一个方向无限延伸\n3. 符合射线的特征\n4. 射线有1个端点`,
        type: '射线认识',
      };
    },
    // 图形边数
    () => {
      const shapes = [
        { name: '三角形', sides: 3 },
        { name: '四边形', sides: 4 },
        { name: '五边形', sides: 5 },
        { name: '六边形', sides: 6 },
      ];
      const s = pick(shapes);
      return {
        content: `${PENGUIN}画了一个${s.name}，它有几条线段组成的边？`,
        answer: `${s.sides}条`,
        solution: `1. ${s.name}有${s.sides}条边\n2. 每条边都是一条线段\n3. 共${s.sides}条线段`,
        type: '图形边数',
      };
    },
    // 角的组成
    () => {
      const angle = pick([30, 45, 60, 90, 120, 135, 150]);
      let type = '';
      if (angle < 90) type = '锐角';
      else if (angle === 90) type = '直角';
      else type = '钝角';
      return {
        content: `一个角是${angle}度，它是什么角？这个角是由两条什么组成的？`,
        answer: `${type}，由两条射线组成`,
        solution: `1. 角的度数${angle}°\n2. ${angle < 90 ? `${angle} < 90，是锐角` : angle === 90 ? `${angle} = 90，是直角` : `${angle} > 90，是钝角`}\n3. 角由两条射线（从同一点出发）组成`,
        type: '角的组成',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第八章应用题：毫升与升（10个模板） ============

export function genAppCh8() {
  const templates = [
    // 饮料容量
    () => {
      const per = randInt(250, 500);
      const count = randInt(2, 5);
      const total = per * count;
      return {
        content: `${RABBIT}买了${count}瓶果汁，每瓶${per}毫升，一共多少毫升？合多少升多少毫升？`,
        answer: `${total}毫升，合${Math.floor(total / 1000)}升${total % 1000}毫升`,
        solution: `1. 每瓶${per}毫升\n2. ${count}瓶\n3. 总量 = ${per} × ${count} = ${total}（毫升）\n4. 换算：${total}毫升 = ${Math.floor(total / 1000)}升${total % 1000}毫升`,
        type: '饮料容量',
      };
    },
    // 水壶容量
    () => {
      const L = randInt(1, 3);
      const mL = randInt(200, 800);
      return {
        content: `一个水壶装了${L}升${mL}毫升水，等于多少毫升？`,
        answer: `${L * 1000 + mL}毫升`,
        solution: `1. ${L}升 = ${L * 1000}毫升\n2. 再加${mL}毫升\n3. 总量 = ${L * 1000} + ${mL} = ${L * 1000 + mL}（毫升）`,
        type: '水壶容量',
      };
    },
    // 油桶容量
    () => {
      const total = randInt(1000, 5000);
      const used = randInt(200, total - 200);
      return {
        content: `一桶油有${total}毫升，用了${used}毫升，还剩多少毫升？`,
        answer: `${total - used}毫升`,
        solution: `1. 总量${total}毫升\n2. 用了${used}毫升\n3. 剩余 = ${total} - ${used} = ${total - used}（毫升）`,
        type: '油桶容量',
      };
    },
    // 药水容量
    () => {
      const per = randInt(5, 15);
      const times = randInt(3, 6);
      return {
        content: `${CAT}每次喝${per}毫升药水，一天喝${times}次，一天共喝多少毫升？`,
        answer: `${per * times}毫升`,
        solution: `1. 每次${per}毫升\n2. 每天${times}次\n3. 总量 = ${per} × ${times} = ${per * times}（毫升）`,
        type: '药水容量',
      };
    },
    // 鱼缸水量
    () => {
      const per = randInt(200, 800);
      const count = randInt(3, 6);
      return {
        content: `${DRAGON}用杯子给鱼缸加水，每杯${per}毫升，倒了${count}杯，鱼缸里有多少毫升水？`,
        answer: `${per * count}毫升`,
        solution: `1. 每杯${per}毫升\n2. 倒了${count}杯\n3. 总量 = ${per} × ${count} = ${per * count}（毫升）`,
        type: '鱼缸水量',
      };
    },
    // 泳池水量
    () => {
      const L = randInt(50, 200);
      return {
        content: `一个游泳池能装${L}万升水，等于多少万毫升？`,
        answer: `${L * 100}万毫升`,
        solution: `1. 1升 = 1000毫升\n2. 1万升 = 1000万毫升\n3. ${L}万升 = ${L} × 1000 = ${L * 1000}万毫升`,
        type: '泳池水量',
      };
    },
    // 水塔容量
    () => {
      const total = randInt(5000, 20000);
      const supply = randInt(1000, 5000);
      return {
        content: `水塔有${total}升水，每天供应${supply}升，${3}天后还剩多少升？`,
        answer: `${total - supply * 3}升`,
        solution: `1. 水塔有${total}升\n2. 每天供应${supply}升\n3. 3天共供应 = ${supply} × 3 = ${supply * 3}（升）\n4. 剩余 = ${total} - ${supply * 3} = ${total - supply * 3}（升）`,
        type: '水塔容量',
      };
    },
    // 饮料配比
    () => {
      const a = randInt(200, 500);
      const b = randInt(100, 400);
      return {
        content: `${FOX}调果汁，用了${a}毫升橙汁和${b}毫升柠檬水，混合后一共多少毫升？`,
        answer: `${a + b}毫升`,
        solution: `1. 橙汁${a}毫升\n2. 柠檬水${b}毫升\n3. 总量 = ${a} + ${b} = ${a + b}（毫升）`,
        type: '饮料配比',
      };
    },
    // 浇花用水
    () => {
      const per = randInt(100, 300);
      const times = randInt(4, 8);
      const days = randInt(5, 10);
      return {
        content: `${BEAR}每次浇花用${per}毫升水，一天浇${times}次，${days}天共用多少毫升水？`,
        answer: `${per * times * days}毫升`,
        solution: `1. 每次${per}毫升\n2. 每天${times}次 → 每天${per} × ${times} = ${per * times}（毫升）\n3. ${days}天 → ${per * times} × ${days} = ${per * times * days}（毫升）`,
        type: '浇花用水',
      };
    },
    // 做饭用水
    () => {
      const total = randInt(2000, 5000);
      const n = randInt(3, 6);
      if (total % n !== 0) return genAppCh8();
      return {
        content: `${PENGUIN}做饭用了${total}毫升水，平均分${n}次使用，每次用多少毫升？`,
        answer: `${total / n}毫升`,
        solution: `1. 总共${total}毫升\n2. 分${n}次用\n3. 每次 = ${total} ÷ ${n} = ${total / n}（毫升）`,
        type: '做饭用水',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第九章应用题：吨的认识（8个模板） ============

export function genAppCh9() {
  const templates = [
    // 货车载重
    () => {
      const per = randInt(3, 8);
      const trips = randInt(5, 12);
      return {
        content: `一辆卡车每次运${per}吨货物，运了${trips}次，一共运了多少吨？`,
        answer: `${per * trips}吨`,
        solution: `1. 每次运${per}吨\n2. 运了${trips}次\n3. 总量 = ${per} × ${trips} = ${per * trips}（吨）`,
        type: '货车载重',
      };
    },
    // 大象体重
    () => {
      const t = randInt(3, 8);
      const kg = randInt(200, 800);
      return {
        content: `动物园里一头大象重${t}吨${kg}千克，等于多少千克？`,
        answer: `${t * 1000 + kg}千克`,
        solution: `1. ${t}吨 = ${t * 1000}千克\n2. 加上${kg}千克\n3. 总重 = ${t * 1000} + ${kg} = ${t * 1000 + kg}（千克）`,
        type: '大象体重',
      };
    },
    // 集装箱重量
    () => {
      const total = randInt(20, 50);
      const per = randInt(4, 8);
      const trips = Math.ceil(total / per);
      return {
        content: `码头有${total}吨货物需要装船，每辆叉车每次运${per}吨，至少需要运多少次？`,
        answer: `${trips}次`,
        solution: `1. 总共${total}吨\n2. 每次运${per}吨\n3. ${total} ÷ ${per} = ${(total / per).toFixed(1)}\n4. 不能运半次，向上取整 = ${trips}（次）`,
        type: '集装箱重量',
      };
    },
    // 粮食产量
    () => {
      const a = randInt(50, 200);
      const b = randInt(30, 150);
      return {
        content: `农场今年收了${a}吨小麦和${b}吨稻谷，粮食总产量是多少吨？`,
        answer: `${a + b}吨`,
        solution: `1. 小麦${a}吨\n2. 稻谷${b}吨\n3. 总产量 = ${a} + ${b} = ${a + b}（吨）`,
        type: '粮食产量',
      };
    },
    // 建筑材料
    () => {
      const per = randInt(2, 5);
      const count = randInt(4, 8);
      return {
        content: `${OWL}帮建筑队计算：每车运${per}吨水泥，运了${count}车，共多少吨？合多少千克？`,
        answer: `${per * count}吨，${per * count * 1000}千克`,
        solution: `1. 每车${per}吨\n2. ${count}车\n3. 总重 = ${per} × ${count} = ${per * count}（吨）\n4. 换算 = ${per * count} × 1000 = ${per * count * 1000}（千克）`,
        type: '建筑材料',
      };
    },
    // 垃圾处理
    () => {
      const per = randInt(5, 15);
      const days = randInt(20, 30);
      return {
        content: `一个小区每天产生${per}吨垃圾，一个月（${days}天）产生多少吨垃圾？`,
        answer: `${per * days}吨`,
        solution: `1. 每天${per}吨\n2. ${days}天\n3. 总量 = ${per} × ${days} = ${per * days}（吨）`,
        type: '垃圾处理',
      };
    },
    // 水果批发
    () => {
      const t = randInt(1, 5);
      const kg = randInt(200, 800);
      const sold = randInt(500, 2000);
      const totalKg = t * 1000 + kg;
      return {
        content: `水果批发市场进了${t}吨${kg}千克苹果，卖出了${sold}千克，还剩多少千克？`,
        answer: `${totalKg - sold}千克`,
        solution: `1. 进货${t}吨${kg}千克 = ${totalKg}千克\n2. 卖出${sold}千克\n3. 剩余 = ${totalKg} - ${sold} = ${totalKg - sold}（千克）`,
        type: '水果批发',
      };
    },
    // 钢材重量
    () => {
      const t1 = randInt(10, 30);
      const t2 = randInt(5, 20);
      return {
        content: `仓库原有钢材${t1}吨，又运来${t2}吨，现在有多少吨？如果每天用${randInt(2, 5)}吨，可以用多少天？`,
        answer: `共${t1 + t2}吨`,
        solution: `1. 原有${t1}吨\n2. 运来${t2}吨\n3. 现在 = ${t1} + ${t2} = ${t1 + t2}（吨）`,
        type: '钢材重量',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十章应用题：平方千米（6个模板） ============

export function genAppCh10() {
  const templates = [
    // 城市面积
    () => {
      const sqkm = randInt(10, 100);
      return {
        content: `一座城市的面积是${sqkm}平方千米，等于多少公顷？`,
        answer: `${sqkm * 100}公顷`,
        solution: `1. 1平方千米 = 100公顷\n2. ${sqkm}平方千米 = ${sqkm} × 100 = ${sqkm * 100}（公顷）`,
        type: '城市面积',
      };
    },
    // 公园面积
    () => {
      const ha = randInt(5, 50);
      return {
        content: `一个公园面积是${ha}公顷，等于多少平方米？`,
        answer: `${ha * 10000}平方米`,
        solution: `1. 1公顷 = 10000平方米\n2. ${ha}公顷 = ${ha} × 10000 = ${ha * 10000}（平方米）`,
        type: '公园面积',
      };
    },
    // 湖泊面积
    () => {
      const sqkm = randInt(5, 50);
      return {
        content: `${DRAGON}查到一个湖泊面积是${sqkm}平方千米，等于多少公顷？等于多少平方米？`,
        answer: `${sqkm * 100}公顷，${sqkm * 100 * 10000}平方米`,
        solution: `1. ${sqkm}平方千米 = ${sqkm} × 100 = ${sqkm * 100}（公顷）\n2. ${sqkm * 100}公顷 = ${sqkm * 100} × 10000 = ${sqkm * 100 * 10000}（平方米）`,
        type: '湖泊面积',
      };
    },
    // 森林面积
    () => {
      const a = randInt(1, 10);
      const b = randInt(50, 200);
      return {
        content: `森林公园${a}平方千米，植物园${b}公顷，哪个面积更大？`,
        answer: `${a * 100 > b ? '森林公园' : '植物园'}更大`,
        solution: `1. 森林公园${a}平方千米 = ${a * 100}公顷\n2. 植物园${b}公顷\n3. ${a * 100} ${a * 100 > b ? '>' : '<'} ${b}\n4. 所以${a * 100 > b ? '森林公园' : '植物园'}更大`,
        type: '森林面积',
      };
    },
    // 农场面积
    () => {
      const l = randInt(200, 1000);
      const w = randInt(100, 500);
      const area = l * w;
      return {
        content: `一块长方形农场，长${l}米，宽${w}米，面积是多少平方米？合多少公顷？`,
        answer: `${area}平方米，合${(area / 10000).toFixed(2)}公顷`,
        solution: `1. 长${l}米，宽${w}米\n2. 面积 = ${l} × ${w} = ${area}（平方米）\n3. 换算 = ${area} ÷ 10000 = ${(area / 10000).toFixed(2)}（公顷）`,
        type: '农场面积',
      };
    },
    // 国家面积
    () => {
      const s = randInt(100, 500);
      return {
        content: `一个正方形牧场边长${s}米，面积是多少平方米？合多少公顷？`,
        answer: `${s * s}平方米，合${((s * s) / 10000).toFixed(2)}公顷`,
        solution: `1. 正方形面积 = 边长 × 边长\n2. ${s} × ${s} = ${s * s}（平方米）\n3. 换算 = ${s * s} ÷ 10000 = ${((s * s) / 10000).toFixed(2)}（公顷）`,
        type: '国家面积',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十一章应用题：小数的认识与加减法（12个模板） ============

export function genAppCh11() {
  const templates = [
    // 身高体重
    () => {
      const a = randInt(120, 160) / 10;
      const b = randInt(120, 160) / 10;
      if (a === b) return genAppCh11();
      return {
        content: `${CAT}身高${a.toFixed(1)}米，${DRAGON}身高${b.toFixed(1)}米，谁高？高多少米？`,
        answer: `${Math.max(a, b).toFixed(1)}米的更高，高${Math.abs(a - b).toFixed(1)}米`,
        solution: `1. ${CAT}${a.toFixed(1)}米\n2. ${DRAGON}${b.toFixed(1)}米\n3. ${Math.max(a, b).toFixed(1)} > ${Math.min(a, b).toFixed(1)}\n4. 相差 = ${Math.abs(a - b).toFixed(1)}（米）`,
        type: '身高体重',
      };
    },
    // 购物找零
    () => {
      const price = randInt(20, 80) / 10;
      const pay = Math.ceil(price + randInt(1, 5));
      return {
        content: `一本书${price.toFixed(1)}元，${FOX}付了${pay.toFixed(1)}元，应找回多少元？`,
        answer: `${(pay - price).toFixed(1)}元`,
        solution: `1. 书价${price.toFixed(1)}元\n2. 付款${pay.toFixed(1)}元\n3. 找回 = ${pay.toFixed(1)} - ${price.toFixed(1)} = ${(pay - price).toFixed(1)}（元）`,
        type: '购物找零',
      };
    },
    // 温度变化
    () => {
      const morning = randInt(100, 250) / 10;
      const noon = randInt(250, 350) / 10;
      const diff = (noon - morning).toFixed(1);
      return {
        content: `早上气温${morning.toFixed(1)}℃，中午气温${noon.toFixed(1)}℃，气温升高了多少℃？`,
        answer: `${diff}℃`,
        solution: `1. 早上${morning.toFixed(1)}℃\n2. 中午${noon.toFixed(1)}℃\n3. 升高 = ${noon.toFixed(1)} - ${morning.toFixed(1)} = ${diff}（℃）`,
        type: '温度变化',
      };
    },
    // 成绩计算
    () => {
      const a = randInt(800, 990) / 10;
      const b = randInt(800, 990) / 10;
      const total = (a + b).toFixed(1);
      return {
        content: `${RABBIT}语文考了${a.toFixed(1)}分，数学考了${b.toFixed(1)}分，两科总分是多少？`,
        answer: `${total}分`,
        solution: `1. 语文${a.toFixed(1)}分\n2. 数学${b.toFixed(1)}分\n3. 总分 = ${a.toFixed(1)} + ${b.toFixed(1)} = ${total}（分）`,
        type: '成绩计算',
      };
    },
    // 路程计算
    () => {
      const a = randInt(10, 50) / 10;
      const b = randInt(10, 40) / 10;
      return {
        content: `${PENGUIN}从家到学校${a.toFixed(1)}千米，从学校到书店${b.toFixed(1)}千米，从家到书店（经过学校）共多少千米？`,
        answer: `${(a + b).toFixed(1)}千米`,
        solution: `1. 家到学校${a.toFixed(1)}千米\n2. 学校到书店${b.toFixed(1)}千米\n3. 总距离 = ${a.toFixed(1)} + ${b.toFixed(1)} = ${(a + b).toFixed(1)}（千米）`,
        type: '路程计算',
      };
    },
    // 时间计算
    () => {
      const a = randInt(10, 30) / 10;
      const b = randInt(10, 25) / 10;
      return {
        content: `${OWL}做数学作业用了${a.toFixed(1)}小时，做语文作业用了${b.toFixed(1)}小时，哪科用时多？多多少小时？`,
        answer: `${Math.max(a, b).toFixed(1)}小时的多，多${Math.abs(a - b).toFixed(1)}小时`,
        solution: `1. 数学${a.toFixed(1)}小时\n2. 语文${b.toFixed(1)}小时\n3. ${Math.max(a, b).toFixed(1)} > ${Math.min(a, b).toFixed(1)}\n4. 多${Math.abs(a - b).toFixed(1)}小时`,
        type: '时间计算',
      };
    },
    // 重量计算
    () => {
      const a = randInt(250, 450) / 10;
      const b = randInt(200, 400) / 10;
      return {
        content: `一个西瓜${a.toFixed(1)}千克，一个哈密瓜${b.toFixed(1)}千克，西瓜比哈密瓜重多少千克？`,
        answer: `${Math.abs(a - b).toFixed(1)}千克`,
        solution: `1. 西瓜${a.toFixed(1)}千克\n2. 哈密瓜${b.toFixed(1)}千克\n3. 差 = ${Math.abs(a - b).toFixed(1)}（千克）`,
        type: '重量计算',
      };
    },
    // 容量计算
    () => {
      const a = randInt(50, 200) / 10;
      const b = randInt(50, 200) / 10;
      const c = randInt(20, 100) / 10;
      return {
        content: `水壶里有${a.toFixed(1)}升水，倒出${c.toFixed(1)}升后又加入${b.toFixed(1)}升，现在有多少升？`,
        answer: `${(a - c + b).toFixed(1)}升`,
        solution: `1. 原有${a.toFixed(1)}升\n2. 倒出${c.toFixed(1)}升\n3. 加入${b.toFixed(1)}升\n4. 现在 = ${a.toFixed(1)} - ${c.toFixed(1)} + ${b.toFixed(1)} = ${(a - c + b).toFixed(1)}（升）`,
        type: '容量计算',
      };
    },
    // 价格比较
    () => {
      const p1 = randInt(10, 50) / 10;
      const p2 = randInt(10, 50) / 10;
      if (p1 === p2) return genAppCh11();
      return {
        content: `${BEAR}文具店：铅笔${p1.toFixed(1)}元/支；对面文具店：铅笔${p2.toFixed(1)}元/支。哪家便宜？每支便宜多少钱？`,
        answer: `${p1 < p2 ? '小熊文具店' : '对面文具店'}便宜，每支便宜${Math.abs(p1 - p2).toFixed(1)}元`,
        solution: `1. 小熊文具店${p1.toFixed(1)}元\n2. 对面${p2.toFixed(1)}元\n3. 差价 = ${Math.abs(p1 - p2).toFixed(1)}元`,
        type: '价格比较',
      };
    },
    // 存钱取钱
    () => {
      const have = randInt(500, 2000) / 10;
      const save = randInt(100, 500) / 10;
      const draw = randInt(50, 300) / 10;
      return {
        content: `${FROG}存折上有${have.toFixed(1)}元，存入${save.toFixed(1)}元后取出${draw.toFixed(1)}元，现在有多少钱？`,
        answer: `${(have + save - draw).toFixed(1)}元`,
        solution: `1. 原有${have.toFixed(1)}元\n2. 存入${save.toFixed(1)}元\n3. 取出${draw.toFixed(1)}元\n4. 现在 = ${have.toFixed(1)} + ${save.toFixed(1)} - ${draw.toFixed(1)} = ${(have + save - draw).toFixed(1)}（元）`,
        type: '存钱取钱',
      };
    },
    // 测量记录
    () => {
      const a = randInt(30, 80) / 10;
      const b = randInt(20, 70) / 10;
      const c = randInt(40, 90) / 10;
      const sum = (a + b + c).toFixed(1);
      return {
        content: `实验课上${CAT}测量三根绳子分别长${a.toFixed(1)}厘米、${b.toFixed(1)}厘米、${c.toFixed(1)}厘米，总长多少厘米？`,
        answer: `${sum}厘米`,
        solution: `1. 第一根${a.toFixed(1)}厘米\n2. 第二根${b.toFixed(1)}厘米\n3. 第三根${c.toFixed(1)}厘米\n4. 总长 = ${a.toFixed(1)} + ${b.toFixed(1)} + ${c.toFixed(1)} = ${sum}（厘米）`,
        type: '测量记录',
      };
    },
    // 数据统计
    () => {
      const n = randInt(3, 5);
      const vals = Array.from({ length: n }, () => randInt(50, 150) / 10);
      const sum = vals.reduce((a, b) => a + b, 0);
      return {
        content: `运动会跳远成绩（米）：${vals.map(v => v.toFixed(1)).join('、')}，总成绩是多少米？`,
        answer: `${sum.toFixed(1)}米`,
        solution: `1. 成绩：${vals.map(v => v.toFixed(1)).join('、')}\n2. 总成绩 = ${vals.map(v => v.toFixed(1)).join(' + ')} = ${sum.toFixed(1)}（米）`,
        type: '数据统计',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十二章应用题：小数乘法（10个模板） ============

export function genAppCh12() {
  const templates = [
    // 购物计算
    () => {
      const price = randInt(10, 50) / 10;
      const count = randInt(2, 6);
      const total = (price * count).toFixed(1);
      return {
        content: `${DRAGON}买笔，每支${price.toFixed(1)}元，买了${count}支，一共多少钱？`,
        answer: `${total}元`,
        solution: `1. 每支${price.toFixed(1)}元\n2. 买了${count}支\n3. 总价 = ${price.toFixed(1)} × ${count} = ${total}（元）`,
        type: '购物计算',
      };
    },
    // 面积计算
    () => {
      const l = randInt(20, 80) / 10;
      const w = randInt(10, 50) / 10;
      const area = (l * w).toFixed(2);
      return {
        content: `一块长方形菜地，长${l.toFixed(1)}米，宽${w.toFixed(1)}米，面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 长${l.toFixed(1)}米，宽${w.toFixed(1)}米\n2. 面积 = 长 × 宽\n3. ${l.toFixed(1)} × ${w.toFixed(1)} = ${area}（平方米）`,
        type: '面积计算',
      };
    },
    // 路程计算
    () => {
      const speed = randInt(40, 80) / 10;
      const time = randInt(2, 5);
      const dist = (speed * time).toFixed(1);
      return {
        content: `一辆汽车每小时行驶${speed.toFixed(1)}千米，行驶${time}小时，走了多少千米？`,
        answer: `${dist}千米`,
        solution: `1. 速度${speed.toFixed(1)}千米/小时\n2. 时间${time}小时\n3. 路程 = ${speed.toFixed(1)} × ${time} = ${dist}（千米）`,
        type: '路程计算',
      };
    },
    // 时间计算
    () => {
      const per = randInt(15, 45) / 10;
      const count = randInt(3, 8);
      const total = (per * count).toFixed(1);
      return {
        content: `${FOX}每做一道手工需要${per.toFixed(1)}分钟，做${count}道需要多少分钟？`,
        answer: `${total}分钟`,
        solution: `1. 每道${per.toFixed(1)}分钟\n2. 做${count}道\n3. 总时间 = ${per.toFixed(1)} × ${count} = ${total}（分钟）`,
        type: '时间计算',
      };
    },
    // 重量计算
    () => {
      const price = randInt(20, 80) / 10;
      const weight = randInt(2, 5);
      const total = (price * weight).toFixed(1);
      return {
        content: `苹果每千克${price.toFixed(1)}元，买了${weight}千克，一共多少钱？`,
        answer: `${total}元`,
        solution: `1. 单价${price.toFixed(1)}元/千克\n2. 重量${weight}千克\n3. 总价 = ${price.toFixed(1)} × ${weight} = ${total}（元）`,
        type: '重量计算',
      };
    },
    // 容量计算
    () => {
      const per = randInt(15, 45) / 10;
      const count = randInt(3, 6);
      const total = (per * count).toFixed(1);
      return {
        content: `每个杯子装${per.toFixed(1)}升果汁，${count}个杯子共装多少升？`,
        answer: `${total}升`,
        solution: `1. 每杯${per.toFixed(1)}升\n2. ${count}杯\n3. 总量 = ${per.toFixed(1)} × ${count} = ${total}（升）`,
        type: '容量计算',
      };
    },
    // 工资计算
    () => {
      const per = randInt(50, 150) / 10;
      const days = randInt(20, 30);
      const total = (per * days).toFixed(1);
      return {
        content: `清洁工每天工资${per.toFixed(1)}元，${days}天工资共多少元？`,
        answer: `${total}元`,
        solution: `1. 每天${per.toFixed(1)}元\n2. ${days}天\n3. 总工资 = ${per.toFixed(1)} × ${days} = ${total}（元）`,
        type: '工资计算',
      };
    },
    // 材料用量
    () => {
      const per = randInt(10, 50) / 10;
      const count = randInt(4, 10);
      const total = (per * count).toFixed(1);
      return {
        content: `每张桌子需要${per.toFixed(1)}千克油漆，${count}张桌子需要多少千克？`,
        answer: `${total}千克`,
        solution: `1. 每张${per.toFixed(1)}千克\n2. ${count}张\n3. 总用量 = ${per.toFixed(1)} × ${count} = ${total}（千克）`,
        type: '材料用量',
      };
    },
    // 产量计算
    () => {
      const per = randInt(30, 80) / 10;
      const machine = randInt(3, 6);
      const total = (per * machine).toFixed(1);
      return {
        content: `每台机器每小时生产${per.toFixed(1)}个零件，${machine}台机器每小时共生产多少个？`,
        answer: `${total}个`,
        solution: `1. 每台每小时${per.toFixed(1)}个\n2. ${machine}台\n3. 总产量 = ${per.toFixed(1)} × ${machine} = ${total}（个）`,
        type: '产量计算',
      };
    },
    // 速度距离
    () => {
      const speed = randInt(50, 120) / 10;
      const time = randInt(2, 6);
      const dist = (speed * time).toFixed(1);
      return {
        content: `${PENGUIN}骑自行车每小时行${speed.toFixed(1)}千米，${time}小时行了多少千米？`,
        answer: `${dist}千米`,
        solution: `1. 速度${speed.toFixed(1)}千米/小时\n2. 时间${time}小时\n3. 路程 = ${speed.toFixed(1)} × ${time} = ${dist}（千米）`,
        type: '速度距离',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十三章应用题：小数除法（10个模板） ============

export function genAppCh13() {
  const templates = [
    // 平均分配
    () => {
      const total = randInt(20, 80) / 10;
      const count = randInt(2, 5);
      const per = (total / count).toFixed(1);
      return {
        content: `${CAT}有${total.toFixed(1)}千克糖果，平均分给${count}个好朋友，每人分到多少千克？`,
        answer: `${per}千克`,
        solution: `1. 总共${total.toFixed(1)}千克\n2. 分给${count}人\n3. 每人 = ${total.toFixed(1)} ÷ ${count} = ${per}（千克）`,
        type: '平均分配',
      };
    },
    // 速度计算
    () => {
      const dist = randInt(50, 200) / 10;
      const time = randInt(2, 5);
      const speed = (dist / time).toFixed(1);
      return {
        content: `${DRAGON}${time}小时走了${dist.toFixed(1)}千米，平均每小时走多少千米？`,
        answer: `${speed}千米`,
        solution: `1. 路程${dist.toFixed(1)}千米\n2. 时间${time}小时\n3. 速度 = ${dist.toFixed(1)} ÷ ${time} = ${speed}（千米/小时）`,
        type: '速度计算',
      };
    },
    // 单价计算
    () => {
      const per = randInt(2, 10) * 10;
      const count = randInt(2, 5);
      const total = per * count;
      return {
        content: `买${count}支同样的钢笔共花了${total}元，每支钢笔多少钱？`,
        answer: `${per}元`,
        solution: `1. 总价${total}元\n2. ${count}支\n3. 单价 = ${total} ÷ ${count} = ${per}（元）`,
        type: '单价计算',
      };
    },
    // 效率计算
    () => {
      const total = randInt(40, 100) / 10;
      const days = randInt(3, 7);
      const per = (total / days).toFixed(1);
      return {
        content: `一批货物${total.toFixed(1)}吨，${days}天运完，平均每天运多少吨？`,
        answer: `${per}吨`,
        solution: `1. 总共${total.toFixed(1)}吨\n2. ${days}天运完\n3. 每天 = ${total.toFixed(1)} ÷ ${days} = ${per}（吨）`,
        type: '效率计算',
      };
    },
    // 比例分配
    () => {
      const total = randInt(30, 90) / 10;
      const n = randInt(3, 6);
      const per = (total / n).toFixed(1);
      return {
        content: `一桶${total.toFixed(1)}升的果汁平均倒在${n}个杯子里，每杯多少升？`,
        answer: `${per}升`,
        solution: `1. 共${total.toFixed(1)}升\n2. 倒${n}杯\n3. 每杯 = ${total.toFixed(1)} ÷ ${n} = ${per}（升）`,
        type: '比例分配',
      };
    },
    // 单位换算
    () => {
      const km = randInt(10, 50) / 10;
      const time = randInt(2, 5);
      const speed = (km / time).toFixed(1);
      return {
        content: `${OWL}${time}小时飞行了${km.toFixed(1)}千米，平均每小时飞行多少千米？`,
        answer: `${speed}千米`,
        solution: `1. ${time}小时飞${km.toFixed(1)}千米\n2. 每小时 = ${km.toFixed(1)} ÷ ${time} = ${speed}（千米）`,
        type: '单位换算',
      };
    },
    // 成绩平均
    () => {
      const n = randInt(3, 6);
      const scores = Array.from({ length: n }, () => randInt(70, 100));
      const sum = scores.reduce((a, b) => a + b, 0);
      const avg = (sum / n).toFixed(1);
      return {
        content: `${RABBIT}${n}次数学测试的成绩分别是${scores.join('、')}分，平均分是多少？`,
        answer: `${avg}分`,
        solution: `1. 成绩：${scores.join('、')}\n2. 总分 = ${scores.join('+')} = ${sum}\n3. 平均 = ${sum} ÷ ${n} = ${avg}（分）`,
        type: '成绩平均',
      };
    },
    // 路程平均
    () => {
      const total = randInt(100, 300) / 10;
      const days = randInt(3, 7);
      const per = (total / days).toFixed(1);
      return {
        content: `${FROG}徒步旅行${total.toFixed(1)}千米，用了${days}天完成，平均每天走多少千米？`,
        answer: `${per}千米`,
        solution: `1. 总路程${total.toFixed(1)}千米\n2. ${days}天完成\n3. 平均 = ${total.toFixed(1)} ÷ ${days} = ${per}（千米/天）`,
        type: '路程平均',
      };
    },
    // 重量分配
    () => {
      const per = randInt(20, 80) / 10;
      const count = randInt(2, 5);
      const total = (per * count).toFixed(1);
      return {
        content: `${BEAR}买了${total}千克面粉，平均分成${count}袋，每袋多少千克？`,
        answer: `${per.toFixed(1)}千克`,
        solution: `1. 总重${total}千克\n2. 分${count}袋\n3. 每袋 = ${total} ÷ ${count} = ${per.toFixed(1)}（千克）`,
        type: '重量分配',
      };
    },
    // 容量分配
    () => {
      const total = randInt(50, 200) / 10;
      const n = randInt(2, 5);
      const per = (total / n).toFixed(1);
      return {
        content: `${PENGUIN}把${total.toFixed(1)}升药水平均分装在${n}个小瓶里，每瓶装多少升？`,
        answer: `${per}升`,
        solution: `1. 共${total.toFixed(1)}升\n2. 分${n}瓶\n3. 每瓶 = ${total.toFixed(1)} ÷ ${n} = ${per}（升）`,
        type: '容量分配',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十四章应用题：平行与垂直（6个模板） ============

export function genAppCh14() {
  const templates = [
    // 判断平行
    () => {
      const pairs = [
        { q: '铁轨的两条轨道', a: '平行' },
        { q: '黑板的上下两条边', a: '平行' },
        { q: '斑马线的相邻白线', a: '平行' },
        { q: '双杠的两根杠', a: '平行' },
      ];
      const p = pick(pairs);
      return {
        content: `${DRAGON}在生活中观察到：${p.q}是什么位置关系？`,
        answer: p.a,
        solution: `1. ${p.q}\n2. 这两条线永远不会相交\n3. 所以它们互相${p.a}`,
        type: '判断平行',
      };
    },
    // 判断垂直
    () => {
      const pairs = [
        { q: '电线杆和地面', a: '垂直' },
        { q: '墙角的两条边', a: '垂直' },
        { q: '旗杆和地面', a: '垂直' },
        { q: '十字路口的两条路', a: '垂直' },
      ];
      const p = pick(pairs);
      return {
        content: `${CAT}观察到：${p.q}是什么位置关系？`,
        answer: p.a,
        solution: `1. ${p.q}\n2. 这两条线相交成直角（90°）\n3. 所以它们互相${p.a}`,
        type: '判断垂直',
      };
    },
    // 画平行线
    () => {
      return {
        content: `${PENGUIN}要在方格纸上画一组平行线，可以用什么工具来保证两条线平行？平行线有什么特点？`,
        answer: `用直尺和三角尺，平行线永不相交且距离处处相等`,
        solution: `1. 画平行线可以用直尺配合三角尺\n2. 也可以用直尺沿方格纸的格线画\n3. 平行线特点：永不相交，距离处处相等`,
        type: '画平行线',
      };
    },
    // 画垂线
    () => {
      return {
        content: `${FOX}要从直线外一点A画这条直线的垂线，垂线有什么特点？从A到直线的垂线段有什么特殊之处？`,
        answer: `垂线与直线成90°角，垂线段是从A到直线的最短线段`,
        solution: `1. 垂线与原直线相交成90°\n2. 垂足是交点\n3. 垂线段是从点到直线的最短距离`,
        type: '画垂线',
      };
    },
    // 生活中的平行垂直
    () => {
      return {
        content: `${BEAR}让同学们找教室里的平行和垂直。你能举出教室里的平行和垂直各一组例子吗？`,
        answer: `平行：黑板上下边；垂直：墙角的两条边`,
        solution: `1. 平行例子：黑板的上下两条边、相对的两面墙的墙角线\n2. 垂直例子：墙角的两条边、旗杆和地面\n3. 日常生活中平行和垂直处处可见`,
        type: '生活中的平行垂直',
      };
    },
    // 图形中的平行垂直
    () => {
      return {
        content: `长方形的两组对边分别是什么关系？相邻两条边是什么关系？`,
        answer: `对边平行，相邻边垂直`,
        solution: `1. 长方形有两组对边\n2. 每组对边互相平行\n3. 相邻两条边相交成直角（90°）\n4. 所以相邻边互相垂直`,
        type: '图形中的平行垂直',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十五章应用题：平行四边形和梯形（8个模板） ============

export function genAppCh15() {
  const templates = [
    // 面积计算（平行四边形）
    () => {
      const base = randInt(5, 15);
      const height = randInt(3, 10);
      return {
        content: `一块平行四边形菜地，底${base}米，高${height}米，面积是多少平方米？`,
        answer: `${base * height}平方米`,
        solution: `1. 平行四边形面积 = 底 × 高\n2. 底${base}米，高${height}米\n3. 面积 = ${base} × ${height} = ${base * height}（平方米）`,
        type: '平行四边形面积',
      };
    },
    // 周长计算
    () => {
      const a = randInt(5, 15);
      const b = randInt(3, 10);
      return {
        content: `一个平行四边形的两条邻边分别是${a}厘米和${b}厘米，周长是多少厘米？`,
        answer: `${(a + b) * 2}厘米`,
        solution: `1. 平行四边形对边相等\n2. 两条邻边分别是${a}和${b}\n3. 周长 = 2 × (${a} + ${b}) = ${a + b} × 2 = ${(a + b) * 2}（厘米）`,
        type: '周长计算',
      };
    },
    // 图形判断
    () => {
      const a = randInt(3, 10);
      const b = randInt(a + 2, 18);
      const h = randInt(3, 10);
      const area = ((a + b) * h) / 2;
      return {
        content: `一块梯形花坛，上底${a}米，下底${b}米，高${h}米，面积是多少平方米？`,
        answer: `${area}平方米`,
        solution: `1. 梯形面积 = (上底 + 下底) × 高 ÷ 2\n2. = (${a} + ${b}) × ${h} ÷ 2\n3. = ${a + b} × ${h} ÷ 2 = ${area}（平方米）`,
        type: '梯形面积',
      };
    },
    // 拼图游戏
    () => {
      const base = randInt(6, 14);
      const height = randInt(4, 10);
      const area = base * height;
      return {
        content: `${RABBIT}把两个完全一样的三角形拼成一个平行四边形，每个三角形底${base}厘米、高${height}厘米。拼成的平行四边形面积是多少？每个三角形面积呢？`,
        answer: `平行四边形${area}平方厘米，三角形${area / 2}平方厘米`,
        solution: `1. 平行四边形面积 = 底 × 高 = ${base} × ${height} = ${area}（平方厘米）\n2. 每个三角形 = 平行四边形 ÷ 2 = ${area} ÷ 2 = ${area / 2}（平方厘米）`,
        type: '拼图游戏',
      };
    },
    // 花坛面积
    () => {
      const a = randInt(3, 8);
      const b = randInt(a + 3, 15);
      const h = randInt(4, 10);
      const area = ((a + b) * h) / 2;
      return {
        content: `学校门口的梯形花坛，上底${a}米，下底${b}米，高${h}米，每平方米种${randInt(2, 5)}株花，一共可以种多少株花？`,
        answer: `${area * randInt(2, 5)}株`,
        solution: `1. 花坛面积 = (${a} + ${b}) × ${h} ÷ 2 = ${area}（平方米）\n2. 根据每平方米种花数计算总数`,
        type: '花坛面积',
      };
    },
    // 地砖计算
    () => {
      const base = randInt(8, 16);
      const height = randInt(5, 12);
      const area = base * height;
      const tilePrice = randInt(10, 30);
      return {
        content: `一块平行四边形地面，底${base}米，高${height}米。铺地砖每平方米${tilePrice}元，铺完需要多少钱？`,
        answer: `${area * tilePrice}元`,
        solution: `1. 面积 = ${base} × ${height} = ${area}（平方米）\n2. 每平方米${tilePrice}元\n3. 总费用 = ${area} × ${tilePrice} = ${area * tilePrice}（元）`,
        type: '地砖计算',
      };
    },
    // 旗帜面积
    () => {
      const base = randInt(6, 14);
      const height = randInt(4, 10);
      return {
        content: `一面三角形小旗，底${base}厘米，高${height}厘米，面积是多少平方厘米？`,
        answer: `${(base * height) / 2}平方厘米`,
        solution: `1. 三角形面积 = 底 × 高 ÷ 2\n2. = ${base} × ${height} ÷ 2 = ${(base * height) / 2}（平方厘米）`,
        type: '旗帜面积',
      };
    },
    // 园地面积
    () => {
      const base = randInt(6, 12);
      const height = randInt(4, 8);
      const area = base * height;
      const price = randInt(5, 15);
      return {
        content: `${FROG}的平行四边形菜园底${base}米，高${height}米，每平方米收蔬菜${price}千克，这块园地共产蔬菜多少千克？`,
        answer: `${area * price}千克`,
        solution: `1. 面积 = ${base} × ${height} = ${area}（平方米）\n2. 每平方米产${price}千克\n3. 总产 = ${area} × ${price} = ${area * price}（千克）`,
        type: '园地面积',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十六章应用题：统计（8个模板） ============

export function genAppCh16() {
  const templates = [
    // 气温统计
    () => {
      const temps = Array.from({ length: 7 }, () => randInt(15, 38));
      const sum = temps.reduce((a, b) => a + b, 0);
      const avg = (sum / 7).toFixed(1);
      const max = Math.max(...temps);
      const min = Math.min(...temps);
      return {
        content: `${PENGUIN}记录了一周7天的气温：${temps.join('℃、')}℃。平均气温是多少℃？最高温和最低温相差多少℃？`,
        answer: `平均${avg}℃，温差${max - min}℃`,
        solution: `1. 气温：${temps.join('、')}℃\n2. 总和 = ${temps.join('+')} = ${sum}（℃）\n3. 平均 = ${sum} ÷ 7 = ${avg}（℃）\n4. 最高${max}℃，最低${min}℃\n5. 温差 = ${max} - ${min} = ${max - min}（℃）`,
        type: '气温统计',
      };
    },
    // 成绩统计
    () => {
      const n = randInt(4, 6);
      const scores = Array.from({ length: n }, () => randInt(65, 100));
      const sum = scores.reduce((a, b) => a + b, 0);
      const avg = (sum / n).toFixed(1);
      const labels = ['周一', '周二', '周三', '周四', '周五', '周六'].slice(0, n);
      return {
        content: `${BEAR}统计了${n}次测试成绩：${scores.map((s, i) => labels[i] + s + '分').join('、')}。平均分是多少？`,
        answer: `${avg}分`,
        solution: `1. 总分 = ${scores.join('+')} = ${sum}（分）\n2. 次数 = ${n}\n3. 平均 = ${sum} ÷ ${n} = ${avg}（分）`,
        type: '成绩统计',
      };
    },
    // 运动数据
    () => {
      const vals = Array.from({ length: 5 }, () => randInt(20, 60));
      const labels = ['第1周', '第2周', '第3周', '第4周', '第5周'];
      const maxVal = Math.max(...vals);
      const minVal = Math.min(...vals);
      return {
        content: `${CAT}记录5周跑步距离（千米）：${labels.map((l, i) => l + vals[i]).join('、')}。跑得最多和最少的分别是哪周？`,
        answer: `最多：${labels[vals.indexOf(maxVal)]}（${maxVal}千米），最少：${labels[vals.indexOf(minVal)]}（${minVal}千米）`,
        solution: `1. 数据：${labels.map((l, i) => l + vals[i] + '千米').join('、')}\n2. 最多：${maxVal}千米（${labels[vals.indexOf(maxVal)]}）\n3. 最少：${minVal}千米（${labels[vals.indexOf(minVal)]}）`,
        type: '运动数据',
      };
    },
    // 消费统计
    () => {
      const months = ['1月', '2月', '3月', '4月'];
      const vals = Array.from({ length: 4 }, () => randInt(50, 200));
      const sum = vals.reduce((a, b) => a + b, 0);
      return {
        content: `${FOX}记录了4个月零花钱花费：${months.map((m, i) => m + vals[i] + '元').join('、')}。总共花了多少钱？`,
        answer: `${sum}元`,
        solution: `1. ${months.map((m, i) => m + vals[i] + '元').join('、')}\n2. 总计 = ${vals.join('+')} = ${sum}（元）`,
        type: '消费统计',
      };
    },
    // 人口统计
    () => {
      const a = randInt(1000, 3000);
      const b = randInt(1000, 3000);
      const c = randInt(1000, 3000);
      const d = randInt(1000, 3000);
      const total = a + b + c + d;
      return {
        content: `四个社区人口分别是：东区${a}人、西区${b}人、南区${c}人、北区${d}人，总人口是多少人？`,
        answer: `${total}人`,
        solution: `1. 东区${a}人\n2. 西区${b}人\n3. 南区${c}人\n4. 北区${d}人\n5. 总人口 = ${a}+${b}+${c}+${d} = ${total}（人）`,
        type: '人口统计',
      };
    },
    // 天气统计
    () => {
      const sunny = randInt(5, 15);
      const cloudy = randInt(3, 10);
      const rainy = randInt(2, 8);
      const total = sunny + cloudy + rainy;
      return {
        content: `一个月${total}天中，晴天${sunny}天、多云${cloudy}天、雨天${rainy}天。晴天占全月的几分之几？`,
        answer: `${sunny}/${total}`,
        solution: `1. 全月${total}天\n2. 晴天${sunny}天\n3. 晴天比例 = ${sunny}/${total}`,
        type: '天气统计',
      };
    },
    // 图书统计
    () => {
      const values = Array.from({ length: 5 }, () => randInt(20, 80));
      const months = ['1月', '2月', '3月', '4月', '5月'];
      const trend = values[4] > values[0] ? '上升' : values[4] < values[0] ? '下降' : '持平';
      return {
        content: `图书馆5个月借阅量：${months.map((m, i) => m + values[i] + '本').join('、')}。总体趋势是什么？`,
        answer: trend,
        solution: `1. 第1个月：${values[0]}本\n2. 第5个月：${values[4]}本\n3. ${values[4]} ${values[4] > values[0] ? '>' : '<'} ${values[0]}\n4. 总体趋势${trend}`,
        type: '图书统计',
      };
    },
    // 投票统计
    () => {
      return {
        content: `要清楚表示某地一周气温的变化情况，应该选用什么统计图？要表示各班人数的多少呢？`,
        answer: `气温变化用折线统计图，各班人数用条形统计图`,
        solution: `1. 折线统计图：能表示数量的增减变化趋势\n2. 条形统计图：能清楚地表示各项目的具体数量\n3. 气温变化看趋势 → 折线图\n4. 各班人数看多少 → 条形图`,
        type: '投票统计',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 综合应用题：跨章节知识点 ============

export function genAppMixed() {
  const templates = [
    // 大数+小数
    () => {
      const a = randInt(1000, 5000);
      const b = randInt(10, 50) / 10;
      return {
        content: `学校有${a}名学生，平均每人捐了${b.toFixed(1)}元，一共捐了多少元？`,
        answer: `${(a * b).toFixed(1)}元`,
        solution: `1. 学生人数：${a}人\n2. 平均每人捐：${b.toFixed(1)}元\n3. 总捐款 = 人数 × 平均捐款\n4. ${a} × ${b.toFixed(1)} = ${(a * b).toFixed(1)}（元）`,
        type: '综合计算',
      };
    },
    // 分数+小数
    () => {
      const d = pick([4, 5, 10]);
      const n = randInt(1, d - 1);
      const total = randInt(20, 50);
      return {
        content: `一块蛋糕重${total}千克，${CAT}吃了${n}/${d}，他吃了多少千克？`,
        answer: `${((total * n) / d).toFixed(1)}千克`,
        solution: `1. 蛋糕重${total}千克\n2. 吃了${n}/${d}\n3. 吃的重量 = 总重 × 比例\n4. ${total} × ${n}/${d} = ${((total * n) / d).toFixed(1)}（千克）`,
        type: '分数小数',
      };
    },
    // 面积+单位换算
    () => {
      const l = randInt(100, 500);
      const w = randInt(50, 200);
      const area = l * w;
      return {
        content: `一块长方形土地，长${l}米，宽${w}米，面积是多少平方米？合多少公顷？`,
        answer: `${area}平方米，合${(area / 10000).toFixed(2)}公顷`,
        solution: `1. 面积 = ${l} × ${w} = ${area}（平方米）\n2. 换算 = ${area} ÷ 10000 = ${(area / 10000).toFixed(2)}（公顷）`,
        type: '面积换算',
      };
    },
    // 重量+乘除
    () => {
      const per = randInt(3, 8);
      const count = randInt(4, 10);
      const cls = randInt(3, 6);
      return {
        content: `每箱苹果${per}千克，买了${count}箱，一共多少千克？平均分给${cls}个班，每班分到多少千克？`,
        answer: `${per * count}千克，每班${((per * count) / cls).toFixed(1)}千克`,
        solution: `1. 总重 = ${per} × ${count} = ${per * count}（千克）\n2. 平均分给${cls}个班\n3. 每班 = ${per * count} ÷ ${cls} = ${((per * count) / cls).toFixed(1)}（千克）`,
        type: '综合应用',
      };
    },
    // 容量+加减
    () => {
      const a = randInt(1, 3);
      const b = randInt(200, 800);
      const c = randInt(500, 1500);
      const total = a * 1000 + b + c;
      return {
        content: `水桶里有${a}升${b}毫升水，又倒入${c}毫升，现在有多少毫升？合多少升多少毫升？`,
        answer: `${total}毫升，合${Math.floor(total / 1000)}升${total % 1000}毫升`,
        solution: `1. 原有：${a}升${b}毫升 = ${a * 1000 + b}毫升\n2. 倒入${c}毫升\n3. 总量 = ${a * 1000 + b} + ${c} = ${total}（毫升）\n4. 换算 = ${Math.floor(total / 1000)}升${total % 1000}毫升`,
        type: '容量综合',
      };
    },
    // 速度+时间+路程
    () => {
      const speed = randInt(60, 100);
      const t1 = randInt(2, 4);
      const t2 = randInt(1, 3);
      return {
        content: `${DRAGON}一家自驾旅行，每小时${speed}千米，先开${t1}小时休息，再开${t2}小时到达。全程多少千米？`,
        answer: `${speed * (t1 + t2)}千米`,
        solution: `1. 速度${speed}千米/小时\n2. 第一段${t1}小时，第二段${t2}小时\n3. 总时间 = ${t1} + ${t2} = ${t1 + t2}（小时）\n4. 路程 = ${speed} × ${t1 + t2} = ${speed * (t1 + t2)}（千米）`,
        type: '行程问题',
      };
    },
    // 效率+逆推
    () => {
      const efficiency = randInt(10, 30);
      const time = randInt(3, 8);
      const total = efficiency * time;
      const newTime = time / 2;
      return {
        content: `一批零件共${total}个，${time}小时完成了。平均每小时做多少个？如果效率提高到2倍，需要多少小时？`,
        answer: `${efficiency}个/小时，${newTime}小时`,
        solution: `1. 效率 = ${total} ÷ ${time} = ${efficiency}（个/小时）\n2. 效率提高到2倍 = ${efficiency} × 2 = ${efficiency * 2}（个/小时）\n3. 需要时间 = ${total} ÷ ${efficiency * 2} = ${newTime}（小时）`,
        type: '效率逆推',
      };
    },
    // 图形+计算
    () => {
      const base = randInt(5, 12);
      const height = randInt(4, 8);
      const price = randInt(20, 50) / 10;
      const area = base * height;
      return {
        content: `一块平行四边形菜地，底${base}米，高${height}米，每平方米产蔬菜${price.toFixed(1)}千克，这块地共产蔬菜多少千克？`,
        answer: `${(area * price).toFixed(1)}千克`,
        solution: `1. 面积 = ${base} × ${height} = ${area}（平方米）\n2. 每平方米产${price.toFixed(1)}千克\n3. 总产量 = ${area} × ${price.toFixed(1)} = ${(area * price).toFixed(1)}（千克）`,
        type: '图形计算',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 3 };
}
