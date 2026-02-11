import type { BaseCartRepository } from "@/domain/cart/cart.repository";
import { KEY_CART } from "@/domain/cart/state";
import { CartRepository } from "@/infrastructure/cart/cart.repository";

export const CartDI: { repository: BaseCartRepository; cacheKey: string } = {
  repository: new CartRepository(),
  cacheKey: KEY_CART,
};
