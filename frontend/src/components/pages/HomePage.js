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
    const proposal = {};
    proposal.data = {};
    proposalsInfo?.data?.forEach((field, index) => {
      proposal.data[fields[index]] = field.result;
    });
    if (proposalsInfo?.data) {
      proposal.data.status = "success";
    }

    const output = [proposal];

    setProposals(output);
  }, [proposalsInfo.data]);

  console.log(proposalsInfo.data?.[1].result);

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
                console.log(proposalsInfo.data, "proposal data");
              return (
                <ProposalCard
                  data={proposal.data}
                  key={index}
                  contractAddress={proposalsInfo.data?.[1].result}
                />
              );
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
