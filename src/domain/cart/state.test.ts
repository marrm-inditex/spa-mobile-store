import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("zustand/middleware", () => ({
  persist: (config: unknown) => config,
}));

import { useCartState } from "./state";

describe("useCartState", () => {
  beforeEach(() => {
    useCartState.setState({ itemsCount: 0 });
  });

  it("starts with zero items", () => {
    const itemsCount = useCartState.getState().itemsCount;
    expect(itemsCount).toBe(0);
  });

  it("adds items to the count", () => {
    useCartState.getState().addItems(2);
    expect(useCartState.getState().itemsCount).toBe(2);
  });

  it("accumulates items across calls", () => {
    useCartState.getState().addItems(1);
    useCartState.getState().addItems(3);
    expect(useCartState.getState().itemsCount).toBe(4);
  });
});
