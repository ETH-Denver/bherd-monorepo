import { Button } from "@mui/material";

export const ProofOfAddRun = ({ fundingStatus, providerStatus, url }) => {
  if (
    fundingStatus === "Funded" &&
    providerStatus === "Provider Accepted" &&
    url
  )
    return (
      <Button variant="contained" sx={{ minWidth: 200 }}>
        <a style={{ textDecoration: "none", color: "white" }} href={url}>
          View Proof
        </a>
      </Button>
    );
};
