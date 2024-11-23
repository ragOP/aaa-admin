import { Pagination } from "@mui/material";

const CustomPagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onChange}
      sx={{
        "& .MuiPaginationItem-root": {
          borderRadius: "0.625rem",
        },
      }}
    />
  );
};

export default CustomPagination;
