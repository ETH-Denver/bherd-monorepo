import * as React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import {ethers, id, Wallet} from "ethers";
import BasicModal from "../baseComponents/BasicModal";
import ContributeForm from "../baseComponents/ContributeForm";

const CustomTextField = (props) => (
  <TextField
    InputProps={{
      style: {
        color: props.disabled ? "white" : "inherit",
      },
    }}
    {...props}
  />
);

let provider;
let signer;

const signMessage = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    console.log("signer", signer);
    console.log("address", signer.address);
    try {
        const result = await signer.signMessage("Signing message with MetaMask");

        console.log(result);
    } catch (error) {
        // handle error
        console.log(error);
    }
};

export const ShowPage = () => {

    const [walletAddress, setWalletAddress] = React.useState("");
  return (
    <Container
      sx={{
        backgroundColor: "#a8b0b6",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "white",
      }}
    >
      <Stack spacing={2} direction="column">
        <Box sx={{ display: "flex" }}>
          <Typography>
            Help troll the trolls the the troll toll convention
          </Typography>
          <Typography sx={{ marginLeft: 2 }}>Denver, CO</Typography>
        </Box>
        <Stack sx={{ marginLeft: "0px" }} spacing={2} direction="row">


            <BasicModal
                buttonTitle="Contribute"
                modalTitle="How much would you like to contribute?"
                modalBody={<ContributeForm />}
            />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <CustomTextField
            disabled
            id="filled-disabled"
            label="Expiration Date"
            defaultValue="1/1/23"
            variant="filled"
          />
          <CustomTextField
            disabled
            id="filled-disabled"
            label="Execution Date"
            defaultValue="1/2/23"
            variant="filled"
          />
          <CustomTextField
            disabled
            id="filled-disabled"
            label="Funded Amount"
            defaultValue="$5,000"
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <CustomTextField
            disabled
            id="filled-disabled"
            label="Funding Target"
            defaultValue="$15,000"
            variant="filled"
          />
          <CustomTextField
            disabled
            id="filled-disabled"
            label="Funding Status"
            defaultValue="Funding Open"
            variant="filled"
          />
          <CustomTextField
            disabled
            id="filled-disabled"
            label="Provider Status"
            defaultValue="Filled"
            variant="filled"
          />
        </Stack>
        <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
          <CustomTextField
            sx={{ width: "500px" }}
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            defaultValue="8============>"
            variant="filled"
          />
        </Stack>
      </Stack>
    </Container>
  );
};
