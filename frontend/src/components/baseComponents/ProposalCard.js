import { Box, Card, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

export const ProposalCard = (props) => {
  const {
    amountFunded: fundedAmount,
    fundingTarget,
    provider,
    endDay: executionDate,
    fundingDeadline: expirationDate,
    message,
    location,
    target,
  } = props.data;

  const fundingStatus =
    Number(fundedAmount) - Number(fundingTarget) > 0 ? "Funded" : "Incomplete";

  const providerStatus = provider ? "Filled" : "Unfilled";

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/show/${props.contractAddress}`)}
      sx={{
        backgroundColor: "#fff",
        borderColor: "white",
        borderStyle: "solid",
        marginY: 3,
        filter: "drop-shadow(12px 12px 0px #ff65af)",
        borderRadius: 2,
      }}
    >
      <Box>
        <Stack sx={{ textAlign: "left", paddingLeft: "2vh", paddingTop: "1vh" }}>
          <Typography sx={{ fontFamily: "Bubble", fontSize: "4vh", paddingBottom: "2vh" }}>
            {message}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ textAlign: "left", paddingLeft: "2vh", display: "flex" }}>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Intention: {target}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Location: {location}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Expiration Date: {Number(expirationDate)}
          </Typography>
          <Typography variant="h5">Execution Date: {executionDate}</Typography>
        </Stack>
        <Stack sx={{ textAlign: "right", paddingRight: "2vh", paddingBottom: "1vh", display: "flex" }}>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>Funded Amount: {`ETH ${ethers.formatEther(fundedAmount)}`}</Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>Funding Target: {`ETH ${ethers.formatEther(fundingTarget)}`}</Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>Funding Status: {fundingStatus}</Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>Provider Status: {providerStatus}</Typography>
        </Stack>
      </Box>
    </Card>
  );
};
