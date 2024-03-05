import React from "react";
import GoogleMapReact from "google-map-react";
import { Container, Typography } from "@mui/material";
import { geocode, RequestType, setKey } from "react-geocode";

const Pin = ({ text }) => (
  <div
    style={{
      fontSize: 40,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

export default function MapIndicator({ lat, long }) {
  const [address, setAddress] = React.useState("");
  setKey(process.env.REACT_APP_GOOGLE_API);
  geocode(RequestType.LATLNG, `${lat},${long}`)
    .then(({ results }) => {
      const address = results[0].formatted_address;
      setAddress(address);
    })
    .catch(console.error);
  const defaultProps = {
    center: {
      lat: lat,
      lng: long,
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
      <Typography
        sx={{ marginLeft: 2, fontSize: "1.3rem", paddingBottom: "20px" }}
      >
        {address}
      </Typography>
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          draggable={false}
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Pin lat={lat} lng={long} text="📍" />
        </GoogleMapReact>
      </div>
    </Container>
  );
}
