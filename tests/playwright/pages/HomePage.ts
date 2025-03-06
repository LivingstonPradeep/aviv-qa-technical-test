import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  protected locationInput: Locator;
  protected minPriceInput: Locator;
  protected maxPriceInput: Locator;
  protected typeSelect: Locator;
  protected bedroomsSelect: Locator;
  protected searchPropertiesButton: Locator;
  protected resetButton: Locator;
  protected savePropertyButtonXpath: string;
  private featuredProperties: Locator;
  private allProperties: Locator;


  constructor(page: Page) {
    super(page);
    this.locationInput = this.page.getByRole('textbox', { name: 'Location' });
    this.minPriceInput = this.page.getByPlaceholder('Min Price (€)');
    this.maxPriceInput = this.page.getByPlaceholder('Max Price (€)');
    this.typeSelect = this.page.locator('select[name="type"]');
    this.bedroomsSelect = this.page.locator('select[name="bedrooms"]');
    this.searchPropertiesButton = this.page.getByRole('button', { name: 'Search Properties' });
    this.resetButton = this.page.getByRole('button', { name: 'Reset' });
    this.savePropertyButtonXpath = "xpath=//div[./a/h3[text()='{property_name}']]/preceding-sibling::div//button[.//*[contains(@class,'lucide-heart')]]";
    this.featuredProperties = this.page.locator("xpath=//div[./h2[text()='Featured Properties']]//div[./a/h3]");
    this.allProperties = this.page.locator("xpath=//div[./div/h2[text()='All Properties']]//div[./a/h3]");
  }

  async fillLocation(location: string) {
    await this.locationInput.fill(location);
  }

  async fillMinPrice(minPrice: number) {
    await this.minPriceInput.fill(minPrice.toString());
  }

  async fillMaxPrice(maxPrice: number) {
    await this.maxPriceInput.fill(maxPrice.toString());
  }

  async selectType(propertyType: string) {
    await this.typeSelect.selectOption(propertyType);
  }

  async selectBedrooms(bedrooms: number) {
    await this.bedroomsSelect.selectOption(bedrooms.toString());
  }


  async clickOnSearchPropertiesButton() {
    await this.searchPropertiesButton.click();
  }

  async clickResetButton() {
    await this.resetButton.click();
  }

  async clickSaveButton(propertyName: string) {
    await this.page.locator(this.savePropertyButtonXpath.replace('{property_name}', propertyName)).click();
  }

  async getFeaturedPropertiesCount(){
    return await this.featuredProperties.count();
  }

  async getAllPropertiesCount(){
    return await this.allProperties.count();
  }

}
