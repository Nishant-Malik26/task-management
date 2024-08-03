"use client";
import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { redirect } from "next/navigation";
import { register } from "@/store/register";
import { LoginOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const Signup = () => {
  //   const authState = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 ">
      <form className="flex flex-col gap-2" onSubmit={handleSignup}>
        {/* <input name="email" placeholder="email"></input> */}
        <TextField
          id="outlined-basic"
          onChange={handleOnChange}
          value={formData?.name}
          label="Name"
          variant="outlined"
          name="name"
        />
        <TextField
          id="outlined-basic"
          onChange={handleOnChange}
          value={formData?.email}
          label="Email"
          variant="outlined"
          name="email"
        />

        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handleOnChange}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button startIcon={<LoginOutlined />} variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Signup;
