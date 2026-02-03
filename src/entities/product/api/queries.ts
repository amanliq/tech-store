import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "./productApi";
import type { CategoryOption } from "../model/constants";

export const productKeys = {
  all: ["products"] as const,

  list: (category?: string) => [productKeys.all, { category }] as const,

  detail: (id: string | number) => [...productKeys.all, "detail", id] as const,
};

export const useProductsQuery = (category?: CategoryOption) => {
  return useQuery({
    queryKey: productKeys.list(category),
    queryFn: () => fetchProducts(category),
    staleTime: 60 * 1000,
  });
};

export const useProductByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
