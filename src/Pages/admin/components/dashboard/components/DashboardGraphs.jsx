import { CircularProgress, Grid2, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import BoxCircularLoader from "../../../../../components/loaders/BoxCircularLoader";

const DashboardGraphs = () => {
  const isFetching = false;

  const dataset = [
    { month: "Jan", seoul: 2 },
    { month: "Feb", seoul: 3 },
    { month: "Mar", seoul: 2 },
    { month: "Apr", seoul: 1 },
    { month: "May", seoul: 2 },
  ];

  return (
    <Stack sx={{ gap: "0.75rem" }}>
      <h1 className="text-lg font-medium">Overview</h1>

      <Grid2 container spacing={2}>
        <Grid2 size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Stack
            sx={{
              padding: "1.5rem 1rem",
              background: "#fff",
              height: "30rem",
              borderRadius: "0.625rem",
            }}
          >
            {isFetching ? (
              <BoxCircularLoader />
            ) : (
              <BarChart
                series={[{ data: [10, 20, 15, 30] }]}
                xAxis={[
                  {
                    data: ["Q1", "Q2", "Q3", "Q4"],
                    scaleType: "band",
                    label: "Complaints",
                  },
                ]}
                margin={{ top: 10, bottom: 50, left: 40, right: 10 }}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Stack>
        </Grid2>

        <Grid2 size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Stack
            sx={{
              padding: "1.5rem 1rem",
              background: "#fff",
              height: "30rem",
              borderRadius: "0.625rem",
            }}
          >
            {isFetching ? (
              <BoxCircularLoader />
            ) : (
              <BarChart
                dataset={dataset}
                xAxis={[
                  {
                    dataKey: "seoul",
                    valueFormatter: (value) => `${value}`,
                  },
                ]}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                yAxis={[
                  {
                    scaleType: "band",
                    dataKey: "month",
                  },
                ]}
                series={[
                  {
                    dataKey: "seoul",
                    label: "Projects",
                  },
                ]}
                layout="horizontal"
                grid={{ vertical: true }}
              />
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default DashboardGraphs;
