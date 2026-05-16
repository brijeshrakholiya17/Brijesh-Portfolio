import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

// Use ConfigEnv to explicitly type the destructured { mode } argument
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    base: '/Brijesh-Portfolio/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});