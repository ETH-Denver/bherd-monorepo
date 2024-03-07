import * as React from "react";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import { useNavigate } from "react-router-dom";
import { ethDenverTheme } from "ethDenverTheme";

const ProviderFulfillment = () => {
  const navigate = useNavigate();
  const proposalAddress = window.location.pathname.split("/").pop();
  const { writeContract } = useWriteContract();
  const [url, setUrl] = React.useState("");
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

  const isButtonDisplayed = hasProvider.data === address;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (isButtonDisplayed) {
    return (
      <Box>
        <Button
          sx={{
            backgroundColor: ethDenverTheme.palette.primary.main,
            color: "white",
          }}
          variant="contained"
          onClick={handleOpen}
        >
          Link Proof
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
              height: "70vh",
              width: "60vw",
              overflow: "scroll",
              textAlign: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h6"
              sx={{ paddingBottom: "20px" }}
            >
              Please add a url to the proof of completion
            </Typography>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                height: "fitContent",
                justifyContent: "space-between",
              }}
            >
              <Input
                sx={{ paddingLeft: "10px", marginBottom: "20px" }}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                placeholder={"https://www.youtube.com/<your extension>"}
                type={"url"}
              ></Input>

              <Button
                variant={"contained"}
                sx={{
                  backgroundColor: "#844aff",
                  width: "25%",
                  placeSelf: "end",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  writeContract({
                    abi: Proposal.abi,
                    address: proposalAddress,
                    functionName: "completeProposal",
                    args: [url],
                  });
                  navigate("/show/" + proposalAddress);
                  handleClose();
                }}
              >
                Link Proof
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    );
  } else {
    return null;
  }
};

export default function ProviderFulfillmentForm() {
  return (
    <div>
      <ProviderFulfillment></ProviderFulfillment>
    </div>
  );
}
