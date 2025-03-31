import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { categoryPath, productInfo } from "../fixtures/testData";
import { users } from "../fixtures/userData";
import { paymentOptions } from "../fixtures/paymentData";
import { CardAuthenticationPage } from "../pageObjects/checkout/CardAuthenticationPage";
import { ReviewAndPaymentPage } from "../pageObjects/checkout/ReviewAndPaymentPage";
import { ShippingPage } from "../pageObjects/checkout/ShippingPage";
import { CartPage } from "../pageObjects/shopping/CartPage";
import { CategoryNavigationPage } from "../pageObjects/shopping/CategoryNavigationPage";
import { ProductPage } from "../pageObjects/shopping/ProductPage";

export async function addProductToCart(page: Page, product = productInfo) {
  const categoryNavigationPage = new CategoryNavigationPage(page);
  const productPage = new ProductPage(page);

  await categoryNavigationPage.navigateToCategory(...categoryPath);
  await productPage.selectProductByName(product.name);
  await productPage.selectProductVariant(product.size, product.color);
  await productPage.addToCart(product.name);
}

export async function completePurchase(
  page: Page,
  user = users.user1,
  paymentMethod = paymentOptions.secureAcceptedCard,
) {
  const cartPage = new CartPage(page);
  const shippingPage = new ShippingPage(page);
  const reviewAndPaymentPage = new ReviewAndPaymentPage(page);
  const cardAuthenticationPage = new CardAuthenticationPage(page);

  await cartPage.proceedToCheckout();
  await shippingPage.fillShippingDetails(user);
  await reviewAndPaymentPage.selectPaymentMethod(paymentMethod);
  await cardAuthenticationPage.authenticateCard(paymentMethod.password);
  await cardAuthenticationPage.confirmOrder();
}

export async function verifyEmailAddress(page: Page, userEmail: string) {
  await expect(page.locator(`text=Email Address: ${userEmail}`)).toBeVisible();
}
