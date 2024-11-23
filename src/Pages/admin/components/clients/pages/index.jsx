import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Card, CardContent, Grid2 } from "@mui/material";
import { apiService } from "../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../utils/backend/endpoints";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";

const ClientDetailsPage = () => {
  const { id } = useParams(); // Fetching client ID from the route
  const { data, isLoading, isError } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const response = await apiService({
        endpoint: `api/admin/get-customer/${id}`,
        method: "GET",
      });
      return response?.response?.data?.customer || null;
    },
    enabled: !!id,
  });

  if (isLoading) return <Typography>Loading client details...</Typography>;
  if (isError || !data)
    return <Typography>Failed to load client details.</Typography>;

  return (
    <Stack
      spacing={3}
      sx={{ padding: "2rem", background: "#f4f6f8", minHeight: "100vh" }}
    >
      {/* Client Basic Details */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {data.name || "Client Details"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Username: {data.userName || "-"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {data.email || "-"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Address: {data.address || "-"}
          </Typography>
        </CardContent>
      </Card>

      {/* Contact Details */}
      {(data.contactPerson || data.gst) && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography>Contact Person: {data.contactPerson || "-"}</Typography>
            <Typography>GST: {data.gst || "-"}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Account Dates */}

      {/* Additional Details */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Additional Information
          </Typography>
          <Typography>Database ID: {data._id || "N/A"}</Typography>
          <Typography variant="h6" gutterBottom>
            Account Dates
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

export default ClientDetailsPage;
