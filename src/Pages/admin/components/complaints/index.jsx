import { useQuery } from "@tanstack/react-query";
import { Grid2, Stack, Typography } from "@mui/material";
import DataCard from "../../../../components/data_card";
import DataTable from "../../../../components/data_table";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import TableSkeleton from "../../../../components/skeleton/TableSkeleton";
import SearchBox from "../../../../components/search_box/SearchBox";
import { useState, useMemo } from "react";

const Complaints = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data: complaintsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const complaintsResponse = await apiService({
        endpoint: endpoints.complaints,
        method: "GET",
      });
      return complaintsResponse?.response?.data?.complaints || [];
    },
  });

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  // Memoized filtered data
  const filteredComplaints = useMemo(() => {
    return complaintsData.filter((complaint) =>
      Object.values(complaint)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [complaintsData, searchText]);

  const complaintsTableTitles = [
    { value: "name", label: "Name", align: "left" },
    { value: "contact_person", label: "Person", align: "center" },
    { value: "contact_number", label: "Number", align: "center" },
    { value: "panel", label: "Panel", align: "center" },
    { value: "address", label: "Address", align: "center" },
    { value: "date", label: "Date", align: "center" },
    { value: "gst", label: "GST", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.projectName}</Typography>,
    contact_person: (data) => <Typography>{data?.contact_person}</Typography>,
    contact_number: (data) => <Typography>{data?.contact_number}</Typography>,
    panel: (data) => <Typography>{data?.panelSectionName}</Typography>,
    address: (data) => <Typography>{data?.siteLocation}</Typography>,
    date: (data) => <Typography>{data?.date}</Typography>,
    gst: (data) => <Typography>{data?.gst}</Typography>,
  };

  if (isError) {
    return <Typography>Error loading complaints</Typography>;
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
              total_number: complaintsData.length,
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
              Showing {filteredComplaints.length} complaints
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
        ) : !isLoading && filteredComplaints.length > 0 ? (
          <DataTable
            data={filteredComplaints}
            tableHeaderList={complaintsTableTitles}
            rowData={complaintsRowMapping}
            pagination={{
              flag: false,
              currentPage: 1,
              totalPages: Math.ceil(filteredComplaints.length / 10),
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
        ) : !isLoading && filteredComplaints.length === 0 ? (
          <Typography>
            {searchText === "" ? "No data present" : "No data found"}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default Complaints;
