import { Container, Typography, Skeleton } from "@mui/material";
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

  let contracts = [];
  if (proposalsFromContract && proposalsFromContract.data !== undefined) {
    for (const address of proposalsFromContract?.data) {
      contracts.push(getContractData(address));
    }
  }
  const proposalsInfo = useReadContracts({ contracts: contracts.flat() });

  useEffect(() => {
    if (proposalsInfo?.data) {
      const chunkSize = fields.length;
      for (let i = 0; i < proposalsInfo.data.length; i += chunkSize) {
        const chunk = proposalsInfo.data.slice(i, i + chunkSize);

        const proposal = {};
        proposal.data = {};

        chunk.map((field, index) => {
          proposal.data[fields[index]] = field.result;
        });
        const contractAddressIndex = i === 0 ? 0 : i / fields.length;
        proposal.data.status = "success";
        proposal.data.proposalAddress =
          proposalsFromContract.data[contractAddressIndex];
        setProposals((proposals) => [...proposals, proposal]);
      }
    }
  }, [proposalsInfo.data]);

  console.log(proposals);

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
          <Container sx={{ minWidth: "100%" }}>
            {!proposalsInfo.data &&
              [...Array(4)].map((array) => (
                <Skeleton
                  sx={{
                    marginY: 1,
                    borderRadius: 2,
                  }}
                  variant="rectangular"
                  width={"100%"}
                  height={200}
                />
              ))}
            {proposals?.map((proposal, index) => {
              if (proposal.data.status === "success")
                console.log(proposal.data.proposalAddress, "proposal data");
              return (
                <ProposalCard
                  data={proposal.data}
                  key={index}
                  contractAddress={proposal.data.proposalAddress}
                />
              );
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
