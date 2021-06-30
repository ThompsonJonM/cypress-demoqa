/// <reference types="cypress" />

import filterTests from '../../support/filterTests';

filterTests(['all', 'ui', 'elements'], () => {
  describe('DemoQA Elements Page', () => {
    specify('As a user, I should be able to visit the Elements page', () => {
      cy.visit(`${Cypress.config('baseUrl')}/elements`);

      cy.get('.header-text').invoke('text').should('contain', 'Elements');
    });

    specify('As a user, I should be able to collapse the Elements container', () => {
      cy.visit(`${Cypress.config('baseUrl')}/elements`);

      cy.contains('.element-group', 'Elements').within(() => {
        cy.get('.element-list').should('be.visible');
        cy.get('.header-right').click();
        cy.get('.element-list').should('not.have.class', 'show');
      });
    });

    context('Text Box Tests', () => {
      const user = {
        name: 'Test Tester',
        email: 'test@test.com',
        currentAddress: '3930 N Pine Grove Ave, Chicago, IL 60613',
        permanentAddress: '24 Girard St, Rochester, NY 14610',
      };

      beforeEach('Navigate to the Text Box page', () => {
        cy.visit(`${Cypress.config('baseUrl')}/text-box`);
      });

      specify('As a user, I should be able to submit valid data', () => {
        cy.get('#userForm').within(() => {
          cy.fillTextBoxForm(user);
          cy.get('#submit').click();

          cy.get('#output').within(() => {
            for (const [key, value] of Object.entries(user)) {
              cy.get(`#${key}`).should('contain', value);
            }
          });
        });
      });

      specify('As a user, I should receive an error when inputting invalid email', () => {
        cy.get('#userForm').within(() => {
          // Email is the only field which validates
          cy.get('#userEmail').type('test');
          cy.get('#submit').click();
          cy.get('#userEmail').should('have.class', 'field-error');
        });
      });
    });

    context.only('Buttons Tests', () => {
      const buttonTuple = [
        ['Double Click', 'doubleClickMessage'],
        ['Right Click', 'rightClickMessage'],
        ['Click', 'dynamicClickMessage'],
      ];

      buttonTuple.forEach(($type) => {
        const [clickType, messageSelector] = $type;

        specify(`As a user, I should be able to ${clickType} an element`, () => {
          cy.visit(`${Cypress.config('baseUrl')}/buttons`);

          if (clickType === 'Double Click') {
            cy.get('#doubleClickBtn').dblclick();
          } else if (clickType === 'Right Click') {
            cy.get('#rightClickBtn').rightclick();
          } else {
            cy.contains('button', /^Click Me$/).click();
          }

          cy.get(`#${messageSelector}`).should('be.visible');
        });
      });
    });
  });
});
