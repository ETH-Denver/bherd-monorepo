import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import Deployer from "../../abis/Deployer.json";
import { ethDenverTheme } from "../../ethDenverTheme";
import { useState } from "react";

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
      <Box>
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
          run the advertisement for the specified funding target amount, in view
          of the designated address on the agreed-upon target date.
        </Typography>
        <Typography sx={{ paddingY: 2 }}>
          Once the advertisement, as provided by the customer, has been run, it
          is your responsibility as the provider to present sufficient evidence
          to prove that the advertisement was run as detailed in this proposal.
          You are obligated to present the advertisement exactly as provided by
          funding members of the respective campaign.
        </Typography>
        <Typography>
          Failure to comply may result in the loss of privileges to utilize the
          platform, as well as potential legal consequences to recover funds
          necessary for reimbursing affected customers. Your acceptance of these
          terms signifies your understanding and commitment to fulfilling the
          obligations outlined above.
        </Typography>
      </Box>
      <Button
        variant={"contained"}
        sx={{
          backgroundColor: ethDenverTheme.palette.primary.main,
          minWidth: 200,
          placeSelf: "end",
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

export const ProviderAcceptButton = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { fundingStatus } = props;
  const proposalAddress = window.location.pathname.split("/").pop();
  const { address } = useAccount();
  const isProvider = useReadContract({
    abi: Deployer.abi,
    address: process.env.REACT_APP_DEPLOYER_CONTRACT_SEPOLIA,
    functionName: "isProvider",
    args: [address],
  });
  const hasProvider = useReadContract({
    abi: Proposal.abi,
    address: proposalAddress,
    functionName: "provider",
  });
  const isButtonDisplayed =
    hasProvider?.data === "0x0000000000000000000000000000000000000000" &&
    isProvider.data &&
    fundingStatus === "Funded";
  if (isButtonDisplayed) {
    return (
      <Box>
        <Button
          sx={{
            backgroundColor: ethDenverTheme.palette.primary.main,
            color: "white",
            minWidth: 200,
          }}
          variant="contained"
          onClick={handleOpen}
        >
          Accept Proposal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              height: "40vh",
              width: "60vw",
              overflowY: "scroll",
            }}
          >
            <ProviderTerms />
          </Box>
        </Modal>
      </Box>
    );
  }
};
