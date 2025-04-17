class HomePage {
    constructor() {
      this.heading = 'h1.heading';
      this.examplesTitle = 'h2'; 
    }
  
    visit() {
      cy.visit('/');
    }
  
    getHeading() {
      return cy.get(this.heading);
    }
  
    getExamplesTitle() {
      return cy.get(this.examplesTitle);
    }
  }
  
  export default HomePage;