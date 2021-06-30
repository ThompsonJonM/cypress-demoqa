# Cypress DemoQA Project

A testing repository using Cypress to automate the Demo QA website and its suite of applications.

1. [Tools Used](#tools-used)
2. [Installation](#installation)
3. [Running Tests](#running-tests)
4. [Test Plan](#test-plan)

### Tools Used
- Cypress.io
- Prettier
- Eslint
- Fishery (Planned)
- Faker (Planned)

### Installation
Simply input the following once cloned:

`npm install`

### Running Tests

This repository requires the creation of a `cypress.env.json` populated with a user for the Bookstore application. The JSON should resemble the following:

```
{
    "bookstoreUser": {
        "username": { bookstoreUsername },
        "password": { bookstorePassword }
    }
}
```

Run commands:
- GUI: `npm run open`
- CLI: `npm run test`
- API: `CYPRESS_TEST_TAGS=api npm run {test_or_open}`
- UI: `CYPRESS_TEST_TAGS=ui npm run {test_or_open}`
- Module API (Elements only): `node .\run-elements-tests.js`

### Test Plan
- Navigation
  - Iterate through each menu selection and verify correct page load
- Elements
- Forms
- Alerts
  - Windows cannot be automated
  - Frames can be automated using cypress-iframe
  - Nested Frames may be able to automate using above
- Widgets
- Interactions
  - Drag and drop doable with Cypress recipe
  - Resize and Sortable should follow same principle
- Book store app
  - Login
    - Successfully login, logout
    - Create command for API login
  - User Register not automatable due to CAPTCHA
    - Consider API
    - POST https://www.demoqa.com/Account/v1/User
      - Request:
      - { userName: {USERNAME}, password: {PASSWORD} }
      - Response:
      - { "userID":{ID},"username":{USERNAME},"books":[] }
  - Add a book
    - UI and API
  - Delete a book
    - UI and API
  - Delete all books
    - UI and API
  - Delete account
    - UI and API
