import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected homeLink: Locator;
  protected propertiesLink: Locator;
  protected agentsLink: Locator;
  protected aboutDemoLink: Locator;
  protected profileLink: Locator;
  protected dashboardLink: Locator;
  protected settingsLink: Locator;
  protected logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator("//a[@href='/']");
    this.propertiesLink = page.locator("//a[@href='/properties']");
    this.agentsLink = page.locator("//a[@href='/agents']");
    this.aboutDemoLink = page.locator("//a[@href='/about']");
    this.profileLink = page.locator("//button[.//*[@alt]]");
    this.dashboardLink = page.locator("//a[@href='/dashboard']");
    this.settingsLink = page.locator("//a[@href='/settings']");
    this.logoutLink = page.locator("//button[text()='Logout']");
  }

  async gotoHomePage() {
    await this.homeLink.click();
  }

  async gotoPropertiesPage() {
    await this.propertiesLink.click();
    try {
      await this.page.waitForURL('**/properties', { timeout: 5000 });
    }
    catch (error) {
      // Code to verify the Properties Page navigation failure
      throw new Error("Failed to navigate to Properties page");

    }
  }

  async gotoAboutPage() {
    await this.aboutDemoLink.click();
  }

  async clickOnProfileLink() {
    await this.profileLink.scrollIntoViewIfNeeded();
    await this.profileLink.click();
    await this.logoutLink.waitFor({ state: "visible", timeout: 3000 });
  }

  async clickOnDashboardLink() {
    await this.dashboardLink.click();
  }

  async clickOnSettingsLink() {
    await this.settingsLink.click();
  }

  async clickOnLogoutLink() {
    await this.logoutLink.waitFor({ state: "visible", timeout: 2000 })
    await this.logoutLink.click();
    try {
      await this.page.waitForURL('**/login', { timeout: 5000 });
    }
    catch (error) {
      // Code to verify the Logout Failure
      throw new Error("Failed with Logout correctly");

    }
  }

}

