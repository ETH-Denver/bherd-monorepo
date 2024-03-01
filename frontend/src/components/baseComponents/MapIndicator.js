import React from "react";
import GoogleMapReact from "google-map-react";
import { Container, Typography } from "@mui/material";
import { geocode, RequestType, setKey } from "react-geocode";

const Pin = ({ text }) => (
  <div
    style={{
      fontSize: 40,
      position: "absolute", // Change from "fixed" to "absolute"
      top: "50%", // Adjust these values based on your layout
      left: "50%", // Adjust these values based on your layout
      transform: "translate(-50%, -50%)", // Center the pin
    }}
  >
    {text}
  </div>
);

export default function MapIndicator() {
  const [address, setAddress] = React.useState("");

  setKey("AIzaSyBkk4pDx-Vz48tU4tJ1iMKMPTcs2_csJt0");
  geocode(RequestType.LATLNG, "39.78127,-104.97138")
    .then(({ results }) => {
      const address = results[0].formatted_address;
      setAddress(address);
    })
    .catch(console.error);
  const defaultProps = {
    center: {
      lat: 39.78127,
      lng: -104.97138,
    },
    zoom: 15,
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "30vw",
        height: "30vh",
        textAlign: "center",
      }}
    >
      <Typography sx={{ marginLeft: 2 }}>{address}</Typography>
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          draggable={false}
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Pin lat={39.78127} lng={-104.97138} text="📍" />
        </GoogleMapReact>
      </div>
    </Container>
  );
}
