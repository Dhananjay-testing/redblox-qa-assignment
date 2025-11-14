Cypress.Commands.add('loginUI', (username, password) => {
  cy.visit('/');
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').click();
});
