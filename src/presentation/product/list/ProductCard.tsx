import { useNavigate } from "react-router-dom";
import { ProductRoutes } from "../routes";
import type { ProductSummary } from "@/domain/product/types";
import ImageLoader from "@/presentation/shared/components/ImageLoader";

type ProductCardProps = {
  product: ProductSummary;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(ProductRoutes.detail(product.id))}
      className="group cursor-pointer rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:ring-1 hover:ring-stone-500"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden rounded-t-lg p-4">
        <ImageLoader
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          containerClassName="relative h-64 w-full overflow-hidden"
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
          {product.brand}
        </p>
        <h2 className="mb-2 line-clamp-2 text-sm font-semibold">{product.model}</h2>
        <div className="flex items-center justify-end">
          <span className="text-lg font-bold text-stone-600">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
