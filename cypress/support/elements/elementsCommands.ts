/// <reference types="cypress" />

interface User {
  name?: string,
  email?: string,
  currentAddress?: string,
  permanentAddress?: string
}

Cypress.Commands.add('fillTextBoxForm', (user: User): void => {
  cy.get('#userName').type(user.name);
  cy.get('#userEmail').type(user.email);
  cy.get('#currentAddress').type(user.currentAddress);
  cy.get('#permanentAddress').type(user.permanentAddress);
});

declare namespace Cypress {
  interface Chainable {
    /**
     * Fill out an Elements text box.
     *
     * @param user User for text box fill.
     */
    fillTextBoxForm(user: Object): Cypress.Chainable
  }
}
