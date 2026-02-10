import type { IProductAdapter } from "@/domain/product/product.repository";
import type { ProductSummary } from "@/domain/product/types";
import type { ProductSummaryDTO } from "./product.dto";

export class ProductAdapter implements IProductAdapter {
  productSummaryAdapter(dto: ProductSummaryDTO): ProductSummary {
    const { id, brand, imgUrl, model, price } = dto as ProductSummaryDTO;
    return {
      id,
      brand,
      imgUrl,
      model,
      price: Number(price),
    };
  }
}
