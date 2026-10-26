// 鼓励语系统 + 角色系统 - 寓教于乐的核心

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ==================== 角色系统 ====================

export const characters = [
  {
    id: 'cat',
    name: '算算猫',
    emoji: '🐱',
    color: '#FF9800',
    greeting: '喵~ 一起来做数学题吧！',
    personality: '温柔可爱',
  },
  {
    id: 'dragon',
    name: '智慧龙',
    emoji: '🐉',
    color: '#4CAF50',
    greeting: '我是智慧龙，数学难题难不倒我们！',
    personality: '勇敢自信',
  },
  {
    id: 'owl',
    name: '学霸猫头鹰',
    emoji: '🦉',
    color: '#9C27B0',
    greeting: '呼呼~ 让我来帮你学数学！',
    personality: '聪明沉稳',
  },
  {
    id: 'penguin',
    name: '企鹅博士',
    emoji: '🐧',
    color: '#2196F3',
    greeting: '数学世界真奇妙，一起去探险吧！',
    personality: '活泼有趣',
  },
  {
    id: 'bear',
    name: '小熊老师',
    emoji: '🐻',
    color: '#795548',
    greeting: '做题不怕难，我们一起加油！',
    personality: '耐心温暖',
  },
  {
    id: 'fox',
    name: '机灵狐',
    emoji: '🦊',
    color: '#FF5722',
    greeting: '嘿嘿，数学就是一场游戏！',
    personality: '机智灵活',
  },
];

export function getRandomCharacter() {
  return pick(characters);
}

// ==================== 鼓励语系统 ====================

// 答对鼓励语（基础）
export const correctMessages = [
  '太棒了！🌟',
  '真厉害！💪',
  '答对啦！✨',
  '聪明！🧠',
  '厉害厉害！👏',
  '没错！就是它！🎯',
  '完美！💯',
  '你真棒！⭐',
  '正确！继续加油！🔥',
  '好样的！🏆',
  '太聪明了！💡',
  '一步到位！🎯',
  '快如闪电！⚡',
  '满分表现！💯',
  '数学小天才！🌈',
];

// 答错鼓励语（温暖安慰）
export const wrongMessages = [
  '没关系，再试一次！💪',
  '加油，你一定行！🌟',
  '差一点点，继续努力！✨',
  '别灰心，下次一定对！🌈',
  '勇敢尝试就是最棒的！👏',
  '学习就是不断尝试的过程！📚',
  '每个错误都是进步的机会！⭐',
  '休息一下，换个思路！🧠',
];

// 连击鼓励语
export const comboMessages = {
  3: ['三连击！🔥🔥🔥', '连续三题！太强了！💪', '三连胜！继续！⭐⭐⭐'],
  5: ['五连击！🔥🔥🔥🔥🔥', '太厉害了！五连胜！🏆', '无敌了！五连正确！🌟'],
  7: ['七连击！你是最棒的！👑', '超级学霸！七连胜！💎', '完美发挥！七连击！🎉'],
  10: [
    '十连击！！！全场最佳！！！🎊🎊🎊',
    '逆天了！十连胜！你是数学之王！👑🏆',
    '传奇！十连正确！宇宙最强！🚀✨',
  ],
};

// 根据连击数获取鼓励语
export function getComboMessage(streak) {
  if (streak >= 10) return pick(comboMessages[10]);
  if (streak >= 7) return pick(comboMessages[7]);
  if (streak >= 5) return pick(comboMessages[5]);
  if (streak >= 3) return pick(comboMessages[3]);
  return null;
}

// 练习结果评语
export function getResultComment(accuracy) {
  if (accuracy >= 95) return { text: '完美！你是数学小天才！🏆✨', emoji: '👑', level: 'S' };
  if (accuracy >= 85) return { text: '非常棒！继续保持！⭐', emoji: '🌟', level: 'A' };
  if (accuracy >= 70) return { text: '不错哦！再努力一点点！💪', emoji: '💪', level: 'B' };
  if (accuracy >= 50) return { text: '加油！多练习就会更好！📚', emoji: '📖', level: 'C' };
  return { text: '不要放弃！我们一起努力！🌈', emoji: '🌈', level: 'D' };
}

// 角色随机对话（练习中）
export const characterDialogues = {
  correct: [
    '答对啦！{char}为你骄傲！',
    '太聪明了！{char}都佩服你！',
    '完美！{char}给你点赞！',
    '厉害！{char}觉得你是小天才！',
    '正确！{char}开心得跳起来了！',
    '太棒了！{char}为你鼓掌！',
    '没错！{char}就知道你能行！',
  ],
  wrong: [
    '{char}相信你下次一定能对！',
    '没关系，{char}陪着你一起学！',
    '{char}说：错误是最好的老师！',
    '别担心，{char}和你一起想办法！',
    '{char}给你一个温暖的抱抱！',
    '加油！{char}永远支持你！',
  ],
  streak3: ['三连胜！{char}激动得转圈圈！', '{char}说：太厉害了，继续加油！'],
  streak5: ['五连胜！{char}为你放烟花！🎆', '{char}惊呆了：你是数学超人！'],
  start: [
    '准备好了吗？{char}和你一起出发！',
    '{char}说：今天也要元气满满哦！',
    '加油！{char}一直在你身边！',
  ],
  finish: [
    '辛苦了！{char}给你一个大大的赞！',
    '做完了！{char}为你感到骄傲！',
    '太棒了！{char}觉得你今天表现很好！',
  ],
};

// 获取角色对话
export function getCharacterDialogue(character, type) {
  const dialogues = characterDialogues[type];
  if (!dialogues) return '';
  const template = pick(dialogues);
  return template.replace(/\{char\}/g, character ? character.name : '小助手');
}

// 获取正确鼓励语（带角色）
export function getCorrectMessage(character, streak) {
  const comboMsg = getComboMessage(streak);
  if (comboMsg) return comboMsg;
  if (character) return getCharacterDialogue(character, 'correct');
  return pick(correctMessages);
}

// 获取错误鼓励语（带角色）
export function getWrongMessage(character) {
  if (character) return getCharacterDialogue(character, 'wrong');
  return pick(wrongMessages);
}

// ==================== 题目表情装饰 ====================

// 根据题目类型返回装饰emoji
export function getQuestionEmoji(type) {
  const emojiMap = {
    购物: '🛒',
    买: '🛍️',
    付: '💰',
    找: '💸',
    钱: '💰',
    苹果: '🍎',
    橘子: '🍊',
    水果: '🍇',
    香蕉: '🍌',
    铅笔: '✏️',
    橡皮: '🧹',
    书: '📖',
    故事: '📚',
    糖: '🍬',
    巧克力: '🍫',
    饼干: '🍪',
    蛋糕: '🎂',
    猫: '🐱',
    狗: '🐶',
    兔: '🐰',
    鸡: '🐔',
    鸭: '🦆',
    鱼: '🐟',
    花: '🌸',
    树: '🌳',
    草: '🌱',
    跳绳: '🤸',
    跑步: '🏃',
    运动: '⚽',
    球: '🏀',
    车: '🚗',
    飞机: '✈️',
    船: '🚢',
    时: '⏰',
    钟: '🕐',
    分: '⏱️',
    米: '📏',
    厘米: '📐',
    千米: '🗺️',
    千克: '⚖️',
    克: '⚖️',
    重量: '⚖️',
    三角: '🔺',
    正方形: '⬜',
    长方形: '▬',
    圆: '⭕',
    加: '➕',
    减: '➖',
    乘: '✖️',
    除: '➗',
    分数: '🔢',
    小数: '🔣',
    方程: '🔤',
  };
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (type && type.includes(key)) return emoji;
  }
  return '📝';
}

// ==================== 庆祝特效配置 ====================

export const celebrationColors = [
  '#FF6B6B',
  '#FFA07A',
  '#FFD700',
  '#98FB98',
  '#87CEEB',
  '#DDA0DD',
  '#FF69B4',
  '#00CED1',
  '#FF8C00',
  '#7B68EE',
];

export function generateFireworkParticles(centerX, centerY, count = 20) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const distance = 50 + Math.random() * 100;
    particles.push({
      x: centerX,
      y: centerY,
      targetX: Math.cos(angle) * distance,
      targetY: Math.sin(angle) * distance - 50,
      color: pick(celebrationColors),
      size: 6 + Math.random() * 8,
    });
  }
  return particles;
}

export default {
  characters,
  getRandomCharacter,
  getCorrectMessage,
  getWrongMessage,
  getComboMessage,
  getResultComment,
  getCharacterDialogue,
  getQuestionEmoji,
  generateFireworkParticles,
  celebrationColors,
};
