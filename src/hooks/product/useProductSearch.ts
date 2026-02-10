import { useMemo } from "react";
import { useProductSearchState } from "@/domain/product/state";
import { useGetProducts } from "@/services/product/services";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const useProductSearch = () => {
  const searchTerm = useProductSearchState((state) => state.searchTerm);
  const { data, isLoading } = useGetProducts();

  const products = useMemo(() => {
    if (!data?.length || !searchTerm.trim()) return data ?? [];

    const normalized = normalize(searchTerm);
    return data.filter(
      (p) =>
        normalize(p.brand).includes(normalized) ||
        normalize(p.model).includes(normalized),
    );
  }, [data, searchTerm]);

  return {
    products,
    isLoading,
  };
};
