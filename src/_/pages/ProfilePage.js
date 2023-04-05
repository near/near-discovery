import React from "react";
import PagesContainer from "../components/PagesContainer";
import { Widget } from "near-social-vm";
import { Box } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { EditorContext } from "../context/EditorContext";

const pattern = /.*\..*\/.*\/.*/;

export default function ProfilePage(props) {
  const { theme } = useContext(ThemeContext);
  const { Widgets } = useContext(EditorContext);
  // const { widgetSrc } = useParams();

  return (
    <PagesContainer {...props}>
      <Box
        sx={{
          wdith: "100%",
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 25px)",
          overflowY: "auto",
          backgroundColor: theme.ui,
        }}
      >
        <Box
          sx={{
            maxWidth: 1250,
            width: "100%",
            my: 4,
            mb: 2,
            px: 2,
          }}
        >
          <Widget src={Widgets?.profilePageMain} props={{ theme }} />
        </Box>
      </Box>
    </PagesContainer>
  );
}
