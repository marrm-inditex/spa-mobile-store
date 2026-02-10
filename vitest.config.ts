import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/config/test/setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: [
        "src/main.tsx",
        "src/App.tsx",
        "src/config/i18n/**",
        "src/config/test/**",
        "src/locales/**",
      ],
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
      enabled: true,
    },
  },
});
