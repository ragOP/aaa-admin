import { Grid2 } from "@mui/material";
import DataCard from "../../../../../components/data_card";

const ComplaintsStats = ({ statsData }) => {
  return (
    <Grid2 container spacing={2}>
      {statsData.map((item, index) => (
        <Grid2 key={index} size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard info={item} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ComplaintsStats;
