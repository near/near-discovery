import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ParticleBackground from "react-particle-backgrounds";
import { ThemeContext } from "../context/ThemeContext";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import imageSrc from "../images/home.PNG";
import searchSrc from "../images/search.PNG";

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

  return (
    <Box
      sx={{
        minHeight: "max(100vh, 700px)",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "center",
        position: "relative",
        backgroundColor: theme.backgroundColor,
        overflow: "hidden",
      }}
    >
      {/* <Box
        sx={{
          paddingBlock: 3,
          paddingInline: 4,
          width: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        <Header
          iconStyle={{
            fontSize: "3rem",
          }}
        />
      </Box> */}
      <ParticleBackground
        settings={settings}
        style={{
          position: "absolute",
          userSelect: "none",
        }}
      />

      <Box
        sx={{
          width: "100%",
          // maxWidth: "1240px",
          maxWidth: "90vw",
          flex: 1,
          gap: 4,

          // display: "flex",
          // flexDirection: "row",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{ fontSize: "7rem", color: theme.textColor }}
          >
            NearPad
          </Typography>
          <Typography
            variant="h2"
            fontWeight={500}
            textAlign="left"
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
                px: 4,
                py: 2,
                borderRadius: 8,
                fontSize: "1.25rem",
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
              <ArrowForwardRoundedIcon
                sx={{ marginLeft: 3, fontSize: "2rem" }}
              />
            </Button>
          </Link>
        </Box>

        <Box sx={{ flex: 1, position: "relative" }}>
          <img
            style={{
              width: "100%",
              objectFit: "cover",
              zIndex: 99999999999999,
              border: `1px ${theme.borderColor} solid`,
              borderRadius: 4,
              overflow: "hidden",

              position: "absolute",

              boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.1)",

              top: 100,
              left: 100,
            }}
            src={imageSrc}
            alt="home"
          />
          <img
            style={{
              width: "100%",
              objectFit: "cover",
              zIndex: 99999999999999,
              border: `1px ${theme.borderColor} solid`,
              borderRadius: 4,
              overflow: "hidden",
            }}
            src={searchSrc}
            alt="search"
          />
        </Box>
      </Box>
    </Box>
  );
}
