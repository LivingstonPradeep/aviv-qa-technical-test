import { Page, Locator, expect } from "@playwright/test";
import { Roles } from "../../data/constants";
import { BasePage } from "./BasePage";

export class SettingsPage extends BasePage {

  private fullNameInput: Locator;
  private emailInput: Locator;
  private phoneNumberInput: Locator;
  private currentPasswordInput: Locator;
  private newPasswordInput: Locator;
  private saveProfileChangesButton: Locator;
  private fullNameErrorMessage: Locator;
  private emailErrorMessage: Locator;
  private phoneNumberErrorMessage: Locator;
  private passwordErrorMessage: Locator;
  private confirmPasswordErrorMessage: Locator;
  private editSuccessMessage: Locator;
  public visibleErrors: string[];



  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator("//*[@name='name']");
    this.emailInput = page.locator("//*[@name='email']");
    this.phoneNumberInput = page.locator("//*[@name='phone']");
    this.currentPasswordInput = page.locator("//*[@name='currentPassword']");
    this.newPasswordInput = page.locator("//*[@name='newPassword']");
    this.saveProfileChangesButton = page.getByRole("button").filter({ hasText: "Save Changes" });
    this.fullNameErrorMessage = this.fullNameInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.emailErrorMessage = this.emailInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.phoneNumberErrorMessage = this.phoneNumberInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.passwordErrorMessage = this.currentPasswordInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.confirmPasswordErrorMessage = this.newPasswordInput.locator("xpath=following-sibling::p[contains(@class,'text-red')]");
    this.editSuccessMessage = page.getByText("Settings updated successfully");
    this.visibleErrors = [];
  }

  async fillName(fullName: string) {
    await this.fullNameInput.focus();
    const test_1 = await this.fullNameInput.textContent();
    await this.fullNameInput.fill(fullName, { timeout: 1000 });

  }

  async getNameText() {
    await this.fullNameInput.scrollIntoViewIfNeeded();
    return await this.fullNameInput.inputValue();
  }

  async fillEmail(email: string) {
    await this.emailInput.scrollIntoViewIfNeeded();
    await this.emailInput.fill(email);
  }

  async getEmailText() {
    await this.emailInput.scrollIntoViewIfNeeded();
    return await this.emailInput.inputValue();
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.phoneNumberInput.scrollIntoViewIfNeeded();
    await this.phoneNumberInput.fill(phoneNumber);
  }

  async getPhoneNumberText() {
    await this.phoneNumberInput.scrollIntoViewIfNeeded();
    return await this.phoneNumberInput.inputValue();
  }

  async fillCurrentPassword(password: string) {
    await this.currentPasswordInput.scrollIntoViewIfNeeded();
    await this.currentPasswordInput.fill(password);
  }

  async getPasswordText() {
    await this.currentPasswordInput.scrollIntoViewIfNeeded();
    return await this.currentPasswordInput.inputValue();
  }

  async fillNewPassword(confirmPassword: string) {
    await this.newPasswordInput.scrollIntoViewIfNeeded();
    await this.newPasswordInput.fill(confirmPassword);
  }

  async clickOnSaveProfileChanges() {
    await this.saveProfileChangesButton.click();
    try {
      await this.editSuccessMessage.isVisible();
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
