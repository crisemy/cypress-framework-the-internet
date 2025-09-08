import HomePage from '../pages/HomePage';

const homePage = new HomePage();

describe('Home Page', () => {
  beforeEach(() => {
    homePage.visit();
  });

  it('should display the correct heading', () => {
    homePage.getHeading().should('have.text', 'Welcome to the-internet');
  });

  it('should display a paragraph with instructions', () => {
    homePage.getExamplesTitle().should('contain.text', 'Available Examples');
  });
});

it('studioTest', function() {
  cy.visit('http://localhost:7080/')
  cy.get('.heading').should('have.text', 'Welcome to the-internet');
  cy.get('h2').should('have.text', 'Available Examples');
  cy.get('img').should('be.visible');
  cy.get('[href="/abtest"]').click();
  cy.get('.large-4 div').should('have.text', 'Powered by Elemental Selenium');
  cy.get('[href="http://elementalselenium.com/"]').should('have.attr', 'href', 'http://elementalselenium.com/');
  cy.get('p').click();
});