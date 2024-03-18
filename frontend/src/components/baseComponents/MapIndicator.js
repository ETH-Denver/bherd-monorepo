import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Box, Typography } from "@mui/material";
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

export default function MapIndicator({ address, lat, long }) {
  const defaultProps = {
    center: {
      lat: lat,
      lng: long,
    },
    zoom: 15,
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "400px",
        borderRadius: 2,
        overflow: "hidden",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleMapReact
        draggable={false}
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Pin lat={lat} lng={long} text="📍" />
      </GoogleMapReact>
      <Typography sx={{ fontSize: "1.3rem", paddingBottom: "20px" }}>
        {address}
      </Typography>
    </Box>
  );
}
