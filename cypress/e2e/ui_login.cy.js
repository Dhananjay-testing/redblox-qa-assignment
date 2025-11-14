describe('OrangeHRM Login - Part 2', () => {

  it('logs in with demo account and sees dashboard', () => {
    // login
    cy.visit('/');
    cy.get('input[name="username"]').clear().type('Admin');
    cy.get('input[name="password"]').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // verify dashboard
    cy.url().should('include', '/web/index.php/dashboard');
    cy.get('header').should('exist');
  });

});
