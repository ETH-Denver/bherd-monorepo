import { Button } from "@mui/material";

export const ProofOfAddRun = ({ fundingStatus, providerStatus, url }) => {
  if (
    fundingStatus === "Funded" &&
    providerStatus === "Provider Accepted" &&
    url
  )
    return (
      <Button>
        <a href={url}>View Proof</a>
      </Button>
    );
};
