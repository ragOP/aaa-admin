import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import { PlusIcon } from "@heroicons/react/24/outline";

const TechniciansTable = ({
  techniciansData,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const onNavigateToPage = () => {
    navigate(`/admin/technicians/create`);
  };

  const onClickTableItem = (_e, data) => {
    console.log("data", data);
    navigate(`/admin/technicians/${data?._id}`);
  };

  const filteredTechnicians = useMemo(() => {
    return techniciansData.filter((complaint) =>
      Object.values(complaint)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [techniciansData, searchText]);

  const complaintsTableTitles = [
    { value: "name", label: "Name", align: "left" },
    { value: "username", label: "Username", align: "center" },
    { value: "employee_id", label: "Employee Id", align: "center" },
    { value: "phone_number", label: "Phone Number", align: "center" },
    { value: "email", label: "Email", align: "center" },
    { value: "date", label: "Date", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.name || "-"}</Typography>,
    username: (data) => <Typography>{data?.userName || "-"}</Typography>,
    employee_id: (data) => <Typography>{data?.employeeId || "-"}</Typography>,
    phone_number: (data) => <Typography>{data?.phoneNumber || "-"}</Typography>,
    email: (data) => <Typography>{data?.email || "-"}</Typography>,
    date: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.createdAt }) || "-"}
      </Typography>
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
            Showing {filteredTechnicians?.length || 0} technicians
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
            placeholder="Search technicians"
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
            Add Technician
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : !isLoading && filteredTechnicians.length > 0 ? (
        <DataTable
          data={filteredTechnicians}
          tableHeaderList={complaintsTableTitles}
          rowData={complaintsRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredTechnicians.length / 10),
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
      ) : !isLoading && filteredTechnicians.length === 0 ? (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default TechniciansTable;
