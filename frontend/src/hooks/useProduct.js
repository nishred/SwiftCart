import { fetchProduct } from "../api/products";

import { useQuery } from "@tanstack/react-query";

export function useProduct(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return await fetchProduct(id);
    },
  });

  return { product: data, isLoading, error };
}
