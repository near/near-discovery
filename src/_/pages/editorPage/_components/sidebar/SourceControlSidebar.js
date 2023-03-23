import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function SourceControlSidebar() {
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
          Source Control
        </Typography>
      </div>

      <div></div>
    </div>
  );
}
