import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Card, CardContent, Grid2 } from "@mui/material";
import { apiService } from "../../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../../utils/backend/endpoints";
import { customDateFormatting } from "../../../../../../utils/date/customDateFormatting";
import BoxCircularLoader from "../../../../../../components/loaders/BoxCircularLoader";

const TechniciansDetailsPage = () => {
  const { id } = useParams(); // Fetching technician ID from the route
  const { data, isLoading, isError } = useQuery({
    queryKey: ["technician", id],
    queryFn: async () => {
      const response = await apiService({
        endpoint: `api/admin/get-technican/${id}`,
        method: "GET",
      });
      return response?.response?.data?.technician || null;
    },
    enabled: !!id, // Only fetch if technician ID is available
  });

  if (isLoading) return <BoxCircularLoader sx={{ height: "100%" }} />;
  if (isError || !data)
    return <Typography>Failed to load technician details.</Typography>;

  return (
    <Stack
      spacing={3}
      sx={{ padding: "2rem", background: "#f4f6f8", minHeight: "100vh" }}
    >
      {/* Technician Basic Details */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {data.name || "Technician Details"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Username: {data.userName || "-"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {data.email || "-"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Employee ID: {data.employeeId || "-"}
          </Typography>
        </CardContent>
      </Card>

      {/* Account Dates */}

      {/* Additional Details */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Additional Information
          </Typography>

          <Typography>Database ID: {data._id || "N/A"}</Typography>

          <Typography variant="h6" gutterBottom>
            Account Details
          </Typography>
          <Typography>
            Created At:{" "}
            {data.createdAt
              ? customDateFormatting({ date: data?.createdAt })
              : "-"}
          </Typography>
          <Typography>
            Last Updated:{" "}
            {data.updatedAt
              ? customDateFormatting({ date: data?.updatedAt })
              : "-"}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TechniciansDetailsPage;
