import * as React from "react";
import { Button, Input, InputAdornment } from "@mui/material";
import { ethers } from "ethers";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import Deployer from "../../abis/Deployer.json";
import { useNavigate } from "react-router-dom";

const ProviderAcceptButton = (props) => {
    const { fundingStatus } = props;
    const navigate = useNavigate();
    const proposalAddress = window.location.pathname.split("/").pop();
    const { writeContract } = useWriteContract();
    const [amount, setAmount] = React.useState("");
    const { address } = useAccount();

    const isProvider = useReadContract({
        abi: Deployer.abi,
        address: process.env.REACT_APP_DEPLOYER_CONTRACT_SEPOLIA,
        functionName: "isProvider",
        args: [address]
    });

    const hasProvider = useReadContract({
        abi: Proposal.abi,
        address: proposalAddress,
        functionName: "provider",
    });

    const isButtonDisplayed = hasProvider?.data === undefined && isProvider && fundingStatus === 'Funded';

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
                sx={{ backgroundColor: "#844aff", width: "25%", placeSelf: "end", display: isButtonDisplayed ? "block" : "none" }}
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
                Provide proof of execution
            </Button>
        </form>
    );
};

export default ProviderAcceptButton;
