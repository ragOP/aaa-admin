import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { apiService } from "../../utils/backend/apiService";
import { endpoints } from "../../utils/backend/endpoints";
import BoxCircularLoader from "../../components/loaders/BoxCircularLoader";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Notifications = () => {
    const navigate = useNavigate();

    const { data: notifications = [], isLoading, isError, error } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const response = await apiService({
                endpoint: endpoints.notifications,
                method: "GET",
            });
            return response?.response?.data?.notifications || [];
        },
        onError: (err) => {
            console.error("Error fetching notifications:", err);
        },
    });

    const onClickBack = () => {
        if (window.history.length > 1) {
            navigate(-1); // Go back in history
        } else {
            navigate("/admindashboard"); // Redirect to admin dashboard
        }
    };

    return (
        <Stack sx={{ backgroundColor: "#fafafa", height: "100vh", overflowY: "auto" }}>
            <Header />

            {isLoading && <BoxCircularLoader sx={{ height: "100%" }} />}

            {isError && (
                <Typography color="error" variant="body1">
                    Failed to load notifications. Please try again later.
                </Typography>
            )}

            {!isLoading && !isError && notifications.length === 0 && (
                <Typography variant="body1">No notifications available.</Typography>
            )}

            {!isLoading && !isError && notifications.length > 0 && (
                <Stack spacing={2} sx={{ padding: "1rem", height: "100%", overflowY: "auto" }}>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Go back" arrow>
                            <IconButton onClick={onClickBack} sx={{ width: "fit-content", height: "fit-content" }}>
                                <ArrowLeftCircleIcon style={{ height: "1.75rem", width: "1.75rem", color: "#000" }} />
                            </IconButton>
                        </Tooltip>
                        <Stack>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Notifications
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 400 }}>
                                Showing {notifications.length} notifications
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack spacing={2} sx={{ height: "100%", overflowY: "auto" }}>
                        {notifications.map((notification) => (
                            <NotificationCard key={notification._id} notification={notification} />
                        ))}
                    </Stack>

                </Stack>
            )}
        </Stack>
    );
};

export default Notifications;

const NotificationCard = ({ notification }) => (
    <Card>
        <CardContent>
            <Typography variant="body1">
                <strong>Customer Name:</strong> {notification.customer.name}
            </Typography>
            <Typography variant="body1">
                <strong>Email:</strong> {notification.customer.email}
            </Typography>
            <Typography variant="body1">
                <strong>Contact Person:</strong> {notification.customer.contactPerson}
            </Typography>
            <Typography variant="body1">
                <strong>Requested At:</strong> {new Date(notification.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="h6" color="textSecondary">
                The customer has requested a password reset.
            </Typography>
        </CardContent>
    </Card>
);

