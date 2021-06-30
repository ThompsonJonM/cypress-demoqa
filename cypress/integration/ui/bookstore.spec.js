/// <reference types="cypress" />

import filterTests from '../../support/filterTests';

filterTests(['all', 'ui'], () => {
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
      specify('As a user, I should be able to login', () => {
        cy.visit(`${Cypress.config('baseUrl')}/login`);

        cy.get('#userForm').within(() => {
          cy.get('#userName').type(user.username);
          cy.get('#password').type(user.password);

          cy.get('.text-right').within(() => {
            cy.get('#login').click();
          });

          cy.url().should('eq', `${Cypress.config('baseUrl')}/profile`);
        });
      });

      specify('As a user, I should receive an error for null input', () => {
        cy.visit(`${Cypress.config('baseUrl')}/login`);

        cy.get('#userForm').within(() => {
          cy.get('.text-right').within(() => {
            cy.get('#login').click();
          });

          ['userName', 'password'].forEach(($field) => {
            cy.get(`#${$field}`).should('have.class', 'is-invalid');
          });
        });
      });

      specify('As a user, I should be able to logout', () => {
        cy.authenticate(user);

        cy.visit(`${Cypress.config('baseUrl')}/profile`);

        cy.clearCookies();

        cy.get('#books-wrapper').within(() => {
          cy.get('#submit').click();
        });

        cy.get('.login-wrapper').should('be.visible');
      });
    });

    context('Adding Books', () => {
      beforeEach('Authenticate', () => {
        cy.authenticate(user);
      });

      afterEach('Delete the book', () => {
        cy.deleteBook(book.ISBN);
      });

      specify.only('As a user, I should be able to add a book to my profile', () => {
        cy.intercept('GET', `${Cypress.config('baseUrl')}/BookStore/v1/Books`, ($req) => {
          $req.reply(($res) => {
            
            $res.delay(1000);
            $res.send({ fixture: 'books.json' });

            expect($res.statusCode).to.equal(200);
            expect($res.statusMessage).to.equal('OK');
          });
        }).as('booksRequest');
        cy.visit(`${Cypress.config('baseUrl')}/books`);
        cy.wait('@booksRequest');

        cy.contains('a', book.title).should('be.visible').click();

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
});
