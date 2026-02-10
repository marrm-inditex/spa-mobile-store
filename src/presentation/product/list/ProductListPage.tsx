import { useTranslation } from "react-i18next";
import ProductSearch from "./ProductSearch";
import Loading from "@/presentation/shared/components/Loading";
import { useProductSearch } from "@/hooks/product/useProductSearch";
import ProductCard from "./ProductCard";

export default function ProductListPage() {
  const { t } = useTranslation();
  const { products, isLoading } = useProductSearch();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl uppercase">{t("products.title")}</h1>
        <ProductSearch />
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center py-12">
          <p className="text-stone-500">{t("products.noResults")}</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
