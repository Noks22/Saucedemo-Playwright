Playwright JS — Setup & Execution Guide

This README walks you through configuring and running a Playwright (JavaScript) test project.
**1) Prerequisites**

Node.js 18+

Verify:
```
node -v
npm -v
```
**2) Install dependencies**
```
npm init playwright@latest
npm i -D @playwright/test monocart-reporter 
npx playwright install
```
**3) Project structure**

```
RESTFiL-BOOKER.HEROKUAPP/
│
├── .github/workflows
│
├── node_modules/
│
├── data/
│   └── loginData.json
│   └── productsData.json
│   └── checkoutData.json
├── test-results/
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│
├── tests/
│   ├── login.spec.js 
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```
**4) Running tests**
Setup

- Run All test files:
```
npx playwright test
```

- Run a specific test file:
```
npx playwright test inventory.spec.js
```
- Run tests with headful mode:
```
npx playwright test --headed
```
- Run tests on specific browser:
```
npx playwright test cart.spec.js --project=chromium
```
- Run tests on debug mode:
```
npx playwright test cart.spec.js --debug
```

**5) Reports**
Playwright HTML report:
- Monocart HTML report:
  -`Generated at: test-results/monocart-report.html`
- or open via:
    ```
    npx monocart show-report test-results/monocart-report.html`
    ```
> ⚙️ **Note:** Monocart is already configured in `reporter`.It aggregates run data into a single, modern HTML report.


Verify successful checkout
Navigate through checkout flow

Verify successful checkout
