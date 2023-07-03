import { build } from 'vite'

const libraries = [
  {
    entry: './src/date-time/index.ts',
    name: 'DateTimePrimitive',
    fileName: 'date-time-primitive',
  },
  {
    entry: './src/dangerous-html/index.ts',
    name: 'DangerouslySetInnerHtmlContent',
    fileName: 'dangerous-html',
  },
]

libraries.forEach(async (libItem) => {
  await build({
    configFile: false,
    build: {
      lib: libItem,
      emptyOutDir: false,
      rollupOptions: {},
    },
  })
})
