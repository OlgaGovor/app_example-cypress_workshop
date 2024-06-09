export default class ObjectPage {
  validateDefaultData() {
    cy.get("#user_title").should("have.text", "Hi, My name is");
    cy.get("#user_value").should("have.text", "...");
    cy.get("#user_email").should("have.text", "...");
    cy.get("#user_birthday").should("have.text", "...");
    cy.get("#user_address").should("have.text", "...");
    cy.get("#user_phone").should("have.text", "...");
    cy.get("#user_password").should("have.text", "...");
    cy.get("#user_gender").should("have.text", "...");
  }
}
