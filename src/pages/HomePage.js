import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("/lala")}>LalaPage</Button>
    </>
  );
}

export default HomePage;
