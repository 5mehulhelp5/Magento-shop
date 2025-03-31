import { test, expect } from "@playwright/test";
import { users } from "../fixtures/userData";
import { AccountPage } from "../pageObjects/account/AccountPage";
import { addProductToCart, completePurchase } from "./helpers";

test.describe("Post-Purchase Account Registration", () => {
  let accountPage: AccountPage;
  let user = {
    ...users.user1,
    email: `test${Date.now()}@test.com`,
  };
  test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    await page.goto("/");
  });

  test("should register account after completing purchase", async ({
    page,
  }) => {
    await addProductToCart(page);
    await completePurchase(page);

    await expect(page.getByText("Thank you for your purchase!")).toBeVisible();
    await page
      .locator("#registration")
      .getByRole("link", { name: "Create an Account" })
      .click();

    await accountPage.completeRegistration(user.email, user.password);
    await accountPage.verifyWelcomeMessage(
      `${user.firstName} ${user.lastName}`,
    );

    const orderNumber = await accountPage.getFirstOrderNumber();
    expect(orderNumber).toBeTruthy();
  });
});
