import * as React from "react";
import { Button, Container, Input, InputAdornment } from "@mui/material";
import { ethers } from "ethers";
import { useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import { ethDenverTheme } from "../../ethDenverTheme";
import { useEffect } from "react";

export const ContributeForm = ({ amountRemaining, handleClose }) => {
  const proposalAddress = window.location.pathname.split("/").pop();
  const { writeContract, data } = useWriteContract();
  const [amount, setAmount] = React.useState("1.0");
  const contribute = async () => {
    try {
      const response = await writeContract({
        abi: Proposal.abi,
        address: proposalAddress,
        functionName: "contribute",
        gasLimit: 42069n,
        value: ethers.parseEther(amount),
      });
      if (response) {
        console.log(response);
        handleClose();
      }
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  useEffect(() => {
    if (data) {
      handleClose();
    }
  }, [data, handleClose]);

  return (
    <Container
      sx={{
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
        />
      </InputAdornment>
      <Button
        variant={"contained"}
        sx={{
          backgroundColor: ethDenverTheme.palette.primary.main,
          color: "white",
          width: "25%",
          placeSelf: "end",
        }}
        onClick={() => {
          contribute();
        }}
      >
        Contribute
      </Button>
    </Container>
  );
};
