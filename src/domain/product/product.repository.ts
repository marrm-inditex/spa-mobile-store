import type { ProductSummary, Product } from "./types";

export interface IProductAdapter {
  productSummaryAdapter(dto: unknown): ProductSummary;
  productAdapter(dto: unknown): Product;
}

export interface BaseProductRepository {
  getProducts(): Promise<ProductSummary[]>;
  getProduct(id: string): Promise<Product>;
}
