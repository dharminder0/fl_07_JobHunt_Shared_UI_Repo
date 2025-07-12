import { CircularProgress } from "@mui/material";

export default function PageLoader() {
  return (
    <div className="flex h-[calc(100vh-140px)] items-center justify-center">
      <CircularProgress size={24} className="mx-1 !text-indigo-500" />
    </div>
  );
}
