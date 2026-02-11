import { describe, it, expect } from "vitest";
import { ProductAdapter } from "./product.adapter";
import type { ProductSummaryDTO, ProductDTO } from "./product.dto";

describe("ProductAdapter", () => {
  const adapter = new ProductAdapter();

  it("maps ProductSummaryDTO to ProductSummary", () => {
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

  it("maps ProductDTO to Product with options", () => {
    const dto: ProductDTO = {
      id: "1",
      brand: "Apple",
      imgUrl: "https://example.com/iphone.jpg",
      model: "iPhone 15",
      price: "1999",
      cpu: "A17 Bionic",
      ram: "6GB",
      os: "iOS 17",
      displayResolution: "1170 x 2532 pixels",
      battery: "3095 mAh",
      primaryCamera: ["48 MP", "12 MP"],
      secondaryCmera: ["12 MP"],
      dimensions: "146.7 x 71.5 x 7.8 mm",
      weight: "174 g",
      options: {
        colors: [
          { code: 1, name: "Black" },
          { code: 2, name: "White" },
        ],
        storages: [
          { code: 3, name: "128GB" },
          { code: 4, name: "256GB" },
        ],
      },
    };

    const result = adapter.productAdapter(dto);

    expect(result).toEqual({
      id: "1",
      brand: "Apple",
      imgUrl: "https://example.com/iphone.jpg",
      model: "iPhone 15",
      price: 1999,
      cpu: "A17 Bionic",
      ram: "6GB",
      os: "iOS 17",
      displayResolution: "1170 x 2532 pixels",
      battery: "3095 mAh",
      primaryCamera: ["48 MP", "12 MP"],
      secondaryCamera: ["12 MP"],
      dimensions: "146.7 x 71.5 x 7.8 mm",
      weight: "174 g",
      options: {
        colors: [
          { code: 1, name: "Black" },
          { code: 2, name: "White" },
        ],
        storages: [
          { code: 3, name: "128GB" },
          { code: 4, name: "256GB" },
        ],
      },
    });
  });

  it("maps ProductDTO without options", () => {
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

    const result = adapter.productAdapter(dto);

    expect(result).toEqual({
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

  it("normalizes camera arrays with valid strings", () => {
    const dto: ProductDTO = {
      id: "3",
      brand: "Samsung",
      imgUrl: "https://example.com/galaxy.jpg",
      model: "Galaxy S24",
      price: "899",
      cpu: "Snapdragon 8 Gen 3",
      ram: "12GB",
      os: "Android 14",
      displayResolution: "1440 x 3120 pixels",
      battery: "4000 mAh",
      primaryCamera: ["200 MP", "50 MP", "10 MP"],
      secondaryCamera: ["32 MP"],
      dimensions: "147 x 70.5 x 8.6 mm",
      weight: "167 g",
      options: {
        colors: [],
        storages: [],
      },
    };

    const result = adapter.productAdapter(dto);

    expect(result.primaryCamera).toEqual(["200 MP", "50 MP", "10 MP"]);
    expect(result.secondaryCamera).toEqual(["32 MP"]);
  });

  it("converts single string camera to array", () => {
    const dto: ProductDTO = {
      id: "5",
      brand: "Xiaomi",
      imgUrl: "https://example.com/xiaomi.jpg",
      model: "14",
      price: "599",
      cpu: "Snapdragon 8 Gen 3",
      ram: "12GB",
      os: "Android 14",
      displayResolution: "1440 x 3200 pixels",
      battery: "5000 mAh",
      primaryCamera: "108 MP",
      secondaryCamera: "5 MP",
      dimensions: "160 x 72 x 8.2 mm",
      weight: "189 g",
      options: {
        colors: [],
        storages: [],
      },
    };

    const result = adapter.productAdapter(dto);

    expect(result.primaryCamera).toEqual(["108 MP"]);
    expect(result.secondaryCamera).toEqual(["5 MP"]);
  });

  it("handles missing camera fields by returning empty arrays", () => {
    const dto: ProductDTO = {
      id: "4",
      brand: "OnePlus",
      imgUrl: "https://example.com/oneplus.jpg",
      model: "11",
      price: "699",
      cpu: "Snapdragon 8 Gen 3",
      ram: "16GB",
      os: "Android 14",
      displayResolution: "1440 x 3200 pixels",
      primaryCamera: ["12 MP"],
      secondaryCamera: undefined,
      battery: "5000 mAh",
      dimensions: "163 x 74 x 8.5 mm",
      weight: "200 g",
      options: {
        colors: [],
        storages: [],
      },
    };

    const result = adapter.productAdapter(dto);

    expect(result.primaryCamera).toEqual(["12 MP"]);
    expect(result.secondaryCamera).toEqual([]);
  });
});
