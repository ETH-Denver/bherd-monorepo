import * as React from "react";
import MapIndicator from "components/baseComponents/MapIndicator";
import { useReadContract, useReadContracts } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProposalComponent } from "../baseComponents/ProposalComponent";
import { Box, Container, Stack, Typography } from "@mui/material";
import BaseLayout from "components/layouts/BaseLayout";
import { Loader } from "components/baseComponents/Loader";

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
    "proposer",
    "url",
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

  const { data, error, isLoading } = useReadContracts({
    contracts: getContractData(address).flat(),
  });

  useEffect(() => {
    setProposal(data);
  }, [data]);

  if (error) {
    console.log(error);
  } else if (proposal && !isLoading) {
    return <BaseLayout children={<ProposalComponent data={proposal} />} />;
  } else {
    return <BaseLayout children={<Loader />} />;
  }

  // return result?.data ? <ProposalComponent data={proposal} /> : null;
};
