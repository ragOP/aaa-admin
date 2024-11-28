import { Stack, Typography } from "@mui/material";
import ClientsStats from "./components/ClientsStats";
import ClientsTable from "./components/ClientsTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";

const Customers = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data: customersData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const customersRespoonse = await apiService({
        endpoint: endpoints.customer,
        method: "GET",
      });
      return customersRespoonse?.response?.data?.customers || [];
    },
  });

  const statsData = [
    {
      label: "Total Customers",
      total_number: customersData?.length,
    },
    {
      label: "Active Customers",
      total_number:
        customersData?.filter((customer) => customer?.active)?.length || 0,
    },
    {
      label: "Inactive Customers",
      total_number:
        customersData?.filter((customer) => !customer?.active)?.length || 0,
    },
  ];

  if (isError) {
    return <Typography>Error loading customers</Typography>;
  }

  return (
    <Stack sx={{ gap: "1rem", padding: "1rem", mb: "1rem" }}>
      <h1 className="text-lg font-medium">Customers</h1>

      <ClientsStats statsData={statsData} isLoading={isLoading} />

      <ClientsTable
        customersData={customersData || []}
        isLoading={isLoading || false}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </Stack>
  );
};

export default Customers;
