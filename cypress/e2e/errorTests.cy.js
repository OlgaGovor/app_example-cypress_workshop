describe("Errors", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Validate API respose: 400", () => {
    cy.intercept("GET", "https://randomuser.me/api/", (req) => {
      req.reply({
        statusCode: 400,
        fixture: "userResponse.json",
      });
    }).as("error");

    cy.get("button").contains("Generate new user").click();
    cy.wait("@error");
    // dev should catch error  - after click on Generate new user we don't get any info about 400, after click nothing changed
  });
});
