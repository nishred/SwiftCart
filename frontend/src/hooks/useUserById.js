import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/user";
import { useSelector } from "react-redux";

function useUserById(id) {
  const token = useSelector((store) => store.user.token);
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      return await getUserById(id, token);
    },
  });

  return {data, isLoading, error};
}

export default useUserById;
