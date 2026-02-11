import type { BaseCartRepository } from "@/domain/cart/cart.repository";
import type { AddToCartRequestDTO, AddToCartResponseDTO } from "./cart.dto";
import type { CartCount, CartItem } from "@/domain/cart/types";
import { httpClient } from "@/config/api/http";
import { CartAdapter } from "./cart.adapter";

export class CartRepository implements BaseCartRepository {
  static readonly cartEndpoint = "/api/cart";

  static adapter: CartAdapter;

  constructor(adapter: CartAdapter = new CartAdapter()) {
    CartRepository.adapter = adapter;
  }

  async addToCart(item: CartItem): Promise<CartCount> {
    const result = await httpClient.post<AddToCartResponseDTO, AddToCartRequestDTO>(
      CartRepository.cartEndpoint,
      item,
    );
    return CartRepository.adapter.cartCountAdapter(result);
  }
}
