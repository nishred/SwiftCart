import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { deleteProduct } from "../api/products";

import toast from "react-hot-toast";

function useDeleteProduct() {
  const token = useSelector((store) => store.user.token);

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (id) => {
      return await deleteProduct(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });

      toast.success("Product deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading, error };
}

export default useDeleteProduct;
