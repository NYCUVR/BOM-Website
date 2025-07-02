import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base
export default defineConfig({
  base: '/',
  plugins: [react()],
})
