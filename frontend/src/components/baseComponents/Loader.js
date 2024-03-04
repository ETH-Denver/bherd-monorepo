import { Container, Typography } from "@mui/material";
import { HashLoader } from "react-spinners";
import { ethDenverTheme } from "ethDenverTheme";

export const Loader = () => {
  return (
    <Container
      sx={{
        minHeight: "90vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: ethDenverTheme.palette.primary.main,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", marginTop: "20%" }}>
        Loading
      </Typography>
      <HashLoader color="#36d7b7" />
    </Container>
  );
};
