import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Card, CardContent, Grid2 } from "@mui/material";
import { apiService } from "../../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../../utils/backend/endpoints";
import { customDateFormatting } from "../../../../../../utils/date/customDateFormatting";
import BoxCircularLoader from "../../../../../../components/loaders/BoxCircularLoader";

const ProjectsDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await apiService({
        endpoint: `${endpoints.singleProject}/${id}`,
        method: "GET",
      });
      return response?.response?.data?.data || null;
    },
    enabled: !!id,
  });

  if (isLoading) return <BoxCircularLoader sx={{ height: "100%" }} />;
  if (isError || !data)
    return <Typography>Failed to load project details.</Typography>;

  return (
    <Stack
      spacing={3}
      sx={{ padding: "2rem", background: "#f4f6f8", minHeight: "100vh" }}
    >
      {/* Project Title */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {data.title || "Project Title"}
          </Typography>
        </CardContent>
      </Card>

      {/* Panels */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Panels
          </Typography>
          {data.panels && data.panels.length > 0 ? (
            data.panels.map((panel, index) => (
              <Typography key={index} variant="body1">
                {index + 1}. {panel}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">No panels available.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Customer Details */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          <Typography variant="body1">
            Name: {data.customerId?.name || "-"}
          </Typography>
          <Typography variant="body1">
            Username: {data.customerId?.userName || "-"}
          </Typography>
          <Typography variant="body1">
            Email: {data.customerId?.email || "-"}
          </Typography>
          <Typography variant="body1">
            Address: {data.customerId?.address || "-"}
          </Typography>
          <Typography variant="body1">
            GST: {data.customerId?.gst || "-"}
          </Typography>
          <Typography variant="body1">
            Contact Person: {data.customerId?.contactPerson || "-"}
          </Typography>
          <Typography variant="body1">
            Created At:{" "}
            {data.customerId?.createdAt
              ? customDateFormatting({ date: data.customerId.createdAt })
              : "-"}
          </Typography>
          <Typography variant="body1">
            Last Updated:{" "}
            {data.customerId?.updatedAt
              ? customDateFormatting({ date: data.customerId.updatedAt })
              : "-"}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProjectsDetailsPage;
