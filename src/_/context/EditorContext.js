import React, { useState, createContext, useEffect } from "react";

export const EditorContext = createContext();

export const EditorContextProvider = (props) => {
  const [showWebsiteView, setShowWebsiteView] = useState(true);
  const [showLiveCodePreview, setShowLiveCodePreview] = useState(true);

  const [selectedActivity, setSelectedActivity] = useState("");

  const [files, setFiles] = useState([]);
  const [filesDetails, setFilesDetails] = useState(new Map());

  const [curFileGasFee, setCurFileGasFee] = useState(0);
  const calculateGasFee = (code) => {
    const size = new Blob([code]).size;

    const inKb = size / 1024;
    const inNEAR = inKb / 100;

    setCurFileGasFee({ near: inNEAR, size: inKb });
  };

  // For Search Page
  const [openComponentDetail, setOpenComponentDetail] = useState("");

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

    // My
    profileSidebar: "saidulbadhon.testnet/widget/ProfileSidebar",
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

    // My
    profileSidebar: "saidulbadhon.near/widget/ProfileSidebar",
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
        curFileGasFee,
        calculateGasFee,
        //
        selectedActivity,
        setSelectedActivity,
        //
        NetworkId,
        setNetworkId,
        Widgets: NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets,
        // Widgets: TestnetWidgets,

        // For Search Page
        openComponentDetail,
        setOpenComponentDetail,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
