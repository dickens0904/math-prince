// 应用题动画 sketches
import { createP5Instance, drawParticle, drawText } from './shared.js';

// 和差问题：天平动画
export function balanceScale(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.sum = cfg.params?.sum || 10;
      this.diff = cfg.params?.diff || 2;
      this.phase = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '和差问题', 150, 25, 14, '#555');
      const sum = this.sum, diff = this.diff;
      const big = (sum + diff) / 2;
      const small = (sum - diff) / 2;
      // 平滑往返：和堆 → 滑入大数/小数两行 → 滑回（smoothstep 缓动）
      const cycle = 320;
      const t = p.frameCount % cycle;
      let k;
      if (t < 70) k = t / 70;
      else if (t < 160) k = 1;
      else if (t < 230) k = 1 - (t - 160) / 70;
      else k = 0;
      k = k * k * (3 - 2 * k);
      // 画天平
      p.stroke(100);
      p.strokeWeight(3);
      p.line(150, 60, 150, 180);
      p.line(80, 80, 220, 80);
      p.noStroke();
      for (let i = 0; i < sum; i++) {
        // 起点：和堆网格
        const sx = 80 + (i % 8) * 20, sy = 120 + Math.floor(i / 8) * 20;
        // 目标：前 small 颗进小数行（青），其余进大数行（红）
        let tx, ty, col;
        if (i < small) { tx = 60 + i * 15; ty = 110; col = '#4ECDC4'; }
        else { tx = 60 + (i - small) * 12; ty = 180; col = '#FF6B6B'; }
        drawParticle(p, sx + (tx - sx) * k, sy + (ty - sy) * k, 8, k > 0.5 ? col : '#FFE66D');
      }
      if (k < 0.5) {
        drawText(p, `两数之和 = ${sum}`, 150, 210, 16, '#555');
      } else {
        drawText(p, `大数=${big} 小数=${small}`, 150, 270, 16, '#555');
      }
    },
  }, config, onReady);
}

// 和倍/差倍问题：比例条
export function ratioBar(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.sum = cfg.params?.sum || 12;
      this.diff = cfg.params?.diff || 6;
      this.ratio = cfg.params?.ratio || 2;
      this.isSum = cfg.params?.sum !== undefined && cfg.params?.diff === undefined;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, this.isSum ? '和倍问题' : '差倍问题', 150, 25, 14, '#555');
      const ratio = this.ratio;
      const unit = this.isSum ? this.sum / (ratio + 1) : this.diff / (ratio - 1);
      const big = unit * ratio;
      const small = unit;
      // 按比例条目标宽度做生长动画：前 120 帧从 0 长到 100%（缓出），停 80 帧循环
      const maxW = 200;
      const scale = Math.min(20, maxW / (small + big));
      const cycle = 200;
      const t = p.frameCount % cycle;
      const raw = Math.min(t / 120, 1);
      const k = 1 - (1 - raw) * (1 - raw); // easeOutQuad
      const smallW = small * scale * k;
      const bigW = big * scale * k;
      // 画比例条
      p.noStroke();
      p.fill('#FFE66D');
      if (smallW > 0.5) p.rect(50, 100, smallW, 30, 5);
      if (k > 0.2) drawText(p, `小数=${small}`, 50 + smallW / 2, 145, 12, '#555');
      p.fill('#FF6B6B');
      if (bigW > 0.5) p.rect(50 + smallW, 100, bigW, 30, 5);
      if (k > 0.2) drawText(p, `大数=${big}`, 50 + smallW + bigW / 2, 145, 12, '#555');
      drawText(p, `倍数=${ratio}`, 150, 190, 16, '#FF6B6B');
    },
  }, config, onReady);
}

// 鸡兔同笼：抬腿动画
export function legLift(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.heads = cfg.params?.heads || 10;
      this.legs = cfg.params?.legs || 28;
      this.phase = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '鸡兔同笼：抬腿法', 150, 25, 14, '#555');
      const heads = this.heads, legs = this.legs;
      const rabbits = (legs - heads * 2) / 2;
      const chickens = heads - rabbits;
      // 平滑往返：腿全部着地 → 每只抬起两条腿 → 缓缓放下（smoothstep 缓动）
      const cycle = 320;
      const t = p.frameCount % cycle;
      let k;
      if (t < 70) k = t / 70;
      else if (t < 160) k = 1;
      else if (t < 230) k = 1 - (t - 160) / 70;
      else k = 0;
      k = k * k * (3 - 2 * k);
      for (let i = 0; i < heads; i++) {
        const x = 40 + (i % 5) * 50;
        const y = 80 + Math.floor(i / 5) * 60;
        drawParticle(p, x, y, 15, i < rabbits ? '#FF6B6B' : '#FFE66D');
        // 每只动物画腿：兔 4 条（前 2 条随 k 抬起），鸡 2 条（全部随 k 抬起）
        const legCount = i < rabbits ? 4 : 2;
        const liftCount = i < rabbits ? 2 : 0; // 抬腿后还剩的腿数
        for (let l = 0; l < legCount; l++) {
          // 着地的脚
          const fx0 = x - 8 + l * 8, fy0 = y + 30;
          // 抬起的脚（向前上方收）
          const fx1 = x - 10 + l * 6, fy1 = y + 4;
          const lift = l < legCount - liftCount ? k : 0;
          const fx = fx0 + (fx1 - fx0) * lift;
          const fy = fy0 + (fy1 - fy0) * lift;
          p.stroke(100);
          p.strokeWeight(2);
          p.line(x, y + 15, fx, fy);
          p.noStroke();
        }
      }
      if (k < 0.5) {
        drawText(p, `${heads}个头，${legs}条腿`, 150, 220, 16, '#555');
      } else {
        drawText(p, `鸡${chickens}只，兔${rabbits}只`, 150, 220, 18, '#4CAF50');
      }
    },
  }, config, onReady);
}
