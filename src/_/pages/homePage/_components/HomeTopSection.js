import React, { useContext } from "react";
import ParticleBackground from "react-particle-backgrounds";
import { ThemeContext } from "../../../context/ThemeContext";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReactPlayer from "react-player";

export default function HomeTopSection() {
  // const min720 = useMediaQuery("(min-width:820px)");

  const { theme, bp } = useContext(ThemeContext);

  // const handleClick = (gateway) => {
  //   const gateways = {
  //     alpha: "https://alpha.near.org/#/",
  //     social: "https://near.social/#/",
  //     bos: "https://bos.gg/#/",
  //   };
  //   window.open(gateways[gateway], "_blank", "noreferrer");
  // };

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
        // overflow: "hidden",
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
          width: "100%",
          maxWidth: "90vw",
          // maxWidth: 1250,
          flex: 1,
          gap: 2,
          display: "grid",
          gridTemplateColumns: bp ? "1fr" : "1fr 1fr",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            style={{
              fontSize: bp ? 32 : 64,
              // fontSize: "clamp(24px, 10vw, 64px)",
              color: theme.textColor,
            }}
          >
            {/* Web3 Dev Toolkit */}
            Build web3 apps without limits
            {/* nearpad */}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="left"
            sx={{
              mt: 2,
              color: theme.textColor,
            }}
          >
            nearpad help developers build, deploy, share and monetize reusable
            web3 contracts and ui components
          </Typography>

          {/* <Typography
            fontWeight={bp ? 300 : 200}
            // variant={bp ? "h4" : "h3"}
            variant="h5"
            sx={{
              marginTop: 4,
              color: theme.textColor,
            }}
          >
            Create decentralized frontend widgets without limits.
          </Typography> */}

          {/* <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography style={{ color: theme.textColor }}>
              We &#x2665;
            </Typography>
            <Chip
              sx={{ color: theme.textColor3 }}
              label="Developers"
              avatar={<SupervisedUserCircleRoundedIcon />}
            />
            <Chip
              label="Discovery"
              color="info"
              onClick={(e) => handleClick("alpha")}
            />
            <Chip
              label="NEAR.social"
              color="primary"
              onClick={(e) => handleClick("social")}
            />
            <Chip
              label="BOS.gg"
              color="warning"
              onClick={(e) => handleClick("bos")}
            />
          </Box> */}

          {/* <Typography
            style={{
              marginTop: 100,
            }}
          >
            <span style={{ color: theme.textColor }}>
              We're still working out the kinks. Want to help us get ready for
              the prime time? Join the telegram channel and ask for the private
              beta access.
            </span>
          </Typography> */}
          {/* <Link
        target="_blank"
        to="https://t.me/+7k9u4Pa23sUyM2Qx"
        style={{ textDecoration: "none" }}
      > */}
          <Button
            sx={{
              mt: 4,
              px: 3,
              py: 1.5,
              borderRadius: 1,
              fontSize: bp ? "1rem" : "1.25rem",
              fontWeight: 600,
              backgroundColor: theme.textColor + "0D",
              color: theme.textColor,
              "&:hover": {
                backgroundColor: theme.textColor + "1A !important",
                color: theme.buttonColor,
              },
            }}
            //to="/discover"
            onClick={(e) => (window.location.hash = "#/editor")}
          >
            Try for free
            <ArrowForwardRoundedIcon
              sx={{ marginLeft: 3, fontSize: bp ? "1rem" : "2rem" }}
            />
          </Button>
          {/* </Link> */}
        </Box>

        {/* <Box> */}
        <Box className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://youtu.be/et_QcL1xffU"
            // config={{ youtube: { playerVars: { controls: 1 } } }}
            controls={false}
            width="100%"
            height="100%"
            loop
            playing
            volume={0}
          />
        </Box>
        {/* </Box> */}

        {/* {min720 && (
          <Box
            sx={{
              flex: 1,
              position: "relative",
              marginRight: 1,
            }}
          >
            <img
              style={{
                width: "100%",
                minWidth: 300,
                maxWidth: 900,
                height: "100%",
                objectFit: "cover",
                zIndex: 99999999999999,
                border: `1px ${theme.borderColor} solid`,
                borderRadius: 4,
                overflow: "hidden",

                position: "absolute",

                boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.1)",

                top: 200,
                left: 100,
              }}
              src={imageSrc}
              alt="home"
            />
            <img
              style={{
                width: "100%",
                minWidth: 300,
                maxWidth: 900,
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
        )} */}
      </Box>
    </Box>
  );
}
