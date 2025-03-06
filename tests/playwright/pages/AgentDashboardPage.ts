import { Page, Locator, expect } from "@playwright/test";
import { Roles } from "../../data/constants";
import { BasePage } from "./BasePage";
import { DashboardBasePage } from "./DashboardBasePage";

export class AgentDashboardPage extends DashboardBasePage{
  private agentDashboardHeading: Locator;
  private activeListingsHeading: Locator;
  private totalEnquiriesHeading: Locator;
  private messagesHeading: Locator;
  private addPropertyButton: Locator;
  private addFirstPropertyButton: Locator;
  private activeListingsValue: Locator;
  private totalEnquiriesValue: Locator;
  private messagesValue: Locator;


  constructor(page: Page) {
    super(page);
    this.agentDashboardHeading = this.page.locator("h1", {hasText:"Agent Dashboard"});
    this.activeListingsHeading = this.page.locator("h3", {hasText:"Active Listings"});
    this.totalEnquiriesHeading = this.page.locator("h3", {hasText:"Total Inquiries"});
    this.messagesHeading = this.page.locator("h3", {hasText:"Messages"});
    this.activeListingsValue =  this.activeListingsHeading.locator("xpath=following-sibling::p");
    this.totalEnquiriesValue =  this.totalEnquiriesHeading.locator("xpath=following-sibling::p");
    this.messagesValue =  this.messagesHeading.locator("xpath=following-sibling::p");
    this.addPropertyButton = this.page.locator("button", {hasText:"Add Property"});
    this.addFirstPropertyButton = this.page.locator("button", {hasText:"Add Your First Property"});
  }


  async verifyDashboardPage() {
    await expect(this.agentDashboardHeading).toBeVisible();
    return true;
  }

}
