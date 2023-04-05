import React, { useContext } from "react";
import { Widget } from "near-social-vm";
import { Box, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

import { useSnackbar } from "notistack";

import { EditorContext } from "../../context/EditorContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function SearchSidebar() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { theme } = useContext(ThemeContext);
  const { NetworkId, setOpenComponentDetail } = useContext(EditorContext);

  const onCopyButtonClick = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(`<Widget src="${textToCopy}" />`);

      enqueueSnackbar("Widget copied to clipboard!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to copy text: ", { variant: "error" });
    }
  };

  return (
    <Box
      style={{
        minWidth: 250,
        overflowX: "auto",
        height: "calc(100vh - 25px)",
        paddingBottom: 16,
      }}
    >
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
        <Typography variant="h6" sx={{ color: theme.textColor }}>
          BOS Widgets
        </Typography>
      </Box>

      <Widget
        src={`saidulbadhon.${
          NetworkId === "testnet" ? "testnet" : "near"
        }/widget/SearchPage`}
        props={{
          theme,
          onDetailsUrlClick: (e) => {
            setOpenComponentDetail((x) => (x === e ? "" : e));
            if (pathname !== "/search") {
              history.push("/search");
            }
          },
          onCopyButtonClick,
        }}
      />
    </Box>
  );
}
