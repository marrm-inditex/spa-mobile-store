import { CommonPage } from "../support/pages/CommonPage";
import { ProductDetailPage } from "../support/pages/ProductDetailPage";
import { ProductListPage } from "../support/pages/ProductListPage";

describe("Add to Cart Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to product detail", () => {
    cy.url().should("include", "/products");
    ProductListPage.clickFirstProduct();
  });

  it("should not allow adding to cart without selecting variants", () => {
    ProductListPage.clickFirstProduct();
    cy.get(ProductDetailPage.selectors.addToCartButton).should("be.disabled");
  });

  it("should enable add to cart after selecting all variants", () => {
    ProductListPage.clickFirstProduct();
    cy.get(ProductDetailPage.selectors.colorSelect).should("be.visible").select(1);
    cy.get(ProductDetailPage.selectors.storageSelect).should("be.visible").select(1);
    cy.get(ProductDetailPage.selectors.addToCartButton).should("not.be.disabled");
  });

  it("should update cart count when adding product", () => {
    ProductListPage.clickFirstProduct();

    cy.get(ProductDetailPage.selectors.colorSelect).should("be.visible").select(1);
    cy.get(ProductDetailPage.selectors.storageSelect).should("be.visible").select(1);

    cy.get(CommonPage.selectors.cartBadge).then(($badge) => {
      const initialCount = parseInt($badge.text()) || 0;

      cy.get(ProductDetailPage.selectors.addToCartButton).click();
      cy.get(CommonPage.selectors.cartBadge).should(
        "have.text",
        (initialCount + 1).toString(),
      );
    });
  });
});
