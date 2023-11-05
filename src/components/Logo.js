import { Box } from "@mui/material";
import React from "react";
import logoPng from "../logo.png";
import { Link } from "react-router-dom";
export default function Logo({ sx }) {
  const logo = (
    <Box sx={{ ...sx }}>
      <img src={logoPng} alt="logo" width="100%" />
    </Box>
  );

  return <Link to="/">{logo}</Link>;
}
