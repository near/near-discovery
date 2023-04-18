import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Fade,
  ButtonBase,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import WifiTetheringRoundedIcon from "@mui/icons-material/WifiTetheringRounded";
import { EditorContext } from "../context/EditorContext";
import { useLocation } from "react-router-dom";
import camelToNormal from "../libs/camelToNormal";

export default function Footer() {
  const { pathname } = useLocation();

  const { theme } = useContext(ThemeContext);
  const { curFileGasFee } = useContext(EditorContext);

  return (
    <Box
      sx={{
        height: 25,
        backgroundColor: theme.buttonColor,
        color: theme.buttonTextColor,

        px: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        zIndex: 999,
      }}
    >
      {/* <Box sx={{ }}></Box> */}
      <EnvironmentMenu />

      {pathname === "/editor" && curFileGasFee.near && (
        <Typography variant="p1">
          {`Storage Cost: ${curFileGasFee.near.toFixed(
            4
          )}Ⓝ (${curFileGasFee.size.toFixed(4)}kb)`}
        </Typography>
      )}
    </Box>
  );
}

const EnvironmentMenu = () => {
  const { theme } = useContext(ThemeContext);
  const { NetworkId, setNetworkId } = useContext(EditorContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonBase
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          display: "flex",
          gap: 0.5,
          alignItems: "center",
          height: "100%",
          px: 1,
        }}
        onClick={handleClick}
      >
        <WifiTetheringRoundedIcon
          sx={{ fill: theme.buttonTextColor, fontSize: "1rem" }}
        />
        <Typography variant="p1" sx={{ color: "#FFF", textTransform: "none" }}>
          {camelToNormal(NetworkId || "")}
        </Typography>
      </ButtonBase>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
          style: {
            backgroundColor: theme.ui2,
            color: theme.textColor2,
            borderRadius: "4px",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setNetworkId("testnet");
          }}
          sx={{
            transition: `all .2s ease-in-out`,
            backgroundColor:
              NetworkId === "testnet"
                ? theme.buttonColor + "!important"
                : theme.ui2,
            "&:hover": {
              backgroundColor: theme.textColor + 11,
            },
          }}
        >
          <WifiTetheringRoundedIcon
            sx={{
              fontSize: "1rem",
              mr: 1,
              fill:
                NetworkId === "testnet"
                  ? theme.buttonTextColor
                  : theme.textColor2,
            }}
          />
          <Typography
            variant="h6"
            fontWeight={400}
            sx={{
              color:
                NetworkId === "testnet"
                  ? theme.buttonTextColor
                  : theme.textColor2,
            }}
          >
            Testnet
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setNetworkId("mainnet");
          }}
          sx={{
            transition: `all .2s ease-in-out`,
            backgroundColor:
              NetworkId === "mainnet"
                ? theme.buttonColor + "!important"
                : theme.ui2,
            "&:hover": {
              backgroundColor: theme.textColor + 11,
            },
          }}
        >
          <WifiTetheringRoundedIcon
            sx={{
              fontSize: "1rem",
              mr: 1,
              fill:
                NetworkId === "mainnet"
                  ? theme.buttonTextColor
                  : theme.textColor2,
            }}
          />
          <Typography
            variant="h6"
            fontWeight={400}
            sx={{
              color:
                NetworkId === "mainnet"
                  ? theme.buttonTextColor
                  : theme.textColor2,
            }}
          >
            Mainnet
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
