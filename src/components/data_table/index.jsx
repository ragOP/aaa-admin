import { Stack, Typography } from "@mui/material";
import CustomPagination from "./components/CustomPagination";
import CustomTable from "./components/CustomTable";
import "../styles/no-scrollbar.css";

const DataTable = ({
  tableSx,
  data,
  tableHeaderList,
  rowData,
  onClick = () => {},
  pagination = {
    flag: false,
    currentPage: 1,
    totalPages: 1,
    onChange: () => {},
  },
  sx,
}) => {
  const defaultTableHeaderList = [
    { value: "title", label: "Title", align: "left" },
    { value: "event", label: "Event", align: "left" },
  ];

  const defaultRowData = {
    title: (_data) => <Typography>TITLE</Typography>,
    event: (_data) => <Typography>EVENT</Typography>,
  };

  return (
    <>
      <CustomTable
        tableSx={tableSx}
        data={data}
        tableHeaderList={tableHeaderList || defaultTableHeaderList}
        rowData={rowData || defaultRowData}
        onClick={onClick}
      />
      {pagination.flag && (
        <Stack direction="row" justifyContent="center">
          <CustomPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onChange={pagination.onChange}
          />
        </Stack>
      )}
    </>
  );
};

export default DataTable;
