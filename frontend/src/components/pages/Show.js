import * as React from "react";
import MapIndicator from "components/baseComponents/MapIndicator";
import { useReadContract, useReadContracts } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProposalComponent } from "../baseComponents/ProposalComponent";
import { Box, Container, Stack } from "@mui/material";

export const ShowPage = () => {
  const { address } = useParams();

  const [proposal, setProposal] = useState();
  const fields = [
    "amountFunded",
    "deployer",
    "startDay",
    "lat",
    "long",
    "target",
    "message",
    "contentType",
    "fundingDeadline",
    "fundingTarget",
    "provider",
  ];
  const getContractData = (address) => {
    const calls = [];

    fields.map((field) => {
      calls.push({
        abi: Proposal.abi,
        address,
        functionName: field,
      });
    });
    return calls;
  };

  const result = useReadContracts({
    contracts: getContractData(address).flat(),
  });

  useEffect(() => {
    if (result !== undefined) {
      setProposal(result.data);
    }
  }, [result.data]);

  return result?.data ? <ProposalComponent data={proposal} /> : null;
};
