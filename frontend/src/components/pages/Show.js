import * as React from "react";
import { Box, Container, Typography, TextField, Stack } from "@mui/material";
import BasicModal from "../baseComponents/BasicModal";
import ContributeForm from "../baseComponents/ContributeForm";
import MapIndicator from "components/baseComponents/MapIndicator";
import { useReadContract } from 'wagmi'
import Deployer from "../../abis/Deployer.json";
import Proposal from "../../abis/Proposal.json";
import {useState} from "react";
import { useParams }  from "react-router-dom";

export const ShowPage = () => {
    const { address } = useParams();
    const [proposals, setProposals] = useState([]);
    const deployerAddress = "0x2A354874631Dc2Dc09f6Ff240f19b11fe83D6720";
    const proposalAddress = "0x3ea2f7E5d218D497C1Ad3E4093Cfe336af8c2470";
    const proposal = useReadContract({
        abi: Proposal.abi,
        address: address,
        functionName: 'getProposalInfo',
    })

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
            Help troll the trolls the the troll toll convention
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
            defaultValue="1/1/23"
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Execution Date"
            defaultValue="1/2/23"
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Funded Amount"
            defaultValue="$5,000"
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <TextField
            disabled
            id="filled-disabled"
            label="Funding Target"
            defaultValue="$15,000"
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
            defaultValue="Take to the skies and troll the trolls!"
            variant="filled"
          />
        </Stack>
      </Stack>
    </Container>
  );
};
