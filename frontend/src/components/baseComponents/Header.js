import { Box, Button, Container, Typography } from "@mui/material";
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
        minWidth: "100%",
        backgroundColor: "#ff65af",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: 4,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={EthDenverLogo}
          alt="Logo"
          style={{
            width: 100,
            paddingRight: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        />
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontSize: 76,
            fontWeight: 600,
            fontFamily: "Darker-Hanken-Grotesk",
            flexGrow: 1,
            color: "#ffff",
          }}
        >
          B Herd
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", marginRight: 4 }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/become-a-provider");
          }}
          sx={{ width: 260, backgroundColor: "#fff", marginRight: "10px" }}
        >
          Become A Provider
        </Button>
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
        <w3m-button balance="hide" style={{}} />
      </Box>
    </Container>
  );
};
