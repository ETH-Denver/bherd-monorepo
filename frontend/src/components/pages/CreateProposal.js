import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";
import { useWriteContract } from "wagmi";
import Deployer from "../../abis/Deployer.json";
import { useNavigate } from "react-router-dom";
import { ethDenverTheme } from "../../ethDenverTheme";

export const CreateProposal = () => {
  const [startDay, setStartDay] = useState(new Date());
  const [target, setTarget] = useState("");
  const [content, setContent] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [contentType, setContentType] = useState("");
  const deployerAddress = process.env.REACT_APP_DEPLOYER_CONTRACT_SEPOLIA;
  const navigate = useNavigate();
  const { writeContract, data } = useWriteContract();
  const create = async () => {
    try {
      await writeContract({
        abi: Deployer.abi,
        address: deployerAddress,
        functionName: "createProposal",
        args: [
          startDay.getTime(),
          Math.round(lat.toFixed(7) * 10 ** 7),
          Math.round(long.toFixed(7) * 10 ** 7),
          target,
          0,
          content,
        ],
      });
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Container
      sx={{
        backgroundColor: ethDenverTheme.palette.ethPrimary.midGrey,
        marginY: 5,
        paddingTop: 2,
        minHeight: "50vh",
        borderRadius: 2,
        overflowY: "scroll",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "white",
          mb: 3,
          textAlign: "center",
          fontFamily: "Hanken-Grotesk-Regular",
        }}
      >
        Create a Proposal
      </Typography>
      <Container>
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_API}
          style={{ width: 500, borderRadius: 6, height: 55, border: "none" }}
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
          inputProps={{ maxLength: 250 }}
          label="What is your idea?"
          onChange={(e) => setTarget(e.target.value)}
          variant="outlined"
          color="secondary"
          value={target}
          fullWidth
          sx={{
            mb: 3,
            width: 500,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
      </Container>
      <Container>
        <Select
          value={contentType}
          label="Content Type"
          onChange={(event, selected) => {
            setContentType(event.target.value);
          }}
          sx={{ mb: 3, width: 500, backgroundColor: "white" }}
          renderValue={(selected) => {
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
          inputProps={{ maxLength: 250 }}
          label="What is your message?"
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          color="secondary"
          type="content"
          value={content}
          fullWidth
          sx={{
            mb: 3,
            width: 500,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
      </Container>
      <Container sx={{ display: "flex", justifyContent: "space-around" }}>
        <DatePicker
          showIcon
          selected={startDay}
          onChange={(date) => setStartDay(date)}
          icon="fa fa-calendar"
          sx={{
            mb: 3,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            create();
          }}
        >
          Create Proposal
        </Button>
      </Container>
    </Container>
  );
};
