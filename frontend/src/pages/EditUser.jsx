import { useParams } from "react-router-dom";
import useUserById from "../hooks/useUserById";
import { FormError } from "./Register";
import { useEffect, useState } from "react";
import { use } from "react";
import useUpdateUser from "../hooks/useUpdateUser";

const EditUser = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading: isLoadingUserProfile,
    error: getUserError,
  } = useUserById(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    mutate,
    isLoading: isLoadingUpdateProfile,
    error: updateUserError,
  } = useUpdateUser(id);

  const error = updateUserError || getUserError;

  const isLoading = isLoadingUpdateProfile || isLoadingUserProfile;

  function handleSubmit(e) {
    e.preventDefault();

    mutate({
      id,
      data: {
        name,
        email,
      },
    });
  }

  useEffect(() => {
    if (!isLoading) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-slate-700 max-w-[500px] mx-auto"
    >
      <h1 className="text-4xl uppercase font-semibold">Edit user</h1>

      {error && <FormError>{error}</FormError>}

      <div className="flex flex-col gap-2">
        <label>Name</label>
        <input
          value={name}
          type="text"
          className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
        />
      </div>

      <button className="px-4 py-2 bg-slate-700 text-slate-200 text-xl uppercase">
        Update
      </button>
    </form>
  );
};

export default EditUser;
