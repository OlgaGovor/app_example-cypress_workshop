export default class PageObject {
  get generateNewUserButton() {
    return cy.get("button").contains("Generate new user");
  }

  get generateNewFemaleButton() {
    return cy.get("button").contains("Generate new female");
  }

  get generateNewMaleButton() {
    return cy.get("button").contains("Generate new male");
  }

  get clearButton() {
    return cy.get("button").contains("Clear");
  }

  get visitPage() {
    return cy.visit("/");
  }

  get userTitle() {
    return cy.get("#user_title");
  }

  get userEmail() {
    return cy.get("#user_email");
  }

  get userValue() {
    return cy.get("#user_value");
  }

  get userBirthday() {
    return cy.get("#user_birthday");
  }

  get userAddress() {
    return cy.get("#user_address");
  }

  get userPhone() {
    return cy.get("#user_phone");
  }

  get userPassword() {
    return cy.get("#user_password");
  }

  get userGender() {
    return cy.get("#user_gender");
  }

  get image() {
    return cy.get('[alt="question mark"]');
  }

  validateDefaultData() {
    this.userTitle.should("have.text", "Hi, My name is");
    this.userValue.should("have.text", "...");
    this.userEmail.should("have.text", "...");
    this.userBirthday.should("have.text", "...");
    this.userAddress.should("have.text", "...");
    this.userPhone.should("have.text", "...");
    this.userPassword.should("have.text", "...");
    this.userPassword.should("have.text", "...");
  }
}
