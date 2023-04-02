import { Box } from "@mui/material";
import { Allotment } from "allotment";
import React, { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import { ThemeContext } from "../context/ThemeContext";
import Activitybar from "../pages/editorPage/_components/Activitybar";
import EditorPageSidebar from "../pages/editorPage/_components/sidebar/EditorPageSidebar";

export default function PagesContainer(props) {
  const { theme } = useContext(ThemeContext);
  const { selectedActivity } = useContext(EditorContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.ui,
        height: "100vh",
        maxHeight: "calc(100vh - 25px)",
        minHeight: 700,
        width: "100%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Activitybar {...props} />

      <Allotment maxSize="100%">
        <Allotment.Pane
          key="activityBar"
          snap
          visible={selectedActivity?.length > 0 ? true : false}
          preferredSize={300}
          minSize={100}
          maxSize={450}
        >
          <EditorPageSidebar
            appProps={props}
            logOut={() => props.logOut()}
            requestSignIn={() => props.requestSignIn()}
          />
        </Allotment.Pane>

        <Allotment.Pane minSize={300}>{props.children}</Allotment.Pane>
      </Allotment>
    </Box>
  );
}
