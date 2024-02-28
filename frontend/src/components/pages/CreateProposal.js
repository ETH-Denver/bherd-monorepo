import { Button, Container, TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";

const ProposalForm = () => {
  const [executionDate, setExecutionDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(executionDate, location, content, lat, long);
  }
  useEffect(() => {
    console.log(lat, long);
  }, [lat, long]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_API}
          style={{ width: "90%" }}
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
          label="Location"
          onChange={(e) => setLocation(e.target.value)}
          variant="outlined"
          color="secondary"
          type="password"
          value={location}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          inputProps={{ maxLength: 12 }}
          label="Content"
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          color="secondary"
          type="content"
          value={content}
          fullWidth
          sx={{ mb: 3 }}
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
