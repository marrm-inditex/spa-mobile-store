import { useTranslation } from "react-i18next";
import type { Product } from "@/domain/product/types";
import { useState } from "react";
import { useMutationAddToCart } from "@/services/cart/services";

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { t } = useTranslation();
  const mutation = useMutationAddToCart();

  const [selectedColor, setSelectedColor] = useState<number | null>(
    product.options.colors.length == 1 ? product.options.colors[0].code : null,
  );
  const [selectedStorage, setSelectedStorage] = useState<number | null>(
    product.options.storages.length == 1 ? product.options.storages[0].code : null,
  );

  const onClick = () => {
    if (!selectedColor || !selectedStorage) return;

    mutation.mutateAsync({
      id: product.id,
      colorCode: selectedColor,
      storageCode: selectedStorage,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 border-t border-stone-300 pt-6 md:grid-cols-2">
        {product.options.colors && product.options.colors.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-semibold">
              {t("products.color")}
            </label>
            <select
              data-testid="color-select"
              value={selectedColor ?? ""}
              onChange={(e) => setSelectedColor(Number(e.target.value))}
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 transition-all focus:border-stone-500 focus:ring-1 focus:ring-stone-200 focus:outline-none"
            >
              <option value="">{t("products.selectColor")}</option>
              {product.options.colors.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {product.options.storages && product.options.storages.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-semibold">
              {t("products.storage")}
            </label>
            <select
              data-testid="storage-select"
              value={selectedStorage ?? ""}
              onChange={(e) => setSelectedStorage(Number(e.target.value))}
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 transition-all focus:border-stone-500 focus:ring-1 focus:ring-stone-200 focus:outline-none"
            >
              <option value="">{t("products.selectStorage")}</option>
              {product.options.storages.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <button
        data-testid="add-to-cart-button"
        className="mt-auto cursor-pointer rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-all hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none disabled:cursor-default disabled:bg-stone-300 disabled:text-stone-600 disabled:hover:bg-stone-300"
        onClick={onClick}
        disabled={!selectedColor || !selectedStorage || mutation.isPending}
      >
        {t("products.addToCart")}
      </button>
    </>
  );
}
