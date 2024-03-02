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

  console.log("address", address);
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
  // const {
  //   data: proposalContract,
  //   error,
  //   loading,
  // } = useReadContract({
  //   abi: Proposal.abi,
  //   address: address,
  //   functionName: "getProposalInfo",
  // });
  const result = useReadContracts({
    contracts: getContractData(address).flat(),
  });

  console.log(getContractData(address), "getContract");
  // if (error) {
  //   console.log("alert", error);
  // }
  useEffect(() => {
    console.log("result", result);
    // console.log(data);
    if (result !== undefined) {
      console.log("hereerere");
      console.log("dataaaaaaaaahhhhh", result.data);
      setProposal(result.data);
    }
  }, [result.data]);

  return result?.data ? <ProposalComponent data={proposal} /> : null;
};
