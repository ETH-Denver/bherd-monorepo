import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ethDenverTheme } from "../../ethDenverTheme";

export default function BasicModal({
  buttonTitle,
  modalBody,
  open,
  handleOpen,
  handleClose,
}) {
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
            height: "40vh",
            width: "60vw",
            overflowY: "scroll",
          }}
        >
          {modalBody}
        </Box>
      </Modal>
    </Box>
  );
}
