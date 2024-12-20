import { useQuery } from "@tanstack/react-query";
import { getOrdersByUser } from "../api/order";
import { useSelector } from "react-redux";

function useOrders() {
  const token = useSelector((store) => store.user.token);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrdersByUser(token);
    },
  });

  return { orders, isLoading, error };
}

export default useOrders;
