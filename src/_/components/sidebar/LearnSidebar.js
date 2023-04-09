import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Typography } from "@mui/material";

export default function LearnSidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 10,
          borderBottom: `1px solid ${theme.borderColor}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor }}
        >
          Learn
        </Typography>
      </div>
    </div>
  );
}
