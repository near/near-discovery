import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        height: 25,
        backgroundColor: theme.buttonColor,
        color: theme.buttonTextColor,

        px: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="p1">Footer</Typography>
      <Typography variant="p1">Footer</Typography>
    </Box>
  );
}
