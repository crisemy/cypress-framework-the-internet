import SortableTablePage from '../pages/SortableTablePage';

describe('Sortable Data Tables', () => {
  beforeEach(() => {
    SortableTablePage.visit();
  });

  it('should display table headers and rows', () => {
    SortableTablePage.getColumnHeaders().should('have.length.greaterThan', 0);
    SortableTablePage.getRows().should('have.length.greaterThan', 0);
  });

  it('should sort by Last Name', () => {
    SortableTablePage.clickColumnHeader('Last Name');
    SortableTablePage.getRows().then((rows) => {
      const lastNames = [];
      rows.each((index, row) => {
        const lastName = Cypress.$(row).find('td').eq(0).text().trim();
        lastNames.push(lastName);
      });

      const sorted = [...lastNames].sort();
      expect(lastNames).to.deep.equal(sorted);
    });
  });

  it('should validate specific cell content', () => {
    // For example: validating the email of the 1st row
    SortableTablePage.getCellText(0, 2).should('include', '@');
  });
});