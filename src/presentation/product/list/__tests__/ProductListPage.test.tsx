import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductListPage from "../ProductListPage";
import { useProductSearch } from "@/hooks/product/useProductSearch";
import { AppWrapper } from "@/config/test/utils";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("@/hooks/product/useProductSearch", () => ({
  useProductSearch: vi.fn(),
}));

describe("ProductListPage", () => {
  const useProductSearchMock = vi.mocked(useProductSearch);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    useProductSearchMock.mockReturnValue({ products: [], isLoading: true });

    render(
      <AppWrapper>
        <ProductListPage />
      </AppWrapper>,
    );

    expect(screen.getByText("common.loading")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    useProductSearchMock.mockReturnValue({ products: [], isLoading: false });

    render(
      <AppWrapper>
        <ProductListPage />
      </AppWrapper>,
    );

    expect(screen.getByText("products.noResults")).toBeInTheDocument();
  });

  it("renders product cards", () => {
    useProductSearchMock.mockReturnValue({
      products: [
        {
          id: "1",
          model: "iPhone",
          brand: "Apple",
          price: 999,
          imgUrl: "https://example.com/iphone.jpg",
        },
        {
          id: "2",
          model: "Pixel",
          brand: "Google",
          price: 799,
          imgUrl: "https://example.com/pixel.jpg",
        },
      ],
      isLoading: false,
    });

    render(
      <AppWrapper>
        <ProductListPage />
      </AppWrapper>,
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("Pixel")).toBeInTheDocument();
  });
});
