import { Container, Typography } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";
import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import Deployer from "../../abis/Deployer.json";
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
        <Container
          sx={{
            backgroundColor: "#d7d3d3",
            paddingTop: 2,
            minHeight: "90vh",
            borderRadius: 2,
            marginY: 0,
            overflowY: "scroll",
          }}
        >
          <SearchBar />
          <Container sx={{ minWidth: "100%", maxHeight: "90vh" }}>
            {proposals?.map((proposal, index) => {
              if (proposal.status === "success")
                return (
                  <ProposalCard
                    data={proposal.result}
                    key={index}
                    contractAddress={contracts[index]["address"]}
                  />
                );
            })}
            {proposals?.map((proposal, index) => {
              if (proposal.status === "success")
                return (
                  <ProposalCard
                    data={proposal.result}
                    key={index}
                    contractAddress={contracts[index]["address"]}
                  />
                );
            })}
            {proposals?.map((proposal, index) => {
              if (proposal.status === "success")
                return (
                  <ProposalCard
                    data={proposal.result}
                    key={index}
                    contractAddress={contracts[index]["address"]}
                  />
                );
            })}
            {proposals?.map((proposal, index) => {
              if (proposal.status === "success")
                return (
                  <ProposalCard
                    data={proposal.result}
                    key={index}
                    contractAddress={contracts[index]["address"]}
                  />
                );
            })}
            {proposals?.map((proposal, index) => {
              if (proposal.status === "success")
                return (
                  <ProposalCard
                    data={proposal.result}
                    key={index}
                    contractAddress={contracts[index]["address"]}
                  />
                );
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
