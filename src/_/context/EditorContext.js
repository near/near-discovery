import React, { useState, createContext } from "react";

export const EditorContext = createContext();

const emptyFile = {
  index: "69420",
  name: "Untitled-1",
  type: "untitled",
};

export const EditorContextProvider = (props) => {
  const [showWebsiteView, setShowWebsiteView] = useState(true);
  const [showLiveCodePreview, setShowLiveCodePreview] = useState(true);

  const [selectedActivity, setSelectedActivity] = useState("widgets");

  const [files, setFiles] = useState(undefined);
  const [filesDetails, setFilesDetails] = useState(new Map());

  const [activeTabs, setActiveTabs] = useState([emptyFile]);
  const [selectedFile, setSelectedFile] = useState(emptyFile);
  const [outputCode, setOutputCode] = useState();

  return (
    <EditorContext.Provider
      value={{
        showWebsiteView,
        setShowWebsiteView,
        //
        showLiveCodePreview,
        setShowLiveCodePreview,
        //
        // paths,
        //
        files,
        setFiles,
        filesDetails,
        setFilesDetails,
        //
        activeTabs,
        setActiveTabs,
        // addEmptyFile,
        // addSelectedFile,
        // removeSelectedFile,
        //
        selectedActivity,
        setSelectedActivity,
        //
        selectedFile,
        setSelectedFile,

        //
        outputCode,
        setOutputCode,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
