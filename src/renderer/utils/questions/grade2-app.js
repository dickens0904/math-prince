// 二年级综合应用题 - 趣味版，每个章节15-20道模板

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// 角色库
const CHARACTERS = [
  '算算猫🐱',
  '智慧龙🐉',
  '企鹅博士🐧',
  '小熊老师🐻',
  '机灵狐🦊',
  '猫头鹰🦉',
  '小兔子🐰',
  '小青蛙🐸',
  '小鸭子🐥',
  '小金鱼🐟',
  '小猴子🐒',
];

function c() {
  return pick(CHARACTERS);
}

// ============ 第一章应用题：100以内加减法 ============

export function genAppCh1() {
  const templates = [
    // 1. 超市大促销——购物找零
    () => {
      const price = randInt(15, 45);
      const pay = price + randInt(5, 30);
      const ch = c();
      return {
        content: `${ch}在超市买了一盒饼干${price}元，付了${pay}元，应找回多少元？`,
        answer: String(pay - price),
        solution: `1. 饼干价格：${price}元\n2. 付了${pay}元\n3. 找回 = 付款 - 价格\n4. ${pay} - ${price} = ${pay - price}（元）`,
        type: '购物找零',
      };
    },
    // 2. 图书馆借书
    () => {
      const total = randInt(30, 80);
      const lent = randInt(10, total - 5);
      const ch = c();
      return {
        content: `图书馆有${total}本故事书，被借走了${lent}本，还剩多少本？`,
        answer: String(total - lent),
        solution: `1. 故事书共${total}本\n2. 借走了${lent}本\n3. 剩余 = 总数 - 借走的\n4. ${total} - ${lent} = ${total - lent}（本）`,
        type: '图书馆',
      };
    },
    // 3. 运动会得分
    () => {
      const a = randInt(15, 40);
      const b = randInt(15, 40);
      const ch1 = c();
      const ch2 = c();
      return {
        content: `运动会上，${ch1}班得了${a}分，${ch2}班得了${b}分，两个班一共得了多少分？`,
        answer: String(a + b),
        solution: `1. ${ch1}班：${a}分\n2. ${ch2}班：${b}分\n3. 总分 = ${a} + ${b} = ${a + b}（分）`,
        type: '运动会',
      };
    },
    // 4. 农场动物
    () => {
      const hens = randInt(20, 50);
      const ducks = randInt(10, 40);
      const ch = c();
      return {
        content: `农场里有${hens}只母鸡和${ducks}只鸭子，一共有多少只家禽？`,
        answer: String(hens + ducks),
        solution: `1. 母鸡${hens}只\n2. 鸭子${ducks}只\n3. 总数 = 母鸡 + 鸭子\n4. ${hens} + ${ducks} = ${hens + ducks}（只）`,
        type: '农场',
      };
    },
    // 5. 坐公交车上下人数
    () => {
      const on = randInt(15, 40);
      const up = randInt(5, 25);
      const down = randInt(5, 20);
      const ch = c();
      return {
        content: `公交车上有${on}人，到站后上了${up}人，下了${down}人，现在车上有多少人？`,
        answer: String(on + up - down),
        solution: `1. 原来${on}人\n2. 上了${up}人\n3. 下了${down}人\n4. 现在人数 = ${on} + ${up} - ${down} = ${on + up - down}（人）`,
        type: '乘车',
      };
    },
    // 6. 收集邮票
    () => {
      const a = randInt(25, 60);
      const b = randInt(10, 30);
      const ch = c();
      return {
        content: `${ch}有${a}张邮票，又收集了${b}张，现在一共有多少张邮票？`,
        answer: String(a + b),
        solution: `1. 原来${a}张\n2. 又收集${b}张\n3. 总数 = ${a} + ${b} = ${a + b}（张）`,
        type: '收集邮票',
      };
    },
    // 7. 摘水果
    () => {
      const apples = randInt(15, 40);
      const oranges = randInt(10, 35);
      const ch1 = c();
      const ch2 = c();
      return {
        content: `${ch1}摘了${apples}个苹果，${ch2}摘了${oranges}个橘子，谁摘得多？多几个？`,
        answer: `${apples >= oranges ? ch1 : ch2}多${Math.abs(apples - oranges)}个`,
        solution: `1. ${ch1}摘${apples}个苹果\n2. ${ch2}摘${oranges}个橘子\n3. 比较：${Math.max(apples, oranges)} - ${Math.min(apples, oranges)} = ${Math.abs(apples - oranges)}\n4. ${apples >= oranges ? ch1 : ch2}多${Math.abs(apples - oranges)}个`,
        type: '摘水果',
      };
    },
    // 8. 排队人数
    () => {
      const front = randInt(8, 25);
      const back = randInt(5, 20);
      const ch = c();
      return {
        content: `排队时${ch}前面有${front}人，后面有${back}人，这一排一共有多少人？`,
        answer: String(front + back + 1),
        solution: `1. 前面${front}人\n2. 后面${back}人\n3. ${ch}自己算1人\n4. 总人数 = ${front} + ${back} + 1 = ${front + back + 1}（人）`,
        type: '排队',
      };
    },
    // 9. 植树节种树
    () => {
      const a = randInt(15, 40);
      const b = randInt(15, 40);
      const ch1 = c();
      const ch2 = c();
      return {
        content: `植树节，${ch1}种了${a}棵树，${ch2}种了${b}棵树，两人一共种了多少棵？`,
        answer: String(a + b),
        solution: `1. ${ch1}种了${a}棵\n2. ${ch2}种了${b}棵\n3. 总数 = ${a} + ${b} = ${a + b}（棵）`,
        type: '植树节',
      };
    },
    // 10. 做口算题
    () => {
      const total = randInt(50, 90);
      const done = randInt(20, total - 10);
      const ch = c();
      return {
        content: `${ch}要做${total}道口算题，已经做了${done}道，还剩多少道没做？`,
        answer: String(total - done),
        solution: `1. 共${total}道题\n2. 已做${done}道\n3. 剩余 = ${total} - ${done} = ${total - done}（道）`,
        type: '做题',
      };
    },
    // 11. 看故事书页数
    () => {
      const total = randInt(60, 99);
      const read1 = randInt(15, 35);
      const read2 = randInt(10, 25);
      const ch = c();
      return {
        content: `一本故事书有${total}页，${ch}第一天看了${read1}页，第二天看了${read2}页，还剩多少页？`,
        answer: String(total - read1 - read2),
        solution: `1. 共${total}页\n2. 第一天看${read1}页\n3. 第二天看${read2}页\n4. 剩余 = ${total} - ${read1} - ${read2} = ${total - read1 - read2}（页）`,
        type: '看书',
      };
    },
    // 12. 喂宠物
    () => {
      const a = randInt(20, 50);
      const b = randInt(10, a - 5);
      const ch = c();
      return {
        content: `${ch}买了${a}条小鱼干喂猫咪，猫咪吃了${b}条，还剩多少条？`,
        answer: String(a - b),
        solution: `1. 买了${a}条小鱼干\n2. 猫咪吃了${b}条\n3. 剩余 = ${a} - ${b} = ${a - b}（条）`,
        type: '喂宠物',
      };
    },
    // 13. 分零食
    () => {
      const total = randInt(30, 70);
      const give1 = randInt(10, 25);
      const give2 = randInt(8, 20);
      const ch = c();
      return {
        content: `${ch}有${total}颗糖果，分给${c()}${give1}颗，分给${c()}${give2}颗，还剩多少颗？`,
        answer: String(total - give1 - give2),
        solution: `1. 共${total}颗糖\n2. 分出${give1}颗\n3. 又分出${give2}颗\n4. 剩余 = ${total} - ${give1} - ${give2} = ${total - give1 - give2}（颗）`,
        type: '分零食',
      };
    },
    // 14. 存零花钱
    () => {
      const saved = randInt(35, 70);
      const spend = randInt(10, saved - 10);
      const ch = c();
      return {
        content: `${ch}攒了${saved}元零花钱，买文具花了${spend}元，还剩多少元？`,
        answer: String(saved - spend),
        solution: `1. 攒了${saved}元\n2. 花了${spend}元\n3. 剩余 = ${saved} - ${spend} = ${saved - spend}（元）`,
        type: '存零花钱',
      };
    },
    // 15. 爬山高度
    () => {
      const total = randInt(60, 99);
      const climbed = randInt(20, total - 15);
      const ch = c();
      return {
        content: `一座小山高${total}米，${ch}已经爬了${climbed}米，还有多少米到山顶？`,
        answer: String(total - climbed),
        solution: `1. 山高${total}米\n2. 已爬${climbed}米\n3. 剩余 = ${total} - ${climbed} = ${total - climbed}（米）`,
        type: '爬山',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第二章应用题：表内乘法 ============

export function genAppCh2() {
  const templates = [
    // 1. 超市购物（多份）
    () => {
      const price = randInt(3, 8);
      const count = randInt(3, 6);
      const ch = c();
      return {
        content: `${ch}在超市买了${count}袋面包，每袋${price}元，一共花了多少钱？`,
        answer: String(price * count),
        solution: `1. 每袋${price}元\n2. 买了${count}袋\n3. 总价 = ${price} × ${count} = ${price * count}（元）`,
        type: '超市购物',
      };
    },
    // 2. 排列座位
    () => {
      const rows = randInt(4, 8);
      const cols = randInt(3, 6);
      const ch = c();
      return {
        content: `${ch}的教室有${rows}排座位，每排${cols}个座位，教室一共能坐多少人？`,
        answer: String(rows * cols),
        solution: `1. 共${rows}排\n2. 每排${cols}个座位\n3. 总座位 = ${rows} × ${cols} = ${rows * cols}（个）`,
        type: '排列座位',
      };
    },
    // 3. 跳格子
    () => {
      const per = randInt(5, 12);
      const times = randInt(3, 6);
      const ch = c();
      return {
        content: `${ch}每次跳${per}格，跳了${times}次，一共跳了多少格？`,
        answer: String(per * times),
        solution: `1. 每次跳${per}格\n2. 跳了${times}次\n3. 总格数 = ${per} × ${times} = ${per * times}（格）`,
        type: '跳格子',
      };
    },
    // 4. 分组比赛
    () => {
      const perGroup = randInt(4, 8);
      const groups = randInt(3, 6);
      const ch = c();
      return {
        content: `运动会接力赛有${groups}组，每组${perGroup}人，参加接力赛的一共有多少人？`,
        answer: String(perGroup * groups),
        solution: `1. 共${groups}组\n2. 每组${perGroup}人\n3. 总人数 = ${perGroup} × ${groups} = ${perGroup * groups}（人）`,
        type: '分组比赛',
      };
    },
    // 5. 买文具套装
    () => {
      const per = randInt(4, 9);
      const sets = randInt(2, 5);
      const ch = c();
      return {
        content: `每套文具${per}元，${ch}给${sets}个好朋友各买了一套，一共花了多少钱？`,
        answer: String(per * sets),
        solution: `1. 每套${per}元\n2. 买${sets}套\n3. 总价 = ${per} × ${sets} = ${per * sets}（元）`,
        type: '买文具',
      };
    },
    // 6. 动物分笼
    () => {
      const perCage = randInt(3, 6);
      const cages = randInt(3, 7);
      const ch = c();
      return {
        content: `动物园每个笼子里有${perCage}只猴子，${cages}个笼子里一共有多少只猴子？`,
        answer: String(perCage * cages),
        solution: `1. 每笼${perCage}只\n2. 共${cages}个笼子\n3. 总数 = ${perCage} × ${cages} = ${perCage * cages}（只）`,
        type: '动物分笼',
      };
    },
    // 7. 饼干分盘
    () => {
      const per = randInt(4, 8);
      const plates = randInt(3, 6);
      const ch = c();
      return {
        content: `${ch}把饼干摆在${plates}个盘子里，每盘${per}块，一共多少块饼干？`,
        answer: String(per * plates),
        solution: `1. 每盘${per}块\n2. 共${plates}盘\n3. 总数 = ${per} × ${plates} = ${per * plates}（块）`,
        type: '饼干分盘',
      };
    },
    // 8. 花坛种花
    () => {
      const perRow = randInt(4, 9);
      const rows = randInt(3, 6);
      const ch = c();
      return {
        content: `花坛里种了${rows}行花，每行${perRow}朵，一共种了多少朵花？`,
        answer: String(perRow * rows),
        solution: `1. 共${rows}行\n2. 每行${perRow}朵\n3. 总数 = ${perRow} × ${rows} = ${perRow * rows}（朵）`,
        type: '花坛种花',
      };
    },
    // 9. 排队站排
    () => {
      const perRow = randInt(5, 9);
      const rows = randInt(3, 6);
      const ch = c();
      return {
        content: `同学们排队做操，站了${rows}排，每排${perRow}人，一共有多少人？`,
        answer: String(perRow * rows),
        solution: `1. 共${rows}排\n2. 每排${perRow}人\n3. 总人数 = ${perRow} × ${rows} = ${perRow * rows}（人）`,
        type: '排队站排',
      };
    },
    // 10. 糖果分盒
    () => {
      const per = randInt(5, 9);
      const boxes = randInt(2, 5);
      const extra = randInt(2, 8);
      const ch = c();
      return {
        content: `${ch}有${boxes}盒糖果，每盒${per}颗，又买了${extra}颗散装的，一共多少颗？`,
        answer: String(per * boxes + extra),
        solution: `1. 盒装：${per} × ${boxes} = ${per * boxes}（颗）\n2. 散装：${extra}颗\n3. 总数 = ${per * boxes} + ${extra} = ${per * boxes + extra}（颗）`,
        type: '糖果分盒',
      };
    },
    // 11. 书架摆书
    () => {
      const per = randInt(6, 9);
      const shelves = randInt(3, 5);
      const used = randInt(3, 10);
      const ch = c();
      return {
        content: `每个书架放${per}本书，${shelves}个书架共放了${per * shelves}本，${ch}拿走了${used}本，还剩多少本？`,
        answer: String(per * shelves - used),
        solution: `1. 每架${per}本，${shelves}架 = ${per} × ${shelves} = ${per * shelves}（本）\n2. 拿走${used}本\n3. 剩余 = ${per * shelves} - ${used} = ${per * shelves - used}（本）`,
        type: '书架摆书',
      };
    },
    // 12. 停车场车位
    () => {
      const rows = randInt(3, 6);
      const cols = randInt(4, 8);
      const empty = randInt(2, 8);
      const ch = c();
      return {
        content: `停车场有${rows}排车位，每排${cols}个，其中${empty}个车位空着，停了多少辆车？`,
        answer: String(rows * cols - empty),
        solution: `1. 总车位 = ${rows} × ${cols} = ${rows * cols}（个）\n2. 空着${empty}个\n3. 已停车 = ${rows * cols} - ${empty} = ${rows * cols - empty}（辆）`,
        type: '停车场',
      };
    },
    // 13. 鸡蛋分盒
    () => {
      const per = randInt(6, 10);
      const boxes = randInt(3, 6);
      const ch = c();
      return {
        content: `每盒装${per}个鸡蛋，${ch}买了${boxes}盒，一共多少个鸡蛋？`,
        answer: String(per * boxes),
        solution: `1. 每盒${per}个\n2. 买了${boxes}盒\n3. 总数 = ${per} × ${boxes} = ${per * boxes}（个）`,
        type: '鸡蛋分盒',
      };
    },
    // 14. 积木搭建
    () => {
      const layers = randInt(3, 6);
      const perLayer = randInt(4, 8);
      const ch = c();
      return {
        content: `${ch}搭积木，每层用${perLayer}块，搭了${layers}层，一共用了多少块积木？`,
        answer: String(perLayer * layers),
        solution: `1. 每层${perLayer}块\n2. 共${layers}层\n3. 总数 = ${perLayer} × ${layers} = ${perLayer * layers}（块）`,
        type: '积木搭建',
      };
    },
    // 15. 贴纸收集
    () => {
      const per = randInt(5, 9);
      const pages = randInt(2, 5);
      const ch = c();
      return {
        content: `${ch}每页贴${per}张贴纸，贴了${pages}页，一共贴了多少张？`,
        answer: String(per * pages),
        solution: `1. 每页${per}张\n2. 共${pages}页\n3. 总数 = ${per} × ${pages} = ${per * pages}（张）`,
        type: '贴纸收集',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第三章应用题：表内除法 ============

export function genAppCh3() {
  const templates = [
    // 1. 平均分糖果
    () => {
      const per = randInt(3, 8);
      const kids = randInt(2, 6);
      const total = per * kids;
      const ch = c();
      return {
        content: `${ch}有${total}颗糖，要平均分给${kids}个好朋友，每人分到几颗？`,
        answer: String(per),
        solution: `1. 共${total}颗糖\n2. 平均分给${kids}人\n3. 每人 = ${total} ÷ ${kids} = ${per}（颗）`,
        type: '平均分糖',
      };
    },
    // 2. 分披萨
    () => {
      const slices = randInt(3, 8);
      const people = randInt(2, 6);
      const total = slices * people;
      const ch = c();
      return {
        content: `一个大披萨切成${total}块，平均分给${people}人，每人分到几块？`,
        answer: String(slices),
        solution: `1. 共${total}块\n2. 平均分给${people}人\n3. 每人 = ${total} ÷ ${people} = ${slices}（块）`,
        type: '分披萨',
      };
    },
    // 3. 租车/船
    () => {
      const people = randInt(12, 36);
      const perCar = randInt(4, 6);
      const cars = Math.ceil(people / perCar);
      const ch = c();
      return {
        content: `${people}个同学去春游，每辆车坐${perCar}人，至少需要租多少辆车？`,
        answer: String(cars),
        solution: `1. 共${people}人\n2. 每车${perCar}人\n3. ${people} ÷ ${perCar} = ${(people / perCar).toFixed(1)}…\n4. 需要向上取整，至少${cars}辆`,
        type: '租车',
      };
    },
    // 4. 做花束
    () => {
      const flowers = randInt(3, 8);
      const bouquets = randInt(3, 6);
      const total = flowers * bouquets;
      const ch = c();
      return {
        content: `花店有${total}朵玫瑰，每${flowers}朵扎一束，可以扎多少束？`,
        answer: String(bouquets),
        solution: `1. 共${total}朵\n2. 每${flowers}朵扎一束\n3. 束数 = ${total} ÷ ${flowers} = ${bouquets}（束）`,
        type: '做花束',
      };
    },
    // 5. 分饼干
    () => {
      const total = randInt(20, 50);
      const kids = randInt(3, 6);
      const per = Math.floor(total / kids);
      const rem = total % kids;
      const ch = c();
      return {
        content: `${ch}有${total}块饼干，平均分给${kids}个小朋友，每人几块？还剩几块？`,
        answer: `${per}余${rem}`,
        solution: `1. 共${total}块\n2. 分给${kids}人\n3. ${total} ÷ ${kids} = ${per}…${rem}\n4. 每人${per}块，剩${rem}块`,
        type: '分饼干',
      };
    },
    // 6. 摆盘
    () => {
      const per = randInt(3, 7);
      const plates = randInt(3, 6);
      const total = per * plates;
      const ch = c();
      return {
        content: `${ch}把${total}个草莓平均摆在${plates}个盘子里，每盘放几个？`,
        answer: String(per),
        solution: `1. 共${total}个草莓\n2. 摆在${plates}个盘子里\n3. 每盘 = ${total} ÷ ${plates} = ${per}（个）`,
        type: '摆盘',
      };
    },
    // 7. 分组活动
    () => {
      const people = randInt(18, 48);
      const perGroup = randInt(4, 8);
      const groups = people / perGroup;
      if (!Number.isInteger(groups)) return genAppCh3();
      const ch = c();
      return {
        content: `${people}个同学参加活动，每${perGroup}人一组，可以分成几组？`,
        answer: String(groups),
        solution: `1. 共${people}人\n2. 每${perGroup}人一组\n3. 组数 = ${people} ÷ ${perGroup} = ${groups}（组）`,
        type: '分组活动',
      };
    },
    // 8. 装箱
    () => {
      const total = randInt(24, 54);
      const per = randInt(3, 8);
      if (total % per !== 0) return genAppCh3();
      const boxes = total / per;
      const ch = c();
      return {
        content: `快递站有${total}个包裹要装箱，每箱装${per}个，需要多少个箱子？`,
        answer: String(boxes),
        solution: `1. 共${total}个包裹\n2. 每箱${per}个\n3. 箱数 = ${total} ÷ ${per} = ${boxes}（箱）`,
        type: '装箱',
      };
    },
    // 9. 插花
    () => {
      const vases = randInt(3, 6);
      const per = randInt(4, 8);
      const total = per * vases;
      const ch = c();
      return {
        content: `${ch}买了${total}枝花，平均插在${vases}个花瓶里，每个花瓶插几枝？`,
        answer: String(per),
        solution: `1. 共${total}枝花\n2. ${vases}个花瓶\n3. 每瓶 = ${total} ÷ ${vases} = ${per}（枝）`,
        type: '插花',
      };
    },
    // 10. 分书
    () => {
      const total = randInt(30, 60);
      const kids = randInt(4, 6);
      if (total % kids !== 0) return genAppCh3();
      const per = total / kids;
      const ch = c();
      return {
        content: `图书角有${total}本书，平均分给${kids}个班级，每班分到几本？`,
        answer: String(per),
        solution: `1. 共${total}本\n2. 分给${kids}个班\n3. 每班 = ${total} ÷ ${kids} = ${per}（本）`,
        type: '分书',
      };
    },
    // 11. 发练习本
    () => {
      const total = randInt(20, 48);
      const kids = randInt(3, 6);
      const per = Math.floor(total / kids);
      const rem = total % kids;
      const ch = c();
      return {
        content: `${ch}有${total}本练习本，平均分给${kids}个同学，每人几本？还剩几本？`,
        answer: `${per}余${rem}`,
        solution: `1. 共${total}本\n2. 分给${kids}人\n3. ${total} ÷ ${kids} = ${per}…${rem}\n4. 每人${per}本，剩${rem}本`,
        type: '发练习本',
      };
    },
    // 12. 排队分组
    () => {
      const total = randInt(18, 45);
      const perRow = randInt(3, 9);
      if (total % perRow !== 0) return genAppCh3();
      const rows = total / perRow;
      const ch = c();
      return {
        content: `${total}个小朋友排队，每排站${perRow}人，可以站几排？`,
        answer: String(rows),
        solution: `1. 共${total}人\n2. 每排${perRow}人\n3. 排数 = ${total} ÷ ${perRow} = ${rows}（排）`,
        type: '排队分组',
      };
    },
    // 13. 装袋
    () => {
      const total = randInt(18, 48);
      const per = randInt(3, 8);
      if (total % per !== 0) return genAppCh3();
      const bags = total / per;
      const ch = c();
      return {
        content: `果农有${total}个橘子，每${per}个装一袋，可以装多少袋？`,
        answer: String(bags),
        solution: `1. 共${total}个\n2. 每袋${per}个\n3. 袋数 = ${total} ÷ ${per} = ${bags}（袋）`,
        type: '装袋',
      };
    },
    // 14. 分座位
    () => {
      const tables = randInt(3, 6);
      const per = randInt(4, 8);
      const total = per * tables;
      const ch = c();
      return {
        content: `餐厅有${total}位客人，平均坐在${tables}张桌子，每桌坐几人？`,
        answer: String(per),
        solution: `1. 共${total}人\n2. ${tables}张桌子\n3. 每桌 = ${total} ÷ ${tables} = ${per}（人）`,
        type: '分座位',
      };
    },
    // 15. 编花环
    () => {
      const per = randInt(5, 9);
      const garlands = randInt(3, 5);
      const total = per * garlands;
      const ch = c();
      return {
        content: `${ch}用${total}朵小花编花环，每个花环用${per}朵，可以编几个？`,
        answer: String(garlands),
        solution: `1. 共${total}朵花\n2. 每个花环${per}朵\n3. 花环数 = ${total} ÷ ${per} = ${garlands}（个）`,
        type: '编花环',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第四章应用题：几何初步 ============

export function genAppCh4() {
  const templates = [
    // 1. 围篱笆
    () => {
      const l = randInt(5, 15);
      const w = randInt(3, 10);
      const ch = c();
      return {
        content: `一块长方形菜地，长${l}米，宽${w}米，${ch}要在四周围上篱笆，篱笆长多少米？`,
        answer: String(2 * (l + w)),
        solution: `1. 菜地长${l}米，宽${w}米\n2. 围篱笆就是求周长\n3. 长方形周长 = (长 + 宽) × 2\n4. (${l} + ${w}) × 2 = ${2 * (l + w)}（米）`,
        type: '围篱笆',
      };
    },
    // 2. 走路距离（正方形周长）
    () => {
      const s = randInt(5, 15);
      const ch = c();
      return {
        content: `沿正方形花坛走一圈，花坛边长${s}米，${ch}走了多少米？`,
        answer: String(4 * s),
        solution: `1. 正方形边长${s}米\n2. 走一圈就是求周长\n3. 正方形周长 = 边长 × 4\n4. ${s} × 4 = ${4 * s}（米）`,
        type: '走路距离',
      };
    },
    // 3. 画图形
    () => {
      const shapes = ['三角形', '正方形', '长方形'];
      const sides = [3, 4, 4];
      const i = randInt(0, 2);
      const ch = c();
      return {
        content: `${ch}画了一个${shapes[i]}，它有几条边？几个角？`,
        answer: `${sides[i]}条边，${sides[i]}个角`,
        solution: `1. ${shapes[i]}的特征\n2. ${shapes[i]}有${sides[i]}条边\n3. ${shapes[i]}有${sides[i]}个角`,
        type: '画图形',
      };
    },
    // 4. 数角
    () => {
      const sides = randInt(3, 6);
      const ch = c();
      return {
        content: `一个多边形有${sides}条边，它有几个角？`,
        answer: `${sides}个角`,
        solution: `1. 多边形的边数和角数相同\n2. 有${sides}条边\n3. 所以有${sides}个角`,
        type: '数角',
      };
    },
    // 5. 图形特征
    () => {
      const ch = c();
      return {
        content: `${ch}说长方形的对边相等，四个角都是直角。这对吗？`,
        answer: '对',
        solution: `1. 长方形的特征：\n2. 对边相等 ✓\n3. 四个角都是直角 ✓\n4. 所以${ch}说得对`,
        type: '图形特征',
      };
    },
    // 6. 拼图
    () => {
      const tri = randInt(2, 4);
      const sq = randInt(1, 3);
      const ch = c();
      return {
        content: `${ch}用${tri}个三角形和${sq}个正方形拼图案，一共用了多少个图形？`,
        answer: String(tri + sq),
        solution: `1. 三角形${tri}个\n2. 正方形${sq}个\n3. 总数 = ${tri} + ${sq} = ${tri + sq}（个）`,
        type: '拼图',
      };
    },
    // 7. 围花坛
    () => {
      const s = randInt(4, 12);
      const ch = c();
      return {
        content: `正方形花坛边长${s}米，${ch}要围一圈栅栏，需要多少米栅栏？`,
        answer: String(4 * s),
        solution: `1. 正方形边长${s}米\n2. 围一圈就是求周长\n3. 周长 = ${s} × 4 = ${4 * s}（米）`,
        type: '围花坛',
      };
    },
    // 8. 图形计数
    () => {
      const sq = randInt(3, 8);
      const tri = randInt(2, 6);
      const ch = c();
      return {
        content: `图中有${sq}个四边形和${tri}个三角形，四边形比三角形多几个？`,
        answer: String(sq - tri),
        solution: `1. 四边形${sq}个\n2. 三角形${tri}个\n3. 多 = ${sq} - ${tri} = ${sq - tri}（个）`,
        type: '图形计数',
      };
    },
    // 9. 剪纸
    () => {
      const l = randInt(6, 14);
      const w = randInt(4, 10);
      const ch = c();
      return {
        content: `${ch}剪了一张长${l}厘米、宽${w}厘米的长方形彩纸，这张彩纸的周长是多少？`,
        answer: String(2 * (l + w)),
        solution: `1. 长${l}厘米，宽${w}厘米\n2. 周长 = (长 + 宽) × 2\n3. (${l} + ${w}) × 2 = ${2 * (l + w)}（厘米）`,
        type: '剪纸',
      };
    },
    // 10. 装饰边框
    () => {
      const l = randInt(8, 20);
      const w = randInt(5, 12);
      const ch = c();
      return {
        content: `${ch}要给一幅长${l}分米、宽${w}分米的画做一个边框，需要多长的木条？`,
        answer: String(2 * (l + w)),
        solution: `1. 画长${l}分米，宽${w}分米\n2. 边框就是画的周长\n3. 周长 = (${l} + ${w}) × 2 = ${2 * (l + w)}（分米）`,
        type: '装饰边框',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第五章应用题：认识时分 ============

export function genAppCh5() {
  const templates = [
    // 1. 做作业时间
    () => {
      const startH = randInt(4, 9);
      const dur = randInt(1, 2);
      const ch = c();
      return {
        content: `${ch}下午${startH}时开始做作业，做了${dur}小时，几点做完？`,
        answer: `${startH + dur}时`,
        solution: `1. 开始：${startH}时\n2. 用时：${dur}小时\n3. 结束 = ${startH} + ${dur} = ${startH + dur}（时）`,
        type: '做作业',
      };
    },
    // 2. 课间休息
    () => {
      const mins = pick([10, 15, 20]);
      const ch = c();
      return {
        content: `课间休息${mins}分钟，${ch}从${9}时${0}分下课，到几时几分上课？`,
        answer: `9时${mins}分`,
        solution: `1. 下课：9时0分\n2. 休息${mins}分钟\n3. 上课 = 9时0分 + ${mins}分 = 9时${mins}分`,
        type: '课间休息',
      };
    },
    // 3. 动画片播放
    () => {
      const startH = randInt(5, 8);
      const dur = randInt(1, 2);
      const ch = c();
      return {
        content: `动画片${startH}时开始播放，播放${dur}小时，几点结束？`,
        answer: `${startH + dur}时`,
        solution: `1. 开始：${startH}时\n2. 播放${dur}小时\n3. 结束 = ${startH} + ${dur} = ${startH + dur}（时）`,
        type: '动画片',
      };
    },
    // 4. 约好时间
    () => {
      const now = randInt(2, 5);
      const wait = randInt(1, 3);
      const ch = c();
      return {
        content: `现在${now}时，${ch}和朋友约好${wait}小时后见面，见面时是几点？`,
        answer: `${now + wait}时`,
        solution: `1. 现在${now}时\n2. ${wait}小时后\n3. 见面时间 = ${now} + ${wait} = ${now + wait}（时）`,
        type: '约好时间',
      };
    },
    // 5. 做饭时间
    () => {
      const startH = randInt(4, 6);
      const cook = randInt(1, 2);
      const ch = c();
      return {
        content: `${ch}的妈妈${startH}时开始做饭，做了${cook}小时，几点做好？`,
        answer: `${startH + cook}时`,
        solution: `1. 开始做饭：${startH}时\n2. 做了${cook}小时\n3. 做好 = ${startH} + ${cook} = ${startH + cook}（时）`,
        type: '做饭',
      };
    },
    // 6. 运动时间
    () => {
      const h = randInt(1, 3);
      const ch = c();
      return {
        content: `${h}小时等于多少分钟？`,
        answer: `${h * 60}分钟`,
        solution: `1. 1小时 = 60分钟\n2. ${h}小时 = ${h} × 60 = ${h * 60}（分钟）`,
        type: '运动时间',
      };
    },
    // 7. 睡觉时间
    () => {
      const bed = randInt(8, 9);
      const wake = randInt(6, 7);
      const ch = c();
      return {
        content: `${ch}晚上${bed}时睡觉，早上${wake}时起床，睡了多少小时？`,
        answer: `${12 - bed + wake}小时`,
        solution: `1. 睡觉：晚上${bed}时\n2. 起床：早上${wake}时\n3. 睡眠 = 12 - ${bed} + ${wake} = ${12 - bed + wake}（小时）`,
        type: '睡觉时间',
      };
    },
    // 8. 旅行出发
    () => {
      const dep = randInt(7, 9);
      const arr = dep + randInt(2, 4);
      const ch = c();
      return {
        content: `${ch}一家${dep}时出发去旅行，${arr}时到达，路上用了多少小时？`,
        answer: `${arr - dep}小时`,
        solution: `1. 出发：${dep}时\n2. 到达：${arr}时\n3. 用时 = ${arr} - ${dep} = ${arr - dep}（小时）`,
        type: '旅行出发',
      };
    },
    // 9. 节目开始
    () => {
      const start = randInt(6, 8);
      const dur = randInt(1, 2);
      const ch = c();
      return {
        content: `电视节目${start}时开始，${start + dur}时结束，这个节目播放了多少小时？`,
        answer: `${dur}小时`,
        solution: `1. 开始：${start}时\n2. 结束：${start + dur}时\n3. 时长 = ${start + dur} - ${start} = ${dur}（小时）`,
        type: '节目开始',
      };
    },
    // 10. 煮鸡蛋
    () => {
      const mins = pick([5, 8, 10, 12]);
      const ch = c();
      return {
        content: `煮鸡蛋需要${mins}分钟，${ch}从8时开始煮，几时几分煮好？`,
        answer: `8时${mins}分`,
        solution: `1. 开始煮：8时0分\n2. 需要${mins}分钟\n3. 煮好 = 8时0分 + ${mins}分 = 8时${mins}分`,
        type: '煮鸡蛋',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第六章应用题：千以内数的认识 ============

export function genAppCh6() {
  const templates = [
    // 1. 图书馆藏书
    () => {
      const a = randInt(200, 600);
      const b = randInt(100, 400);
      const ch = c();
      return {
        content: `图书馆有${a}本故事书和${b}本科技书，一共有多少本书？`,
        answer: String(a + b),
        solution: `1. 故事书${a}本\n2. 科技书${b}本\n3. 总数 = ${a} + ${b} = ${a + b}（本）`,
        type: '图书馆藏书',
      };
    },
    // 2. 学校人数
    () => {
      const a = randInt(300, 500);
      const b = randInt(200, 400);
      const ch = c();
      return {
        content: `学校有${a}名男生和${b}名女生，男生比女生多多少人？`,
        answer: String(Math.abs(a - b)),
        solution: `1. 男生${a}人\n2. 女生${b}人\n3. 相差 = ${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（人）`,
        type: '学校人数',
      };
    },
    // 3. 养殖场数量
    () => {
      const hens = randInt(300, 600);
      const ducks = randInt(200, 500);
      const ch = c();
      return {
        content: `养殖场有${hens}只鸡和${ducks}只鸭，鸡和鸭一共有多少只？`,
        answer: String(hens + ducks),
        solution: `1. 鸡${hens}只\n2. 鸭${ducks}只\n3. 总数 = ${hens} + ${ducks} = ${hens + ducks}（只）`,
        type: '养殖场',
      };
    },
    // 4. 运动会观众
    () => {
      const total = randInt(500, 900);
      const left = randInt(100, 300);
      const ch = c();
      return {
        content: `运动会有${total}名观众，中途离开了${left}人，还剩多少人？`,
        answer: String(total - left),
        solution: `1. 原有${total}人\n2. 离开${left}人\n3. 剩余 = ${total} - ${left} = ${total - left}（人）`,
        type: '运动会观众',
      };
    },
    // 5. 邮票收集
    () => {
      const a = randInt(200, 500);
      const b = randInt(100, 400);
      const ch = c();
      const ch2 = c();
      return {
        content: `${ch}收集了${a}张邮票，${ch2}收集了${b}张，两人一共收集了多少张？`,
        answer: String(a + b),
        solution: `1. ${ch}有${a}张\n2. ${ch2}有${b}张\n3. 总数 = ${a} + ${b} = ${a + b}（张）`,
        type: '邮票收集',
      };
    },
    // 6. 公园门票
    () => {
      const adult = randInt(300, 600);
      const child = randInt(200, 400);
      const ch = c();
      return {
        content: `公园一天卖出成人票${adult}张，儿童票${child}张，一共卖了多少张票？`,
        answer: String(adult + child),
        solution: `1. 成人票${adult}张\n2. 儿童票${child}张\n3. 总数 = ${adult} + ${child} = ${adult + child}（张）`,
        type: '公园门票',
      };
    },
    // 7. 超市商品
    () => {
      const a = randInt(400, 800);
      const b = randInt(200, a - 100);
      const ch = c();
      return {
        content: `超市原有${a}箱饮料，卖出${b}箱，还剩多少箱？`,
        answer: String(a - b),
        solution: `1. 原有${a}箱\n2. 卖出${b}箱\n3. 剩余 = ${a} - ${b} = ${a - b}（箱）`,
        type: '超市商品',
      };
    },
    // 8. 人数估算
    () => {
      const a = randInt(200, 500);
      const b = randInt(100, 400);
      const ch = c();
      return {
        content: `学校大约有${a}人，公园大约有${b}人，两个地方大约一共有多少人？`,
        answer: `约${Math.round((a + b) / 100) * 100}人`,
        solution: `1. 学校约${a}人，取整为${Math.round(a / 100) * 100}\n2. 公园约${b}人，取整为${Math.round(b / 100) * 100}\n3. 约${Math.round(a / 100) * 100} + ${Math.round(b / 100) * 100} = ${Math.round((a + b) / 100) * 100}（人）`,
        type: '人数估算',
      };
    },
    // 9. 图书馆借阅
    () => {
      const total = randInt(600, 999);
      const lent = randInt(100, 400);
      const ch = c();
      return {
        content: `图书馆有${total}本书，借出了${lent}本，图书馆里还剩多少本？`,
        answer: String(total - lent),
        solution: `1. 共有${total}本\n2. 借出${lent}本\n3. 剩余 = ${total} - ${lent} = ${total - lent}（本）`,
        type: '图书馆借阅',
      };
    },
    // 10. 工厂产量
    () => {
      const a = randInt(200, 500);
      const b = randInt(100, 400);
      const ch = c();
      return {
        content: `工厂上月生产了${a}个零件，这个月生产了${b}个，这个月比上月少生产多少个？`,
        answer: String(Math.abs(a - b)),
        solution: `1. 上月${a}个\n2. 这月${b}个\n3. 相差 = ${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（个）`,
        type: '工厂产量',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第七章应用题：三位数加减法 ============

export function genAppCh7() {
  const templates = [
    // 1. 图书馆藏书比较
    () => {
      const a = randInt(200, 600);
      const b = randInt(100, 400);
      const ch = c();
      return {
        content: `图书馆有${a}本故事书，科技书比故事书多${b}本，科技书有多少本？`,
        answer: String(a + b),
        solution: `1. 故事书${a}本\n2. 科技书比故事书多${b}本\n3. 科技书 = ${a} + ${b} = ${a + b}（本）`,
        type: '图书馆藏书',
      };
    },
    // 2. 爬山高度
    () => {
      const total = randInt(500, 999);
      const climbed = randInt(200, total - 100);
      const ch = c();
      return {
        content: `一座山高${total}米，${ch}已经爬了${climbed}米，还有多少米到山顶？`,
        answer: String(total - climbed),
        solution: `1. 山高${total}米\n2. 已爬${climbed}米\n3. 剩余 = ${total} - ${climbed} = ${total - climbed}（米）`,
        type: '爬山高度',
      };
    },
    // 3. 学校捐款
    () => {
      const a = randInt(200, 400);
      const b = randInt(150, 350);
      const ch = c();
      return {
        content: `一年级捐了${a}元，二年级捐了${b}元，两个年级一共捐了多少元？`,
        answer: String(a + b),
        solution: `1. 一年级${a}元\n2. 二年级${b}元\n3. 总计 = ${a} + ${b} = ${a + b}（元）`,
        type: '学校捐款',
      };
    },
    // 4. 运动会总分
    () => {
      const a = randInt(100, 300);
      const b = randInt(100, 300);
      const c3 = randInt(100, 200);
      const ch = c();
      return {
        content: `三个班在运动会上分别得了${a}分、${b}分、${c3}分，三个班一共得了多少分？`,
        answer: String(a + b + c3),
        solution: `1. 一班${a}分\n2. 二班${b}分\n3. 三班${c3}分\n4. 总分 = ${a} + ${b} + ${c3} = ${a + b + c3}（分）`,
        type: '运动会总分',
      };
    },
    // 5. 养蚕宝宝
    () => {
      const total = randInt(300, 600);
      const eaten = randInt(100, 200);
      const ch = c();
      return {
        content: `${ch}养了${total}条蚕宝宝，送给同学${eaten}条，自己还剩多少条？`,
        answer: String(total - eaten),
        solution: `1. 共${total}条\n2. 送出${eaten}条\n3. 剩余 = ${total} - ${eaten} = ${total - eaten}（条）`,
        type: '养蚕宝宝',
      };
    },
    // 6. 收集落叶
    () => {
      const a = randInt(150, 350);
      const b = randInt(100, 300);
      const ch1 = c();
      const ch2 = c();
      return {
        content: `${ch1}收集了${a}片落叶，${ch2}收集了${b}片，两人相差多少片？`,
        answer: String(Math.abs(a - b)),
        solution: `1. ${ch1}：${a}片\n2. ${ch2}：${b}片\n3. 相差 = ${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（片）`,
        type: '收集落叶',
      };
    },
    // 7. 农场产量
    () => {
      const a = randInt(300, 500);
      const b = randInt(200, 400);
      const ch = c();
      return {
        content: `农场今年收了${a}千克苹果和${b}千克梨，苹果比梨多多少千克？`,
        answer: String(Math.abs(a - b)),
        solution: `1. 苹果${a}千克\n2. 梨${b}千克\n3. 相差 = ${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（千克）`,
        type: '农场产量',
      };
    },
    // 8. 超市库存
    () => {
      const a = randInt(400, 800);
      const sold = randInt(100, 300);
      const bought = randInt(100, 200);
      const ch = c();
      return {
        content: `超市原有${a}箱牛奶，卖出${sold}箱，又进货${bought}箱，现在有多少箱？`,
        answer: String(a - sold + bought),
        solution: `1. 原有${a}箱\n2. 卖出${sold}箱\n3. 进货${bought}箱\n4. 现在 = ${a} - ${sold} + ${bought} = ${a - sold + bought}（箱）`,
        type: '超市库存',
      };
    },
    // 9. 邮票总数
    () => {
      const a = randInt(200, 400);
      const b = randInt(150, 300);
      const ch = c();
      return {
        content: `${ch}原有${a}张邮票，又收集了${b}张，现在一共有多少张？`,
        answer: String(a + b),
        solution: `1. 原有${a}张\n2. 新收集${b}张\n3. 总数 = ${a} + ${b} = ${a + b}（张）`,
        type: '邮票总数',
      };
    },
    // 10. 植树数量
    () => {
      const a = randInt(200, 400);
      const b = randInt(100, 300);
      const c2 = randInt(100, 200);
      const ch = c();
      return {
        content: `三个班植树，分别种了${a}棵、${b}棵、${c2}棵，三个班一共种了多少棵？`,
        answer: String(a + b + c2),
        solution: `1. 一班${a}棵\n2. 二班${b}棵\n3. 三班${c2}棵\n4. 总计 = ${a} + ${b} + ${c2} = ${a + b + c2}（棵）`,
        type: '植树数量',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第八章应用题：克与千克 ============

export function genAppCh8() {
  const templates = [
    // 1. 买水果称重
    () => {
      const price = randInt(4, 10);
      const kg = randInt(2, 5);
      const ch = c();
      return {
        content: `苹果每千克${price}元，${ch}买了${kg}千克，要付多少钱？`,
        answer: String(price * kg),
        solution: `1. 每千克${price}元\n2. 买了${kg}千克\n3. 总价 = ${price} × ${kg} = ${price * kg}（元）`,
        type: '买水果',
      };
    },
    // 2. 书包重量
    () => {
      const a = randInt(2, 5);
      const b = randInt(500, 3000);
      const ch = c();
      return {
        content: `${ch}的书包重${a}千克，铅笔盒重${b}克，书包比铅笔盒重多少克？`,
        answer: `${a * 1000 - b}克`,
        solution: `1. 书包${a}千克 = ${a * 1000}克\n2. 铅笔盒${b}克\n3. 相差 = ${a * 1000} - ${b} = ${a * 1000 - b}（克）`,
        type: '书包重量',
      };
    },
    // 3. 做蛋糕称料
    () => {
      const flour = randInt(1, 3);
      const sugar = randInt(200, 500);
      const ch = c();
      return {
        content: `做蛋糕需要${flour}千克面粉和${sugar}克糖，面粉比糖重多少克？`,
        answer: `${flour * 1000 - sugar}克`,
        solution: `1. 面粉${flour}千克 = ${flour * 1000}克\n2. 糖${sugar}克\n3. 相差 = ${flour * 1000} - ${sugar} = ${flour * 1000 - sugar}（克）`,
        type: '做蛋糕',
      };
    },
    // 4. 体重比较
    () => {
      const a = randInt(20, 35);
      const b = randInt(20, 35);
      const ch1 = c();
      const ch2 = c();
      return {
        content: `${ch1}体重${a}千克，${ch2}体重${b}千克，${ch1}比${ch2}${a >= b ? '重' : '轻'}多少千克？`,
        answer: `${Math.abs(a - b)}千克`,
        solution: `1. ${ch1}：${a}千克\n2. ${ch2}：${b}千克\n3. 相差 = ${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}（千克）`,
        type: '体重比较',
      };
    },
    // 5. 快递包裹
    () => {
      const per = randInt(2, 5);
      const count = randInt(3, 6);
      const ch = c();
      return {
        content: `每个快递包裹重${per}千克，${ch}寄了${count}个包裹，一共多重？`,
        answer: `${per * count}千克`,
        solution: `1. 每个${per}千克\n2. 共${count}个\n3. 总重 = ${per} × ${count} = ${per * count}（千克）`,
        type: '快递包裹',
      };
    },
    // 6. 买菜称重
    () => {
      const a = randInt(2, 4);
      const b = randInt(1, 3);
      const ch = c();
      return {
        content: `${ch}买了${a}千克西红柿和${b}千克黄瓜，一共买了多少千克蔬菜？`,
        answer: `${a + b}千克`,
        solution: `1. 西红柿${a}千克\n2. 黄瓜${b}千克\n3. 总重 = ${a} + ${b} = ${a + b}（千克）`,
        type: '买菜称重',
      };
    },
    // 7. 动物体重
    () => {
      const animal = pick(['小象', '小牛', '小马', '小猪']);
      const kg = randInt(50, 200);
      const human = randInt(20, 35);
      const ch = c();
      return {
        content: `一只${animal}重${kg}千克，${ch}重${human}千克，${animal}比${ch}重多少千克？`,
        answer: `${kg - human}千克`,
        solution: `1. ${animal}重${kg}千克\n2. ${ch}重${human}千克\n3. 相差 = ${kg} - ${human} = ${kg - human}（千克）`,
        type: '动物体重',
      };
    },
    // 8. 装箱打包
    () => {
      const per = randInt(3, 6);
      const boxes = randInt(2, 5);
      const ch = c();
      return {
        content: `每箱装${per}千克苹果，${boxes}箱一共装了多少千克？合多少克？`,
        answer: `${per * boxes}千克，${per * boxes * 1000}克`,
        solution: `1. 每箱${per}千克\n2. ${boxes}箱 = ${per} × ${boxes} = ${per * boxes}（千克）\n3. 换算：${per * boxes} × 1000 = ${per * boxes * 1000}（克）`,
        type: '装箱打包',
      };
    },
    // 9. 粮食产量
    () => {
      const rice = randInt(200, 500);
      const wheat = randInt(100, 300);
      const ch = c();
      return {
        content: `农场收了${rice}千克大米和${wheat}千克小麦，大米比小麦多多少千克？`,
        answer: `${rice - wheat}千克`,
        solution: `1. 大米${rice}千克\n2. 小麦${wheat}千克\n3. 相差 = ${rice} - ${wheat} = ${rice - wheat}（千克）`,
        type: '粮食产量',
      };
    },
    // 10. 食材配比
    () => {
      const a = randInt(2, 5);
      const b = randInt(1, 3);
      const ch = c();
      return {
        content: `做一道菜需要${a}千克肉和${b}千克蔬菜，一共需要多少千克食材？`,
        answer: `${a + b}千克`,
        solution: `1. 肉${a}千克\n2. 蔬菜${b}千克\n3. 总重 = ${a} + ${b} = ${a + b}（千克）`,
        type: '食材配比',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第九章应用题：时分秒 ============

export function genAppCh9() {
  const templates = [
    // 1. 百米赛跑
    () => {
      const sec = randInt(15, 25);
      const diff = randInt(1, 5);
      const ch = c();
      const ch2 = c();
      return {
        content: `${ch}百米赛跑用了${sec}秒，${ch2}用了${sec + diff}秒，谁跑得快？快了几秒？`,
        answer: `${ch}快${diff}秒`,
        solution: `1. ${ch}：${sec}秒\n2. ${ch2}：${sec + diff}秒\n3. 用时少的跑得快，${ch}快\n4. 快了 ${sec + diff} - ${sec} = ${diff}秒`,
        type: '百米赛跑',
      };
    },
    // 2. 做题计时
    () => {
      const mins = randInt(10, 30);
      const sec = randInt(10, 50);
      const ch = c();
      return {
        content: `${ch}做口算题用了${mins}分${sec}秒，合多少秒？`,
        answer: `${mins * 60 + sec}秒`,
        solution: `1. ${mins}分 = ${mins} × 60 = ${mins * 60}秒\n2. 总共 = ${mins * 60} + ${sec} = ${mins * 60 + sec}（秒）`,
        type: '做题计时',
      };
    },
    // 3. 煮面时间
    () => {
      const mins = randInt(3, 8);
      const ch = c();
      return {
        content: `煮面条需要${mins}分钟，${ch}从12时${10}分开始煮，几时几分煮好？`,
        answer: `12时${10 + mins}分`,
        solution: `1. 开始：12时10分\n2. 煮${mins}分钟\n3. 做好 = 12时${10 + mins}分`,
        type: '煮面时间',
      };
    },
    // 4. 刷牙时间
    () => {
      const mins = pick([2, 3]);
      const ch = c();
      return {
        content: `${ch}每天刷牙${mins}分钟，一周（7天）刷牙一共多少分钟？`,
        answer: `${mins * 7}分钟`,
        solution: `1. 每天刷牙${mins}分钟\n2. 一周7天\n3. 总时间 = ${mins} × 7 = ${mins * 7}（分钟）`,
        type: '刷牙时间',
      };
    },
    // 5. 课间操时间
    () => {
      const mins = pick([15, 20, 25, 30]);
      const ch = c();
      return {
        content: `课间操从${9}时${30}分开始，做了${mins}分钟，几时几分结束？`,
        answer: `${9 + Math.floor((30 + mins) / 60)}时${(30 + mins) % 60}分`,
        solution: `1. 开始：9时30分\n2. 做了${mins}分钟\n3. 30 + ${mins} = ${30 + mins}分\n4. 结束 = ${9 + Math.floor((30 + mins) / 60)}时${(30 + mins) % 60}分`,
        type: '课间操',
      };
    },
    // 6. 跑步用时
    () => {
      const start = randInt(7, 8);
      const end = start + randInt(1, 2);
      const ch = c();
      return {
        content: `${ch}早上${start}时${30}分开始跑步，${end}时${30}分结束，跑了多少分钟？`,
        answer: `${(end - start) * 60}分钟`,
        solution: `1. 开始：${start}时30分\n2. 结束：${end}时30分\n3. 用时 = ${end}时 - ${start}时 = ${end - start}小时 = ${(end - start) * 60}分钟`,
        type: '跑步用时',
      };
    },
    // 7. 比赛用时
    () => {
      const a = randInt(20, 40);
      const b = a + randInt(2, 8);
      const ch = c();
      const ch2 = c();
      return {
        content: `${ch}跳绳用了${a}秒，${ch2}用了${b}秒，两人相差多少秒？`,
        answer: `${b - a}秒`,
        solution: `1. ${ch}：${a}秒\n2. ${ch2}：${b}秒\n3. 相差 = ${b} - ${a} = ${b - a}（秒）`,
        type: '比赛用时',
      };
    },
    // 8. 到达时间
    () => {
      const depH = randInt(8, 10);
      const durM = randInt(20, 50);
      const arrH = depH + Math.floor(durM / 60);
      const arrM = durM % 60;
      const ch = c();
      return {
        content: `${ch}${depH}时出发，走了${durM}分钟到达学校，几点几分到的？`,
        answer: `${arrH}时${arrM}分`,
        solution: `1. 出发：${depH}时\n2. 走了${durM}分钟 = ${Math.floor(durM / 60)}时${arrM}分\n3. 到达 = ${depH}时 + ${durM}分 = ${arrH}时${arrM}分`,
        type: '到达时间',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十章应用题：东南西北 ============

export function genAppCh10() {
  const templates = [
    // 1. 上学路线
    () => {
      const d1 = randInt(100, 400);
      const d2 = randInt(100, 300);
      const ch = c();
      return {
        content: `${ch}从家向北走了${d1}米到书店，再向东走了${d2}米到学校，一共走了多少米？`,
        answer: `${d1 + d2}米`,
        solution: `1. 家→书店：向北${d1}米\n2. 书店→学校：向东${d2}米\n3. 总路程 = ${d1} + ${d2} = ${d1 + d2}（米）`,
        type: '上学路线',
      };
    },
    // 2. 公园散步
    () => {
      const d1 = randInt(50, 200);
      const d2 = randInt(50, 200);
      const ch = c();
      return {
        content: `${ch}在公园先向南走了${d1}米，又向北走了${d2}米，离起点多少米？`,
        answer: `${Math.abs(d1 - d2)}米`,
        solution: `1. 向南${d1}米\n2. 向北${d2}米（南和北相反）\n3. 距离 = |${d1} - ${d2}| = ${Math.abs(d1 - d2)}（米）`,
        type: '公园散步',
      };
    },
    // 3. 寻宝地图
    () => {
      const d1 = randInt(200, 500);
      const d2 = randInt(100, 300);
      const ch = c();
      return {
        content: `宝藏地图显示：从大树向东走${d1}米，再向北走${d2}米，总共要走多少米？`,
        answer: `${d1 + d2}米`,
        solution: `1. 先向东${d1}米\n2. 再向北${d2}米\n3. 总路程 = ${d1} + ${d2} = ${d1 + d2}（米）`,
        type: '寻宝地图',
      };
    },
    // 4. 动物园游览
    () => {
      const places = ['熊猫馆', '猴子山', '大象园', '鸟语林'];
      const a = pick(places);
      const b = pick(places.filter(x => x !== a));
      return {
        content: `${a}在${b}的东边，那么${b}在${a}的什么方向？`,
        answer: '西边',
        solution: `1. 方向是相对的\n2. ${a}在${b}的东边\n3. 反过来，${b}在${a}的西边\n4. 东和西是相反方向`,
        type: '动物园游览',
      };
    },
    // 5. 操场方位
    () => {
      const dist = randInt(50, 200);
      const ch = c();
      return {
        content: `操场在教学楼南方${dist}米处，${ch}从教学楼去操场，要向什么方向走？`,
        answer: `向南走${dist}米`,
        solution: `1. 操场在教学楼南方${dist}米\n2. 从教学楼去操场\n3. 方向是南方，距离${dist}米`,
        type: '操场方位',
      };
    },
    // 6. 教室座位方向
    () => {
      const ch = c();
      return {
        content: `教室里黑板在北方，${ch}面向黑板站着，他的左边是什么方向？`,
        answer: '西方',
        solution: `1. 面向北方（黑板方向）\n2. 面北时：左边是西，右边是东\n3. 所以左边是西方`,
        type: '教室座位',
      };
    },
    // 7. 旅行路线
    () => {
      const d1 = randInt(100, 300);
      const d2 = randInt(100, 300);
      const d3 = randInt(100, 300);
      const ch = c();
      return {
        content: `${ch}从家向东走${d1}米到邮局，再向南走${d2}米到超市，再向西走${d3}米到公园，一共走了多少米？`,
        answer: `${d1 + d2 + d3}米`,
        solution: `1. 家→邮局：向东${d1}米\n2. 邮局→超市：向南${d2}米\n3. 超市→公园：向西${d3}米\n4. 总路程 = ${d1} + ${d2} + ${d3} = ${d1 + d2 + d3}（米）`,
        type: '旅行路线',
      };
    },
    // 8. 指南针方向
    () => {
      const ch = c();
      return {
        content: `指南针的红色指针指向北方，与它相反的方向是什么？`,
        answer: '南方',
        solution: `1. 指南针红色指针指向北方\n2. 相反方向是南方\n3. 北和南是相对的方向`,
        type: '指南针方向',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十一章应用题：轴对称 ============

export function genAppCh11() {
  const templates = [
    // 1. 判断对称——正方形
    () => {
      const ch = c();
      return {
        content: `${ch}说正方形是轴对称图形，有4条对称轴，对吗？`,
        answer: '对，4条',
        solution: `1. 正方形沿中线、对角线对折都能重合\n2. 横中线1条、竖中线1条\n3. 两条对角线各1条\n4. 共4条对称轴`,
        type: '判断对称',
      };
    },
    // 2. 剪纸对称
    () => {
      const shapes = ['蝴蝶', '爱心', '雪花'];
      const shape = pick(shapes);
      const ch = c();
      return {
        content: `${ch}剪了一个${shape}图案，沿着中线对折，两边能完全重合，这是什么图形性质？`,
        answer: '轴对称',
        solution: `1. 沿中线对折\n2. 两边完全重合\n3. 这就是轴对称的特征\n4. ${shape}是轴对称图形`,
        type: '剪纸对称',
      };
    },
    // 3. 蝴蝶翅膀
    () => {
      const ch = c();
      return {
        content: `${ch}观察蝴蝶，蝴蝶的左右翅膀是对称的吗？有几条对称轴？`,
        answer: '对称，1条',
        solution: `1. 蝴蝶左边翅膀和右边翅膀形状相同\n2. 沿身体中线对折两边重合\n3. 蝴蝶是轴对称图形\n4. 有1条对称轴（身体中线）`,
        type: '蝴蝶翅膀',
      };
    },
    // 4. 对称建筑
    () => {
      const ch = c();
      return {
        content: `${ch}看到天安门城楼是左右对称的，这种对称叫什么？`,
        answer: '轴对称',
        solution: `1. 天安门城楼左右两边形状相同\n2. 沿中线对折两边重合\n3. 这种性质叫轴对称\n4. 中线就是对称轴`,
        type: '对称建筑',
      };
    },
    // 5. 对称图形计数
    () => {
      const sym = randInt(2, 5);
      const noSym = randInt(1, 3);
      const ch = c();
      return {
        content: `下面有${sym}个轴对称图形和${noSym}个不是轴对称图形，一共有多少个图形？`,
        answer: `${sym + noSym}个`,
        solution: `1. 轴对称图形${sym}个\n2. 非轴对称图形${noSym}个\n3. 总数 = ${sym} + ${noSym} = ${sym + noSym}（个）`,
        type: '图形计数',
      };
    },
    // 6. 折纸验证
    () => {
      const shapes = ['等边三角形', '长方形', '圆'];
      const axes = [3, 2, '无数'];
      const i = randInt(0, 2);
      const ch = c();
      return {
        content: `${ch}用折纸方法验证了${shapes[i]}的对称轴数量，${shapes[i]}有几条对称轴？`,
        answer: `${axes[i]}条`,
        solution: `1. ${shapes[i]}的特征\n2. 通过折纸可以验证\n3. ${shapes[i]}有${axes[i]}条对称轴`,
        type: '折纸验证',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十二章应用题：三角形四边形 ============

export function genAppCh12() {
  const templates = [
    // 1. 围篱笆周长（三角形）
    () => {
      const a = randInt(3, 10);
      const b = randInt(3, 10);
      const c2 = randInt(Math.abs(a - b) + 1, a + b - 1);
      const ch = c();
      return {
        content: `一块三角形菜地，三条边分别是${a}米、${b}米、${c2}米，围一圈篱笆要多少米？`,
        answer: `${a + b + c2}米`,
        solution: `1. 三条边：${a}米、${b}米、${c2}米\n2. 周长 = 所有边之和\n3. ${a} + ${b} + ${c2} = ${a + b + c2}（米）`,
        type: '围篱笆',
      };
    },
    // 2. 图形分类
    () => {
      const tri = randInt(3, 8);
      const quad = randInt(2, 6);
      const ch = c();
      return {
        content: `${ch}画了${tri}个三角形和${quad}个四边形，一共画了多少个图形？`,
        answer: `${tri + quad}个`,
        solution: `1. 三角形${tri}个\n2. 四边形${quad}个\n3. 总数 = ${tri} + ${quad} = ${tri + quad}（个）`,
        type: '图形分类',
      };
    },
    // 3. 三角形判断
    () => {
      const a = randInt(3, 10);
      const b = randInt(3, 10);
      const c2 = randInt(3, 10);
      const valid = a + b > c2 && a + c2 > b && b + c2 > a;
      const ch = c();
      return {
        content: `${ch}用三根小棒分别长${a}厘米、${b}厘米、${c2}厘米，能围成三角形吗？`,
        answer: valid ? '能' : '不能',
        solution: `1. 三边：${a}cm、${b}cm、${c2}cm\n2. 三角形条件：任意两边之和大于第三边\n3. ${a}+${b}=${a + b} ${a + b > c2 ? '>' : '≤'}${c2}，${a}+${c2}=${a + c2} ${a + c2 > b ? '>' : '≤'}${b}，${b}+${c2}=${b + c2} ${b + c2 > a ? '>' : '≤'}${a}\n4. ${valid ? '能' : '不能'}围成三角形`,
        type: '三角形判断',
      };
    },
    // 4. 四边形特征
    () => {
      const shapes = ['正方形', '长方形', '平行四边形'];
      const s = pick(shapes);
      const ch = c();
      return {
        content: `${s}有几条边？几个角？它的对边有什么特点？`,
        answer: `4条边，4个角，对边相等`,
        solution: `1. ${s}是四边形\n2. 有4条边、4个角\n3. ${s}的对边相等`,
        type: '四边形特征',
      };
    },
    // 5. 拼图形
    () => {
      const a = randInt(2, 4);
      const b = randInt(1, 3);
      const ch = c();
      return {
        content: `${ch}用${a}个三角形和${b}个正方形拼图案，一共用了多少个图形？三角形比正方形多几个？`,
        answer: `共${a + b}个，多${a - b}个`,
        solution: `1. 三角形${a}个\n2. 正方形${b}个\n3. 总数 = ${a} + ${b} = ${a + b}（个）\n4. 多 = ${a} - ${b} = ${a - b}（个）`,
        type: '拼图形',
      };
    },
    // 6. 图形组合（周长）
    () => {
      const l = randInt(5, 12);
      const w = randInt(3, 8);
      const ch = c();
      return {
        content: `一个长方形花园，长${l}米，宽${w}米，沿着花园走一圈要走多少米？`,
        answer: `${2 * (l + w)}米`,
        solution: `1. 长${l}米，宽${w}米\n2. 走一圈 = 周长 = (长 + 宽) × 2\n3. (${l} + ${w}) × 2 = ${2 * (l + w)}（米）`,
        type: '图形组合',
      };
    },
    // 7. 画图形
    () => {
      const ch = c();
      return {
        content: `${ch}画了一个四边形，它有4条边和4个角，如果它的4条边都相等，可能是什么图形？`,
        answer: '正方形或菱形',
        solution: `1. 四边形有4条边、4个角\n2. 4条边都相等\n3. 可能是正方形（4个直角）或菱形（非直角）`,
        type: '画图形',
      };
    },
    // 8. 图形周长计算
    () => {
      const a = randInt(5, 12);
      const b = randInt(5, 12);
      const c2 = randInt(5, 12);
      const d = randInt(5, 12);
      const ch = c();
      return {
        content: `一个四边形四条边分别长${a}厘米、${b}厘米、${c2}厘米、${d}厘米，周长是多少？`,
        answer: `${a + b + c2 + d}厘米`,
        solution: `1. 四条边：${a}cm、${b}cm、${c2}cm、${d}cm\n2. 周长 = 所有边之和\n3. ${a} + ${b} + ${c2} + ${d} = ${a + b + c2 + d}（厘米）`,
        type: '周长计算',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 连乘连除应用题 ============

export function genAppMulDivChain() {
  const templates = [
    // 1. 分层分配
    () => {
      const total = randInt(24, 72);
      const a = randInt(2, 4);
      const b = randInt(2, 4);
      if (total % (a * b) !== 0) return genAppMulDivChain();
      const ch = c();
      return {
        content: `${total}个苹果平均分给${a}个班，每班再平均分给${b}个小组，每组分到几个？`,
        answer: String(total / a / b),
        solution: `1. 共${total}个苹果\n2. 先分给${a}个班：${total} ÷ ${a} = ${total / a}（个/班）\n3. 每班分给${b}个组：${total / a} ÷ ${b} = ${total / a / b}（个/组）`,
        type: '分层分配',
      };
    },
    // 2. 分组计算
    () => {
      const a = randInt(2, 5);
      const b = randInt(2, 4);
      const c2 = randInt(2, 3);
      const ch = c();
      return {
        content: `每组${a}人，每${b}组一队，${c2}队一共有多少人？`,
        answer: String(a * b * c2),
        solution: `1. 每组${a}人\n2. 每${b}组一队：${a} × ${b} = ${a * b}（人/队）\n3. ${c2}队：${a * b} × ${c2} = ${a * b * c2}（人）`,
        type: '分组计算',
      };
    },
    // 3. 多步购物
    () => {
      const price = randInt(3, 6);
      const count = randInt(2, 4);
      const extra = randInt(5, 15);
      const ch = c();
      return {
        content: `${ch}买了${count}盒饼干每盒${price}元，又买了${extra}元的水果，一共花了多少钱？`,
        answer: `${price * count + extra}元`,
        solution: `1. 饼干：${price} × ${count} = ${price * count}（元）\n2. 水果：${extra}元\n3. 总价 = ${price * count} + ${extra} = ${price * count + extra}（元）`,
        type: '多步购物',
      };
    },
    // 4. 鸡蛋装箱
    () => {
      const perBox = randInt(6, 10);
      const boxes = randInt(3, 5);
      const total = perBox * boxes;
      const sold = randInt(10, 20);
      const ch = c();
      return {
        content: `养鸡场有${boxes}箱鸡蛋，每箱${perBox}个，卖掉了${sold}个，还剩多少个？`,
        answer: `${total - sold}个`,
        solution: `1. 总鸡蛋 = ${perBox} × ${boxes} = ${total}（个）\n2. 卖掉${sold}个\n3. 剩余 = ${total} - ${sold} = ${total - sold}（个）`,
        type: '鸡蛋装箱',
      };
    },
    // 5. 楼层窗户
    () => {
      const floors = randInt(3, 5);
      const rooms = randInt(3, 6);
      const windows = randInt(2, 3);
      const ch = c();
      return {
        content: `一栋${floors}层的楼，每层${rooms}间教室，每间教室${windows}扇窗户，一共有多少扇窗户？`,
        answer: `${floors * rooms * windows}扇`,
        solution: `1. ${floors}层\n2. 每层${rooms}间教室\n3. 每间${windows}扇窗\n4. 总窗户 = ${floors} × ${rooms} × ${windows} = ${floors * rooms * windows}（扇）`,
        type: '楼层窗户',
      };
    },
    // 6. 图书馆书架
    () => {
      const shelves = randInt(3, 5);
      const perShelf = randInt(4, 8);
      const perRow = randInt(6, 10);
      const ch = c();
      return {
        content: `图书馆有${shelves}个书架，每个书架有${perShelf}层，每层放${perRow}本书，一共有多少本书？`,
        answer: `${shelves * perShelf * perRow}本`,
        solution: `1. ${shelves}个书架\n2. 每架${perShelf}层\n3. 每层${perRow}本\n4. 总数 = ${shelves} × ${perShelf} × ${perRow} = ${shelves * perShelf * perRow}（本）`,
        type: '图书馆书架',
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}
