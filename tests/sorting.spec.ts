import { test, expect } from "@playwright/test";
import { CategoryNavigationPage } from "../pageObjects/shopping/CategoryNavigationPage";

test.describe("Sorting Products by Name and Price", () => {
  let categoryNav: CategoryNavigationPage;

  test.beforeEach(async ({ page }) => {
    categoryNav = new CategoryNavigationPage(page);
    await page.goto("/gear/watches.html?product_list_order=name");
  });

  test("should sort products by name", async () => {
    const productNames = await categoryNav.getSortedProductNames();
    expect(productNames).toEqual([...productNames].sort());
  });

  test("should sort products by price descending", async () => {
    await categoryNav.sortByPriceDescending();
    const productPrices = await categoryNav.getSortedProductPrices();
    expect(productPrices).toEqual([...productPrices].sort((a, b) => b - a));
  });
});
