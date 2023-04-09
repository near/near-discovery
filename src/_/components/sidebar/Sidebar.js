import { Fade } from "@mui/material";
import React, { useContext } from "react";

import WidgetsSidebar from "./WidgetsSidebar";
import ProfileSidebar from "./ProfileSidebar";
import SettingsSidebar from "./SettingsSidebar";
import { ThemeContext } from "../../context/ThemeContext";
import { EditorContext } from "../../context/EditorContext";
import EnvironmentlSidebar from "./EnvironmentlSidebar";
import SearchSidebar from "./SearchSidebar";
import NotificationsSidebar from "./NotificationsSidebar";
import LearnSidebar from "./LearnSidebar";

export default function Sidebar({
  appProps,

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
        // zIndex: 200,

        minHeight: "max(calc(100vh - 25px), 700px)",
        // height: "100%",
        maxHeight: "calc(100vh - 25px)",
        overflowY: "hidden",
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
            (selectedActivity === "search" && <SearchSidebar />) ||
            (selectedActivity === "settings" && <SettingsSidebar />) ||
            (selectedActivity === "changeNetwork" && <EnvironmentlSidebar />) ||
            (selectedActivity === "learn" && <LearnSidebar />) ||
            (selectedActivity === "notifications" && (
              <NotificationsSidebar />
            )) ||
            (selectedActivity === "profile" && (
              <ProfileSidebar
                logOut={logOut}
                requestSignIn={requestSignIn}
                appProps={appProps}
              />
            ))}
        </div>
      </Fade>
    </div>
  );
}
