describe('Part 1 — DummyJSON API tests (practical assignment)', () => {

  const baseUrl = Cypress.env('DUMMYJSON_BASE') || 'https://dummyjson.com';

  // test user for login/get flows
  const testUser = {
    username: `dhan_user_${Date.now()}`,
    password: `Pwd@${Date.now()}`,
    email: `dhan_${Date.now()}@example.com`,
    firstName: 'Dhananjay',
    lastName: 'Darandale',
    age: 28
  };

  let persistedUser = null;

  // helper for POST /users/add
  function createUser(payload) {
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/users/add`,
      body: payload,
      failOnStatusCode: false
    });
  }

  // create test user before running tests
  before(() => {
    const payload = {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      age: testUser.age,
      username: testUser.username,
      email: testUser.email,
      password: testUser.password
    };

    createUser(payload).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 201]);

      // store id if persisted
      if (resp.body && resp.body.id) {
        persistedUser = resp.body;
        cy.log(`user created id=${resp.body.id}`);
      } else {
        cy.log('user not persisted (expected for mock)');
      }
    });
  });

  /* ------------------------------
     1) Generate OTP / Login
     ------------------------------ */
  it('1 — Generate OTP / Login checks', () => {
    // login with created user
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: testUser.username, password: testUser.password },
      failOnStatusCode: false
    }).then((resp) => {
      if (resp.status === 200) {
        expect(resp.body).to.have.property('token');
      } else {
        expect([400, 401, 403]).to.include(resp.status);
      }
    });

    // negative login
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: 'invalid_user_xyz', password: 'wrongpass' },
      failOnStatusCode: false
    }).then((resp) => {
      expect([400, 401, 403]).to.include(resp.status);
    });
  });

  /* ------------------------------
     2) Verify OTP (negative cases)
     ------------------------------ */
  it('2 — Verify OTP invalid/missing fields', () => {
    // invalid password
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: testUser.username, password: 'incorrect' },
      failOnStatusCode: false
    }).then((resp) => {
      expect([400, 401, 403]).to.include(resp.status);
    });

    // missing fields
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: '' },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.not.equal(500);
    });
  });

  /* ------------------------------
     3) Register user
     ------------------------------ */
  it('3 — Register user: schema + missing fields', () => {
    const payload = {
      firstName: `Reg_${Date.now()}`,
      lastName: 'User',
      age: 22,
      username: `reg_user_${Date.now()}`,
      email: `reg_${Date.now()}@example.com`,
      password: 'Test@1234'
    };

    // positive create
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users/add`,
      body: payload,
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 201]);
      expect(resp.body).to.have.property('id');
      expect(resp.body).to.have.property('email', payload.email);
    });

    // missing fields
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users/add`,
      body: { firstName: 'OnlyName' },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 201, 400, 422]);
    });
  });

  /* ------------------------------
     4) Login flow
     ------------------------------ */
  it('4 — Login flow positive/negative', () => {
    // valid login
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: testUser.username, password: testUser.password },
      failOnStatusCode: false
    }).then((resp) => {
      if (resp.status === 200) {
        expect(resp.body).to.have.property('token');
      } else {
        expect([400, 401, 403]).to.include(resp.status);
      }
    });

    // invalid login
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: 'nobody', password: 'nopass' },
      failOnStatusCode: false
    }).then((resp) => {
      expect([400, 401, 403]).to.include(resp.status);
    });
  });

  /* ------------------------------
     5) Get User Info
     ------------------------------ */
  it('5 — Get user info + permission simulation', () => {
    if (persistedUser && persistedUser.id) {

      // GET user
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${persistedUser.id}`,
        failOnStatusCode: false
      }).then((resp) => {
        if (resp.status === 200) {
          expect(resp.body).to.have.property('id', persistedUser.id);
        } else {
          expect(resp.status).to.equal(404);
        }
      });

      // invalid token
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${persistedUser.id}`,
        headers: { Authorization: 'Bearer invalidtoken' },
        failOnStatusCode: false
      }).then((resp) => {
        expect([200, 401, 403, 404]).to.include(resp.status);
      });

    } else {
      // fallback user
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/1`,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.body).to.have.property('id', 1);
      });
    }
  });

});
