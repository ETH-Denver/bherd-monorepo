import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ethDenverTheme } from "../../ethDenverTheme";
import { ContributeForm } from "./ContributeForm";

export default function BasicModal({
  buttonTitle,
  modalTitle,
  modalBody,
  amountRemaining,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        sx={{
          backgroundColor: ethDenverTheme.palette.primary.main,
          color: "white",
          minWidth: 200,
        }}
        variant="contained"
        onClick={handleOpen}
      >
        {buttonTitle}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            height: "15vh",
            width: "60vw",
            overflow: "scroll",
            textAlign: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h3"
            component="h6"
            sx={{ paddingBottom: "20px" }}
          >
            {modalTitle}
          </Typography>
          <ContributeForm
            handleClose={handleClose}
            amountRemaining={amountRemaining}
          />
        </Box>
      </Modal>
    </Box>
  );
}
