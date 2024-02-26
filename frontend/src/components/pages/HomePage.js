import { Container, Typography } from "@mui/material";
import { ProposalCard } from "../baseComponents/ProposalCard";
import { SearchBar } from "../baseComponents/SearchBar";

export const HomePage = () => {
  const mockArray = [1, 2, 3, 4, 5, 6];
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
        <Container sx={{ backgroundColor: "#dcdcdc", paddingTop: 2 }}>
          <SearchBar />
          <Container sx={{ minWidth: "100%" }}>{proposals}</Container>;
        </Container>
      </Container>
    </Container>
  );
};
