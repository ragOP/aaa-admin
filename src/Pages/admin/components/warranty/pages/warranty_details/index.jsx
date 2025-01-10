import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Card, CardContent } from "@mui/material";
import { apiService } from "../../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../../utils/backend/endpoints";
import BoxCircularLoader from "../../../../../../components/loaders/BoxCircularLoader";
import WarrantyCertificate from "../../../../../../components/warranty_certificate";

const test = {
  id: 1,
  title: "Warranty 1",
  companyName: "Company 1",
  durationInMonths: 1,
  createdAt: "2021-10-10",
  updatedAt: "2021-10-10",
  panels: [],
  projectName: "Product 1",
  dateOfCommissioining: "2021-10-10",
}

const WarrantyDetails = () => {
  const { id } = useParams();

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["warranty", id],
  //   queryFn: async () => {
  //     const response = await apiService({
  //       endpoint: `${endpoints.warranty}/${id}`,
  //       method: "GET",
  //     });
  //     return response?.response?.data?.data || null;
  //   },
  //   enabled: !!id,
  // });

  // if (isLoading) return <BoxCircularLoader sx={{ height: "100%" }} />;
  // if (isError || !data)
  //   return <Typography>Failed to load warranty details.</Typography>;

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

      <WarrantyCertificate />

    </Stack>
  );
};

export default WarrantyDetails;
