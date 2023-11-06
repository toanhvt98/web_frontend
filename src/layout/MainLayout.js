import React from "react";
import HeaderLayout from "./HeaderLayout";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import FooterLayout from "./FooterLayout";

function MainLayout() {
  return (
    <Stack direction="row">
      <HeaderLayout />
      <Outlet />
      <FooterLayout />
    </Stack>
  );
}

export default MainLayout;
