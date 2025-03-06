import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private userNameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private rememberMeCheck: Locator;
    private baseURL: String;
    private signUpLink: Locator;
    private invalidCredentials: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = page.locator("//*[@name='email']");
        this.passwordInput = page.locator("//*[@name='password']");
        this.loginButton = page.locator("//button[@type='submit']");
        this.rememberMeCheck = page.locator("#remember-me");
        this.signUpLink = page.locator("//*[@href='/register']");
        this.invalidCredentials = page.getByText("Invalid email or password");
    }

    async gotoLoginPage() {
        await this.page.goto("/login");
    }

    async fillUsername(username: string){
        await this.userNameInput.fill(username);
    }

    async fillPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton(){
        await this.loginButton.click();
        try {
            await this.page.waitForURL('**/dashboard', { timeout: 5000 });
        }
        catch (error) {
            await this.invalidCredentials.isVisible();
            throw new Error("Failed with Invalid Credentials");
        }

    }

    async login(username: string, password: string) {
        
        await this.passwordInput.fill(password);
        // const responsePromise = this.page.waitForResponse(response =>
        //     response.url().includes('/dashboard')  && response.status() === 200
        //         && response.request().method() === 'GET'
        //   );
        await this.loginButton.click();

        // const response = await responsePromise;
        // const responseJson = await response.json();
        // expect(responseJson).toHaveProperty('dashboardData'); // Example key
        // expect(responseJson.success).toBe(true);
    }


    async verifyLogin() {
        expect(this.page.url()).toMatch(/dashboard$/);
        return true;
    }

    async clickOnSignUpLink() {
        await this.signUpLink.click();
    }

    async verifyRegisterURL(){
        await this.page.waitForURL('**/register', { timeout: 5000 });
        return true;
    }

}
