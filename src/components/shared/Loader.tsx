import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loader({ subText1 = "", subtext2 = "" }) {
  return (
    <div className="flex flex-col items-center text-center justify-center h-[75vh]">
      <CircularProgress />
      <p className="text-base mt-4">{subText1}</p>
      <p className="text-base mt-2">{subtext2}</p>
    </div>
  );
}
