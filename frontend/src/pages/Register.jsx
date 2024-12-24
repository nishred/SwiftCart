import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slices/userSlice";

import styled from "styled-components";
import { useState } from "react";
import { createUser } from "../api/user";

export const FormError = styled.div`
  color: red;
  font-size: 1rem;
`;

const formSchema = z.object({
  name: z.string().nonempty("Please enter your full name"),
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password can't be empty"),
});

const Register = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { errors } = formState;

  async function submit(formData) {
    const response = await createUser(formData);

    if (response.success) {
      dispatch(
        addUser({
          ...response.data,
          isAuthenticated: true,
        })
      );

      navigate("/");
    } else setError(response.error ? response.error : "Something went wrong");
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-6 text-slate-700 max-w-[500px] mx-auto"
    >
      <h1 className="text-4xl uppercase font-semibold">Register</h1>

      {error && <FormError>{error}</FormError>}

      <div className="flex flex-col gap-2">
        <label>Full Name</label>
        <input
          type="text"
          {...register("name")}
          className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
        />

        {errors.name && <FormError>{errors.name.message}</FormError>}
      </div>

      <div className="flex flex-col gap-2">
        <label>Email Address</label>
        <input
          type="text"
          {...register("email")}
          className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
        />

        {errors.email && <FormError>{errors.email.message}</FormError>}
      </div>

      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="px-4 py-2  focus:outline-none focus:ring-2 bg-slate-100 ring-slate-500 transition-all"
        />

        {errors.password && <FormError>{errors.password.message}</FormError>}
      </div>

      <button className="px-4 py-2 bg-slate-700 text-slate-200 text-xl uppercase">
        Sign in
      </button>

      <span>
        Already a Customer?{" "}
        <Link to={"/signin"} className="hover:underline text-slate-900">
          Sign in
        </Link>
      </span>
    </form>
  );
};

export default Register;
