import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updateProduct } from "../api/products";
import toast from "react-hot-toast";

function useUpdateProduct() {
  const token = useSelector((store) => store.user.token);
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ id, data }) => {
      return await updateProduct(id, data, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });

      toast.success("Product has been updated successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading, error };
}

export default useUpdateProduct;
