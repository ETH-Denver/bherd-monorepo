import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { geocode, RequestType, setKey } from "react-geocode";
import { formatContentType } from "globalVariables/contentTypes";

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
    contentType,
  } = proposal;
  const [address, setAddress] = React.useState("");
  const fundingStatus =
    Number(amountFunded) - Number(fundingTarget) >= 0 ? "Funded" : "Incomplete";
  const providerStatus = provider ? "Filled" : "Unfilled";

  const navigate = useNavigate();
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };

  setKey(process.env.REACT_APP_GOOGLE_API);
  geocode(
    RequestType.LATLNG,
    `${Number(lat) / 10 ** 7},${Number(long) / 10 ** 7}`
  )
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
        filter: "drop-shadow(8px 8px 3px #ff65af)",
        borderRadius: 2,
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          paddingTop: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ marginLeft: 1, fontSize: 30, fontWeight: "bold" }}>
          {message}
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
            Media Type:
          </Typography>
          <Typography sx={{ marginLeft: 1, fontSize: 23 }}>
            {formatContentType(contentType)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ textAlign: "left", paddingLeft: 2, display: "flex" }}>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}>Intention:</span> {target}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}> Location:</span> {address}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}>Funding Deadline:</span>{" "}
            {formatDate(fundingDeadline)}
          </Typography>
          <Typography variant="h5">
            <span style={{ fontWeight: "bold" }}>Execution Date: </span>
            {formatDate(startDay)}
          </Typography>
        </Stack>
        <Stack
          sx={{
            textAlign: "left",
            paddingRight: "2vh",
            paddingBottom: "1vh",
            display: "flex",
          }}
        >
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}>Funded Amount:</span>{" "}
            {`ETH ${ethers.formatEther(amountFunded)}`}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}>Funding Target:</span>{" "}
            {`ETH ${ethers.formatEther(fundingTarget)}`}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}>Funding Status: </span>
            {fundingStatus}
          </Typography>
          <Typography variant="h5" sx={{ paddingBottom: "1vh" }}>
            <span style={{ fontWeight: "bold" }}>Provider Status: </span>
            {providerStatus}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
};
