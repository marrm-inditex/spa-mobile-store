import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { httpClient } from "./http";

vi.mock("./env", () => ({
  API_CONFIG: {
    baseURL: "https://api.test.local",
  },
}));

const BASE_URL = "https://api.test.local";

const createJsonResponse = (body: unknown, init?: ResponseInit) => {
  return new Response(JSON.stringify(body), {
    status: init?.status ?? 200,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
};

describe("httpClient", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.resetAllMocks();
  });

  it("performs GET requests with correct URL and method", async () => {
    const mockData = [{ id: "1" }];
    vi.mocked(globalThis.fetch).mockResolvedValue(createJsonResponse(mockData));

    const result = await httpClient.get("/products");

    expect(result).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/products`,
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("performs POST requests with JSON body and headers", async () => {
    const payload = { name: "iPhone" };
    const response = { id: "123" };
    vi.mocked(globalThis.fetch).mockResolvedValue(createJsonResponse(response));

    const result = await httpClient.post("/products", payload);

    expect(result).toEqual(response);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/products`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("throws HttpError with status and body on error responses", async () => {
    const errorBody = { message: "Bad Request" };
    vi.mocked(globalThis.fetch).mockResolvedValue(
      createJsonResponse(errorBody, { status: 400 }),
    );

    await expect(httpClient.get("/products")).rejects.toMatchObject({
      status: 400,
      body: errorBody,
    });
  });

  it("preserves custom headers for POST requests", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue(createJsonResponse({ ok: true }));

    await httpClient.post(
      "/products",
      { name: "Pixel" },
      { headers: { "X-Test": "yes" } },
    );

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/products`,
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Test": "yes",
        }),
      }),
    );
  });
});
