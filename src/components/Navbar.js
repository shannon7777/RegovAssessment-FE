import { useLocation } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography, Zoom } from "@mui/material";

import {
  PersonOutlined,
  LogoutOutlined,
  HomeOutlined,
  Description,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavbarItem = ({ title, to, icon, onClick }) => {
  const location = useLocation();
  let active = location.pathname === to;
  const activeStyle = {
    background: active && "#040509",
    ":hover": {
      background: "#3e4396",
    },
  };

  return (
    <Tooltip
      title={<Typography fontSize={15}>{title}</Typography>}
      TransitionComponent={Zoom}
      arrow
    >
      <IconButton
        onClick={onClick}
        sx={{ mx: 2, ...activeStyle }}
        component={Link}
        to={to}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

const Navbar = ({ setNotify }) => {
  const {
    auth: { user },
  } = useAuth();

  let isAdmin = user?.role === "Admin";
  const logout = useLogout();
  const signout = async () => {
    await logout();
    setNotify({ text: "You have signed out" });
  };

  return (
    <Box
      bgcolor="#535ac8"
      display="flex"
      justifyContent="space-between"
      p={2}
      position="sticky"
      top={0}
    >
      <NavbarItem
        component={Link}
        to="/"
        icon={<HomeOutlined sx={{ color: "white" }} />}
        title="Home Page"
      />

      <Box display="flex" gap={5}>
        {isAdmin && (
          <NavbarItem
            component={Link}
            to="/admin"
            icon={<AdminPanelSettingsOutlined sx={{ color: "white" }} />}
            title="Admin Dashboard"
          />
        )}

        <NavbarItem
          component={Link}
          to="/notes"
          icon={<Description sx={{ color: "white" }} />}
          title="Notes"
        />

        <NavbarItem
          component={Link}
          to="/profile"
          icon={<PersonOutlined sx={{ color: "white" }} />}
          title="User Profile"
        />

        {user && (
          <NavbarItem
            onClick={signout}
            icon={<LogoutOutlined sx={{ color: "white" }} />}
            title="Log out"
          />
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
