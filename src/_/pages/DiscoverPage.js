import { Box, Typography, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import PagesContainer from "../components/PagesContainer";
// import ReactPlayer from "react-player";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";

export default function DiscoverPage(props) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <PagesContainer {...props}>
      <Box
        sx={{
          wdith: "100%",
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 25px)",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: 1250,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            color: "#FFF",

            py: 4,
            gap: 4,
            color: theme.textColor,
          }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            sx={{ color: theme.textColor }}
          >
            Welcome to NEARpad
          </Typography>

          <Typography
            variant="h3"
            fontWeight={500}
            textAlign="center"
            sx={{ color: theme.textColor2 }}
          >
            Create decentralized frontend widgets without limits. Let's get
            started!
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: 0.5,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: theme.buttonColor + "cc",
                    color: theme.buttonTextColor,
                  },
                }}
                size="large"
                startIcon={<ControlPointRoundedIcon />}
                to="/editor"
              >
                Create a widget
              </Button>
            </Link>
            <Link to="/search" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 0.5,
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: theme.buttonColor + "11",
                    color: theme.buttonColor,
                  },
                }}
                size="large"
                startIcon={<WidgetsRoundedIcon />}
                to="/search"
              >
                Search community widgets
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </PagesContainer>
  );
}
