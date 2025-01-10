import { Grid2 } from "@mui/material";
import DataCard from "../../../../../components/data_card";
import StatsCardSkeleton from "../../../../../components/skeleton/StatsCardSkeleton";

const WarrantyStats = ({ statsData, isLoading }) => {
  return (
    <Grid2 container spacing={2}>
      {isLoading
        ? statsData.map((_, index) => (
            <Grid2 key={index} size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
              <StatsCardSkeleton />
            </Grid2>
          ))
        : statsData.map((stat, index) => (
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
  );
};

export default WarrantyStats;
