// 数学小王子 · 动画引擎
// 通用 p5.js 动画渲染器，根据动画类型加载对应 sketch
// 每个动画用种子随机，保证可复现

import {
  particleSplit,
  circleLoop,
  gridFill,
  sieveParticle,
  borderWalk,
  cutRearrange,
  branchPath,
  dualPath,
  particleArrange,
  particleCombine,
  balanceScale,
  ratioBar,
  legLift,
  candySplit,
  candyBag,
  candyDrag,
} from './sketches/index.js';

// 动画注册表
const ANIMATION_REGISTRY = {
  'particle-split': particleSplit,
  'circle-loop': circleLoop,
  'grid-fill': gridFill,
  'sieve-particle': sieveParticle,
  'border-walk': borderWalk,
  'cut-rearrange': cutRearrange,
  'branch-path': branchPath,
  'dual-path': dualPath,
  'particle-arrange': particleArrange,
  'particle-combine': particleCombine,
  'balance-scale': balanceScale,
  'ratio-bar': ratioBar,
  'leg-lift': legLift,
  'candy-split': candySplit,
  'candy-bag': candyBag,
  'candy-drag': candyDrag,
};

// 渲染动画到容器
export function renderAnimation(containerEl, animationConfig, onReady) {
  const sketch = ANIMATION_REGISTRY[animationConfig.type];
  if (!sketch) {
    console.warn('[AnimationEngine] 未知动画类型:', animationConfig.type);
    return null;
  }
  return sketch(containerEl, animationConfig, onReady);
}

// 销毁动画
export function destroyAnimation(instance) {
  if (!instance) return;
  if (instance.__resizeObserver) {
    try {
      instance.__resizeObserver.disconnect();
    } catch (e) {
      // ignore
    }
  }
  if (instance.remove) {
    instance.remove();
  }
}
