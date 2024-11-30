import React from "react";
import { Grid2, Stack } from "@mui/material";
import StatsCardSkeleton from "../../../../../components/skeleton/StatsCardSkeleton";
import DataCard from "../../../../../components/data_card";

const DashboardStats = ({ stats , isLoading}) => {

  const data = [
    {
      label: "Total Projects",
      total_number: stats?.totalProjects || 0,
    },
    {
      label: "Total Complaints",
      total_number: stats?.totalComplaints || 0,
    },
    {
      label: "Total Technicians",
      total_number: stats?.totalEngineers || 0,
    },
  ];

  return (
    <Stack sx={{ gap: "0.75rem" }}>
      <h1 className="text-lg font-medium">Statistics</h1>

      <Grid2 container spacing={2}>
        {isLoading
          ? data.map((_, index) => (
              <Grid2 key={index} size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
                <StatsCardSkeleton />
              </Grid2>
            ))
          : data.map((stat, index) => (
              <Grid2 key={index} size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
                <DataCard
                  info={{
                    label: stat.label,
                    total_number: stat.total_number,
                  }}
                />
              </Grid2>
            ))}
      </Grid2>
    </Stack>
  );
};

export default DashboardStats;
