import { Page, Locator, expect } from "@playwright/test";
import { Roles } from "../../data/constants";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

  private fullNameInput: Locator;
  private emailInput: Locator;
  private phoneNumberInput: Locator;
  private accountTypeSelect: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private createAccountButton: Locator;
  private fullNameErrorMessage: Locator;
  private emailErrorMessage: Locator;
  private phoneNumberErrorMessage: Locator;
  private passwordErrorMessage: Locator;
  private confirmPasswordErrorMessage: Locator;
  public visibleErrors: string[];



  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator("//*[@name='name']");
    this.emailInput = page.locator("//*[@name='email']");
    this.phoneNumberInput = page.locator("//*[@name='phone']");
    this.accountTypeSelect = page.locator("//select[@name='role']");
    this.passwordInput = page.locator("//*[@name='password']");
    this.confirmPasswordInput = page.locator("//*[@name='confirmPassword']");
    this.createAccountButton = page.getByRole("button");
    this.fullNameErrorMessage = this.fullNameInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.emailErrorMessage = this.emailInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.phoneNumberErrorMessage = this.phoneNumberInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.passwordErrorMessage = this.passwordInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.confirmPasswordErrorMessage = this.confirmPasswordInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.visibleErrors = [];
  }

  async fillName(fullName: string) {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.fullNameInput.fill(fullName);
  }

  async fillEmail(email: string) {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.emailInput.fill(email);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.phoneNumberInput.fill(phoneNumber);
  }

  async selectAccountType(accountType: "agent" | "user") {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.accountTypeSelect.selectOption(accountType);
  }

  async fillPassword(password: string) {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async clickOnCreateAccount() {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    await this.createAccountButton.click();
    try {
      await this.page.waitForURL('**/dashboard', { timeout: 5000 });
    }
    catch (error) {
      this.visibleErrors = [];
      (await this.fullNameErrorMessage.isVisible({ timeout: 1000 })) && this.visibleErrors.push(await this.fullNameErrorMessage.textContent() || '');
      (await this.emailErrorMessage.isVisible({ timeout: 1000 })) && this.visibleErrors.push(await this.emailErrorMessage.textContent() || '');
      (await this.phoneNumberErrorMessage.isVisible({ timeout: 1000 })) && this.visibleErrors.push(await this.phoneNumberErrorMessage.textContent() || '');
      (await this.passwordErrorMessage.isVisible({ timeout: 1000 })) && this.visibleErrors.push(await this.passwordErrorMessage.textContent() || '');
      (await this.confirmPasswordErrorMessage.isVisible({ timeout: 1000 })) && this.visibleErrors.push(await this.confirmPasswordErrorMessage.textContent() || '');
      throw error;
    }
    this.visibleErrors = [];
    return true;
  }

}
