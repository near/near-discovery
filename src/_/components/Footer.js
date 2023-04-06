import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import WifiTetheringRoundedIcon from "@mui/icons-material/WifiTetheringRounded";
import { EditorContext } from "../context/EditorContext";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();

  const { theme } = useContext(ThemeContext);
  const { NetworkId, curFileGasFee } = useContext(EditorContext);

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

        zIndex: 999999999999,
      }}
    >
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
        <WifiTetheringRoundedIcon
          sx={{ fill: theme.buttonTextColor, fontSize: "1rem" }}
        />
        <Typography variant="p1">{NetworkId}</Typography>
      </Box>

      {pathname === "/editor" && curFileGasFee.near && (
        <Typography variant="p1">
          {`Storage Cost: ${curFileGasFee.near.toFixed(
            4
          )}Ⓝ (${curFileGasFee.size.toFixed(4)}kb)`}
        </Typography>
      )}
    </Box>
  );
}
