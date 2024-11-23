import { useQuery } from "@tanstack/react-query";
import { Grid2, Stack, Typography } from "@mui/material";
import DataCard from "../../../../components/data_card";
import DataTable from "../../../../components/data_table";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import TableSkeleton from "../../../../components/skeleton/TableSkeleton";
import SearchBox from "../../../../components/search_box/SearchBox";
import { useState, useMemo } from "react";
import ComplaintsStats from "./components/ComplaintsStats";
import ComplaintsTable from "./components/ComplaintsTable";

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

  const statsData = [
    {
      label: "Total complaints",
      total_number: complaintsData.length,
    },
    {
      label: "Pending complaints",
      total_number: 4,
    },
    {
      label: "Completed complaints",
      total_number: 0,
    },
  ];

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
      <ComplaintsStats statsData={statsData} />

      <ComplaintsTable
        complaintsData={complaintsData || []}
        isLoading={isLoading || false}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </Stack>
  );
};

export default Complaints;
