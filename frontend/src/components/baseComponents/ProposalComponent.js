import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { keyframes } from '@emotion/react';
import BasicModal from "./BasicModal";
import ContributeForm from "./ContributeForm";
import MapIndicator from "./MapIndicator";
import { ethers } from "ethers";

const floatAnimation = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 1;
  }
  50% {
    transform: translateX(100px); // adjust this value as needed
    opacity: 0;
  }
  50.01% {
    transform: translateX(-100px); // move it back to left off-screen
    opacity: 0; // keep it invisible
  }
  100% {
    transform: translateX(-100px);
    opacity: 1;
  }
`;

export const ProposalComponent = (props) => {
  if (!props.data) {
    return null;
  }

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

  // takes a unix timestamp and returns a formatted date string
  const unixTimestampToDateString = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  }

  const executionDateFormatted = unixTimestampToDateString(executionDate);
  const expirationDateFormatted = unixTimestampToDateString(expirationDate);

  const fundingStatus =
    Number(fundingTarget) - Number(fundedAmount) > 0 ? "Incomplete" : "Funded";

  const providerStatus = provider !== "0x0000000000000000000000000000000000000000" ? "Filled" : "Unfilled";

  return (
    <Container
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        minWidth: "100vw",
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
            <Button sx={{ marginRight: "0px" }} href={"/frontend"}>Back to List</Button>
          </Stack>
          <Stack spacing={2} direction="row">
            {fundingStatus === "Incomplete" && providerStatus === "Unfilled" &&
              <BasicModal
                sx={{ marginLeft: "0px" }}
                buttonTitle="Contribute"
                modalTitle="How much would you like to contribute to this campaign?"
                modalBody={<ContributeForm proposalAddress={props.contractAddress} />}
              />
            }

            {/* WIP - waiting for proposer address to be added to proposal */
              fundingStatus === "Complete" && providerStatus === "Unfilled" &&
                <BasicModal
                  buttonTitle="Execute Proposal"
                  modalTitle="Are you sure you would like to close this campaign to new contributions?"
                  modalBody={<Button>Nooo!!!</Button>}
                />
            }
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "175px",
            background: "linear-gradient(to bottom, skyblue, white)",
          }}
        >
          <Typography variant="h1" sx={{ fontFamily: 'Bubble', color: "#fff", animation: `${floatAnimation} 7s infinite`}}>
            { target }
          </Typography>
        </Box>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            id="filled-disabled"
            label="Expiration Date"
            defaultValue={expirationDateFormatted}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Execution Date"
            defaultValue={executionDateFormatted}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funded Amount"
            defaultValue={`ETH ${ethers.formatEther(fundedAmount)}`}
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
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
      <MapIndicator />
    </Container>
  );
};
