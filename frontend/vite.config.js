import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'build', // Output to 'build' folder instead of 'dist'
  },
  server: {
    port: 5177,
    strictPort: false,
  }
})
