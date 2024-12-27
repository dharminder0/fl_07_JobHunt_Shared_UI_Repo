import React, {  } from "react";
import { CircularProgress } from "@mui/material";

export const CircularProgressWithLabel: React.FC<{ value: number }> = ({
  value,
}) => {
  return (
    <div className="relative inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        className="!text-indigo-500 !h-[60px] !w-[60px]" // Tailwind for progress color
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-700 font-bold text-base">{`${Math.round(
          value
        )}%`}</span>
      </div>
    </div>
  );
};
