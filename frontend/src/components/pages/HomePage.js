import { Container, Typography } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";
import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
// @ts-ignore
import Deployer from "../../abis/Deployer.json";
// @ts-ignore
import Proposal from "../../abis/Proposal.json";
import { useEffect, useState } from "react";
import React from "react";

export const HomePage = () => {
  const [proposals, setProposals] = useState([]);

  const deployerAddress = process.env.REACT_APP_DEPLOYER_CONTRACT_SEPOLIA;

  const proposalsFromContract = useReadContract({
    abi: Deployer.abi,
    address: deployerAddress,
    functionName: "getProposals",
  });

  const fields = ["amountFunded", "deployer", "startDay", "endDay", "lat", "long", "target", "message", "contentType", "fundingDeadline", "fundingTarget", "provider"]

  const getContractData = (address) => {
    const calls = [];

    fields.map(field => {
      calls.push({
        abi: Proposal.abi,
        address,
        functionName: field,
      });
    });
    return calls;
  }

  let contracts = [];
  if (proposalsFromContract && proposalsFromContract.data !== undefined) {
    for (const address of proposalsFromContract?.data) {
      contracts.push(getContractData(address));
    }
  }
  const proposalsInfo = useReadContracts({ contracts: contracts.flat() });

  useEffect(() => {
    const proposal = {};
    proposal.data = {};
    proposalsInfo?.data?.map((field, index) => {
      proposal.data[fields[index]] = field.result;

      return;
    });
    proposal.data.status = 'success';
    const output = [proposal];

    setProposals(output);
  }, [proposalsInfo.data]);

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Active Proposals</Typography>
        <Container sx={{ backgroundColor: "#dcdcdc", paddingTop: 2 }}>
          <SearchBar />
          <Container sx={{ minWidth: "100%" }}>
            {proposals?.map((proposal, index) => {
              if (proposal.data.status === "success")
                return <ProposalCard data={proposal.data} key={index} />;
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
