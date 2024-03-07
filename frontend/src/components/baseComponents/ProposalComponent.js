import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MapIndicator from "./MapIndicator";
import { ethers } from "ethers";
import { NFTMintCard } from "./NFTMintCard";
import { ProviderAcceptButton } from "./ProviderAcceptButton";
import { ProviderFulfillment } from "./ProviderFulfillment";
import { FundProposalButton } from "./FundProposalButton";
import { ProofOfAddRun } from "./ProofOfAddRun";

export const ProposalComponent = ({ proposal }) => {
  const proposalAddress = window.location.pathname.split("/").pop();
  const {
    amountFunded,
    startDay,
    lat,
    long,
    target,
    message,
    fundingDeadline,
    fundingTarget,
    provider,
    url,
    isMintingEnabled,
  } = proposal;

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };
  const fundingStatus =
    Number(fundingTarget) - Number(amountFunded) > 0
      ? "Accepting Contributions"
      : "Funded";
  const providerStatus =
    provider !== "0x0000000000000000000000000000000000000000"
      ? "Provider Accepted"
      : "Awaiting Provider";

  return (
    <Container
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        maxWidth: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "black",
      }}
    >
      <Stack sx={{ marginBottom: "50px" }} spacing={2} direction="column">
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Stack>
            <Button sx={{ marginRight: "0px" }} href={"/frontend"}>
              Back to List
            </Button>
          </Stack>
          <Stack spacing={2} direction="row">
            <ProviderAcceptButton fundingStatus={fundingStatus} />
            <ProviderFulfillment />
            <FundProposalButton
              proposalAddress={proposalAddress}
              amountRemaining={ethers.formatEther(amountFunded)}
              fundingStatus={fundingStatus}
              providerStatus={providerStatus}
            />
            <NFTMintCard
              proposalAddress={proposalAddress}
              fundingStatus={fundingStatus}
              providerStatus={providerStatus}
              isMintingEnabled={isMintingEnabled}
            />
            <ProofOfAddRun
              url={url}
              fundingStatus={fundingStatus}
              providerStatus={providerStatus}
            />
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "175px",
            background: "linear-gradient(to bottom, skyblue, #dff1f8)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Bubble",
              color: "#fff",
            }}
          >
            {message}
          </Typography>
        </Box>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            sx={{ width: "100%" }}
            id="filled-multiline-static"
            label="Intention"
            multiline
            rows={2}
            defaultValue={target}
            variant="filled"
          />
        </Stack>
        <Stack
          sx={{ marginTop: "40px", justifyContent: "space-between" }}
          spacing={2}
          direction="row"
        >
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Deadline"
            defaultValue={formatDate(fundingDeadline)}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Execution Date"
            defaultValue={formatDate(startDay)}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funded Amount"
            defaultValue={`ETH ${ethers.formatEther(amountFunded)}`}
            variant="filled"
          />
        </Stack>
        <Stack
          sx={{ marginTop: "40px", justifyContent: "space-between" }}
          spacing={2}
          direction="row"
        >
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Target"
            defaultValue={`ETH ${ethers.formatEther(fundingTarget)}`}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Status"
            defaultValue={fundingStatus}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Provider Status"
            defaultValue={providerStatus}
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            sx={{ width: "100%" }}
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={2}
            defaultValue={message}
            variant="filled"
          />
        </Stack>
      </Stack>
      <MapIndicator lat={Number(lat) / 10 ** 7} long={Number(long) / 10 ** 7} />
    </Container>
  );
};
