describe('Pagination', () => {
  before(() => {
    cy.visit('http://localhost:8080');
  });

  it('Pagination is hidden when there is only one page', () => {
    cy.findByTestId('Pagination').should('not.exist');
  });
});
