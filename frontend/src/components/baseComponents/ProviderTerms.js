import { Box, Button, Container, Typography } from "@mui/material";
import { ethDenverTheme } from "ethDenverTheme";
import Proposal from "../../abis/Proposal.json";
import { useWriteContract } from "wagmi";

export const ProviderTerms = ({ proposalAddress }) => {
  const { writeContract } = useWriteContract();
  const acceptProvider = async () => {
    try {
      await writeContract({
        abi: Proposal.abi,
        address: proposalAddress,
        functionName: "acceptProposal",
      });
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h3"
        component="h6"
        sx={{ paddingBottom: "20px", textAlign: "center" }}
      >
        Please Read and Review Before Accepting{" "}
      </Typography>
      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="h5"
          component="h6"
          sx={{
            paddingBottom: "20px",
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography>
          By proceeding, you acknowledge and agree to the terms outlined herein
          without any alterations. Your acceptance of these terms binds you to
          deliver the advertisement in the specified format, at the
          of the designated address on the agreed-upon target date.
        </Typography>
        <Typography sx={{ paddingY: 2 }}>
          Once the advertisement, as provided by the customer, has been run, it
          is your responsibility as the provider to present sufficient evidence
          to prove that the advertisement was run as detailed in this proposal.
          You are obligated to present the advertisement as provided by
          funding members of the respective campaign within reason. 
        </Typography>
        <Typography>
          Failure to comply may result in revocation of provider status on the platform, in addition to remedy at law. Your acceptance of these
          terms signifies your understanding and commitment to providing a good faith effort of fulfilling the
          obligations outlined above.
        </Typography>
      </Box>
      <Button
        variant={"contained"}
        sx={{
          backgroundColor: ethDenverTheme.palette.primary.main,
          minWidth: 200,
          placeSelf: "end",
          marginTop: 3,
        }}
        onClick={() => {
          acceptProvider();
        }}
      >
        Accept Proposal
      </Button>
    </Container>
  );
};
