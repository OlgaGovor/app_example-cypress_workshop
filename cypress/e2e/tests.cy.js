import userResponse from "../fixtures/userResponse.json";
import PageObject from "../pages/pageObject.cy";

const pageObject = new PageObject();

describe("Basic test suite", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Mock user response", () => {
    beforeEach(() => {
      //mock the response
      cy.intercept("https://randomuser.me/api/", userResponse).as("user");
    });

    it("Generate a new user then validate data on the page", () => {
      //create variables
      const name = `${userResponse.results[0].name.first} ${userResponse.results[0].name.last}`;
      const dateOfBirth = new Date(userResponse.results[0].dob.date);
      //getUTCMonth() returns month from 0 to 11
      const formattedDateOfBirth =
        dateOfBirth.getUTCDate() +
        "/" +
        (dateOfBirth.getUTCMonth() + 1) +
        "/" +
        dateOfBirth.getUTCFullYear();

      //generate new user
      pageObject.generateNewUserButton.click();

      //wait for the response to be returned
      cy.wait("@user");

      //check if the elements are visible
      pageObject.userTitle.should("have.text", "Hi, My name is");
      pageObject.userValue.should("have.text", name);
      pageObject.userEmail.should(
        "have.text",
        `Email: ${userResponse.results[0].email}`
      );
      pageObject.userBirthday.should(
        "have.text",
        `Date of birth: ${formattedDateOfBirth}`
      );
      pageObject.userAddress.should(
        "have.text",
        `Address: ${userResponse.results[0].location.street.number} ${userResponse.results[0].location.street.name}`
      );
      pageObject.userPhone.should(
        "have.text",
        `Phone number: ${userResponse.results[0].cell}`
      );
      pageObject.userPassword.should(
        "have.text",
        `Password: ${userResponse.results[0].login.password}`
      );
      pageObject.userGender.should(
        "have.text",
        `Gender: ${userResponse.results[0].gender}`
      );

      //check if an image has successfully loaded on the page
      pageObject.image
        .should("be.visible")
        .and("have.prop", "naturalWidth")
        .should("be.greaterThan", 0);

      //check if the image source is the same as the one in the userResponse
      pageObject.image
        .should("have.attr", "src")
        .and("equal", userResponse.results[0].picture.large);
    });

    it("Validate action buttons", () => {
      pageObject.generateNewUserButton.should("be.visible").and("be.enabled");
      pageObject.generateNewFemaleButton.should("be.visible").and("be.enabled");
      pageObject.generateNewMaleButton.should("be.visible").and("be.enabled");
      pageObject.clearButton.should("be.visible").and("be.enabled");
    });

    it("Validate default page", () => {
      pageObject.image
        .should("have.attr", "src")
        .and(
          "equal",
          "https://upload.wikimedia.org/wikipedia/commons/3/35/Orange_question_mark.svg"
        );
      pageObject.validateDefaultData();
    });

    it("Generate a new user, clear and validate", () => {
      pageObject.generateNewUserButton.click();
      cy.wait("@user");
      pageObject.clearButton.click();
      //there is a bug -> after clicking on the clear button gender data is not removed
      pageObject.validateDefaultData();
    });
  });

  context("Mock response with status 400", () => {
    it("Validate API respose: 400", () => {
      cy.intercept("GET", "https://randomuser.me/api/", (req) => {
        req.reply({
          statusCode: 400,
          fixture: "userResponse.json",
        });
      }).as("error");

      pageObject.generateNewUserButton.click();
      cy.wait("@error");

      // dev should catch error  - after click on Generate new user we don't get any info about 400, after click nothing changed
    });
  });
});
