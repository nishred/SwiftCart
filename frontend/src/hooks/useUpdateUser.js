import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updateUser } from "../api/user";
import toast from "react-hot-toast";

function useUpdateUser(id) {
  const token = useSelector((store) => store.user.token);

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ id, data }) => {
      return await updateUser(id, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "users",
      });

      toast.success(`user ${id} has been successfully updated`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading, error };
}

export default useUpdateUser;
