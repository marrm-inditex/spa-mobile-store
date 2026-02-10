import { describe, it, expect } from "vitest";
import { ProductAdapter } from "./product.adapter";
import type { ProductSummaryDTO } from "./product.dto";

describe("ProductAdapter", () => {
  it("maps ProductSummaryDTO to ProductSummary", () => {
    const adapter = new ProductAdapter();
    const dto: ProductSummaryDTO = {
      id: "1",
      brand: "Apple",
      imgUrl: "https://example.com/iphone.jpg",
      model: "iPhone 13",
      price: "999",
    };

    const result = adapter.productSummaryAdapter(dto);

    expect(result).toEqual({
      id: "1",
      brand: "Apple",
      imgUrl: "https://example.com/iphone.jpg",
      model: "iPhone 13",
      price: 999,
    });
  });
});
