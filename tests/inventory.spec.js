import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
const loginData = require('../data/loginData.json');
const productsData = require('../data/productsData.json');

test.describe('Inventory Management Tests', () => {
  let loginPage, inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.users[0].username, loginData.users[0].password);
    await loginPage.verifySuccessfulLogin();
  });

  // Add items
  test('Add all products to cart and verify count', async ({ page }) => {
    const products = productsData.productsToAdd;
    for (let i = 0; i < products.length; i++) {
      await inventoryPage.addProductToCart(products[i]);
      await inventoryPage.verifyProductAdded(i + 1);
    }
  });

  // Remove items
  test('Remove all items from the cart', async ({ page }) => {
    const products = productsData.productsToAdd.slice(0, 3);
    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }
    await inventoryPage.verifyProductAdded(3);

    for (const product of products) {
      await inventoryPage.removeProductFromCart(product);
    }

    await inventoryPage.verifyCartBadgeHidden();
  });

  // Filter verification
  test('Verify sorting of inventory items via dropdown', async ({ page }) => {
    // Sort Name (A to Z)
    await inventoryPage.sortProducts('az');
    await inventoryPage.verifySortedAlphabetically('asc');

    // Sort Name (Z to A)
    await inventoryPage.sortProducts('za');
    await inventoryPage.verifySortedAlphabetically('desc');

    // Sort by Price (low → high)
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.verifySortedByPrice('asc');

    // Sort by Price (high → low)
    await inventoryPage.sortProducts('hilo');
    await inventoryPage.verifySortedByPrice('desc');
  });
});
