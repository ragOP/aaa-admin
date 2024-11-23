import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const DataCard = ({ info, labelProps, dataProps, boxSx }) => {
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "1rem",
        ...boxSx,
      }}
    >
      <Stack sx={{ gap: "0.5rem" }}>
        <Typography {...labelProps}>{info?.label}</Typography>
        <Stack
          sx={{
            gap: "0.5rem",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: 500 }}
            {...dataProps}
          >
            {info?.total_number}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DataCard;
