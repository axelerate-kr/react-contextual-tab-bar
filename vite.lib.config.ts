import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Library build. Types come from `tsc -p tsconfig.lib.json` and the stylesheet
// is copied verbatim — see the `build:lib` script.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
