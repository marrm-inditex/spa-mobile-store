import { describe, it, expect } from "vitest";
import { ProductRoutes } from "./routes";

describe("ProductRoutes", () => {
  it("should have the correct list path", () => {
    expect(ProductRoutes.list).toBe("/products");
  });

  it("should generate correct detail path", () => {
    expect(ProductRoutes.detail("123")).toBe("/products/123");
    expect(ProductRoutes.detail("abc")).toBe("/products/abc");
  });

  it("should return a valid Route structure from init", () => {
    const routes = ProductRoutes.init();
    expect(routes).toBeDefined();
    expect(routes.type).toBeDefined();
  });
});
