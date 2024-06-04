import response from '../fixtures/example.json'
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Validate elements on the page', () => {
    cy.intercept('https://randomuser.me/api/', response);
    cy.get('div.card-header').should('have.text', 'App example - Cypress workshop');
    cy.get('button').contains('Generate new user').should('be.visible');
    cy.get('button').contains('Generate new male').should('be.visible');
    cy.get('button').contains('Generate new female').should('be.visible');
    cy.get('button').contains('Clear').should('be.visible');
  })
})
