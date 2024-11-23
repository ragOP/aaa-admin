import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Card, CardContent, Grid2 } from "@mui/material";
import { ActivityAndSeverityComponent } from "../../components/ComplaintsTable";
import { apiService } from "../../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../../utils/backend/endpoints";
import { customDateFormatting } from "../../../../../../utils/date/customDateFormatting";

const ComplaintsDetailsPage = () => {
  const { id } = useParams(); // Fetching complaint ID from the route
  const { data, isLoading, isError } = useQuery({
    queryKey: ["complaint", id],
    queryFn: async () => {
      const response = await apiService({
        endpoint: `${endpoints.complaints}/${id}`,
        method: "GET",
      });
      return response?.response?.data?.complaint || null;
    },
    enabled: !!id, // Only fetch if complaintId is available
  });

  if (isLoading) return <Typography>Loading complaint details...</Typography>;
  if (isError || !data)
    return <Typography>Failed to load complaint details.</Typography>;

  return (
    <Stack
      spacing={3}
      sx={{ padding: "2rem", background: "#f4f6f8", minHeight: "100vh" }}
    >
      {/* Project Details */}
      {data.projectName && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {data.projectName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Status Code: {data.statusCode || "-"}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Site Location & Panel Details */}
      {(data.siteLocation || data.panelSectionName) && (
        <Card>
          <CardContent>
            {data.siteLocation && (
              <>
                <Typography variant="h6" gutterBottom>
                  Site Location
                </Typography>
                <Typography>{data.siteLocation}</Typography>
              </>
            )}
            {data.panelSectionName && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "1rem" }}
                >
                  Panel Details
                </Typography>
                <Typography>{data.panelSectionName}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Images */}
      {data?.images?.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <Stack direction="row" spacing={2}>
              {data.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Activity and Severity */}
      {(data?.activity || data?.severity) && (
        <Card>
          <CardContent>
            <Grid2 container spacing={2}>
              {data?.activity && (
                <Grid2 xs={6}>
                  <Typography variant="h6" gutterBottom>
                    Activity
                  </Typography>
                  <ActivityAndSeverityComponent
                    value={data.activity}
                    type="activity"
                  />
                </Grid2>
              )}
              {data?.severity && (
                <Grid2 xs={6}>
                  <Typography variant="h6" gutterBottom>
                    Severity
                  </Typography>
                  <ActivityAndSeverityComponent
                    value={data.severity}
                    type="severity"
                  />
                </Grid2>
              )}
            </Grid2>
          </CardContent>
        </Card>
      )}

      {/* Technician Details */}
      {(data?.technician?.name ||
        data?.technician?.email ||
        data?.technician?.employeeId) && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Technician Details
            </Typography>
            <Typography>Name: {data.technician?.name || "-"}</Typography>
            <Typography>Email: {data.technician?.email || "-"}</Typography>
            <Typography>
              Employee ID: {data.technician?.employeeId || "-"}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Dates */}
      {(data.createdAt || data.updatedAt) && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dates
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
      )}
    </Stack>
  );
};

export default ComplaintsDetailsPage;
