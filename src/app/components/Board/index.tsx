"use client";
import React from "react";
import BoardColumn from "../BoardColumn";
import { useTaskStore } from "@/app/store";
import { useTaskStoreProps } from "@/app/store/interface";
import {
  DONE_LABEL,
  DONE_VALUE,
  INPROGRESS_LABEL,
  INPROGRESS_VALUE,
  PENDING_LABEL,
  PENDING_VALUE,
} from "@/app/constants";

const Board = () => {
  const tasks = useTaskStore((state: useTaskStoreProps) => state.tasks);
  const columns = [
    {
      title: PENDING_LABEL,
      cards: tasks?.data?.filter(
        (d: any) => d.status.toLowerCase() === PENDING_VALUE
      ),
    },
    {
      title: INPROGRESS_LABEL,
      cards: tasks?.data?.filter(
        (d: any) => d.status.toLowerCase() === INPROGRESS_VALUE
      ),
    },
    {
      title: DONE_LABEL,
      cards: tasks?.data?.filter(
        (d: any) => d.status.toLowerCase() === DONE_VALUE
      ),
    },
  ];

  return (
    <div className="lg:flex lg:space-x-4 p-4 w-full h-fit">
      {columns &&
        columns.map((col) => (
          <BoardColumn key={col.title} title={col.title} data={col.cards} />
        ))}
    </div>
  );
};

export default Board;
