import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import WifiTetheringRoundedIcon from "@mui/icons-material/WifiTetheringRounded";
import { EditorContext } from "../../../context/EditorContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const { NetworkId } = useContext(EditorContext);

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
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
        <WifiTetheringRoundedIcon
          sx={{ fill: theme.buttonTextColor, fontSize: "1rem" }}
        />
        <Typography variant="p1">{NetworkId}</Typography>
      </Box>

      <Typography variant="p1">Footer</Typography>

      <Typography variant="p1">Footer</Typography>
    </Box>
  );
}
