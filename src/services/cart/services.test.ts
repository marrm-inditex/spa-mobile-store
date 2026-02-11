import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useMutationAddToCart } from "./services";
import type { CartItem } from "@/domain/cart/types";
import { AppWrapper } from "@/config/test/utils";

const mocks = vi.hoisted(() => ({
  addToCart: vi.fn(),
  addItems: vi.fn(),
}));

vi.mock("./di", () => ({
  CartDI: {
    repository: {
      addToCart: mocks.addToCart,
    },
    cacheKey: "CART",
  },
}));

vi.mock("@/domain/cart/state", () => ({
  useCartState: (selector: (state: { addItems: (count: number) => void }) => unknown) =>
    selector({ addItems: mocks.addItems }),
}));

describe("useMutationAddToCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls repository.addToCart from mutateAsync", async () => {
    const item: CartItem = { id: "1", colorCode: 2, storageCode: 3 };
    mocks.addToCart.mockResolvedValue(2);

    const { result } = renderHook(() => useMutationAddToCart(), {
      wrapper: AppWrapper,
    });

    await act(async () => {
      await result.current.mutateAsync(item);
    });

    expect(mocks.addToCart).toHaveBeenCalledWith(item);
  });

  it("adds items to store on success", async () => {
    const item: CartItem = { id: "1", colorCode: 2, storageCode: 3 };
    mocks.addToCart.mockResolvedValue(5);

    const { result } = renderHook(() => useMutationAddToCart(), {
      wrapper: AppWrapper,
    });

    await act(async () => {
      await result.current.mutateAsync(item);
    });

    await waitFor(() => {
      expect(mocks.addItems).toHaveBeenCalledWith(5);
    });
  });
});
