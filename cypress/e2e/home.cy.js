// Just gaining access to the Home Page
import HomePage from '../pages/HomePage';

const homePage = new HomePage();

describe('Home Page', () => {
  it('should load successfully and display the welcome text', () => {
    homePage.visit();
    homePage.verifyWelcomeText();
  });
});
