import { Box, Typography } from "@mui/material";
import React from "react";
import PagesContainer from "../components/PagesContainer";
// import ReactPlayer from "react-player";

export default function DiscoverPage(props) {
  const embedUrl = `https://www.youtube.com/embed/W-krqeIwtpo`;

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
          }}
        >
          <Typography variant="h1" textAlign="center">
            Near Pad
          </Typography>

          <Typography variant="h2" fontWeight={500} textAlign="center">
            Irure amet reprehenderit dolore non ut consequat est veniam fugiat
            nostrud fugiat id anim laborum.
          </Typography>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/W-krqeIwtpo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Box>
      </Box>
    </PagesContainer>
  );
}
