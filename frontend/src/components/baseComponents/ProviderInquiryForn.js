import { Button, Container, TextField, Typography } from "@mui/material";
import { ethDenverTheme } from "ethDenverTheme";
import { useState } from "react";

export const ProviderInquiryForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      areaOfExpertise: areaOfExpertise,
      company: company,
      description: description,
    });
  };

  return (
    <Container>
      <Container
        id={"2nd-container"}
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          paddingY: "10vh",
        }}
      >
        <Container
          sx={{
            backgroundColor: ethDenverTheme.palette.secondary.main,
            paddingY: "4vh",
            minHeight: "80vh",
            borderRadius: 2,
            marginY: 0,
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Hanken-Grotesk-Regular",
              fontWeight: "bold",
              color: "#fff",
              marginY: 4,
            }}
          >
            Provider Application
          </Typography>
          <Container>
            <TextField
              inputProps={{ maxLength: 250 }}
              label="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              color="secondary"
              value={firstName}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              label="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              color="secondary"
              value={lastName}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              color="secondary"
              value={email}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              label="Phone Number"
              required
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              color="secondary"
              value={phone}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              label="Area of Expertise"
              required
              onChange={(e) => setAreaOfExpertise(e.target.value)}
              variant="outlined"
              color="secondary"
              value={areaOfExpertise}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              label="Company Site (Optional)"
              onChange={(e) => setCompany(e.target.value)}
              variant="outlined"
              color="secondary"
              value={company}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              label="Tell us about you and your company"
              required
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              color="secondary"
              value={description}
              sx={{
                mb: 3,
                width: 500,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
          </Container>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
            sx={{ width: 260, backgroundColor: "#fff", marginRight: "10px" }}
          >
            Become A Provider
          </Button>
        </Container>
      </Container>
    </Container>
  );
};
