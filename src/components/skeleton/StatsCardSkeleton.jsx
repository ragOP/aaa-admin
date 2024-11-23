import { Skeleton } from "@mui/material";

const StatsCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={"100%"}
      height={110}
      sx={{ borderRadius: "1rem" }}
    />
  );
};

export default StatsCardSkeleton;
