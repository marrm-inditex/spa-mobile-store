import type { IProductAdapter } from "@/domain/product/product.repository";
import type { ProductSummary, Product, ProductOption } from "@/domain/product/types";
import type { ProductSummaryDTO, ProductDTO, ProductOptionDTO } from "./product.dto";

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

  productAdapter(dto: ProductDTO): Product {
    return {
      id: dto.id,
      brand: dto.brand,
      imgUrl: dto.imgUrl,
      model: dto.model,
      price: Number(dto.price),
      cpu: dto.cpu,
      ram: dto.ram,
      os: dto.os,
      displayResolution: dto.displayResolution,
      battery: dto.battery,
      primaryCamera: this.normalizeArray(dto.primaryCamera),
      secondaryCamera: this.normalizeArray(dto.secondaryCmera ?? dto.secondaryCamera),
      dimensions: dto.dimensions,
      weight: dto.weight,
      options: {
        colors: dto.options.colors.map((opt) => this.productOptionAdapter(opt)),
        storages: dto.options.storages.map((opt) => this.productOptionAdapter(opt)),
      },
    };
  }

  private normalizeArray(value: string | string[] | undefined): string[] {
    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  }

  private productOptionAdapter(dto: ProductOptionDTO): ProductOption {
    return {
      code: dto.code,
      name: dto.name,
    };
  }
}
