import {Box, Button, Card, Container, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BasicModal from "./BasicModal";
import ContributeForm from "./ContributeForm";
import MapIndicator from "./MapIndicator";

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
    target
  } = props.data;

  const fundingStatus =
    Number(fundedAmount) - Number(fundingTarget) > 0 ? "Funded" : "Incomplete";

  const providerStatus = provider ? "Filled" : "Unfilled";

  console.log('contractAddress', props.contractAddress)
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
      <Stack sx={{marginBottom: "50px"}} spacing={2} direction="column">
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button sx={{ marginRight: "0px" }} href={"/frontend"}>Back to List</Button>
          <BasicModal
            sx={{ marginLeft: "0px" }}
            buttonTitle="Contribute"
            modalTitle="How much would you like to contribute to this campaign?"
            modalBody={<ContributeForm proposalAddress={props.contractAddress} />}
          />
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "175px",
            background: 'linear-gradient(to bottom, skyblue, white)' }}
        >
          <Typography variant="h1" sx={{ fontFamily: 'Bubble', color: "#fff"}}>
            { target }
          </Typography>
        </Box>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            id="filled-disabled"
            label="Expiration Date"
            defaultValue={Number(executionDate)}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Execution Date"
            defaultValue={Number("1")}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funded Amount"
            defaultValue={Number(fundedAmount)}
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Target"
            defaultValue={Number(fundingTarget)}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Status"
            defaultValue="Funding Open"
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Provider Status"
            defaultValue="Filled"
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
