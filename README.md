RedBlox QA Practical Assignment (Cypress)

This repository contains my implementation of the RedBlox QA Practical Assignment. It includes API test automation using DummyJSON and UI automation using the OrangeHRM demo site.

Overview

Part 1 – API Automation (DummyJSON);
The following scenarios were automated using cy.request():
- Generate OTP / Login (positive and negative checks)
- Verify OTP with invalid and missing input data
- Register user and validate response fields
- Login flow with valid and invalid combinations
- Get user information and simulate permission-denied behavior

Part 2 – UI Automation (OrangeHRM Demo):
Using the public OrangeHRM demo, the automation covers:
- Login with Admin credentials
- Navigation to Admin → User Management → Users
- Validation of table visibility, headers, and loaded rows
- Role-based menu visibility simulation (Admin vs non-admin)

Prerequisites:
- Node.js (LTS)
- npm
- Chrome browser

Installation:
npm install

Running Tests:
npx cypress open
npx cypress run --browser chrome

Project Structure:
- cypress/e2e - test specifications
- cypress/fixtures - test data
- cypress/support - custom commands and setup files
- cypress.config.js - Cypress configuration
- package.json

Included Test Specs=
- api_tests.cy.js - OTP/Login, Register User, Get User (DummyJSON)
- ui_login.cy.js - Login flow on OrangeHRM
- user_management.cy.js - Navigation to Users and table validation
- role_access.cy.js - Role-based menu visibility checks

