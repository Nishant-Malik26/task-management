"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import Task from "./Task";

const TasksBoard = () => {
  const [tasks, setTasks] = useState<any>([]);

  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceIndex = source.index;
    const destIndex = destination.index;

    const sourceDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    if (sourceDroppableId === destDroppableId) {
      const newTasks = Array.from(tasks);
      const [movedTask] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(destIndex, 0, movedTask);
      setTasks(newTasks);
    } else {
      const sourceTasks = tasks.filter((task: any) => task.status === sourceDroppableId);
      const destTasks = tasks.filter((task: any) => task.status === destDroppableId);

      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      movedTask.status = destDroppableId;
      destTasks.splice(destIndex, 0, movedTask);

      const updatedTasks = [
        ...tasks.filter((task: any) => task.status !== sourceDroppableId && task.status !== destDroppableId),
        ...sourceTasks,
        ...destTasks
      ];
      
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/tasks", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task: any) => task.status === status);
  };

  const renderTasks = (status: string) => {
    return getTasksByStatus(status).map((task: any, index: number) => (
      <Draggable draggableId={task._id} index={index} key={task._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Task {...task} />
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex">
        <div className="p-3">
          <div>To Do</div>
          <Droppable droppableId="todo">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderTasks("todo")}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="p-3">
          <div>In Progress</div>
          <Droppable droppableId="inprogress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderTasks("inprogress")}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="p-3">
          <div>Under Review</div>
          <Droppable droppableId="underreview">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderTasks("underreview")}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="p-3">
          <div>Finished</div>
          <Droppable droppableId="finished">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderTasks("finished")}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TasksBoard;
