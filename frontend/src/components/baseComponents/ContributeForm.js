import * as React from 'react';
import { Button, Input, InputAdornment } from '@mui/material';
import { ethers } from "ethers";
import { useWriteContract } from 'wagmi'
import Proposal from "../../abis/Proposal.json";
import { useNavigate } from "react-router-dom";

const ContributeButton = () => {
  const navigate = useNavigate();
  let proposalAddress = window.location.pathname.split("/").pop()
  const { writeContract } = useWriteContract();
  const [amount, setAmount] = React.useState("")
  console.log('proposalAddress', proposalAddress)
  return (
    <form style={{ display: "flex", flexDirection: "column", height: "fitContent", justifyContent: "space-between" }}>
      <InputAdornment
        position="start"
      >ETH
        <Input sx={{paddingLeft: "10px"}} onChange={(e) => { setAmount(e.target.value) }} defaultValue={"1.0"} type={'integer'}></Input>
      </InputAdornment>

      <Button
        variant={"contained"}
        sx={{ backgroundColor: "#844aff", width: "25%", placeSelf: "end" }}
        onClick={(e) => {
          console.log('amount', amount)
          e.preventDefault();
          writeContract({
            abi: Proposal.abi,
            address: proposalAddress,
            functionName: 'contribute',
            gasLimit: 42069n,
            value: ethers.parseEther(amount),
          })
          navigate("/show/" + proposalAddress)
        }
        }
      >
        Contribute
      </Button >
    </form >
  )
}


export default function ContributeForm() {
    return (
        <div>
            <ContributeButton></ContributeButton>
        </div>
    );
}
