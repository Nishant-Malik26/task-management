"use client";
import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { redirect } from "next/navigation";
import { register } from "@/store/register";

const Signup = () => {
  //   const authState = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //   console.log("🚀 ~ Signup ~ authState:", authState);
  const dispatch = useAppDispatch();
  const handleSignup = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(register(formData));

    // axios({
    //   method: "POST",
    //   url: "http://localhost:5001/api/users",
    //   data: formData,
    // });
  };

  const handleOnChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          onChange={handleOnChange}
          value={formData?.name}
          name="name"
          placeholder="name"
        ></input>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
