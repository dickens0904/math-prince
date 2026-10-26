// 三年级综合应用题 - 沪教版2024新教材
// 角色库：算算猫🐱、智慧龙🐉、企鹅博士🐧、小熊老师🐻、机灵狐🦊、猫头鹰🦉、小兔子🐰、小青蛙🐸、小鸭子🐥、小金鱼🐟、小猴子🐒
// 场景库：购物、学校、旅行、工程、科学、运动、自然
// 后续章节综合前面知识点

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// ============ 第一章应用题：两步四则运算 ============
// 模板数：15个
// 场景：超市购物、运动会得分、图书馆借还书、农场动物、做蛋糕配料、旅行路程、种树浇水、养蚕记录、科学实验、搭积木、合唱团人数、邮票收集、存钱买玩具、游乐园、看电影

export function genAppCh1() {
  const templates = [
    // 1. 超市购物两步计算
    () => {
      const price1 = randInt(5, 15);
      const price2 = randInt(8, 20);
      const count = randInt(2, 5);
      return {
        content: `算算猫🐱去超市买了一个${price1}元的文具盒和${count}本笔记本，每本${price2}元，一共花了多少钱？`,
        answer: String(price1 + price2 * count),
        solution: `1. 文具盒${price1}元\n2. 笔记本${count}本，每本${price2}元\n3. 笔记本总价 = ${price2} × ${count} = ${price2 * count}（元）\n4. 总花费 = 文具盒 + 笔记本\n5. ${price1} + ${price2 * count} = ${price1 + price2 * count}（元）`,
        type: '超市购物',
        difficulty: 2,
      };
    },
    // 2. 运动会得分
    () => {
      const score1 = randInt(8, 15);
      const score2 = randInt(10, 18);
      const score3 = randInt(5, 12);
      return {
        content: `运动会上，智慧龙🐉跳绳得了${score1}分，踢毽子得了${score2}分，拍皮球得了${score3}分，智慧龙一共得了多少分？`,
        answer: String(score1 + score2 + score3),
        solution: `1. 跳绳得了${score1}分\n2. 踢毽子得了${score2}分\n3. 拍皮球得了${score3}分\n4. 总分 = 跳绳 + 踢毽子 + 拍皮球\n5. ${score1} + ${score2} + ${score3} = ${score1 + score2 + score3}（分）`,
        type: '运动会得分',
        difficulty: 2,
      };
    },
    // 3. 图书馆借还书
    () => {
      const have = randInt(25, 45);
      const borrow = randInt(8, 15);
      const back = randInt(3, borrow);
      return {
        content: `企鹅博士🐧的书架上有${have}本书，借给同学${borrow}本，同学又还回来${back}本，现在书架上有多少本书？`,
        answer: String(have - borrow + back),
        solution: `1. 原来有${have}本书\n2. 借出${borrow}本\n3. 还回来${back}本\n4. 现在数量 = 原来 - 借出 + 还回\n5. ${have} - ${borrow} + ${back} = ${have - borrow + back}（本）`,
        type: '图书馆借还',
        difficulty: 2,
      };
    },
    // 4. 农场动物
    () => {
      const chicken = randInt(15, 30);
      const duck = randInt(8, 15);
      const goose = randInt(3, 8);
      return {
        content: `小熊老师🐻的农场里有${chicken}只鸡，鸭比鸡少${duck}只，鹅比鸭少${goose}只，农场里有多少只鹅？`,
        answer: String(chicken - duck - goose),
        solution: `1. 鸡有${chicken}只\n2. 鸭比鸡少${duck}只，鸭 = ${chicken} - ${duck} = ${chicken - duck}（只）\n3. 鹅比鸭少${goose}只，鹅 = ${chicken - duck} - ${goose} = ${chicken - duck - goose}（只）`,
        type: '农场动物',
        difficulty: 2,
      };
    },
    // 5. 做蛋糕配料
    () => {
      const flour = randInt(2, 5);
      const flourPer = randInt(100, 200);
      const sugar = randInt(2, 4);
      const sugarPer = randInt(50, 100);
      return {
        content: `机灵狐🦊做蛋糕，需要${flour}袋面粉，每袋${flourPer}克，还有${sugar}袋糖，每袋${sugarPer}克，面粉和糖一共多少克？`,
        answer: String(flour * flourPer + sugar * sugarPer),
        solution: `1. 面粉：${flour}袋 × ${flourPer}克 = ${flour * flourPer}（克）\n2. 糖：${sugar}袋 × ${sugarPer}克 = ${sugar * sugarPer}（克）\n3. 总重 = 面粉 + 糖\n4. ${flour * flourPer} + ${sugar * sugarPer} = ${flour * flourPer + sugar * sugarPer}（克）`,
        type: '做蛋糕',
        difficulty: 2,
      };
    },
    // 6. 旅行路程
    () => {
      const d1 = randInt(120, 300);
      const d2 = randInt(80, 200);
      return {
        content: `猫头鹰🦉去旅行，第一天走了${d1}千米，第二天比第一天少走${d2}千米，两天一共走了多少千米？`,
        answer: String(d1 + (d1 - d2)),
        solution: `1. 第一天走了${d1}千米\n2. 第二天比第一天少${d2}千米\n3. 第二天 = ${d1} - ${d2} = ${d1 - d2}（千米）\n4. 两天总路程 = ${d1} + ${d1 - d2} = ${d1 + d1 - d2}（千米）`,
        type: '旅行路程',
        difficulty: 2,
      };
    },
    // 7. 种树浇水
    () => {
      const row = randInt(3, 6);
      const perRow = randInt(5, 10);
      const water = randInt(3, 8);
      return {
        content: `小兔子🐰种了${row}排树，每排${perRow}棵，今天已经浇了${water}棵，还有多少棵没浇水？`,
        answer: String(row * perRow - water),
        solution: `1. 种了${row}排，每排${perRow}棵\n2. 总共种了 = ${row} × ${perRow} = ${row * perRow}（棵）\n3. 已浇水${water}棵\n4. 没浇水 = 总数 - 已浇\n5. ${row * perRow} - ${water} = ${row * perRow - water}（棵）`,
        type: '种树浇水',
        difficulty: 2,
      };
    },
    // 8. 养蚕记录
    () => {
      const total = randInt(30, 60);
      const eat1 = randInt(5, 15);
      const eat2 = randInt(5, 15);
      return {
        content: `小青蛙🐸养了${total}条蚕宝宝，第一天吃了${eat1}片桑叶，第二天吃了${eat2}片桑叶，还剩多少片桑叶？（原来有${total + eat1 + eat2}片桑叶）`,
        answer: String(total),
        solution: `1. 原来有${total + eat1 + eat2}片桑叶\n2. 第一天吃了${eat1}片\n3. 第二天吃了${eat2}片\n4. 剩余 = ${total + eat1 + eat2} - ${eat1} - ${eat2} = ${total}（片）`,
        type: '养蚕记录',
        difficulty: 2,
      };
    },
    // 9. 科学实验
    () => {
      const water1 = randInt(100, 300);
      const water2 = randInt(50, 200);
      const evap = randInt(30, 80);
      return {
        content: `小鸭子🐥做科学实验，第一个杯子里有${water1}毫升水，第二个杯子里有${water2}毫升水，倒在一起后蒸发了${evap}毫升，还剩多少毫升水？`,
        answer: String(water1 + water2 - evap),
        solution: `1. 第一个杯子${water1}毫升\n2. 第二个杯子${water2}毫升\n3. 倒在一起 = ${water1} + ${water2} = ${water1 + water2}（毫升）\n4. 蒸发了${evap}毫升\n5. 剩余 = ${water1 + water2} - ${evap} = ${water1 + water2 - evap}（毫升）`,
        type: '科学实验',
        difficulty: 2,
      };
    },
    // 10. 搭积木
    () => {
      const layer = randInt(3, 7);
      const perLayer = randInt(4, 8);
      const used = randInt(5, 15);
      return {
        content: `小金鱼🐟要搭${layer}层积木塔，每层需要${perLayer}块积木，已经用了${used}块，还需要多少块积木？`,
        answer: String(layer * perLayer - used),
        solution: `1. 要搭${layer}层，每层${perLayer}块\n2. 一共需要 = ${layer} × ${perLayer} = ${layer * perLayer}（块）\n3. 已经用了${used}块\n4. 还需要 = ${layer * perLayer} - ${used} = ${layer * perLayer - used}（块）`,
        type: '搭积木',
        difficulty: 2,
      };
    },
    // 11. 合唱团人数
    () => {
      const boy = randInt(12, 20);
      const girl = randInt(15, 25);
      const row = randInt(4, 8);
      return {
        content: `小猴子🐒参加合唱团，男生有${boy}人，女生有${girl}人，如果每排站${row}人，能站满几排？还多几人？`,
        answer: `站满${Math.floor((boy + girl) / row)}排，多${(boy + girl) % row}人`,
        solution: `1. 男生${boy}人，女生${girl}人\n2. 总人数 = ${boy} + ${girl} = ${boy + girl}（人）\n3. 每排${row}人\n4. 排数 = ${boy + girl} ÷ ${row} = ${Math.floor((boy + girl) / row)}排……${(boy + girl) % row}人`,
        type: '合唱团',
        difficulty: 2,
      };
    },
    // 12. 邮票收集
    () => {
      const have = randInt(30, 60);
      const get = randInt(10, 25);
      const give = randInt(5, 15);
      return {
        content: `算算猫🐱收集了${have}张邮票，又得到了${get}张，送给了智慧龙🐉${give}张，算算猫现在有多少张邮票？`,
        answer: String(have + get - give),
        solution: `1. 原来有${have}张邮票\n2. 又得到${get}张\n3. 送给智慧龙${give}张\n4. 现在 = 原来 + 得到 - 送出\n5. ${have} + ${get} - ${give} = ${have + get - give}（张）`,
        type: '邮票收集',
        difficulty: 2,
      };
    },
    // 13. 存钱买玩具
    () => {
      const toy = randInt(40, 80);
      const save1 = randInt(15, 25);
      const save2 = randInt(10, 20);
      return {
        content: `企鹅博士🐧想买一个${toy}元的玩具，第一个月存了${save1}元，第二个月存了${save2}元，还需要存多少元？`,
        answer: String(toy - save1 - save2),
        solution: `1. 玩具价格${toy}元\n2. 第一个月存了${save1}元\n3. 第二个月存了${save2}元\n4. 已存 = ${save1} + ${save2} = ${save1 + save2}（元）\n5. 还需要 = ${toy} - ${save1 + save2} = ${toy - save1 - save2}（元）`,
        type: '存钱买玩具',
        difficulty: 2,
      };
    },
    // 14. 游乐园
    () => {
      const ticket = randInt(15, 30);
      const people = randInt(3, 6);
      const food = randInt(20, 40);
      return {
        content: `小熊老师🐻带${people}个小朋友去游乐园，门票每人${ticket}元，买零食花了${food}元，一共花了多少钱？`,
        answer: String(ticket * people + food),
        solution: `1. ${people}个人，门票每人${ticket}元\n2. 门票总价 = ${ticket} × ${people} = ${ticket * people}（元）\n3. 零食${food}元\n4. 总花费 = 门票 + 零食\n5. ${ticket * people} + ${food} = ${ticket * people + food}（元）`,
        type: '游乐园',
        difficulty: 2,
      };
    },
    // 15. 看电影
    () => {
      const total = randInt(40, 50);
      const row1 = randInt(5, 10);
      const row2 = randInt(5, 10);
      const row3 = randInt(5, 10);
      return {
        content: `机灵狐🦊和朋友们去看电影，剧场有${total}个座位，第一排坐了${row1}人，第二排坐了${row2}人，第三排坐了${row3}人，剧场还剩多少个空座位？`,
        answer: String(total - row1 - row2 - row3),
        solution: `1. 剧场有${total}个座位\n2. 第一排坐了${row1}人\n3. 第二排坐了${row2}人\n4. 第三排坐了${row3}人\n5. 已坐 = ${row1} + ${row2} + ${row3} = ${row1 + row2 + row3}（人）\n6. 空座 = ${total} - ${row1 + row2 + row3} = ${total - row1 - row2 - row3}（个）`,
        type: '看电影',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第二章应用题：一位数乘整十整百数 ============
// 模板数：12个
// 场景：买套装文具、动物园门票、停车场、体育馆座位、快递打包、电影院座位、图书捐赠、鸡蛋装箱、操场站队、工厂生产、超市货架、邮票册

export function genAppCh2() {
  const templates = [
    // 1. 买套装文具
    () => {
      const price = pick([20, 30, 40, 50]);
      const count = randInt(3, 8);
      return {
        content: `算算猫🐱买套装文具，每套${price}元，买了${count}套，一共花了多少钱？`,
        answer: String(price * count),
        solution: `1. 每套文具${price}元\n2. 买了${count}套\n3. 总价 = 单价 × 数量\n4. ${price} × ${count} = ${price * count}（元）`,
        type: '买套装文具',
        difficulty: 1,
      };
    },
    // 2. 动物园门票
    () => {
      const price = pick([20, 30, 40, 50]);
      const count = randInt(4, 9);
      return {
        content: `智慧龙🐉带朋友们去动物园，门票每张${price}元，买了${count}张门票，一共花了多少钱？`,
        answer: String(price * count),
        solution: `1. 门票每张${price}元\n2. 买了${count}张\n3. 总价 = 每张价格 × 张数\n4. ${price} × ${count} = ${price * count}（元）`,
        type: '动物园门票',
        difficulty: 1,
      };
    },
    // 3. 停车场
    () => {
      const perRow = pick([10, 20, 30]);
      const rows = randInt(3, 9);
      return {
        content: `企鹅博士🐧看到一个停车场，每排停${perRow}辆车，一共有${rows}排，这个停车场最多能停多少辆车？`,
        answer: String(perRow * rows),
        solution: `1. 每排停${perRow}辆车\n2. 一共有${rows}排\n3. 总数 = 每排数量 × 排数\n4. ${perRow} × ${rows} = ${perRow * rows}（辆）`,
        type: '停车场',
        difficulty: 1,
      };
    },
    // 4. 体育馆座位
    () => {
      const perSection = pick([100, 200, 300]);
      const sections = randInt(3, 8);
      return {
        content: `小熊老师🐻去体育馆看比赛，看台有${sections}个区，每个区有${perSection}个座位，体育馆一共有多少个座位？`,
        answer: String(perSection * sections),
        solution: `1. ${sections}个区\n2. 每个区${perSection}个座位\n3. 总座位 = 区数 × 每区座位\n4. ${sections} × ${perSection} = ${perSection * sections}（个）`,
        type: '体育馆座位',
        difficulty: 1,
      };
    },
    // 5. 快递打包
    () => {
      const perBox = pick([10, 20, 30, 40, 50]);
      const boxes = randInt(3, 9);
      return {
        content: `机灵狐🦊帮忙打包快递，每个箱子装${perBox}件物品，装了${boxes}箱，一共打包了多少件物品？`,
        answer: String(perBox * boxes),
        solution: `1. 每箱装${perBox}件\n2. 装了${boxes}箱\n3. 总件数 = 每箱件数 × 箱数\n4. ${perBox} × ${boxes} = ${perBox * boxes}（件）`,
        type: '快递打包',
        difficulty: 1,
      };
    },
    // 6. 电影院座位
    () => {
      const perRow = pick([10, 20, 30]);
      const rows = randInt(5, 9);
      return {
        content: `猫头鹰🦉去电影院看电影，每排有${perRow}个座位，一共有${rows}排，这个放映厅能坐多少人？`,
        answer: String(perRow * rows),
        solution: `1. 每排${perRow}个座位\n2. ${rows}排\n3. 总座位 = 每排座位 × 排数\n4. ${perRow} × ${rows} = ${perRow * rows}（个）`,
        type: '电影院座位',
        difficulty: 1,
      };
    },
    // 7. 图书捐赠
    () => {
      const perClass = pick([30, 40, 50]);
      const classes = randInt(4, 8);
      return {
        content: `小兔子🐰参加图书捐赠活动，每班捐${perClass}本书，${classes}个班一共捐了多少本书？`,
        answer: String(perClass * classes),
        solution: `1. 每班捐${perClass}本\n2. ${classes}个班\n3. 总数 = 每班数量 × 班级数\n4. ${perClass} × ${classes} = ${perClass * classes}（本）`,
        type: '图书捐赠',
        difficulty: 1,
      };
    },
    // 8. 鸡蛋装箱
    () => {
      const perBox = pick([10, 20, 30]);
      const boxes = randInt(3, 8);
      return {
        content: `小青蛙🐸帮农场装鸡蛋，每箱装${perBox}个鸡蛋，装了${boxes}箱，一共装了多少个鸡蛋？`,
        answer: String(perBox * boxes),
        solution: `1. 每箱${perBox}个鸡蛋\n2. 装了${boxes}箱\n3. 总数 = 每箱数量 × 箱数\n4. ${perBox} × ${boxes} = ${perBox * boxes}（个）`,
        type: '鸡蛋装箱',
        difficulty: 1,
      };
    },
    // 9. 操场站队
    () => {
      const perRow = pick([10, 20, 30]);
      const rows = randInt(3, 9);
      return {
        content: `小鸭子🐥在操场上站队，每排站${perRow}人，站了${rows}排，操场上一共有多少人？`,
        answer: String(perRow * rows),
        solution: `1. 每排站${perRow}人\n2. 站了${rows}排\n3. 总人数 = 每排人数 × 排数\n4. ${perRow} × ${rows} = ${perRow * rows}（人）`,
        type: '操场站队',
        difficulty: 1,
      };
    },
    // 10. 工厂生产
    () => {
      const perMachine = pick([100, 200, 300]);
      const machines = randInt(3, 8);
      return {
        content: `小金鱼🐟参观工厂，每台机器每天生产${perMachine}个零件，${machines}台机器一天能生产多少个零件？`,
        answer: String(perMachine * machines),
        solution: `1. 每台机器每天生产${perMachine}个\n2. 有${machines}台机器\n3. 总产量 = 每台产量 × 机器数\n4. ${perMachine} × ${machines} = ${perMachine * machines}（个）`,
        type: '工厂生产',
        difficulty: 1,
      };
    },
    // 11. 超市货架
    () => {
      const perShelf = pick([10, 20, 30]);
      const shelves = randInt(4, 9);
      return {
        content: `小猴子🐒逛超市，每层货架摆了${perShelf}瓶饮料，一共有${shelves}层货架，超市一共有多少瓶饮料？`,
        answer: String(perShelf * shelves),
        solution: `1. 每层摆${perShelf}瓶\n2. ${shelves}层货架\n3. 总瓶数 = 每层数量 × 层数\n4. ${perShelf} × ${shelves} = ${perShelf * shelves}（瓶）`,
        type: '超市货架',
        difficulty: 1,
      };
    },
    // 12. 邮票册
    () => {
      const perPage = pick([10, 20, 30]);
      const pages = randInt(3, 9);
      return {
        content: `算算猫🐱有一本邮票册，每页放${perPage}张邮票，已经放满了${pages}页，邮票册里一共有多少张邮票？`,
        answer: String(perPage * pages),
        solution: `1. 每页放${perPage}张邮票\n2. 放满了${pages}页\n3. 总数 = 每页数量 × 页数\n4. ${perPage} × ${pages} = ${perPage * pages}（张）`,
        type: '邮票册',
        difficulty: 1,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第三章应用题：长方形和正方形 ============
// 模板数：12个
// 场景：围篱笆、画框周长、花坛面积、桌面周长、操场跑道、地砖面积、手帕周长、黑板面积、窗户面积、围栏长度、书本封面、贺卡制作

export function genAppCh3() {
  const templates = [
    // 1. 围篱笆
    () => {
      const l = randInt(8, 20);
      const w = randInt(5, 12);
      return {
        content: `智慧龙🐉有一块长方形菜地，长${l}米，宽${w}米，四周围上篱笆，篱笆长多少米？`,
        answer: String(2 * (l + w)) + '米',
        solution: `1. 菜地长${l}米，宽${w}米\n2. 围篱笆就是求周长\n3. 长方形周长 = (长 + 宽) × 2\n4. (${l} + ${w}) × 2 = ${l + w} × 2 = ${2 * (l + w)}（米）`,
        type: '围篱笆',
        difficulty: 2,
      };
    },
    // 2. 画框周长
    () => {
      const l = randInt(20, 40);
      const w = randInt(15, 25);
      return {
        content: `企鹅博士🐧画了一幅画，长${l}厘米，宽${w}厘米，要做一个画框，至少需要多长的木条？`,
        answer: String(2 * (l + w)) + '厘米',
        solution: `1. 画长${l}厘米，宽${w}厘米\n2. 做画框就是求周长\n3. 周长 = (长 + 宽) × 2\n4. (${l} + ${w}) × 2 = ${l + w} × 2 = ${2 * (l + w)}（厘米）`,
        type: '画框周长',
        difficulty: 2,
      };
    },
    // 3. 花坛面积
    () => {
      const s = randInt(4, 10);
      return {
        content: `小熊老师🐻的学校有一个正方形花坛，边长${s}米，花坛的面积是多少平方米？`,
        answer: String(s * s) + '平方米',
        solution: `1. 花坛是正方形，边长${s}米\n2. 正方形面积 = 边长 × 边长\n3. ${s} × ${s} = ${s * s}（平方米）`,
        type: '花坛面积',
        difficulty: 2,
      };
    },
    // 4. 桌面周长
    () => {
      const l = randInt(10, 20);
      const w = randInt(6, 12);
      return {
        content: `机灵狐🦊的书桌是长方形的，长${l}分米，宽${w}分米，桌面的周长是多少分米？`,
        answer: String(2 * (l + w)) + '分米',
        solution: `1. 书桌长${l}分米，宽${w}分米\n2. 长方形周长 = (长 + 宽) × 2\n3. (${l} + ${w}) × 2 = ${l + w} × 2 = ${2 * (l + w)}（分米）`,
        type: '桌面周长',
        difficulty: 2,
      };
    },
    // 5. 操场跑道
    () => {
      const s = randInt(30, 60);
      return {
        content: `猫头鹰🦉学校的操场是正方形的，边长${s}米，小猫头鹰沿操场跑了一圈，跑了多少米？`,
        answer: String(4 * s) + '米',
        solution: `1. 操场是正方形，边长${s}米\n2. 跑一圈就是求周长\n3. 正方形周长 = 边长 × 4\n4. ${s} × 4 = ${4 * s}（米）`,
        type: '操场跑道',
        difficulty: 1,
      };
    },
    // 6. 地砖面积
    () => {
      const s = randInt(2, 5);
      return {
        content: `小兔子🐰装修房间，正方形地砖的边长是${s}分米，一块地砖的面积是多少平方分米？`,
        answer: String(s * s) + '平方分米',
        solution: `1. 地砖是正方形，边长${s}分米\n2. 面积 = 边长 × 边长\n3. ${s} × ${s} = ${s * s}（平方分米）`,
        type: '地砖面积',
        difficulty: 2,
      };
    },
    // 7. 手帕周长
    () => {
      const s = randInt(2, 5);
      return {
        content: `小青蛙🐸有一块正方形手帕，边长${s}分米，手帕的周长是多少分米？`,
        answer: String(4 * s) + '分米',
        solution: `1. 手帕是正方形，边长${s}分米\n2. 正方形周长 = 边长 × 4\n3. ${s} × 4 = ${4 * s}（分米）`,
        type: '手帕周长',
        difficulty: 1,
      };
    },
    // 8. 黑板面积
    () => {
      const l = randInt(3, 6);
      const w = randInt(1, 3);
      return {
        content: `小鸭子🐥教室里的黑板是长方形的，长${l}米，宽${w}米，黑板的面积是多少平方米？`,
        answer: String(l * w) + '平方米',
        solution: `1. 黑板长${l}米，宽${w}米\n2. 长方形面积 = 长 × 宽\n3. ${l} × ${w} = ${l * w}（平方米）`,
        type: '黑板面积',
        difficulty: 2,
      };
    },
    // 9. 窗户面积
    () => {
      const l = randInt(10, 20);
      const w = randInt(8, 15);
      return {
        content: `小金鱼🐟家的窗户是长方形的，长${l}分米，宽${w}分米，窗户的面积是多少平方分米？`,
        answer: String(l * w) + '平方分米',
        solution: `1. 窗户长${l}分米，宽${w}分米\n2. 面积 = 长 × 宽\n3. ${l} × ${w} = ${l * w}（平方分米）`,
        type: '窗户面积',
        difficulty: 2,
      };
    },
    // 10. 围栏长度
    () => {
      const l = randInt(15, 30);
      const w = randInt(8, 15);
      const gate = randInt(2, 5);
      return {
        content: `小猴子🐒的花园长${l}米，宽${w}米，四周围上围栏，但留了一扇${gate}米宽的门不用围，围栏一共长多少米？`,
        answer: String(2 * (l + w) - gate) + '米',
        solution: `1. 花园长${l}米，宽${w}米\n2. 总周长 = (${l} + ${w}) × 2 = ${2 * (l + w)}（米）\n3. 门宽${gate}米，不用围\n4. 围栏长度 = 周长 - 门宽\n5. ${2 * (l + w)} - ${gate} = ${2 * (l + w) - gate}（米）`,
        type: '围栏长度',
        difficulty: 2,
      };
    },
    // 11. 书本封面
    () => {
      const l = randInt(20, 30);
      const w = randInt(14, 20);
      return {
        content: `算算猫🐱的一本书封面是长方形的，长${l}厘米，宽${w}厘米，封面的周长和面积分别是多少？`,
        answer: `周长${2 * (l + w)}厘米,面积${l * w}平方厘米`,
        solution: `1. 书封面长${l}厘米，宽${w}厘米\n2. 周长 = (${l} + ${w}) × 2 = ${l + w} × 2 = ${2 * (l + w)}（厘米）\n3. 面积 = ${l} × ${w} = ${l * w}（平方厘米）`,
        type: '书本封面',
        difficulty: 2,
      };
    },
    // 12. 贺卡制作
    () => {
      const bigL = randInt(20, 30);
      const bigW = randInt(15, 20);
      const smallL = randInt(8, 12);
      const smallW = randInt(5, 8);
      return {
        content: `智慧龙🐉做贺卡，大长方形纸长${bigL}厘米宽${bigW}厘米，贴了一张小长方形纸长${smallL}厘米宽${smallW}厘米，露在外面的纸面积是多少平方厘米？`,
        answer: String(bigL * bigW - smallL * smallW) + '平方厘米',
        solution: `1. 大纸面积 = ${bigL} × ${bigW} = ${bigL * bigW}（平方厘米）\n2. 小纸面积 = ${smallL} × ${smallW} = ${smallL * smallW}（平方厘米）\n3. 露在外面 = 大纸面积 - 小纸面积\n4. ${bigL * bigW} - ${smallL * smallW} = ${bigL * bigW - smallL * smallW}（平方厘米）`,
        type: '贺卡制作',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第四章应用题：分数的初步认识 ============
// 模板数：10个
// 场景：分蛋糕、分披萨、分巧克力、分果汁、分水果、吃月饼、涂色、填分数、比大小、分饼干

export function genAppCh4() {
  const templates = [
    // 1. 分蛋糕
    () => {
      const den = pick([4, 6, 8]);
      const num1 = randInt(1, den - 2);
      const num2 = randInt(1, den - num1 - 1);
      return {
        content: `企鹅博士🐧的生日蛋糕平均分成${den}份，企鹅博士吃了${num1}份，算算猫🐱吃了${num2}份，他们一共吃了这个蛋糕的几分之几？`,
        answer: `${num1 + num2}/${den}`,
        solution: `1. 蛋糕平均分成${den}份\n2. 企鹅博士吃了${num1}份，即${num1}/${den}\n3. 算算猫吃了${num2}份，即${num2}/${den}\n4. 一共吃了 = ${num1}/${den} + ${num2}/${den} = ${num1 + num2}/${den}`,
        type: '分蛋糕',
        difficulty: 2,
      };
    },
    // 2. 分披萨
    () => {
      const den = pick([4, 6, 8]);
      const eaten = randInt(1, den - 2);
      const left = den - eaten;
      return {
        content: `一个披萨平均分成${den}块，智慧龙🐉吃了${eaten}块，还剩几分之几没吃？`,
        answer: `${left}/${den}`,
        solution: `1. 披萨平均分成${den}块\n2. 智慧龙吃了${eaten}块，即${eaten}/${den}\n3. 剩余 = 1 - ${eaten}/${den} = ${den}/${den} - ${eaten}/${den} = ${left}/${den}`,
        type: '分披萨',
        difficulty: 2,
      };
    },
    // 3. 分巧克力
    () => {
      const den = pick([6, 8, 10]);
      const a = randInt(2, den - 2);
      const b = randInt(1, a - 1);
      return {
        content: `一块巧克力平均分成${den}份，小熊老师🐻吃了${a}份，机灵狐🦊吃了${b}份，小熊老师比机灵狐多吃这块巧克力的几分之几？`,
        answer: `${a - b}/${den}`,
        solution: `1. 巧克力平均分成${den}份\n2. 小熊老师吃了${a}/${den}\n3. 机灵狐吃了${b}/${den}\n4. 多吃的 = ${a}/${den} - ${b}/${den} = ${a - b}/${den}`,
        type: '分巧克力',
        difficulty: 2,
      };
    },
    // 4. 分果汁
    () => {
      const den = pick([4, 6, 8]);
      const morning = randInt(1, den - 2);
      const afternoon = randInt(1, den - morning);
      return {
        content: `一瓶果汁平均分成${den}份，猫头鹰🦉上午喝了${morning}份，下午喝了${afternoon}份，这瓶果汁还剩几分之几？`,
        answer: `${den - morning - afternoon}/${den}`,
        solution: `1. 果汁平均分成${den}份\n2. 上午喝了${morning}/${den}\n3. 下午喝了${afternoon}/${den}\n4. 剩余 = 1 - ${morning}/${den} - ${afternoon}/${den} = ${den - morning - afternoon}/${den}`,
        type: '分果汁',
        difficulty: 2,
      };
    },
    // 5. 分水果
    () => {
      const den = pick([5, 6, 10]);
      const apple = randInt(1, den - 2);
      const orange = randInt(1, den - apple - 1);
      return {
        content: `一篮水果平均分成${den}份，小兔子🐰拿了${apple}份苹果，小青蛙🐸拿了${orange}份橘子，他们一共拿了几分之几？还剩几分之几？`,
        answer: `拿了${apple + orange}/${den},剩${den - apple - orange}/${den}`,
        solution: `1. 水果平均分成${den}份\n2. 小兔子拿了${apple}/${den}\n3. 小青蛙拿了${orange}/${den}\n4. 一共拿了 = ${apple}/${den} + ${orange}/${den} = ${apple + orange}/${den}\n5. 剩余 = 1 - ${apple + orange}/${den} = ${den - apple - orange}/${den}`,
        type: '分水果',
        difficulty: 2,
      };
    },
    // 6. 吃月饼
    () => {
      const den = pick([4, 6, 8]);
      const eat = randInt(2, den - 1);
      return {
        content: `小鸭子🐥有一块月饼，平均分成${den}份，吃了${eat}份，还剩几分之几？还剩几份？`,
        answer: `剩${den - eat}/${den},剩${den - eat}份`,
        solution: `1. 月饼平均分成${den}份\n2. 吃了${eat}份，即${eat}/${den}\n3. 剩余分数 = ${den}/${den} - ${eat}/${den} = ${den - eat}/${den}\n4. 剩余份数 = ${den} - ${eat} = ${den - eat}（份）`,
        type: '吃月饼',
        difficulty: 2,
      };
    },
    // 7. 涂色
    () => {
      const den = pick([4, 6, 8, 10]);
      const colored = randInt(2, den - 1);
      return {
        content: `小金鱼🐟有一张纸，平均分成${den}格，涂了${colored}格红色，涂红色的部分占整张纸的几分之几？没有涂色的占几分之几？`,
        answer: `涂色${colored}/${den},没涂${den - colored}/${den}`,
        solution: `1. 纸平均分成${den}格\n2. 涂了${colored}格\n3. 涂色部分 = ${colored}/${den}\n4. 没涂色 = ${den}/${den} - ${colored}/${den} = ${den - colored}/${den}`,
        type: '涂色',
        difficulty: 2,
      };
    },
    // 8. 填分数
    () => {
      const den = pick([5, 6, 8, 10]);
      const part = randInt(1, den - 1);
      return {
        content: `小猴子🐒把一根绳子平均剪成${den}段，取了${part}段，取的占总长度的几分之几？`,
        answer: `${part}/${den}`,
        solution: `1. 绳子平均分成${den}段\n2. 取了${part}段\n3. 取的部分 = ${part}/${den}`,
        type: '填分数',
        difficulty: 1,
      };
    },
    // 9. 比大小
    () => {
      const den = pick([4, 6, 8, 10]);
      const a = randInt(1, den - 2);
      const b = randInt(a + 1, den - 1);
      return {
        content: `算算猫🐱吃了蛋糕的${a}/${den}，智慧龙🐉吃了蛋糕的${b}/${den}，谁吃得多？多吃几分之几？`,
        answer: `智慧龙多,多${b - a}/${den}`,
        solution: `1. 算算猫吃了${a}/${den}\n2. 智慧龙吃了${b}/${den}\n3. 比较：${a}/${den} ${a < b ? '<' : '>'} ${b}/${den}\n4. 智慧龙吃得多\n5. 多了 = ${b}/${den} - ${a}/${den} = ${b - a}/${den}`,
        type: '比大小',
        difficulty: 2,
      };
    },
    // 10. 分饼干
    () => {
      const den = pick([6, 8, 10]);
      const give1 = randInt(1, Math.floor(den / 3));
      const give2 = randInt(1, Math.floor(den / 3));
      const self = den - give1 - give2;
      return {
        content: `一盒饼干平均分成${den}份，企鹅博士🐧给小兔子${give1}份，给小青蛙${give2}份，自己留了几分之几？`,
        answer: `${self}/${den}`,
        solution: `1. 饼干平均分成${den}份\n2. 给小兔子${give1}份，即${give1}/${den}\n3. 给小青蛙${give2}份，即${give2}/${den}\n4. 自己留的 = 1 - ${give1}/${den} - ${give2}/${den} = ${self}/${den}`,
        type: '分饼干',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第五章应用题：元角分与小数 ============
// 模板数：12个
// 场景：文具店购物、超市买零食、书店买书、玩具店、找零、比价格、存零花钱、买早餐、买门票、捐款、凑钱买东西、打折优惠

export function genAppCh5() {
  const templates = [
    // 1. 文具店购物
    () => {
      const items = [
        { name: '铅笔', price: 1.5 },
        { name: '橡皮', price: 0.8 },
        { name: '尺子', price: 2.0 },
        { name: '本子', price: 3.5 },
        { name: '彩笔', price: 5.0 },
        { name: '钢笔', price: 8.5 },
      ];
      const a = pick(items);
      const b = pick(items.filter(x => x.name !== a.name));
      const total = Math.round((a.price + b.price) * 10) / 10;
      return {
        content: `算算猫🐱在文具店买了一支${a.name}${a.price}元和一块${b.name}${b.price}元，一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. ${a.name}价格：${a.price}元\n2. ${b.name}价格：${b.price}元\n3. 总价 = ${a.name} + ${b.name}\n4. ${a.price} + ${b.price} = ${total}（元）`,
        type: '文具店购物',
        difficulty: 2,
      };
    },
    // 2. 超市买零食
    () => {
      const prices = [
        { name: '饼干', price: Math.round(randInt(3, 8) * 10 + 5) / 10 },
        { name: '果汁', price: Math.round(randInt(2, 6) * 10 + 5) / 10 },
        { name: '酸奶', price: Math.round(randInt(4, 9) * 10) / 10 },
      ];
      const a = pick(prices);
      const b = pick(prices.filter(x => x.name !== a.name));
      const total = Math.round((a.price + b.price) * 10) / 10;
      return {
        content: `智慧龙🐉在超市买了一盒${a.name}${a.price}元和一瓶${b.name}${b.price}元，一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. ${a.name}：${a.price}元\n2. ${b.name}：${b.price}元\n3. 总价 = ${a.price} + ${b.price} = ${total}（元）`,
        type: '超市买零食',
        difficulty: 2,
      };
    },
    // 3. 书店买书
    () => {
      const price1 = randInt(5, 15) + pick([0, 0.5]);
      const price2 = randInt(3, 10) + pick([0, 0.5]);
      const total = Math.round((price1 + price2) * 10) / 10;
      return {
        content: `企鹅博士🐧在书店买了一本故事书${price1}元和一本科学书${price2}元，一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. 故事书${price1}元\n2. 科学书${price2}元\n3. 总价 = ${price1} + ${price2} = ${total}（元）`,
        type: '书店买书',
        difficulty: 2,
      };
    },
    // 4. 玩具店
    () => {
      const price1 = randInt(8, 20) + pick([0, 0.5]);
      const price2 = randInt(5, 15) + pick([0, 0.5]);
      const diff = Math.abs(Math.round((price1 - price2) * 10) / 10);
      return {
        content: `小熊老师🐻的玩具店里，小汽车${price1}元，布娃娃${price2}元，小汽车比布娃娃贵多少钱？`,
        answer: `${diff}元`,
        solution: `1. 小汽车${price1}元\n2. 布娃娃${price2}元\n3. 贵了 = ${Math.max(price1, price2)} - ${Math.min(price1, price2)} = ${diff}（元）`,
        type: '玩具店',
        difficulty: 2,
      };
    },
    // 5. 找零
    () => {
      const price1 = randInt(3, 10) + pick([0, 0.5]);
      const price2 = randInt(2, 8) + pick([0, 0.5]);
      const total = Math.round((price1 + price2) * 10) / 10;
      const pay = Math.ceil(total / 5) * 5 + randInt(0, 1) * 5;
      const change = Math.round((pay - total) * 10) / 10;
      return {
        content: `机灵狐🦊买了一本书${price1}元和一支笔${price2}元，付了${pay}元，应找回多少元？`,
        answer: `${change}元`,
        solution: `1. 书的价格：${price1}元\n2. 笔的价格：${price2}元\n3. 总价 = ${price1} + ${price2} = ${total}（元）\n4. 找回 = 付款 - 总价\n5. ${pay} - ${total} = ${change}（元）`,
        type: '找零',
        difficulty: 2,
      };
    },
    // 6. 比价格
    () => {
      const a = randInt(3, 12) + pick([0, 0.5]);
      const b = randInt(3, 12) + pick([0, 0.5]);
      if (a === b) return genAppCh5();
      return {
        content: `猫头鹰🦉去超市，苹果${a}元/千克，香蕉${b}元/千克，哪种水果贵？每千克贵多少元？`,
        answer: `${a > b ? '苹果' : '香蕉'}贵${Math.abs(a - b).toFixed(1)}元`,
        solution: `1. 苹果${a}元/千克\n2. 香蕉${b}元/千克\n3. 比较：${a} ${a > b ? '>' : '<'} ${b}\n4. ${a > b ? '苹果' : '香蕉'}贵\n5. 贵了 ${Math.abs(a - b).toFixed(1)}元`,
        type: '比价格',
        difficulty: 2,
      };
    },
    // 7. 存零花钱
    () => {
      const save1 = randInt(5, 15) + pick([0, 0.5]);
      const save2 = randInt(3, 10) + pick([0, 0.5]);
      const total = Math.round((save1 + save2) * 10) / 10;
      return {
        content: `小兔子🐰第一个月存了${save1}元零花钱，第二个月存了${save2}元，两个月一共存了多少元？`,
        answer: `${total}元`,
        solution: `1. 第一个月存了${save1}元\n2. 第二个月存了${save2}元\n3. 总存款 = 第一个月 + 第二个月\n4. ${save1} + ${save2} = ${total}（元）`,
        type: '存零花钱',
        difficulty: 2,
      };
    },
    // 8. 买早餐
    () => {
      const bread = randInt(2, 5) + pick([0, 0.5]);
      const milk = randInt(2, 4) + pick([0, 0.5]);
      const egg = randInt(1, 3) + pick([0, 0.5]);
      const total = Math.round((bread + milk + egg) * 10) / 10;
      return {
        content: `小青蛙🐸买早餐，面包${bread}元，牛奶${milk}元，鸡蛋${egg}元，早餐一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. 面包${bread}元\n2. 牛奶${milk}元\n3. 鸡蛋${egg}元\n4. 总价 = ${bread} + ${milk} + ${egg} = ${total}（元）`,
        type: '买早餐',
        difficulty: 2,
      };
    },
    // 9. 买门票
    () => {
      const adult = randInt(15, 30);
      const child = Math.round((adult * 0.5 + randInt(0, 3)) * 10) / 10;
      const aCount = randInt(1, 2);
      const cCount = randInt(2, 4);
      const total = Math.round((adult * aCount + child * cCount) * 10) / 10;
      return {
        content: `小鸭子🐥一家去公园，成人票${adult}元，儿童票${child}元，买了${aCount}张成人票和${cCount}张儿童票，一共花了多少钱？`,
        answer: `${total}元`,
        solution: `1. 成人票${adult}元 × ${aCount}张 = ${adult * aCount}（元）\n2. 儿童票${child}元 × ${cCount}张 = ${Math.round(child * cCount * 10) / 10}（元）\n3. 总价 = ${adult * aCount} + ${Math.round(child * cCount * 10) / 10} = ${total}（元）`,
        type: '买门票',
        difficulty: 2,
      };
    },
    // 10. 捐款
    () => {
      const amounts = Array.from({ length: 4 }, () => randInt(1, 10) + pick([0, 0.5]));
      const total = Math.round(amounts.reduce((a, b) => a + b, 0) * 10) / 10;
      const names = ['小金鱼🐟', '小猴子🐒', '算算猫🐱', '智慧龙🐉'];
      return {
        content: `${names.map((n, i) => `${n}捐了${amounts[i]}元`).join('、')}，他们一共捐了多少元？`,
        answer: `${total}元`,
        solution: `${names.map((n, i) => `${i + 1}. ${n}捐了${amounts[i]}元`).join('\n')}\n${names.length + 1}. 总捐款 = ${amounts.join(' + ')} = ${total}（元）`,
        type: '捐款',
        difficulty: 2,
      };
    },
    // 11. 凑钱买东西
    () => {
      const price = randInt(15, 30) + pick([0, 0.5]);
      const have1 = Math.round(price * 0.6 * 10) / 10;
      const need = Math.round((price - have1) * 10) / 10;
      return {
        content: `企鹅博士🐧想买一个${price}元的计算器，自己有${have1}元，还差多少元？`,
        answer: `${need}元`,
        solution: `1. 计算器价格${price}元\n2. 自己有${have1}元\n3. 还差 = ${price} - ${have1} = ${need}（元）`,
        type: '凑钱买东西',
        difficulty: 2,
      };
    },
    // 12. 打折优惠
    () => {
      const original = randInt(10, 30);
      const discount = pick([5, 8]);
      const saved = Math.round(((original * discount) / 10) * 10) / 10;
      const now = Math.round((original - saved) * 10) / 10;
      return {
        content: `机灵狐🦊看中一个玩具原价${original}元，打${discount}折后便宜了多少元？现在卖多少元？`,
        answer: `便宜${saved}元,现在${now}元`,
        solution: `1. 原价${original}元\n2. 打${discount}折 = 原价 × ${discount}/10 = ${original} × 0.${discount} = ${now}（元）\n3. 便宜了 = ${original} - ${now} = ${saved}（元）`,
        type: '打折优惠',
        difficulty: 3,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第六章应用题：三位数加减法 ============
// 模板数：12个
// 场景：图书馆藏书、爬山高度、学校捐款、运动会总分、养蚕记录、农场产量、邮票收集、快递重量、超市库存、植树数量、博物馆参观人数、游乐园游客
// 综合前面知识点

export function genAppCh6() {
  const templates = [
    // 1. 图书馆藏书
    () => {
      const story = randInt(200, 500);
      const science = randInt(150, 400);
      return {
        content: `猫头鹰🦉学校的图书馆有${story}本故事书，科技书比故事书多${science}本，科技书有多少本？两种书一共有多少本？`,
        answer: `科技书${story + science}本,共${story * 2 + science}本`,
        solution: `1. 故事书${story}本\n2. 科技书比故事书多${science}本\n3. 科技书 = ${story} + ${science} = ${story + science}（本）\n4. 两种书总数 = ${story} + ${story + science} = ${story * 2 + science}（本）`,
        type: '图书馆藏书',
        difficulty: 2,
      };
    },
    // 2. 爬山高度
    () => {
      const total = randInt(500, 999);
      const climbed = randInt(200, total - 200);
      return {
        content: `一座山高${total}米，算算猫🐱已经爬了${climbed}米，还有多少米到山顶？`,
        answer: `${total - climbed}米`,
        solution: `1. 山高${total}米\n2. 已经爬了${climbed}米\n3. 剩余 = 总高度 - 已爬高度\n4. ${total} - ${climbed} = ${total - climbed}（米）`,
        type: '爬山高度',
        difficulty: 2,
      };
    },
    // 3. 学校捐款
    () => {
      const g3 = randInt(150, 400);
      const g4 = randInt(150, 400);
      const g5 = randInt(150, 400);
      return {
        content: `智慧龙🐉的学校举行捐款活动，三年级捐了${g3}元，四年级捐了${g4}元，五年级捐了${g5}元，三个年级一共捐了多少元？`,
        answer: `${g3 + g4 + g5}元`,
        solution: `1. 三年级捐了${g3}元\n2. 四年级捐了${g4}元\n3. 五年级捐了${g5}元\n4. 总捐款 = ${g3} + ${g4} + ${g5} = ${g3 + g4 + g5}（元）`,
        type: '学校捐款',
        difficulty: 2,
      };
    },
    // 4. 运动会总分
    () => {
      const s1 = randInt(80, 200);
      const s2 = randInt(80, 200);
      const s3 = randInt(80, 200);
      const max = Math.max(s1, s2, s3);
      const min = Math.min(s1, s2, s3);
      return {
        content: `运动会上三(1)班得了${s1}分，三(2)班得了${s2}分，三(3)班得了${s3}分，三个班一共得了多少分？最高分和最低分相差多少分？`,
        answer: `共${s1 + s2 + s3}分,相差${max - min}分`,
        solution: `1. 三(1)班${s1}分\n2. 三(2)班${s2}分\n3. 三(3)班${s3}分\n4. 总分 = ${s1} + ${s2} + ${s3} = ${s1 + s2 + s3}（分）\n5. 最高${max}分，最低${min}分\n6. 相差 = ${max} - ${min} = ${max - min}（分）`,
        type: '运动会总分',
        difficulty: 2,
      };
    },
    // 5. 养蚕记录
    () => {
      const week1 = randInt(100, 300);
      const week2 = randInt(100, 300);
      const total = week1 + week2;
      return {
        content: `小熊老师🐻养蚕记录：第一周吃了${week1}片桑叶，第二周吃了${week2}片桑叶，两周一共吃了多少片？`,
        answer: `${total}片`,
        solution: `1. 第一周吃了${week1}片\n2. 第二周吃了${week2}片\n3. 总数 = 第一周 + 第二周\n4. ${week1} + ${week2} = ${total}（片）`,
        type: '养蚕记录',
        difficulty: 2,
      };
    },
    // 6. 农场产量
    () => {
      const apple = randInt(200, 600);
      const pear = randInt(150, 400);
      const diff = Math.abs(apple - pear);
      return {
        content: `机灵狐🦊的农场收获了${apple}千克苹果和${pear}千克梨，苹果和梨一共多少千克？苹果比梨多多少千克？`,
        answer: `共${apple + pear}千克,多${diff}千克`,
        solution: `1. 苹果${apple}千克\n2. 梨${pear}千克\n3. 总重量 = ${apple} + ${pear} = ${apple + pear}（千克）\n4. 相差 = ${Math.max(apple, pear)} - ${Math.min(apple, pear)} = ${diff}（千克）`,
        type: '农场产量',
        difficulty: 2,
      };
    },
    // 7. 邮票收集
    () => {
      const have = randInt(200, 500);
      const get = randInt(100, 300);
      const give = randInt(50, 150);
      return {
        content: `小兔子🐰收集了${have}张邮票，又得到了${get}张，送给小青蛙🐸${give}张，现在小兔子有多少张邮票？`,
        answer: `${have + get - give}张`,
        solution: `1. 原来有${have}张\n2. 又得到${get}张\n3. 送给小青蛙${give}张\n4. 现在 = ${have} + ${get} - ${give} = ${have + get - give}（张）`,
        type: '邮票收集',
        difficulty: 2,
      };
    },
    // 8. 快递重量
    () => {
      const w1 = randInt(100, 400);
      const w2 = randInt(100, 400);
      const w3 = randInt(100, 400);
      return {
        content: `小青蛙🐸收到三个快递，分别重${w1}克、${w2}克、${w3}克，三个快递一共重多少克？`,
        answer: `${w1 + w2 + w3}克`,
        solution: `1. 第一个快递${w1}克\n2. 第二个快递${w2}克\n3. 第三个快递${w3}克\n4. 总重 = ${w1} + ${w2} + ${w3} = ${w1 + w2 + w3}（克）`,
        type: '快递重量',
        difficulty: 2,
      };
    },
    // 9. 超市库存
    () => {
      const stock = randInt(300, 800);
      const sold = randInt(100, stock - 100);
      const added = randInt(100, 300);
      return {
        content: `小鸭子🐥管理的超市有${stock}箱牛奶，卖出了${sold}箱，又进货${added}箱，现在超市有多少箱牛奶？`,
        answer: `${stock - sold + added}箱`,
        solution: `1. 原来有${stock}箱\n2. 卖出了${sold}箱\n3. 又进货${added}箱\n4. 现在 = ${stock} - ${sold} + ${added} = ${stock - sold + added}（箱）`,
        type: '超市库存',
        difficulty: 2,
      };
    },
    // 10. 植树数量
    () => {
      const row = randInt(5, 10);
      const perRow = randInt(30, 80);
      const total = row * perRow;
      const planted = randInt(total - 100, total - 30);
      return {
        content: `小金鱼🐟参加植树活动，计划种${row}排树，每排${perRow}棵，已经种了${planted}棵，还剩多少棵没种？`,
        answer: `${total - planted}棵`,
        solution: `1. 计划种${row}排，每排${perRow}棵\n2. 总计划 = ${row} × ${perRow} = ${total}（棵）\n3. 已种${planted}棵\n4. 剩余 = ${total} - ${planted} = ${total - planted}（棵）`,
        type: '植树数量',
        difficulty: 2,
      };
    },
    // 11. 博物馆参观人数
    () => {
      const morning = randInt(200, 500);
      const afternoon = randInt(200, 500);
      const maxCap = randInt(morning + afternoon + 100, morning + afternoon + 300);
      return {
        content: `小猴子🐒去博物馆参观，上午有${morning}人，下午有${afternoon}人，博物馆最多容纳${maxCap}人，今天还有多少个空位？`,
        answer: `${maxCap - morning - afternoon}个`,
        solution: `1. 上午${morning}人\n2. 下午${afternoon}人\n3. 今天总人数 = ${morning} + ${afternoon} = ${morning + afternoon}（人）\n4. 最多容纳${maxCap}人\n5. 空位 = ${maxCap} - ${morning + afternoon} = ${maxCap - morning - afternoon}（个）`,
        type: '博物馆参观',
        difficulty: 2,
      };
    },
    // 12. 游乐园游客
    () => {
      const d1 = randInt(300, 600);
      const d2 = randInt(300, 600);
      const d3 = randInt(300, 600);
      return {
        content: `算算猫🐱统计游乐园三天的游客人数：第一天${d1}人，第二天${d2}人，第三天${d3}人，三天一共有多少游客？哪天人最多？`,
        answer: `共${d1 + d2 + d3}人,第${[d1, d2, d3].indexOf(Math.max(d1, d2, d3)) + 1}天最多`,
        solution: `1. 第一天${d1}人\n2. 第二天${d2}人\n3. 第三天${d3}人\n4. 总人数 = ${d1} + ${d2} + ${d3} = ${d1 + d2 + d3}（人）\n5. 最多：第${[d1, d2, d3].indexOf(Math.max(d1, d2, d3)) + 1}天 ${Math.max(d1, d2, d3)}人`,
        type: '游乐园游客',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第七章应用题：两位数乘两三位数 ============
// 模板数：10个
// 场景：电影院座位、体育馆、工厂生产、超市进货、运动会得分、图书捐赠、鸡蛋装箱、停车场、快递打包、邮票册
// 综合前面知识点

export function genAppCh7() {
  const templates = [
    // 1. 电影院座位
    () => {
      const perRow = randInt(15, 28);
      const rows = randInt(12, 25);
      return {
        content: `企鹅博士🐧去电影院，每排有${perRow}个座位，一共有${rows}排，这个放映厅最多能坐多少人？`,
        answer: String(perRow * rows),
        solution: `1. 每排${perRow}个座位\n2. 共${rows}排\n3. 总座位 = 每排座位 × 排数\n4. ${perRow} × ${rows} = ${perRow * rows}（个）`,
        type: '电影院座位',
        difficulty: 3,
      };
    },
    // 2. 体育馆
    () => {
      const perSection = randInt(20, 45);
      const sections = randInt(15, 30);
      return {
        content: `智慧龙🐉去体育馆看比赛，每个区有${perSection}个座位，有${sections}个区，体育馆一共有多少个座位？`,
        answer: String(perSection * sections),
        solution: `1. 每区${perSection}个座位\n2. ${sections}个区\n3. 总座位 = 每区座位 × 区数\n4. ${perSection} × ${sections} = ${perSection * sections}（个）`,
        type: '体育馆',
        difficulty: 3,
      };
    },
    // 3. 工厂生产
    () => {
      const perMachine = randInt(15, 35);
      const machines = randInt(12, 25);
      const days = randInt(2, 5);
      return {
        content: `小熊老师🐻参观工厂，每台机器每天生产${perMachine}个零件，工厂有${machines}台机器，${days}天能生产多少个零件？`,
        answer: String(perMachine * machines * days),
        solution: `1. 每台机器每天生产${perMachine}个\n2. 有${machines}台机器\n3. 每天产量 = ${perMachine} × ${machines} = ${perMachine * machines}（个）\n4. ${days}天产量 = ${perMachine * machines} × ${days} = ${perMachine * machines * days}（个）`,
        type: '工厂生产',
        difficulty: 3,
      };
    },
    // 4. 超市进货
    () => {
      const perBox = randInt(15, 30);
      const boxes = randInt(20, 40);
      return {
        content: `机灵狐🦊帮超市进货，每箱装${perBox}瓶饮料，进了${boxes}箱，一共进了多少瓶饮料？`,
        answer: String(perBox * boxes),
        solution: `1. 每箱${perBox}瓶\n2. 进了${boxes}箱\n3. 总瓶数 = 每箱瓶数 × 箱数\n4. ${perBox} × ${boxes} = ${perBox * boxes}（瓶）`,
        type: '超市进货',
        difficulty: 3,
      };
    },
    // 5. 运动会得分
    () => {
      const perClass = randInt(15, 25);
      const classes = randInt(12, 20);
      return {
        content: `猫头鹰🦉学校的运动会上，${classes}个班每班选出${perClass}名运动员，一共有多少名运动员参加比赛？`,
        answer: String(perClass * classes),
        solution: `1. ${classes}个班\n2. 每班${perClass}名运动员\n3. 总人数 = 班级数 × 每班人数\n4. ${classes} × ${perClass} = ${perClass * classes}（名）`,
        type: '运动会得分',
        difficulty: 2,
      };
    },
    // 6. 图书捐赠
    () => {
      const perClass = randInt(18, 35);
      const classes = randInt(15, 25);
      return {
        content: `小兔子🐰发起图书捐赠活动，每班捐${perClass}本书，${classes}个班一共捐了多少本书？`,
        answer: String(perClass * classes),
        solution: `1. 每班捐${perClass}本\n2. ${classes}个班\n3. 总数 = 每班数量 × 班级数\n4. ${perClass} × ${classes} = ${perClass * classes}（本）`,
        type: '图书捐赠',
        difficulty: 2,
      };
    },
    // 7. 鸡蛋装箱
    () => {
      const perBox = randInt(20, 36);
      const boxes = randInt(15, 30);
      return {
        content: `小青蛙🐸帮忙装鸡蛋，每箱装${perBox}个，装了${boxes}箱，一共装了多少个鸡蛋？`,
        answer: String(perBox * boxes),
        solution: `1. 每箱${perBox}个\n2. 装了${boxes}箱\n3. 总数 = 每箱数量 × 箱数\n4. ${perBox} × ${boxes} = ${perBox * boxes}（个）`,
        type: '鸡蛋装箱',
        difficulty: 2,
      };
    },
    // 8. 停车场
    () => {
      const perRow = randInt(12, 25);
      const rows = randInt(15, 28);
      return {
        content: `小鸭子🐥看到一个大型停车场，每排停${perRow}辆车，一共有${rows}排，这个停车场最多能停多少辆车？`,
        answer: String(perRow * rows),
        solution: `1. 每排停${perRow}辆\n2. ${rows}排\n3. 总数 = 每排数量 × 排数\n4. ${perRow} × ${rows} = ${perRow * rows}（辆）`,
        type: '停车场',
        difficulty: 3,
      };
    },
    // 9. 快递打包
    () => {
      const perBox = randInt(12, 25);
      const boxes = randInt(18, 35);
      const extra = randInt(5, 15);
      return {
        content: `小金鱼🐟帮忙打包快递，每箱装${perBox}件，装了${boxes}箱后还剩${extra}件没装，一共有多少件物品？`,
        answer: String(perBox * boxes + extra),
        solution: `1. 每箱${perBox}件\n2. 装了${boxes}箱\n3. 已装 = ${perBox} × ${boxes} = ${perBox * boxes}（件）\n4. 还剩${extra}件\n5. 总数 = ${perBox * boxes} + ${extra} = ${perBox * boxes + extra}（件）`,
        type: '快递打包',
        difficulty: 3,
      };
    },
    // 10. 邮票册
    () => {
      const perPage = randInt(15, 24);
      const pages = randInt(12, 20);
      return {
        content: `小猴子🐒有一本大邮票册，每页放${perPage}张邮票，已经放满了${pages}页，邮票册里一共有多少张邮票？`,
        answer: String(perPage * pages),
        solution: `1. 每页放${perPage}张\n2. 放满了${pages}页\n3. 总数 = 每页数量 × 页数\n4. ${perPage} × ${pages} = ${perPage * pages}（张）`,
        type: '邮票册',
        difficulty: 3,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 3 };
}

// ============ 第八章应用题：年月日 ============
// 模板数：10个
// 场景：生日计算、假期天数、学期时间、节日倒计时、读书计划、运动打卡、天气记录、植物生长、养宠物、旅行计划
// 综合前面知识点

export function genAppCh8() {
  const templates = [
    // 1. 生日计算
    () => {
      const birthMonth = randInt(1, 6);
      const birthDay = randInt(1, 28);
      const currentMonth = randInt(birthMonth + 2, 11);
      return {
        content: `算算猫🐱的生日是${birthMonth}月${birthDay}日，现在是${currentMonth}月，距离算算猫明年的生日还有几个月？`,
        answer: `${12 - currentMonth + birthMonth}个月`,
        solution: `1. 算算猫生日：${birthMonth}月${birthDay}日\n2. 现在：${currentMonth}月\n3. 到年底还有${12 - currentMonth}个月\n4. 再到${birthMonth}月还有${birthMonth}个月\n5. 总共 = ${12 - currentMonth} + ${birthMonth} = ${12 - currentMonth + birthMonth}（个月）`,
        type: '生日计算',
        difficulty: 2,
      };
    },
    // 2. 假期天数
    () => {
      const startDay = randInt(1, 10);
      const endDay = randInt(20, 31);
      const julyDays = 31 - startDay + 1;
      const total = julyDays + endDay;
      return {
        content: `智慧龙🐉的暑假从7月${startDay}日开始，到8月${endDay}日结束，暑假一共有多少天？`,
        answer: `${total}天`,
        solution: `1. 7月有31天\n2. 7月${startDay}日到7月31日 = ${julyDays}天\n3. 8月1日到8月${endDay}日 = ${endDay}天\n4. 总天数 = ${julyDays} + ${endDay} = ${total}（天）`,
        type: '假期天数',
        difficulty: 2,
      };
    },
    // 3. 学期时间
    () => {
      const startMonth = pick([2, 9]);
      const startDay = randInt(1, 10);
      const weeks = randInt(16, 20);
      const days = weeks * 7;
      return {
        content: `企鹅博士🐧的学校${startMonth}月${startDay}日开学，一个学期共${weeks}个星期，这个学期一共有多少天？`,
        answer: `${days}天`,
        solution: `1. 1个星期 = 7天\n2. ${weeks}个星期\n3. 总天数 = ${weeks} × 7 = ${days}（天）`,
        type: '学期时间',
        difficulty: 2,
      };
    },
    // 4. 节日倒计时
    () => {
      const festivals = [
        { name: '元旦', month: 1, day: 1 },
        { name: '儿童节', month: 6, day: 1 },
        { name: '国庆节', month: 10, day: 1 },
      ];
      const festival = pick(festivals);
      const currentMonth = randInt(1, festival.month - 1 || 1);
      const currentDay = randInt(1, 28);
      const monthsLeft = festival.month - currentMonth;
      return {
        content: `小熊老师🐻问：今天是${currentMonth}月${currentDay}日，距离${festival.name}（${festival.month}月${festival.day}日）还有多少个月？`,
        answer: `${monthsLeft}个月`,
        solution: `1. 今天：${currentMonth}月${currentDay}日\n2. ${festival.name}：${festival.month}月${festival.day}日\n3. 还有 = ${festival.month} - ${currentMonth} = ${monthsLeft}（个月）`,
        type: '节日倒计时',
        difficulty: 2,
      };
    },
    // 5. 读书计划
    () => {
      const totalPages = randInt(120, 200);
      const perDay = randInt(8, 15);
      const days = Math.ceil(totalPages / perDay);
      return {
        content: `机灵狐🦊有一本${totalPages}页的课外书，每天看${perDay}页，几天能看完？`,
        answer: `${days}天`,
        solution: `1. 课外书共${totalPages}页\n2. 每天看${perDay}页\n3. 需要天数 = ${totalPages} ÷ ${perDay} = ${days}（天）`,
        type: '读书计划',
        difficulty: 2,
      };
    },
    // 6. 运动打卡
    () => {
      const perDay = randInt(20, 40);
      const weeks = randInt(2, 4);
      const days = weeks * 7;
      return {
        content: `猫头鹰🦉坚持运动打卡，每天跳绳${perDay}个，坚持了${weeks}个星期，一共跳了多少个绳？`,
        answer: `${perDay * days}个`,
        solution: `1. 每天跳${perDay}个\n2. ${weeks}个星期 = ${weeks} × 7 = ${days}（天）\n3. 总数 = ${perDay} × ${days} = ${perDay * days}（个）`,
        type: '运动打卡',
        difficulty: 2,
      };
    },
    // 7. 天气记录
    () => {
      const sunny = randInt(8, 15);
      const rainy = randInt(3, 8);
      return {
        content: `小兔子🐰记录了一个月（30天）的天气：晴天${sunny}天，雨天${rainy}天，其余是阴天，阴天有多少天？晴天比雨天多多少天？`,
        answer: `阴天${30 - sunny - rainy}天,晴天比雨天多${sunny - rainy}天`,
        solution: `1. 总共30天\n2. 晴天${sunny}天，雨天${rainy}天\n3. 阴天 = 30 - ${sunny} - ${rainy} = ${30 - sunny - rainy}（天）\n4. 晴天比雨天多 = ${sunny} - ${rainy} = ${sunny - rainy}（天）`,
        type: '天气记录',
        difficulty: 2,
      };
    },
    // 8. 植物生长
    () => {
      const height0 = randInt(3, 10);
      const growPerWeek = randInt(2, 5);
      const weeks = randInt(3, 6);
      return {
        content: `小青蛙🐸种了一棵小苗，刚种下时高${height0}厘米，每周长高${growPerWeek}厘米，${weeks}周后小苗有多高？`,
        answer: `${height0 + growPerWeek * weeks}厘米`,
        solution: `1. 刚种下时高${height0}厘米\n2. 每周长高${growPerWeek}厘米\n3. ${weeks}周长高 = ${growPerWeek} × ${weeks} = ${growPerWeek * weeks}（厘米）\n4. 现在高度 = ${height0} + ${growPerWeek * weeks} = ${height0 + growPerWeek * weeks}（厘米）`,
        type: '植物生长',
        difficulty: 2,
      };
    },
    // 9. 养宠物
    () => {
      const feedPerDay = randInt(2, 4);
      const days = randInt(5, 10);
      const totalFeed = feedPerDay * days;
      const have = randInt(totalFeed - 10, totalFeed + 10);
      const diff = have - totalFeed;
      return {
        content: `小鸭子🐥养了一只小仓鼠，每天喂${feedPerDay}次食物，${days}天一共要喂多少次？如果准备了${have}份食物，够不够？`,
        answer: `${totalFeed}次,${diff >= 0 ? '够了还多' + diff + '份' : '不够还差' + Math.abs(diff) + '份'}`,
        solution: `1. 每天喂${feedPerDay}次\n2. ${days}天总次数 = ${feedPerDay} × ${days} = ${totalFeed}（次）\n3. 准备了${have}份食物\n4. ${have >= totalFeed ? '够了' : '不够'}，${diff >= 0 ? '多' + diff + '份' : '差' + Math.abs(diff) + '份'}`,
        type: '养宠物',
        difficulty: 2,
      };
    },
    // 10. 旅行计划
    () => {
      const days = randInt(3, 7);
      const hotelPerNight = randInt(80, 200);
      const foodPerDay = randInt(30, 80);
      const transport = randInt(100, 300);
      return {
        content: `小金鱼🐟一家去旅行${days}天，住宿每晚${hotelPerNight}元，吃饭每天${foodPerDay}元，交通费${transport}元，旅行一共要花多少钱？`,
        answer: `${hotelPerNight * days + foodPerDay * days + transport}元`,
        solution: `1. 住宿费 = ${hotelPerNight} × ${days} = ${hotelPerNight * days}（元）\n2. 餐费 = ${foodPerDay} × ${days} = ${foodPerDay * days}（元）\n3. 交通费 = ${transport}元\n4. 总费用 = ${hotelPerNight * days} + ${foodPerDay * days} + ${transport} = ${hotelPerNight * days + foodPerDay * days + transport}（元）`,
        type: '旅行计划',
        difficulty: 3,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第九章应用题：千米和米 ============
// 模板数：10个
// 场景：上学路程、跑步距离、骑车距离、旅行路程、公交路线、马拉松、操场跑道、游泳池、散步距离、火车路程
// 综合前面知识点

export function genAppCh9() {
  const templates = [
    // 1. 上学路程
    () => {
      const d1 = randInt(1, 3);
      const d2 = randInt(200, 800);
      const total = d1 * 1000 + d2;
      return {
        content: `小猴子🐒家到学校${d1}千米${d2}米，等于多少米？`,
        answer: `${total}米`,
        solution: `1. ${d1}千米 = ${d1} × 1000 = ${d1 * 1000}（米）\n2. 加上${d2}米\n3. 总距离 = ${d1 * 1000} + ${d2} = ${total}（米）`,
        type: '上学路程',
        difficulty: 2,
      };
    },
    // 2. 跑步距离
    () => {
      const speed = randInt(100, 300);
      const times = randInt(3, 6);
      const total = speed * times;
      const km = Math.floor(total / 1000);
      const m = total % 1000;
      return {
        content: `算算猫🐱每天绕操场跑${speed}米，跑${times}圈，一共跑了多少米？合多少千米多少米？`,
        answer: `${total}米,${km > 0 ? km + '千米' : ''}${m}米`,
        solution: `1. 每圈${speed}米\n2. 跑${times}圈\n3. 总距离 = ${speed} × ${times} = ${total}（米）\n4. ${total}米 = ${km}千米${m}米`,
        type: '跑步距离',
        difficulty: 2,
      };
    },
    // 3. 骑车距离
    () => {
      const speed = randInt(8, 15);
      const time = randInt(1, 3);
      return {
        content: `智慧龙🐉骑自行车每小时行${speed}千米，骑了${time}小时，一共行了多少千米？`,
        answer: `${speed * time}千米`,
        solution: `1. 每小时行${speed}千米\n2. 骑了${time}小时\n3. 总距离 = 速度 × 时间\n4. ${speed} × ${time} = ${speed * time}（千米）`,
        type: '骑车距离',
        difficulty: 2,
      };
    },
    // 4. 旅行路程
    () => {
      const d1 = randInt(100, 400);
      const d2 = randInt(100, 400);
      return {
        content: `企鹅博士🐧去旅行，第一天坐车行了${d1}千米，第二天比第一天多行了${d2}千米，两天一共行了多少千米？`,
        answer: `${d1 + d1 + d2}千米`,
        solution: `1. 第一天行了${d1}千米\n2. 第二天比第一天多${d2}千米\n3. 第二天 = ${d1} + ${d2} = ${d1 + d2}（千米）\n4. 两天总路程 = ${d1} + ${d1 + d2} = ${d1 + d1 + d2}（千米）`,
        type: '旅行路程',
        difficulty: 2,
      };
    },
    // 5. 公交路线
    () => {
      const d1 = randInt(2, 8);
      const d2 = randInt(3, 10);
      return {
        content: `小熊老师🐻坐公交车从家到商场${d1}千米，从商场到公园${d2}千米，从家到公园一共多少千米？来回一共多少千米？`,
        answer: `单程${d1 + d2}千米,来回${(d1 + d2) * 2}千米`,
        solution: `1. 家到商场${d1}千米\n2. 商场到公园${d2}千米\n3. 单程 = ${d1} + ${d2} = ${d1 + d2}（千米）\n4. 来回 = ${d1 + d2} × 2 = ${(d1 + d2) * 2}（千米）`,
        type: '公交路线',
        difficulty: 2,
      };
    },
    // 6. 马拉松
    () => {
      const total = 42;
      const ran = randInt(10, 30);
      return {
        content: `机灵狐🦊参加迷你马拉松，全程${total}千米，已经跑了${ran}千米，还剩多少千米？`,
        answer: `${total - ran}千米`,
        solution: `1. 全程${total}千米\n2. 已经跑了${ran}千米\n3. 剩余 = ${total} - ${ran} = ${total - ran}（千米）`,
        type: '马拉松',
        difficulty: 2,
      };
    },
    // 7. 操场跑道
    () => {
      const perCircle = 400;
      const circles = randInt(2, 8);
      const totalM = perCircle * circles;
      return {
        content: `猫头鹰🦉学校的操场跑道一圈${perCircle}米，小猫头鹰跑了${circles}圈，跑了多少米？合多少千米？`,
        answer: `${totalM}米,${totalM / 1000}千米`,
        solution: `1. 跑道一圈${perCircle}米\n2. 跑了${circles}圈\n3. 总距离 = ${perCircle} × ${circles} = ${totalM}（米）\n4. ${totalM}米 = ${totalM / 1000}千米`,
        type: '操场跑道',
        difficulty: 2,
      };
    },
    // 8. 游泳池
    () => {
      const poolLen = randInt(20, 50);
      const times = randInt(4, 10);
      return {
        content: `小兔子🐰在游泳池游泳，泳池长${poolLen}米，小兔子游了${times}个来回，一共游了多少米？`,
        answer: `${poolLen * times * 2}米`,
        solution: `1. 泳池长${poolLen}米\n2. 1个来回 = ${poolLen} × 2 = ${poolLen * 2}（米）\n3. ${times}个来回 = ${poolLen * 2} × ${times} = ${poolLen * times * 2}（米）`,
        type: '游泳池',
        difficulty: 2,
      };
    },
    // 9. 散步距离
    () => {
      const speed = randInt(3, 6);
      const time = randInt(1, 3);
      const totalKm = speed * time;
      const totalM = totalKm * 1000;
      return {
        content: `小青蛙🐸和爸爸散步，每小时走${speed}千米，走了${time}小时，走了多少千米？合多少米？`,
        answer: `${totalKm}千米,${totalM}米`,
        solution: `1. 每小时走${speed}千米\n2. 走了${time}小时\n3. 总距离 = ${speed} × ${time} = ${totalKm}（千米）\n4. ${totalKm}千米 = ${totalKm} × 1000 = ${totalM}（米）`,
        type: '散步距离',
        difficulty: 2,
      };
    },
    // 10. 火车路程
    () => {
      const speed = randInt(80, 150);
      const time = randInt(2, 5);
      const total = speed * time;
      return {
        content: `小鸭子🐥坐火车去外婆家，火车每小时行${speed}千米，行了${time}小时到达，小鸭子家到外婆家有多少千米？`,
        answer: `${total}千米`,
        solution: `1. 火车每小时行${speed}千米\n2. 行了${time}小时\n3. 距离 = 速度 × 时间\n4. ${speed} × ${time} = ${total}（千米）`,
        type: '火车路程',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十章应用题：面积 ============
// 模板数：10个
// 场景：房间面积、花坛面积、操场面积、黑板面积、地砖数量、草坪面积、游泳池面积、书桌面积、墙壁粉刷、地板铺设
// 综合前面知识点

export function genAppCh10() {
  const templates = [
    // 1. 房间面积
    () => {
      const l = randInt(4, 8);
      const w = randInt(3, 6);
      return {
        content: `小金鱼🐟的房间长${l}米，宽${w}米，房间的面积是多少平方米？周长是多少米？`,
        answer: `面积${l * w}平方米,周长${2 * (l + w)}米`,
        solution: `1. 房间长${l}米，宽${w}米\n2. 面积 = 长 × 宽 = ${l} × ${w} = ${l * w}（平方米）\n3. 周长 = (长 + 宽) × 2 = (${l} + ${w}) × 2 = ${2 * (l + w)}（米）`,
        type: '房间面积',
        difficulty: 2,
      };
    },
    // 2. 花坛面积
    () => {
      const l = randInt(6, 15);
      const w = randInt(4, 10);
      return {
        content: `小猴子🐒学校有一个长方形花坛，长${l}米，宽${w}米，花坛的面积是多少平方米？`,
        answer: `${l * w}平方米`,
        solution: `1. 花坛长${l}米，宽${w}米\n2. 长方形面积 = 长 × 宽\n3. ${l} × ${w} = ${l * w}（平方米）`,
        type: '花坛面积',
        difficulty: 2,
      };
    },
    // 3. 操场面积
    () => {
      const l = randInt(50, 100);
      const w = randInt(30, 60);
      return {
        content: `算算猫🐱学校的操场是长方形的，长${l}米，宽${w}米，操场的面积是多少平方米？`,
        answer: `${l * w}平方米`,
        solution: `1. 操场长${l}米，宽${w}米\n2. 面积 = 长 × 宽\n3. ${l} × ${w} = ${l * w}（平方米）`,
        type: '操场面积',
        difficulty: 2,
      };
    },
    // 4. 黑板面积
    () => {
      const l = randInt(3, 6);
      const w = randInt(1, 3);
      return {
        content: `智慧龙🐉教室的黑板长${l}米，宽${w}米，黑板的面积是多少平方米？合多少平方分米？`,
        answer: `${l * w}平方米,${l * w * 100}平方分米`,
        solution: `1. 黑板长${l}米，宽${w}米\n2. 面积 = ${l} × ${w} = ${l * w}（平方米）\n3. 1平方米 = 100平方分米\n4. ${l * w}平方米 = ${l * w} × 100 = ${l * w * 100}（平方分米）`,
        type: '黑板面积',
        difficulty: 2,
      };
    },
    // 5. 地砖数量
    () => {
      const roomL = randInt(4, 8);
      const roomW = randInt(3, 6);
      const roomArea = roomL * roomW;
      const tileArea = pick([1, 2, 4]);
      const count = roomArea / tileArea;
      return {
        content: `企鹅博士🐧装修房间，房间长${roomL}米，宽${roomW}米，用面积${tileArea}平方米的地砖铺地，需要多少块地砖？`,
        answer: `${count}块`,
        solution: `1. 房间面积 = ${roomL} × ${roomW} = ${roomArea}（平方米）\n2. 每块地砖${tileArea}平方米\n3. 需要地砖 = ${roomArea} ÷ ${tileArea} = ${count}（块）`,
        type: '地砖数量',
        difficulty: 2,
      };
    },
    // 6. 草坪面积
    () => {
      const bigL = randInt(10, 20);
      const bigW = randInt(8, 15);
      const smallL = randInt(2, 4);
      const smallW = randInt(2, 3);
      return {
        content: `小熊老师🐻学校有一块长方形草坪，长${bigL}米，宽${bigW}米，中间有一个长${smallL}米宽${smallW}米的花坛，草坪实际面积（除去花坛）是多少平方米？`,
        answer: `${bigL * bigW - smallL * smallW}平方米`,
        solution: `1. 草坪面积 = ${bigL} × ${bigW} = ${bigL * bigW}（平方米）\n2. 花坛面积 = ${smallL} × ${smallW} = ${smallL * smallW}（平方米）\n3. 实际面积 = 草坪 - 花坛\n4. ${bigL * bigW} - ${smallL * smallW} = ${bigL * bigW - smallL * smallW}（平方米）`,
        type: '草坪面积',
        difficulty: 2,
      };
    },
    // 7. 游泳池面积
    () => {
      const l = randInt(15, 30);
      const w = randInt(8, 15);
      return {
        content: `机灵狐🦊社区的游泳池是长方形的，长${l}米，宽${w}米，游泳池的占地面积是多少平方米？`,
        answer: `${l * w}平方米`,
        solution: `1. 游泳池长${l}米，宽${w}米\n2. 面积 = 长 × 宽\n3. ${l} × ${w} = ${l * w}（平方米）`,
        type: '游泳池面积',
        difficulty: 2,
      };
    },
    // 8. 书桌面积
    () => {
      const l = randInt(80, 120);
      const w = randInt(50, 80);
      const sqdm = Math.round((l * w) / 100);
      return {
        content: `猫头鹰🦉的书桌长${l}厘米，宽${w}厘米，书桌桌面的面积是多少平方厘米？合多少平方分米？`,
        answer: `${l * w}平方厘米,${sqdm}平方分米`,
        solution: `1. 书桌长${l}厘米，宽${w}厘米\n2. 面积 = ${l} × ${w} = ${l * w}（平方厘米）\n3. 1平方分米 = 100平方厘米\n4. ${l * w} ÷ 100 = ${sqdm}（平方分米）`,
        type: '书桌面积',
        difficulty: 2,
      };
    },
    // 9. 墙壁粉刷
    () => {
      const wallL = randInt(5, 10);
      const wallH = randInt(3, 4);
      const door = randInt(2, 4);
      const window = randInt(1, 3);
      return {
        content: `小兔子🐰要粉刷一面墙，墙长${wallL}米，高${wallH}米，墙上有一扇${door}平方米的门和一扇${window}平方米的窗户，需要粉刷的面积是多少平方米？`,
        answer: `${wallL * wallH - door - window}平方米`,
        solution: `1. 墙面面积 = ${wallL} × ${wallH} = ${wallL * wallH}（平方米）\n2. 门的面积 = ${door}平方米\n3. 窗户面积 = ${window}平方米\n4. 粉刷面积 = 墙面 - 门 - 窗户\n5. ${wallL * wallH} - ${door} - ${window} = ${wallL * wallH - door - window}（平方米）`,
        type: '墙壁粉刷',
        difficulty: 2,
      };
    },
    // 10. 地板铺设
    () => {
      const roomL = randInt(5, 8);
      const roomW = randInt(3, 6);
      const tileL = pick([1, 2]);
      const tileW = pick([1, 2]);
      const count = (roomL / tileL) * (roomW / tileW);
      return {
        content: `小青蛙🐸的房间长${roomL}米，宽${roomW}米，用长${tileL}米、宽${tileW}米的长方形地板铺设，需要多少块地板？`,
        answer: `${count}块`,
        solution: `1. 房间面积 = ${roomL} × ${roomW} = ${roomL * roomW}（平方米）\n2. 每块地板面积 = ${tileL} × ${tileW} = ${tileL * tileW}（平方米）\n3. 需要地板 = ${roomL * roomW} ÷ ${tileL * tileW} = ${count}（块）`,
        type: '地板铺设',
        difficulty: 2,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}

// ============ 第十一章应用题：统计 ============
// 模板数：8个
// 场景：成绩统计、气温记录、运动数据、图书借阅、投票统计、体重记录、身高统计、消费记录
// 综合前面知识点

export function genAppCh11() {
  const templates = [
    // 1. 成绩统计
    () => {
      const scores = [
        { name: '算算猫🐱', score: randInt(80, 99) },
        { name: '智慧龙🐉', score: randInt(80, 99) },
        { name: '企鹅博士🐧', score: randInt(80, 99) },
        { name: '小熊老师🐻', score: randInt(80, 99) },
      ];
      const sum = scores.reduce((a, s) => a + s.score, 0);
      const avg = Math.floor(sum / scores.length);
      return {
        content: `${scores.map(s => `${s.name}数学考了${s.score}分`).join('、')}，他们的平均分是多少分？`,
        answer: `${avg}分`,
        solution: `1. 总分 = ${scores.map(s => s.score).join(' + ')} = ${sum}（分）\n2. 人数 = ${scores.length}人\n3. 平均分 = 总分 ÷ 人数\n4. ${sum} ÷ ${scores.length} = ${avg}（分）`,
        type: '成绩统计',
        difficulty: 2,
      };
    },
    // 2. 气温记录
    () => {
      const temps = Array.from({ length: 7 }, () => randInt(15, 35));
      const sum = temps.reduce((a, b) => a + b, 0);
      const avg = Math.floor(sum / 7);
      const max = Math.max(...temps);
      const min = Math.min(...temps);
      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return {
        content: `机灵狐🦊记录了一周的气温：${days.map((d, i) => `${d}${temps[i]}℃`).join('、')}，这一周的平均气温是多少度？最高温和最低温相差多少度？`,
        answer: `平均${avg}℃,相差${max - min}℃`,
        solution: `1. ${days.map((d, i) => `${d}：${temps[i]}℃`).join('\n2. ')}\n8. 总温度 = ${temps.join(' + ')} = ${sum}（℃）\n9. 平均温度 = ${sum} ÷ 7 = ${avg}（℃）\n10. 最高${max}℃，最低${min}℃\n11. 相差 = ${max} - ${min} = ${max - min}（℃）`,
        type: '气温记录',
        difficulty: 2,
      };
    },
    // 3. 运动数据
    () => {
      const week1 = Array.from({ length: 5 }, () => randInt(20, 50));
      const week2 = Array.from({ length: 5 }, () => randInt(20, 50));
      const sum1 = week1.reduce((a, b) => a + b, 0);
      const sum2 = week2.reduce((a, b) => a + b, 0);
      const avg1 = Math.floor(sum1 / 5);
      const avg2 = Math.floor(sum2 / 5);
      return {
        content: `猫头鹰🦉记录了两周每天跳绳的个数，第一周（周一至周五）分别为：${week1.join('、')}个；第二周分别为：${week2.join('、')}个。哪一周的平均每天跳得多？多多少个？`,
        answer: `第${sum1 >= sum2 ? '一' : '二'}周多,多${Math.abs(avg1 - avg2)}个`,
        solution: `1. 第一周总数 = ${week1.join(' + ')} = ${sum1}（个），平均 = ${avg1}个/天\n2. 第二周总数 = ${week2.join(' + ')} = ${sum2}（个），平均 = ${avg2}个/天\n3. ${sum1 >= sum2 ? '第一周' : '第二周'}平均多\n4. 多了 = ${Math.abs(avg1 - avg2)}（个/天）`,
        type: '运动数据',
        difficulty: 3,
      };
    },
    // 4. 图书借阅
    () => {
      const books = ['童话', '科普', '漫画', '历史'];
      const vals = books.map(() => randInt(10, 50));
      const sum = vals.reduce((a, b) => a + b, 0);
      const maxVal = Math.max(...vals);
      const minVal = Math.min(...vals);
      return {
        content: `小兔子🐰统计图书馆借阅数据：${books.map((b, i) => `${b}类${vals[i]}本`).join('、')}，一共借出多少本？借阅最多的比最少的多多少本？`,
        answer: `共${sum}本,多${maxVal - minVal}本`,
        solution: `1. ${books.map((b, i) => `${b}类：${vals[i]}本`).join('\n2. ')}\n5. 总借阅 = ${vals.join(' + ')} = ${sum}（本）\n6. 最多${maxVal}本，最少${minVal}本\n7. 相差 = ${maxVal} - ${minVal} = ${maxVal - minVal}（本）`,
        type: '图书借阅',
        difficulty: 2,
      };
    },
    // 5. 投票统计
    () => {
      const candidates = ['小青蛙🐸', '小鸭子🐥', '小金鱼🐟'];
      const votes = candidates.map(() => randInt(15, 40));
      const sum = votes.reduce((a, b) => a + b, 0);
      const maxVotes = Math.max(...votes);
      const winner = candidates[votes.indexOf(maxVotes)];
      return {
        content: `班级投票选班长：${candidates.map((c, i) => `${c}得${votes[i]}票`).join('、')}，一共投了多少票？谁当选了？`,
        answer: `共${sum}票,${winner}当选`,
        solution: `1. ${candidates.map((c, i) => `${c}：${votes[i]}票`).join('\n2. ')}\n4. 总票数 = ${votes.join(' + ')} = ${sum}（票）\n5. 最多：${winner} ${maxVotes}票\n6. ${winner}当选`,
        type: '投票统计',
        difficulty: 2,
      };
    },
    // 6. 体重记录
    () => {
      const months = ['1月', '3月', '6月'];
      const weights = [randInt(22, 28)];
      weights.push(weights[0] + randInt(1, 3));
      weights.push(weights[1] + randInt(1, 3));
      const totalGain = weights[2] - weights[0];
      return {
        content: `小猴子🐒记录体重：${months[0]}份${weights[0]}千克，${months[1]}份${weights[1]}千克，${months[2]}份${weights[2]}千克，半年体重增加了多少千克？`,
        answer: `${totalGain}千克`,
        solution: `1. ${months[0]}份${weights[0]}千克\n2. ${months[1]}份${weights[1]}千克\n3. ${months[2]}份${weights[2]}千克\n4. 增加 = ${weights[2]} - ${weights[0]} = ${totalGain}（千克）`,
        type: '体重记录',
        difficulty: 2,
      };
    },
    // 7. 身高统计
    () => {
      const students = ['算算猫🐱', '智慧龙🐉', '企鹅博士🐧', '小熊老师🐻', '机灵狐🦊'];
      const heights = students.map(() => randInt(125, 145));
      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = Math.floor(sum / 5);
      const maxH = Math.max(...heights);
      const minH = Math.min(...heights);
      return {
        content: `${students.map((s, i) => `${s}身高${heights[i]}厘米`).join('、')}，他们的平均身高是多少厘米？最高和最矮相差多少厘米？`,
        answer: `平均${avg}厘米,相差${maxH - minH}厘米`,
        solution: `1. ${students.map((s, i) => `${s}：${heights[i]}厘米`).join('\n2. ')}\n6. 总身高 = ${heights.join(' + ')} = ${sum}（厘米）\n7. 平均身高 = ${sum} ÷ 5 = ${avg}（厘米）\n8. 最高${maxH}厘米，最矮${minH}厘米\n9. 相差 = ${maxH} - ${minH} = ${maxH - minH}（厘米）`,
        type: '身高统计',
        difficulty: 2,
      };
    },
    // 8. 消费记录
    () => {
      const weeks = ['第一周', '第二周', '第三周', '第四周'];
      const spends = weeks.map(() => randInt(5, 25));
      const sum = spends.reduce((a, b) => a + b, 0);
      const avg = Math.floor(sum / 4);
      const budget = randInt(sum + 10, sum + 50);
      return {
        content: `小金鱼🐟记录了零花钱消费：${weeks.map((w, i) => `${w}${spends[i]}元`).join('、')}，平均每周花多少元？如果每月预算${budget}元，还剩多少元？`,
        answer: `平均每周${avg}元,剩${budget - sum}元`,
        solution: `1. ${weeks.map((w, i) => `${w}：${spends[i]}元`).join('\n2. ')}\n5. 总消费 = ${spends.join(' + ')} = ${sum}（元）\n6. 平均每周 = ${sum} ÷ 4 = ${avg}（元）\n7. 预算${budget}元\n8. 剩余 = ${budget} - ${sum} = ${budget - sum}（元）`,
        type: '消费记录',
        difficulty: 3,
      };
    },
  ];
  return { ...pick(templates)(), difficulty: 2 };
}
