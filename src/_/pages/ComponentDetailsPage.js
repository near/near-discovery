import React from "react";
import { Widget } from "near-social-vm";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

export default function ComponentDetailsPage() {
  const { widgetSrc } = useParams();
  return (
    <Box
      sx={{
        wdith: "100%",
        display: "flex",
        justifyContent: "center",
        height: "100%",
        overflowY: "auto",
        my: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1250,
          width: "100%",
        }}
      >
        <Widget
          src="adminalpha.near/widget/ComponentDetailsPage"
          props={{
            src: widgetSrc,
          }}
        />
      </Box>
    </Box>
  );
}
