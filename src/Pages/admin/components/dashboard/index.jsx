import { Stack } from "@mui/material";
import DashboardStats from "./components/DashboardStats";
import DashboardGraphs from "./components/DashboardGraphs";

const Dashboard = () => {
  return (
    <Stack sx={{ gap: "1rem", padding: "1rem", }}>

      <DashboardStats />

      <DashboardGraphs />
    </Stack>
  );
};

export default Dashboard;
