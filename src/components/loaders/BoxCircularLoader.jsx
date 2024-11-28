import { useTheme, Stack, CircularProgress } from "@mui/material";

const BoxCircularLoader = ({ sx, loaderSx }) => {
  const theme = useTheme();
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, ...sx }}>
      <CircularProgress
        size={36}
        thickness={4}
        sx={{ color: "#fa2929", ...loaderSx }}
      />
    </Stack>
  );
};

export default BoxCircularLoader;
