import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductSearch from "../ProductSearch";
import { useProductSearchState } from "@/domain/product/state";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("ProductSearch", () => {
  beforeEach(() => {
    useProductSearchState.setState({ searchTerm: "" });
  });

  it("renders with empty value initially", () => {
    render(<ProductSearch />);

    const input = screen.getByPlaceholderText("products.searchPlaceholder");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("renders with placeholder and value", () => {
    useProductSearchState.setState({ searchTerm: "iphone" });

    render(<ProductSearch />);

    const input = screen.getByPlaceholderText("products.searchPlaceholder");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("iphone");
  });

  it("updates store on input change", () => {
    render(<ProductSearch />);

    const input = screen.getByPlaceholderText("products.searchPlaceholder");
    fireEvent.change(input, { target: { value: "pixel" } });

    expect(useProductSearchState.getState().searchTerm).toBe("pixel");
  });
});
