import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductData from "../ProductData";
import type { Product } from "@/domain/product/types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockProduct: Product = {
  id: "1",
  brand: "Samsung",
  model: "Galaxy S23 Ultra",
  price: 1199,
  imgUrl: "https://example.com/galaxy.jpg",
  cpu: "Snapdragon 8 Gen 2",
  ram: "12GB",
  os: "Android 13",
  displayResolution: "3088x1440",
  battery: "5000mAh",
  primaryCamera: ["200MP", "12MP", "10MP", "10MP"],
  secondaryCamera: ["12MP"],
  dimensions: "163.4 x 78.1 x 8.9 mm",
  weight: "234g",
  options: {
    colors: [{ code: 1, name: "Phantom Black" }],
    storages: [{ code: 1, name: "256GB" }],
  },
};

describe("ProductData", () => {
  it("renders all product specifications", () => {
    render(<ProductData product={mockProduct} />);
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.model)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toLocaleString()}`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.cpu)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.ram)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.os)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.displayResolution)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.battery)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.dimensions)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.weight)).toBeInTheDocument();
  });

  it("displays primary camera as comma-separated list", () => {
    render(<ProductData product={mockProduct} />);
    expect(screen.getByText(mockProduct.primaryCamera.join(", "))).toBeInTheDocument();
  });

  it("displays secondary camera as comma-separated list", () => {
    render(<ProductData product={mockProduct} />);
    expect(screen.getByText(mockProduct.secondaryCamera.join(", "))).toBeInTheDocument();
  });

  it("displays dash for missing camera specifications", () => {
    const productWithMissingCameras: Product = {
      ...mockProduct,
      primaryCamera: [],
      secondaryCamera: [],
    };

    render(<ProductData product={productWithMissingCameras} />);

    const dashElements = screen.getAllByText("-");
    expect(dashElements.length).toBeGreaterThanOrEqual(2);
  });

  it("displays dash for empty specification values", () => {
    const productWithEmptySpecs: Product = {
      ...mockProduct,
      cpu: "",
      ram: "  ",
      battery: "",
    };

    render(<ProductData product={productWithEmptySpecs} />);

    const dashElements = screen.getAllByText("-");
    expect(dashElements.length).toBeGreaterThanOrEqual(3);
  });
});
