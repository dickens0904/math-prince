// 数学小王子 · 奥数班主题定义
// 面向2年级普通孩子，只做入门级（L1），做扎实再考虑进阶
// 四大主题：数论、几何、组合、应用题

export const TOPICS = [
  {
    id: 'number-theory',
    name: '数论',
    icon: '🔢',
    color: '#FF6B6B',
    description: '奇偶性、余数、整除、质数',
    levels: [
      { id: 'l1', name: '入门', description: '建立数论基本概念' },
    ],
  },
  {
    id: 'geometry',
    name: '几何',
    icon: '📐',
    color: '#4ECDC4',
    description: '周长、面积（长方形、三角形、正方形）',
    levels: [
      { id: 'l1', name: '入门', description: '建立几何基本概念' },
    ],
  },
  {
    id: 'combinatorics',
    name: '组合',
    icon: '🎲',
    color: '#FFE66D',
    description: '加法原理、乘法原理、简单排列、简单组合',
    levels: [
      { id: 'l1', name: '入门', description: '建立计数基本概念' },
    ],
  },
  {
    id: 'word-problems',
    name: '应用题',
    icon: '📝',
    color: '#95E1D3',
    description: '和差倍、鸡兔同笼',
    levels: [
      { id: 'l1', name: '入门', description: '掌握经典应用题模型' },
    ],
  },
];

// 获取主题
export function getTopic(topicId) {
  return TOPICS.find(t => t.id === topicId);
}
