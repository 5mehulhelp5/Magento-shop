import { Page, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectProductByName(productName: string) {
    const productLocator = this.page.locator(`a.product-item-link`, {
      hasText: productName,
    });
    await productLocator.click();
  }

  async selectProductVariant(size: string, color: string) {
    await this.page.getByRole("option", { name: size }).click();
    await this.page.getByRole("option", { name: color }).click();
  }

  async addToCart(productName: string) {
    await this.page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(
      this.page.getByText(`You added ${productName} to your`),
    ).toBeVisible();
  }
}
