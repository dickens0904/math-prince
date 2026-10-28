// 数学小王子 · 动画共享工具
// p5.js sketch 公共函数

import p5 from 'p5';

// 创建 p5 实例的辅助函数
// container 为普通 div 容器（p5 会在其中创建 canvas）
export function createP5Instance(container, sketchFn, config, onReady) {
  let instance = null;
  let observer = null;

  const sizeOf = () => ({
    w: container.clientWidth || 300,
    h: container.clientHeight || 300,
  });

  const p5Sketch = p => {
    const applyCanvasStyle = () => {
      if (p.canvas) {
        p.canvas.style.width = '100%';
        p.canvas.style.height = '100%';
        p.canvas.style.display = 'block';
      }
    };

    p.setup = () => {
      const { w, h } = sizeOf();
      p.createCanvas(w, h);
      applyCanvasStyle();
      p.randomSeed(config.seed || 42);
      p.noStroke();
      sketchFn.setup(p, config);
      if (onReady) onReady(p);
    };
    p.draw = () => {
      sketchFn.draw(p, config);
    };

    // 容器尺寸变化时同步画布尺寸
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        const { w, h } = sizeOf();
        if (p.width !== w || p.height !== h) {
          p.resizeCanvas(w, h);
          applyCanvasStyle();
        }
      });
      observer.observe(container);
    }
  };

  instance = new p5(p5Sketch, container);
  instance.__resizeObserver = observer;
  return instance;
}

// 绘制圆形粒子
export function drawParticle(p, x, y, r, color) {
  p.fill(color);
  p.ellipse(x, y, r * 2);
}

// 绘制文字
export function drawText(p, text, x, y, size, color) {
  p.fill(color);
  p.textSize(size);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(text, x, y);
}

// 绘制网格线
export function drawGrid(p, w, h, cellSize) {
  p.stroke(200);
  p.strokeWeight(1);
  for (let x = 0; x <= w; x += cellSize) {
    p.line(x, 0, x, h);
  }
  for (let y = 0; y <= h; y += cellSize) {
    p.line(0, y, w, y);
  }
  p.noStroke();
}
