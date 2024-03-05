import React from "react";
import { useWriteContract } from "wagmi";
import Button from "@mui/material/Button";
import Proposal from "../../abis/Proposal.json";

const NFTMintCard = ({ proposalAddress, fundingStatus, providerStatus }) => {
  const { writeContract } = useWriteContract();
  if (fundingStatus === "Funded" && providerStatus === "Provider Accepted") {
    return (
      <Button
        variant={"contained"}
        sx={{
          backgroundColor: "#844aff",
          width: "fit-content",
          placeSelf: "end",
        }}
        onClick={(e) => {
          e.preventDefault();
          writeContract({
            abi: Proposal.abi,
            address: proposalAddress,
            functionName: "mint",
          });
        }}
      >
        Mint Your NFT
      </Button>
    );
  }
};

export default NFTMintCard;
