import type { ProductSummary } from "./types";

export interface IProductAdapter {
  productSummaryAdapter(dto: unknown): ProductSummary;
}

export interface BaseProductRepository {
  getProducts(): Promise<ProductSummary[]>;
}
