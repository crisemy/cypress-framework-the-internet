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