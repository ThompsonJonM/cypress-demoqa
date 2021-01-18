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
        cy.get('button').last().click();
      }

      cy.get(`#${messageSelector}`).should('be.visible');
    });
  });
});
