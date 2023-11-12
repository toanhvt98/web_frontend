import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import BlankLayout from "../layout/BlankLayout";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AuthRequired from "./AuthRequired";
import MainLayout from "../layout/MainLayout";
import LalaPage from "../pages/LalaPage";
import T1 from "../pages/t1";
import T2 from "../pages/t2";
function Router() {
  return (
    <Routes>
      <Route element={<AuthRequired />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/lala" element={<LalaPage />} />
          <Route path="/t1" element={<T1 />} />
          <Route path="/t2" element={<T2 />} />
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
