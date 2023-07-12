import { build } from "vite";

const libraries = [
  {
    entry: "./src/date-time/index.ts",
    name: "DateTimePrimitive",
    fileName: "date-time-primitive",
    formats: ["umd"],
  },
  {
    entry: "./src/dangerous-html/index.ts",
    name: "DangerouslySetInnerHtmlContent",
    fileName: "dangerous-html",
    formats: ["umd"],
  },
];

libraries.forEach(async (libItem) => {
  await build({
    configFile: false,
    build: {
      lib: libItem,
      emptyOutDir: false,
      rollupOptions: {},
    },
  });
});
