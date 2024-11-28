import { CircularProgress, Grid2, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import BoxCircularLoader from "../../../../../components/loaders/BoxCircularLoader";

const DashboardGraphs = ({ stats, isLoading }) => {
  return (
    <Stack sx={{ gap: "0.75rem" }}>
      <h1 className="text-lg font-medium">Overview</h1>

      <Grid2 container spacing={2}>
        {/* Complaints by Activity */}
        <Grid2 size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Stack
            sx={{
              padding: "1.5rem 1rem",
              background: "#fff",
              height: "30rem",
              borderRadius: "0.625rem",
            }}
          >
            {isLoading ? (
              <BoxCircularLoader />
            ) : (
              <BarChart
                dataset={stats?.complaintsByActivity || []}
                xAxis={[
                  {
                    dataKey: "_id",
                    scaleType: "band",
                    label: "Complaints by Activity",
                  },
                ]}
                yAxis={[
                  {
                    dataKey: "value",
                  },
                ]}
                series={[
                  {
                    dataKey: "count",
                    label: "Count",
                  },
                ]}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                margin={{ top: 10, bottom: 50, left: 40, right: 10 }}
              />
            )}
          </Stack>
        </Grid2>

        {/* Complaints by Severity */}
        <Grid2 size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Stack
            sx={{
              padding: "1.5rem 1rem",
              background: "#fff",
              height: "30rem",
              borderRadius: "0.625rem",
            }}
          >
            {isLoading ? (
              <BoxCircularLoader />
            ) : (
              <BarChart
                dataset={stats?.complaintsBySeverity || []} // Dataset with severity data
                xAxis={[
                  {
                    dataKey: "_id", // Key for x-axis (severity levels)
                    scaleType: "band",
                    label: "Severity Levels",
                  },
                ]}
                yAxis={[
                  {
                    dataKey: "count", // Key for y-axis (number of complaints)
                  },
                ]}
                series={[
                  {
                    dataKey: "count", // Data for the bar heights
                    label: "Number of Complaints", // Label for tooltip/legend
                  },
                ]}
                layout="vertical" // Adjust layout for clarity
                grid={{ vertical: true }}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                tooltip={{
                  show: true, // Enable tooltip
                  valueFormatter: (value) => `${value} complaints`, // Format tooltip values
                }}
              />
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default DashboardGraphs;
