import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import PagesContainer from "../components/PagesContainer";
// import ReactPlayer from "react-player";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";

export default function DiscoverPage(props) {
  const embedUrl = `https://www.youtube.com/embed/W-krqeIwtpo`;
  const { theme } = useContext(ThemeContext);

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
          <Typography variant="h1" textAlign="center">
            Welcome to NEARpad
          </Typography>

          <Typography variant="h2" fontWeight={500} textAlign="center">
            Create decentralized frontend widgets without limits. Let's get
            started!
          </Typography>

          <div style={{ margin: 5 }}>
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  margin: 5,
                  textTransform: "none",
                  color: theme.textColor3,
                  backgroundColor: theme.textColor3 + 11,
                  padding: "5px 20px",
                  borderRadius: 0.5,
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
                style={{
                  margin: 5,
                  textTransform: "none",
                  color: theme.textColor3,
                  backgroundColor: theme.textColor3 + 11,
                  padding: "5px 20px",
                  borderRadius: 0.5,
                }}
                size="large"
                startIcon={<WidgetsRoundedIcon />}
                to="/search"
              >
                Search community widgets
              </Button>
            </Link>
          </div>

          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/W-krqeIwtpo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
        </Box>
      </Box>
    </PagesContainer>
  );
}
