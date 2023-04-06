import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Widget } from "near-social-vm";

export default function NotificationsSidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box>
      <Box
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
          Notifications
        </Typography>
      </Box>

      <Box sx={{ p: 1 }}>
        <Widget src="mob.near/widget/NotificationFeed" />
      </Box>
    </Box>
  );
}
