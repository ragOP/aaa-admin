import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Card } from "@mui/material";
import { apiService } from "../../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../../utils/backend/endpoints";
import BoxCircularLoader from "../../../../../../components/loaders/BoxCircularLoader";

export const formatDuration = (months) => {
  if (!months) return "";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let result = "";
  if (years > 0) {
    result += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (remainingMonths > 0) {
    result += `${years > 0 ? " " : ""}${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  }
  return result;
};

const WarrantyDetails = ({ type = "warranty" }) => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["warranty", id],
    queryFn: async () => {
      const response = await apiService({
        endpoint: `${type === "warranty" ? endpoints.getWarranty : endpoints.getAmc}/${id}`,
        method: "GET",
      });
      return response?.response?.data?.data || null;
    },
    enabled: !!id,
  });

  if (isLoading) return <BoxCircularLoader sx={{ height: "100%" }} />;
  if (isError || !data)
    return <Typography>Failed to load warranty details.</Typography>;


  return (
    <Stack
      spacing={3}
      sx={{ padding: "2rem", background: "#f4f6f8", minHeight: "100vh" }}
    >
      <Card sx={{ padding: 2 }}>
        <Typography variant="h5">
          Warranty Details
        </Typography>
      </Card>

      <iframe
        src={type === "warranty" ? data?.warrntyPdf : data?.amcPdf}
        width="100%"
        height="700px"
        style={{ border: "none", marginTop: "1rem" }}
        title="AMC Certificate PDF"
      />

    </Stack>
  );
};

export default WarrantyDetails;
