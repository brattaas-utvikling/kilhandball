import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/nif": {
        target: "https://id.nif.no",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/nif/, ""),
        secure: true,
      },
      "/api/data": {
        target: "https://data.nif.no",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/data/, ""),
        secure: true,
      },
    },
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api/nif': {
//         target: 'https://id.nif.no',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/nif/, ''),
//         secure: true,
//       },
//       '/api/data': {
//         target: 'https://data.nif.no',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/data/, ''),
//         secure: true,
//       }
//     }
//   }
// })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   assetsInclude: ['**/*.pdf'],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           pdfjs: ['pdfjs-dist'],
//           'react-pdf': ['react-pdf'],
//         },
//       },
//     },
//   },
//   optimizeDeps: {
//     include: ['react-pdf', 'pdfjs-dist'],
//   },
// });
