import { Container, Typography, Skeleton } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";
import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import { ethDenverTheme } from "../../ethDenverTheme";
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
  const { data } = useReadContracts({ contracts: contracts.flat() });
  const renderProposals = () => {
    if (!data) {
      return [...Array(4)].map((array, index) => (
        <Skeleton
          sx={{
            marginY: 1,
            borderRadius: 2,
          }}
          variant="rectangular"
          width={"100%"}
          height={200}
          key={`skeleton-${index}`}
        />
      ));
    }
    return proposals?.map((proposal, index) => {
      if (proposal.status === "success") {
        return <ProposalCard proposal={proposal} key={`proposal-${index}`} />;
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    setProposals([]);

    if (data) {
      const chunkSize = fields.length;
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);

        const proposal = {};

        chunk.map((field, index) => {
          proposal[fields[index]] = field.result;
        });
        const contractAddressIndex = i === 0 ? 0 : i / fields.length;
        proposal.status = "success";
        proposal.proposalAddress =
          proposalsFromContract.data[contractAddressIndex];
        setProposals((proposals) => [...proposals, proposal]);
      }
    }
  }, [data]);

  return (
    <Container>
      <Container
        id={"2nd-container"}
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          paddingY: "10vh",
        }}
      >
        <Container
          sx={{
            backgroundColor: ethDenverTheme.palette.secondary.main,
            paddingY: "4vh",
            minHeight: "80vh",
            borderRadius: 2,
            marginY: 0,
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Hanken-Grotesk-Regular",
              fontWeight: "bold",
              color: "#fff",
              marginY: 4,
            }}
          >
            Active Proposals
          </Typography>
          <Container sx={{ minWidth: "100%" }}>{renderProposals()}</Container>
        </Container>
      </Container>
    </Container>
  );
};
