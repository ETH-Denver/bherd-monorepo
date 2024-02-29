import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";
import { useWriteContract } from "wagmi";
// @ts-ignore
import Deployer from "../../abis/Deployer.json";

const ProposalForm = () => {
  const [executionDate, setExecutionDate] = useState(new Date());
  const [target, setTarget] = useState("");
  const [content, setContent] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [contentType, setContentType] = useState("");
  const deployerAddress = "0x2A354874631Dc2Dc09f6Ff240f19b11fe83D6720";
  const { writeContract } = useWriteContract();
  function handleSubmit(event) {
    event.preventDefault();
    console.log(executionDate, target, content, lat, long);
    writeContract({
      abi: Deployer.abi,
      address: deployerAddress,
      functionName: "createProposal",
      args: [executionDate, executionDate, 42, 42, "foo", "skywriter", "foo"],
    });
  }
  useEffect(() => {
    console.log(lat, long);
  }, [lat, long]);
  const CreateButton = () => {
    return (
      <button
        onClick={() => {
          console.log("test");
        }}
      >
        CreateProposal
      </button>
    );
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_API}
          style={{ width: 500, borderRadius: 8, height: 48 }}
          onPlaceSelected={(place) => {
            setLat(place.geometry.location.lat());
            setLong(place.geometry.location.lng());
          }}
          componentrestrictions={{ country: "us" }}
          options={{
            types: ["geocode", "establishment"],
          }}
          placeholder="Search for a location"
        />
        <TextField
          inputProps={{ maxLength: 12 }}
          label="What is your idea?"
          onChange={(e) => setTarget(e.target.value)}
          variant="outlined"
          color="secondary"
          value={target}
          fullWidth
          sx={{ mb: 3, width: 500 }}
        />
        <Select
          value={contentType}
          label="Content Type"
          onChange={(event, selected) => {
            console.log(selected);
            setContentType(event.target.value);
          }}
          sx={{ mb: 3, width: 500 }}
          renderValue={(selected) => {
            console.log(selected);
            if (selected.length === 0) {
              return <em>Please Select an Option</em>;
            }

            return selected;
          }}
          displayEmpty
        >
          <MenuItem disabled value={""}>
            Please Select an option
          </MenuItem>
          <MenuItem value={"Sky Typing"}>Sky Typing</MenuItem>
          <MenuItem value={"Banner Plane"}>Banner Plane</MenuItem>
        </Select>
        <TextField
          inputProps={{ maxLength: 12 }}
          label="What is your message?"
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          color="secondary"
          type="content"
          value={content}
          fullWidth
          sx={{ mb: 3, width: 500 }}
        />
        <DatePicker
          showIcon
          selected={executionDate}
          onChange={(date) => setExecutionDate(date)}
          icon="fa fa-calendar"
        />
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
};

export const CreateProposalPage = () => {
  return (
    <Container>
      <ProposalForm />
    </Container>
  );
};
