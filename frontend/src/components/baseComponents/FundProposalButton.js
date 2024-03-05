import BasicModal from "./BasicModal";

export const FundProposalButton = ({
  proposalAddress,
  amountRemaining,
  fundingStatus,
  providerStatus,
}) => {
  if (
    fundingStatus === "Accepting Contributions" &&
    providerStatus === "Awaiting Provider"
  ) {
    return (
      <BasicModal
        sx={{ marginLeft: "0px" }}
        buttonTitle="Contribute"
        modalTitle="How much would you like to contribute to this campaign?"
        amountRemaining={amountRemaining}
      />
    );
  }
};
