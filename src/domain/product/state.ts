import { create } from "zustand";

export const KEY_PRODUCT = "PRODUCT";

type ProductSearchState = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useProductSearchState = create<ProductSearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
