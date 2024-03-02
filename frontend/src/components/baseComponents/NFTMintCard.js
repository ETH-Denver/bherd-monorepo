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
    <div>
      <h1>Oh Sh*t! You Mint!</h1>
      <p></p>
      <Button
        variant={"contained"}
        sx={{ backgroundColor: "#844aff", width: "25%", placeSelf: "end" }}
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
        Mint!
      </Button>
    </div>
  );
};

export default NFTMintCard;
