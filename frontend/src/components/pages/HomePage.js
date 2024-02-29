import { Container, Typography } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";
import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [proposals, setProposals] = useState([]);
  const deployerAddress = "0x2A354874631Dc2Dc09f6Ff240f19b11fe83D6720";
  const proposalAddress = "0x3ea2f7E5d218D497C1Ad3E4093Cfe336af8c2470";
  const mockArray = [1, 2, 3, 4, 5, 6];

  const proposalsFromContract = useReadContract({
    abi: Deployer.abi,
    address: deployerAddress,
    functionName: 'getProposals',
  })

  let contracts = [];
  if (proposalsFromContract && proposalsFromContract.data !== undefined) {
    for (const address of proposalsFromContract?.data) {
      contracts.push({ abi: Proposal.abi, address, functionName: 'getProposalInfo' })
    }
  }

  const proposalsInfo = useReadContracts({ contracts });

  const CreateButton = () => {
    const { writeContract } = useWriteContract()

    return (
      <button
        onClick={() => {
          console.log("test")
          writeContract({

            abi: Deployer.abi,
            address: deployerAddress,
            functionName: 'createProposal',
            args: [
              42,
              42,
              42,
              42,
              "foo",
              "skywriter",
              "foo"
            ],
          })
        }
        }
      >
        CreateProposal
      </button>
    )
  }

  useEffect(() => {
    const proposalsData = proposalsInfo?.data?.map((proposal) => {
      return proposal
    }

    );
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
        <w3m-button />
        <CreateButton />
        <Container sx={{ backgroundColor: "#dcdcdc", paddingTop: 2 }}>
          <SearchBar />
          <Container sx={{ minWidth: "100%" }}>
            {
              proposals?.map((proposal, index) => {
                if (proposal.status == "success")
                  return < ProposalCard
                    data={proposal.result}
                    key={index}
                  />
              })
            }
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
