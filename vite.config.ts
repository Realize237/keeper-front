import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load .env variables based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: env.VITE_APP_ENV === 'production',
        },
      },
    },
  };
});
