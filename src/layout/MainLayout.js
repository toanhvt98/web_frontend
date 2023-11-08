import React from "react";
import HeaderLayout from "./HeaderLayout";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import FooterLayout from "./FooterLayout";
import ToastMessage from "../components/toast/ToastMessage";

function MainLayout() {
  return (
    <Stack direction="column">
      <HeaderLayout />
      <ToastMessage />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <FooterLayout />
    </Stack>
  );
}

export default MainLayout;
