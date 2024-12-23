import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { deleteUser } from "../api/user";

import toast from "react-hot-toast";

function useDeleteUser(id, email) {
  const token = useSelector((store) => store.user.token);

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (id) => {
      return await deleteUser(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "users",
      });

      toast.success(`User ${email}(${id}) deleted successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {mutate,isLoading,error}
}

export default useDeleteUser;
