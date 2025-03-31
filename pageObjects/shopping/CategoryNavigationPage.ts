import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CategoryNavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

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
}
