import { Box, Button, Modal } from "@mui/material";
import { useAccount, useReadContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import Deployer from "../../abis/Deployer.json";
import { ethDenverTheme } from "../../ethDenverTheme";
import { useState } from "react";
import { ProviderTerms } from "./ProviderTerms";
import BasicModal from "./BasicModal";

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
      <BasicModal
        sx={{ marginLeft: "0px" }}
        buttonTitle="Accept Proposal"
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        modalBody={<ProviderTerms />}
      />
    );
  }
};
