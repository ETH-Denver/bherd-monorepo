import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { geocode, RequestType, setKey } from "react-geocode";

export const ProposalCard = ({ proposal }) => {
  const {
    amountFunded,
    fundingTarget,
    provider,
    startDay,
    fundingDeadline,
    message,
    lat,
    long,
    target,
    proposalAddress,
  } = proposal;

  const [address, setAddress] = React.useState("");
  const fundingStatus =
    Number(amountFunded) - Number(fundingTarget) > 0 ? "Funded" : "Incomplete";
  const providerStatus = provider ? "Filled" : "Unfilled";

  const navigate = useNavigate();
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };

  setKey(process.env.REACT_APP_GOOGLE_API);
  geocode(RequestType.LATLNG, `${lat},${long}`)
    .then(({ results }) => {
      const address = results[0].formatted_address;
      setAddress(address);
    })
    .catch(console.error);

  return (
    <Card
      onClick={() => navigate(`/show/${proposalAddress}`)}
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
        <Stack
          sx={{ textAlign: "left", paddingLeft: "2vh", paddingTop: "1vh" }}
        >
          <Typography
            sx={{ fontFamily: "Bubble", fontSize: "4vh", paddingBottom: "2vh" }}
          >
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
            Location: {address}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Funding Deadline: {formatDate(fundingDeadline)}
          </Typography>
          <Typography variant="h5">
            Execution Date: {formatDate(startDay)}
          </Typography>
        </Stack>
        <Stack
          sx={{
            textAlign: "right",
            paddingRight: "2vh",
            paddingBottom: "1vh",
            display: "flex",
          }}
        >
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Funded Amount: {`ETH ${ethers.formatEther(amountFunded)}`}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Funding Target: {`ETH ${ethers.formatEther(fundingTarget)}`}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Funding Status: {fundingStatus}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            Provider Status: {providerStatus}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
};
