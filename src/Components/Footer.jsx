import React from "react";
import { Typography, Paper } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      elevation={3}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#2196F3", // Blue color
        color: "white", // Text color
        padding: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        Build by Govind Shakya in Dec 2023
      </Typography>
    </Paper>
  );
};

export default Footer;
