import React from "react";
import { Widget } from "near-social-vm";
import { Box, Typography } from "@mui/material";
import { EditorContext } from "../../context/EditorContext";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useHistory, useLocation } from "react-router-dom";

export default function SearchSidebar() {
  const { pathname } = useLocation();
  const history = useHistory();

  const { theme } = useContext(ThemeContext);
  const { NetworkId, setOpenComponentDetail } = useContext(EditorContext);

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
        }}
      />
    </Box>
  );
}
