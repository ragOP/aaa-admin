import React, { useMemo } from "react";
import { Stack, Typography, Chip } from "@mui/material";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import SearchBox from "../../../../../components/search_box/SearchBox";
import DataTable from "../../../../../components/data_table";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const ComplaintsTable = ({
  complaintsData,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const filteredComplaints = useMemo(() => {
    return complaintsData.filter((complaint) =>
      Object.values(complaint)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [complaintsData, searchText]);

  const complaintsTableTitles = [
    { value: "name", label: "Name", align: "left" },
    { value: "technician", label: "Technician", align: "center" },
    { value: "activity", label: "Activity", align: "center" },
    { value: "severity", label: "severity", align: "center" },
    { value: "panel", label: "Panel", align: "center" },
    { value: "address", label: "Address", align: "center" },
    { value: "date", label: "Date", align: "center" },
    { value: "last_activity", label: "Last activity", align: "center" },
    { value: "status_code", label: "Code", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.projectName || "-"}</Typography>,
    technician: (data) => (
      <Typography>{data?.technician?.name || "-"}</Typography>
    ),
    activity: (data) => (
      <ActivityAndSeverityComponent value={data?.activity} type="activity" />
    ),
    severity: (data) => (
      <ActivityAndSeverityComponent value={"medium"} type="severity" />
    ),
    panel: (data) => <Typography>{data?.panelSectionName || "-"}</Typography>,
    address: (data) => <Typography>{data?.siteLocation || "-"}</Typography>,
    date: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.createdAt }) || "-"}
      </Typography>
    ),
    last_activity: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.updatedAt }) || "-"}
      </Typography>
    ),
    status_code: (data) => <Typography>{data?.statusCode || "-"}</Typography>,
  };

  return (
    <Stack
      sx={{
        background: "#fff",
        padding: "1rem",
        gap: "0.5rem",
        borderRadius: "0.75rem",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography>
            Showing {filteredComplaints.length || 0} complaints
          </Typography>
        </Stack>
        <Stack sx={{ width: "40%" }}>
          <SearchBox
            onChange={onChangeText}
            value={searchText}
            placeholder="Search complaints"
          />
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : filteredComplaints.length > 0 ? (
        <DataTable
          data={filteredComplaints}
          tableHeaderList={complaintsTableTitles}
          rowData={complaintsRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredComplaints.length / 10),
          }}
          tableSx={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
        />
      ) : (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      )}
    </Stack>
  );
};

export default ComplaintsTable;

export const ActivityAndSeverityComponent = ({ value, type }) => {
  // Define mappings for activity and severity types
  const activityMapping = {
    pending: {
      icon: (
        <ExclamationCircleIcon
          style={{ width: 20, height: 20, color: "#F59E0B" }}
        />
      ), // Yellow
      label: "Pending",
      bgColor: "#FEF3C7", // Light Yellow
      textColor: "#D97706",
    },
    "in-progress": {
      icon: (
        <ExclamationTriangleIcon
          style={{ width: 20, height: 20, color: "#3B82F6" }}
        />
      ), // Blue
      label: "In Progress",
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#1D4ED8",
    },
    completed: {
      icon: (
        <InformationCircleIcon
          style={{ width: 20, height: 20, color: "#10B981" }}
        />
      ), // Green
      label: "Completed",
      bgColor: "#D1FAE5", // Light Green
      textColor: "#047857",
    },
  };

  const severityMapping = {
    high: {
      icon: (
        <ExclamationCircleIcon
          style={{ width: 20, height: 20, color: "#EF4444" }}
        />
      ), // Red
      label: "High",
      bgColor: "#FEE2E2", // Light Red
      textColor: "#B91C1C",
    },
    medium: {
      icon: (
        <ExclamationTriangleIcon
          style={{ width: 20, height: 20, color: "#F59E0B" }}
        />
      ), // Yellow
      label: "Medium",
      bgColor: "#FEF3C7", // Light Yellow
      textColor: "#D97706",
    },
    low: {
      icon: (
        <InformationCircleIcon
          style={{ width: 20, height: 20, color: "#10B981" }}
        />
      ), // Green
      label: "Low",
      bgColor: "#D1FAE5", // Light Green
      textColor: "#047857",
    },
  };

  const mapping = type === "activity" ? activityMapping : severityMapping;

  const { icon, label, bgColor, textColor } = mapping[value?.toLowerCase()] || {
    icon: null,
    label: value,
    bgColor: "#F3F4F6", // Light Gray
    textColor: "#6B7280", // Dark Gray
  };

  return (
    <Chip
      icon={icon}
      label={label}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: "bold",
        fontSize: "0.875rem",
        ".MuiChip-icon": {
          marginLeft: "4px", // Adjust spacing
        },
      }}
    />
  );
};
