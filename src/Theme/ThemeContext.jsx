import { createContext, useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// I copy pasted the theme from another project i did before
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f6367", // Muted greenish gray (neutral tone)
    },
    secondary: {
      main: "#c9d1d3", // Light grayish blue
    },
    background: {
      default: "#f7f7f7", // Soft light gray background
      paper: "#ffffff", // White background for cards and papers
    },
    text: {
      primary: "#333333", // Dark gray text
      secondary: "#666666", // Medium gray text for secondary items
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10, // Rounded corners for smooth look
          backgroundColor: "#ffffff", // Card background color
          boxShadow: "none", // No shadow for a flat design
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded button edges
          padding: "10px 20px", // Button padding
          textTransform: "none", // Prevent uppercase text
          fontWeight: 500, // Make text a bit bolder for readability
        },
        contained: {
          backgroundColor: "#4f6367", // Muted primary button color
          color: "#ffffff", // Button text color
          "&:hover": {
            backgroundColor: "#3c5053", // Darken on hover
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Simple, neutral font
    h1: {
      fontSize: "2rem", // Large font for headings
      fontWeight: 500,
      color: "#333333",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#333333",
    },
    body1: {
      fontSize: "1rem", // Regular body text
      fontWeight: 400,
      color: "#333333",
    },
    body2: {
      fontSize: "0.875rem", // Smaller secondary text
      fontWeight: 300,
      color: "#666666",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#607d8b", // Muted blue-gray for primary
    },
    secondary: {
      main: "#9eacb2", // Light grayish blue
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Dark card background
    },
    text: {
      primary: "#ffffff", // White text for dark mode
      secondary: "#bbbbbb", // Lighter gray text
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10, // Rounded corners for a smoother look
          backgroundColor: "#1e1e1e", // Dark card background
          boxShadow: "none", // No shadow for flat design
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded button edges
          padding: "10px 20px", // Button padding
          textTransform: "none", // Prevent uppercase text
          fontWeight: 500, // Slightly bolder text
        },
        contained: {
          backgroundColor: "#607d8b", // Muted blue-gray button color
          color: "#ffffff", // Button text color
          "&:hover": {
            backgroundColor: "#4f6367", // Darken button color on hover
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Simple and neutral font
    h1: {
      fontSize: "2rem", // Headline size
      fontWeight: 500,
      color: "#ffffff",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem", // Regular body text
      fontWeight: 400,
      color: "#ffffff",
    },
    body2: {
      fontSize: "0.875rem", // Smaller text
      fontWeight: 300,
      color: "#bbbbbb",
    },
  },
});

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProviderComponent = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }

    document.body.style.backgroundColor =
      currentTheme.palette.background.default;

  }, [currentTheme]);

  const toggleTheme = () => {
    const newTheme =
      currentTheme.palette.mode === "light" ? darkTheme : lightTheme;
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme.palette.mode);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
