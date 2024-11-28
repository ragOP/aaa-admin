import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import { PlusIcon } from "@heroicons/react/24/outline";

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
    { value: "name", label: "Name", align: "left" },
    { value: "username", label: "Username", align: "center" },
    { value: "employee_id", label: "Employee Id", align: "center" },
    { value: "email", label: "Email", align: "center" },
    { value: "date", label: "Date", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.name || "-"}</Typography>,
    username: (data) => <Typography>{data?.userName || "-"}</Typography>,
    employee_id: (data) => <Typography>{data?.employeeId || "-"}</Typography>,
    email: (data) => <Typography>{data?.email || "-"}</Typography>,
    date: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.createdAt }) || "-"}
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
