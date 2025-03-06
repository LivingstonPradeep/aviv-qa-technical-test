import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class PropertiesPage extends HomePage {
  private availableProperties: Locator;

  constructor(page: Page) {
    super(page);
    this.availableProperties = this.page.locator("xpath=//div[./div/h2[text()='Available Properties']]//div[./a/h3]");
  }

  async getAvailablePropertiesCount(){
    return await this.availableProperties.count();
  }
}
