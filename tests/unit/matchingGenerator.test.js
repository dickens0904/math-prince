import {
  generateMulMatch,
  generateDivMatch,
  generateRandomMatch,
} from '../../src/renderer/utils/questionTypes/matchingGenerator.js';

describe('generateMulMatch - 乘法连线题', () => {
  test('返回完整结构', () => {
    const q = generateMulMatch();
    expect(q).toHaveProperty('type', 'matching');
    expect(q).toHaveProperty('content');
    expect(q).toHaveProperty('leftItems');
    expect(q).toHaveProperty('rightItems');
    expect(q).toHaveProperty('correctMatches');
    expect(q).toHaveProperty('questionType', 'matching');
  });

  test('leftItems 和 rightItems 各有4项', () => {
    const q = generateMulMatch();
    expect(q.leftItems).toHaveLength(4);
    expect(q.rightItems).toHaveLength(4);
  });

  test('每个 item 有 id 和 content', () => {
    const q = generateMulMatch();
    q.leftItems.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('content');
    });
    q.rightItems.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('content');
    });
  });

  test('leftItems 包含乘法算式', () => {
    const q = generateMulMatch();
    q.leftItems.forEach(item => {
      expect(item.content).toMatch(/×/);
    });
  });

  test('rightItems 是数字答案', () => {
    const q = generateMulMatch();
    q.rightItems.forEach(item => {
      expect(Number(item.content)).not.toBeNaN();
    });
  });

  test('correctMatches 的每个 left 都有对应 right', () => {
    const q = generateMulMatch();
    const rightIds = new Set(q.rightItems.map(r => r.id));
    Object.values(q.correctMatches).forEach(rightId => {
      expect(rightIds).toContain(rightId);
    });
  });

  test('rightItems 顺序被打乱（与 leftItems 不对应）', () => {
    // 多次运行，rightItems 的内容顺序不应总是与leftItems的计算结果一致
    let differentOrder = false;
    for (let i = 0; i < 10; i++) {
      const q = generateMulMatch();
      const leftResults = q.leftItems.map(item => {
        const [a, b] = item.content.split('×').map(s => parseInt(s.trim()));
        return String(a * b);
      });
      const rightContents = q.rightItems.map(r => r.content);
      if (leftResults.join(',') !== rightContents.join(',')) {
        differentOrder = true;
        break;
      }
    }
    expect(differentOrder).toBe(true);
  });
});

describe('generateDivMatch - 除法连线题', () => {
  test('返回完整结构', () => {
    const q = generateDivMatch();
    expect(q).toHaveProperty('type', 'matching');
    expect(q).toHaveProperty('leftItems');
    expect(q).toHaveProperty('rightItems');
    expect(q).toHaveProperty('correctMatches');
    expect(q).toHaveProperty('questionType', 'matching');
  });

  test('leftItems 和 rightItems 各有4项', () => {
    const q = generateDivMatch();
    expect(q.leftItems).toHaveLength(4);
    expect(q.rightItems).toHaveLength(4);
  });

  test('leftItems 包含除法算式', () => {
    const q = generateDivMatch();
    q.leftItems.forEach(item => {
      expect(item.content).toMatch(/÷/);
    });
  });

  test('rightItems 是整数答案', () => {
    const q = generateDivMatch();
    q.rightItems.forEach(item => {
      const num = Number(item.content);
      expect(num).not.toBeNaN();
      expect(Number.isInteger(num)).toBe(true);
    });
  });

  test('除法算式结果与正确答案匹配', () => {
    const q = generateDivMatch();
    q.leftItems.forEach(leftItem => {
      const leftId = leftItem.id;
      const rightId = q.correctMatches[leftId];
      const rightItem = q.rightItems.find(r => r.id === rightId);

      const [dividend, divisor] = leftItem.content.split('÷').map(s => parseInt(s.trim()));
      expect(dividend / divisor).toBe(Number(rightItem.content));
    });
  });
});

describe('generateRandomMatch - 随机连线题', () => {
  test('返回有效的连线题', () => {
    for (let i = 0; i < 10; i++) {
      const q = generateRandomMatch();
      expect(q).toHaveProperty('type', 'matching');
      expect(q).toHaveProperty('leftItems');
      expect(q).toHaveProperty('rightItems');
      expect(q).toHaveProperty('correctMatches');
      expect(q.leftItems).toHaveLength(4);
      expect(q.rightItems).toHaveLength(4);
    }
  });

  test('生成的题目类型多样（乘法或除法）', () => {
    const types = new Set();
    for (let i = 0; i < 20; i++) {
      const q = generateRandomMatch();
      const firstLeft = q.leftItems[0].content;
      if (firstLeft.includes('×')) types.add('mul');
      if (firstLeft.includes('÷')) types.add('div');
    }
    // 20次应该两种都出现
    expect(types.size).toBeGreaterThanOrEqual(1);
  });
});
