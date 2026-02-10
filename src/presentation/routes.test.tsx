import { describe, it, expect } from "vitest";
import { appRoutes } from "./routes";

describe("appRoutes", () => {
  it("should create routes with proper structure", () => {
    expect(appRoutes).toBeDefined();
    expect(Array.isArray(appRoutes)).toBe(true);
    expect(appRoutes.length).toBeGreaterThan(0);
  });
});
