import React from "react";
import { useWriteContract } from "wagmi";
import Button from "@mui/material/Button";
import Proposal from "../../abis/Proposal.json";

export const NFTMintCard = ({ proposalAddress, isMintingEnabled }) => {
  const { writeContract } = useWriteContract();
  const mint = () => {
    writeContract({
      abi: Proposal.abi,
      address: proposalAddress,
      functionName: "mint",
    });
  };

  if (isMintingEnabled) {
    return (
      <Button
        variant={"contained"}
        sx={{
          backgroundColor: "#844aff",
          width: "fit-content",
          placeSelf: "end",
        }}
        onClick={() => {
          mint();
        }}
      >
        Mint Your NFT
      </Button>
    );
  }
};
