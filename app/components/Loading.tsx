import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      component="div"
      mt={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={80} thickness={2} color="primary" />
    </Box>
  );
};
export default Loading;
