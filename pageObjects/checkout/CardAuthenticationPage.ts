import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CardAuthenticationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private enterPassword = this.page.getByRole("textbox");
  private confirmPayment = this.page.getByRole("button", { name: "Success" });
  private failPayment = this.page.getByRole("link", { name: "Decline" });
  private purchaseConfirmation = this.page.getByText(
    "Thank you for your purchase!",
  );

  async authenticateCard(password: string) {
    await this.enterPassword.fill(password);
    await this.confirmPayment.click();
  }

  async failSecureAuthentication(password: string) {
    await this.enterPassword.fill(password);
    await this.failPayment.click();
  }

  async confirmOrder() {
    await this.page.waitForURL(
      "https://magento-2.showcase-wallee.com/checkout/onepage/success/",
    );
    await this.purchaseConfirmation.waitFor({ state: "visible" });
  }
}
