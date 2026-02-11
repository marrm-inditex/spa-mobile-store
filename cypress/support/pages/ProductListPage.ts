import { ProductDetailPage } from "./ProductDetailPage";

export class ProductListPage {
  static selectors = {
    productCard: "[data-testid*='product-card-']",
    searchInput: '[data-testid="search-input"]',
  };

  static clickFirstProduct() {
    cy.get(this.selectors.productCard).first().click();
    cy.get(ProductDetailPage.selectors.productDetailPage).should("be.visible");
  }
}
