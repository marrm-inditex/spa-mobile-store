import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProductSearch } from "./useProductSearch";
import { useProductSearchState } from "@/domain/product/state";
import type { ProductSummary } from "@/domain/product/types";
import { useGetProducts } from "@/services/product/services";

vi.mock("@/services/product/services", () => ({
  useGetProducts: vi.fn(),
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
  {
    id: "3",
    brand: "Xiaomi",
    model: "Redmi Note",
    price: 399,
    imgUrl: "https://example.com/redmi.jpg",
  },
];

describe("useProductSearch", () => {
  const useGetProductsMock = vi.mocked(useGetProducts);

  beforeEach(() => {
    vi.clearAllMocks();
    useProductSearchState.setState({ searchTerm: "" });
  });

  it("returns all products when search term is empty", () => {
    useGetProductsMock.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as ReturnType<typeof useGetProducts>);

    const { result } = renderHook(() => useProductSearch());

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.isLoading).toBe(false);
  });

  it("filters by brand or model case-insensitively", () => {
    useGetProductsMock.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as ReturnType<typeof useGetProducts>);

    useProductSearchState.setState({ searchTerm: "iphone" });

    const { result } = renderHook(() => useProductSearch());

    expect(result.current.products).toEqual([mockProducts[0]]);
  });

  it("normalizes accents when filtering", () => {
    const accentedProducts: ProductSummary[] = [
      {
        id: "4",
        brand: "Xiaomi",
        model: "Móvil Pro",
        price: 499,
        imgUrl: "https://example.com/movil.jpg",
      },
    ];

    useGetProductsMock.mockReturnValue({
      data: accentedProducts,
      isLoading: false,
    } as ReturnType<typeof useGetProducts>);

    useProductSearchState.setState({ searchTerm: "movil" });

    const { result } = renderHook(() => useProductSearch());

    expect(result.current.products).toEqual(accentedProducts);
  });

  it("returns empty array when there are no products", () => {
    useGetProductsMock.mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useGetProducts>);

    const { result } = renderHook(() => useProductSearch());

    expect(result.current.products).toEqual([]);
  });
});
