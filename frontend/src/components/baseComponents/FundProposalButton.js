import { useState } from "react";
import BasicModal from "./BasicModal";
import { ContributeForm } from "./ContributeForm";

export const FundProposalButton = ({
  proposalAddress,
  amountRemaining,
  fundingStatus,
  providerStatus,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (
    fundingStatus === "Accepting Contributions" &&
    providerStatus === "Awaiting Provider"
  ) {
    return (
      <BasicModal
        sx={{ marginLeft: "0px" }}
        buttonTitle="Contribute"
        modalTitle="How much would you like to contribute to this campaign?"
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        modalBody={
          <ContributeForm
            handleClose={handleClose}
            amountRemaining={amountRemaining}
          />
        }
        amountRemaining={amountRemaining}
      />
    );
  }
};
