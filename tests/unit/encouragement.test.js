import {
  characters,
  getRandomCharacter,
  correctMessages,
  wrongMessages,
  comboMessages,
  getComboMessage,
  getResultComment,
  getCharacterDialogue,
  getCorrectMessage,
  getWrongMessage,
  getQuestionEmoji,
  generateFireworkParticles,
  celebrationColors,
} from '../../src/renderer/utils/encouragement.js';

describe('角色系统', () => {
  test('characters 数组有6个角色', () => {
    expect(characters).toHaveLength(6);
  });

  test('每个角色都有必需字段', () => {
    characters.forEach(char => {
      expect(char).toHaveProperty('id');
      expect(char).toHaveProperty('name');
      expect(char).toHaveProperty('emoji');
      expect(char).toHaveProperty('color');
      expect(char).toHaveProperty('greeting');
      expect(char).toHaveProperty('personality');
    });
  });

  test('角色 id 唯一', () => {
    const ids = characters.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('getRandomCharacter 返回有效角色', () => {
    for (let i = 0; i < 20; i++) {
      const char = getRandomCharacter();
      expect(characters).toContainEqual(char);
    }
  });
});

describe('鼓励语系统', () => {
  test('正确鼓励语数组非空', () => {
    expect(correctMessages.length).toBeGreaterThan(0);
  });

  test('错误鼓励语数组非空', () => {
    expect(wrongMessages.length).toBeGreaterThan(0);
  });

  test('连击消息覆盖 3/5/7/10 级别', () => {
    expect(comboMessages).toHaveProperty('3');
    expect(comboMessages).toHaveProperty('5');
    expect(comboMessages).toHaveProperty('7');
    expect(comboMessages).toHaveProperty('10');
  });

  test('getComboMessage - 连击数不足3返回null', () => {
    expect(getComboMessage(0)).toBeNull();
    expect(getComboMessage(1)).toBeNull();
    expect(getComboMessage(2)).toBeNull();
  });

  test('getComboMessage - 连击3返回三连击消息', () => {
    const msg = getComboMessage(3);
    expect(msg).toBeTruthy();
    expect(comboMessages[3]).toContain(msg);
  });

  test('getComboMessage - 连击5返回五连击消息', () => {
    const msg = getComboMessage(5);
    expect(msg).toBeTruthy();
    expect(comboMessages[5]).toContain(msg);
  });

  test('getComboMessage - 连击10返回十连击消息', () => {
    const msg = getComboMessage(10);
    expect(msg).toBeTruthy();
    expect(comboMessages[10]).toContain(msg);
  });

  test('getComboMessage - 连击15返回十连击消息（最高级）', () => {
    const msg = getComboMessage(15);
    expect(msg).toBeTruthy();
    expect(comboMessages[10]).toContain(msg);
  });
});

describe('结果评语', () => {
  test('getResultComment - 95%以上为S级', () => {
    const result = getResultComment(95);
    expect(result.level).toBe('S');
    expect(result.emoji).toBe('👑');
  });

  test('getResultComment - 85%为A级', () => {
    const result = getResultComment(85);
    expect(result.level).toBe('A');
  });

  test('getResultComment - 70%为B级', () => {
    const result = getResultComment(70);
    expect(result.level).toBe('B');
  });

  test('getResultComment - 50%为C级', () => {
    const result = getResultComment(50);
    expect(result.level).toBe('C');
  });

  test('getResultComment - 30%为D级', () => {
    const result = getResultComment(30);
    expect(result.level).toBe('D');
  });

  test('getResultComment - 每个结果都有text和emoji', () => {
    [100, 90, 75, 55, 20].forEach(acc => {
      const r = getResultComment(acc);
      expect(r).toHaveProperty('text');
      expect(r).toHaveProperty('emoji');
      expect(r).toHaveProperty('level');
    });
  });
});

describe('角色对话', () => {
  const testChar = characters[0]; // 算算猫

  test('getCharacterDialogue - correct类型包含角色名', () => {
    const msg = getCharacterDialogue(testChar, 'correct');
    expect(msg).toContain(testChar.name);
  });

  test('getCharacterDialogue - wrong类型包含角色名', () => {
    const msg = getCharacterDialogue(testChar, 'wrong');
    expect(msg).toContain(testChar.name);
  });

  test('getCharacterDialogue - start类型包含角色名', () => {
    const msg = getCharacterDialogue(testChar, 'start');
    expect(msg).toContain(testChar.name);
  });

  test('getCharacterDialogue - 无效类型返回空字符串', () => {
    const msg = getCharacterDialogue(testChar, 'nonexistent');
    expect(msg).toBe('');
  });

  test('getCharacterDialogue - 无角色时使用小助手', () => {
    const msg = getCharacterDialogue(null, 'correct');
    expect(msg).toContain('小助手');
  });
});

describe('正确/错误消息', () => {
  const testChar = characters[0];

  test('getCorrectMessage - 连击3返回连击消息', () => {
    const msg = getCorrectMessage(testChar, 3);
    expect(comboMessages[3]).toContain(msg);
  });

  test('getCorrectMessage - 无连击返回角色对话', () => {
    const msg = getCorrectMessage(testChar, 1);
    expect(msg).toContain(testChar.name);
  });

  test('getCorrectMessage - 无角色无连击返回基础消息', () => {
    const msg = getCorrectMessage(null, 1);
    expect(correctMessages).toContain(msg);
  });

  test('getWrongMessage - 有角色返回角色对话', () => {
    const msg = getWrongMessage(testChar);
    expect(msg).toContain(testChar.name);
  });

  test('getWrongMessage - 无角色返回基础消息', () => {
    const msg = getWrongMessage(null);
    expect(wrongMessages).toContain(msg);
  });
});

describe('题目表情装饰', () => {
  test('getQuestionEmoji - 购物返回购物车', () => {
    expect(getQuestionEmoji('购物问题')).toBe('🛒');
  });

  test('getQuestionEmoji - 苹果返回苹果emoji', () => {
    expect(getQuestionEmoji('小明有3个苹果')).toBe('🍎');
  });

  test('getQuestionEmoji - 加法返回加号', () => {
    expect(getQuestionEmoji('加法运算')).toBe('➕');
  });

  test('getQuestionEmoji - 未知类型返回默认emoji', () => {
    expect(getQuestionEmoji('未知题目类型')).toBe('📝');
  });

  test('getQuestionEmoji - 空字符串返回默认emoji', () => {
    expect(getQuestionEmoji('')).toBe('📝');
  });

  test('getQuestionEmoji - undefined返回默认emoji', () => {
    expect(getQuestionEmoji(undefined)).toBe('📝');
  });
});

describe('庆祝特效', () => {
  test('celebrationColors 有10种颜色', () => {
    expect(celebrationColors).toHaveLength(10);
  });

  test('generateFireworkParticles 生成指定数量粒子', () => {
    const particles = generateFireworkParticles(100, 100, 15);
    expect(particles).toHaveLength(15);
  });

  test('每个粒子有完整属性', () => {
    const particles = generateFireworkParticles(100, 100, 5);
    particles.forEach(p => {
      expect(p).toHaveProperty('x');
      expect(p).toHaveProperty('y');
      expect(p).toHaveProperty('targetX');
      expect(p).toHaveProperty('targetY');
      expect(p).toHaveProperty('color');
      expect(p).toHaveProperty('size');
      expect(celebrationColors).toContain(p.color);
    });
  });

  test('粒子坐标以中心点为基准', () => {
    const cx = 200,
      cy = 300;
    const particles = generateFireworkParticles(cx, cy, 10);
    particles.forEach(p => {
      expect(p.x).toBe(cx);
      expect(p.y).toBe(cy);
    });
  });
});
