import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = product.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  async removeProductFromCart(productName) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = product.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async verifyProductAdded(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async verifyCartBadgeHidden() {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async navigateToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async sortProducts(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allInnerTexts();
    return priceTexts.map(t => {
      const n = parseFloat(t.replace('$', '').trim());
      return Number.isFinite(n) ? n : NaN;
    });
  }

  async verifySortedAlphabetically(order = 'asc') {
    const names = await this.getProductNames();
    const sorted = [...names].sort((a, b) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
    expect(names).toEqual(sorted);
  }

  async verifySortedByPrice(order = 'asc') {
    const prices = await this.getProductPrices();
    const invalidIndex = prices.findIndex(p => Number.isNaN(p));
    expect(invalidIndex).toBe(-1);

    const sorted = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );
    expect(prices).toEqual(sorted);
  }
}
