import React from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Radio,
  Datepicker,
} from "flowbite-react";
import { data, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Register() {
  const [apiError,setApiError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();


  const registerShceme = z.object({
    name: z.string().nonempty('Name required').min(3,'Min 3 letters'),
    email: z.string().nonempty('Email required').email('Email invalid'),
    password : z.string().nonempty('Passowrd required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{message :'Weak Passowrd'}),
    rePassword :z.string().nonempty("Repeat password"),
    dateOfBirth: z.coerce.string().nonempty("Enter birthdate"),
    gender: z.enum(["male", "female"], { message: "Select gender" })

  }).refine((data)=>data.password==data.rePassword,{
    path:['rePassword'],
    message:'Doesnt Match'
  })
  const { register, handleSubmit ,formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver:zodResolver(registerShceme)
  });
const onSubmit = async (data) => {
  setLoading(true)
  console.log(data);

  try {
    const { data: response } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      data
    );
    console.log( response);
    setSuccess(true);
    navigate("/login")
  } catch (error) {
    console.error( error);
    setApiError(error.response.data.error)
  }
  finally{
    setLoading(false)
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4 mx-auto mt-5"
      
    >
      {success && (
        <Alert
          color="success"
          onDismiss={() => setSuccess(false)}
        >
          <span className="font-medium">Success!</span> Registration completed.
        </Alert>
      )}
      <div>
        <div className="mb-2 block">
          
          <Label htmlFor="email">Your email</Label>
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          required
          shadow
          {...register("email")}
        />
        {errors.email&&<Alert color="failure" icon={HiInformationCircle}>
        {errors.email.message}
        </Alert>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your Name</Label>
        </div>
        <TextInput id="name" type="text" required shadow {...register("name")} />
        {errors.name&&<Alert color="failure" icon={HiInformationCircle}>
        {errors.name.message}
        </Alert>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput id="password" type="password" required shadow {...register("password")} />
        {errors.password&&<Alert color="failure" icon={HiInformationCircle}>
        {errors.password.message}
        </Alert>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword">Repeat password</Label>
        </div>
        <TextInput id="rePassword" type="password" required shadow {...register("rePassword")}/>
        {errors.rePassword&&<Alert color="failure" icon={HiInformationCircle}>
        {errors.rePassword.message}
        </Alert>}
      </div>
      <div className="flex max-w-md flex-col gap-4">
        <Label htmlFor="gender">Gender</Label>
        <div className="flex items-center gap-2">
          <Radio id="female" name="gender" value="female" {...register("gender")} />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="male" name="gender" value="male" {...register("gender")} />
          <Label htmlFor="male">Male</Label>
        {errors.gender&&<Alert color="failure" icon={HiInformationCircle}>
        {errors.gender.message}
        </Alert>}
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <Label htmlFor="date">Date of Birth</Label>
          <TextInput id="dateOfBirth" type="date" {...register("dateOfBirth")} />
        {errors.dateOfBirth&&<Alert color="failure" icon={HiInformationCircle}>
        {errors.dateOfBirth.message}
        </Alert>}
        </div>
      </div>

      <Button type="submit">{loading? <p>loading....</p>:'Register new account'}</Button>
    </form>
  );
}
