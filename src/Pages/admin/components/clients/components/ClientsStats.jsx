import { Grid2 } from "@mui/material";
import DataCard from "../../../../../components/data_card";

const ClientsStats = () => {
  // Define an array with the data for each DataCard
  const data = [
    { label: "Total customers", total_number: "100" },
    { label: "Total sales", total_number: "200" },
    { label: "Active users", total_number: "150" },
  ];

  return (
    <Grid2 container spacing={2}>
      {data.map((item, index) => (
        <Grid2 key={index} size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard info={item} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ClientsStats;
