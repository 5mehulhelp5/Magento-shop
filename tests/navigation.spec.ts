import { test } from "@playwright/test";
import { CategoryNavigationPage } from "../pageObjects/shopping/CategoryNavigationPage";
import { categories } from "../fixtures/categoryHierarchy";

test.describe("Navigation through categories", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Should navigate through all categories", async ({ page }) => {
    const categoryNav = new CategoryNavigationPage(page);
    await categoryNav.loopThroughCategories(categories);
  });
});
