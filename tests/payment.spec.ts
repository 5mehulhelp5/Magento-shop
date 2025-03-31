import { test, expect } from "@playwright/test";
import { paymentOptions } from "../fixtures/paymentData";
import { errorMessages } from "../fixtures/testData";
import { addProductToCart } from "./helpers";
import { ReviewAndPaymentPage } from "../pageObjects/checkout/ReviewAndPaymentPage";
import { CardAuthenticationPage } from "../pageObjects/checkout/CardAuthenticationPage";
import { CartPage } from "../pageObjects/shopping/CartPage";
import { ShippingPage } from "../pageObjects/checkout/ShippingPage";
import { users } from "fixtures/userData";

test.describe("Payment Processing", () => {
  let reviewAndPaymentPage: ReviewAndPaymentPage;
  let cardAuthenticationPage: CardAuthenticationPage;
  let cartPage: CartPage;
  let shippingPage: ShippingPage;
  let user = users.user1;
  test.beforeEach(async ({ page }) => {
    reviewAndPaymentPage = new ReviewAndPaymentPage(page);
    cardAuthenticationPage = new CardAuthenticationPage(page);
    cartPage = new CartPage(page);
    shippingPage = new ShippingPage(page);
    await page.goto("/");
  });

  test("should handle card rejection", async ({ page }) => {
    await addProductToCart(page);
    await cartPage.proceedToCheckout();
    await shippingPage.fillShippingDetails(user);
    await reviewAndPaymentPage.selectPaymentMethod(paymentOptions.refusedCard);
    await expect(
      page.locator(`text=${errorMessages.paymentMethodNotAccepted}`),
    ).toBeVisible();
  });

  test("should fail checkout with invalid card authentication", async ({
    page,
  }) => {
    await addProductToCart(page);
    await cartPage.proceedToCheckout();
    await shippingPage.fillShippingDetails(user);
    await reviewAndPaymentPage.selectPaymentMethod(
      paymentOptions.secureAcceptedCard,
    );
    await cardAuthenticationPage.failSecureAuthentication(
      paymentOptions.secureAcceptedCard.password,
    );
    await expect(
      page.locator(`text=${errorMessages.authenticationFailed}`),
    ).toBeVisible();
  });
});
