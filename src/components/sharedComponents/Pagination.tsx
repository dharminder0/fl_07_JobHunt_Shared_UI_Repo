import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Pagination({
  pageIndex = 0,
  pageSize = 0,
  totalCount = 0,
  setPageIndex = (item: any) => {},
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-4">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-base text-gray-700">
            Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
            <span>{Math.min(pageIndex * pageSize, totalCount || 0)}</span> of{" "}
            <span>{totalCount || 0}</span> results
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-end">
        <IconButton
          size="small"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex <= 1}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= Math.ceil((totalCount || 0) / pageSize)}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
}

export default Pagination;
