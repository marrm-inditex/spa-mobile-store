import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductRepository } from "./product.repository";
import type { ProductSummaryDTO, ProductDTO } from "./product.dto";
import type { ProductSummary, Product } from "@/domain/product/types";

vi.mock("@/config/api/http", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

import { httpClient } from "@/config/api/http";

describe("ProductRepository", () => {
  const repository = new ProductRepository();

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

  it("fetches product detail by id and maps it using the adapter", async () => {
    const dto: ProductDTO = {
      id: "2",
      brand: "Google",
      imgUrl: "https://example.com/pixel.jpg",
      model: "Pixel 8",
      price: "799",
      cpu: "Google Tensor G3",
      ram: "8GB",
      os: "Android 14",
      displayResolution: "1080 x 2400 pixels",
      battery: "4500 mAh",
      primaryCamera: ["50 MP", "12 MP"],
      secondaryCmera: ["10.8 MP"],
      dimensions: "155.1 x 73.1 x 8.7 mm",
      weight: "207 g",
      options: {
        colors: [],
        storages: [],
      },
    };

    vi.mocked(httpClient.get).mockResolvedValue(dto);
    const result = await repository.getProduct("1");

    expect(httpClient.get).toHaveBeenCalledWith("/api/product/1");
    expect(result).toEqual<Product>({
      id: "2",
      brand: "Google",
      imgUrl: "https://example.com/pixel.jpg",
      model: "Pixel 8",
      price: 799,
      cpu: "Google Tensor G3",
      ram: "8GB",
      os: "Android 14",
      displayResolution: "1080 x 2400 pixels",
      battery: "4500 mAh",
      primaryCamera: ["50 MP", "12 MP"],
      secondaryCamera: ["10.8 MP"],
      dimensions: "155.1 x 73.1 x 8.7 mm",
      weight: "207 g",
      options: {
        colors: [],
        storages: [],
      },
    });
  });
});
