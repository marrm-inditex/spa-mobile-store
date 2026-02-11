import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "spa-mobile-store",
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    video: false,
  },
});
