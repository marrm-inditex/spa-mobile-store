import type { ICartAdapter } from "@/domain/cart/cart.repository";
import type { AddToCartResponseDTO } from "./cart.dto";
import type { CartCount } from "@/domain/cart/types";

export class CartAdapter implements ICartAdapter {
  cartCountAdapter(dto: AddToCartResponseDTO): CartCount {
    return Number(dto.count);
  }
}
