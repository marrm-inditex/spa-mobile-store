import { describe, it, expect, vi, beforeEach } from "vitest";
import { CartRepository } from "./cart.repository";
import type { CartItem } from "@/domain/cart/types";
import { httpClient } from "@/config/api/http";

vi.mock("@/config/api/http", () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

describe("CartRepository", () => {
  const postMock = vi.mocked(httpClient.post);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("posts cart item and adapts response", async () => {
    const adapter = {
      cartCountAdapter: vi.fn().mockReturnValue(3),
    } as unknown as typeof CartRepository.adapter;
    const repository = new CartRepository(adapter);

    const item: CartItem = { id: "1", colorCode: 2, storageCode: 3 };
    postMock.mockResolvedValue({ count: 3 });

    const result = await repository.addToCart(item);

    expect(postMock).toHaveBeenCalledWith(CartRepository.cartEndpoint, item);
    expect(adapter.cartCountAdapter).toHaveBeenCalledWith({ count: 3 });
    expect(result).toBe(3);
  });
});
