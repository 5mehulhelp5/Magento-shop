import { test, expect } from "@playwright/test";
import { users } from "../fixtures/userData";
import { errorMessages } from "../fixtures/testData";
import { CartPage } from "../pageObjects/shopping/CartPage";
import {
  addProductToCart,
  completePurchase,
  verifyEmailAddress,
} from "./helpers";

test.describe("Checkout Flow", () => {
  let cartPage: CartPage;
  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await page.goto("/");
  });

  test("should complete a purchase successfully", async ({ page }) => {
    await addProductToCart(page);
    await completePurchase(page);
    await verifyEmailAddress(page, users.user1.email);
  });

  test("should prevent checkout if shipping details are missing", async ({
    page,
  }) => {
    await addProductToCart(page);
    await cartPage.proceedToCheckout();
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByRole("alert")).toContainText(
      errorMessages.shippingDetailsMissing,
    );
  });

  test("should fail checkout with empty cart", async ({ page }) => {
    await page.getByRole("link", { name: " My Cart" }).click();
    await expect(page.locator(`text=${errorMessages.emptyCart}`)).toBeVisible();
  });
});
