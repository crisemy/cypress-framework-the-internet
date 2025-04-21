class SortableTablePage {
    visit() {
      cy.visit('/tables');
    }
  
    getTable() {
      return cy.get('#table1');
    }
  
    getColumnHeaders() {
      return this.getTable().find('thead th');
    }
  
    getRows() {
      return this.getTable().find('tbody tr');
    }
  
    clickColumnHeader(headerText) {
      this.getColumnHeaders()
        .contains(headerText)
        .click();
    }
  
    getCellText(rowIndex, columnIndex) {
      return this.getRows()
        .eq(rowIndex)
        .find('td')
        .eq(columnIndex)
        .invoke('text');
    }
  }
  
  export default new SortableTablePage();
  