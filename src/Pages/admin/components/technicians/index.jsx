import { useQuery } from "@tanstack/react-query";
import { Grid2, Stack, Typography } from "@mui/material";
import DataCard from "../../../../components/data_card";
import DataTable from "../../../../components/data_table";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import TableSkeleton from "../../../../components/skeleton/TableSkeleton";
import SearchBox from "../../../../components/search_box/SearchBox";
import { useState, useMemo } from "react";
import { format } from "date-fns";

const Technicians = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data: techniciansData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () => {
      const techniciansResponse = await apiService({
        endpoint: endpoints.technician,
        method: "GET",
      });
      return techniciansResponse?.response?.data?.engineer || [];
    },
  });

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  // Memoized filtered data
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
    { value: "email", label: "Email", align: "center" },
    { value: "date", label: "Date", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.name || "-"}</Typography>,
    username: (data) => <Typography>{data?.username || "-"}</Typography>,
    employee_id: (data) => <Typography>{data?.employeeId || "-"}</Typography>,
    email: (data) => <Typography>{data?.email || "-"}</Typography>,
    date: (data) => (
      <Typography>
        {format(data?.createdAt, "dd/MM/yyyy hh:mm a") || "-"}
      </Typography>
    ),
  };

  if (isError) {
    return <Typography>Error loading technician</Typography>;
  }

  return (
    <Stack
      sx={{
        gap: "1rem",
        padding: "1rem",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard
            info={{
              label: "Total complaints",
              total_number: techniciansData.length,
            }}
          />
        </Grid2>
        <Grid2 size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard
            info={{
              label: "Pending complaints",
              total_number: "50",
            }}
          />
        </Grid2>
        <Grid2 size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard
            info={{
              label: "Resolved complaints",
              total_number: "30",
            }}
          />
        </Grid2>
      </Grid2>

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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography>
              Showing {filteredTechnicians.length} complaints
            </Typography>
          </Stack>
          <Stack sx={{ width: "40%" }}>
            <SearchBox
              onChange={onChangeText}
              value={searchText}
              placeholder="Search complaints"
            />
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
    </Stack>
  );
};

export default Technicians;
