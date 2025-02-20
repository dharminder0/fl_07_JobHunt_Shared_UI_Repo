import { CircularProgress } from "@mui/material";

export default function TablePreLoader({ isTableLoader = true, data = [] }:any) {
  return (
    <div>
      {!isTableLoader && data?.length === 0 ? (
        <div className="absolute left-[42%] pt-3">
          <p className="text-base">No data available</p>
        </div>
      ) : (
        isTableLoader && (
          <div className="absolute left-[46%] pt-3">
            <CircularProgress size={24} />
          </div>
        )
      )}
    </div>
  );
}
