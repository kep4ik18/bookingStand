import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://auth.stg.corp.1440.space',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});