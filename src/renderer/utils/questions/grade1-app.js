// 一年级综合应用题 - 趣味角色版 🎉

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// ============ 第一章应用题：10以内的数 ============

export function genAppCh1() {
  const templates = [
    // 1. 动物数数 - 鱼
    () => {
      const a = randInt(2, 6);
      const b = randInt(2, 6);
      return {
        content: `🐱 算算猫钓了${a}条鱼，🐧 企鹅博士钓了${b}条鱼，它们一共钓了多少条鱼？`,
        answer: String(a + b),
        solution: `1. 算算猫钓了${a}条鱼\n2. 企鹅博士钓了${b}条鱼\n3. 一共钓了多少？用加法：${a} + ${b} = ${a + b}（条）`,
        type: '数数应用',
      };
    },
    // 2. 动物数数 - 青蛙
    () => {
      const a = randInt(3, 8);
      const b = randInt(1, a - 1);
      return {
        content: `🐸 小青蛙在荷叶上看到了${a}只蜻蜓，飞走了${b}只，还剩多少只？`,
        answer: String(a - b),
        solution: `1. 荷叶上有${a}只蜻蜓\n2. 飞走了${b}只\n3. 还剩多少？用减法：${a} - ${b} = ${a - b}（只）`,
        type: '数数应用',
      };
    },
    // 3. 排队数人
    () => {
      const front = randInt(2, 5);
      const back = randInt(2, 5);
      return {
        content: `🐻 小熊老师带小朋友们排队做操，小熊老师前面有${front}人，后面有${back}人，这一队一共有多少人？`,
        answer: String(front + back + 1),
        solution: `1. 前面有${front}人\n2. 后面有${back}人\n3. 小熊老师自己也要算哦！\n4. ${front} + ${back} + 1 = ${front + back + 1}（人）`,
        type: '排队应用',
      };
    },
    // 4. 分糖果
    () => {
      const total = randInt(4, 9);
      const a = randInt(1, total - 1);
      const b = total - a;
      return {
        content: `🐉 智慧龙有${total}颗糖果，分给🦊 机灵狐${a}颗，分给🐱 算算猫${b}颗，分得对吗？`,
        answer: String(a + b === total ? '对' : '不对'),
        solution: `1. 一共${total}颗糖果\n2. 机灵狐${a}颗，算算猫${b}颗\n3. 验证：${a} + ${b} = ${a + b}\n4. ${a + b === total ? '等于' + total + '，分得对！🎉' : '不等于' + total + '，分得不对哦'}`,
        type: '分配应用',
      };
    },
    // 5. 比多少
    () => {
      const a = randInt(3, 9);
      const b = randInt(1, a - 1);
      return {
        content: `🐱 算算猫有${a}颗草莓，🐸 小青蛙有${b}颗草莓，算算猫比小青蛙多多少颗？`,
        answer: String(a - b),
        solution: `1. 算算猫有${a}颗草莓\n2. 小青蛙有${b}颗草莓\n3. 多多少？用减法：${a} - ${b} = ${a - b}（颗）`,
        type: '比较应用',
      };
    },
    // 6. 摘苹果
    () => {
      const a = randInt(3, 7);
      const b = randInt(1, 5);
      return {
        content: `🐒 小猴子在果园摘了${a}个苹果，🐰 小兔子摘了${b}个苹果，它们一共摘了多少个？`,
        answer: String(a + b),
        solution: `1. 小猴子摘了${a}个苹果\n2. 小兔子摘了${b}个苹果\n3. 一共摘了多少？用加法：${a} + ${b} = ${a + b}（个）`,
        type: '摘苹果应用',
      };
    },
    // 7. 采蘑菇
    () => {
      const total = randInt(5, 10);
      const eat = randInt(1, total - 1);
      return {
        content: `🐥 小鸭子采了${total}个蘑菇，被🐛 虫子吃掉了${eat}个，还剩多少个？`,
        answer: String(total - eat),
        solution: `1. 一共采了${total}个蘑菇\n2. 虫子吃掉了${eat}个\n3. 还剩多少？用减法：${total} - ${eat} = ${total - eat}（个）`,
        type: '采蘑菇应用',
      };
    },
    // 8. 跳绳计数
    () => {
      const a = randInt(3, 6);
      const b = randInt(1, a - 1);
      return {
        content: `🐱 算算猫跳绳跳了${a}下，🐉 智慧龙比它少跳了${b}下，智慧龙跳了多少下？`,
        answer: String(a - b),
        solution: `1. 算算猫跳了${a}下\n2. 智慧龙比它少${b}下\n3. 用减法：${a} - ${b} = ${a - b}（下）`,
        type: '跳绳应用',
      };
    },
    // 9. 收集贴纸
    () => {
      const a = randInt(2, 5);
      const b = randInt(2, 5);
      const c = randInt(1, 3);
      return {
        content: `🦊 机灵狐收集了${a}张贴纸，🐧 企鹅博士收集了${b}张，🦉 猫头鹰收集了${c}张，三人一共收集了多少张？`,
        answer: String(a + b + c),
        solution: `1. 机灵狐${a}张\n2. 企鹅博士${b}张\n3. 猫头鹰${c}张\n4. 一共 = ${a} + ${b} + ${c} = ${a + b + c}（张）`,
        type: '收集应用',
      };
    },
    // 10. 喂动物
    () => {
      const total = randInt(5, 10);
      const fed = randInt(2, total - 1);
      return {
        content: `🐻 小熊老师带了${total}根胡萝卜去喂🐰 小兔子，喂了${fed}根，还剩多少根？`,
        answer: String(total - fed),
        solution: `1. 带了${total}根胡萝卜\n2. 喂了${fed}根\n3. 还剩多少？用减法：${total} - ${fed} = ${total - fed}（根）`,
        type: '喂动物应用',
      };
    },
    // 11. 钓鱼
    () => {
      const a = randInt(2, 5);
      const b = randInt(1, a);
      return {
        content: `🐟 小金鱼池塘里有${a}条红色金鱼和${b}条金色金鱼，一共有多少条金鱼？`,
        answer: String(a + b),
        solution: `1. 红色金鱼${a}条\n2. 金色金鱼${b}条\n3. 一共多少条？用加法：${a} + ${b} = ${a + b}（条）`,
        type: '钓鱼应用',
      };
    },
    // 12. 吃草莓
    () => {
      const total = randInt(5, 10);
      const eat = randInt(1, total - 2);
      const left = total - eat;
      return {
        content: `🐱 算算猫有${total}颗草莓，吃了${eat}颗后，🦊 机灵狐又送来了2颗，现在有多少颗？`,
        answer: String(left + 2),
        solution: `1. 原来有${total}颗草莓\n2. 吃了${eat}颗：${total} - ${eat} = ${left}（颗）\n3. 机灵狐送来2颗：${left} + 2 = ${left + 2}（颗）`,
        type: '吃草莓应用',
      };
    },
    // 13. 种花
    () => {
      const a = randInt(3, 6);
      const b = randInt(1, 4);
      return {
        content: `🌸 企鹅博士种了${a}朵花，小青蛙种了${b}朵花，谁种得多？多几朵？`,
        answer: a >= b ? `企鹅博士多${a - b}朵` : `小青蛙多${b - a}朵`,
        solution: `1. 企鹅博士种了${a}朵\n2. 小青蛙种了${b}朵\n3. 比较：${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（朵）\n4. ${a >= b ? '企鹅博士' : '小青蛙'}多${Math.abs(a - b)}朵`,
        type: '种花应用',
      };
    },
    // 14. 拍球计数
    () => {
      const a = randInt(3, 7);
      const b = randInt(1, 3);
      return {
        content: `🐱 算算猫拍球拍了${a}下，🐸 小青蛙再拍${b}下就和算算猫一样多了，小青蛙拍了多少下？`,
        answer: String(a - b),
        solution: `1. 算算猫拍了${a}下\n2. 小青蛙再拍${b}下就一样多\n3. 小青蛙拍了：${a} - ${b} = ${a - b}（下）`,
        type: '拍球应用',
      };
    },
    // 15. 吃饼干
    () => {
      const a = randInt(3, 6);
      const b = randInt(2, 5);
      return {
        content: `🐱 算算猫有${a}块饼干，🐉 智慧龙有${b}块饼干，把它们的饼干放在一起有多少块？`,
        answer: String(a + b),
        solution: `1. 算算猫有${a}块饼干\n2. 智慧龙有${b}块饼干\n3. 放在一起 = ${a} + ${b} = ${a + b}（块）`,
        type: '吃饼干应用',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第二章应用题：10以内加减法 ============

export function genAppCh2() {
  const templates = [
    // 1. 文具店购物 - 铅笔和橡皮
    () => {
      const pencil = randInt(1, 5);
      const eraser = randInt(1, 5);
      return {
        content: `🦊 机灵狐去文具店，买了一支铅笔花了${pencil}角，买了一块橡皮花了${eraser}角，一共花了多少钱？`,
        answer: String(pencil + eraser) + '角',
        solution: `1. 铅笔${pencil}角\n2. 橡皮${eraser}角\n3. 一共花了多少？用加法：${pencil} + ${eraser} = ${pencil + eraser}（角）`,
        type: '购物应用',
      };
    },
    // 2. 花园种花
    () => {
      const red = randInt(2, 5);
      const yellow = randInt(1, 5);
      return {
        content: `🌸 企鹅博士的花园里种了${red}朵红花和${yellow}朵黄花，一共种了多少朵花？`,
        answer: String(red + yellow),
        solution: `1. 红花${red}朵\n2. 黄花${yellow}朵\n3. 一共多少朵？用加法：${red} + ${yellow} = ${red + yellow}（朵）`,
        type: '种花应用',
      };
    },
    // 3. 图书馆看书
    () => {
      const total = randInt(6, 10);
      const read = randInt(2, total - 1);
      return {
        content: `🦉 猫头鹰从图书馆借了一本${total}页的故事书，已经看了${read}页，还要看多少页？`,
        answer: String(total - read),
        solution: `1. 故事书有${total}页\n2. 已经看了${read}页\n3. 还要看多少？用减法：${total} - ${read} = ${total - read}（页）`,
        type: '看书应用',
      };
    },
    // 4. 农场动物
    () => {
      const chicken = randInt(2, 5);
      const duck = randInt(1, 5);
      const rabbit = randInt(1, 3);
      return {
        content: `🐻 小熊老师的农场里有${chicken}只鸡、${duck}只鸭和${rabbit}只兔子，农场里一共有多少只动物？`,
        answer: String(chicken + duck + rabbit),
        solution: `1. 鸡有${chicken}只\n2. 鸭有${duck}只\n3. 兔子有${rabbit}只\n4. 一共 = ${chicken} + ${duck} + ${rabbit} = ${chicken + duck + rabbit}（只）`,
        type: '农场应用',
      };
    },
    // 5. 气球飞走了
    () => {
      const total = randInt(6, 10);
      const fly = randInt(1, total - 2);
      return {
        content: `🐱 算算猫买了${total}个气球，被风吹走了${fly}个，还剩多少个？`,
        answer: String(total - fly),
        solution: `1. 原来有${total}个气球\n2. 吹走了${fly}个\n3. 还剩多少？用减法：${total} - ${fly} = ${total - fly}（个）`,
        type: '气球应用',
      };
    },
    // 6. 做手工/折纸
    () => {
      const a = randInt(2, 5);
      const b = randInt(1, 4);
      return {
        content: `🦊 机灵狐折了${a}只纸飞机，🐥 小鸭子折了${b}只纸飞机，他们一共折了多少只？`,
        answer: String(a + b),
        solution: `1. 机灵狐折了${a}只\n2. 小鸭子折了${b}只\n3. 一共多少只？用加法：${a} + ${b} = ${a + b}（只）`,
        type: '做手工应用',
      };
    },
    // 7. 喝牛奶
    () => {
      const total = randInt(5, 9);
      const drink = randInt(1, total - 1);
      return {
        content: `🐻 小熊老师倒了${total}杯牛奶给小朋友们，喝掉了${drink}杯，还剩多少杯？`,
        answer: String(total - drink),
        solution: `1. 倒了${total}杯牛奶\n2. 喝掉了${drink}杯\n3. 还剩多少？用减法：${total} - ${drink} = ${total - drink}（杯）`,
        type: '喝牛奶应用',
      };
    },
    // 8. 整理房间 - 数玩具
    () => {
      const car = randInt(2, 4);
      const doll = randInt(1, 4);
      const ball = randInt(1, 3);
      return {
        content: `🐱 算算猫整理房间，找到${car}辆小汽车、${doll}个布娃娃和${ball}个皮球，一共有多少个玩具？`,
        answer: String(car + doll + ball),
        solution: `1. 小汽车${car}辆\n2. 布娃娃${doll}个\n3. 皮球${ball}个\n4. 一共 = ${car} + ${doll} + ${ball} = ${car + doll + ball}（个）`,
        type: '整理房间应用',
      };
    },
    // 9. 分水果
    () => {
      const total = randInt(6, 10);
      const a = randInt(2, total - 2);
      const b = total - a;
      return {
        content: `🐉 智慧龙有${total}个橘子，分给🐧 企鹅博士${a}个，剩下的给自己，智慧龙有多少个橘子？`,
        answer: String(b),
        solution: `1. 一共有${total}个橘子\n2. 分给企鹅博士${a}个\n3. 剩下的 = ${total} - ${a} = ${b}（个）`,
        type: '分水果应用',
      };
    },
    // 10. 排队坐车
    () => {
      const on = randInt(3, 7);
      const off = randInt(1, on - 1);
      const up = randInt(1, 4);
      return {
        content: `🚌 校车上原来有${on}个小朋友，到站后${off}个小朋友下车，又有${up}个小朋友上车，现在车上有多少人？`,
        answer: String(on - off + up),
        solution: `1. 原来有${on}个小朋友\n2. 下车${off}个：${on} - ${off} = ${on - off}（人）\n3. 上车${up}个：${on - off} + ${up} = ${on - off + up}（人）`,
        type: '排队坐车应用',
      };
    },
    // 11. 超市买贴纸
    () => {
      const a = randInt(2, 5);
      const b = randInt(1, 3);
      return {
        content: `🦊 机灵狐在超市买了${a}张星星贴纸和${b}张爱心贴纸，一共买了多少张贴纸？`,
        answer: String(a + b),
        solution: `1. 星星贴纸${a}张\n2. 爱心贴纸${b}张\n3. 一共多少张？用加法：${a} + ${b} = ${a + b}（张）`,
        type: '买贴纸应用',
      };
    },
    // 12. 吃糖果
    () => {
      const total = randInt(5, 10);
      const eat1 = randInt(1, 3);
      const eat2 = randInt(1, 3);
      if (eat1 + eat2 >= total) return genAppCh2();
      return {
        content: `🐱 算算猫有${total}颗糖果，上午吃了${eat1}颗，下午吃了${eat2}颗，还剩多少颗？`,
        answer: String(total - eat1 - eat2),
        solution: `1. 一共有${total}颗糖果\n2. 上午吃了${eat1}颗\n3. 下午吃了${eat2}颗\n4. 还剩 = ${total} - ${eat1} - ${eat2} = ${total - eat1 - eat2}（颗）`,
        type: '吃糖果应用',
      };
    },
    // 13. 超市买零食
    () => {
      const cookie = randInt(1, 4);
      const candy = randInt(1, 4);
      return {
        content: `🐧 企鹅博士在超市买了${cookie}包饼干和${candy}盒牛奶，一共买了多少样东西？`,
        answer: String(cookie + candy),
        solution: `1. 饼干${cookie}包\n2. 牛奶${candy}盒\n3. 一共多少样？用加法：${cookie} + ${candy} = ${cookie + candy}（样）`,
        type: '买零食应用',
      };
    },
    // 14. 收集邮票
    () => {
      const a = randInt(3, 6);
      const b = randInt(1, a);
      return {
        content: `🦉 猫头鹰收集了${a}张邮票，送给🐥 小鸭子${b}张，猫头鹰还剩多少张？`,
        answer: String(a - b),
        solution: `1. 猫头鹰有${a}张邮票\n2. 送出去${b}张\n3. 还剩多少？用减法：${a} - ${b} = ${a - b}（张）`,
        type: '收集邮票应用',
      };
    },
    // 15. 折星星比赛
    () => {
      const a = randInt(4, 8);
      const b = randInt(2, 6);
      return {
        content: `🐱 算算猫和🐉 智慧龙比赛折星星，算算猫折了${a}颗，智慧龙折了${b}颗，谁折得多？多几颗？`,
        answer: a >= b ? `算算猫多${a - b}颗` : `智慧龙多${b - a}颗`,
        solution: `1. 算算猫折了${a}颗\n2. 智慧龙折了${b}颗\n3. 比较：${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（颗）\n4. ${a >= b ? '算算猫' : '智慧龙'}多${Math.abs(a - b)}颗！`,
        type: '折星星应用',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第三章应用题：20以内加减法 ============

export function genAppCh3() {
  const templates = [
    // 1. 跳绳比赛
    () => {
      const a = randInt(8, 16);
      const b = randInt(3, 12);
      return {
        content: `🐱 算算猫跳绳跳了${a}下，🐸 小青蛙跳了${b}下，它们一共跳了多少下？`,
        answer: String(a + b),
        solution: `1. 算算猫跳了${a}下\n2. 小青蛙跳了${b}下\n3. 一共跳了多少？用加法：${a} + ${b} = ${a + b}（下）`,
        type: '跳绳应用',
      };
    },
    // 2. 做练习题
    () => {
      const total = randInt(12, 20);
      const done = randInt(5, total - 3);
      return {
        content: `🐉 智慧龙要做${total}道练习题，已经做了${done}道，还要做多少道？`,
        answer: String(total - done),
        solution: `1. 一共要做${total}道题\n2. 已经做了${done}道\n3. 还要做多少？用减法：${total} - ${done} = ${total - done}（道）`,
        type: '做题应用',
      };
    },
    // 3. 公交车上下车
    () => {
      const on = randInt(6, 12);
      const off = randInt(2, 5);
      const up = randInt(2, 6);
      return {
        content: `🚌 公交车上有${on}人，到站后${off}人下车，又有${up}人上车，现在车上有多少人？`,
        answer: String(on - off + up),
        solution: `1. 原来有${on}人\n2. 下车${off}人：${on} - ${off} = ${on - off}（人）\n3. 上车${up}人：${on - off} + ${up} = ${on - off + up}（人）`,
        type: '公交车应用',
      };
    },
    // 4. 借书还书
    () => {
      const total = randInt(12, 20);
      const lend = randInt(4, total - 3);
      const back = randInt(1, lend);
      return {
        content: `📚 图书馆有${total}本故事书，借出了${lend}本，后来还回来${back}本，现在图书馆有多少本？`,
        answer: String(total - lend + back),
        solution: `1. 原来有${total}本\n2. 借出${lend}本：${total} - ${lend} = ${total - lend}（本）\n3. 还回来${back}本：${total - lend} + ${back} = ${total - lend + back}（本）`,
        type: '借书应用',
      };
    },
    // 5. 买玩具
    () => {
      const price = randInt(8, 15);
      const pay = price + randInt(1, 5);
      return {
        content: `🧸 玩具店里一个小熊玩偶${price}元，🦊 机灵狐付了${pay}元，应该找回多少元？`,
        answer: String(pay - price) + '元',
        solution: `1. 小熊玩偶${price}元\n2. 机灵狐付了${pay}元\n3. 找回 = ${pay} - ${price} = ${pay - price}（元）`,
        type: '买东西应用',
      };
    },
    // 6. 采草莓
    () => {
      const a = randInt(6, 12);
      const b = randInt(3, 10);
      return {
        content: `🍓 算算猫和企鹅博士去采草莓，算算猫采了${a}颗，企鹅博士采了${b}颗，谁采得多？多几颗？`,
        answer: a >= b ? `算算猫多${a - b}颗` : `企鹅博士多${b - a}颗`,
        solution: `1. 算算猫采了${a}颗\n2. 企鹅博士采了${b}颗\n3. 比较：${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（颗）\n4. ${a >= b ? '算算猫' : '企鹅博士'}多${Math.abs(a - b)}颗`,
        type: '采草莓应用',
      };
    },
    // 7. 喂小动物
    () => {
      const total = randInt(10, 18);
      const feed = randInt(3, 8);
      return {
        content: `🥕 小熊老师带了${total}根胡萝卜去农场，喂了🐰 小兔子${feed}根，还剩多少根？`,
        answer: String(total - feed),
        solution: `1. 一共带了${total}根胡萝卜\n2. 喂了${feed}根\n3. 还剩多少？用减法：${total} - ${feed} = ${total - feed}（根）`,
        type: '喂动物应用',
      };
    },
    // 8. 折千纸鹤
    () => {
      const a = randInt(5, 10);
      const b = randInt(3, 8);
      return {
        content: `🦢 算算猫折了${a}只千纸鹤，智慧龙折了${b}只千纸鹤，把它们串在一起，一共有多少只？`,
        answer: String(a + b),
        solution: `1. 算算猫折了${a}只\n2. 智慧龙折了${b}只\n3. 一共多少只？用加法：${a} + ${b} = ${a + b}（只）`,
        type: '折纸应用',
      };
    },
    // 9. 看动画片时间
    () => {
      const start = randInt(6, 14);
      const duration = randInt(1, 3);
      const end = start + duration;
      if (end > 20) return genAppCh3();
      return {
        content: `📺 算算猫${start}时开始看动画片，看了${duration}小时，几时看完？`,
        answer: `${end}时`,
        solution: `1. 开始时间：${start}时\n2. 看了${duration}小时\n3. 结束时间 = ${start} + ${duration} = ${end}（时）`,
        type: '看动画应用',
      };
    },
    // 10. 收集卡片
    () => {
      const have = randInt(6, 12);
      const gain = randInt(3, 8);
      const lose = randInt(1, 3);
      if (lose > have) return genAppCh3();
      return {
        content: `🃏 机灵狐有${have}张奥特曼卡片，又买了${gain}张，送给小猴子${lose}张，现在有多少张？`,
        answer: String(have + gain - lose),
        solution: `1. 原来有${have}张\n2. 又买了${gain}张：${have} + ${gain} = ${have + gain}（张）\n3. 送出去${lose}张：${have + gain} - ${lose} = ${have + gain - lose}（张）`,
        type: '收集卡片应用',
      };
    },
    // 11. 植树
    () => {
      const a = randInt(5, 10);
      const b = randInt(3, 8);
      return {
        content: `🌳 企鹅博士种了${a}棵树，小青蛙种了${b}棵树，它们一共种了多少棵树？`,
        answer: String(a + b),
        solution: `1. 企鹅博士种了${a}棵\n2. 小青蛙种了${b}棵\n3. 一共种了多少棵？用加法：${a} + ${b} = ${a + b}（棵）`,
        type: '植树应用',
      };
    },
    // 12. 打扫卫生
    () => {
      const sweep = randInt(4, 10);
      const wipe = randInt(3, 8);
      return {
        content: `🧹 小熊老师让小朋友们打扫卫生，${sweep}个小朋友扫地，${wipe}个小朋友擦桌子，一共有多少个小朋友在打扫？`,
        answer: String(sweep + wipe),
        solution: `1. 扫地的${sweep}个\n2. 擦桌子的${wipe}个\n3. 一共多少个？用加法：${sweep} + ${wipe} = ${sweep + wipe}（个）`,
        type: '打扫卫生应用',
      };
    },
    // 13. 分组比赛
    () => {
      const total = randInt(12, 20);
      const a = randInt(5, total - 5);
      const b = total - a;
      return {
        content: `🏆 ${total}个小朋友分成两组比赛，第一组有${a}人，第二组有多少人？`,
        answer: String(b) + '人',
        solution: `1. 一共有${total}个小朋友\n2. 第一组有${a}人\n3. 第二组有多少？用减法：${total} - ${a} = ${b}（人）`,
        type: '分组应用',
      };
    },
    // 14. 起床时间计算
    () => {
      const wake = randInt(6, 8);
      const leave = wake + randInt(1, 2);
      return {
        content: `⏰ 算算猫${wake}时起床，用了1小时吃早餐和穿衣，几时出门上学？`,
        answer: `${leave}时`,
        solution: `1. 起床时间：${wake}时\n2. 用了1小时准备\n3. 出门时间 = ${wake} + 1 = ${leave}（时）`,
        type: '时间应用',
      };
    },
    // 15. 游乐园排队
    () => {
      const front = randInt(5, 12);
      const behind = randInt(3, 8);
      return {
        content: `🎢 企鹅博士去游乐园排过山车，前面有${front}人，后面有${behind}人，这一队一共有多少人？`,
        answer: String(front + behind + 1),
        solution: `1. 前面有${front}人\n2. 后面有${behind}人\n3. 企鹅博士自己也要算！\n4. ${front} + ${behind} + 1 = ${front + behind + 1}（人）`,
        type: '游乐园应用',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第四章应用题：认识图形 ============

export function genAppCh4() {
  const templates = [
    // 1. 图形计数
    () => {
      const squares = randInt(1, 5);
      const triangles = randInt(1, 5);
      const circles = randInt(1, 4);
      return {
        content: `🐱 算算猫画了${squares}个正方形、${triangles}个三角形和${circles}个圆，一共画了多少个图形？`,
        answer: String(squares + triangles + circles),
        solution: `1. 正方形${squares}个\n2. 三角形${triangles}个\n3. 圆${circles}个\n4. 一共 = ${squares} + ${triangles} + ${circles} = ${squares + triangles + circles}（个）`,
        type: '图形计数',
      };
    },
    // 2. 拼图游戏
    () => {
      const n = randInt(2, 4);
      return {
        content: `🧩 机灵狐用${n}个三角形拼成了一个大图形，每个三角形有3条边，这${n}个三角形一共有多少条边？`,
        answer: `${n * 3}条边`,
        solution: `1. 每个三角形有3条边\n2. 有${n}个三角形\n3. 总边数 = ${n} × 3 = ${n * 3}（条）`,
        type: '拼图应用',
      };
    },
    // 3. 积木搭建
    () => {
      const cubes = randInt(3, 8);
      const balls = randInt(2, 5);
      return {
        content: `🧱 智慧龙用${cubes}块正方体积木和${balls}个球搭了一个城堡，一共用了多少个积木？`,
        answer: String(cubes + balls),
        solution: `1. 正方体积木${cubes}块\n2. 球${balls}个\n3. 一共多少个？用加法：${cubes} + ${balls} = ${cubes + balls}（个）`,
        type: '积木应用',
      };
    },
    // 4. 图形分类
    () => {
      const red = randInt(2, 5);
      const blue = randInt(1, 4);
      const total = red + blue;
      return {
        content: `🎨 企鹅博士有一堆三角形积木，其中${red}个是红色的，${blue}个是蓝色的，一共有多少个三角形？`,
        answer: String(total) + '个',
        solution: `1. 红色三角形${red}个\n2. 蓝色三角形${blue}个\n3. 一共 = ${red} + ${blue} = ${total}（个）`,
        type: '图形分类',
      };
    },
    // 5. 找图形
    () => {
      const sq = randInt(3, 6);
      const tri = randInt(1, sq - 1);
      return {
        content: `🔍 小青蛙在一张图中找到了${sq}个正方形和${tri}个三角形，正方形比三角形多几个？`,
        answer: String(sq - tri) + '个',
        solution: `1. 正方形${sq}个\n2. 三角形${tri}个\n3. 多几个？用减法：${sq} - ${tri} = ${sq - tri}（个）`,
        type: '找图形应用',
      };
    },
    // 6. 图形特征问答
    () => {
      const questions = [
        {
          content: `🦉 猫头鹰问：正方形有几条边？`,
          answer: '4',
          solution: '1. 正方形的特征：4条边都相等\n2. 所以正方形有4条边',
          type: '图形特征',
        },
        {
          content: `🦉 猫头鹰问：三角形有几个角？`,
          answer: '3',
          solution: '1. 三角形有3个顶点\n2. 每个顶点对应一个角\n3. 所以三角形有3个角',
          type: '图形特征',
        },
        {
          content: `🦉 猫头鹰问：圆有几条边？`,
          answer: '0',
          solution: '1. 圆是一条弯曲的线\n2. 没有直的边\n3. 所以圆有0条直边',
          type: '图形特征',
        },
        {
          content: `🦉 猫头鹰问：长方形有几个角？`,
          answer: '4',
          solution: '1. 长方形有4条边\n2. 每两条相邻的边形成一个角\n3. 所以长方形有4个角',
          type: '图形特征',
        },
      ];
      return { ...pick(questions), type: '图形特征' };
    },
    // 7. 用图形画画
    () => {
      const circle = randInt(2, 5);
      const tri = randInt(1, 4);
      return {
        content: `🎨 小鸭子画了一幅画，用了${circle}个圆形做太阳和花朵，用了${tri}个三角形做山，一共用了多少个图形？`,
        answer: String(circle + tri) + '个',
        solution: `1. 圆形${circle}个（太阳和花朵）\n2. 三角形${tri}个（山）\n3. 一共 = ${circle} + ${tri} = ${circle + tri}（个）`,
        type: '用图形画画',
      };
    },
    // 8. 图形排列规律
    () => {
      return {
        content: `🔴🔵🔺🔴🔵🔺🔴🔵❓ 算算猫按规律摆图形，"❓"处应该摆什么图形？`,
        answer: '三角形',
        solution: `1. 观察规律：🔴🔵🔺 重复出现\n2. 🔴🔴🔵🔺🔴🔵🔺🔴🔵\n3. 🔵后面是🔺\n4. 所以❓处是三角形🔺`,
        type: '图形排列',
      };
    },
    // 9. 图形比较
    () => {
      return {
        content: `🐻 小熊老师问：正方形和长方形都有4条边，但正方形的4条边都相等。长方形的4条边都相等吗？`,
        answer: '不相等',
        solution: `1. 正方形：4条边都相等 ✓\n2. 长方形：对边相等，邻边不等\n3. 所以长方形的4条边不都相等`,
        type: '图形比较',
      };
    },
    // 10. 图形组合
    () => {
      const n = randInt(2, 4);
      const totalSides = n * 3;
      const shared = (n - 1) * 2;
      const outside = totalSides - shared;
      return {
        content: `🧩 机灵狐用${n}个三角形拼成了一排，每个三角形有3条边，但相邻的三角形共用边。外面露出来的边有几条？`,
        answer: `${outside}条`,
        solution: `1. ${n}个三角形，每个3条边\n2. 相邻的三角形共用2条边（${n}个三角形有${n - 1}个连接处）\n3. 外面的边 = ${totalSides} - ${shared} = ${outside}（条）`,
        type: '图形组合',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第五章应用题：位置 ============

export function genAppCh5() {
  const templates = [
    // 1. 教室座位
    () => {
      const names = ['算算猫', '智慧龙', '企鹅博士'];
      const emojis = ['🐱', '🐉', '🐧'];
      const pos = randInt(0, 2);
      const other1 = (pos + 1) % 3;
      const other2 = (pos + 2) % 3;
      return {
        content: `${emojis[pos]} ${names[pos]}坐在${emojis[other1]} ${names[other1]}的左边，${names[other1]}坐在${emojis[other2]} ${names[other2]}的左边。从左到右的顺序是什么？`,
        answer: `${names[pos]}→${names[other1]}→${names[other2]}`,
        solution: `1. ${names[pos]}在${names[other1]}的左边\n2. ${names[other1]}在${names[other2]}的左边\n3. 从左到右：${names[pos]}→${names[other1]}→${names[other2]}`,
        type: '位置应用',
      };
    },
    // 2. 排队位置
    () => {
      const total = randInt(5, 10);
      const pos = randInt(2, total - 1);
      return {
        content: `🏃 小朋友们排成一队，从前数🐱 算算猫排第${pos}，这一队一共有${total}个小朋友，从后数算算猫排第几？`,
        answer: `第${total - pos + 1}`,
        solution: `1. 从前数排第${pos}\n2. 一共有${total}人\n3. 从后数 = ${total} - ${pos} + 1 = ${total - pos + 1}\n4. 所以从后数排第${total - pos + 1}`,
        type: '排队位置',
      };
    },
    // 3. 书桌物品位置
    () => {
      return {
        content: `📖 书桌上，铅笔盒在书的左边，橡皮在铅笔盒的左边。从左到右的顺序是什么？`,
        answer: '橡皮→铅笔盒→书',
        solution: `1. 铅笔盒在书的左边\n2. 橡皮在铅笔盒的左边\n3. 从左到右：橡皮→铅笔盒→书`,
        type: '位置应用',
      };
    },
    // 4. 图片中位置
    () => {
      return {
        content: `🏠 一张图片中，🐱 算算猫在房子的前面，🌳 大树在房子的后面，🐥 小鸭子在大树的后面。谁在最后面？`,
        answer: '小鸭子',
        solution: `1. 算算猫在房子前面\n2. 大树在房子后面\n3. 小鸭子在大树后面\n4. 顺序：算算猫→房子→大树→小鸭子\n5. 小鸭子在最后面`,
        type: '位置应用',
      };
    },
    // 5. 家具位置
    () => {
      return {
        content: `🛏️ 机灵狐的房间里，床在窗户的下面，台灯在床头柜的上面，床头柜在床的右边。台灯在哪？`,
        answer: '在床头柜上面',
        solution: `1. 床在窗户下面\n2. 床头柜在床右边\n3. 台灯在床头柜上面\n4. 所以台灯在床右边的床头柜上面`,
        type: '位置应用',
      };
    },
    // 6. 动物园位置
    () => {
      const animals = ['🐼 大熊猫馆', '🦁 狮子馆', '🐘 大象馆'];
      return {
        content: `动物园里，${animals[0]}在${animals[1]}的左边，${animals[2]}在${animals[1]}的右边。谁在最右边？`,
        answer: '大象馆',
        solution: `1. 大熊猫馆在狮子馆左边\n2. 大象馆在狮子馆右边\n3. 从左到右：大熊猫馆→狮子馆→大象馆\n4. 大象馆在最右边`,
        type: '位置应用',
      };
    },
    // 7. 操场位置
    () => {
      const a = randInt(3, 8);
      const b = randInt(a + 1, 12);
      return {
        content: `🏃 操场上，🐧 企鹅博士站在第${a}号位置，🦊 机灵狐站在第${b}号位置，谁站在更前面（号码小）？`,
        answer: '企鹅博士',
        solution: `1. 企鹅博士在第${a}号\n2. 机灵狐在第${b}号\n3. ${a} < ${b}，号码小的在前面\n4. 企鹅博士在更前面`,
        type: '位置应用',
      };
    },
    // 8. 家里房间位置
    () => {
      return {
        content: `🏠 算算猫家有3层楼，卧室在厨房的上面，厨房在车库的上面。卧室在第几层？（车库在第1层）`,
        answer: '第3层',
        solution: `1. 车库在第1层\n2. 厨房在车库上面 → 厨房在第2层\n3. 卧室在厨房上面 → 卧室在第3层\n4. 所以卧室在第3层`,
        type: '位置应用',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第六章应用题：认识人民币 ============

export function genAppCh6() {
  const templates = [
    // 1. 文具店购物
    () => {
      const pencil = randInt(1, 3);
      const book = randInt(2, 5);
      const total = pencil + book;
      return {
        content: `✏️ 机灵狐去文具店，铅笔${pencil}元，笔记本${book}元，一共要花多少钱？`,
        answer: `${total}元`,
        solution: `1. 铅笔${pencil}元\n2. 笔记本${book}元\n3. 一共 = ${pencil} + ${book} = ${total}（元）`,
        type: '购物应用',
      };
    },
    // 2. 超市买零食
    () => {
      const cookie = randInt(2, 5);
      const milk = randInt(1, 3);
      return {
        content: `🍪 算算猫去超市买了一包饼干${cookie}元和一盒牛奶${milk}元，一共花了多少钱？`,
        answer: `${cookie + milk}元`,
        solution: `1. 饼干${cookie}元\n2. 牛奶${milk}元\n3. 一共 = ${cookie} + ${milk} = ${cookie + milk}（元）`,
        type: '购物应用',
      };
    },
    // 3. 水果店买水果
    () => {
      const apple = randInt(1, 4);
      const banana = randInt(1, 3);
      const pay = apple + banana + randInt(1, 3);
      return {
        content: `🍎 企鹅博士去水果店，苹果${apple}元，香蕉${banana}元，付了${pay}元，应找回多少元？`,
        answer: `${pay - apple - banana}元`,
        solution: `1. 苹果${apple}元，香蕉${banana}元\n2. 总价 = ${apple} + ${banana} = ${apple + banana}（元）\n3. 付了${pay}元\n4. 找回 = ${pay} - ${apple + banana} = ${pay - apple - banana}（元）`,
        type: '买水果应用',
      };
    },
    // 4. 玩具店买玩具
    () => {
      const toy1 = randInt(3, 8);
      const toy2 = randInt(2, 6);
      if (toy1 + toy2 > 15) return genAppCh6();
      return {
        content: `🧸 小熊老师带了${toy1 + toy2}元去玩具店，买了一辆小汽车${toy1}元，剩下的钱刚好买了一个布娃娃。布娃娃多少钱？`,
        answer: `${toy2}元`,
        solution: `1. 一共带了${toy1 + toy2}元\n2. 小汽车${toy1}元\n3. 布娃娃 = ${toy1 + toy2} - ${toy1} = ${toy2}（元）`,
        type: '买玩具应用',
      };
    },
    // 5. 找零钱
    () => {
      const price = randInt(2, 7);
      const pay = price + randInt(1, 5);
      return {
        content: `💰 小猴子买了一本书${price}元，付了${pay}元，售货员应该找回多少元？`,
        answer: `${pay - price}元`,
        solution: `1. 书的价格：${price}元\n2. 付了${pay}元\n3. 找回 = ${pay} - ${price} = ${pay - price}（元）`,
        type: '找零应用',
      };
    },
    // 6. 比价格
    () => {
      const a = randInt(2, 8);
      const b = randInt(2, 8);
      if (a === b) return genAppCh6();
      return {
        content: `📊 超市里，铅笔盒${a}元，文具袋${b}元，哪个更贵？贵多少钱？`,
        answer: `${a > b ? '铅笔盒' : '文具袋'}贵${Math.abs(a - b)}元`,
        solution: `1. 铅笔盒${a}元\n2. 文具袋${b}元\n3. 比较：${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（元）\n4. ${a > b ? '铅笔盒' : '文具袋'}贵${Math.abs(a - b)}元`,
        type: '比价格应用',
      };
    },
    // 7. 存钱罐
    () => {
      const have = randInt(3, 8);
      const save = randInt(2, 5);
      return {
        content: `🐷 小青蛙的存钱罐里有${have}元，它又存了${save}元进去，存钱罐里现在有多少元？`,
        answer: `${have + save}元`,
        solution: `1. 原来有${have}元\n2. 又存了${save}元\n3. 现在有 = ${have} + ${save} = ${have + save}（元）`,
        type: '存钱应用',
      };
    },
    // 8. 买门票
    () => {
      const price = randInt(3, 6);
      const count = randInt(2, 4);
      return {
        content: `🎪 企鹅博士带${count}个小朋友去游乐园，门票每人${price}元，一共要花多少钱？`,
        answer: `${price * count}元`,
        solution: `1. 每人${price}元\n2. 有${count}个人（企鹅博士自己也算哦）\n3. 总价 = ${price} × ${count} = ${price * count}（元）`,
        type: '买门票应用',
      };
    },
    // 9. 换零钱
    () => {
      const yuan = randInt(2, 5);
      return {
        content: `💱 机灵狐有${yuan}张1元，全部换成角，可以换多少角？`,
        answer: `${yuan * 10}角`,
        solution: `1. 1元 = 10角\n2. ${yuan}元 = ${yuan} × 10 = ${yuan * 10}（角）`,
        type: '换零钱应用',
      };
    },
    // 10. 买早餐
    () => {
      const bread = randInt(2, 4);
      const juice = randInt(1, 3);
      const money = bread + juice + randInt(1, 3);
      return {
        content: `🥐 算算猫带了${money}元买早餐，面包${bread}元，果汁${juice}元，买完早餐还剩多少元？`,
        answer: `${money - bread - juice}元`,
        solution: `1. 带了${money}元\n2. 面包${bread}元\n3. 果汁${juice}元\n4. 还剩 = ${money} - ${bread} - ${juice} = ${money - bread - juice}（元）`,
        type: '买早餐应用',
      };
    },
    // 11. 捐款
    () => {
      const a = randInt(2, 5);
      const b = randInt(1, 4);
      const c = randInt(1, 3);
      return {
        content: `❤️ 学校捐款，🐱 算算猫捐了${a}元，🐉 智慧龙捐了${b}元，🐧 企鹅博士捐了${c}元，他们一共捐了多少元？`,
        answer: `${a + b + c}元`,
        solution: `1. 算算猫捐了${a}元\n2. 智慧龙捐了${b}元\n3. 企鹅博士捐了${c}元\n4. 一共 = ${a} + ${b} + ${c} = ${a + b + c}（元）`,
        type: '捐款应用',
      };
    },
    // 12. 买东西凑钱
    () => {
      const price = randInt(5, 10);
      const have = randInt(3, price - 1);
      const need = price - have;
      return {
        content: `🎯 小猴子想买一个玩具${price}元，它只有${have}元，还差多少钱？`,
        answer: `${need}元`,
        solution: `1. 玩具价格：${price}元\n2. 小猴子有${have}元\n3. 还差多少？用减法：${price} - ${have} = ${need}（元）`,
        type: '凑钱应用',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第七章应用题：认识钟表 ============

export function genAppCh7() {
  const templates = [
    // 1. 读整时
    () => {
      const hour = randInt(1, 12);
      return {
        content: `⏰ 现在钟表上时针指向${hour}，分针指向12，现在是几时？`,
        answer: `${hour}时`,
        solution: `1. 时针指向${hour}\n2. 分针指向12\n3. 分针指向12表示整时\n4. 所以现在是${hour}时`,
        type: '读整时',
      };
    },
    // 2. 计算经过时间
    () => {
      const start = randInt(7, 14);
      const duration = randInt(1, 3);
      const end = start + duration;
      if (end > 20) return genAppCh7();
      return {
        content: `📖 智慧龙${start}时开始看书，看了${duration}小时，几时看完？`,
        answer: `${end}时`,
        solution: `1. 开始时间：${start}时\n2. 看了${duration}小时\n3. 结束时间 = ${start} + ${duration} = ${end}（时）`,
        type: '经过时间',
      };
    },
    // 3. 作息时间
    () => {
      const wake = randInt(6, 8);
      const sleep = randInt(19, 21);
      return {
        content: `🌅 企鹅博士每天${wake}时起床，${sleep}时睡觉，它一天醒着多少小时？（从起床到睡觉）`,
        answer: `${sleep - wake}小时`,
        solution: `1. 起床时间：${wake}时\n2. 睡觉时间：${sleep}时\n3. 醒着的时间 = ${sleep} - ${wake} = ${sleep - wake}（小时）`,
        type: '作息时间',
      };
    },
    // 4. 开始时间
    () => {
      const end = randInt(10, 16);
      const duration = randInt(1, 3);
      const start = end - duration;
      return {
        content: `🎬 动画片${end}时结束，播放了${duration}小时，动画片是几时开始的？`,
        answer: `${start}时`,
        solution: `1. 结束时间：${end}时\n2. 播放了${duration}小时\n3. 开始时间 = ${end} - ${duration} = ${start}（时）`,
        type: '开始时间',
      };
    },
    // 5. 结束时间
    () => {
      const start = randInt(8, 15);
      const duration = randInt(1, 3);
      const end = start + duration;
      if (end > 20) return genAppCh7();
      return {
        content: `✏️ 算算猫${start}时开始做作业，做了${duration}小时，几时做完？`,
        answer: `${end}时`,
        solution: `1. 开始时间：${start}时\n2. 做了${duration}小时\n3. 做完时间 = ${start} + ${duration} = ${end}（时）`,
        type: '结束时间',
      };
    },
    // 6. 比较时间早晚
    () => {
      const a = randInt(5, 10);
      const b = randInt(a + 1, 12);
      return {
        content: `🐓 小青蛙${a}时起床，小鸭子${b}时起床，谁起得更早？`,
        answer: '小青蛙',
        solution: `1. 小青蛙${a}时起床\n2. 小鸭子${b}时起床\n3. ${a} < ${b}，数字小的时间更早\n4. 小青蛙起得更早`,
        type: '比较时间',
      };
    },
    // 7. 时间排序
    () => {
      const t1 = randInt(7, 9);
      const t2 = t1 + randInt(1, 2);
      const t3 = t2 + randInt(1, 2);
      return {
        content: `📅 算算猫一天中：${t3}时吃午饭，${t1}时吃早饭，${t2}时做早操。按时间先后顺序排一排。`,
        answer: `${t1}时→${t2}时→${t3}时`,
        solution: `1. 三个时间：${t1}时、${t2}时、${t3}时\n2. 按从小到大排序：${t1} < ${t2} < ${t3}\n3. 顺序：${t1}时（早饭）→ ${t2}时（早操）→ ${t3}时（午饭）`,
        type: '时间排序',
      };
    },
    // 8. 动画片时间
    () => {
      const start = randInt(16, 18);
      const duration = randInt(1, 2);
      const end = start + duration;
      return {
        content: `📺 算算猫每天${start}时开始看动画片，看${duration}小时，几时看完？`,
        answer: `${end}时`,
        solution: `1. 开始看：${start}时\n2. 看了${duration}小时\n3. 看完时间 = ${start} + ${duration} = ${end}（时）`,
        type: '动画片时间',
      };
    },
    // 9. 课程时间
    () => {
      const a = randInt(8, 10);
      const b = a + 1;
      return {
        content: `🏫 第一节课${a}时开始，每节课上1小时，第一节课${a + 1}时下课，第二节课几时下课？`,
        answer: `${b + 1}时`,
        solution: `1. 第一节课${a}时开始，${a + 1}时下课\n2. 第二节课${a + 1}时开始\n3. 上1小时后下课：${a + 1} + 1 = ${b + 1}（时）`,
        type: '课程时间',
      };
    },
    // 10. 约定时间
    () => {
      const now = randInt(8, 14);
      const wait = randInt(1, 3);
      const meet = now + wait;
      if (meet > 20) return genAppCh7();
      return {
        content: `🤝 智慧龙现在是${now}时，它和算算猫约好${wait}小时后在公园见面，它们几时见面？`,
        answer: `${meet}时`,
        solution: `1. 现在是${now}时\n2. ${wait}小时后见面\n3. 见面时间 = ${now} + ${wait} = ${meet}（时）`,
        type: '约定时间',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 综合应用题 ============

export function genAppMixed() {
  const templates = [
    // 1. 分糖果
    () => {
      const total = randInt(10, 20);
      const a = randInt(3, total - 3);
      const b = total - a;
      return {
        content: `🍬 智慧龙有${total}颗糖，分给算算猫${a}颗，分给企鹅博士${b}颗，分完了吗？`,
        answer: String(a + b === total ? '分完了！' : '没分完'),
        solution: `1. 一共${total}颗糖\n2. 算算猫${a}颗，企鹅博士${b}颗\n3. 验证：${a} + ${b} = ${a + b}\n4. ${a + b === total ? '正好等于' + total + '，分完了！🎉' : '不等于' + total + '，没分完哦'}`,
        type: '分配应用',
      };
    },
    // 2. 买东西
    () => {
      const apple = randInt(2, 5);
      const orange = randInt(2, 5);
      const total = apple + orange;
      return {
        content: `🍎 苹果${apple}元，🍊 橘子${orange}元，🐱 算算猫买这两样一共要多少钱？`,
        answer: `${total}元`,
        solution: `1. 苹果${apple}元\n2. 橘子${orange}元\n3. 一共 = ${apple} + ${orange} = ${total}（元）`,
        type: '购物应用',
      };
    },
    // 3. 连续看书
    () => {
      const a = randInt(3, 6);
      const b = randInt(2, 5);
      const c = randInt(2, 5);
      return {
        content: `📚 机灵狐第一天看了${a}页书，第二天看了${b}页，第三天看了${c}页，三天一共看了多少页？`,
        answer: `${a + b + c}页`,
        solution: `1. 第一天${a}页\n2. 第二天${b}页\n3. 第三天${c}页\n4. 一共 = ${a} + ${b} + ${c} = ${a + b + c}（页）`,
        type: '连加应用',
      };
    },
    // 4. 给糖问题
    () => {
      const a = randInt(8, 16);
      const b = randInt(4, a - 3);
      const diff = a - b;
      const half = Math.floor(diff / 2);
      return {
        content: `🍬 算算猫有${a}颗糖，小青蛙有${b}颗糖，算算猫给小青蛙多少颗后两人的糖一样多？`,
        answer: `${half}颗`,
        solution: `1. 算算猫${a}颗，小青蛙${b}颗\n2. 相差：${a} - ${b} = ${diff}（颗）\n3. 要一样多，给相差的一半：${diff} ÷ 2 = ${half}（颗）`,
        type: '比较应用',
      };
    },
    // 5. 混合购物
    () => {
      const pencil = randInt(1, 3);
      const eraser = randInt(1, 3);
      const ruler = randInt(1, 3);
      const money = pencil + eraser + ruler + randInt(1, 3);
      return {
        content: `✏️ 小猴子带了${money}元去文具店，铅笔${pencil}元，橡皮${eraser}元，尺子${ruler}元，买完还剩多少钱？`,
        answer: `${money - pencil - eraser - ruler}元`,
        solution: `1. 带了${money}元\n2. 铅笔${pencil}元，橡皮${eraser}元，尺子${ruler}元\n3. 花费 = ${pencil} + ${eraser} + ${ruler} = ${pencil + eraser + ruler}（元）\n4. 剩下 = ${money} - ${pencil + eraser + ruler} = ${money - pencil - eraser - ruler}（元）`,
        type: '混合购物',
      };
    },
    // 6. 动物园游览
    () => {
      const morning = randInt(5, 8);
      const afternoon = randInt(3, 6);
      const total = morning + afternoon;
      return {
        content: `🦁 上午企鹅博士在动物园看到了${morning}种动物，下午又看到了${afternoon}种新的动物，它一天一共看到了多少种动物？`,
        answer: `${total}种`,
        solution: `1. 上午看到${morning}种\n2. 下午又看到${afternoon}种新的\n3. 一共 = ${morning} + ${afternoon} = ${total}（种）`,
        type: '动物园应用',
      };
    },
    // 7. 时间+生活
    () => {
      const start = randInt(7, 9);
      const walk = randInt(1, 2);
      const arrive = start + walk;
      return {
        content: `🏫 算算猫${start}时从家出发走路去学校，走了${walk}小时到学校，算算猫几时到学校？`,
        answer: `${arrive}时`,
        solution: `1. 出发时间：${start}时\n2. 走了${walk}小时\n3. 到达时间 = ${start} + ${walk} = ${arrive}（时）`,
        type: '时间+生活应用',
      };
    },
    // 8. 排队+位置
    () => {
      const total = randInt(8, 15);
      const pos = randInt(3, total - 2);
      return {
        content: `🚶 小朋友们排队买冰淇淋，一共有${total}人，🐱 算算猫排第${pos}，她后面还有多少人？`,
        answer: `${total - pos}人`,
        solution: `1. 一共${total}人排队\n2. 算算猫排第${pos}\n3. 后面有多少人？用减法：${total} - ${pos} = ${total - pos}（人）`,
        type: '排队+位置应用',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}
