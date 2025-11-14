# RedBlox QA Practical Assignment (Cypress)

This repository contains Cypress tests for the RedBlox QA Practical Assignment:
- Part 1: API tests using Cypress `cy.request()` against https://dummyjson.com
- Part 2: UI tests using Cypress against https://opensource-demo.orangehrmlive.com

## Prerequisites
- Node.js (LTS)
- npm
- Chrome (recommended)
- Git (for submission)

## Install
```bash
npm install
```

## Run tests (Interactive)
```bash
npx cypress open
```

## Run tests (Headless)
```bash
npx cypress run
```

## Folder structure
- cypress/e2e: test specs
- cypress/fixtures: test data
- cypress/support: reusable commands and setup

## Included Specs
- cypress/e2e/api_tests.cy.js  -> API scenarios (Generate OTP/Login, Register User, Get User)
- cypress/e2e/ui_login.cy.js   -> Login to OrangeHRM
- cypress/e2e/user_management.cy.js -> Navigate to Users and validate table
- cypress/e2e/role_access.cy.js -> Role-based menu visibility tests

## Notes
- The API -> UI mapping step is simulated because the public OrangeHRM demo is not connected to DummyJSON. The test demonstrates search logic and failure handling.
- Add any additional tests or adjust selectors if OrangeHRM DOM changes.
