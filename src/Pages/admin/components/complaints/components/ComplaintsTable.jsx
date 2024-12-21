import React, { useMemo, useState } from "react";
import {
  Stack,
  Typography,
  Chip,
  Button,
  Dialog,
  IconButton,
  Divider,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import SearchBox from "../../../../../components/search_box/SearchBox";
import DataTable from "../../../../../components/data_table";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { apiService } from "../../../../../utils/backend/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints } from "../../../../../utils/backend/endpoints";
import toast from "react-hot-toast";

const ComplaintsTable = ({
  complaintsData,
  isLoading,
  searchText,
  setSearchText,
  refetch,
}) => {
  const navigate = useNavigate();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filter, setFilter] = useState("all");

  const {
    data: techniciansData = [],
    isLoading: isTechniciansLoading,
    isError,
  } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () => {
      const techniciansResponse = await apiService({
        endpoint: endpoints.technician,
        method: "GET",
      });
      return techniciansResponse?.response?.data?.engineer || [];
    },
  });

  const [openSelect, setOpenSelect] = useState(false);

  const onOpenSelect = (e, data) => {
    e.stopPropagation();
    setOpenSelect(true);
    setSelectedComplaint(data);
  };

  const onCloseSelect = (e) => {
    e.stopPropagation();
    setOpenSelect(false);
    setSelectedComplaint(null);
  };

  const onEditTechnician = () => {};

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const filteredComplaints = useMemo(() => {
    const filteredBySearch = complaintsData.filter((complaint) =>
      Object.values(complaint)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    if (filter === "assigned") {
      return filteredBySearch.filter((complaint) => complaint.technician);
    } else if (filter === "unassigned") {
      return filteredBySearch.filter((complaint) => !complaint.technician);
    }
    return filteredBySearch;
  }, [complaintsData, searchText, filter]);

  const onClickTableItem = (_e, data) => {
    console.log("data", data);
    navigate(`/admin/complaints/${data?._id}`);
  };

  const complaintsTableTitles = [
    { value: "name", label: "Name", align: "left" },
    { value: "technician", label: "Technician", align: "center" },
    { value: "activity", label: "Activity", align: "center" },
    { value: "severity", label: "Severity", align: "center" },
    { value: "panel", label: "Panel", align: "center" },
    { value: "address", label: "Address", align: "center" },
    { value: "date", label: "Date", align: "center" },
    { value: "last_activity", label: "Last activity", align: "center" },
    { value: "status_code", label: "Code", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.projectName || "-"}</Typography>,
    technician: (data) => (
      <>
        {!data?.technician ? (
          <Button
            variant="contained"
            onClick={(e) => onOpenSelect(e, data)}
            sx={{ textTransform: "none", whiteSpace: "nowrap" }}
          >
            {data?.technician ? "Edit Technician" : "Add Technician"}
          </Button>
        ) : (
          <Typography>{data?.technician?.name || "-"}</Typography>
        )}
      </>
    ),
    activity: (data) => (
      <ActivityAndSeverityComponent value={data?.activity} type="activity" />
    ),
    severity: (data) => (
      <ActivityAndSeverityComponent value={data.severity} type="severity" />
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
    <>
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography>
              Showing {filteredComplaints.length || 0} complaints
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ gap: "1rem", width: "50%" }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Status:</Typography>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                minWidth: "9rem",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="unassigned">Unassigned</MenuItem>
            </Select>

            <SearchBox
              onChange={onChangeText}
              value={searchText}
              placeholder="Search complaints"
            />
            {/* <Button
            variant="contained"
            startIcon={
              <PlusIcon style={{ width: 16, height: 16, strokeWidth: 2 }} />
            }
            sx={{
              whiteSpace: "nowrap",
              width: "auto",
              flexShrink: 0,
              textTransform: "none",
            }}
          >
            Add Complaint
          </Button> */}
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
            onClick={(e, data) => onClickTableItem(e, data)}
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

      <Dialog
        maxWidth="sm"
        fullWidth
        open={openSelect}
        onClose={onCloseSelect}
        PaperProps={{
          sx: {
            borderRadius: "0.75rem",
          },
        }}
      >
        <SelectTechnicianBox
          onCloseSelect={onCloseSelect}
          techniciansData={techniciansData}
          setOpenSelect={setOpenSelect}
          selectedComplaint={selectedComplaint}
          refetch={refetch}
        />
      </Dialog>
    </>
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

export const SelectTechnicianBox = ({
  onCloseSelect,
  techniciansData,
  setOpenSelect,
  selectedComplaint,
  refetch,
}) => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const { mutate, isUpdatingUser } = useMutation({
    mutationFn: async (technicianId) => {
      const response = await apiService({
        endpoint: `${endpoints.patchTechnician}/${selectedComplaint?._id}`,
        method: "PATCH",
        data: { technicianId },
      });
      return response;
    },
    onSuccess: (response) => {
      console.log(">>>", response);
      if (response?.response?.success) {
        refetch();
        setOpenSelect(false);
        toast.success("Technician assigned successfully!");
      }
    },
    onError: (error) => {
      toast.error("Failed to assign technician. Please try again.");
      console.error(error);
    },
  });

  const onSelectTechnician = (technician) => {
    setSelectedTechnician(technician);
  };

  const onSaveTechnician = () => {
    if (!selectedTechnician) {
      toast.error("Please select a technician!");
      return;
    }
    mutate(selectedTechnician._id);
  };

  return (
    <Stack sx={{ borderRadius: "0.625rem" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: "1rem 1.5rem" }}
      >
        <Typography sx={{ fontWeight: 600 }}>Select Technician</Typography>
        <IconButton onClick={onCloseSelect} sx={{ width: "fit-content" }}>
          <XMarkIcon
            style={{
              color: "#000",
              height: "1.25rem",
              width: "1.25rem",
              strokeWidth: 2.5,
            }}
          />
        </IconButton>
      </Stack>

      <Stack sx={{ padding: "1rem" }}>
        <Autocomplete
          disableClearable
          options={techniciansData}
          value={selectedTechnician}
          getOptionLabel={(option) => option.name || ""}
          onChange={(_, value) => onSelectTechnician(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Technician"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: "0.5rem",
                },
                "& input": {
                  border: "none",
                },
              }}
            />
          )}
          fullWidth
        />
      </Stack>

      <Stack sx={{ padding: "1rem" }}>
        <Button
          onClick={onSaveTechnician}
          variant="contained"
          disabled={isUpdatingUser || !selectedTechnician}
          sx={{
            position: "relative",
          }}
        >
          {isUpdatingUser ? "Saving..." : "Save"}
        </Button>
      </Stack>
    </Stack>
  );
};
