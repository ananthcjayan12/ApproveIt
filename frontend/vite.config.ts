import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Required polyfill for Vibe dependencies that expect Node.js globals
    global: 'globalThis',
  },
});
