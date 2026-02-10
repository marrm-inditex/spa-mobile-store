import { useProductSearchState } from "@/domain/product/state";
import { useTranslation } from "react-i18next";

export default function ProductSearch() {
  const { t } = useTranslation();
  const { searchTerm, setSearchTerm } = useProductSearchState();

  return (
    <input
      type="text"
      placeholder={t("products.searchPlaceholder")}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 placeholder-stone-400 transition-all focus:border-stone-500 focus:ring-1 focus:ring-stone-200 focus:outline-none sm:w-64"
    />
  );
}
