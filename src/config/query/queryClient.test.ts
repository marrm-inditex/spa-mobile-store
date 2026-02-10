import { describe, it, expect } from "vitest";
import { queryClient, QUERY_CACHE_TIME_MS } from "./queryClient";

describe("queryClient", () => {
  it("should configure default query options", () => {
    const defaults = queryClient.getDefaultOptions().queries;

    expect(defaults?.staleTime).toBe(QUERY_CACHE_TIME_MS);
    expect(defaults?.gcTime).toBe(QUERY_CACHE_TIME_MS);
    expect(defaults?.refetchOnWindowFocus).toBe(false);
  });
});
