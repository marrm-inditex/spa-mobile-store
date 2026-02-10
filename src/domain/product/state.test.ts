import { describe, it, expect, beforeEach } from "vitest";
import { useProductSearchState } from "./state";

describe("Product search state", () => {
  beforeEach(() => {
    useProductSearchState.setState({ searchTerm: "" });
  });

  it("should initialize with empty search term", () => {
    expect(useProductSearchState.getState().searchTerm).toBe("");
  });

  it("should update search term", () => {
    const { setSearchTerm } = useProductSearchState.getState();
    setSearchTerm("iphone");
    expect(useProductSearchState.getState().searchTerm).toBe("iphone");
  });
});
