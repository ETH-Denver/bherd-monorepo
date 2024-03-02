import React from "react";
import { useWriteContract } from "wagmi";
import Button from "@mui/material/Button";
import Proposal from "../../abis/Proposal.json";
import { navigate } from "react-router-dom";
import { ethers } from "ethers";

const NFTMintCard = (props) => {
  const proposalAddress = window.location.pathname.split("/").pop();
  const { writeContract } = useWriteContract();

  console.log("proposalAddress", proposalAddress);
  console.log("NFTMintCard props", props.proposal);

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
        const result = writeContract({
          abi: Proposal.abi,
          address: proposalAddress,
          functionName: "mint",
        });
        console.log("result", result);
      }}
    >
      Mint Your NFT
    </Button>
  );
};

export default NFTMintCard;
