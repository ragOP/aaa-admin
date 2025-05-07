import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Grid2,
  Button,
} from "@mui/material";
import { apiService } from "../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../utils/backend/endpoints";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import BoxCircularLoader from "../../../../../components/loaders/BoxCircularLoader";
import toast, { Toaster } from "react-hot-toast";

const ClientDetailsPage = () => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
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

  if (isLoading) return <BoxCircularLoader sx={{ height: "100%" }} />;
  if (isError || !data)
    return <Typography>Failed to load client details.</Typography>;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      const response = await apiService({
        endpoint: endpoints.changePassword,
        method: "PATCH",
        data: { id, newPassword, role: "customer" },
      });
      console.log("Response:", response?.response?.success);

      if (response?.response?.success) {
        toast.success("Password changed successfully.");
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }finally {
      setNewPassword("");
      handleClose();
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
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
              <Typography>
                Contact Person: {data.contactPerson || "-"}
              </Typography>
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

        {/* Other Details */}
        <Button variant="contained" onClick={handleOpen}>
          Change Password
        </Button>

        {/* Modal for Changing Password */}
        {open && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "2rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
              zIndex: 1000,
              width: "400px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleClose} style={{ marginRight: "1rem" }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </Stack>
    </>
  );
};

export default ClientDetailsPage;
