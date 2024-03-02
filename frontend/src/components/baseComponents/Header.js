import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import EthDenverLogo from "../../asssets/ethdenver-spork-logo-transparent.png";

export const Header = () => {
  const account = useAccount();
  const navigate = useNavigate();

  return (
    <Container
      disableGutters={true}
      sx={{
        minWidth: "100vw",
        backgroundColor: "#ff65af",
        display: "flex",
        alignItems: "center",
        height: "13vh",
        "&:hover": { cursor: "pointer" },
      }}
      onClick={() => {
        navigate("/frontend");
      }}
    >
      <img
        src={EthDenverLogo}
        alt="Logo"
        style={{
          width: "7vh",
          paddingLeft: "5vh",
          paddingRight: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      />

      <Typography
        variant="h2"
        component="div"
        sx={{
          fontSize: "8vh",
          fontWeight: 600,
          fontFamily: "Darker-Hanken-Grotesk",
          flexGrow: 1,
          color: "#ffff",
          "&:hover": { cursor: "pointer" },
        }}
      >
        B Herd
      </Typography>
      <Container
        sx={{ display: "flex", flexDirection: "row", width: "fit-content" }}
      >
        {account && account.address && (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/create");
            }}
            sx={{ width: 260, backgroundColor: "#fff", marginRight: "10px" }}
          >
            Create Proposal
          </Button>
        )}
        <w3m-button style={{ display: "flex", justifyContent: "flex-end" }} />
      </Container>
    </Container>
  );
};
