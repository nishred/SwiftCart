import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payOrder } from "../api/order";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function usePayOrder(orderId) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate, data, error, isLoading, isError } = useMutation({
    mutationFn: async ({ orderId, token, paymentDetails }) => {
      return await payOrder(orderId, token, paymentDetails);
    },

    onSuccess: (data) => {
      toast("Paid successfully");

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("order"),
      });

      navigate(`/order/${orderId}`);
    },
  });

  return { mutate, isLoading, isError, error, data };
}

export default usePayOrder;
