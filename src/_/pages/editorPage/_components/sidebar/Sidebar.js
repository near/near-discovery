import { Fade } from "@mui/material";
import React, { useContext } from "react";

import ExplorerSidebar from "./ExplorerSidebar";
import ProfileSidebar from "./ProfileSidebar";
import SearchSidebar from "./SearchSidebar";
import SettingsSidebar from "./SettingsSidebar";
import ExtensionsSidebar from "./ExtensionsSidebar";
import SourceControlSidebar from "./SourceControlSidebar";
import { ThemeContext } from "../../../../context/ThemeContext";
import { EditorContext } from "../../../../context/EditorContext";

export default function Sidebar({ loadFile }) {
  const { theme } = useContext(ThemeContext);
  const { selectedActivity } = useContext(EditorContext);

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        width: "100%",
        zIndex: 200,

        minHeight: "max(100vh, 700px)",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Fade timeout={500} in={selectedActivity?.length > 0 ? true : false}>
        <div>
          {(selectedActivity === "explorer" && <ExplorerSidebar />) ||
            (selectedActivity === "search" && (
              <SearchSidebar loadFile={loadFile} />
            )) ||
            (selectedActivity === "settings" && <SettingsSidebar />) ||
            (selectedActivity === "profile" && <ProfileSidebar />) ||
            (selectedActivity === "extensions" && <ExtensionsSidebar />) ||
            (selectedActivity === "sourceControl" && (
              <SourceControlSidebar />
            )) ||
            selectedActivity}
        </div>
      </Fade>
    </div>
  );
}
