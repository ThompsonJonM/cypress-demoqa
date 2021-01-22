/// <reference types="cypress" />

Cypress.Commands.add('authenticate', (user) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}/Account/v1/Login`,
    body: {
      userName: user.username,
      password: user.password,
    },
  }).then(($response) => {
    cy.setCookie('token', $response.body.token);
    cy.setCookie('userName', $response.body.username);
    cy.setCookie('userID', $response.body.userId);
    cy.setCookie('expires', $response.body.expires);
    expect($response.status).to.eq(200);
  });
});

Cypress.Commands.add('addBook', (ISBN) => {
  cy.getCookie('token').then(($token) => {
    const token = $token.value;

    cy.getCookie('userID').then(($id) => {
      const userId = $id.value;

      cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}/BookStore/v1/Books`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          userId,
          collectionOfIsbns: [{ isbn: ISBN }],
        },
      }).then(($response) => {
        expect($response.status).to.eq(201);
      });
    });
  });
});

Cypress.Commands.add('addBooks', (collectionOfIsbns) => {
  cy.getCookie('token').then(($token) => {
    const token = $token.value;

    cy.getCookie('userID').then(($id) => {
      const userId = $id.value;

      cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}/BookStore/v1/Books`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          userId,
          collectionOfIsbns,
        },
      }).then(($response) => {
        expect($response.status).to.eq(201);
      });
    });
  });
});

Cypress.Commands.add('deleteBook', (ISBN) => {
  cy.getCookie('token').then(($token) => {
    const token = $token.value;

    cy.getCookie('userID').then(($id) => {
      const userId = $id.value;

      cy.request({
        method: 'DELETE',
        url: `${Cypress.config('baseUrl')}/BookStore/v1/Book`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          userId,
          isbn: ISBN,
        },
      }).then(($response) => {
        expect($response.status).to.eq(204);
      });
    });
  });
});

Cypress.Commands.add('deleteAllBooks', () => {
  cy.getCookie('token').then(($token) => {
    const token = $token.value;

    cy.getCookie('userID').then(($id) => {
      const userId = $id.value;

      cy.request({
        method: 'DELETE',
        url: `${Cypress.config('baseUrl')}/BookStore/v1/Books?UserId=${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(($response) => {
        expect($response.status).to.eq(204);
      });
    });
  });
});
