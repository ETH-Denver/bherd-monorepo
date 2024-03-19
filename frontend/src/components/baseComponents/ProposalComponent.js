import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import MapIndicator from "./MapIndicator";
import { ethers } from "ethers";
import { NFTMintCard } from "./NFTMintCard";
import { ProviderAcceptButton } from "./ProviderAcceptButton";
import { ProviderFulfillment } from "./ProviderFulfillment";
import { FundProposalButton } from "./FundProposalButton";
import { ProofOfAddRun } from "./ProofOfAddRun";
import { formatContentType } from "globalVariables/contentTypes";
import { RequestType, geocode, setKey } from "react-geocode";

export const ProposalComponent = ({ proposal }) => {
  const proposalAddress = window.location.pathname.split("/").pop();
  const {
    amountFunded,
    startDay,
    lat,
    long,
    target,
    message,
    fundingDeadline,
    fundingTarget,
    provider,
    url,
    isMintingEnabled,
    contentType,
  } = proposal;

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };
  const fundingStatus =
    Number(fundingTarget) - Number(amountFunded) > 0
      ? "Accepting Contributions"
      : "Funded";
  const providerStatus =
    provider !== "0x0000000000000000000000000000000000000000"
      ? "Provider Accepted"
      : "Awaiting Provider";
  const [address, setAddress] = React.useState("");
  setKey(process.env.REACT_APP_GOOGLE_API);
  geocode(
    RequestType.LATLNG,
    `${Number(lat) / 10 ** 7},${Number(long) / 10 ** 7}`
  )
    .then(({ results }) => {
      const address = results[0].formatted_address;
      setAddress(address);
    })
    .catch(console.error);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
      >
        <Stack>
          <Button sx={{ marginLeft: 15 }} href={"/"}>
            Back to Proposals
          </Button>
        </Stack>
        <Stack sx={{ marginRight: 15 }} spacing={2} direction="row">
          <ProviderAcceptButton fundingStatus={fundingStatus} />
          <ProviderFulfillment url={url} />
          <FundProposalButton
            proposalAddress={proposalAddress}
            amountRemaining={ethers.formatEther(amountFunded)}
            fundingStatus={fundingStatus}
            providerStatus={providerStatus}
          />
          <NFTMintCard
            proposalAddress={proposalAddress}
            fundingStatus={fundingStatus}
            providerStatus={providerStatus}
            isMintingEnabled={isMintingEnabled}
          />
          <ProofOfAddRun
            url={url}
            fundingStatus={fundingStatus}
            providerStatus={providerStatus}
          />
        </Stack>
      </Box>
      <Container
        disableGutters
        sx={{
          marginBottom: 10,
          display: "flex",
          boxShadow: "2px 4px 18px rgba(0, 0, 0, 0.3)",
          backgroundImage: "linear-gradient(176deg, #d9d9d9, #cecece 60%)",
          borderRadius: 5,
          height: "100vh",
          minWidth: "90vw",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            width: "80vw",
            marginY: 5,
            paddingY: 5,
            boxShadow: "inset 0px 2px 20px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              height: "300px",
              background: "linear-gradient(to bottom, skyblue, #dff1f8)",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                fontSize: 100,
                fontWeight: "bold",
              }}
            >
              {message}
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Typography variant="h4" sx={{ marginX: 2, fontWeight: "bold" }}>
                Reason for Running:
              </Typography>
              <Typography variant="h4">{target}</Typography>
            </Box>
          </Box>
          <hr
            style={{
              width: "98%",
              borderBottom: "1px solid black",
              borderTop: "none",
              marginY: 6,
            }}
          />
          <Box sx={{ display: "flex", width: "100%" }}>
            <Typography variant="h4" sx={{ marginX: 2, fontWeight: "bold" }}>
              Media Type:
            </Typography>
            <Typography variant="h4">
              {formatContentType(contentType)}
            </Typography>
          </Box>
          <hr
            style={{
              width: "98%",
              borderBottom: "1px solid black",
              borderTop: "none",
              marginY: 6,
            }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginX: 2, marginBottom: 1 }}
          >
            Location:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Box>
              <MapIndicator
                lat={Number(lat) / 10 ** 7}
                long={Number(long) / 10 ** 7}
                address={address}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Amount Needed:
                </Typography>
                <Typography variant="h4">
                  {`ETH ${ethers.formatEther(fundingTarget)}`}
                </Typography>
              </Box>
              <Box sx={{ marginY: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Amount Funded:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color:
                      fundingStatus === "provider accepted" ? "red" : "green",
                  }}
                >{`ETH ${ethers.formatEther(amountFunded)}`}</Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Funding Status:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color:
                      fundingStatus === "provider accepted" ? "red" : "green",
                  }}
                >
                  {fundingStatus}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Funding Deadline:
                </Typography>
                <Typography variant="h4">
                  {formatDate(fundingDeadline)}
                </Typography>
              </Box>
              <Box sx={{ marginY: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Execution Date:
                </Typography>
                <Typography variant="h4">{formatDate(startDay)}</Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Provider Status:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color:
                      providerStatus === "provider accepted" ? "red" : "green",
                  }}
                >
                  {providerStatus}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
    // <Container
    //   sx={{
    //     backgroundColor: "#fff",
    //     minHeight: "100vh",
    //     maxWidth: "50%",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     fontSize: "calc(10px + 2vmin)",
    //     color: "black",
    //   }}
    // >
    //   <Stack sx={{ marginBottom: "50px" }} spacing={2} direction="column">
    //     <Stack spacing={2} direction="row" justifyContent="space-between">
    //       <Stack>
    //         <Button sx={{ marginRight: "0px" }} href={"/frontend"}>
    //           Back to Proposals
    //         </Button>
    //       </Stack>
    //       <Stack spacing={2} direction="row">
    //         <ProviderAcceptButton fundingStatus={fundingStatus} />
    //         <ProviderFulfillment url={url} />
    //         <FundProposalButton
    //           proposalAddress={proposalAddress}
    //           amountRemaining={ethers.formatEther(amountFunded)}
    //           fundingStatus={fundingStatus}
    //           providerStatus={providerStatus}
    //         />
    //         <NFTMintCard
    //           proposalAddress={proposalAddress}
    //           fundingStatus={fundingStatus}
    //           providerStatus={providerStatus}
    //           isMintingEnabled={isMintingEnabled}
    //         />
    //         <ProofOfAddRun
    //           url={url}
    //           fundingStatus={fundingStatus}
    //           providerStatus={providerStatus}
    //         />
    //       </Stack>
    //     </Stack>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         textAlign: "center",
    //         minHeight: "175px",
    //         background: "linear-gradient(to bottom, skyblue, #dff1f8)",
    //         overflow: "hidden",
    //       }}
    //     >
    //       <Typography
    //         variant="h1"
    //         sx={{
    //           fontFamily: "Bubble",
    //           color: "#fff",
    //         }}
    //       >
    //         {message}
    //       </Typography>
    //     </Box>
    //     <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
    //       <TextField
    //         disabled
    //         sx={{ width: "100%" }}
    //         id="filled-multiline-static"
    //         label="Intention"
    //         multiline
    //         rows={2}
    //         defaultValue={target}
    //         variant="filled"
    //       />
    //     </Stack>
    //     <Stack
    //       sx={{ marginTop: "40px", justifyContent: "space-between" }}
    //       spacing={2}
    //       direction="row"
    //     >
    //       <TextField
    //         disabled
    //         id="filled-multiline-static"
    //         label="Intention"
    //         multiline
    //         defaultValue={formatContentType(contentType)}
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Funding Deadline"
    //         defaultValue={formatDate(fundingDeadline)}
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Execution Date"
    //         defaultValue={formatDate(startDay)}
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Funded Amount"
    //         defaultValue={`ETH ${ethers.formatEther(amountFunded)}`}
    //         variant="filled"
    //       />
    //     </Stack>
    //     <Stack
    //       sx={{ marginTop: "40px", justifyContent: "space-between" }}
    //       spacing={2}
    //       direction="row"
    //     >
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Funding Target"
    //         defaultValue={`ETH ${ethers.formatEther(fundingTarget)}`}
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Funding Status"
    //         defaultValue={fundingStatus}
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Provider Status"
    //         defaultValue={providerStatus}
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-multiline-static"
    //         label="Intention"
    //         multiline
    //         defaultValue={address}
    //         variant="filled"
    //       />
    //     </Stack>
    //     <Stack sx={{ marginTop: "40px" }} spacing={2} direction="row">
    //       <TextField
    //         disabled
    //         sx={{ width: "100%" }}
    //         id="filled-multiline-static"
    //         label="Message"
    //         multiline
    //         rows={2}
    //         defaultValue={message}
    //         variant="filled"
    //       />
    //     </Stack>
    //   </Stack>
    //   <MapIndicator
    //     lat={Number(lat) / 10 ** 7}
    //     long={Number(long) / 10 ** 7}
    //     address={address}
    //   />
    // </Container>
  );
};
