import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Box, Typography } from "@mui/material";

export default function LearnPageHeader({ title }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        height: 50,

        backgroundColor: theme.backgroundColor,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        pl: 2,
      }}
    >
      <Typography
        // variant="h5"
        // sx={{ fontWeight: 600, color: theme.textColor2 }}

        variant="h6"
        sx={{ fontWeight: 500, color: theme.textColor }}
      >
        {title}
      </Typography>
    </Box>
  );
}
