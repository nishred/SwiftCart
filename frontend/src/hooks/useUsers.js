import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import { useSelector } from "react-redux";

function useUsers() {
  const token = useSelector((store) => store.user.token);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      return await getUsers(token);
    },
  });

  return { users: data, isLoading, error };
}

export default useUsers;
