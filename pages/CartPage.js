import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyItemsInCart(expectedProducts) {
    const cartTexts = await this.cartItems.allTextContents();
    for (const product of expectedProducts) {
      expect(cartTexts.some(text => text.includes(product))).toBeTruthy();
    }
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
