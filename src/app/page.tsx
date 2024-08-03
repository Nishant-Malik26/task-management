import { HelpCenterOutlined } from "@mui/icons-material";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Button from "@mui/material/Button";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Task from "./Components/Task";
import TasksBoard from "./Components/TasksBoard";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";
import axios from "axios";
const jwt = require("jsonwebtoken");

import { redirect } from "next/navigation";

type User = {
  name: string;
  id: string;
};

export default async function Home() {
  // console.log(cookies().get("token")?.value);
  // "use server";
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;
  console.log("🚀 ~ Home ~ token:", token);
  if (!token) {
    redirect("/login");
  }
  let user = null;
  const config = {
    withCredentials: true,
    headers: {
      Cookie: `token=${token}`,
    },
  };
  try {
    // console.log(config);
    user = await axios.get("http://localhost:5001/api/auth", config);

    // console.log("🚀 ~ Home ~ user:", user);
    // console.log("🚀 ~ Home ~ user:", user.data);
  } catch (error) {
    console.log(error);
  }

  // const user: User = await res.json();
  // console.log("🚀 ~ Home ~ user:", user);

  // const jk = await getSessionData()
  // console.log(await getSessionData);

  // const user = await getSessionData();
  return (
    <div className="flex-grow w-full text-black bg-[#F7F7F7] pl-4 pr-7">
      <div className="flex justify-between mt-5">
        <span className="text-4xl font-medium">
          Good Morning, {user && user?.data?.user?.name} !
        </span>
        <span className="content-center">
          Help and Feedback
          <HelpCenterOutlined />
        </span>
      </div>
      <div className="flex gap-x-3 font-10 mt-4">
        <div className="p-4 rounded-sm bg-white flex w-1/3">
          <div>
            <Image alt="img1" src="/next.svg" height={30} width={30} />
          </div>
          <div>
            <div className="text-md font-medium text-[#8C8C8C]">
              Introducing Tags
            </div>
            <div className="text-xs text-[#868686]">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </div>
          </div>
        </div>
        <div className="p-4 rounded-sm bg-white flex w-1/3">
          <div>
            <Image alt="img1" src="/next.svg" height={30} width={30} />
          </div>
          <div>
            <div className="text-md font-medium text-[#8C8C8C]">
              Share Notes Instantly
            </div>
            <div className="text-xs text-[#868686]">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </div>
          </div>
        </div>
        <div className="p-4 rounded-sm bg-white flex w-1/3">
          <div>
            <Image alt="img1" src="/next.svg" height={30} width={30} />
          </div>
          <div>
            <div className="text-md font-medium text-[#8C8C8C]">
              Access Anywhere
            </div>
            <div className="text-xs text-[#868686]">
              Sync your notes across all devices. Stay productive whether
              you&apos;re on your phone, tablet, or computer.
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 justify-between">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="searchi">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className="flex gap-x-3 text-sm">
          <Button
            className="menuButtons"
            variant="outlined"
            endIcon={<CalendarTodayOutlinedIcon />}
            sx={{ fontSize: "0.6rem" }}
          >
            Calendar view
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            endIcon={<AutoAwesomeOutlinedIcon />}
            sx={{ fontSize: "0.6rem" }}
          >
            Automation
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            endIcon={<FilterAltOutlinedIcon />}
            sx={{ fontSize: "0.6rem" }}
          >
            Filter
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            endIcon={<ShareOutlinedIcon />}
            sx={{ fontSize: "0.6rem" }}
          >
            Share
          </Button>
          <Button
            className="menuButtons"
            variant="outlined"
            endIcon={<AddCircleOutlinedIcon />}
            sx={{ fontSize: "0.7rem" }}
          >
            Create New
          </Button>
        </div>
      </div>
      <TasksBoard />
    </div>
  );
}
