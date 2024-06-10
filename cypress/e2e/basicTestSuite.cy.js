import userResponse from "../fixtures/userResponse.json";

// create a fn to avoid code duplication
function validateDefaultData() {
  cy.get("#user_title").should("have.text", "Hi, My name is");
  cy.get("#user_value").should("have.text", "...");
  cy.get("#user_email").should("have.text", "...");
  cy.get("#user_birthday").should("have.text", "...");
  cy.get("#user_address").should("have.text", "...");
  cy.get("#user_phone").should("have.text", "...");
  cy.get("#user_password").should("have.text", "...");
  cy.get("#user_gender").should("have.text", "...");
}

describe("Basic test suite", () => {
  beforeEach(() => {
    cy.visit("/");
    // mock the response
    cy.intercept("https://randomuser.me/api/", userResponse).as("user");
  });

  it("Generate a new user then validate data on the page", () => {
    // create variables
    const name = `${userResponse.results[0].name.first} ${userResponse.results[0].name.last}`;
    const dateOfBirth = new Date(userResponse.results[0].dob.date);
    // getUTCMonth() returns month from 0 to 11
    const formattedDateOfBirth =
      dateOfBirth.getUTCDate() +
      "/" +
      (dateOfBirth.getUTCMonth() + 1) +
      "/" +
      dateOfBirth.getUTCFullYear();

    // generate new user
    cy.get("button").contains("Generate new user").click();

    // wait for the response to be returned
    cy.wait("@user");

    // check if the elements are visible
    cy.get("#user_title").should("have.text", "Hi, My name is");
    cy.get("#user_value").should("have.text", name);
    cy.get("#user_email").should(
      "have.text",
      `Email: ${userResponse.results[0].email}`
    );
    cy.get("#user_birthday").should(
      "have.text",
      `Date of birth: ${formattedDateOfBirth}`
    );
    cy.get("#user_address").should(
      "have.text",
      `Address: ${userResponse.results[0].location.street.number} ${userResponse.results[0].location.street.name}`
    );
    cy.get("#user_phone").should(
      "have.text",
      `Phone number: ${userResponse.results[0].cell}`
    );
    cy.get("#user_password").should(
      "have.text",
      `Password: ${userResponse.results[0].login.password}`
    );
    cy.get("#user_gender").should(
      "have.text",
      `Gender: ${userResponse.results[0].gender}`
    );

    // check if the image source is the same as the one in the userResponse
    cy.get('[alt="question mark"]')
      .should("be.visible")
      .should("have.attr", "src")
      .and("equal", userResponse.results[0].picture.large);
  });

  it("Validate action buttons", () => {
    cy.get("button")
      .contains("Generate new user")
      .should("be.visible")
      .and("be.enabled");
    cy.get("button")
      .contains("Generate new female")
      .should("be.visible")
      .and("be.enabled");
    cy.get("button")
      .contains("Generate new male")
      .should("be.visible")
      .and("be.enabled");
    cy.get("button").contains("Clear").should("be.visible").and("be.enabled");
  });

  it("Validate default page", () => {
    cy.get('[alt="question mark"]')
      .should("have.attr", "src")
      .and(
        "equal",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Orange_question_mark.svg"
      );
    validateDefaultData();
  });

  it("Generate a new user, clear and validate", () => {
    cy.get("button").contains("Generate new user").click();
    cy.wait("@user");
    cy.get("button").contains("Clear").click();
    // there is a bug -> after clicking on the clear button gender data is not removed
    validateDefaultData();
  });
});
