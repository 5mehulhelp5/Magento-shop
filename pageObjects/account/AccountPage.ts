import { Page, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private emailInput = this.page.getByRole("textbox", { name: "Email*" });
  private passwordInput = this.page.getByRole("textbox", { name: "Password*" });
  private confirmPasswordInput = this.page.getByRole("textbox", {
    name: "Confirm Password *",
  });
  private createAccountButton = this.page.getByRole("button", {
    name: "Create an Account",
  });
  private welcomeMessage = this.page
    .getByRole("banner")
    .getByText(/Welcome, .+!/);
  private orderHistoryLink = this.page.getByRole("link", { name: "My Orders" });
  private orderNumberCell = this.page.locator(
    "tbody tr:first-child td[data-th='Order #']",
  );
  private registrationAlert = this.page
    .getByRole("alert")
    .filter({ hasText: "Thank you for registering" });

  async completeRegistration(email: string, password: string) {
    await this.emailInput.clear();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.createAccountButton.click();
  }

  async verifyWelcomeMessage(name: string) {
    await expect(this.welcomeMessage).toContainText(name);
  }

  async verifyRegistrationAlert() {
    await expect(this.registrationAlert).toBeVisible();
  }

  async getFirstOrderNumber() {
    await this.orderHistoryLink.click();
    return await this.orderNumberCell.textContent();
  }
}
