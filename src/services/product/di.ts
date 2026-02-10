import type { BaseProductRepository } from "@/domain/product/product.repository";
import { KEY_PRODUCT } from "@/domain/product/state";
import { ProductRepository } from "@/infrastructure/product/product.repository";

export const ProductDI: { repository: BaseProductRepository; cacheKey: string } = {
  repository: new ProductRepository(),
  cacheKey: KEY_PRODUCT,
};
