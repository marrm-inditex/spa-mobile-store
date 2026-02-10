import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

describe("ProductCard", () => {
  it("renders product information", () => {
    render(
      <ProductCard
        product={{
          id: "1",
          brand: "Apple",
          model: "iPhone 13",
          price: 1999,
          imgUrl: "https://example.com/iphone.jpg",
        }}
      />,
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByAltText("Apple iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("$1999")).toBeInTheDocument();
  });

  it("navigates to product detail on click", () => {
    render(
      <ProductCard
        product={{
          id: "99",
          brand: "Google",
          model: "Pixel",
          price: 999,
          imgUrl: "https://example.com/pixel.jpg",
        }}
      />,
    );

    fireEvent.click(screen.getByTestId("product-card-99"));

    expect(navigateMock).toHaveBeenCalledWith("/products/99");
  });
});
