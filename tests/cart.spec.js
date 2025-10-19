import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
const loginData = require('../data/loginData.json');
const productsData = require('../data/productsData.json');

test.describe('Shopping Cart Functionality', () => {
  let loginPage, inventoryPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.users[0].username, loginData.users[0].password);
    await loginPage.verifySuccessfulLogin();
  });

  test('Add and verify products in cart', async ({ page }) => {
    const products = productsData.productsToAdd;
    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }
    await inventoryPage.navigateToCart();
    await cartPage.verifyItemsInCart(products);
  });
});
