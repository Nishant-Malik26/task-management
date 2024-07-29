"use client";
import { Draggable } from "@hello-pangea/dnd";
import React from "react";

const Task = ({ id, index }: any) => {
  console.log("🚀 ~ Task ~ index:", index);
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <div>{"title"}</div>
            <div>{"description"}</div>
            <div>{"category"}</div>
            <div>{"date"}</div>
            <div>{"timestamp"}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
