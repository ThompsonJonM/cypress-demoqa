/// <reference types="cypress" />

Cypress.Commands.add('fillTextBoxForm', (user) => {
  cy.get('#userName').type(user.name);
  cy.get('#userEmail').type(user.email);
  cy.get('#currentAddress').type(user.currentAddress);
  cy.get('#permanentAddress').type(user.permanentAddress);
});
