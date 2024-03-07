import * as React from "react";
import { Button, Container } from "@mui/material";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import Deployer from "../../abis/Deployer.json";
import { ethDenverTheme } from "../../ethDenverTheme";

export const ProviderAcceptButton = (props) => {
  const { fundingStatus } = props;
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
    hasProvider?.data === "0x0000000000000000000000000000000000000000" &&
    isProvider.data &&
    fundingStatus === "Funded";

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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "fitContent",
        justifyContent: "space-between",
      }}
    >
      {isButtonDisplayed && (
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
      )}
    </Container>
  );
};
