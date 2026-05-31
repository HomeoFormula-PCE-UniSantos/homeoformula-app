import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 👇 A nossa passagem secreta para enganar o navegador entra aqui!
  server: {
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
      },
    }
  }
})