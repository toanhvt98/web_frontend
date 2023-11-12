import React from "react";

import "./App.css";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
