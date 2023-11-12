import React from "react";
import HeaderLayout from "./HeaderLayout";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import FooterLayout from "./FooterLayout";
import ToastMessage from "../components/toast/ToastMessage";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <Stack direction="column">
      <Stack direction="row">
        <Navbar />
        <ToastMessage />
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}

export default MainLayout;
