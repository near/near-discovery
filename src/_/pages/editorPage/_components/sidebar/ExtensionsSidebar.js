import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function ExtensionsSidebar() {
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
          Extensions
        </Typography>
      </div>

      <div></div>
    </div>
  );
}
