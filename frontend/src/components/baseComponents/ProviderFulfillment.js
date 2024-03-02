import * as React from "react";
import { Button, Input, InputAdornment } from "@mui/material";
import { ethers } from "ethers";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import { useNavigate } from "react-router-dom";

const ProviderFulfillment = () => {
    const navigate = useNavigate();
    const proposalAddress = window.location.pathname.split("/").pop();
    const { writeContract } = useWriteContract();
    const [url, setUrl] = React.useState("");
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

    const isButtonDisplayed = hasProvider?.data === undefined && isProvider;

    return (
        <form
            style={{
                display: isButtonDisplayed ? "flex" : "none",
                flexDirection: "column",
                height: "fitContent",
                justifyContent: "space-between",
            }}
        >
            <Input
                sx={{ paddingLeft: "10px" }}
                onChange={(e) => {
                    setUrl(e.target.value);
                }}
                placeholder={"Enter the URL of the proving document"}
                type={"url"}
            ></Input>

            <Button
                variant={"contained"}
                sx={{ backgroundColor: "#844aff", width: "25%", placeSelf: "end" }}
                onClick={(e) => {
                    e.preventDefault();
                    writeContract({
                        abi: Proposal.abi,
                        address: proposalAddress,
                        functionName: "completeProposal",
                        args: [url]
                    });
                    navigate("/show/" + proposalAddress);
                }}
            >
                Link Proof
            </Button>
        </form>
    );
};

export default function ProviderFulfillmentForm() {
    return (
        <div>
            <ProviderFulfillment></ProviderFulfillment>
        </div>
    );
}
