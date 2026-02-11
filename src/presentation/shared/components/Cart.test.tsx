import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Cart from "./Cart";
import { useCartState } from "@/domain/cart/state";

vi.mock("zustand/middleware", () => ({
  persist: (config: unknown) => config,
}));

describe("Cart", () => {
  it("renders cart icon and count badge", () => {
    useCartState.setState({ itemsCount: 3 });

    render(<Cart />);

    const icon = screen.getByRole("img", { name: "Cart" });
    expect(icon).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByLabelText("Cart items: 3")).toBeInTheDocument();
  });
});
