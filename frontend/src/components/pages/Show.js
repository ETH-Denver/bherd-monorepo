import * as React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

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

export const ShowPage = () => {
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
          <Button variant="contained">Provider</Button>
          <Button variant="contained">Contributor</Button>
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
