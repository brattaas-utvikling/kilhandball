import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.pdf'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ['pdfjs-dist'],
          'react-pdf': ['react-pdf'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react-pdf', 'pdfjs-dist'],
  },
});
