import * as React from "react";
import { Box, Button, Container, Input, Typography } from "@mui/material";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import BasicModal from "./BasicModal";
import { useState } from "react";

export const ProviderFulfillmentForm = ({ proposalAddress, handleClose }) => {
  const [proof, setProof] = useState("");
  const { writeContract } = useWriteContract();
  const linkProof = async () => {
    try {
      const response = await writeContract({
        abi: Proposal.abi,
        address: proposalAddress,
        functionName: "completeProposal",
        args: [proof],
      });

      if (response) {
        handleClose();
      }
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };
  return (
    <Box>
      <Typography
        id="modal-modal-title"
        variant="h3"
        component="h6"
        sx={{ textAlign: "center" }}
      >
        Please add a url to the proof of completion
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "fitContent",
          justifyContent: "space-between",
        }}
      >
        <Input
          sx={{ paddingLeft: "10px", marginY: 5 }}
          onChange={(e) => {
            setProof(e.target.value);
          }}
          placeholder={"https://www.youtube.com/<your extension>"}
          type={"url"}
        />
        <Button
          variant={"contained"}
          sx={{
            backgroundColor: "#844aff",
            width: "25%",
            placeSelf: "end",
          }}
          onClick={() => {
            linkProof();
          }}
        >
          Link Proof
        </Button>
      </Container>
    </Box>
  );
};
export const ProviderFulfillment = ({ url }) => {
  const proposalAddress = window.location.pathname.split("/").pop();
  const { address } = useAccount();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hasProvider = useReadContract({
    abi: Proposal.abi,
    address: proposalAddress,
    functionName: "provider",
  });

  const isButtonDisplayed = hasProvider.data === address && !url;

  if (isButtonDisplayed) {
    return (
      <BasicModal
        sx={{ marginLeft: "0px" }}
        buttonTitle="Link proof"
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        modalBody={
          <ProviderFulfillmentForm
            proposalAddress={proposalAddress}
            handleClose={handleClose}
          />
        }
      />
    );
  } else {
    return null;
  }
};
