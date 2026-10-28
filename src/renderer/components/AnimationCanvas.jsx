import React, { useRef, useEffect } from 'react';
import { renderAnimation, destroyAnimation } from '../utils/animations/AnimationEngine.js';

// 动画渲染组件
// 注意：p5 会在容器内自行创建 <canvas>，所以这里必须用 div 容器，
// 不能直接传 <canvas>（canvas 的子元素不会被浏览器渲染）。
export default function AnimationCanvas({ animation, style }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !animation) return undefined;

    instanceRef.current = renderAnimation(containerRef.current, animation, () => {
      // 动画就绪
    });

    return () => {
      destroyAnimation(instanceRef.current);
      instanceRef.current = null;
    };
  }, [animation]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden', ...style }}
    />
  );
}
