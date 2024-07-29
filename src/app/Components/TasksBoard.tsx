"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Task } from "@mui/icons-material";
import React from "react";

const TasksBoard = () => {
  const handleOnDragEnd = (e: any) => {
    console.log(e, "hrllo");
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex">
        <div className="p-3">
          <div>To Do</div>
          <Droppable droppableId="list">
            {/* {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {[{ id: "ihsucidvi" }, { id: "ihsuvi" }].map(
            (val) => 
            {

            <Draggable draggableId={quote.id} index={index}>
            {provided => (
            <Task  ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps} key={val.id} />
            )}
              </Draggable>
          ))}}
          
        </div>
)} */}

            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {[{ id: "ihsucidvi" }, { id: "ihsuvi" }].map((val, idx) => (
                  <Draggable draggableId={val.id} index={idx} key={val.id}>
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
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="p-3">
          <div>In Progress</div>
          <div>
            {[{ id: "ihsucidvi" }].map((val) => (
              <Task key={val.id} />
            ))}
          </div>
        </div>
        <div className="p-3">
          <div>Under Review</div>
          <div>
            {[{ id: "ihsucidvi" }].map((val) => (
              <Task key={val.id} />
            ))}
          </div>
        </div>
        <div className="p-3">
          <div>Finished</div>
          <div>
            {[{ id: "ihsucidvi" }].map((val) => (
              <Task key={val.id} />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TasksBoard;
