import * as React from "react";
import { useReadContracts } from "wagmi";
import Proposal from "../../abis/Proposal.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProposalComponent } from "../baseComponents/ProposalComponent";
import BaseLayout from "components/layouts/BaseLayout";
import { Loader } from "components/baseComponents/Loader";

export const ShowPage = () => {
  const { address } = useParams();
  const [proposal, setProposal] = useState();
  const fields = React.useMemo(
    () => [
      "amountFunded",
      "deployer",
      "startDay",
      "lat",
      "long",
      "target",
      "message",
      "contentType",
      "fundingDeadline",
      "fundingTarget",
      "provider",
      "proposer",
      "url",
    ],
    []
  );
  const getContractData = (address) => {
    const calls = [];

    fields.map((field) => {
      calls.push({
        abi: Proposal.abi,
        address,
        functionName: field,
      });
    });
    return calls;
  };

  const { data, error, isLoading } = useReadContracts({
    contracts: getContractData(address).flat(),
  });

  useEffect(() => {
    const fieldsMappedToValues = (contract) => {
      return contract.reduce((acc, item, index) => {
        acc[fields[index]] = item.result;
        return acc;
      }, {});
    };

    if (data) {
      setProposal(fieldsMappedToValues(data));
    }
  }, [data, fields]);

  if (error) {
    console.log(error);
  } else if (proposal && !isLoading) {
    return <BaseLayout children={<ProposalComponent proposal={proposal} />} />;
  } else {
    return <BaseLayout children={<Loader />} />;
  }
};
