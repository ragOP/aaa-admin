import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import { useState } from "react";
import AmcStats from "./components/AmcStats";
import AmcTable from "./components/AmcTable";

const Amc = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data: amcData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["amc"],
    queryFn: async () => {
      const amcApiResponse = await apiService({
        endpoint: endpoints.amc,
        method: "GET",
      });
      return amcApiResponse?.response?.data?.amc || [];
    },
  });

  const statsData = [
    { label: "Total AMC", total_number: amcData?.length || 0 },
  ];

  if (isError) {
    return <Typography>Error loading AMC data</Typography>;
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
      <AmcStats statsData={statsData} isLoading={isLoading} />

      <AmcTable
        amcData={amcData}
        isLoading={isLoading}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </Stack>
  );
};

export default Amc;