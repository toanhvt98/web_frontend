import { Button } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function LalaPage() {
  const auth = useAuth();
  return (
    <Button onClick={() => auth.logout()}>
      <Link to="/login" />
      logout
    </Button>
  );
}

export default LalaPage;
