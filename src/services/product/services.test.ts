import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetProducts, useGetProductDetail } from "./services";
import { ProductDI } from "./di";
import type { ProductSummary, Product } from "@/domain/product/types";
import { AppWrapper } from "@/config/test/utils";

vi.mock("./di", () => ({
  ProductDI: {
    repository: {
      getProducts: vi.fn(),
      getProduct: vi.fn(),
    },
    cacheKey: "PRODUCT",
  },
}));

const mockProducts: ProductSummary[] = [
  {
    id: "1",
    brand: "Apple",
    model: "iPhone 13",
    price: 999,
    imgUrl: "https://example.com/iphone.jpg",
  },
  {
    id: "2",
    brand: "Samsung",
    model: "Galaxy S21",
    price: 899,
    imgUrl: "https://example.com/galaxy.jpg",
  },
];

const mockProduct: Product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 15",
  price: 1999,
  imgUrl: "https://example.com/iphone.jpg",
  cpu: "Apple A17 Pro",
  ram: "6GB",
  os: "iOS 17",
  displayResolution: "6.1 inches OLED",
  battery: "3349 mAh",
  primaryCamera: ["48MP", "f/1.6"],
  secondaryCamera: ["12MP", "f/2.2"],
  dimensions: "147.8 x 70.8 x 7.8mm",
  weight: "171g",
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

describe("useGetProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch products successfully", async () => {
    vi.mocked(ProductDI.repository.getProducts).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useGetProducts(), {
      wrapper: AppWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(ProductDI.repository.getProducts).toHaveBeenCalledTimes(1);
  });
});

describe("useGetProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch product detail successfully", async () => {
    vi.mocked(ProductDI.repository.getProduct).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useGetProductDetail("1"), {
      wrapper: AppWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProduct);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(ProductDI.repository.getProduct).toHaveBeenCalledWith("1");
  });

  it("should not fetch when id is empty", () => {
    vi.mocked(ProductDI.repository.getProduct).mockResolvedValue(mockProduct);

    renderHook(() => useGetProductDetail(""), {
      wrapper: AppWrapper,
    });

    expect(ProductDI.repository.getProduct).not.toHaveBeenCalled();
  });
});
