import * as React from "react";
import { Button, Input, InputAdornment } from "@mui/material";
import { ethers } from "ethers";
import { useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import { useNavigate } from "react-router-dom";
import { ethDenverTheme } from "../../ethDenverTheme";

const ContributeButton = ({ amountRemaining }) => {
  console.log(amountRemaining);
  const navigate = useNavigate();
  const proposalAddress = window.location.pathname.split("/").pop();
  const { writeContract } = useWriteContract();
  const [amount, setAmount] = React.useState("1.0");

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        height: "fitContent",
        justifyContent: "space-between",
      }}
    >
      <InputAdornment position="start">
        ETH
        <Input
          sx={{ paddingLeft: "10px" }}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          defaultValue={1.0 - amountRemaining}
          type={"integer"}
        ></Input>
      </InputAdornment>

      <Button
        variant={"contained"}
        sx={{ backgroundColor: ethDenverTheme.palette.primary.main, color: "white", width: "25%", placeSelf: "end" }}
        onClick={(e) => {
          e.preventDefault();
          writeContract({
            abi: Proposal.abi,
            address: proposalAddress,
            functionName: "contribute",
            gasLimit: 42069n,
            value: ethers.parseEther(amount),
          });
          navigate(`/show/${proposalAddress}`);
        }}
      >
        Contribute
      </Button>
    </form>
  );
};

export default function ContributeForm({ amountRemaining }) {
  return (
    <div>
      <ContributeButton amountRemaining={amountRemaining}></ContributeButton>
    </div>
  );
}
