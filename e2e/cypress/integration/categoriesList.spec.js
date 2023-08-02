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

});