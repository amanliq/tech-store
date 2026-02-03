import type { Product } from "../model/types";
import { TECH_CATEGORIES } from "../model/constants";
import { apiClient } from "@/shared/api/apiClient";

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  const BY_CATEGORY =
    category && category != "all" ? [category] : TECH_CATEGORIES;
  const requests = BY_CATEGORY.map((cat) =>
    apiClient.get(`/products/category/${cat}`),
  );

  const results = await Promise.all(requests);
  return results.flatMap((res) => res.data.products);
};

export const fetchProductById = async (
  id: string | number,
): Promise<Product | undefined> => {
  return apiClient.get(`/products/${id}`).then((res) => res.data);
};
