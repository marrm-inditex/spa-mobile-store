import { useQuery } from "@tanstack/react-query";
import { ProductDI } from "./di";

const repository = ProductDI.repository;
const cacheKey = ProductDI.cacheKey;

export const useGetProducts = () => {
  return useQuery({
    queryKey: [cacheKey],
    queryFn: () => repository.getProducts(),
  });
};

export const useGetProductDetail = (id: string) => {
  return useQuery({
    queryKey: [cacheKey, id],
    queryFn: () => repository.getProduct(id),
    enabled: !!id,
  });
};
