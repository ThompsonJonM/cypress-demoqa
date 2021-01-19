/// <reference types="cypress" />

describe('DemoQA Book Store App', () => {
  const book = {
    title: 'Designing Evolvable Web APIs with ASP.NET',
    ISBN: '9781449337711',
  };
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
    beforeEach('Authenticate', () => {
      cy.authenticate(user);
    });

    afterEach('Delete the book', () => {
      cy.deleteBook(book.ISBN);
    });

    specify('Add a book via API', () => {
      cy.addBook(book.ISBN);
    });

    specify('As a user, I should be able to add a book to my profile', () => {
      cy.visit(`${Cypress.config('baseUrl')}/books?book=${book.ISBN}`);

      cy.url().should('contain', book.ISBN);
      cy.get('.profile-wrapper').within(() => {
        for (const [key, value] of Object.entries(book)) {
          cy.get(`#${key}-wrapper`).should('contain', value);
        }
      });

      cy.get('.text-right').within(() => {
        cy.get('#addNewRecordButton').click();
      });

      cy.visit(`${Cypress.config('baseUrl')}/profile`);

      cy.contains('.rt-tr-group', book.title).should('be.visible');
    });
  });

  context('Deleting Books', () => {
    beforeEach('Add a book', () => {
      cy.authenticate(user);
      cy.addBook(book.ISBN);
    });

    specify('Delete a book via API', () => {
      cy.deleteBook(book.ISBN);
    });

    specify('As a user, I should be able to delete a book from my profile', () => {
      cy.visit(`${Cypress.config('baseUrl')}/profile`);

      cy.contains('.rt-tr-group', book.title).within(() => {
        cy.get('#delete-record-undefined').click();
      });

      cy.get('.modal-content').within(() => {
        cy.get('#closeSmallModal-ok').click();
      });

      cy.get('.modal-content').should('not.exist');

      cy.reload();

      cy.contains('.rt-tr-group', book.title).should('not.exist');
    });
  });
});
