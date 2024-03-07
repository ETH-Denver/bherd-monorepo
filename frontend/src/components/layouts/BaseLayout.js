import { Container } from "@mui/material";
import { Header } from "components/baseComponents/Header";
import React from "react";
import { ethDenverTheme } from "../../ethDenverTheme";

export default function BaseLayout({ children }) {
  return (
    <Container
      disableGutters={true}
      sx={{
        minWidth: "100vw",
        padding: 0,
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      {children}
      <Container
        disableGutters={true}
        sx={{
          minWidth: "100vw",
          minHeight: "200px",
          backgroundColor: ethDenverTheme.palette.primary.main,
        }}
      />
    </Container>
  );
}
