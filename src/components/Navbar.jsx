import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";

export default function Navbar({ searchQuery, handleSearch }) {
  const { currentTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeActive = location.pathname === "/";
  const isFavoritesActive = location.pathname === "/favorites";

  const currentMode = currentTheme.palette.mode; // light or dark mode

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: currentTheme.palette.background.paper,
        color: currentTheme.palette.text.primary,
      }}
    >
      <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          GitHub Users App
        </Typography>
        <Box sx={{flexGrow: 1,  display: "flex", justifyContent:"center" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              width: "50%",
              maxWidth: 400,
              backgroundColor: "white",
              borderRadius: 1,
              "& input": { padding: "8px" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: isHomeActive
                ? currentMode === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.2)"
                : "transparent",
              "&:hover": {
                backgroundColor: isHomeActive
                  ? currentMode === "light"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(255, 255, 255, 0.3)"
                  : currentMode === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.1)",
              },
              transition: "background-color 0.3s",
              borderRadius: 8,
            }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/favorites")}
            sx={{
              backgroundColor: isFavoritesActive
                ? currentMode === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.2)"
                : "transparent",
              "&:hover": {
                backgroundColor: isFavoritesActive
                  ? currentMode === "light"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(255, 255, 255, 0.3)"
                  : currentMode === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.1)",
              },
              transition: "background-color 0.3s",
              borderRadius: 8,
            }}
          >
            Favorites
          </Button>

          <IconButton onClick={toggleTheme} color="inherit">
            {currentMode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
