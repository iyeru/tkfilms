import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages のプロジェクトページ（/tkfilms/ 配下）で配信するため。
  // 独自ドメインを当ててルート配信に変えたら '/' に戻す。
  base: '/tkfilms/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
