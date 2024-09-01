import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173,
    open: '/public/' // Esto abrirá automáticamente /public/ al ejecutar npm run dev
  },
  
  plugins: [react()],
  resolve: {
    alias: {
      'css': path.resolve(__dirname, './src/css'),
      'icons': path.resolve(__dirname, './src/assets/icons'),
      'fonts': path.resolve(__dirname, './src/assets/fonts'),

    },
  },
})
