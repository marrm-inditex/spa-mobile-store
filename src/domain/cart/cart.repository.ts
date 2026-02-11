import type { CartCount, CartItem } from "./types";

export interface ICartAdapter {
  cartCountAdapter(dto: unknown): CartCount;
}

export interface BaseCartRepository {
  addToCart(item: CartItem): Promise<CartCount>;
}
