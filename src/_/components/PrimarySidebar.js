import { Fade } from "@mui/material";
import React, { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import { ThemeContext } from "../context/ThemeContext";
import ProfileSidebar from "../pages/editorPage/_components/sidebar/ProfileSidebar";
import SearchSidebar from "../pages/editorPage/_components/sidebar/SearchSidebar";
import SettingsSidebar from "../pages/editorPage/_components/sidebar/SettingsSidebar";

export default function PrimarySidebar({
  appProps,

  loadFile,

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
          {(selectedActivity === "search" && (
            <SearchSidebar loadFile={loadFile} />
          )) ||
            (selectedActivity === "settings" && <SettingsSidebar />) ||
            (selectedActivity === "profile" && (
              <ProfileSidebar
                logOut={logOut}
                requestSignIn={requestSignIn}
                appProps={appProps}
              />
            )) ||
            selectedActivity}
        </div>
      </Fade>
    </div>
  );
}
