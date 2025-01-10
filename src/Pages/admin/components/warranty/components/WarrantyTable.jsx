import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import { EyeIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

const warrantyData = [
  {
    id: 1,
    title: "Warranty 1",
    companyName: "Company 1",
    duration_in_years: 1,
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
    panels: [],
    projectName: "Product 1",
    date_of_commissioning: "2021-10-10",
  },
  {
    id: 2,
    title: "Warranty 2",
    companyName: "Company 2",
    duration_in_years: 2,
    createdAt: "2022-01-15",
    updatedAt: "2022-01-15",
    panels: [],
    projectName: "Product 2",
    date_of_commissioning: "2022-01-15",
  },
  {
    id: 3,
    title: "Warranty 3",
    companyName: "Company 3",
    duration_in_years: 3,
    createdAt: "2023-05-20",
    updatedAt: "2023-05-20",
    panels: [],
    projectName: "Product 3",
    date_of_commissioning: "2023-05-20",
  },
  {
    id: 4,
    title: "Warranty 4",
    companyName: "Company 4",
    duration_in_years: 4,
    createdAt: "2024-08-25",
    updatedAt: "2024-08-25",
    panels: [],
    projectName: "Product 4",
    date_of_commissioning: "2024-08-25",
  },
  {
    id: 5,
    title: "Warranty 5",
    companyName: "Company 5",
    duration_in_years: 5,
    createdAt: "2025-11-30",
    updatedAt: "2025-11-30",
    panels: [],
    projectName: "Product 5",
    date_of_commissioning: "2025-11-30",
  },
  {
    id: 6,
    title: "Warranty 6",
    companyName: "Company 6",
    duration_in_years: 6,
    createdAt: "2026-02-14",
    updatedAt: "2026-02-14",
    panels: [],
    projectName: "Product 6",
    date_of_commissioning: "2026-02-14",
  },
  {
    id: 7,
    title: "Warranty 7",
    companyName: "Company 7",
    duration_in_years: 7,
    createdAt: "2027-07-19",
    updatedAt: "2027-07-19",
    panels: [],
    projectName: "Product 7",
    date_of_commissioning: "2027-07-19",
  },
  {
    id: 8,
    title: "Warranty 8",
    companyName: "Company 8",
    duration_in_years: 8,
    createdAt: "2028-09-23",
    updatedAt: "2028-09-23",
    panels: [],
    projectName: "Product 8",
    date_of_commissioning: "2028-09-23",
  },
];

const WarrantyTable = ({
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const onNavigateToPage = () => {
    navigate(`/admin/warranty/create`);
  };

  const onClickTableItem = (_e, data) => {
    navigate(`/admin/warranty/${data?._id}`);
  };

  const filteredWarranties = useMemo(() => {
    return warrantyData.filter((warranty) =>
      Object.values(warranty)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const warrantyTableTitles = [
    { value: "title", label: "Title", align: "left" },
    { value: "companyName", label: "Company Name", align: "center" },
    { value: "duration_in_years", label: "Duration (Years)", align: "center" },
    { value: "projectName", label: "Project Name", align: "center" },
    { value: "date_of_commissioning", label: "Date of Commissioning", align: "center" },
    // { value: "createdAt", label: "Created At", align: "center" },
    { value: "updatedAt", label: "Updated At", align: "center" },
    { value: "action", label: "Action", align: "center" },
  ];

  const warrantyRowMapping = {
    title: (data) => <Typography>{data?.title || "-"}</Typography>,
    companyName: (data) => <Typography>{data?.companyName || "-"}</Typography>,
    duration_in_years: (data) => <Typography>{data?.duration_in_years || "-"}</Typography>,
    projectName: (data) => <Typography>{data?.projectName || "-"}</Typography>,
    date_of_commissioning: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.date_of_commissioning }) || "-"}
      </Typography>
    ),
    // createdAt: (data) => (
    //   <Typography>
    //     {customDateFormatting({ date: data?.createdAt }) || "-"}
    //   </Typography>
    // ),
    updatedAt: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.updatedAt }) || "-"}
      </Typography>
    ),
    action: (data) => (
      <Stack direction="row" alignItems="center" justifyContent="center" gap="0.5rem">
        <IconButton sx={{ padding: "0.5rem", width: "fit-content" }}>
          <Tooltip arrow title="View certificate">
            <EyeIcon style={{ width: 20, height: 20, strokeWidth: 2 }} />
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
            Showing {filteredWarranties?.length || 0} warranties
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
            placeholder="Search warranties"
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
            Add Warranty
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : !isLoading && filteredWarranties.length > 0 ? (
        <DataTable
          data={filteredWarranties}
          tableHeaderList={warrantyTableTitles}
          rowData={warrantyRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredWarranties.length / 10),
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
      ) : !isLoading && filteredWarranties.length === 0 ? (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default WarrantyTable;