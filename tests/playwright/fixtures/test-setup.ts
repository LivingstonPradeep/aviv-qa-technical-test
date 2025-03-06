import { test as base, BrowserContext } from '@playwright/test';

type MyFixtures = {
  videoContext: BrowserContext;
};

// Playwright offers default video capabilities but adding this fixture to set required dimensions
export const test = base.extend<MyFixtures>({
  videoContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } }
    });

    await use(context);
    await context.close();
  },
});
