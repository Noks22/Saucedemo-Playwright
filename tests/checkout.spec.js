import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
const loginData = require('../data/loginData.json');
const productsData = require('../data/productsData.json');
const checkoutData = require('../data/checkoutData.json');

test.describe('Checkout Process', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.users[0].username, loginData.users[0].password);
    await loginPage.verifySuccessfulLogin();
  });

  test('Complete checkout process successfully', async ({ page }) => {
    const products = productsData.productsToAdd.slice(0, 2); // add 2 products

    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }

    await inventoryPage.navigateToCart();
    await cartPage.verifyItemsInCart(products);
    await cartPage.proceedToCheckout();

    const info = checkoutData.checkoutInfo;
    await checkoutPage.fillCheckoutInformation(info.firstName, info.lastName, info.postalCode);
    await checkoutPage.completePurchase();
  });
});
