import { defineConfig, devices } from '@playwright/test';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // All our e2d Playwright tests are placed inside ./tests/e2e folder
  testDir: './tests/e2e', 
  // Match only the files that have test.ts as suffix in their file names
  testMatch: ['**/*.test.ts'], 
  outputDir: 'reports/test-results',
  // Run tests in files in parallel
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  /* Reporter to use - Allure */
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'reports/allure-results' }]
  ],  
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Realestate_Demo',
      use: { ...devices['Desktop Chrome'],
        baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:5173/",
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
       },
    },

  ],

});
