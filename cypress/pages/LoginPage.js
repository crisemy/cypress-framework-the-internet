class LoginPage {
    // Constructor con los selectores
    constructor() {
      this.usernameInput = '#username';
      this.passwordInput = '#password';
      this.loginButton = 'button[type="submit"]';
    }
  
    // Métodos que usan los selectores definidos en el constructor
    typeUsername(username) {
      cy.get(this.usernameInput).type(username);
    }
  
    typePassword(password) {
      cy.get(this.passwordInput).type(password);
    }
  
    clickLogin() {
      cy.get(this.loginButton).click();
    }
  
    // Método que encapsula el flujo completo de login
    login(username, password) {
      this.typeUsername(username);
      this.typePassword(password);
      this.clickLogin();
    }
  }
  
  export default LoginPage;
  