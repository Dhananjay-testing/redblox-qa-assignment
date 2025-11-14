describe('User Management - Table validations (robust)', () => {

  beforeEach(() => {
    // login
    cy.visit('/');
    cy.get('input[name="username"], input#txtUsername, input[placeholder*="Username"]', { timeout: 10000 })
      .clear().type('Admin');
    cy.get('input[name="password"], input#txtPassword, input[placeholder*="Password"]', { timeout: 10000 })
      .clear().type('admin123');
    cy.get('button[type="submit"], button.oxd-button, button:contains("Login")', { timeout: 10000 }).click();

    // verify dashboard
    cy.url({ timeout: 10000 }).should('include', '/web/index.php/dashboard');
  });

  it('navigates to Admin > User Management > Users and validates table', () => {
    // wait for user API
    cy.intercept('GET', '/web/index.php/api/v2/admin/users*').as('getUsers');

    // navigation
    cy.contains('Admin', { timeout: 10000 }).click();
    cy.contains('User Management', { timeout: 10000 }).click();
    cy.contains('Users', { timeout: 10000 }).click();

    cy.wait('@getUsers', { timeout: 15000 });

    // table 
    cy.get('table, .oxd-table, div[role="table"], .oxd-table-wrapper', { timeout: 10000 })
      .should('be.visible')
      .then(($el) => {

        if ($el.is('table')) {
          // table layout
          cy.wrap($el).find('thead tr th').its('length').should('be.greaterThan', 0);
          cy.wrap($el).find('tbody tr').its('length').should('be.greaterThan', 0);

        } else {
          // div- table layout
          cy.get('.oxd-table .oxd-table-card, .oxd-table-body .oxd-table-row, .oxd-table-body .oxd-table-card', { timeout: 10000 })
            .its('length')
            .should('be.greaterThan', 0);

          cy.get('.oxd-table .oxd-table-header, .oxd-table thead, .oxd-table .oxd-table-header-cell', { timeout: 10000 })
            .should('exist');
        }

      });
  });
    // Take screenshot
    cy.screenshot('user-management-table');
});
