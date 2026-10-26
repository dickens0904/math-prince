// 二年级更多应用题模板

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// ============ 购物应用题（更多场景） ============

export function genShoppingApp() {
  const templates = [
    // 买文具
    () => {
      const pencilPrice = randInt(1, 5);
      const eraserPrice = randInt(1, 3);
      const pencilCount = randInt(2, 5);
      const eraserCount = randInt(1, 3);
      const total = pencilPrice * pencilCount + eraserPrice * eraserCount;
      return {
        content: `铅笔每支${pencilPrice}元，橡皮每块${eraserPrice}元。小明买了${pencilCount}支铅笔和${eraserCount}块橡皮，一共要付多少钱？`,
        answer: String(total),
        type: '购物应用',
      };
    },
    // 找零问题
    () => {
      const price = randInt(10, 50);
      const pay = price + randInt(5, 20);
      return {
        content: `一本书${price}元，小红付了${pay}元，应找回多少元？`,
        answer: String(pay - price),
        type: '购物找零',
      };
    },
    // 比较价格
    () => {
      const priceA = randInt(15, 40);
      const priceB = randInt(10, priceA - 5);
      return {
        content: `玩具汽车${priceA}元，玩具飞机${priceB}元。汽车比飞机贵多少元？`,
        answer: String(priceA - priceB),
        type: '比较价格',
      };
    },
    // 买水果
    () => {
      const applePrice = randInt(3, 8);
      const orangePrice = randInt(2, 6);
      const appleCount = randInt(2, 4);
      const orangeCount = randInt(2, 4);
      const total = applePrice * appleCount + orangePrice * orangeCount;
      return {
        content: `苹果每千克${applePrice}元，橘子每千克${orangePrice}元。妈妈买了${appleCount}千克苹果和${orangeCount}千克橘子，一共花了多少钱？`,
        answer: String(total),
        type: '买水果',
      };
    },
    // 买衣服
    () => {
      const shirtPrice = randInt(30, 80);
      const pantsPrice = randInt(20, 60);
      return {
        content: `一件衬衫${shirtPrice}元，一条裤子${pantsPrice}元。买一套衣服需要多少钱？`,
        answer: String(shirtPrice + pantsPrice),
        type: '买衣服',
      };
    },
    // 买票问题
    () => {
      const adultPrice = randInt(20, 50);
      const childPrice = Math.floor(adultPrice / 2);
      const adults = randInt(1, 2);
      const children = randInt(1, 3);
      const total = adultPrice * adults + childPrice * children;
      return {
        content: `成人票每张${adultPrice}元，儿童票每张${childPrice}元。${adults}个大人和${children}个小孩去看电影，买票一共要多少钱？`,
        answer: String(total),
        type: '买票问题',
      };
    },
    // 优惠问题
    () => {
      const price = randInt(20, 60);
      const discount = randInt(5, 15);
      return {
        content: `一件衣服原价${price}元，现在优惠${discount}元，现价多少元？`,
        answer: String(price - discount),
        type: '优惠问题',
      };
    },
  ];
  return pick(templates)();
}

// ============ 生活应用题 ============

export function genLifeApp() {
  const templates = [
    // 做家务
    () => {
      const total = randInt(10, 30);
      const done = randInt(3, total - 3);
      return {
        content: `小明要洗${total}个碗，已经洗了${done}个，还要洗多少个？`,
        answer: String(total - done),
        type: '做家务',
      };
    },
    // 养宠物
    () => {
      const fishA = randInt(3, 10);
      const fishB = randInt(3, 10);
      return {
        content: `鱼缸里有${fishA}条红金鱼和${fishB}条黑金鱼，一共有多少条金鱼？`,
        answer: String(fishA + fishB),
        type: '养宠物',
      };
    },
    // 种花
    () => {
      const flowers = randInt(10, 30);
      const rows = randInt(2, 5);
      if (flowers % rows !== 0) return genLifeApp();
      return {
        content: `花园里有${flowers}朵花，平均种成${rows}行，每行有多少朵？`,
        answer: String(flowers / rows),
        type: '种花',
      };
    },
    // 收集邮票
    () => {
      const stampsA = randInt(10, 30);
      const stampsB = randInt(10, 30);
      return {
        content: `小明有${stampsA}张邮票，小红有${stampsB}张邮票，他们一共有多少张邮票？`,
        answer: String(stampsA + stampsB),
        type: '收集邮票',
      };
    },
    // 折纸鹤
    () => {
      const perDay = randInt(3, 8);
      const days = randInt(2, 5);
      return {
        content: `小明每天折${perDay}只纸鹤，${days}天能折多少只？`,
        answer: String(perDay * days),
        type: '折纸鹤',
      };
    },
    // 读书
    () => {
      const totalPages = randInt(50, 200);
      const readPages = randInt(20, totalPages - 20);
      return {
        content: `一本书有${totalPages}页，小明已经读了${readPages}页，还有多少页没读？`,
        answer: String(totalPages - readPages),
        type: '读书',
      };
    },
    // 看电视
    () => {
      const startH = randInt(7, 10);
      const duration = randInt(1, 2);
      return {
        content: `小明${startH}时开始看电视，看了${duration}小时，几点结束？`,
        answer: `${startH + duration}时`,
        type: '看电视',
      };
    },
    // 做作业
    () => {
      const total = randInt(10, 30);
      const perPage = randInt(3, 6);
      if (total % perPage !== 0) return genLifeApp();
      return {
        content: `小明有${total}道题要做，每页做${perPage}道，需要多少页纸？`,
        answer: String(total / perPage),
        type: '做作业',
      };
    },
  ];
  return pick(templates)();
}

// ============ 运动应用题 ============

export function genSportsApp() {
  const templates = [
    // 跳绳
    () => {
      const perMin = randInt(30, 80);
      const mins = randInt(2, 5);
      return {
        content: `小红每分钟跳绳${perMin}下，${mins}分钟能跳多少下？`,
        answer: String(perMin * mins),
        type: '跳绳',
      };
    },
    // 跑步
    () => {
      const distance = randInt(100, 500);
      const laps = randInt(2, 4);
      return {
        content: `操场跑道一圈${distance}米，小明跑了${laps}圈，一共跑了多少米？`,
        answer: String(distance * laps),
        type: '跑步',
      };
    },
    // 踢毽子
    () => {
      const kicks = randInt(20, 50);
      const times = randInt(2, 4);
      return {
        content: `小明每次踢毽子${kicks}个，踢了${times}次，一共踢了多少个？`,
        answer: String(kicks * times),
        type: '踢毽子',
      };
    },
    // 拍球
    () => {
      const perMin = randInt(20, 60);
      const mins = randInt(2, 5);
      return {
        content: `小明每分钟拍球${perMin}下，${mins}分钟拍了多少下？`,
        answer: String(perMin * mins),
        type: '拍球',
      };
    },
    // 游泳
    () => {
      const poolLength = randInt(20, 50);
      const laps = randInt(2, 5);
      return {
        content: `游泳池长${poolLength}米，小明游了${laps}个来回，一共游了多少米？（1个来回=2个单程）`,
        answer: String(poolLength * laps * 2),
        type: '游泳',
      };
    },
    // 比赛得分
    () => {
      const scoreA = randInt(20, 50);
      const scoreB = randInt(10, scoreA - 5);
      return {
        content: `篮球比赛，甲队得了${scoreA}分，乙队得了${scoreB}分，甲队赢了多少分？`,
        answer: String(scoreA - scoreB),
        type: '比赛得分',
      };
    },
  ];
  return pick(templates)();
}

// ============ 自然应用题 ============

export function genNatureApp() {
  const templates = [
    // 植树
    () => {
      const trees = randInt(10, 30);
      const planters = randInt(2, 5);
      if (trees % planters !== 0) return genNatureApp();
      return {
        content: `一共要种${trees}棵树，${planters}个小朋友平均每人种多少棵？`,
        answer: String(trees / planters),
        type: '植树',
      };
    },
    // 采花
    () => {
      const flowers = randInt(15, 40);
      const vases = randInt(3, 6);
      if (flowers % vases !== 0) return genNatureApp();
      return {
        content: `采了${flowers}朵花，平均插在${vases}个花瓶里，每个花瓶插多少朵？`,
        answer: String(flowers / vases),
        type: '采花',
      };
    },
    // 喂动物
    () => {
      const foodPerAnimal = randInt(2, 5);
      const animals = randInt(3, 8);
      return {
        content: `每只小兔吃${foodPerAnimal}根胡萝卜，${animals}只小兔一共吃多少根？`,
        answer: String(foodPerAnimal * animals),
        type: '喂动物',
      };
    },
    // 摘苹果
    () => {
      const apples = randInt(20, 60);
      const baskets = randInt(2, 5);
      if (apples % baskets !== 0) return genNatureApp();
      return {
        content: `摘了${apples}个苹果，平均装在${baskets}个篮子里，每个篮子装多少个？`,
        answer: String(apples / baskets),
        type: '摘苹果',
      };
    },
    // 钓鱼
    () => {
      const fishA = randInt(3, 10);
      const fishB = randInt(3, 10);
      return {
        content: `爸爸钓了${fishA}条鱼，妈妈钓了${fishB}条鱼，他们一共钓了多少条鱼？`,
        answer: String(fishA + fishB),
        type: '钓鱼',
      };
    },
    // 观察昆虫
    () => {
      const legs = 6;
      const count = randInt(3, 8);
      return {
        content: `一只蚂蚁有${legs}条腿，${count}只蚂蚁一共有多少条腿？`,
        answer: String(legs * count),
        type: '观察昆虫',
      };
    },
  ];
  return pick(templates)();
}

// ============ 时间应用题（更多场景） ============

export function genTimeApp() {
  const templates = [
    // 计算时长
    () => {
      const startH = randInt(8, 14);
      const endH = startH + randInt(1, 3);
      return {
        content: `小明${startH}时开始学习，${endH}时结束，学习了多少小时？`,
        answer: `${endH - startH}小时`,
        type: '计算时长',
      };
    },
    // 开始时间
    () => {
      const endH = randInt(10, 16);
      const duration = randInt(1, 3);
      return {
        content: `小明${endH}时完成作业，做了${duration}小时，几点开始做的？`,
        answer: `${endH - duration}时`,
        type: '开始时间',
      };
    },
    // 结束时间
    () => {
      const startH = randInt(8, 14);
      const duration = randInt(1, 3);
      return {
        content: `电影${startH}时开始，放映${duration}小时，几点结束？`,
        answer: `${startH + duration}时`,
        type: '结束时间',
      };
    },
    // 比较时间
    () => {
      const minsA = randInt(20, 60);
      const minsB = randInt(20, 60);
      const diff = Math.abs(minsA - minsB);
      return {
        content: `小明做作业用了${minsA}分钟，小红用了${minsB}分钟，谁用的时间多？多多少分钟？`,
        answer: `${minsA >= minsB ? '小明' : '小红'},多${diff}分钟`,
        type: '比较时间',
      };
    },
    // 时间换算
    () => {
      const hours = randInt(1, 3);
      return {
        content: `${hours}小时等于多少分钟？`,
        answer: `${hours * 60}分钟`,
        type: '时间换算',
      };
    },
    // 作息时间
    () => {
      const wakeH = randInt(6, 7);
      const sleepH = randInt(20, 22);
      return {
        content: `小明早上${wakeH}时起床，晚上${sleepH}时睡觉，他一天清醒多少小时？`,
        answer: `${sleepH - wakeH}小时`,
        type: '作息时间',
      };
    },
  ];
  return pick(templates)();
}

// ============ 图形应用题（更多场景） ============

export function genShapeApp() {
  const templates = [
    // 计算周长
    () => {
      const l = randInt(3, 12);
      const w = randInt(2, 8);
      return {
        content: `一个长方形，长${l}厘米，宽${w}厘米，它的周长是多少厘米？`,
        answer: `${2 * (l + w)}厘米`,
        type: '计算周长',
      };
    },
    // 正方形周长
    () => {
      const s = randInt(2, 10);
      return {
        content: `一个正方形的边长是${s}厘米，它的周长是多少厘米？`,
        answer: `${4 * s}厘米`,
        type: '正方形周长',
      };
    },
    // 比较周长
    () => {
      const squareSide = randInt(3, 8);
      const rectL = squareSide + randInt(1, 3);
      const rectW = squareSide - randInt(1, 2);
      const squareP = 4 * squareSide;
      const rectP = 2 * (rectL + rectW);
      return {
        content: `正方形边长${squareSide}厘米，长方形长${rectL}厘米宽${rectW}厘米，哪个图形的周长长？长多少厘米？`,
        answer: `${squareP >= rectP ? '正方形' : '长方形'},长${Math.abs(squareP - rectP)}厘米`,
        type: '比较周长',
      };
    },
    // 数图形
    () => {
      const squares = randInt(2, 5);
      const triangles = randInt(1, 4);
      const circles = randInt(1, 3);
      return {
        content: `图中有${squares}个正方形、${triangles}个三角形和${circles}个圆形，一共有多少个图形？`,
        answer: `${squares + triangles + circles}个`,
        type: '数图形',
      };
    },
    // 图形特征
    () => {
      const questions = [
        { content: '长方形有几个直角？', answer: '4个' },
        { content: '正方形有几个直角？', answer: '4个' },
        { content: '三角形有几个角？', answer: '3个' },
        { content: '长方形的对边有什么特点？', answer: '相等' },
        { content: '正方形的四条边有什么特点？', answer: '都相等' },
      ];
      return pick(questions);
    },
    // 围篱笆
    () => {
      const l = randInt(5, 15);
      const w = randInt(3, 10);
      return {
        content: `一块长方形菜地，长${l}米，宽${w}米，四周围上篱笆，篱笆长多少米？`,
        answer: `${2 * (l + w)}米`,
        type: '围篱笆',
      };
    },
    // 走路问题
    () => {
      const s = randInt(5, 15);
      return {
        content: `沿正方形花坛走一圈，花坛边长${s}米，走了多少米？`,
        answer: `${4 * s}米`,
        type: '走路问题',
      };
    },
  ];
  return pick(templates)();
}

// ============ 混合应用题（综合多个知识点） ============

export function genMixedApp() {
  const templates = [
    // 购物+找零+计算
    () => {
      const priceA = randInt(5, 15);
      const priceB = randInt(3, 10);
      const countA = randInt(2, 4);
      const countB = randInt(1, 3);
      const total = priceA * countA + priceB * countB;
      const pay = total + randInt(10, 30);
      return {
        content: `笔记本每本${priceA}元，铅笔每支${priceB}元。小明买了${countA}本笔记本和${countB}支铅笔，付了${pay}元，应找回多少元？`,
        answer: `${pay - total}元`,
        type: '购物综合',
      };
    },
    // 运动+时间
    () => {
      const speed = randInt(50, 100); // 米/分钟
      const mins = randInt(5, 15);
      const totalDist = speed * mins;
      const targetDist = randInt(500, 1000);
      return {
        content: `小明跑步速度是每分钟${speed}米，跑了${mins}分钟。他一共跑了多少米？距离目标${targetDist}米还差多少米？`,
        answer: `${totalDist}米,还差${targetDist - totalDist}米`,
        type: '运动综合',
      };
    },
    // 分配+比较
    () => {
      const totalA = randInt(20, 40);
      const totalB = randInt(20, 40);
      const peopleA = randInt(2, 5);
      const peopleB = randInt(2, 5);
      if (totalA % peopleA !== 0 || totalB % peopleB !== 0) return genMixedApp();
      const perA = totalA / peopleA;
      const perB = totalB / peopleB;
      return {
        content: `甲组有${totalA}颗糖，平均分给${peopleA}人；乙组有${totalB}颗糖，平均分给${peopleB}人。哪组每人分到的糖多？多多少颗？`,
        answer: `${perA >= perB ? '甲' : '乙'}组,多${Math.abs(perA - perB)}颗`,
        type: '分配比较',
      };
    },
    // 时间+计算
    () => {
      const startH = randInt(8, 10);
      const endH = startH + randInt(2, 4);
      const perHour = randInt(5, 15);
      const hours = endH - startH;
      return {
        content: `小明${startH}时开始看书，${endH}时结束。如果他每小时看${perHour}页，一共看了多少页？`,
        answer: `${perHour * hours}页`,
        type: '时间计算',
      };
    },
    // 图形+计算
    () => {
      const squareSide = randInt(3, 8);
      const rectL = squareSide + 2;
      const rectW = squareSide - 1;
      const squareP = 4 * squareSide;
      const rectP = 2 * (rectL + rectW);
      const diff = Math.abs(squareP - rectP);
      return {
        content: `一个正方形边长${squareSide}厘米，一个长方形长${rectL}厘米、宽${rectW}厘米。正方形周长比长方形周长长多少厘米？`,
        answer: `${diff}厘米`,
        type: '图形计算',
      };
    },
    // 多步计算
    () => {
      const price = randInt(10, 30);
      const discount = randInt(5, 10);
      const quantity = randInt(2, 4);
      const total = (price - discount) * quantity;
      return {
        content: `一支钢笔原价${price}元，现在每支优惠${discount}元。小明买了${quantity}支，一共花了多少钱？`,
        answer: `${total}元`,
        type: '多步计算',
      };
    },
    // 混合运算
    () => {
      const a = randInt(20, 50);
      const b = randInt(10, 30);
      const c = randInt(5, 15);
      return {
        content: `小明有${a}元，买书花了${b}元，买笔花了${c}元，还剩多少元？`,
        answer: `${a - b - c}元`,
        type: '混合运算',
      };
    },
    // 平均数问题
    () => {
      const scores = [randInt(80, 100), randInt(80, 100), randInt(80, 100)];
      const avg = Math.round((scores[0] + scores[1] + scores[2]) / 3);
      return {
        content: `小明三次数学成绩分别是${scores[0]}分、${scores[1]}分、${scores[2]}分，平均成绩是多少分？`,
        answer: `${avg}分`,
        type: '平均数',
      };
    },
  ];
  return pick(templates)();
}
