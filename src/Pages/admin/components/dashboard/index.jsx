import { Stack } from "@mui/material";
import DashboardStats from "./components/DashboardStats";
import DashboardGraphs from "./components/DashboardGraphs";
import { apiService } from "../../../../utils/backend/apiService";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../../../utils/backend/endpoints";

const Dashboard = () => {
  const {
    data: statsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const techniciansResponse = await apiService({
        endpoint: endpoints.dashboard,
        method: "GET",
      });
      return techniciansResponse?.response?.data?.stats || [];
    },
  });

  console.log(">>>", statsData);

  return (
    <Stack sx={{ gap: "1rem", padding: "1rem" }}>
      <DashboardStats stats={statsData} isLoading={isLoading} />

      <DashboardGraphs stats={statsData} isLoading={isLoading} />
    </Stack>
  );
};

export default Dashboard;
