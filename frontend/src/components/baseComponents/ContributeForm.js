import * as React from 'react';
import { Button, Input, InputAdornment } from '@mui/material';
import { ethers } from "ethers";
import { useWriteContract } from 'wagmi'
import Proposal from "../../abis/Proposal.json";
import { useNavigate } from "react-router-dom";

const ContributeButton = () => {
    const navigate = useNavigate();
    const proposalAddress = "0x3ea2f7E5d218D497C1Ad3E4093Cfe336af8c2470";
    const { writeContract } = useWriteContract();
    const [amount, setAmount] = React.useState("")

    return (
        <form style={{ display: "flex", flexDirection: "column", height: "fitContent", justifyContent: "space-between" }}>
            <InputAdornment
                position="start"
            >GWEI
                <Input onChange={(e) => { setAmount(e.target.value) }} defaultValue={"000"} type={'integer'}></Input>
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
                    navigate("/frontend")
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
