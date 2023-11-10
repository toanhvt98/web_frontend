import { Button } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LalaPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/login");
        auth.logout();
      }}
    >
      logout
    </Button>
  );
}

export default LalaPage;
