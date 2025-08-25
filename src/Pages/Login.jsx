import React, { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().nonempty('Email required').email('Email invalid'),
    password: z.string().nonempty('Password required')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema)
  });

  const {setToken} = useContext(AuthContext)

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );
      console.log(response);
      localStorage.setItem("token",response.token)
      setToken(response.token)
      setSuccess(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 mx-auto mt-5">
      {success && (
        <Alert color="success" onDismiss={() => setSuccess(false)}>
          <span className="font-medium">Success!</span> Login completed.
        </Alert>
      )}

      {apiError && (
        <Alert color="failure" icon={HiInformationCircle}>
          {apiError}
        </Alert>
      )}

      <div>
        <Label htmlFor="email">Your email</Label>
        <TextInput id="email" type="email" placeholder="name@example.com" shadow {...register("email")} />
        {errors.email && <Alert color="failure" icon={HiInformationCircle}>{errors.email.message}</Alert>}
      </div>

      <div>
        <Label htmlFor="password">Your password</Label>
        <TextInput id="password" type="password" shadow {...register("password")} />
        {errors.password && <Alert color="failure" icon={HiInformationCircle}>{errors.password.message}</Alert>}
      </div>

      <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
    </form>
  );
}
