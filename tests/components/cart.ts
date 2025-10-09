import type { Page } from "@playwright/test";

export class Cart {
  constructor(private readonly page: Page) {}

  get selectors() {
    return {
      checkoutButton: this.page.locator('[data-test="checkout"]'),
      cartItems: this.page.locator(".cart-preview"),
    };
  }

  openPaymentModel = async () => {
    await this.selectors.checkoutButton.click();
  };

  hoverCart = async () => {
    await this.selectors.checkoutButton.hover();
  };

  getCartItem = (name: string) => {
    return this.selectors.cartItems.locator(".list-item").filter({ hasText: name });
  };

  getCartItemQuantity = (name: string) => {
    return this.getCartItem(name).locator(".unit-desc");
  };

  getCartItemAddButton = (name: string) => {
    return this.getCartItem(name).getByRole("button", { name: `Add one ${name}` });
  };

  getCartItemRemoveButton = (name: string) => {
    return this.getCartItem(name).getByRole("button", { name: `Remove one ${name}` });
  };
}
