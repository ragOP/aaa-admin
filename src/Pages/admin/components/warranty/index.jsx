import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import { useState } from "react";
import WarrantyStats from "./components/WarrantyStats";
import WarrantyTable from "./components/WarrantyTable";

const Warranty = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data: warrantyData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["warranty"],
    queryFn: async () => {
      const projectsApiResponse = await apiService({
        endpoint: endpoints.warranty,
        method: "GET",
      });
      return projectsApiResponse?.response?.data?.warranty || [];
    },
  });

  const statsData = [
    { label: "Total Waranty", total_number: warrantyData?.length || 0 },
  ];

  if (isError) {
    return <Typography>Error loading warranty</Typography>;
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
      <WarrantyStats statsData={statsData} isLoading={isLoading} />

      <WarrantyTable
        warrantyData={warrantyData}
        isLoading={isLoading}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </Stack>
  );
};

export default Warranty;
