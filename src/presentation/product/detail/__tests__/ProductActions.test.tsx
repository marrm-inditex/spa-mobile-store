import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductActions from "../ProductActions";
import type { Product } from "@/domain/product/types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockProduct: Product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 14",
  price: 999,
  imgUrl: "https://example.com/iphone.jpg",
  cpu: "A15 Bionic",
  ram: "6GB",
  os: "iOS 16",
  displayResolution: "2532x1170",
  battery: "3279mAh",
  primaryCamera: ["12MP", "12MP"],
  secondaryCamera: ["12MP"],
  dimensions: "146.7 x 71.5 x 7.8 mm",
  weight: "172g",
  options: {
    colors: [
      { code: 1, name: "Midnight" },
      { code: 2, name: "Starlight" },
      { code: 3, name: "Blue" },
    ],
    storages: [
      { code: 1, name: "128GB" },
      { code: 2, name: "256GB" },
      { code: 3, name: "512GB" },
    ],
  },
};

describe("ProductActions", () => {
  it("renders color and storage selectors", () => {
    render(<ProductActions product={mockProduct} />);

    expect(screen.getByTestId("color-select")).toBeInTheDocument();
    expect(screen.getByTestId("storage-select")).toBeInTheDocument();
  });

  it("renders all color options", () => {
    render(<ProductActions product={mockProduct} />);

    const colorSelect = screen.getByTestId("color-select");
    expect(colorSelect).toBeInTheDocument();

    mockProduct.options.colors.forEach((color) => {
      expect(screen.getByRole("option", { name: color.name })).toBeInTheDocument();
    });
  });

  it("renders all storage options", () => {
    render(<ProductActions product={mockProduct} />);

    const storageSelect = screen.getByTestId("storage-select");
    expect(storageSelect).toBeInTheDocument();

    mockProduct.options.storages.forEach((storage) => {
      expect(screen.getByRole("option", { name: storage.name })).toBeInTheDocument();
    });
  });

  it("allows user to select a color", async () => {
    const user = userEvent.setup();
    render(<ProductActions product={mockProduct} />);

    const colorSelect = screen.getByTestId("color-select");

    await user.selectOptions(colorSelect, "2");
    expect(colorSelect).toHaveValue("2");
  });

  it("allows user to select a storage option", async () => {
    const user = userEvent.setup();
    render(<ProductActions product={mockProduct} />);

    const storageSelect = screen.getByTestId("storage-select");

    await user.selectOptions(storageSelect, "3");
    expect(storageSelect).toHaveValue("3");
  });

  it("pre-selects color when only one option is available", () => {
    const productWithSingleColor: Product = {
      ...mockProduct,
      options: {
        ...mockProduct.options,
        colors: [{ code: 1, name: "Black" }],
      },
    };

    render(<ProductActions product={productWithSingleColor} />);

    const colorSelect = screen.getByTestId("color-select");
    expect(colorSelect).toHaveValue("1");
  });

  it("pre-selects storage when only one option is available", () => {
    const productWithSingleStorage: Product = {
      ...mockProduct,
      options: {
        ...mockProduct.options,
        storages: [{ code: 1, name: "64GB" }],
      },
    };

    render(<ProductActions product={productWithSingleStorage} />);

    const storageSelect = screen.getByTestId("storage-select");
    expect(storageSelect).toHaveValue("1");
  });
});
