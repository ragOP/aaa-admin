import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { apiService } from "../../../../utils/backend/apiService";
import { endpoints } from "../../../../utils/backend/endpoints";
import { useState } from "react";
import ProjectsStats from "./components/ProjectsStats";
import ProjectsTable from "./components/ProjectsTable";

const Projects = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data: projectsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projectsApiResponse = await apiService({
        endpoint: endpoints.project,
        method: "GET",
      });
      return projectsApiResponse?.response?.data?.projects || [];
    },
  });

  const statsData = [
    { label: "Total Projects", total_number: projectsData?.length || 0 },
    // {
    //   label: "Active Projects",
    //   total_number:
    //     projectsData?.filter((project) => project?.active)?.length || 0,
    // },
    // {
    //   label: "Inactive Projects",
    //   total_number:
    //     projectsData?.filter((project) => !project?.active)?.length || 0,
    // },
  ];

  if (isError) {
    return <Typography>Error loading projects</Typography>;
  }

  return (
    <Stack
      sx={{
        gap: "1rem",
        padding: "1rem",
        height: "100%",
        overflow: "auto",
      }}
    >
      <ProjectsStats statsData={statsData} isLoading={isLoading} />

      <ProjectsTable
        projectsData={projectsData}
        isLoading={isLoading}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </Stack>
  );
};

export default Projects;
