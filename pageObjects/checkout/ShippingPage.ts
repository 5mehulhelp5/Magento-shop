import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ShippingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private emailInput = this.page.getByRole("textbox", {
    name: "Email Address*",
  });
  private firstNameInput = this.page.getByRole("textbox", {
    name: "First Name*",
  });
  private lastNameInput = this.page.getByRole("textbox", {
    name: "Last Name*",
  });
  private addressInput = this.page.getByRole("textbox", {
    name: "Street Address: Line 1",
  });
  private countrySelect = this.page.getByRole("combobox", { name: "Country" });
  private regionSelect = this.page.getByRole("combobox", {
    name: "State/Province",
  });
  private cityInput = this.page.getByRole("textbox", { name: "City*" });
  private postalCodeInput = this.page.getByRole("textbox", {
    name: "Zip/Postal Code*",
  });
  private phoneInput = this.page.getByRole("textbox", {
    name: "Phone Number*",
  });
  private nextButton = this.page.getByRole("button", { name: "Next" });

  async fillShippingDetails(user: any) {
    await this.emailInput.fill(user.email);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.countrySelect.selectOption(user.country);
    await this.regionSelect.selectOption(user.region);
    await this.cityInput.fill(user.city);
    await this.postalCodeInput.fill(user.postalCode);
    await this.phoneInput.fill(user.phone);
    await this.nextButton.click();
  }
}
