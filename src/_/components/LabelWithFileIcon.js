import { Fade, IconButton, Typography } from "@mui/material";
import FileIcon from "./FileIcon";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import React, { useContext, useState } from "react";

import RenameDialogs from "../dialogs/RenameDialogs";
import { ThemeContext } from "../context/ThemeContext";

export default function LabelWithFileIcon({ item, labelStyle, style }) {
  const { theme } = useContext(ThemeContext);

  const [showEditButton, setShowEditButton] = useState(false);
  const [showEditButtonIcon, setShowEditButtonIcon] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...style,
        }}
        onMouseEnter={() => setShowEditButtonIcon(true)}
        onMouseLeave={() => setShowEditButtonIcon(false)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7.5 }}>
          <FileIcon type={item?.type} />

          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              color: theme.textColor2,
              paddingBlock: "2.5px",
              textTransform: "none",
              fontSize: ".9rem",
              ...labelStyle,
            }}
            className="max1Lines"
          >
            {`${item.name}.${item.type}`}
          </Typography>
        </div>

        <Fade in={showEditButtonIcon}>
          <IconButton
            size="small"
            sx={{ padding: "3px", margin: 0 }}
            onClick={() => setShowEditButton((e) => !e)}
          >
            <DriveFileRenameOutlineRoundedIcon
              sx={{
                fontSize: "1rem",
                fill: theme.textColor3 || "rgba(255,255,255,.75)",
              }}
            />
          </IconButton>
        </Fade>
      </div>

      <RenameDialogs
        open={showEditButton}
        setOpen={setShowEditButton}
        item={item}
      />
    </>
  );
}
