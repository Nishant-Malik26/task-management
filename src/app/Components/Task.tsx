"use client";
import React from "react";
import dayjs from "dayjs";
const Task = ({
  _id: id,
  title,
  status,
  priority,
  deadline,
  date,
  addedProperties,
}: any) => {
  return (
    <div className="bg-[#F8F9FA] border-2 rounded-xl	border-black-50	mt-2 p-3">
      <div className="text-black-700 font-semibold">{title || ""}</div>
      <div className="text-gray-700 font-thin">{status || ""}</div>
      {priority && (
        <div className="rounded-sm w-max border-2 border-solid border-red-600 bg-red-600 p-1 text-white">
          {priority}
        </div>
      )}
      <div>{dayjs(deadline)?.format("DD MMM YYYY")}</div>
      <div className="text-gray-500">{dayjs(date)?.format("DD MMM YYYY")}</div>
      {addedProperties.length > 0 &&
        addedProperties.map((prop: any) => (
          <span key={prop.id}>{prop.val}</span>
        ))}
    </div>
  );
};

export default Task;
