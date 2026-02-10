import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductRepository } from "./product.repository";
import type { ProductSummaryDTO } from "./product.dto";
import type { ProductSummary } from "@/domain/product/types";

vi.mock("@/config/api/http", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

import { httpClient } from "@/config/api/http";

describe("ProductRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches products and maps them using the adapter", async () => {
    const dto: ProductSummaryDTO[] = [
      {
        id: "1",
        brand: "Apple",
        imgUrl: "https://example.com/iphone.jpg",
        model: "iPhone 13",
        price: "999",
      },
    ];

    vi.mocked(httpClient.get).mockResolvedValue(dto);

    const repository = new ProductRepository();
    const result = await repository.getProducts();

    expect(httpClient.get).toHaveBeenCalledWith(ProductRepository.productEndpoint);
    expect(result).toEqual<ProductSummary[]>([
      {
        id: "1",
        brand: "Apple",
        imgUrl: "https://example.com/iphone.jpg",
        model: "iPhone 13",
        price: 999,
      },
    ]);
  });
});
