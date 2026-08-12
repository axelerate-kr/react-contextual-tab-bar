import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Demo site. `base: './'` keeps the bundle relative so it works on any
// GitHub Pages path without knowing the repository name.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
})
