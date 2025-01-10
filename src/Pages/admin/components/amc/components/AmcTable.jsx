import { Button, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import { PlusIcon, PencilIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const amcData = [
  {
    id: 1,
    title: "AMC 1",
    companyName: "Company 1",
    duration_in_years: 1,
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
    productName: "Product 1",
    date_of_commissioning: "2021-10-10",
    amount: 1000,
  },
  {
    id: 2,
    title: "AMC 2",
    companyName: "Company 2",
    duration_in_years: 2,
    createdAt: "2022-01-15",
    updatedAt: "2022-01-15",
    productName: "Product 2",
    date_of_commissioning: "2022-01-15",
    amount: 2000,
  },
  {
    id: 3,
    title: "AMC 3",
    companyName: "Company 3",
    duration_in_years: 3,
    createdAt: "2023-05-20",
    updatedAt: "2023-05-20",
    productName: "Product 3",
    date_of_commissioning: "2023-05-20",
    amount: 3000,
  },
  {
    id: 4,
    title: "AMC 4",
    companyName: "Company 4",
    duration_in_years: 4,
    createdAt: "2024-08-25",
    updatedAt: "2024-08-25",
    productName: "Product 4",
    date_of_commissioning: "2024-08-25",
    amount: 4000,
  },
];

const AmcTable = ({
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const onNavigateToPage = () => {
    navigate(`/admin/amc/create`);
  };

  const onClickTableItem = (_e, data) => {
    navigate(`/admin/amc/${data?._id}`);
  };

  const filteredAmcs = useMemo(() => {
    return amcData.filter((amc) =>
      Object.values(amc)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const amcTableTitles = [
    { value: "title", label: "Title", align: "left" },
    { value: "companyName", label: "Company Name", align: "center" },
    { value: "duration_in_years", label: "Duration (Months)", align: "center" },
    { value: "productName", label: "Product Name", align: "center" },
    { value: "date_of_commissioning", label: "Date of Commissioning", align: "center" },
    { value: "createdAt", label: "Created At", align: "center" },
    { value: "updatedAt", label: "Updated At", align: "center" },
    { value: "amount", label: "Amount", align: "center" },
    { value: "action", label: "Action", align: "center" },
  ];

  const amcRowMapping = {
    title: (data) => <Typography>{data?.title || "-"}</Typography>,
    companyName: (data) => <Typography>{data?.companyName || "-"}</Typography>,
    duration_in_years: (data) => <Typography>{data?.duration_in_years || "-"}</Typography>,
    productName: (data) => <Typography>{data?.productName || "-"}</Typography>,
    date_of_commissioning: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.date_of_commissioning }) || "-"}
      </Typography>
    ),
    createdAt: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.createdAt }) || "-"}
      </Typography>
    ),
    updatedAt: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.updatedAt }) || "-"}
      </Typography>
    ),
    amount: (data) => <Typography>{data?.amount || "-"}</Typography>,
    action: (data) => (
      <Stack direction="row" alignItems="center" justifyContent="center" gap="0.5rem">
        <IconButton sx={{ padding: "0.5rem", width: "fit-content" }}>
          <Tooltip arrow title="Download">
            <ArrowDownTrayIcon style={{ width: 20, height: 20, strokeWidth: 2 }} />
          </Tooltip>
        </IconButton>
        <IconButton sx={{ padding: "0.5rem", width: "fit-content" }}>
          <Tooltip arrow title="Edit">
            <PencilIcon style={{ width: 20, height: 20, strokeWidth: 2 }} />
          </Tooltip>
        </IconButton>
      </Stack>
    ),
  };

  return (
    <Stack
      sx={{
        background: "#fff",
        padding: "1rem",
        gap: "0.5rem",
        borderRadius: "0.75rem",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography>
            Showing {filteredAmcs?.length || 0} AMCs
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ gap: "1rem", width: "40%" }}
        >
          <SearchBox
            onChange={onChangeText}
            value={searchText}
            placeholder="Search AMCs"
          />
          <Button
            onClick={onNavigateToPage}
            variant="contained"
            startIcon={
              <PlusIcon style={{ width: 16, height: 16, strokeWidth: 2 }} />
            }
            sx={{
              whiteSpace: "nowrap",
              width: "auto",
              flexShrink: 0,
              textTransform: "none",
            }}
          >
            Add AMC
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : !isLoading && filteredAmcs.length > 0 ? (
        <DataTable
          data={filteredAmcs}
          tableHeaderList={amcTableTitles}
          rowData={amcRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredAmcs.length / 10),
          }}
          onClick={(e, data) => onClickTableItem(e, data)}
          tableSx={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
        />
      ) : !isLoading && filteredAmcs.length === 0 ? (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default AmcTable;