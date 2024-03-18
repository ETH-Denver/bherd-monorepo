import { Button } from "@mui/material";

export const ProofOfAddRun = ({ fundingStatus, providerStatus, url }) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  if (
    fundingStatus === "Funded" &&
    providerStatus === "Provider Accepted" &&
    url
  )
    return (
      <Button
        role="link"
        onClick={() => openInNewTab(url)}
        variant="contained"
        sx={{ minWidth: 200 }}
      >
        View Proof
      </Button>
    );
};
