describe('Theme toggle', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('allows a user to toggle the dark theme', () => {
    // const initialTheme = document.body.className;
    cy.findByRole('button', { name: /toggle theme/i }).click();
    cy.get('body').should('have.class', 'dark');
  });

  it('allows a user to toggle the light theme', () => {
    cy.findByRole('button', { name: /toggle theme/i }).click();
    cy.findByRole('button', { name: /toggle theme/i }).click();
    cy.get('body').should('have.class', 'light');
  });
});
