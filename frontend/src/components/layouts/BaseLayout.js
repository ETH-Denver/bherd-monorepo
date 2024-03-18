import { Alert, Collapse, Container, IconButton } from "@mui/material";
import { Header } from "components/baseComponents/Header";
import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { ethDenverTheme } from "../../ethDenverTheme";
import CloseIcon from "@mui/icons-material/Close";

// Create a context for managing the alert state
const AlertContext = createContext();

// Custom hook to access the context
export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  // Local state for managing the alert's visibility
  const [open, setOpen] = useState(true);

  // Retrieve the initial state from local storage or default to true
  useEffect(() => {
    const initialOpenState =
      JSON.parse(localStorage.getItem("alertOpen")) ?? true;
    setOpen(initialOpenState);
  }, []);

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem("alertOpen", JSON.stringify(open));
  }, [open]);

  // Provide the context value to the children
  const contextValue = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export default function BaseLayout({ children }) {
  const { open, setOpen } = useAlertContext();
  window.scrollTo(0, 0);
  return (
    <Container
      disableGutters={true}
      sx={{
        minWidth: "100%",
        padding: 0,
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          This app is still in development and is for the purpose of marketing
          and beta testing.
        </Alert>
      </Collapse>
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
