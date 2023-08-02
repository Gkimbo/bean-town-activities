/// <reference types="Cypress" />

context("Category Index Page", () => {
        const initialCategories = [{ name: "Shopping" }, { name: "Bodega" }];
        let showUrl
    beforeEach(() => {
        cy.task("db:truncate", "Category");
        cy.task("db:insert", { modelName: "Category", json: initialCategories });
        cy.task("db:find", { modelName: "Category", conditions: { name: "Shopping" } }).then((category) => {
            showUrl = `/categories/${category[0].id}`
        })
        cy.visit("http://localhost:8765/");
    });

    it("lists all categories", () => {
        cy.get(".categories-list")
        .find("li")
        .first()
        .should(
        "have.text",
        `${initialCategories[0].name}`
    );

    cy.get(".categories-list")
        .find("li")
        .eq(1)
        .should(
        "have.text",
        `${initialCategories[1].name}`
        );
    });

    it("has a link to go to the activities list", () => {
        cy.get(".categories-list")
        .find("li")
        .first()
        .find("a")
        .should("have.text", `${initialCategories[0].name}`)
        .and("have.attr", "href", `${showUrl}`);
    });

    it("has a link to the home page", () => {
        cy.get("a")
        .first()
        .should("have.text", "Home")
        .and("have.attr", "href", "/")
    })

    it("has button to register new user", () => {
        cy.get(".button")
        .should("have.text", "Sign Up")
        .and("have.attr", "href", "/users/new")
    })

    it("has button to sign in existing user", () => {
        cy.get(".sign-in")
        .find("a")
        .should("have.text", "Sign In")
        .and("have.attr", "href", "/user-sessions/new")
    })
});