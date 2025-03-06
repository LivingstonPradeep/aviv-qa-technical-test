import { Page, Locator, expect } from "@playwright/test";
import { DashboardBasePage } from "./DashboardBasePage";

export class AdminDashboardPage extends DashboardBasePage{
  private totalUsersHeading: Locator;
  private propertiesHeading: Locator;
  private agentsHeading: Locator;
  private activeListingsHeading: Locator;
  private totalUsersValue: Locator;
  private propertiesValue: Locator;
  private agentsValue: Locator;
  private activeListingsValue: Locator;
  private propertiesListButton: Locator;
  private agentsListButton: Locator;
  private UsersListButton: Locator;



  constructor(page: Page) {
    super(page);
    this.totalUsersHeading = this.page.locator("h3", {hasText:"Total Users"});
    this.propertiesHeading = this.page.locator("h3", {hasText:"Properties"});
    this.agentsHeading = this.page.locator("h3", {hasText:"Agents"});
    this.activeListingsHeading = this.page.locator("h3", {hasText:"Active Listings"});
    this.totalUsersValue =  this.totalUsersHeading.locator("xpath=following-sibling::p");
    this.propertiesValue =  this.propertiesHeading.locator("xpath=following-sibling::p");
    this.agentsValue =  this.agentsHeading.locator("xpath=following-sibling::p");
    this.activeListingsValue =  this.activeListingsHeading.locator("xpath=following-sibling::p");
    this.propertiesListButton = this.page.locator("button", {hasText:"Properties"});
    this.agentsListButton = this.page.locator("button", {hasText:"Agents"});
    this.agentsListButton = this.page.locator("button", {hasText:"Users"});
  }


  async verifyDashboardPage() {
    await expect(this.totalUsersHeading).toBeVisible();
    await expect(this.propertiesHeading).toBeVisible();
    await expect(this.agentsHeading).toBeVisible();
    await expect(this.activeListingsHeading).toBeVisible();
    return true;
  }

}
