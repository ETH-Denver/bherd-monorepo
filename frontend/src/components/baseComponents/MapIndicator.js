import React from "react";
import GoogleMapReact from "google-map-react";
import { Container } from "@mui/material";

const Pin = ({ text }) => <div style={{ fontSize: 40 }}>{text}</div>;

export default function MapIndicator() {
  const defaultProps = {
    center: {
      lat: 39.78127,
      lng: -104.97138,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "30vh", width: "30%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Pin lat={39.78127} lng={-104.97138} text="📍" />
      </GoogleMapReact>
    </div>
  );
}
