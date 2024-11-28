import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import { useState } from "react";
import TechniciansStats from "./components/TechniciansStats";
import TechniciansTable from "./components/TechniciansTable";

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

  const statsData = [
    { label: "Total technicians", total_number: techniciansData?.total || 0 },
    {
      label: "Active technicians",
      total_number:
        techniciansData?.filter((technician) => technician?.active)?.length ||
        0,
    },
    {
      label: "Inactive technicians",
      total_number:
        techniciansData?.filter((technician) => !technician?.active)?.length ||
        0,
    },
  ];

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
      <TechniciansStats statsData={statsData} isLoading={isLoading} />

      <TechniciansTable
        techniciansData={techniciansData}
        isLoading={isLoading}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </Stack>
  );
};

export default Technicians;
