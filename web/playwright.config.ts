import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4273",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run build && npx vite preview --host 127.0.0.1 --port 4273 --strictPort",
    port: 4273,
    // Avoid hitting unrelated apps that may already be using this port locally.
    reuseExistingServer: false,
    timeout: 180 * 1000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
