import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
import vue2 from '@vitejs/plugin-vue2';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(path.resolve(), "./resources/scripts"),
      "@!": path.resolve(path.resolve(), "./resources/styles"),
      "@!c": path.resolve(path.resolve(), "./resources/styles/components"),
    },
  },
  plugins: [
    laravel({
      input: [
        "resources/scripts/app.js",
        'resources/scripts/app_cp.js'
      ],
      refresh: true,
    }),
    vue2(),
  ],
});