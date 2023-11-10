import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import BlankLayout from "../layout/BlankLayout";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AuthRequired from "./AuthRequired";
import MainLayout from "../layout/MainLayout";
import LalaPage from "../pages/LalaPage";

function Router() {
  return (
    <Routes>
      <Route element={<AuthRequired />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/lala" element={<LalaPage />} />
        </Route>
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
