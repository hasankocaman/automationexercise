import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/automationexercise/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
}))
