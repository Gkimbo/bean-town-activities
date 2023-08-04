///<reference types="Cypress" />
const baseUrl = "http://localhost:8765";
let activityId;
describe("Register Test User", () => {
  const email = "test@test.com";
  const password = "password";

  it("registers and signs in the test user", () => {
    cy.task("db:truncate", "User");
    cy.visit("/users/new");
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type(email);
      cy.findByLabelText("Password").type(password);
      cy.findByLabelText("Password Confirmation").type(password);
      cy.findByText("Register").click();
    });
  });
  
  context("Activity Show Page", () => {
    const initialActivity = {
      name: "test bar",
      location: "test location",
      description: "test description",
      categoryId: null,
    };

    beforeEach(() => {
      cy.task("db:truncate", "Activity");
      cy.task("db:truncate", "Category");
      cy.task("db:insert", { modelName: "Category", json: { name: "bars" } });
      cy.task("db:find", { modelName: "Category", conditions: { name: "bars" } }).then(
        (category) => {
          initialActivity.categoryId = category[0].id;
        }
      );
      cy.task("db:insert", { modelName: "Activity", json: initialActivity });
      cy.task("db:find", { modelName: "Activity", conditions: { name: "test bar" } }).then(
        (activity) => {
          activityId = activity[0].id;
        }
      );
    });

    it("displays the activity name", () => {
      cy.visit(`/activities/${activityId}`);
      cy.get(".activity-container")
      .find("h3")
      .should("have.text", `${initialActivity.name}`);
    });
    it("displays the activity location", () => {
      cy.get(".activity-container")
      .find("p")
      .first()
      .should("have.text", `${initialActivity.location}`);
    });
    it("displays the activity description", () => {
      cy.get(".activity-container")
      .find("p")
      .last()
      .should("have.text", `${initialActivity.description}`);
    });
  });
});
