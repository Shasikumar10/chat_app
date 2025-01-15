import React, { useState, Suspense, lazy } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Backdrop,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Lazy-Loaded Components
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();

  // State Management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleNewGroup = () => setIsNewGroupOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  const navigateToGroups = () => navigate("/groups");

  const logoutHandler = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height="4rem">
        <AppBar
          position="static"
          sx={{
            bgcolor: orange[500], // Orange AppBar background
          }}
        >
          <Toolbar>
            {/* Title: Visible on small and larger screens */}
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" }, // Hidden on xs screens
              }}
            >
              Chat App
            </Typography>

            {/* Mobile Menu Button */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" }, // Visible on xs screens
                marginLeft: "auto", // Push the icon to the right
              }}
            >
              <IconButton color="inherit" onClick={toggleMobileMenu}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Spacer for Center Alignment */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Action Buttons */}
            <Box>
              <IconBtn title="Search" icon={<SearchIcon />} onClick={toggleSearch} />
              <IconBtn title="New Group" icon={<AddIcon />} onClick={toggleNewGroup} />
              <IconBtn title="Manage Groups" icon={<GroupIcon />} onClick={navigateToGroups} />
              <IconBtn title="Notifications" icon={<NotificationsIcon />} onClick={toggleNotifications} />
              <IconBtn title="Logout" icon={<LogoutIcon />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Dialogs with Lazy Loading */}
      {isSearchOpen && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotificationsOpen && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}

      {isNewGroupOpen && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

// Reusable Icon Button Component
const IconBtn = ({ title, icon, onClick }) => (
  <Tooltip title={title}>
    <IconButton color="inherit" size="large" onClick={onClick}>
      {icon}
    </IconButton>
  </Tooltip>
);

export default Header;
