describe('Users and Albums Test', () => {
  it('successfully loads and displays users', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Users and Their Addresses');
    cy.get('ul').children().should('have.length.at.least', 1);
  });

  it('displays albums for a selected user', () => {
    cy.visit('http://localhost:8080');
    cy.get('ul').children().first().click();
    cy.contains('Albums').should('be.visible');
    cy.get('div')
      .contains('Albums')
      .next()
      .children()
      .should('have.length.at.least', 1);
  });
});
