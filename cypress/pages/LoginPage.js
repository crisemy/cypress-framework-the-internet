class LoginPage {
    constructor() {
      this.usernameInput = '#username';
      this.passwordInput = '#password';
      this.loginButton = 'button[type="submit"]';
    }
  
    typeUsername(username) {
      cy.get(this.usernameInput).type(username);
    }
  
    typePassword(password) {
      cy.get(this.passwordInput).type(password);
    }
  
    clickLogin() {
      cy.get(this.loginButton).click();
    }
  
    login(username, password) {
      this.typeUsername(username);
      this.typePassword(password);
      this.clickLogin();
    }
  }
  
  export default LoginPage;