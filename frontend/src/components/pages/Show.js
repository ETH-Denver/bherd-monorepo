import * as React from "react";
import MapIndicator from "components/baseComponents/MapIndicator";
import { useReadContract } from 'wagmi'
import Proposal from "../../abis/Proposal.json";
import {useEffect, useState} from "react";
import { useParams }  from "react-router-dom";
import {ProposalComponent} from "../baseComponents/ProposalComponent";
import {Box, Container, Stack} from "@mui/material";

export const ShowPage = () => {
    const { address } = useParams();
    const [proposal, setProposal] = useState();
    const proposalContract = useReadContract({
        abi: Proposal.abi,
        address: address,
        functionName: 'getProposalInfo',
    })

    useEffect(() => {
        if (proposalContract && proposalContract.data !== undefined) {
            setProposal(proposalContract.data)
        }
    }, [proposalContract.data]);

  return (
    proposal ? <ProposalComponent data={proposal}/> : null
  );
};
