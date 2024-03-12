import { Button, Container, TextField, Typography } from "@mui/material";
import { ethDenverTheme } from "ethDenverTheme";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader } from "./Loader";
import { MuiTelInput } from "mui-tel-input";

export const ProviderInquiryForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    setLoading(true);

    emailjs
      .send(
        "service_bsn21db",
        "template_tnh5ipg",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          areaOfExpertise: areaOfExpertise,
          company: company,
          description: description,
        },
        "ghSCx4-hol5cv32eO"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setAreaOfExpertise("");
            setCompany("");
            setDescription("");
          }
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container>
        {loading && <Loader />}
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
            <Container
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, auto)",
                gridAutoRows: "minmax(100px, auto)",
              }}
            >
              <Container>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  First Name
                </Typography>
                <TextField
                  name="firstName"
                  inputProps={{ maxLength: 250 }}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  type="text"
                  value={firstName}
                  sx={{
                    mb: 3,
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
              <Container>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  Last Name
                </Typography>
                <TextField
                  inputProps={{ maxLength: 250 }}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  value={lastName}
                  type="text"
                  sx={{
                    mb: 3,
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
              <Container>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  Email
                </Typography>
                <TextField
                  inputProps={{ maxLength: 250 }}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  type="email"
                  value={email}
                  sx={{
                    mb: 3,
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
              <Container>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  Phone
                </Typography>
                <MuiTelInput
                  defaultCountry="US"
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  type="tel"
                  variant="outlined"
                  color="secondary"
                  required
                  sx={{
                    mb: 3,
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
              <Container>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  Area of Expertise
                </Typography>
                <TextField
                  inputProps={{ maxLength: 250 }}
                  required
                  onChange={(e) => setAreaOfExpertise(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  type="text"
                  value={areaOfExpertise}
                  sx={{
                    mb: 3,
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
              <Container>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  Company Site
                </Typography>
                <TextField
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) => setCompany(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  type="url"
                  value={company}
                  sx={{
                    mb: 3,
                    width: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
              <Container sx={{ gridColumn: "span 2", width: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "start", paddingLeft: 3 }}
                >
                  Tell us about you and your company
                </Typography>
                <TextField
                  size="large"
                  name="description"
                  inputProps={{ maxLength: 250 }}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  type="text"
                  multiline
                  rows={5}
                  value={description}
                  sx={{
                    mb: 3,
                    width: "95%",
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </Container>
            </Container>
            <Button
              variant="contained"
              onClick={(e) => {
                sendEmail();
              }}
              sx={{
                width: 260,
                marginRight: "10px",
                position: "relative",
                left: 325,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Become A Provider
            </Button>
          </Container>
        </Container>
      </Container>
    );
  }
};
