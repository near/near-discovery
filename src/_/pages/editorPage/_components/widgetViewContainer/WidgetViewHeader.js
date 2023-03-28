import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ForkRightRoundedIcon from "@mui/icons-material/ForkRightRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import { ThemeContext } from "../../../../context/ThemeContext";
import { EditorContext } from "../../../../context/EditorContext";

export default function WidgetViewHeader({
  onRunButtonClick,
  onSaveButtonClick,
  onForkButtonClick,

  publishWidgetButton,
}) {
  const { showLiveCodePreview, setShowLiveCodePreview } =
    useContext(EditorContext);

  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        paddingInline: 1,
        height: 50,
        minHeight: 50,
        backgroundColor: theme.backgroundColor,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: theme.textColor2, width: "100%" }}
        >
          Widget View
        </Typography>

        <Tooltip
          title={`Live Preview: ${showLiveCodePreview ? "On" : "Off"}`}
          placement="bottom"
        >
          <IconButton
            sx={{ color: theme.buttonTextColor }}
            onClick={() => setShowLiveCodePreview((e) => !e)}
          >
            <img
              style={{
                height: 20,
                filter: showLiveCodePreview ? "invert(0)" : "invert(1)",
              }}
              src={
                showLiveCodePreview
                  ? "https://cdn-icons-png.flaticon.com/512/3049/3049365.png"
                  : "https://cdn-icons-png.flaticon.com/512/8064/8064583.png"
              }
              alt="live icon"
            />
          </IconButton>
        </Tooltip>
      </Box>

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

        <Tooltip title="Share Widget" placement="bottom">
          <IconButton
            sx={{ color: "#198754" || theme.textColor2 }}
            onClick={onSaveButtonClick}
          >
            <ShareRoundedIcon
              sx={{ fill: "#198754" || theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip>

        <div
          style={{
            width: 1.5,
            height: 25,
            marginInline: 8,
            backgroundColor: theme.borderColor,
          }}
        />

        <Tooltip title="Fork" placement="bottom">
          <IconButton
            sx={{ color: theme.textColor2 }}
            onClick={onForkButtonClick}
          >
            <ForkRightRoundedIcon
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
        <div
          style={{
            width: 1.5,
            height: 25,
            marginInline: 8,
            backgroundColor: theme.borderColor,
          }}
        />
        {publishWidgetButton}
      </Box>
    </Box>
  );
}
