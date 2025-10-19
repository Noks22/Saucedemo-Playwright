import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const loginData = require('../data/loginData.json');

test.describe('SauceDemo - Authentication Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  for (const user of loginData.users) {
    test(`Login test for ${user.type} user`, async ({ page }) => {
      await loginPage.login(user.username, user.password);

      if (user.type === 'locked_out') {
        await loginPage.verifyLoginError();
      } else {
        await loginPage.verifySuccessfulLogin();

        // For error_user — check that some elements may fail to load properly
        if (user.type === 'error') {
          const brokenImages = await page.locator('img').evaluateAll(imgs =>
            imgs.filter(img => !img.complete || img.naturalWidth === 0).length
          );
          console.log(`Broken images found for error_user: ${brokenImages}`);
        }
      }
    });
  }
});
