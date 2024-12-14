import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../api/user";
import { addUser } from "../slices/userSlice";

import styled from "styled-components";

const FormError = styled.div`
  color: red;
`;

const UpdateProfile = ({ setShowForm }) => {
  const user = useSelector((store) => store.user);

  const [name, setName] = useState(user.name);

  const [email, setEmail] = useState(user.email);

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={async (e) => {
        e.preventDefault();

        const updateObject = { name, email, password };

        if (!password) delete updateObject["password"];

        const response = await updateUser(user._id, updateObject, user.token);

        if (!response.success) {
          setError(response.error);
          return;
        }

        const { data } = response;

        dispatch(
          addUser({
            _id: data._id,
            name: data.name,
            email: data.email,
            token: data.token,
            isAdmin: data.isAdmin,
          })
        );

        setShowForm(false);
      }}
    >
      {error && <FormError>{error}</FormError>}
      <div className="flex flex-col">
        <label>Name</label>
        <input
          className="px-4 py-2 bg-slate-200 rounded-lg"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          className="px-4 py-2 bg-slate-200 rounded-lg"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          className="px-4 py-2 bg-slate-200 rounded-lg"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowForm(false);
          }}
          className="px-4 py-2 bg-slate-500 text-slate-200 rounded-lg"
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-slate-500 text-slate-200 rounded-lg"
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
