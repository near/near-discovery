import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import TabRoundedIcon from "@mui/icons-material/TabRounded";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function WidgetViewHeader({ onRunButtonClick }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        paddingInline: 1,
        height: 50,
        backgroundColor: theme.backgroundColor,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ color: theme.textColor2, width: "100%" }}>
        Website View
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Run" placement="bottom">
          <IconButton
            sx={{
              color: theme.buttonColor,
              backgroundColor: theme.buttonColor + 33,
              "&:hover": {
                backgroundColor: theme.buttonColor + 66,
              },
            }}
            onClick={onRunButtonClick}
          >
            <PlayArrowRoundedIcon sx={{ fill: theme.buttonColor }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Deploy" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <PublicRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Open in a new tab" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <TabRoundedIcon sx={{ fill: theme.textColor2, fontSize: "1rem" }} />
          </IconButton>
        </Tooltip>

        {/* <ActivityButton
          icon={<VerticalSplitRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="showWebsite"
          onClick={() => setShowWebsiteView((e) => !e)}
        /> */}
      </Box>
    </Box>
  );
}
