import * as React from "react";
import { Box, Container, Typography, TextField, Stack } from "@mui/material";
import BasicModal from "../baseComponents/BasicModal";
import ContributeForm from "../baseComponents/ContributeForm";
import MapIndicator from "components/baseComponents/MapIndicator";
import { useReadContract } from 'wagmi'
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import {useEffect, useState} from "react";
import { useParams }  from "react-router-dom";
import {ProposalCard} from "../baseComponents/ProposalCard";

export const ShowPage = () => {
    const { address } = useParams();
    const [proposal, setProposal] = useState();
    const proposalContract = useReadContract({
        abi: Proposal.abi,
        address: address,
        functionName: 'getProposalInfo',
    })

    useEffect(() => {
        if (proposalContract && proposalContract.data !== undefined) {
            setProposal(proposalContract.data)
        }
    }, [proposalContract.data]);

    console.log("address", address)
    console.log("proposal", proposal)

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
      <MapIndicator />
      <Stack spacing={2} direction="column">
        <Box sx={{ display: "flex", border: "1px dashed grey" }}>
          <Typography variant="h5">
              { proposal?.target }
          </Typography>
        </Box>
        <Stack sx={{ marginLeft: "0px" }} spacing={2} direction="row">
          <BasicModal
            buttonTitle="Contribute"
            modalTitle="How much would you like to contribute to this campaign?"
            modalBody={<ContributeForm />}
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            id="filled-disabled"
            label="Expiration Date"
            defaultValue={Number(proposal?.endDay)}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Execution Date"
            defaultValue={Number(proposal?.startDay)}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funded Amount"
            defaultValue={Number(proposal?.amountFunded)}
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Target"
            defaultValue={proposal?.fundingTarget}
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
            sx={{ width: "500px" }}
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={2}
            defaultValue={proposal?.message}
            variant="filled"
          />
        </Stack>
      </Stack>
    </Container>
  );
};
