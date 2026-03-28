import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      'pound-estimates-incoming-lamb.trycloudflare.com',
      'eleven-compile-continuous-added.trycloudflare.com'
    ]
  },
});
