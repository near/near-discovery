import React, { useContext } from "react";
import { Box, Button, IconButton } from "@mui/material";
import VerticalSplitRoundedIcon from "@mui/icons-material/VerticalSplitRounded";

import { EditorContext } from "../../../context/EditorContext";
import { ThemeContext } from "../../../context/ThemeContext";

export default function Tabsbar({ widgets, Tab, tab, setTab }) {
  const { theme } = useContext(ThemeContext);
  const { showWebsiteView, setShowWebsiteView } = useContext(EditorContext);
  /* Tabs */
  return (
    <Box
      sx={{
        height: 50,
        backgroundColor: theme.backgroundColor,
        borderBottom: `1px solid ${theme.borderColor}`,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <Button
          sx={{
            backgroundColor: tab === Tab.Editor ? theme.ui2 : theme.ui,
            height: "100%",
            fontWeight: 600,
            textTransform: "none",

            px: 3,
            borderRadius: 0,

            color: tab === Tab.Editor ? theme.buttonColor : theme.textColor3,
            borderBottom:
              tab === Tab.Editor ? `2px ${theme.buttonColor} solid` : "none",
          }}
          aria-current="page"
          onClick={() => setTab(Tab.Editor)}
        >
          Component
        </Button>
        <Button
          sx={{
            backgroundColor: tab === Tab.Props ? theme.ui2 : theme.ui,
            height: "100%",
            fontWeight: 600,
            textTransform: "none",

            px: 3,
            borderRadius: 0,

            color: tab === Tab.Props ? theme.buttonColor : theme.textColor3,
            borderBottom:
              tab === Tab.Props ? `2px ${theme.buttonColor} solid` : "none",
          }}
          aria-current="page"
          onClick={() => setTab(Tab.Props)}
        >
          Props
        </Button>

        {widgets.widgetMetadataEditor && (
          <Button
            sx={{
              backgroundColor: tab === Tab.Metadata ? theme.ui2 : theme.ui,
              height: "100%",
              fontWeight: 600,
              textTransform: "none",

              px: 3,
              borderRadius: 0,

              color:
                tab === Tab.Metadata ? theme.buttonColor : theme.textColor3,
              borderBottom:
                tab === Tab.Metadata
                  ? `2px ${theme.buttonColor} solid`
                  : "none",
            }}
            aria-current="page"
            onClick={() => setTab(Tab.Metadata)}
          >
            Metadata
          </Button>
        )}
      </Box>

      <IconButton
        sx={{
          color: showWebsiteView ? theme.textColor3 : theme.buttonColor,
          mr: 0.5,
        }}
        onClick={() => setShowWebsiteView((e) => !e)}
      >
        <VerticalSplitRoundedIcon
          sx={{
            fill: showWebsiteView ? theme.textColor3 : theme.buttonColor,
          }}
        />
      </IconButton>
    </Box>
  );
}
