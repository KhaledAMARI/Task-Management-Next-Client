"use client";
import React, { FC } from "react";
import { BoardColumnProps } from "./interface";
import Card from "../Card";

const BoardColumn: FC<BoardColumnProps> = ({ title, data }) => {
  return (
    <div className="sm:w-full sm:pt-3 lg:w-1/3 bg-gray-200 lg:p-4 rounded-md min-h-dvh">
      <h2 className="mb-4 bg-[#BBE9FF]">{title}</h2>
      <div className="w-full gap-5 flex-col h-full justify-center items-center">
        {data &&
          data.map((cardDetails: any) => (
            <Card key={cardDetails.id} {...cardDetails} />
          ))}
      </div>
    </div>
  );
};

export default BoardColumn;
