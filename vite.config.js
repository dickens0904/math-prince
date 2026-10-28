import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3456,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      output: {
        // 大体积依赖拆分：PDF/截图、React 运行时、动效库各自独立 chunk，避免主 chunk 过大
        // 注：vite 8 底层为 rolldown，manualChunks 仅支持函数形式（对象形式会构建失败），
        // 仅被单一 chunk 使用的传递依赖（如 jspdf 的 dompurify、framer-motion 的 motion-*）会自动并入对应 chunk
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          const pkg = id
            .replace(/\\/g, '/')
            .match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/)[1];
          if (pkg === 'jspdf') return 'jspdf';
          if (pkg === 'html2canvas') return 'html2canvas';
          if (pkg === 'framer-motion') return 'framer-motion';
          if (pkg === 'react' || pkg === 'react-dom' || pkg === 'scheduler') return 'react';
          return undefined;
        },
      },
    },
  },
});
