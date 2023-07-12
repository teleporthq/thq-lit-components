import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        "lit",
        "dayjs",
        "lit/decorators/custom-element.js",
        "lit/decorators/property.js"
      ]
    },
  }
})
