class DynamicControlsPage {
    constructor() {
      this.checkbox = '#checkbox';
      this.removeAddButton = '#checkbox-example button';
      this.message = '#message';
  
      this.inputField = '#input-example input';
      this.enableDisableButton = '#input-example button';
    }
  
    toggleCheckbox() {
      cy.get(this.removeAddButton).click();
    }
  
    toggleInput() {
      cy.get(this.enableDisableButton).click();
    }
  
    getMessage() {
      return cy.get(this.message);
    }
  
    getCheckbox() {
      return cy.get(this.checkbox);
    }
  
    getInputField() {
      return cy.get(this.inputField);
    }
  }
  
  export default DynamicControlsPage;
  