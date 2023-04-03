import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
// import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
// import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ForkRightRoundedIcon from "@mui/icons-material/ForkRightRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import { ThemeContext } from "../../../../context/ThemeContext";
import { EditorContext } from "../../../../context/EditorContext";

export default function WidgetViewHeader({
  loading,

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
          Preview
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
        {loading && <CircularProgress thickness={6} size={18} />}

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
        {/* <Tooltip title="Share Widget" placement="bottom">
          <IconButton
            sx={{ color: "#198754" || theme.textColor2 }}
            onClick={onSaveButtonClick}
          >
            <ShareRoundedIcon
              sx={{ fill: "#198754" || theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip> */}
        <div
          style={{
            width: 1.5,
            height: 25,
            marginInline: 8,
            backgroundColor: theme.borderColor,
          }}
        />
        <Tooltip title="Fork Widget" placement="bottom">
          <IconButton
            sx={{ color: theme.textColor2 }}
            onClick={onForkButtonClick}
          >
            <ForkRightRoundedIcon sx={{ fill: theme.textColor2 }} />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Publish Widget" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <PublicRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip> */}
        {/* <Tooltip title="Open in a new tab" placement="bottom">
          <IconButton sx={{ color: theme.textColor2 }}>
            <OpenInNewRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </IconButton>
        </Tooltip> */}
        {/* <OpenInNewTabMenu /> */}
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

const OpenInNewTabMenu = () => {
  const { theme } = useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Open in a new tab" placement="bottom">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <PublicRoundedIcon
            sx={{ fill: theme.textColor2, fontSize: "1rem" }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: 3 * 4.5,
            width: "20ch",

            backgroundColor: theme.ui,
          },
        }}
      >
        <MenuItem>
          <ListItemText sx={{ color: theme.textColor }}>Bos.gg</ListItemText>

          <ListItemIcon style={{ minWidth: 16 }}>
            <OpenInNewRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <ListItemText sx={{ color: theme.textColor }}>
            Near.Social
          </ListItemText>

          <ListItemIcon style={{ minWidth: 16 }}>
            <OpenInNewRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <ListItemText sx={{ color: theme.textColor }}>
            Alpha.Near
          </ListItemText>

          <ListItemIcon style={{ minWidth: 16 }}>
            <OpenInNewRoundedIcon
              sx={{ fill: theme.textColor2, fontSize: "1rem" }}
            />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};
