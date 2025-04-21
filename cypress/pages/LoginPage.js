class LoginPage {
    // Selectors constructor
    constructor() {
      this.usernameInput = '#username';
      this.passwordInput = '#password';
      this.loginButton = 'button[type="submit"]';
    }
  
    // Methods for those selectors
    typeUsername(username) {
      cy.get(this.usernameInput).type(username);
    }
  
    typePassword(password) {
      cy.get(this.passwordInput).type(password);
    }
  
    clickLogin() {
      cy.get(this.loginButton).click();
    }
  
    // Methods for the login form
    login(username, password) {
      this.typeUsername(username);
      this.typePassword(password);
      this.clickLogin();
    }
  }
  
  export default LoginPage;