"use client";
import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { redirect, useRouter } from "next/navigation";
import { login } from "@/store/register";

const Login = () => {
  //   const authState = useAppSelector((state) => state.auth.authState);
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // console.log("🚀 ~ Login ~ isAuthenticated:", isAuthenticated);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //   console.log("🚀 ~ Signup ~ authState:", authState);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login(formData));
    router.push("/");
    // axios({
    //   method: "POST",
    //   url: "http://localhost:5001/api/users",
    //   data: formData,
    // });
  };

  const handleOnChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // if (isAuthenticated) {
  //   redirect("/");
  // }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          onChange={handleOnChange}
          value={formData?.email}
          name="email"
          placeholder="email"
        ></input>
        <input
          onChange={handleOnChange}
          value={formData?.password}
          name="password"
          placeholder="password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
