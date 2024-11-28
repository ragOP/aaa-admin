import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import { useState } from "react";
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
      label: "Total Complaints",
      total_number: complaintsData?.length,
    },
    {
      label: "Pending Complaints",
      total_number:
        complaintsData?.filter((complaint) => complaint?.activity === "Pending")
          ?.length || 0,
    },
    {
      label: "High Severity Complaints",
      total_number:
        complaintsData?.filter((complaint) => complaint?.severity === "High")
          ?.length || 0,
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
      <ComplaintsStats statsData={statsData} isLoading={isLoading} />

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
