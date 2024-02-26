import { Container } from "@mui/material";

export default function BaseLayout({ children }) {
  return (
    <Container disableGutters={true} sx={{ minWidth: "100vw", padding: 0 }}>
      <Container
        disableGutters={true}
        sx={{ minWidth: "100vw", backgroundColor: "red" }}
      >
        Header
      </Container>
      {children}
    </Container>
  );
}
