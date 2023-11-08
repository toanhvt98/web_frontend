import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import ToastMessage from "../components/toast/ToastMessage";
function BlankLayout() {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo sx={{ width: 300, height: 300 }} />
      <ToastMessage />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
