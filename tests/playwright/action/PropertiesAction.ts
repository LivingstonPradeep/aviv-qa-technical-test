import { Page, APIRequestContext, expect } from "@playwright/test";
import { PropertiesPage } from "../pages/PropertiesPage";
import { HomePage } from "../pages/HomePage";

export class PropertiesAction {
  protected page: Page;
  private mode: "ui" | "api";
  private propertiesPage: PropertiesPage;
  private homePage: HomePage;

  constructor(page: Page, request: APIRequestContext, mode: "ui" | "api", role: "user" | "admin" | "agent") {
    this.page = page;
    this.mode = mode;
    this.propertiesPage = new PropertiesPage(page);
    this.homePage = new HomePage(page);
  }

  async searchInProperties(propertiesParam: any) {
    if (this.mode === "ui") {
      await this.propertiesPage.gotoPropertiesPage();
      if (!propertiesParam || propertiesParam.size == 0) {
        console.info("Searching without filters");
      }
      else {
        if ("location" in propertiesParam) await this.propertiesPage.fillLocation(propertiesParam.location);
        if ("minPrice" in propertiesParam) await this.propertiesPage.fillMinPrice(propertiesParam.minPrice);
        if ("maxPrice" in propertiesParam) await this.propertiesPage.fillMaxPrice(propertiesParam.maxPrice);
        if ("type" in propertiesParam) await this.propertiesPage.selectType(propertiesParam.type);
        if ("beds" in propertiesParam) await this.propertiesPage.selectBedrooms(propertiesParam.beds);
      }
      await this.propertiesPage.clickOnSearchPropertiesButton();
      if ("availablePropertiesCount" in propertiesParam) await this.assertPropertiesCount(propertiesParam.availablePropertiesCount);
    } else {
      // Code to Verify if the Login us successful through API
    }
  }

  async searchInHome(homeParam: any) {
    if (this.mode === "ui") {
      await this.homePage.gotoHomePage();
      if (!homeParam || homeParam.size == 0) {
        console.info("Searching without filters");
      }
      else {
        if ("location" in homeParam) await this.propertiesPage.fillLocation(homeParam.location);
        if ("minPrice" in homeParam) await this.propertiesPage.fillMinPrice(homeParam.minPrice);
        if ("maxPrice" in homeParam) await this.propertiesPage.fillMaxPrice(homeParam.maxPrice);
        if ("type" in homeParam) await this.propertiesPage.selectType(homeParam.type);
        if ("beds" in homeParam) await this.propertiesPage.selectBedrooms(homeParam.beds);
      }
      await this.homePage.clickOnSearchPropertiesButton();
      if ("allPropertiesCount" in homeParam) await expect(this.homePage.getAllPropertiesCount()).resolves.toBe(homeParam.allPropertiesCount);
      if ("featuredPropertiesCount" in homeParam) await expect(this.homePage.getFeaturedPropertiesCount()).resolves.toBe(homeParam.featuredPropertiesCount);
    } else {
      // Code to Verify if the Login us successful through API
    }
  }

  async assertPropertiesCount(expectedAvailablePropertyCount: number) {
    await expect(this.propertiesPage.getAvailablePropertiesCount()).resolves.toBe(expectedAvailablePropertyCount);
  }

  async savePropertyListing(propertyName: string) {
    await this.propertiesPage.clickSaveButton(propertyName);
  }

}