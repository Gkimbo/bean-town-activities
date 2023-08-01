/// <reference types="Cypress" />

describe("/api/v1/categories", () => {

  describe("GET /categories", () => {
    const initialCategories = [{ name: "Shopping" }, { name: "Bodega" }];

    beforeEach(() => {
      cy.task("db:truncate", "Category");
      cy.task("db:insert", { modelName: "Category", json: initialCategories });
    });

    it("has the correct response type", () => {
      cy.request("/api/v1/categories")
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });

    it("return the correct status code", () => {
      cy.request("/api/v1/categories").its("status").should("be.equal", 200);
    });

    it("loads 2 categories", () => {
      cy.request("/api/v1/categories").its("body").its("categories").should("have.length", 2);
    });

    it("has the right property name property & value", () => {
      cy.request("/api/v1/categories")
        .its("body")
        .its("categories")
        .should((categories) => {
          expect(categories[0]).to.have.property("name", "Shopping");
        });
    });
  });
});
