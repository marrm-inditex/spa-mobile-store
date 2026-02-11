import { describe, it, expect } from "vitest";
import { CartAdapter } from "./cart.adapter";

describe("CartAdapter", () => {
  it("maps response count to number", () => {
    const adapter = new CartAdapter();
    const result = adapter.cartCountAdapter({ count: 5 });
    expect(result).toBe(5);
  });
});
