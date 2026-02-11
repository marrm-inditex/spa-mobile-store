import { httpClient } from "@/config/api/http";
import type { BaseProductRepository } from "@/domain/product/product.repository";
import type { ProductSummary, Product } from "@/domain/product/types";
import { ProductAdapter } from "./product.adapter";
import type { ProductDTO, ProductSummaryDTO } from "./product.dto";

export class ProductRepository implements BaseProductRepository {
  static readonly productEndpoint = "/api/product";

  static adapter: ProductAdapter;

  constructor(adapter: ProductAdapter = new ProductAdapter()) {
    ProductRepository.adapter = adapter;
  }

  async getProducts(): Promise<ProductSummary[]> {
    const result = await httpClient.get<ProductSummaryDTO[]>(
      ProductRepository.productEndpoint,
    );
    return result.map(ProductRepository.adapter.productSummaryAdapter);
  }

  async getProduct(id: string): Promise<Product> {
    const result = await httpClient.get<ProductDTO>(
      `${ProductRepository.productEndpoint}/${id}`,
    );
    return ProductRepository.adapter.productAdapter(result);
  }
}
