import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Container
      disableGutters={true}
      sx={{
        minWidth: "100vw",
        backgroundColor: "#ff65af",
        display: "flex",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{ flexGrow: 1, color: "#ffff", "&:hover": { cursor: "pointer" } }}
        onClick={() => {
          navigate("/frontend");
        }}
      >
        B Herd
      </Typography>
      <w3m-button style={{ display: "flex", justifyContent: "flex-end" }} />
    </Container>
  );
};
