
class SortableTablePage {
  constructor() {
    this.url = '/tables';
    this.selectors = {
      table: '#table1',
      columnHeaders: 'thead th',
      rows: 'tbody tr',
      rowCells: 'td',
    };
  }

  visit() {
    cy.visit(this.url);
  }

  getTable() {
    return cy.get(this.selectors.table);
  }

  getColumnHeaders() {
    return this.getTable().find(this.selectors.columnHeaders);
  }

  getRows() {
    return this.getTable().find(this.selectors.rows);
  }

  clickColumnHeader(headerText) {
    this.getColumnHeaders()
      .contains(headerText)
      .click();
  }

  getCellText(rowIndex, columnIndex) {
    return this.getRows()
      .eq(rowIndex)
      .find(this.selectors.rowCells)
      .eq(columnIndex)
      .invoke('text');
  }
}

export default new SortableTablePage();
