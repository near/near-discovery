import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ParticleBackground from "react-particle-backgrounds";
import { ThemeContext } from "../../context/ThemeContext";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function HomePage() {
  const { theme } = useContext(ThemeContext);

  const settings = {
    particle: {
      particleCount: 150,
      color: theme?.name === "dark" ? "#e3d5d5" : theme.textColor,
      maxSize: 2,
    },
    velocity: {
      directionAngle: 180,
      directionAngleVariance: 60,
      minSpeed: 0.1,
      maxSpeed: 0.3,
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.4,
      opacityTransitionTime: 10000,
    },
  };

  // <div>
  //   <h1>HomePage</h1>

  //   <div style={{ display: "flex", gap: 16 }}>
  //     <Link to="/">Home</Link>
  //     <Link to="/editor">Editor</Link>
  //     <Link to="/search">Search</Link>
  //   </div>
  // </div>
  return (
    <Box
      sx={{
        minHeight: "max(100vh, 700px)",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        justifyContent: "center",
        position: "relative",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ParticleBackground
        settings={settings}
        style={{
          position: "absolute",
          userSelect: "none",
        }}
      />
      <Box
        sx={{
          paddingBlock: 3,
          paddingInline: 4,
          width: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        {/* <Header
          iconStyle={{
            fontSize: "3rem",
          }}
        /> */}
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1240px",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "10rem", color: theme.textColor }}
        >
          NearPad
        </Typography>
        <Typography
          variant="h1"
          fontWeight={500}
          textAlign="center"
          sx={{
            color: theme.textColor,
          }}
        >
          <span style={{ color: theme.buttonColor2, fontWeight: 600 }}>
            Supercharge
          </span>{" "}
          your workflow with instant
          <br />
          cloud development environments.
        </Typography>

        <Link to="/editor" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              mt: 10,
              pl: 6,
              pr: 6,
              pt: 2,
              pb: 2,
              borderRadius: 8,
              fontSize: "2rem",
              fontWeight: 600,
              backgroundColor: theme.textColor + "0D",
              color: theme.textColor,
              "&:hover": {
                backgroundColor: theme.textColor + "1A !important",
                color: theme.buttonColor,
              },
            }}
            to="/editor"
          >
            Code Now
            <ArrowForwardRoundedIcon sx={{ marginLeft: 3, fontSize: "2rem" }} />
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
