import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { createOrder } from "../api/order";

import toast from "react-hot-toast";

function useCreateOrder() {
  const token = useSelector((store) => store.user.token);

  const mutation = useMutation({
    mutationFn: async (orderDetails) => {
      return await createOrder(orderDetails, token);
    },
    onSuccess: () => {
      toast.success("Order created successfully");
    },
  });

  return mutation;
}

export { useCreateOrder };
