import { Page, Locator, expect } from "@playwright/test";
import { DashboardBasePage } from "./DashboardBasePage";

export class UserDashboardPage extends DashboardBasePage{
  private myDashboardHeading: Locator;
  private savedPropertiesHeading: Locator;
  private activeAlertsHeading: Locator;
  private recentViewsHeading: Locator;
  private savedPropertiesValue: Locator;
  private activeAlertsValue: Locator;
  private recentViewsValue: Locator;


  constructor(page: Page) {
    super(page);
    this.myDashboardHeading = this.page.locator("h1", {hasText:"My Dashboard"});
    this.savedPropertiesHeading = this.page.locator("h3", {hasText:"Saved Properties"});
    this.activeAlertsHeading = this.page.locator("h3", {hasText:"Active Alerts"});
    this.recentViewsHeading = this.page.locator("h3", {hasText:"Recent Views"});
    this.savedPropertiesValue =  this.savedPropertiesHeading.locator("xpath=following-sibling::p");
    this.activeAlertsValue =  this.activeAlertsHeading.locator("xpath=following-sibling::p");
    this.recentViewsValue =  this.recentViewsHeading.locator("xpath=following-sibling::p");
  }

  async verifyDashboardPage() {
    await expect(this.myDashboardHeading).toBeVisible();
    return true;
  }

}
