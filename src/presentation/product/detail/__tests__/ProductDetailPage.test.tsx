import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDetailPage from "../ProductDetailPage";
import { useGetProductDetail } from "@/services/product/services";
import type { Product } from "@/domain/product/types";
import { AppWrapper } from "@/config/test/utils";
import { useNavigate, useParams } from "react-router-dom";
import type { UseQueryResult } from "@tanstack/react-query";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock("@/services/product/services", () => ({
  useGetProductDetail: vi.fn(),
}));

const mockProduct: Product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 14 Pro",
  price: 1099,
  imgUrl: "https://example.com/iphone.jpg",
  cpu: "A16 Bionic",
  ram: "6GB",
  os: "iOS 16",
  displayResolution: "2556x1179",
  battery: "3200mAh",
  primaryCamera: ["48MP", "12MP", "12MP"],
  secondaryCamera: ["12MP"],
  dimensions: "147.5 x 71.5 x 7.85 mm",
  weight: "206g",
  options: {
    colors: [
      { code: 1, name: "Space Black" },
      { code: 2, name: "Silver" },
    ],
    storages: [
      { code: 1, name: "128GB" },
      { code: 2, name: "256GB" },
    ],
  },
};

describe("ProductDetailPage", () => {
  const useGetProductDetailMock = vi.mocked(useGetProductDetail);
  const useParamsMock = vi.mocked(useParams);
  const useNavigateMock = vi.mocked(useNavigate);

  beforeEach(() => {
    vi.clearAllMocks();
    useParamsMock.mockReturnValue({ id: "123" });
    useNavigateMock.mockReturnValue(vi.fn());
  });

  it("calls useGetProductDetail with correct product ID", () => {
    useGetProductDetailMock.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    } as UseQueryResult<Product, Error>);

    render(
      <AppWrapper>
        <ProductDetailPage />
      </AppWrapper>,
    );
    expect(useGetProductDetailMock).toHaveBeenCalledWith("123");
  });

  it("navigates to product list when non product ID is provided", () => {
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    useParamsMock.mockReturnValue({ id: undefined });
    render(
      <AppWrapper>
        <ProductDetailPage />
      </AppWrapper>,
    );
    expect(navigateMock).toHaveBeenCalledWith("/products");
  });

  it("renders back to products link with correct navigation", () => {
    useGetProductDetailMock.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    } as UseQueryResult<Product, Error>);

    render(
      <AppWrapper>
        <ProductDetailPage />
      </AppWrapper>,
    );

    const backLink = screen.getByTestId("back-link");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/products");
  });

  it("renders loading state while fetching product details", () => {
    useGetProductDetailMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as UseQueryResult<Product, Error>);

    render(
      <AppWrapper>
        <ProductDetailPage />
      </AppWrapper>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders NotFound when product is not found", () => {
    useGetProductDetailMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as UseQueryResult<Product, Error>);

    render(
      <AppWrapper>
        <ProductDetailPage />
      </AppWrapper>,
    );
    expect(screen.getByTestId("not-found-message")).toBeInTheDocument();
  });

  it("renders NotFound when error occurs", () => {
    useGetProductDetailMock.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Server error"),
    } as unknown as UseQueryResult<Product, Error>);

    render(
      <AppWrapper>
        <ProductDetailPage />
      </AppWrapper>,
    );
    expect(screen.getByTestId("not-found-message")).toBeInTheDocument();
  });
});
