import BasicModal from "./BasicModal";
import ContributeForm from "./ContributeForm";

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
        // modalBody={
        //   <ContributeForm
        //     proposalAddress={proposalAddress}
        //     amountRemaining={amountRemaining}
        //   />
        // }
      />
    );
  }
};
