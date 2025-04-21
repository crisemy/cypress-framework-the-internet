import DynamicControlsPage from '../pages/DynamicControlsPage';

describe('Dynamic Controls Tests', () => {
  const page = new DynamicControlsPage();

  beforeEach(() => {
    cy.visit('/dynamic_controls');
  });

  it('should remove and add the checkbox', () => {
    page.getCheckbox().should('be.visible');
    page.toggleCheckbox();

    page.getMessage().should('contain', "It's gone!");
    cy.get(page.checkbox).should('not.exist');

    page.toggleCheckbox();
    page.getMessage().should('contain', "It's back!");
    page.getCheckbox().should('be.visible');
  });

  it('should enable and disable the input field', () => {
    page.getInputField().should('be.disabled');
    page.toggleInput();

    page.getInputField().should('be.enabled');
    page.getMessage().should('contain', "It's enabled!");

    page.toggleInput();
    page.getInputField().should('be.disabled');
    page.getMessage().should('contain', "It's disabled!");
  });
});
