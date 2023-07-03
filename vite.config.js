import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'lit-components',
      formats: ['es', 'cjs', 'umd'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
