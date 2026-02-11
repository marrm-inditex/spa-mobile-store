import type { CartItem } from "@/domain/cart/types";
import { useMutation } from "@tanstack/react-query";
import { CartDI } from "./di";
import { useCartState } from "@/domain/cart/state";

const repository = CartDI.repository;

export function useMutationAddToCart() {
  const addItems = useCartState((state) => state.addItems);
  return useMutation({
    mutationFn: (item: CartItem) => repository.addToCart(item),
    onSuccess: (data) => addItems(data),
  });
}
