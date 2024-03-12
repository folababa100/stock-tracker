describe('ISIN Subscription Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('allows a user to submit an ISIN and adds it to their watch list', () => {
    const validISIN = 'US0378331005';
    cy.findByPlaceholderText('Enter ISIN').type(validISIN);
    cy.findByRole('button', { name: /subscribe/i }).click();
  });

  it('prevents subscribing to the same ISIN twice', () => {
    const duplicateISIN = 'US0378331005';
    cy.findByPlaceholderText('Enter ISIN').type(duplicateISIN);
    cy.findByRole('button', { name: /subscribe/i }).click();
    // Assuming the first submission was successful
    cy.findByPlaceholderText('Enter ISIN').type(duplicateISIN);

    cy.findByText('Already subscribed, please try another ISIN code.').should(
      'be.visible',
    );
  });

  it('prevents subscribing to an empty or invalid ISIN', () => {
    const invalidISIN = 'INVALID123'; // Shorter than required length
    cy.findByPlaceholderText('Enter ISIN').type(invalidISIN);
    cy.findByRole('button', { name: /subscribe/i }).should('be.disabled');
    cy.findByPlaceholderText('Enter ISIN').clear();
    cy.findByRole('button', { name: /subscribe/i }).should('be.disabled');
  });
});
