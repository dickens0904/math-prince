// 组合动画 sketches
import { createP5Instance, drawParticle, drawText } from './shared.js';

// 加法原理：分叉路径
export function branchPath(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.branches = cfg.params?.branches || 3;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '加法原理：分类相加', 150, 25, 14, '#555');
      const branches = this.branches;
      // 分叉逐条出现：每 25 帧出现一条，最新的带脉冲，播完停 90 帧循环
      const cycle = branches * 25 + 90;
      const t = p.frameCount % cycle;
      const shown = Math.min(Math.floor(t / 25) + 1, branches);
      p.stroke(150);
      p.strokeWeight(2);
      p.line(80, 80, 150, 120);
      for (let i = 0; i < shown; i++) {
        const y = 120 + i * 40;
        p.line(150, 120, 80, y);
        const isNew = i === shown - 1;
        const radius = isNew ? 12 + Math.sin(p.frameCount * 0.15) * 3 : 12;
        drawParticle(p, 80, y, radius, ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'][i % 4]);
      }
      p.noStroke();
      drawText(p, `${branches}种选择 → 共${branches}条路`, 150, 280, 16, '#555');
    },
  }, config, onReady);
}

// 乘法原理：双排路径
export function dualPath(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.step1 = cfg.params?.step1 || 3;
      this.step2 = cfg.params?.step2 || 4;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '乘法原理：分步相乘', 150, 25, 14, '#555');
      const s1 = this.step1, s2 = this.step2;
      // 第一步选择
      p.stroke(150);
      p.strokeWeight(2);
      p.line(60, 100, 150, 150);
      // 第二步选择
      // 第二步选项逐个点亮：每 25 帧出现一个，最新的带脉冲，播完停 90 帧循环
      const cycle = s1 * 25 + 90;
      const t = p.frameCount % cycle;
      const shown = Math.min(Math.floor(t / 25) + 1, s1);
      for (let i = 0; i < shown; i++) {
        const x = 60 + (i % 3) * 40;
        const y = 180 + Math.floor(i / 3) * 35;
        p.line(150, 150, x, y);
        const isNew = i === shown - 1;
        const radius = isNew ? 10 + Math.sin(p.frameCount * 0.15) * 2.5 : 10;
        drawParticle(p, x, y, radius, ['#FF6B6B', '#4ECDC4', '#FFE66D'][i % 3]);
      }
      p.noStroke();
      // 显示总数
      const total = s1 * s2;
      drawText(p, `${s1}步 × ${s2}步 = ${total}种`, 150, 280, 18, '#FF6B6B');
    },
  }, config, onReady);
}

// 排列：粒子排列
export function particleArrange(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.items = cfg.params?.items || 3;
      this.arrangements = [];
      const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'];
      const nums = [];
      for (let i = 0; i < this.items; i++) nums.push(i + 1);
      // 生成所有排列
      const permute = (arr) => {
        if (arr.length === 0) return [[]];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
          for (const p of permute(rest)) {
            result.push([arr[i], ...p]);
          }
        }
        return result;
      };
      this.arrangements = permute(nums);
      this.colors = colors;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '排列：顺序不同算不同', 150, 25, 14, '#555');
      const arr = this.arrangements;
      const total = arr.length;
      const step = Math.floor(p.frameCount / 80);
      const displayIdx = step % total;
      const prevIdx = (step - 1 + total) % total;
      // 每种排列 80 帧一档：前 25 帧各数字从上一档槽位平滑滑到新槽位（smoothstep）
      let k = Math.min(1, (p.frameCount % 80) / 25);
      k = k * k * (3 - 2 * k);
      const spacing = 50;
      const startX = 60;
      arr[displayIdx].forEach((num, i) => {
        const prevSlot = arr[prevIdx].indexOf(num);
        const sx = startX + prevSlot * spacing, tx = startX + i * spacing;
        // 滑动 + 轻微浮沉
        const x = sx + (tx - sx) * k;
        const y = 150 + Math.sin(p.frameCount * 0.08 + num * 2) * 3;
        drawParticle(p, x, y, 20, this.colors[num % 4]);
        drawText(p, String(num), x, y, 14, '#fff');
      });
      drawText(p, `${this.items}个不同排列 = ${this.items}! = ${total}种`, 150, 280, 16, '#FF6B6B');
    },
  }, config, onReady);
}

// 组合：粒子组合
export function particleCombine(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.items = cfg.params?.items || 4;
      this.pick = cfg.params?.pick || 2;
      this.combos = [];
      const nums = [];
      for (let i = 0; i < this.items; i++) nums.push(i + 1);
      // 生成所有组合
      const combine = (arr, k) => {
        if (k === 0) return [[]];
        if (arr.length === 0) return [];
        const result = [];
        const head = arr[0];
        const rest = arr.slice(1);
        for (const c of combine(rest, k - 1)) {
          result.push([head, ...c]);
        }
        for (const c of combine(rest, k)) {
          result.push(c);
        }
        return result;
      };
      this.combos = combine(nums, this.pick);
      this.colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'];
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '组合：顺序不同算同一种', 150, 25, 14, '#555');
      const combos = this.combos;
      const total = combos.length;
      const displayIdx = Math.floor(p.frameCount / 100) % total;
      const spacing = 40;
      const startX = 80;
      // 每组 100 帧一档：粒子按槽位错开，从下方平滑升起入场（smoothstep）
      combos[displayIdx].forEach((num, i) => {
        const delay = i * 15;
        let e = Math.min(1, Math.max(0, (p.frameCount % 100 - delay) / 30));
        e = e * e * (3 - 2 * e);
        const x = startX + i * spacing;
        const y = 190 - 40 * e;
        const r = 6 + 14 * e;
        drawParticle(p, x, y, r, this.colors[(num - 1) % 4]);
        if (e > 0.5) drawText(p, String(num), x, y, 14, '#fff');
      });
      drawText(p, `${this.items}选${this.pick} = ${total}种`, 150, 280, 16, '#FF6B6B');
    },
  }, config, onReady);
}
