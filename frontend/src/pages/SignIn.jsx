import { useForm } from "react-hook-form";
import { discriminatedUnion, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";

import { FormError } from "./Register";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password can't be empty"),
});

const SignIn = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { errors } = formState;

  async function submit(formData) {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (json.success) {
      const nextUser = { ...json.data, isAuthenticated: true };

      dispatch(addUser(nextUser));

      const redirect = searchParams.get("redirect");

      navigate(redirect ? `/${redirect}` : "/");
    } else {
      setError(json.error ? json.error : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-6 text-slate-700 max-w-[500px] mx-auto"
    >
      <h1 className="text-4xl uppercase font-semibold">Sign in</h1>

      {error && <FormError>{error}</FormError>}

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
        New Customer?{" "}
        <Link to={"/register"} className="hover:underline text-slate-900">
          Register
        </Link>
      </span>
    </form>
  );
};

export default SignIn;
