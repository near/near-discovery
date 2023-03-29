import React, { useState, createContext, useEffect } from "react";

export const EditorContext = createContext();

export const EditorContextProvider = (props) => {
  const [showWebsiteView, setShowWebsiteView] = useState(true);
  const [showLiveCodePreview, setShowLiveCodePreview] = useState(true);

  const [selectedActivity, setSelectedActivity] = useState("widgets");

  const [files, setFiles] = useState(undefined);
  const [filesDetails, setFilesDetails] = useState(new Map());

  //
  const [NetworkId, SetNetworkId] = useState("testnet");

  const setNetworkId = (value) => {
    SetNetworkId(value);
    // console.log("NetworkId === > ", value);

    localStorage.setItem("environment", value);

    location.reload();
  };

  useEffect(() => {
    SetNetworkId(localStorage.getItem("environment") || "mainnet");
  }, []);

  //

  const TestnetWidgets = {
    image: "eugenethedream/widget/Image",
    default: "eugenethedream/widget/Welcome",
    viewSource: "eugenethedream/widget/WidgetSource",
    widgetMetadataEditor: "eugenethedream/widget/WidgetMetadataEditor",
    widgetMetadata: "eugenethedream/widget/WidgetMetadata",
    profileImage: "eugenethedream/widget/ProfileImage",
    profilePage: "eugenethedream/widget/Profile",
    profileName: "eugenethedream/widget/ProfileName",
    notificationButton: "eugenethedream/widget/NotificationButton",
  };

  const MainnetWidgets = {
    image: "mob.near/widget/Image",
    default: "calebjacob.near/widget/ActivityPage",
    viewSource: "mob.near/widget/WidgetSource",
    widgetMetadataEditor: "mob.near/widget/WidgetMetadataEditor",
    widgetMetadata: "mob.near/widget/WidgetMetadata",
    profileImage: "mob.near/widget/ProfileImage",
    notificationButton: "mob.near/widget/NotificationButton",
    profilePage: "mob.near/widget/ProfilePage",
    profileName: "patrick.near/widget/ProfileName",
    editorComponentSearch: "mob.near/widget/Editor.ComponentSearch",
    profileInlineBlock: "mob.near/widget/Profile.InlineBlock",
  };

  // const [Widgets , setWidgets]  = useState(NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets)

  //

  return (
    <EditorContext.Provider
      value={{
        showWebsiteView,
        setShowWebsiteView,
        //
        showLiveCodePreview,
        setShowLiveCodePreview,
        //
        files,
        setFiles,
        filesDetails,
        setFilesDetails,
        //
        selectedActivity,
        setSelectedActivity,
        //
        NetworkId,
        setNetworkId,
        Widgets: NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets,
        // Widgets: TestnetWidgets,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
