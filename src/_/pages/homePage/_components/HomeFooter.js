import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";

import { ThemeContext } from "../../../context/ThemeContext";

export default function HomeFooter() {
  const { theme, bp } = useContext(ThemeContext);

  const socialLinkStyle = {
    backgroundColor: theme.textColor + 11,
    color: theme.textColor,
    width: 40,
    height: 40,

    "&:hover": {
      backgroundColor: theme.textColor + 22,
    },
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.ui,

        width: "100%",
        minHeight: 75,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          // maxWidth: 1250,
          maxWidth: "90vw",

          py: 3,

          display: "flex",
          flexDirection: bp ? "column" : "row",
          gap: bp ? 3 : 0,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={500}
          style={{ color: theme.textColor3 }}
        >
          @nearpad.dev | {" " + new Date().getFullYear()}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mx: 2 }}>
          {/* <IconButton
            sx={socialLinkStyle}
            component="a"
            href="https://facebook.com/"
            target="_blank"
          >
            <FacebookIcon fill={theme.textColor3} />
          </IconButton>
          <IconButton
            sx={socialLinkStyle}
            component="a"
            href="#"
            target="_blank"
          >
            <InstagramIcon sx={{ fontSize: 20, fill: theme.textColor3 }} />
          </IconButton>
          <IconButton
            sx={socialLinkStyle}
            component="a"
            href="#"
            target="_blank"
          >
            <LinkedInIcon fill={theme.textColor3} />
          </IconButton> */}
          <IconButton
            sx={socialLinkStyle}
            component="a"
            href="https://t.me/+7k9u4Pa23sUyM2Qx"
            target="_blank"
          >
            <TelegramIcon fill={theme.textColor3} />
          </IconButton>
          <IconButton
            sx={socialLinkStyle}
            component="a"
            href="https://twitter.com/NEARPad"
            target="_blank"
          >
            <TwitterIcon sx={{ fontSize: 20, fill: theme.textColor3 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

// const FacebookIcon = ({ fill }) => (
//   <svg
//     width="11.66"
//     height="20"
//     viewBox="0 0 7 12"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M4.35166 12V6.6H5.98996L6.25757 4.2H4.35166V3.03105C4.35166 2.41305 4.36744 1.8 5.23042 1.8H6.10449V0.084082C6.10449 0.058282 5.35369 0 4.59413 0C3.00781 0 2.01455 0.994317 2.01455 2.82012V4.2H0.261719V6.6H2.01455V12H4.35166Z"
//       fill={fill}
//     />
//   </svg>
// );

// const LinkedInIcon = ({ fill }) => (
//   <svg
//     width="17"
//     height="16"
//     viewBox="0 0 11 10"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M10.1394 10H8.14082V6.50049C8.14082 5.54049 7.71762 5.00488 6.95866 5.00488C6.13274 5.00488 5.64259 5.56299 5.64259 6.50049V10H3.64401V3.5H5.64259V4.23096C5.64259 4.23096 6.26964 3.12988 7.68264 3.12988C9.09614 3.12988 10.1394 3.99305 10.1394 5.77905V10ZM1.36662 2.46045C0.692598 2.46045 0.146484 1.90948 0.146484 1.22998C0.146484 0.55098 0.692598 0 1.36662 0C2.04014 0 2.58625 0.55098 2.58625 1.22998C2.58675 1.90948 2.04014 2.46045 1.36662 2.46045ZM0.146484 10H2.64471V3.5H0.146484V10Z"
//       fill={fill}
//     />
//   </svg>
// );
