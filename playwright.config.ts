import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "https://magento-2.showcase-wallee.com/",
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 40000,
    trace: "on-first-retry",
  },
  expect: {
    timeout: 60000,
  },
  timeout: 60000,
  reporter: [["html", { outputFolder: "playwright-report" }]],
});
