import { Container } from "@mui/material";

export default function BaseLayout({ children }) {
  return (
    <Container disableGutters={true} sx={{ minWidth: "100vw", padding: 0 }}>
      <Container
        disableGutters={true}
        sx={{ minWidth: "100vw", minHeight: "50px" , backgroundColor: "#ff65af" }}
      >
      </Container>
      {children}
      <Container
          disableGutters={true}
          sx={{ minWidth: "100vw", minHeight: "200px", backgroundColor: "#844aff" }}
      >
      </Container>
    </Container>
  );
}
