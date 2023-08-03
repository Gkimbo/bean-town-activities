///<reference types="Cypress" />
const baseUrl = "http://localhost:8765";
describe("Register Test User", () => {
    const email = "test@test.com"
    const password = "password"
    let activityId
    beforeEach(() => {

    });
    
    it("registers the test user", () => {
        cy.task("db:truncate", "User");
        cy.visit("/users/new");
        cy.get("form").within(() => {
        cy.findByLabelText("Email").type(email)
        cy.findByLabelText("Password").type(password)
        cy.findByLabelText("Password Confirmation").type(password)
        cy.findByText("Register").click();
        });
    });
    it("signs in the test user", () => {
        cy.visit("/user-sessions/new");
        cy.get("form").within(() => {
        cy.findByLabelText("Email").type(email)
        cy.findByLabelText("Password").type(password)
        cy.findByText("Sign In").click();
        })
    })

context("Activity Show Page", () => {
    const initialActivity = 
        [ { name: "test bar",
        location: "test location",
        description: "test description",
        categoryId: null
    } ]
    let category
    let activityId
    beforeEach(() => {
        cy.task("db:truncate", "Activity");
        cy.task("db:truncate", "Category");
        cy.task("db:insert", { modelName: "Category", json: { name: "bars"} })
        cy.task("db:find", { modelName: "Category", conditions: { name: "bars" } }).then((category) => {
            initialActivity[0].categoryId = category[0].id
        })
        cy.task("db:insert", { modelName: "Activity", json: initialActivity })
        cy.task("db:find", {modelName: "Activity", conditions: { name: "test bar" } }).then((activity) => {
            activityId = activity.id
        })
        cy.visit(`/activities/${activityId}`);
    })
    it("displays the activity name", () => {
        cy.get(".activity-container")
        .first()
        .should("have.text", `${initialActivity[0].name}`)
    })
    it("displays the activity location", () => {
        cy.get(".activity-container")
        .eq(1)
        .should("have.text", `${initialActivity[0].location}`)
    })
    it("displays the activity description", () => {
        cy.get(".activity-container")
        .eq(2)
        .should("have.text", `${initialActivity[0].description}`)
    })
});
})