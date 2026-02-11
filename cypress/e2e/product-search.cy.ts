import { ProductListPage } from "../support/pages/ProductListPage";

describe("Product Search Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to products page and see product list", () => {
    cy.url().should("include", "/products");
    cy.get(ProductListPage.selectors.productCard).should("have.length.greaterThan", 0);
  });

  it("should display product search input", () => {
    cy.get(ProductListPage.selectors.searchInput).should("be.visible");
  });

  it("should filter products by search term", () => {
    cy.get(ProductListPage.selectors.searchInput).type("Alcatel");
    cy.get(ProductListPage.selectors.productCard).each(($card) => {
      cy.wrap($card).should("contain.text", "alcatel");
    });
  });
});
