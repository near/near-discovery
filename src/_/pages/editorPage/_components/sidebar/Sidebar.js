import { Fade } from "@mui/material";
import React, { useContext } from "react";

import WidgetsSidebar from "./WidgetsSidebar";
import ProfileSidebar from "./ProfileSidebar";
import SearchSidebar from "./SearchSidebar";
import SettingsSidebar from "./SettingsSidebar";
import ExtensionsSidebar from "./ExtensionsSidebar";
import SourceControlSidebar from "./SourceControlSidebar";
import { ThemeContext } from "../../../../context/ThemeContext";
import { EditorContext } from "../../../../context/EditorContext";

export default function Sidebar({
  loadFile,

  // For WidgetSidebar
  renameFile,
  curPath,
  openFile,
  removeFromFiles,
  createFile,
  handleCreateButton,
  setShowRenameModal,
  setShowOpenModal,

  // For ProfileSidebar
  logOut,
  requestSignIn,
}) {
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
          {(selectedActivity === "widgets" && (
            <WidgetsSidebar
              loadFile={loadFile}
              renameFile={renameFile}
              curPath={curPath}
              openFile={openFile}
              removeFromFiles={removeFromFiles}
              createFile={createFile}
              handleCreateButton={handleCreateButton}
              setShowRenameModal={setShowRenameModal}
              setShowOpenModal={setShowOpenModal}
            />
          )) ||
            (selectedActivity === "search" && (
              <SearchSidebar loadFile={loadFile} />
            )) ||
            (selectedActivity === "settings" && <SettingsSidebar />) ||
            (selectedActivity === "profile" && (
              <ProfileSidebar logOut={logOut} requestSignIn={requestSignIn} />
            )) ||
            // (selectedActivity === "extensions" && <ExtensionsSidebar />) ||
            // (selectedActivity === "sourceControl" && (
            //   <SourceControlSidebar />
            // )) ||
            selectedActivity}
        </div>
      </Fade>
    </div>
  );
}
