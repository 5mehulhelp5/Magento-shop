import { expect, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CategoryNavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private sortDropdown = this.page.getByLabel("Sort By");
  private sortDirection = this.page.getByRole("link", {
    name: /Set (Ascending|Descending) Direction/,
  });

  async navigateToCategory(
    mainCategory: string,
    subCategory1?: string,
    subCategory2?: string,
  ) {
    const mainCategoryLocator = this.page.getByRole("menuitem", {
      name: new RegExp(mainCategory),
      exact: true,
    });

    await mainCategoryLocator.hover();

    if (subCategory1)
      await this.page.getByRole("menuitem", { name: subCategory1 }).hover();
    if (subCategory2)
      await this.page.getByRole("menuitem", { name: subCategory2 }).hover();

    await (
      subCategory2
        ? this.page.getByRole("menuitem", { name: subCategory2 })
        : subCategory1
          ? this.page.getByRole("menuitem", { name: subCategory1 })
          : mainCategoryLocator
    ).click();
  }

  async loopThroughCategories(categories: string[][]) {
    for (const categoryPath of categories) {
      await this.navigateToCategory(...categoryPath);
      const lastCategory = categoryPath[categoryPath.length - 1];
      let categoryLocator = this.page
        .locator("#maincontent div")
        .filter({ hasText: lastCategory })
        .first();
      await expect(categoryLocator).toBeVisible();
    }
  }

  async getSortedProductNames() {
    return await this.page.locator(".product-name").allTextContents();
  }

  async getSortedProductPrices() {
    return (await this.page.locator(".product-price").allTextContents()).map(
      (price) => parseFloat(price.replace(/[^\d.-]/g, "")),
    );
  }

  async sortByPriceDescending() {
    await this.sortDirection.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
