"use client";
import Image from "next/image";
import React, { SyntheticEvent, useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAppDispatch } from "@/store/store";
// import { logout } from "@/store/register";
import { useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import { headers } from "next/headers";
// import { }
// import { router } from "next/router";
// import "@/app/global.css";
const Menu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Inprogress",
    priority: "",
    deadline: "",
    addedProperties: "",
  });

  const [open, setOpen] = useState(false);

  //   useEffect(() => {
  //     // Check if the cookie exists
  //     const token = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("token="));
  //     console.log("🚀 ~ useEffect ~ token:", token);

  //   }, [router]); // Dependency on router
  const handleCreate = async (e: any) => {
    console.log("🚀 ~ handleCreate ~ e:", formData);
    e.preventDefault();
    // console.log("🚀 ~ handleCreate ~ formData:", formData);
    // const formData = new FormData(e.currentTarget); // Assuming formData is being created from the form
    // console.log("🚀 ~ handleCreate ~ formData:", formData);

    await fetch("http://localhost:5001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // withCredentials: true,
      // @ts-ignore
      body: JSON.stringify({ ...formData }),
      credentials: "include",
    });
  };

  const handleFormChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-64 mr-auto ml-2 h-screen flex flex-col justify-between shadow-sm border-r-2 pr-3">
      <div>
        <div className="flex mx-2 my-3">
          <Image
            className="rounded-full mr-2"
            src="/next.svg"
            alt="user-image"
            width={50}
            height={50}
          />
          <span className="text-md">{"username"}</span>
        </div>
        <>
          <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
            {
              <>
                <form onSubmit={handleCreate}>
                  <input
                    onChange={handleFormChange}
                    placeholder="Title"
                    name="title"
                  ></input>
                  <select name="status" onChange={handleFormChange}>
                    <option value={"inprogress"}>In Progress</option>
                    <option value={"underreview"}>Under Review</option>
                    <option value={"todo"}>To Do</option>
                    <option value={"finished"}>Finished</option>
                  </select>
                  <select name="priority" onChange={handleFormChange}>
                    <option>low</option>
                    <option>high</option>
                  </select>
                  <label htmlFor="deadline">Deadline:</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    onChange={handleFormChange}
                  ></input>
                  <Button type="submit">Create</Button>
                </form>
              </>
            }
          </Drawer>
        </>
        <div className="flex space-between my-3">
          <div className="flex flex-grow">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <LightModeIcon />
            </IconButton>
            <IconButton>
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </div>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="my-3">
          <Button
            className="menuButtons"
            variant="outlined"
            startIcon={<HomeOutlinedIcon />}
          >
            Home
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            startIcon={<DashboardOutlinedIcon />}
          >
            Boards
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            startIcon={<SettingsOutlinedIcon />}
          >
            Settings
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            startIcon={<PeopleAltOutlinedIcon />}
          >
            Teams
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            startIcon={<InsertChartOutlinedTwoToneIcon />}
          >
            Analytics
          </Button>
          <Button
            sx={{
              border: 0,
              backgroundColor: "#4235A6",
              color: "#F4F4F4",
              borderRadius: "4px",
            }}
            variant="outlined"
            endIcon={<AddCircleOutlinedIcon />}
            onClick={() => setOpen(true)}
          >
            Create new task
          </Button>
        </div>
      </div>
      <div className="m-2">
        <Button
          startIcon={<ArrowDownwardIcon />}
          sx={{
            fontSize: "10px",
            justifyContent: "flex-start",
            display: "flex",
            textAlign: "left",
            backgroundColor: "#F3F3F3",
            color: "#666666",
          }}
        >
          Download the app <br />
          get the full experience
        </Button>
      </div>
    </div>
  );
};

export default Menu;
