import { Page, APIRequestContext, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { UserAPI } from "../api/UserAPI";
import { DashboardBasePage } from "../pages/DashboardBasePage";
import { UserDashboardPage } from "../pages/UserDashboardPage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { AgentDashboardPage } from "../pages/AgentDashboardPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SettingsPage } from "../pages/SettingsPage";

export class UsersAction {
  protected page: Page;
  private mode: "ui" | "api";
  private loginPage: LoginPage;
  private dashboardPage: DashboardBasePage;
  private registerPage: RegisterPage;
  private settingsPage: SettingsPage;
  private userAPI: UserAPI;

  constructor(page: Page, request: APIRequestContext, mode: "ui" | "api", role: "user" | "admin" | "agent") {
    this.page = page;
    this.mode = mode;
    this.loginPage = new LoginPage(page);
    this.registerPage = new RegisterPage(page);
    this.userAPI = new UserAPI(request);
    if (role === "user") {
      this.dashboardPage = new UserDashboardPage(page);
    }
    else if (role === "admin") {
      this.dashboardPage = new AdminDashboardPage(page);
    }
    else {
      this.dashboardPage = new AgentDashboardPage(page);
    }
    this.settingsPage = new SettingsPage(page);
  }

  async performLogin(username: string, password: string) {
    if (this.mode === "ui") {
      await this.loginPage.gotoLoginPage();
      await this.loginPage.fillUsername(username);
      await this.loginPage.fillPassword(password);
      await this.loginPage.clickOnLoginButton();
    } else {
      // Code for Login/Auth using API
    }
  }

  async performLogout() {
    if (this.mode === "ui") {
      await this.loginPage.clickOnProfileLink();
      await this.loginPage.clickOnLogoutLink();
    } else {
      // Code for Logout using API
    }
  }

  async performSignUp(fullName: string, email: string, password: string, phone: string, mode: "ui" | "api", role: "user" | "agent") {
    if (this.mode === "ui") {
      await this.loginPage.gotoLoginPage();
      this.loginPage.clickOnSignUpLink();
      expect(await this.loginPage.verifyRegisterURL()).toBe(true);
      await this.registerPage.fillName(fullName);
      await this.registerPage.fillEmail(email);
      await this.registerPage.fillPhoneNumber(phone);
      await this.registerPage.fillPassword(password);
      await this.registerPage.fillConfirmPassword(password);
      await this.registerPage.selectAccountType(role);
      await this.registerPage.clickOnCreateAccount();
    } else {
      // await this.userAPI.createUser({ username, password });
    }
  }

  async verifyLoginSuccess(role: string) {
    if (this.mode === "ui") {
      expect(await this.loginPage.verifyLogin(), "Login was not successful. Did not land on the Dashboard").toBe(true);
      expect(await this.dashboardPage.verifyDashboardPage(), "Login was not successful. Did not land on the correct Dashboard").toBe(true);
    } else {
      // Code to Verify if the Login us successful through API
    }
  }

  async performEditProfile(profileParams: any) {
    if (!profileParams || profileParams.size == 0) {
      console.warn("Nothing was updated in the Profile. No new values were provided to be updated");
      return;
    }

    if ("newPassword" in profileParams && !("password" in profileParams)){
      throw new Error("Current Password missing. Cannot update the new Password without the current Password");
    }

    if (this.mode === "ui") {
      await this.dashboardPage.clickOnProfileLink();
      await this.dashboardPage.clickOnSettingsLink();
      if ("newName" in profileParams) await this.settingsPage.fillName(profileParams.newName ?? "");
      if ("newEmail" in profileParams) await this.settingsPage.fillEmail(profileParams.newEmail ?? "");
      if ("newPhoneNumber" in profileParams) await this.settingsPage.fillPhoneNumber(profileParams.newPhoneNumber ?? "");
      if ("newPassword" in profileParams) {
        await this.settingsPage.fillCurrentPassword(profileParams.password ?? "")
        await this.settingsPage.fillNewPassword(profileParams.newPassword ?? "");
      }
      await this.settingsPage.clickOnSaveProfileChanges();
    } else {
      // Code to Verify if the Login us successful through API
    }
  }

  async verifyEditProfile(profileParams: any) {

    if (!profileParams || profileParams.size == 0) {
      console.warn("Nothing to check in Profle update");
      return;
    }
    if (this.mode === "ui") {
      if ("newName" in profileParams) expect(await this.settingsPage.getNameText()).toBe(profileParams.newName);
      if ("newEmail" in profileParams) expect(await this.settingsPage.getEmailText()).toBe(profileParams.newEmail);
      if ("newPhoneNumber" in profileParams) expect(await this.settingsPage.getPhoneNumberText()).toBe(profileParams.newPhoneNumber);
      if ("newPassword" in profileParams) {
        const currentUserEmail = await this.settingsPage.getEmailText() as string;
        await this.performLogout();
        await this.performLogin(currentUserEmail, profileParams.newPassword);
        await this.verifyLoginSuccess(profileParams.role);
      }
    } else {
      // Code to Verify if the Login us successful through API
    }

  }

  async verifyRegisterSuccess(role: string) {
    if (this.mode === "ui") {
      expect(await this.loginPage.verifyLogin(), "Login was not successful. Did not land on the Dashboard").toBe(true);
      expect(await this.dashboardPage.verifyDashboardPage(), "Login was not successful. Did not land on the correct Dashboard").toBe(true);
    } else {
      // Code to Verify if the Login us successful through API
    }
  }

  async verifyRegisterErrorMessages(errorMessages: string[]) {
    let errorMsgDiff = this.registerPage.visibleErrors.filter(item => !errorMessages.includes(item));
    if (errorMsgDiff.length) {
      throw new Error("The following expected error messages were missing :" + errorMsgDiff);
    }
    errorMsgDiff = errorMessages.filter(item => !this.registerPage.visibleErrors.includes(item));
    if (errorMsgDiff.length) {
      throw new Error("The following unexpected error messages were found :" + errorMsgDiff);
    }
  }
}
