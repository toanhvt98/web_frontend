import { Icon } from "@mui/material";
import * as React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
export default function Navbar() {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem icon={<BookOutlinedIcon />} component={<Link to="/lala" />}>
          {" "}
          Documentation
        </MenuItem>
        <MenuItem component={<Link to="/" />}> Calendar</MenuItem>
        <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
      </Menu>
    </Sidebar>
  );
}
