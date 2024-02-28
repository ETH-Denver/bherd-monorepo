import { Container, Typography } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";
import { useReadContract, useWriteContract } from 'wagmi'
import Deployer from "../../abis/Deployer.json";

export const HomePage = () => {
  const deployerAddress = "0x6d6E4bEec48F68417c2f71DDeFBeD0D220882ff4";
  const proposalAddress = "0x3ea2f7E5d218D497C1Ad3E4093Cfe336af8c2470";
  const mockArray = [1, 2, 3, 4, 5, 6];
  console.log('Deployer', Deployer);
  const result = useReadContract({
    abi: Deployer.abi,
    address: proposalAddress,
    functionName: 'IsProvider',
    args: ["0x899449b7b0ff11b4987caE94BfefA19F38C5184E"]
  })
  const proposalsFromContract = useReadContract({
    abi: Deployer.abi,
    address: deployerAddress,
    functionName: 'GetProposals',
  })

  console.log('proposals', proposalsFromContract)
  const CreateButton = () => {
    const { writeContract } = useWriteContract()

    return (
      <button
        onClick={() => {
          console.log("test")
          writeContract({

            abi: Deployer.abi,
            address: deployerAddress,
            functionName: 'CreateProposal',
            args: [
              42,
              42,
              42,
              42,
              "foo",
              true,
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

  const proposals = mockArray.map((item) => (
    <ProposalCard
      fundedAmount={5000}
      fundingTarget={15000}
      provider={true}
      executionDate={"02/29/24"}
      expirationDate={"02/28/24"}
      location={"Denver, CO"}
    />
  ));

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
        {/* <Typography variant="h3">{{ proposalsFromContract.map((x) => x.address) }}</Typography> */}
        <w3m-button />
        <CreateButton />
        <Container sx={{ backgroundColor: "#dcdcdc", paddingTop: 2 }}>
          <SearchBar />
          <Container sx={{ minWidth: "100%" }}>{proposals}</Container>;
        </Container>
      </Container>
    </Container>
  );
};
