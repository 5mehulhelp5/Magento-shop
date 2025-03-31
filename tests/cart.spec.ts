import { test, expect } from "@playwright/test";
import { errorMessages, productInfo } from "../fixtures/testData";
import { addProductToCart } from "./helpers";
import { CartPage } from "../pageObjects/shopping/CartPage";

test.describe("Cart Actions", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await page.goto("/");
  });

  test("should allow user to remove item from cart", async ({ page }) => {
    await addProductToCart(page);
    await cartPage.removeItemFromCart(productInfo.name);
    await expect(page.locator(`text=${errorMessages.emptyCart}`)).toBeVisible();
  });

  test("should handle adding multiple items to cart", async ({ page }) => {
    await addProductToCart(page);
    await addProductToCart(page, {
      name: "Abominable Hoodie",
      size: "XS",
      color: "Blue",
    });

    await page.getByRole("link", { name: " My Cart" }).click();

    const productLocators = [
      page
        .locator("#minicart-content-wrapper div")
        .filter({ hasText: "Hero Hoodie" })
        .first(),
      page
        .locator("#minicart-content-wrapper div")
        .filter({ hasText: "Abominable Hoodie" })
        .first(),
    ];

    for (const locator of productLocators) {
      await expect(locator).toBeVisible();
    }

    await page.getByRole("button", { name: "Proceed to Checkout" }).click();
  });
});
