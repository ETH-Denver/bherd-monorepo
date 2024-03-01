import { Container } from "@mui/material";
import { Header } from "components/baseComponents/Header";
import React from "react";

export default function BaseLayout({ children }) {
  return (
    <Container disableGutters={true} sx={{ minWidth: "100vw", padding: 0 }}>
      <Header />
      {children}
      <Container
        disableGutters={true}
        sx={{
          minWidth: "100vw",
          minHeight: "200px",
          backgroundColor: "#844aff",
        }}
      ></Container>
    </Container>
  );
}
