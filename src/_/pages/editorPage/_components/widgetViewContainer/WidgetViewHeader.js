import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

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
        Widget View
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Preview Widget" placement="bottom">
          <IconButton
            sx={{
              color: theme.buttonColor,
              "&:hover": {
                backgroundColor: theme.buttonColor + 66,
              },
            }}
            onClick={onRunButtonClick}
          >
            <PlayArrowRoundedIcon sx={{ fill: theme.buttonColor }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Save Widget" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <SaveRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Publish Widget" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <PublicRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Open in a new tab" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <OpenInNewRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
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
