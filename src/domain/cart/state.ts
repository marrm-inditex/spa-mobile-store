import { create } from "zustand";
import { persist } from "zustand/middleware";

export const KEY_CART = "CART";

type CartState = {
  itemsCount: number;
  addItems: (count: number) => void;
};

export const useCartState = create<CartState>()(
  persist(
    (set) => ({
      itemsCount: 0,
      addItems: (count: number) =>
        set((state) => ({ itemsCount: state.itemsCount + count })),
    }),
    {
      name: "cart-storage",
    },
  ),
);
