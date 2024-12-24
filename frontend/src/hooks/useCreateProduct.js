import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/products";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function useCreateProduct() {
  const token = useSelector((store) => store.user.token);

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data) => {
      return await createProduct(data, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });

      toast.success("Product created successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading, error };
}

export default useCreateProduct;
