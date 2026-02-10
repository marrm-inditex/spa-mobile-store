import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetProducts } from "./services";
import { ProductDI } from "./di";
import type { ProductSummary } from "@/domain/product/types";
import { AppWrapper } from "@/config/test/utils";

vi.mock("./di", () => ({
  ProductDI: {
    repository: {
      getProducts: vi.fn(),
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
