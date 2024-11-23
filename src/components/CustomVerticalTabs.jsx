import { Stack, Box, Tooltip, Typography } from "@mui/material";
import { cloneElement } from "react";

const CustomVerticalTabs = ({
  title,
  currentMenu,
  menuLists,
  listSx,
  titleBoxSx,
  boxSx,
  labelBoxSx,
  onClick,
}) => {
  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        minWidth: "200px",
        ...boxSx,
      }}
    >
      {title && (
        <Stack
          sx={{
            paddingBottom: "1rem",
            borderBottom: `1px solid #012687`,
            marginBottom: "1rem",
            ml: "1.5rem",
            ...titleBoxSx,
          }}
        >
          <Typography
            sx={{ fontWeight: 600, color: "red", fontSize: "1.5rem" }}
          >
            {title}
          </Typography>
        </Stack>
      )}

      <Stack sx={{ gap: "1rem", ...listSx }}>
        {menuLists?.length > 0 &&
          menuLists.map((list) => (
            <Tooltip
              key={list.value}
              title={
                !list.access
                  ? `You don't have permission to edit ${
                      list.label.toLowerCase() || ""
                    }`
                  : ""
              }
            >
              <Box
                onClick={() => {
                  if (onClick) {
                    onClick(list.value, list.access, list.navigate);
                  }
                }}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  direction: "row",
                  alignItems: "center",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  backgroundColor:
                    list.value === currentMenu ? "#E9EFFF" : "#fff",
                  color: list.value === currentMenu ? "#616ADA" : "#555770",

                  cursor: !list.access ? "not-allowed" : "pointer",
                  "&:hover": {
                    backgroundColor:
                      list.value === currentMenu ? "#E9EFFF" : "#F7F7FD",
                  },
                  ...labelBoxSx,
                }}
              >
                {list.icon &&
                  cloneElement(list.icon, {
                    className: "h-5 w-5",
                    style: {
                      strokeWidth: 2,
                      color: list.value === currentMenu ? "#616ADA" : "#555770",
                    },
                  })}
                <Typography sx={{ fontWeight: 600 }}>{list.label}</Typography>
              </Box>
            </Tooltip>
          ))}
      </Stack>
    </Stack>
  );
};

export default CustomVerticalTabs;
