// 数论动画 sketches
import { createP5Instance, drawParticle, drawText, drawGrid } from './shared.js';

// 奇偶性：粒子分堆动画
export function particleSplit(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      const count = cfg.params?.count || 8;
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          ox: p.random(60, 240),
          oy: p.random(70, 190),
        });
      }
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '奇偶性：能分成两堆一样多吗？', 150, 30, 14, '#555');
      const count = cfg.params?.count || 8;
      const phase = Math.floor(p.frameCount / 120) % 2;
      const half = Math.floor(count / 2);
      if (phase === 0) {
        // 散开：保持初始位置，只做轻微漂浮
        this.particles.forEach((pt, i) => {
          pt.x = pt.ox + Math.sin(p.frameCount * 0.03 + i * 1.3) * 4;
          pt.y = pt.oy + Math.cos(p.frameCount * 0.03 + i * 0.7) * 4;
        });
      } else {
        // 分成两堆
        this.particles.forEach((pt, i) => {
          if (i < half) {
            pt.x = 70 + Math.sin(p.frameCount * 0.1 + i) * 5;
            pt.y = 80 + Math.floor(i / 2) * 50;
          } else {
            pt.x = 230 + Math.sin(p.frameCount * 0.1 + i) * 5;
            pt.y = 80 + Math.floor((i - half) / 2) * 50;
          }
        });
      }
      this.particles.forEach((pt, i) => {
        // 左堆红、右堆青，两堆一眼可辨
        const color = phase === 1 && i >= half ? '#4ECDC4' : '#FF6B6B';
        drawParticle(p, pt.x, pt.y, 18, color);
      });
      const remaining = count % 2;
      if (remaining === 1) {
        drawText(p, '剩1个 → 奇数', 150, 270, 16, '#FF6B6B');
      } else {
        drawText(p, '两堆一样多 → 偶数', 150, 270, 16, '#4CAF50');
      }
    },
  }, config, onReady);
}

// 余数：圆环循环动画
export function circleLoop(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      const total = cfg.params?.total || 10;
      const step = cfg.params?.step || 3;
      this.total = total;
      this.step = step;
      this.positions = [];
      for (let i = 0; i < total; i++) {
        this.positions.push({ angle: (i / total) * p.TWO_PI - p.HALF_PI, label: String(i + 1) });
      }
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '余数：分不完就剩下', 150, 30, 14, '#555');
      const cx = 150, cy = 160, r = 70;
      // 画圆
      p.noFill();
      p.stroke(200);
      p.strokeWeight(3);
      p.ellipse(cx, cy, r * 2);
      p.noStroke();
      // 画数字：余数对应的数字用红圈标记
      const step = this.step;
      const total = this.total;
      const remainder = total % step;
      this.positions.forEach((pos, i) => {
        const x = cx + Math.cos(pos.angle) * r;
        const y = cy + Math.sin(pos.angle) * r;
        const isRemainder = remainder > 0 && i === remainder - 1;
        drawParticle(p, x, y, 20, isRemainder ? '#FF6B6B' : '#4ECDC4');
        drawText(p, pos.label, x, y, 12, '#fff');
        if (isRemainder) {
          p.noFill();
          p.stroke(255, 100, 100);
          p.strokeWeight(2);
          p.ellipse(x, y, 30);
          p.noStroke();
        }
      });
      // 跳转指针：每 20 帧顺时针走一格，循环扫过每个数字
      const idx = Math.floor(p.frameCount / 20) % total;
      const cur = this.positions[idx];
      const px = cx + Math.cos(cur.angle) * (r - 15);
      const py = cy + Math.sin(cur.angle) * (r - 15);
      p.stroke(255, 100, 100);
      p.strokeWeight(3);
      p.line(cx, cy, px, py);
      p.noStroke();
      drawParticle(p, px, py, 8, '#FF6B6B');
      // 显示算式
      drawText(p, `${total} ÷ ${step} = ${Math.floor(total / step)} 余 ${remainder}`, 150, 270, 16, '#FF6B6B');
    },
  }, config, onReady);
}

// 整除/面积：网格填充动画
export function gridFill(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.rows = cfg.params?.rows || 4;
      this.cols = cfg.params?.cols || 4;
      this.filled = 0;
    },
    draw(p, cfg) {
      p.background(250);
      const rows = this.rows, cols = this.cols;
      const cellSize = 30;
      const startX = 40, startY = 60;
      const w = cols * cellSize, h = rows * cellSize;
      // 计算填充进度：每 6 帧填一格，填满停 90 帧后循环重播
      const total = rows * cols;
      const framesPerCell = 6;
      const hold = 90;
      const cycleFrames = total * framesPerCell + hold;
      const t = p.frameCount % cycleFrames;
      const filled = Math.min(Math.floor(t / framesPerCell), total);
      // 画网格
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cellFilled = idx < filled;
          if (cellFilled) {
            p.fill('#4ECDC4');
          } else {
            p.fill(230);
          }
          p.rect(startX + c * cellSize, startY + r * cellSize, cellSize - 2, cellSize - 2, 3);
        }
      }
      // 显示公式
      const total2 = rows * cols;
      if (rows === cols) {
        drawText(p, `${rows} × ${rows} = ${total2}`, 150, 290, 16, '#555');
      } else {
        drawText(p, `${cols} × ${rows} = ${total2}`, 150, 290, 16, '#555');
      }
    },
  }, config, onReady);
}

// 质数：筛法粒子动画
export function sieveParticle(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.max = cfg.params?.max || 30;
      this.removed = new Set();
      this.positions = [];
      const cols = Math.min(this.max, 8);
      const rows = Math.ceil(this.max / cols);
      for (let i = 0; i < this.max; i++) {
        this.positions.push({
          num: i + 1,
          col: i % cols,
          row: Math.floor(i / cols),
        });
      }
      this.phase = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '质数：筛掉非质数', 150, 25, 14, '#555');
      const cols = Math.min(this.max, 8);
      const cellW = 32, cellH = 32;
      const startX = 30, startY = 50;
      // 逐帧筛除：随时间推进，逐步盖住合数（质数永远保留）；筛完停留片刻后循环重播
      const cycle = this.max * 20 + 120;
      const t = p.frameCount % cycle;
      const threshold = Math.min(Math.floor(t / 20) + 1, this.max);
      this.positions.forEach(pos => {
        const x = startX + pos.col * cellW + cellW / 2;
        const y = startY + pos.row * cellH + cellH / 2;
        if (pos.num === 1) {
          // 1 既不是质数也不是合数，灰色显示
          drawParticle(p, x, y, 14, '#ddd');
          drawText(p, String(pos.num), x, y, 10, '#999');
          return;
        }
        let isPrime = true;
        for (let d = 2; d * d <= pos.num; d++) {
          if (pos.num % d === 0) {
            isPrime = false;
            break;
          }
        }
        if (!isPrime && pos.num <= threshold) {
          // 合数已被筛掉：灰块盖住
          p.fill(220);
          p.rect(x - 14, y - 14, 28, 28, 3);
        } else if (isPrime) {
          drawParticle(p, x, y, 14, '#FF6B6B');
          drawText(p, String(pos.num), x, y, 10, '#fff');
        } else {
          // 还没轮到筛这个合数
          drawParticle(p, x, y, 14, '#ccc');
          drawText(p, String(pos.num), x, y, 10, '#666');
        }
      });
      drawText(p, '红色 = 质数（筛不掉）', 150, 280, 14, '#FF6B6B');
    },
  }, config, onReady);
}

// 例题：分糖果
export function candySplit(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.total = cfg.params?.total || 7;
      this.phase = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '分糖果', 150, 30, 14, '#555');
      const total = this.total;
      const half = Math.floor(total / 2);
      const hasLeft = total % 2 === 1;
      // 平滑往返：整排 → 滑成两堆 → 合回整排（smoothstep 缓动）
      const cycle = 320;
      const t = p.frameCount % cycle;
      let k;
      if (t < 70) k = t / 70;
      else if (t < 160) k = 1;
      else if (t < 230) k = 1 - (t - 160) / 70;
      else k = 0;
      k = k * k * (3 - 2 * k);
      for (let i = 0; i < (hasLeft ? total - 1 : total); i++) {
        const sx = 60 + i * 18, sy = 100;
        let tx, ty;
        if (i < half) { tx = 60 + i * 20; ty = 90; }
        else { tx = 200 + (i - half) * 20; ty = 90; }
        drawParticle(p, sx + (tx - sx) * k, sy + (ty - sy) * k, 10, '#FFE66D');
      }
      if (hasLeft) {
        const sx = 60 + (total - 1) * 18, sy = 100;
        drawParticle(p, sx + (150 - sx) * k, sy + 100 * k, 10 + 2 * k, '#FF6B6B');
      }
      if (k < 0.5) {
        drawText(p, `${total}颗糖`, 150, 220, 16, '#555');
      } else if (hasLeft) {
        drawText(p, '剩1颗 → 奇数', 150, 250, 14, '#FF6B6B');
      } else {
        drawText(p, '两堆一样多 → 偶数', 150, 250, 14, '#4CAF50');
      }
    },
  }, config, onReady);
}

// 例题：装袋
export function candyBag(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.total = cfg.params?.total || 13;
      this.per = cfg.params?.per || 4;
      this.phase = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '装袋问题', 150, 30, 14, '#555');
      const total = this.total, per = this.per;
      const bags = Math.floor(total / per);
      const remainder = total % per;
      // 平滑往返：散堆 → 滑进每袋一列 → 滑回散堆（smoothstep 缓动）
      const cycle = 340;
      const t = p.frameCount % cycle;
      let k;
      if (t < 80) k = t / 80;
      else if (t < 170) k = 1;
      else if (t < 250) k = 1 - (t - 170) / 80;
      else k = 0;
      k = k * k * (3 - 2 * k);
      for (let i = 0; i < total; i++) {
        const isLeft = i >= bags * per;
        const b = Math.floor(i / per), slot = i % per;
        const sx = 40 + (i % 8) * 28, sy = 70 + Math.floor(i / 8) * 30;
        // 目标位置：袋内列排布；剩余糖排最后一行
        const gx = isLeft ? 30 + (i - bags * per) * 25 : 30 + b * 35;
        const gy = isLeft ? 80 + bags * 25 : 80 + slot * 25;
        drawParticle(p, sx + (gx - sx) * k, sy + (gy - sy) * k, 10, isLeft && k > 0.5 ? '#FF6B6B' : '#FFE66D');
      }
      if (k < 0.5) {
        drawText(p, `${total}颗糖`, 150, 220, 16, '#555');
      } else {
        drawText(p, `装${bags}袋，剩${remainder}颗`, 150, 220, 16, '#FF6B6B');
      }
    },
  }, config, onReady);
}

// 练习：拖拽糖果（简化版：展示分堆结果）
export function candyDrag(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.count = cfg.params?.count || 8;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '拖动糖果分成两堆', 150, 30, 14, '#555');
      const count = this.count;
      const half = Math.floor(count / 2);
      // 平滑往返：一排 → 滑成两堆 → 合回一排（smoothstep 缓动）
      const cycle = 320;
      const t = p.frameCount % cycle;
      let k;
      if (t < 70) k = t / 70;
      else if (t < 160) k = 1;
      else if (t < 230) k = 1 - (t - 160) / 70;
      else k = 0;
      k = k * k * (3 - 2 * k);
      for (let i = 0; i < count; i++) {
        const sx = 60 + i * 20, sy = 120;
        let tx, ty, col;
        if (i < half) { tx = 70 + i * 20; ty = 100; col = '#FFE66D'; }
        else { tx = 180 + (i - half) * 20; ty = 100; col = '#4ECDC4'; }
        // 颜色随分组进度渐变：接近目标时切换成目标堆颜色
        const c = k > 0.5 ? col : '#FFE66D';
        drawParticle(p, sx + (tx - sx) * k, sy + (ty - sy) * k, 12, c);
      }
      if (k >= 0.5) {
        if (count % 2 === 1) {
          drawText(p, '奇数：两堆不一样多', 150, 220, 14, '#FF6B6B');
        } else {
          drawText(p, '偶数：两堆一样多', 150, 220, 14, '#4CAF50');
        }
      }
    },
  }, config, onReady);
}
