describe('Role Based Access - Menu visibility', () => {

  it('Admin sees User Management menu', () => {
    cy.visit('/');

    // login as admin
    cy.get('input[name="username"]').clear().type('Admin');
    cy.get('input[name="password"]').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // verify admin menu
    cy.contains('Admin').should('exist');

    // Take screenshot
    cy.screenshot('admin-menu-visible');
  });

  it('Non-admin should not see User Management menu (simulated)', () => {
    cy.visit('/');

    // placeholder check for non-admin role
    cy.log('Simulated non-admin scenario');
  });

});
