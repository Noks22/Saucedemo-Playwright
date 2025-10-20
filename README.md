Project Structure
project-root/

 pages/
   LoginPage.js        # Handles login actions and verifications
   InventoryPage.js    # Handles inventory actions and cart interactions
   CartPage.js         # Handles adding items to cart
   CheckoutPage.js     # Handles checkout process

 tests/
   login.spec.js       # Tests authentication
   inventory.spec.js   # Tests inventory actions (add/remove/sort)
   cart.spec.js        # Tests shopping cart  
   checkout.spec.js    # Tests checkout

 data/
   loginData.json      # Test users credentials
   productsData.json   # Test inventory data
   checkoutData.json   # Test checkout user details

 playwright.config.js   # Playwright configuration
   README.md

Setup
Install dependencies:
npm init playwright@latest

Install Monocart Report:
npm install --save-dev monocart-reporter

Run All test files:
npx playwright test

Run a specific test file:
npx playwright test inventory.spec.js

Run tests with headful mode:
npx playwright test --headed

Run tests on specific browser:
npx playwright test cart.spec.js --project=chromium

Run tests on debug mode:
npx playwright test cart.spec.js --debug

Generate HTML report:
npx playwright show-report

Monocart report:
json: test-results/monocart-report.json
view report: npx monocart show-report test-results/monocart-report.html


Features Covered
1. Authentication:

Login with multiple user types

Verify successful login and error messages

2. Inventory Management:

Add and remove products from cart

Sort products alphabetically or by price

3. Shopping Cart:

Verify cart badge count

Navigate to cart

Remove items from cart

4. Checkout Process:

Navigate through checkout flow

Verify successful checkout
Navigate through checkout flow

Verify successful checkout
