import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Nếu bạn deploy ở subpath nào, đặt base cho đúng, hoặc để '' nếu serve root
  base: '',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Chỉ đường dẫn tương đối từ frontend đến thư mục static của backend
    outDir: path.resolve(__dirname, '../backend/static'),
    emptyOutDir: true,      // xóa sạch folder trước khi build
    assetsDir: 'assets',    // (tuỳ chọn) cho file JS/CSS vào static/assets
  },
});
