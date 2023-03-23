import React, { useState, createContext } from "react";

export const EditorContext = createContext();

const emptyFile = {
  index: "69420",
  name: "Untitled-1",
  type: "untitled",
};

export const EditorContextProvider = (props) => {
  const [showWebsiteView, setShowWebsiteView] = useState(true);

  const [selectedActivity, setSelectedActivity] = useState("explorer");

  const [files, setFiles] = useState([]);

  const [activeTabs, setActiveTabs] = useState([emptyFile]);
  const [selectedFile, setSelectedFile] = useState(emptyFile);
  const [outputCode, setOutputCode] = useState();

  const addEmptyFile = () => {
    let untitledFiles = activeTabs.filter((file) =>
      file.name.includes("Untitled")
    );
    const lastFileName = untitledFiles?.pop()?.name;
    const newFileName =
      parseInt(lastFileName?.substring(lastFileName?.indexOf("-") + 1)) + 1 ||
      1;
    const newFile = { ...emptyFile, name: `Untitled-${newFileName}` };
    setActiveTabs((oldArray) => [...oldArray, newFile]);
  };
  const addSelectedFile = (item) => {
    if (!item) console.warn("Can not add selected file!");
    console.log("item : ", item);
    if (!activeTabs.includes(item)) {
      setActiveTabs((oldArray) => [...oldArray, item]);
      setSelectedFile(item);
    } else {
      setSelectedFile(item);
    }
  };
  const removeSelectedFile = (item) => {
    const index = activeTabs.indexOf(item);

    const _activeTabs = activeTabs.filter((i) => i !== item);

    if (_activeTabs.length <= 0) {
      setActiveTabs(_activeTabs);
      setSelectedFile();
      return;
    }

    setActiveTabs((array) => array.filter((i) => i !== item));
    if (selectedFile === item) {
      setSelectedFile(activeTabs[index + 1] || activeTabs[0] || {});
    }
    console.log(
      "item : ",
      item,
      index,
      selectedFile === item,
      activeTabs[index + 1],
      activeTabs[0],
      {}
    );
  };

  return (
    <EditorContext.Provider
      value={{
        showWebsiteView,
        setShowWebsiteView,
        //
        // paths,
        files,
        setFiles,
        activeTabs,
        setActiveTabs,
        addEmptyFile,
        addSelectedFile,
        removeSelectedFile,
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
