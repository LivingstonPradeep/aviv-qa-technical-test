import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export abstract class DashboardBasePage extends BasePage{

  constructor(page: Page) {
    super(page);
  }
  abstract verifyDashboardPage(): void;
}
