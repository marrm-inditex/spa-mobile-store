import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductRoutes } from "../routes";
import Loading from "@/presentation/shared/components/Loading";
import { useGetProductDetail } from "@/services/product/services";
import ProductData from "./ProductData";
import ProductActions from "./ProductActions";
import NotFound from "@/presentation/shared/components/NotFound";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data: product, isLoading, error } = useGetProductDetail(id!);
  const navigate = useNavigate();

  if (!id) {
    navigate(ProductRoutes.list);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error || !product) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-8" data-testid="product-detail-page">
      <Link
        to={ProductRoutes.list}
        className="text-stone-600 hover:underline"
        data-testid="back-link"
      >
        ← {t("common.backToProducts")}
      </Link>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square h-3/5 w-full max-w-sm overflow-hidden rounded-lg">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6">
          <ProductData product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
