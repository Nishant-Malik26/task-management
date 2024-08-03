"use client";
import { Draggable } from "@hello-pangea/dnd";
import React from "react";

const Task = ({
  _id: id,
  // index,
  title,
  status,
  priority,
  deadline,
  date,
  addedProperties,
  _id,
}: any) => {
  return (
    <div className="bg-[#F8F9FA] border-2	border-black-50	mt-2 p-3">
      <div>{title || ""}</div>
      <div>{status || ""}</div>
      <div>{priority || ""}</div>
      <div>{date || ""}</div>
      <div>{deadline || ""}</div>
    </div>
  );
};

export default Task;
