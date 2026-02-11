import { useTranslation } from "react-i18next";
import type { Product } from "@/domain/product/types";

type ProductDataProps = {
  product: Product;
};

export default function ProductData({ product }: ProductDataProps) {
  const { t } = useTranslation();

  const specifications = [
    { label: t("products.cpu"), value: product.cpu },
    { label: t("products.ram"), value: product.ram },
    { label: t("products.os"), value: product.os },
    { label: t("products.dimensions"), value: product.dimensions },
    { label: t("products.weight"), value: product.weight },
    { label: t("products.display"), value: product.displayResolution },
    {
      label: t("products.primaryCamera"),
      value: product.primaryCamera.length ? product.primaryCamera.join(", ") : "-",
    },
    {
      label: t("products.secondaryCamera"),
      value: product.secondaryCamera.length ? product.secondaryCamera.join(", ") : "-",
    },
    { label: t("products.battery"), value: product.battery },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold tracking-widest text-stone-500 uppercase">
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold">{product.model}</h1>
        </div>
        <p className="text-3xl font-bold">${product.price.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 border-t border-stone-300 pt-6 md:grid-cols-2">
        {specifications.map((spec) => (
          <div key={spec.label}>
            <p className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
              {spec.label}
            </p>
            <p className="mt-2 text-sm font-medium">
              {spec.value?.trim() ? spec.value : "-"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
