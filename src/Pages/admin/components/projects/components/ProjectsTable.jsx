import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import {
  PlusIcon,
  ClockIcon,
  PlayCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const ProjectsTable = ({
  projectsData,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const onNavigateToPage = () => {
    navigate(`/admin/projects/create`);
  };

  const onClickTableItem = (_e, data) => {
    console.log("data", data);
    navigate(`/admin/projects/${data?._id}`);
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((complaint) =>
      Object.values(complaint)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [projectsData, searchText]);

  const complaintsTableTitles = [
    { value: "title", label: "Title", align: "left" },
    { value: "customer_name", label: "Customer Name", align: "center" },
    { value: "total_panels", label: "Total Panels", align: "center" },
    { value: "activity", label: "Acitivity", align: "center" },
    { value: "site_location", label: "Site Location", align: "center" },
    { value: "date", label: "Date", align: "center" },
    { value: "updated_at", label: "Updated at", align: "center" },
  ];

  const complaintsRowMapping = {
    title: (data) => <Typography>{data?.title || "-"}</Typography>,
    customer_name: (data) => (
      <Typography>{data?.customerId?.name || "-"}</Typography>
    ),
    total_panels: (data) => <ProjectsPanels data={data?.panels} />,
    activity: (data) => <ProjectActivityChip activity={data?.activity} />,
    site_location: (data) => (
      <Typography>{data?.siteLocation || "-"}</Typography>
    ),
    date: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.createdAt }) || "-"}
      </Typography>
    ),
    updated_at: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.updatedAt }) || "-"}
      </Typography>
    ),
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
            Showing {filteredProjects?.length || 0} projects
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ gap: "1rem", width: "40%" }}
        >
          <SearchBox
            onChange={onChangeText}
            value={searchText}
            placeholder="Search projects"
          />
          <Button
            onClick={onNavigateToPage}
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
            Add Project
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : !isLoading && filteredProjects.length > 0 ? (
        <DataTable
          data={filteredProjects}
          tableHeaderList={complaintsTableTitles}
          rowData={complaintsRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredProjects.length / 10),
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
      ) : !isLoading && filteredProjects.length === 0 ? (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default ProjectsTable;

export const ProjectsPanels = ({ data }) => {
  const MAX_VISIBLE_PANELS = 2;

  const visiblePanels = data.slice(0, MAX_VISIBLE_PANELS);
  const hiddenPanels = data.slice(MAX_VISIBLE_PANELS);

  if (data?.length <= 0) {
    return <Typography>-</Typography>;
  }

  return (
    <Stack direction="row" spacing={1}>
      {/* Render visible panels as chips */}
      {visiblePanels.map((panel, index) => (
        <Chip key={index} label={panel} variant="outlined" />
      ))}

      {/* Render "+X" chip with a tooltip for hidden panels */}
      {hiddenPanels.length > 0 && (
        <Tooltip title={hiddenPanels.join(", ")}>
          <Chip
            label={`+${hiddenPanels.length}`}
            variant="outlined"
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
      )}
    </Stack>
  );
};

export const ProjectActivityChip = ({ activity }) => {
  console.log(">>> activity", activity);
  const getChipProps = () => {
    switch (activity) {
      case "Pending":
        return {
          label: "Pending",
          icon: <ClockIcon className="w-5 h-5 text-gray-500" />,
          color: "default",
          style: { backgroundColor: "#f3f4f6", color: "#374151" }, // Gray background
        };
      case "Ongoing":
        return {
          label: "Ongoing",
          icon: <PlayCircleIcon className="w-5 h-5 text-blue-500" />,
          color: "primary",
          style: { backgroundColor: "#e0f2fe", color: "#0284c7" }, // Light blue background
        };
      case "Completed":
        return {
          label: "Completed",
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          color: "success",
          style: { backgroundColor: "#d1fae5", color: "#065f46" }, // Light green background
        };
      default:
        return {
          label: "Unknown",
          icon: <ClockIcon className="w-5 h-5 text-gray-500" />,
          color: "default",
          style: { backgroundColor: "#f3f4f6", color: "#374151" },
        };
    }
  };

  const chipProps = getChipProps();

  return (
    <Chip
      icon={chipProps.icon}
      label={chipProps.label}
      style={chipProps.style}
    />
  );
};
