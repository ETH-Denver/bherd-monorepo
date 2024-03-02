import { Container, Typography, Skeleton } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import { ethDenverTheme } from "../../ethDenverTheme";
import { useEffect, useState } from "react";
import React from "react";

const chainToDeployerAddresses = (chainId) => {
  let address;
  switch (chainId) {
    case 51:
      address = process.env.REACT_APP_DEPLOYER_CONTRACT_XDC
      break;
    case 59140:
      address = process.env.REACT_APP_DEPLOYER_CONTRACT_GOERLI_LINEA
      break;
    case 5:
      address = process.env.REACT_APP_DEPLOYER_CONTRACT_GOERLI
      break;
    case 11155111:
      address = process.env.REACT_APP_DEPLOYER_CONTRACT_SEPOLIA;
      break;
    case 84532:
      address = process.env.REACT_APP_DEPLOYER_CONTRACT_BASE_SEPOLIA
      break;
  }
  return address;
}

export const HomePage = () => {
  const { chain } = useAccount();
  const [proposals, setProposals] = useState([]);
  const foo = chainToDeployerAddresses(chain.id);
  console.log('foo', foo);
  const deployerAddress = chainToDeployerAddresses(chain.id)
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
    setProposals([]);

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
