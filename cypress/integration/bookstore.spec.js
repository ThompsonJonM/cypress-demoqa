/// <reference types="cypress" />

describe('DemoQA Book Store App', () => {
  const user = {
    username: Cypress.env('bookstoreUser').username,
    password: Cypress.env('bookstoreUser').password,
  };

  context('Authentication', () => {
    specify('Authenticate via API', () => {
      cy.authenticate(user);
    });
  });

  context('Adding Books', () => {
    before('Authenticate', () => {
      cy.authenticate(user);
    });

    after('Delete the book', () => {
      cy.deleteBook('9781449337711');
    });

    specify('Add a book via API', () => {
      cy.addBook('9781449337711');
    });
  });

  context('Deleting Books', () => {
    before('Add a book', () => {
      cy.authenticate(user);
      cy.addBook('9781449337711');
    });

    specify('Delete a book via API', () => {
      cy.deleteBook('9781449337711');
    });
  });
});
