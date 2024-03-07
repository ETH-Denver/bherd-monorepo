import * as React from "react";
import { Button } from "@mui/material";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import Deployer from "../../abis/Deployer.json";
import { useNavigate } from "react-router-dom";
import { ethDenverTheme } from "../../ethDenverTheme";

const ProviderAcceptButton = (props) => {
  const { fundingStatus } = props;
  const navigate = useNavigate();
  const proposalAddress = window.location.pathname.split("/").pop();
  const { writeContract } = useWriteContract();
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
    hasProvider?.data === '0x0000000000000000000000000000000000000000' &&
    isProvider.data &&
    fundingStatus === "Funded";
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        height: "fitContent",
        justifyContent: "space-between",
      }}
    >
      <Button
        variant={"contained"}
        sx={{
          backgroundColor: ethDenverTheme.palette.primary.main,
          width: "fit-content",
          placeSelf: "end",
          display: isButtonDisplayed ? "block" : "none",
        }}
        onClick={(e) => {
          e.preventDefault();
          writeContract({
            abi: Proposal.abi,
            address: proposalAddress,
            functionName: "acceptProposal",
          });
          navigate(`/show/${proposalAddress}`);
        }}
      >
        Accept Proposal
      </Button>
    </form>
  );
};

export default ProviderAcceptButton;
