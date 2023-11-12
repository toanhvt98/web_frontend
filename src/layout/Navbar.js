import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../components/Logo";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomePage from "../pages/HomePage";
import LalaPage from "../pages/LalaPage";
import T1 from "../pages/t1";
import T2 from "../pages/t2";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  CenterFocusStrongOutlined,
  CenterFocusStrongSharp,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import useAuth from "../hooks/useAuth";

const drawerWidth = 250;

function Navbar(props) {
  const { window } = props;
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(true);
  const [openUser, setOpenUser] = useState(false);
  const [tabName, setTabName] = useState("Home Page");
  const [page, setPage] = useState(<HomePage />);
  const handleClickDashboard = () => {
    setOpenDashboard(!openDashboard);
  };
  const handleClickUser = () => {
    setOpenUser(!openUser);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listItem = [
    {
      name: "Home Page",
      path: <HomePage />,
      icon: <HomeIcon />,
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      state: openDashboard,
      setState: handleClickDashboard,
      isParent: true,
      subItem: [
        {
          name: "Báo cáo chung",
          path: <LalaPage />,
          icon: null,
        },
        { name: "Báo cáo chi tiết", path: <T1 />, icon: null },
      ],
    },
    {
      name: "User",
      icon: null,
      state: openUser,
      setState: handleClickUser,
      isParent: true,
      subItem: [
        { name: "All mail", path: <LalaPage />, icon: null },
        { name: "Trash", path: <LalaPage />, icon: null },
        { name: "Spam", path: <LalaPage />, icon: null },
      ],
    },
  ];
  const drawer = (
    <div>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Logo />
      </Toolbar>

      <List>
        {listItem.map((item, index) => {
          if (item.isParent) {
            return (
              <React.Fragment key={index}>
                <ListItem key={item.name} disablePadding>
                  <ListItemButton onClick={item.setState}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                    {item.state ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                {item.subItem && (
                  <Collapse in={item.state} timeout="auto" unmountOnExit>
                    {item.subItem.map((sub, index) => (
                      <ListItem
                        key={`${sub.name}_${sub.name}_${index}`}
                        component="div"
                        disablePadding
                      >
                        <ListItemButton
                          sx={{ pl: 2 }}
                          onClick={() => {
                            setTabName(sub.name);
                            setPage(sub.path);
                            handleDrawerToggle();
                          }}
                        >
                          <ListItemIcon>{sub.icon}</ListItemIcon>
                          <ListItemText primary={sub.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Collapse>
                )}
                <Divider />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setTabName(item.name);
                      setPage(item.path);
                      handleDrawerToggle();
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          }
        })}
      </List>
      <List>
        <ListItem key={"logout"} disablePadding>
          <ListItemButton onClick={auth.logout}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {tabName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {page}
      </Box>
    </Box>
  );
}

export default Navbar;
