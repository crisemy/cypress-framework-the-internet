describe('Login Tests', () => {
    beforeEach(function () {
      cy.visit('/login');
      cy.fixture('users').as('users');
    });
  
    it('should login successfully with valid credentials', function () {
      const { username, password } = this.users.validUser;
      cy.login(username, password);
      cy.contains('You logged into a secure area!').should('be.visible');
    });
  
    it('should show error with invalid credentials', function () {
      const { username, password } = this.users.invalidUser;
      cy.login(username, password);
      cy.contains('Your username is invalid!').should('be.visible');
    });
  });
  
