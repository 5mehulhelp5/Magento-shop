import { Page, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CartPage extends BasePage {
  private cartLink = this.page.getByRole("link", { name: " My Cart" });
  private checkoutButton = this.page.getByRole("button", {
    name: "Proceed to Checkout",
  });

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    await this.cartLink.click();
    await this.checkoutButton.click();
  }

  async removeItemFromCart(productName: string) {
    await this.cartLink.click();

    const productLocator = this.page
      .locator("#minicart-content-wrapper div")
      .filter({ hasText: productName })
      .nth(1);
    await expect(productLocator).toBeVisible();

    const removeButtonLocator = this.page.getByRole("link", {
      name: " Remove",
    });
    await removeButtonLocator.click();

    const confirmationButton = this.page.getByRole("button", { name: "OK" });
    await confirmationButton.click();

    await expect(productLocator).not.toBeVisible();
  }
}
