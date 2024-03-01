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

  let contracts = [];
  if (proposalsFromContract && proposalsFromContract.data !== undefined) {
    for (const address of proposalsFromContract?.data) {
      contracts.push({
        abi: Proposal.abi,
        address,
        functionName: "getProposalInfo",
      });
    }
  }

  // @ts-ignore
  const proposalsInfo = useReadContracts({ contracts });


  useEffect(() => {
    const proposalsData = proposalsInfo?.data?.map((proposal) => {
      return proposal;
    });
    setProposals(proposalsData);
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
        <CreateButton />
        <Container sx={{ backgroundColor: "#dcdcdc", paddingTop: 2 }}>
          <SearchBar />
          <Container sx={{ minWidth: "100%" }}>
            {proposals?.map((proposal, index) => {
              if (proposal.status === "success")
                return <ProposalCard data={proposal.result} key={index} />;
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
