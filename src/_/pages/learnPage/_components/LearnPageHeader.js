import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Box, Typography, IconButton } from "@mui/material";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";

export default function LearnPageHeader({ title, onCopyButtonClick }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        height: 50,

        backgroundColor: theme.backgroundColor,
        display: "flex",
        justifyContent: "space-between",
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

      {title === "Code" && (
        <IconButton sx={{ mr: 1 }} onClick={() => onCopyButtonClick()}>
          <ContentPasteRoundedIcon
            fontSize="small"
            sx={{ fill: theme.textColor2 }}
          />
        </IconButton>
      )}
    </Box>
  );
}
