// 几何动画 sketches
import { createP5Instance, drawParticle, drawText } from './shared.js';

// 周长：边界行走动画
export function borderWalk(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.w = cfg.params?.w || 5;
      this.h = cfg.params?.h || 3;
      this.walker = 0;
      this.cellSize = 25;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '周长：绕一圈的长度', 150, 25, 14, '#555');
      const w = this.w, h = this.h, cs = this.cellSize;
      const startX = 50, startY = 60;
      const perimeter = (w + h) * 2;
      // 画图形填充
      p.fill('#4ECDC4');
      p.rect(startX, startY, w * cs, h * cs, 3);
      // 画边界
      p.noFill();
      p.stroke(100);
      p.strokeWeight(2);
      p.rect(startX, startY, w * cs, h * cs);
      p.noStroke();
      // 行走的点
      const totalLen = perimeter * cs;
      const offset = (p.frameCount * 3) % totalLen;
      let x, y;
      if (offset < w * cs) {
        x = startX + offset; y = startY;
      } else if (offset < w * cs + h * cs) {
        x = startX + w * cs; y = startY + (offset - w * cs);
      } else if (offset < 2 * w * cs + h * cs) {
        x = startX + w * cs - (offset - w * cs - h * cs); y = startY + h * cs;
      } else {
        x = startX; y = startY + h * cs - (offset - 2 * w * cs - h * cs);
      }
      drawParticle(p, x, y, 8, '#FF6B6B');
      drawText(p, `周长 = （${w} + ${h}）× 2 = ${perimeter}格`, 150, 280, 16, '#555');
    },
  }, config, onReady);
}

// 长方形面积：网格填充
export function rectArea(canvas, config, onReady) {
  // 复用 gridFill，但标注为面积
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.rows = cfg.params?.rows || 4;
      this.cols = cfg.params?.cols || 6;
      this.filled = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '长方形面积', 150, 25, 14, '#555');
      const rows = this.rows, cols = this.cols, cs = 28;
      const total = rows * cols;
      if (this.filled < total) this.filled += 2;
      const startX = 40, startY = 55;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          p.fill(idx < this.filled ? '#4ECDC4' : 230);
          p.rect(startX + c * cs, startY + r * cs, cs - 2, cs - 2, 3);
        }
      }
      drawText(p, `${cols} × ${rows} = ${total}格`, 150, 290, 16, '#555');
    },
  }, config, onReady);
}

// 三角形面积：割补重组
export function cutRearrange(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.w = cfg.params?.w || 6;
      this.h = cfg.params?.h || 4;
      this.phase = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '三角形 = 长方形的一半', 150, 25, 14, '#555');
      const w = this.w, h = this.h, cs = 22;
      const rectW = w * cs, rectH = h * cs;
      // 平滑往返：长方形 → 上半个三角形滑走 → 滑回（smoothstep 缓动）
      const cycle = 320;
      const t = p.frameCount % cycle;
      let k;
      if (t < 70) k = t / 70;
      else if (t < 160) k = 1;
      else if (t < 230) k = 1 - (t - 160) / 70;
      else k = 0;
      k = k * k * (3 - 2 * k);
      // 保留下半个三角形（黄色常驻）
      p.fill('#FFE66D');
      p.triangle(40, 70 + rectH, 40 + rectW, 70 + rectH, 40, 70);
      // 上半个三角形（青色）随 k 向右上滑离，露出“切走一半”的效果
      const dx = k * 50, dy = -k * 35;
      p.push();
      p.translate(dx, dy);
      p.fill(78, 205, 196, 255 - k * 120);
      p.triangle(40, 70, 40 + rectW, 70, 40 + rectW, 70 + rectH);
      p.pop();
      if (k < 0.5) {
        drawText(p, `长方形面积 = ${w} × ${h} = ${w * h}`, 150, 250, 14, '#555');
      } else {
        drawText(p, `三角形面积 = ${w * h} ÷ 2 = ${Math.floor(w * h / 2)}`, 150, 250, 14, '#FF6B6B');
      }
    },
  }, config, onReady);
}

// 正方形面积：网格填充（正方形）
export function squareArea(canvas, config, onReady) {
  return createP5Instance(canvas, {
    setup(p, cfg) {
      this.side = cfg.params?.side || 5;
      this.filled = 0;
    },
    draw(p, cfg) {
      p.background(250);
      drawText(p, '正方形面积', 150, 25, 14, '#555');
      const side = this.side, cs = 26;
      const total = side * side;
      if (this.filled < total) this.filled += 2;
      const startX = 50, startY = 55;
      for (let r = 0; r < side; r++) {
        for (let c = 0; c < side; c++) {
          const idx = r * side + c;
          p.fill(idx < this.filled ? '#4ECDC4' : 230);
          p.rect(startX + c * cs, startY + r * cs, cs - 2, cs - 2, 3);
        }
      }
      drawText(p, `${side} × ${side} = ${total}格`, 150, 290, 16, '#555');
    },
  }, config, onReady);
}
