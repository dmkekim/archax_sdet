# SDET Test Notes/Documentation

## Assumptions
-   Coin names and number of coin options is not changing.
-   Front end and backend base URL is not changing.
-   There's a bug currently wherein, when there are two or more connections to the backend server, the coin price of B is not incrementing by 1. Instead, the increment is equal to the number of open connection. The backend tests will work if only one connection is opened at a time. Part of the assumption is, this bug is fixed when running the scripts in the future.
-   Edge case that I mentioned on the UI test spec is an exemption. (see comment on cypress/e2e/frontend/portfolio.cy.js)

## General Notes/Documentation:
-   Cypress is used to test the UI, while JEST is used to test the backend. It seems that superwstest doesn't work out-of-the-box for Cypress. All Cypress specific files are in cypress folder, while JEST specific files are in JEST folder.
-   cypress/e2e/ is where the tests/specs can be found.
-   cypress/pageActions are js files containing the different actions (represented by functions) that you can do on every page.
-   jest/__api__/ is where JEST API tests can be found
-   jest/__websockets__/ is where JEST API tests can be found.
-   utils/ contains folders containing the common functions, test data and parameters, and web element locators.
-   scripts section on package.json shows that we can pass arguments to JEST or Cypress which is used when running the test in CI pipeline.
-   jest execution timeout is overridden in package.json. No jest.config.js file used.

## General Notes/Documentation:
-   To setup, clone this repository then run npm install
-   To run scripts, npm run {scrip-command}