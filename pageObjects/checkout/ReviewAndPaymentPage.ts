import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ReviewAndPaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private cardPayment = this.page.getByRole("radio", {
    name: "Credit / Debit Card",
  });
  private simulationSelect = this.page
    .locator("#paymentForm_187054")
    .contentFrame()
    .getByRole("button", { name: "Simulation You can use the" });
  private placeOrder = this.page.getByRole("button", { name: "Place Order" });

  private secureCard = (description: string) => {
    return this.page
      .locator("#paymentForm_187054")
      .contentFrame()
      .getByText(description)
      .getByRole("button", { name: "Use" });
  };

  async selectPaymentMethod(paymentOptions: any) {
    await this.cardPayment.check();
    await this.simulationSelect.click();
    await this.secureCard(paymentOptions.description).click();
    await this.placeOrder.click();
  }
}
