import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ls from "local-storage";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { useHistory, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Widget,
  useCache,
  useNear,
  CommitButton,
  useAccountId,
} from "near-social-vm";
import AddModal from "../../../components/Editor/AddModal";
import CreateModal from "../../../components/Editor/CreateModal";
import { SaveDraftModal } from "../../../components/SaveDraft";

import { Box, Button, IconButton } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import EditorPageActivitybar from "./_components/Activitybar";
import WidgetViewContainer from "./_components/widgetViewContainer/WidgetViewContainer";
import EmptyEditorDialog from "../../dialogs/EmptyEditorDialog";
import { EditorContext } from "../../context/EditorContext";
import Sidebar from "./_components/sidebar/Sidebar";
import { ThemeContext } from "../../context/ThemeContext";
import RenameDialog from "../../dialogs/RenameDialog";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useDebouncedCallback } from "use-debounce";
import OpenWidgetDialog from "../../dialogs/OpenWidgetDialog";
import VerticalSplitRoundedIcon from "@mui/icons-material/VerticalSplitRounded";

const StorageDomain = {
  page: "editor",
};

const StorageType = {
  Code: "code",
  Files: "files",
};

const Filetype = {
  Widget: "widget",
  Module: "module",
};

const LsKey = "social.near:v01:";
const EditorLayoutKey = LsKey + "editorLayout:";
const WidgetPropsKey = LsKey + "widgetProps:";

const DefaultEditorCode = "return <div>Hello World</div>;";

const Tab = {
  Editor: "Editor",
  Props: "Props",
  Metadata: "Metadata",
  Widget: "Widget",
};

const Layout = {
  Tabs: "Tabs",
  Split: "Split",
};

export default function EditorPage(props) {
  const { theme } = useContext(ThemeContext);
  const {
    selectedActivity,
    showWebsiteView,
    setShowWebsiteView,

    files,
    setFiles,
    filesDetails,
    setFilesDetails,

    showLiveCodePreview,
  } = useContext(EditorContext);

  const debouncedFunction = useDebouncedCallback(
    () => {
      // Your function here
      if (code) handlePreviewButton();
    },
    // Delay in ms
    500
  );

  // END OF _ CODES

  const { widgetSrc } = useParams();
  const history = useHistory();
  const setWidgetSrc = props.setWidgetSrc;

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(undefined);
  const [path, setPath] = useState(undefined);
  // const [files, setFiles] = useState(undefined);
  const [lastPath, setLastPath] = useState(undefined);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [renderCode, setRenderCode] = useState(code);
  const [widgetProps, setWidgetProps] = useState(
    ls.get(WidgetPropsKey) || "{}"
  );
  const [parsedWidgetProps, setParsedWidgetProps] = useState({});
  const [propsError, setPropsError] = useState(null);
  const [metadata, setMetadata] = useState(undefined);
  const [codeChangesPresent, setCodeChangesPresent] = useState(false);
  const [codeOnChain, setCodeOnChain] = useState(null);
  const [draftOnChain, setDraftOnChain] = useState(null);
  // const [filesDetails, setFilesDetails] = useState(new Map());
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();

  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(
    ls.get(EditorLayoutKey) || Layout.Tabs
  );

  const setLayout = useCallback(
    (layout) => {
      ls.set(EditorLayoutKey, layout);
      setLayoutState(layout);
    },
    [setLayoutState]
  );

  useEffect(() => {
    setWidgetSrc({
      edit: null,
      view: widgetSrc,
    });
  }, [widgetSrc, setWidgetSrc]);

  const updateCode = useCallback(
    (path, code) => {
      cache.localStorageSet(
        StorageDomain,
        {
          path,
          type: StorageType.Code,
        },
        {
          code,
          time: Date.now(),
        }
      );
      // console.log(code);
      setCode(code);
    },
    [cache, setCode]
  );

  useEffect(() => {
    const widgetSrc = `${accountId}/widget/${widgetName}/**`;
    const fetchCodeAndDraftOnChain = () => {
      const widgetCode = cache.socialGet(
        near,
        widgetSrc,
        false,
        undefined,
        undefined,
        fetchCodeAndDraftOnChain
      );

      setCodeOnChain(widgetCode?.[""]);
      setDraftOnChain(widgetCode?.branch?.draft?.[""]);
    };
    fetchCodeAndDraftOnChain();
  }, [code]);

  useEffect(() => {
    let hasCodeChanged;
    if (draftOnChain) {
      hasCodeChanged = draftOnChain != code;
    } else if (codeOnChain) {
      hasCodeChanged = codeOnChain != code;
    } else {
      // no code on chain
      hasCodeChanged = true;
    }
    setCodeChangesPresent(hasCodeChanged);
  }, [code, codeOnChain, draftOnChain]);

  const checkDrafts = () => {
    files.forEach((f) => {
      const widgetSrc = `${accountId}/widget/${f.name}/**`;
      const fetchCodeAndDraftOnChain = () => {
        const widgetCode = cache.socialGet(
          near,
          widgetSrc,
          false,
          undefined,
          undefined,
          fetchCodeAndDraftOnChain
        );

        const mainCode = widgetCode?.[""];
        const draft = widgetCode?.branch?.draft?.[""];
        const isDraft = (!draft && !mainCode) || draft;
        const path = f;

        setFilesDetails(
          filesDetails.set(f.name, {
            codeChangesPresent: filesDetails.get(f.name)?.codeChangesPresent,
            isDraft,
          })
        );
      };
      fetchCodeAndDraftOnChain();
    });
  };

  const checkHasCodeChange = () => {
    files.forEach((f) => {
      const widgetSrc = `${accountId}/widget/${f.name}/**`;
      const fetchCodeAndDraftOnChain = () => {
        const widgetCode = cache.socialGet(
          near,
          widgetSrc,
          false,
          undefined,
          undefined,
          fetchCodeAndDraftOnChain
        );

        const mainCode = widgetCode?.[""];

        const draft = widgetCode?.branch?.draft?.[""];
        const path = f;

        cache
          .asyncLocalStorageGet(StorageDomain, {
            path,
            type: StorageType.Code,
          })
          .then(({ code }) => {
            let hasCodeChanged;
            if (draft) {
              hasCodeChanged = draft != code;
            } else if (mainCode) {
              hasCodeChanged = mainCode != code;
            } else {
              // no code on chain
              hasCodeChanged = true;
            }
            setFilesDetails(
              filesDetails.set(f.name, {
                codeChangesPresent: hasCodeChanged,
                isDraft: filesDetails.get(f.name)?.isDraft,
              })
            );
          });
      };
      fetchCodeAndDraftOnChain();
    });
  };

  const checkHasCodeChangeSingleFile = (code) => {
    const widgetSrc = `${accountId}/widget/${widgetName}/**`;
    const fetchCodeAndDraftOnChain = () => {
      const widgetCode = cache.socialGet(
        near,
        widgetSrc,
        false,
        undefined,
        undefined,
        fetchCodeAndDraftOnChain
      );

      const mainCode = widgetCode?.[""];
      const draft = widgetCode?.branch?.draft?.[""];
      let hasCodeChanged;
      if (draft) {
        hasCodeChanged = draft != code;
      } else if (mainCode) {
        hasCodeChanged = mainCode != code;
      } else {
        // no code on chain
        hasCodeChanged = true;
      }
      setFilesDetails(
        filesDetails.set(widgetName, {
          codeChangesPresent: hasCodeChanged,
          isDraft: filesDetails.get(widgetName)?.isDraft,
        })
      );
    };
    fetchCodeAndDraftOnChain();
  };

  useEffect(() => {
    if (!files) {
      return;
    }

    checkDrafts();
    checkHasCodeChange();
  }, [files]);

  useEffect(() => {
    checkHasCodeChangeSingleFile(code);
  }, [code]);

  useEffect(() => {
    ls.set(WidgetPropsKey, widgetProps);
    try {
      const parsedWidgetProps = JSON.parse(widgetProps);
      setParsedWidgetProps(parsedWidgetProps);
      setPropsError(null);
    } catch (e) {
      setParsedWidgetProps({});
      setPropsError(e.message);
    }
  }, [widgetProps]);

  const removeFromFiles = useCallback(
    (path) => {
      path = JSON.stringify(path);
      setFiles((files) =>
        files.filter((file) => JSON.stringify(file) !== path)
      );
      setLastPath(path);
    },
    [setFiles, setLastPath]
  );

  const addToFiles = useCallback(
    (path) => {
      const jpath = JSON.stringify(path);
      setFiles((files) => {
        const newFiles = [...files];
        if (!files.find((file) => JSON.stringify(file) === jpath)) {
          newFiles.push(path);
        }
        return newFiles;
      });
      setLastPath(path);
    },
    [setFiles, setLastPath]
  );

  useEffect(() => {
    if (files && lastPath) {
      cache.localStorageSet(
        StorageDomain,
        {
          type: StorageType.Files,
        },
        { files, lastPath }
      );
    }
  }, [files, lastPath, cache]);

  // console.log("path : ", path);

  const openFile = useCallback(
    (path, code) => {
      setCodeChangesPresent();
      setPath(path);
      addToFiles(path);
      setMetadata(undefined);
      setRenderCode(null);
      if (code !== undefined) {
        updateCode(path, code);
      } else {
        setLoading(true);
        cache
          .asyncLocalStorageGet(StorageDomain, {
            path,
            type: StorageType.Code,
          })
          .then(({ code }) => {
            updateCode(path, code);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [updateCode, addToFiles]
  );

  const toPath = useCallback((type, nameOrPath) => {
    const name =
      nameOrPath.indexOf("/") >= 0
        ? nameOrPath.split("/").slice(2).join("/")
        : nameOrPath;
    return { type, name };
  }, []);

  const openDraft = useCallback(
    (widgetName) => {
      if (!near) {
        return;
      }
      const widgetSrc = `${accountId}/widget/${widgetName}/branch/draft`;

      const c = () => {
        const draftCode = cache.socialGet(
          near,
          widgetSrc,
          false,
          undefined,
          undefined,
          c
        );
        openFile(toPath(Filetype.Widget, widgetSrc), draftCode || code);
      };

      c();
    },
    [accountId, openFile, toPath, near, cache]
  );

  const loadFile = useCallback(
    (nameOrPath) => {
      if (!near) {
        return;
      }

      let widgetSrc =
        nameOrPath.indexOf("/") >= 0
          ? nameOrPath
          : `${accountId}/widget/${nameOrPath}`;

      const widget = `${widgetSrc}/**`;

      const c = () => {
        const code = cache.socialGet(
          near,
          widget,
          false,
          undefined,
          undefined,
          c
        );

        const mainCode = code?.[""];
        const draftCode = code?.branch?.draft?.[""];
        const currentCode = draftCode || mainCode;

        if (currentCode) {
          openFile(toPath(Filetype.Widget, widgetSrc), currentCode);
        }
      };

      c();
    },
    [accountId, openFile, toPath, near, cache]
  );

  const generateNewName = useCallback(
    (type) => {
      for (let i = 0; ; i++) {
        const name = `Untitled-${i}`;
        const path = toPath(type, name);
        path.unnamed = true;
        const jPath = JSON.stringify(path);
        if (!files?.find((file) => file.name === name)) {
          return path;
        }
      }
    },
    [toPath, files]
  );

  const createNewFile = useCallback(
    (type) => {
      const path = generateNewName(type);
      path.unnamed = undefined;
      openFile(path, DefaultEditorCode);
    },
    [generateNewName, openFile]
  );

  const createFile = useCallback(
    (type) => {
      const path = generateNewName(type);
      openFile(path, DefaultEditorCode);
    },
    [generateNewName, openFile]
  );

  const renameFile = useCallback(
    (newName, code) => {
      const newPath = toPath(path.type, newName);
      const jNewPath = JSON.stringify(newPath);
      const jPath = JSON.stringify(path);
      setFiles((files) => {
        const newFiles = files.filter(
          (file) => JSON.stringify(file) !== jNewPath
        );
        const i = newFiles.findIndex((file) => JSON.stringify(file) === jPath);
        if (i >= 0) {
          newFiles[i] = newPath;
        }
        return newFiles;
      });
      setLastPath(newPath);
      setPath(newPath);
      updateCode(newPath, code);
    },
    [path, toPath, updateCode]
  );

  useEffect(() => {
    cache
      .asyncLocalStorageGet(StorageDomain, { type: StorageType.Files })
      .then((value) => {
        const { files, lastPath } = value || {};
        setFiles(files || []);
        setLastPath(lastPath);
      });
  }, [cache]);

  useEffect(() => {
    if (!near || !files) {
      return;
    }
    if (widgetSrc) {
      if (widgetSrc === "new") {
        createFile(Filetype.Widget);
      } else {
        loadFile(widgetSrc);
      }
      analytics("edit", {
        props: {
          widget: widgetSrc,
        },
      });
      history.replace(`/edit/`);
    } else if (path === undefined) {
      if (files.length === 0) {
        createFile(Filetype.Widget);
      } else {
        openFile(lastPath, undefined);
      }
    }
  }, [near, createFile, lastPath, files, path, widgetSrc, openFile, loadFile]);

  const reformat = useCallback(
    (path, code) => {
      try {
        const formattedCode = prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel],
        });
        updateCode(path, formattedCode);
      } catch (e) {
        console.log(e);
      }
    },
    [updateCode]
  );

  const reformatProps = useCallback(
    (props) => {
      try {
        const formattedProps = JSON.stringify(JSON.parse(props), null, 2);
        setWidgetProps(formattedProps);
      } catch (e) {
        console.log(e);
      }
    },
    [setWidgetProps]
  );

  const layoutClass = layout === Layout.Split ? "col-lg-6" : "";

  const onLayoutChange = useCallback(
    (e) => {
      const layout = e.target.value;
      if (layout === Layout.Split && tab === Tab.Widget) {
        setTab(Tab.Editor);
      }
      setLayout(layout);
    },
    [setLayout, tab, setTab]
  );

  const widgetName = path?.name?.split("/")[0];
  const widgetPathName = path?.name;
  // const isDraft = path?.name?.split("/")[2] === "draft";

  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);

  const createOpenDraftButton = (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        openDraft(widgetName);
      }}
    >
      Open a Draft Version
    </button>
  );

  const publishDraftAsMainButton = (
    <CommitButton
      id="publishDraftAsMainButton"
      className={`btn btn-primary`}
      style={{
        backgroundColor: theme.buttonColor,
        paddingInline: 16,
        borderRadius: 4,

        fontWeight: 500,
      }}
      //
      disabled={!widgetName}
      near={near}
      data={{
        widget: {
          [widgetName]: {
            "": code,
            metadata,
            branch: {
              draft: null,
            },
          },
        },
      }}
    >
      Publish
    </CommitButton>
  );

  const saveDraftButton = (
    <button
      className="btn btn-outline-primary me-2"
      disabled={!widgetName}
      onClick={(e) => {
        e.preventDefault();
        setShowSaveDraftModal(true);
      }}
    >
      Save Version
    </button>
  );
  const handleSaveDraftButton = (e) => {
    e.preventDefault();
    setShowSaveDraftModal(true);
  };

  const publishButton = (
    <CommitButton
      id="publishButton"
      className={`btn btn-primary`}
      style={{
        backgroundColor: theme.buttonColor,
        paddingInline: 16,
        borderRadius: 4,

        fontWeight: 500,
      }}
      //
      disabled={!widgetName}
      near={near}
      data={{
        widget: {
          [widgetName]: {
            "": code,
            metadata,
          },
        },
      }}
    >
      Publish
    </CommitButton>
  );

  const renderPreviewButton = (
    <button
      className="btn btn-outline-primary"
      onClick={() => {
        setRenderCode(code);
        if (layout === Layout.Tabs) {
          setTab(Tab.Widget);
        }
      }}
    >
      Render Preview
    </button>
  );
  const handlePreviewButton = () => {
    setRenderCode(code);
    if (layout === Layout.Tabs) {
      setTab(Tab.Widget);
    }
  };

  const openCreateButton = (
    <button
      className="btn btn-success ms-2"
      onClick={() => setShowAddModal(true)}
      style={{
        fontSize: "20px",
        height: "40px",
        lineHeight: "38px",
        paddingTop: "0",
        marginTop: "0",
      }}
    >
      <i className="bi bi-plus"></i>
    </button>
  );

  const renameButton = (
    <button
      className="btn btn-outline-success ms-2"
      style={{ height: "40px" }}
      onClick={() => {
        setShowRenameModal(true);
      }}
    >
      <i className="bi bi-pen"></i>
    </button>
  );

  const openInNewTabButton = (
    <a
      className="btn me-2 btn-outline-secondary"
      style={{ height: "38px" }}
      href={`#/${widgetPath}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Open Component
    </a>
  );

  const forkButton = (
    <button
      className="btn btn-outline-primary me-2"
      onClick={() => {
        const forkName = widgetName + "-fork";
        openFile(toPath(Filetype.Widget, forkName), code);
      }}
    >
      Fork
    </button>
  );
  const handleForkButton = () => {
    const forkName = widgetName + "-fork";
    openFile(toPath(Filetype.Widget, forkName), code);
  };

  const showEditor = !(files?.length === 1 && files[0]?.unnamed === true);
  // const showEditor = false;

  return (
    <>
      <EmptyEditorDialog
        showEditor={showEditor}
        setShowAddModal={setShowAddModal}
        setShowOpenModal={setShowOpenModal}
        createNewFile={createNewFile}
        Filetype={Filetype}
      />

      <Box
        // className={`container ${showEditor ? "" : "visually-hidden"}`}
        // className={`${showEditor ? "" : "visually-hidden"}`}
        //
        sx={{
          backgroundColor: theme.ui,

          minHeight: "max(100vh, 700px)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",

          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",

          height: "100vh",
        }}
      >
        <EditorPageActivitybar {...props} />
        {/* <VsCodeBanner /> */}

        <Allotment maxSize="100%">
          <Allotment.Pane
            key="activityBar"
            snap
            visible={selectedActivity?.length > 0 ? true : false}
            preferredSize={300}
            minSize={100}
            maxSize={450}
          >
            <Sidebar
              loadFile={loadFile}
              // For WidgetSidebar
              renameFile={renameFile}
              curPath={path}
              openFile={openFile}
              removeFromFiles={removeFromFiles}
              createFile={createFile}
              handleCreateButton={() => {
                // setShowAddModal(false),
                setShowRenameModal(true);
                createNewFile(Filetype.Widget);
              }}
              setShowRenameModal={setShowRenameModal}
            />
          </Allotment.Pane>

          <Allotment.Pane minSize={300}>
            {/* <Tabsbar
              curPath={path}
              openFile={openFile}
              removeFromFiles={removeFromFiles}
              createFile={createFile}
              handleCreateButton={() => {
                // setShowAddModal(false),
                setShowRenameModal(true);
                createNewFile(Filetype.Widget);
              }}
            /> */}

            <div
            // style={{ paddingTop: 10 }}
            // className="container-fluid mt-1"
            >
              {/* Dialog boxs - start */}
              <RenameDialog
                key={`rename-modal-${jpath}`}
                show={showRenameModal}
                name={path?.name}
                onRename={(newName) => renameFile(newName, code)}
                onHide={() => setShowRenameModal(false)}
              />
              <OpenWidgetDialog
                show={showOpenModal}
                onOpen={(newName) => loadFile(newName)}
                onHide={() => setShowOpenModal(false)}
              />
              <AddModal
                show={showAddModal}
                onOpen={() => (setShowAddModal(false), setShowOpenModal(true))}
                onNew={() => (
                  setShowAddModal(false),
                  setShowRenameModal(true),
                  createNewFile(Filetype.Widget)
                )}
                onHide={() => setShowAddModal(false)}
              />
              <CreateModal
                show={showCreateModal}
                onOpen={(newName) => loadFile(newName)}
                onNew={() => {
                  createNewFile(Filetype.Widget);
                }}
                onHide={() => setShowCreateModal(false)}
              />
              <SaveDraftModal
                show={showSaveDraftModal}
                onHide={() => setShowSaveDraftModal(false)}
                near={near}
                widgetPath={widgetPath}
                widgetName={widgetName}
                code={code}
              />
              {/* Dialog boxs - end */}

              {/* Tabs */}
              <Box
                sx={{
                  height: 50,
                  backgroundColor: "#1a1a1a" || theme.backgroundColor,
                  borderBottom: `1px solid ${theme.borderColor}`,

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    height: "100%",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor:
                        tab === Tab.Editor ? theme.ui2 : theme.ui,
                      height: "100%",
                      fontWeight: 600,
                      textTransform: "none",

                      px: 3,
                      borderRadius: 0,

                      color:
                        tab === Tab.Editor
                          ? theme.buttonColor
                          : theme.textColor3,
                      borderBottom:
                        tab === Tab.Editor
                          ? `2px ${theme.buttonColor} solid`
                          : "none",
                    }}
                    aria-current="page"
                    onClick={() => setTab(Tab.Editor)}
                  >
                    Component
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: tab === Tab.Props ? theme.ui2 : theme.ui,
                      height: "100%",
                      fontWeight: 600,
                      textTransform: "none",

                      px: 3,
                      borderRadius: 0,

                      color:
                        tab === Tab.Props
                          ? theme.buttonColor
                          : theme.textColor3,
                      borderBottom:
                        tab === Tab.Props
                          ? `2px ${theme.buttonColor} solid`
                          : "none",
                    }}
                    aria-current="page"
                    onClick={() => setTab(Tab.Props)}
                  >
                    Props
                  </Button>
                  {props.widgets.widgetMetadataEditor && (
                    <Button
                      sx={{
                        backgroundColor:
                          tab === Tab.Metadata ? theme.ui2 : theme.ui,
                        height: "100%",
                        fontWeight: 600,
                        textTransform: "none",

                        px: 3,
                        borderRadius: 0,

                        color:
                          tab === Tab.Metadata
                            ? theme.buttonColor
                            : theme.textColor3,
                        borderBottom:
                          tab === Tab.Metadata
                            ? `2px ${theme.buttonColor} solid`
                            : "none",
                      }}
                      aria-current="page"
                      onClick={() => setTab(Tab.Metadata)}
                    >
                      Metadata
                    </Button>
                  )}
                </Box>

                <IconButton
                  sx={{
                    color: showWebsiteView
                      ? theme.textColor2
                      : theme.buttonColor,
                    mr: 0.5,
                  }}
                  onClick={() => setShowWebsiteView((e) => !e)}
                >
                  <VerticalSplitRoundedIcon
                    sx={{
                      fill: showWebsiteView
                        ? theme.textColor2
                        : theme.buttonColor,
                    }}
                  />
                </IconButton>
              </Box>
              {/* {layout === Layout.Tabs && (
                <div className="ms-auto d-flex">
                  {path && accountId && openInNewTabButton}
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Layout selection"
                    style={{
                      height: "38px",
                    }}
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="layout-radio"
                      id="layout-tabs"
                      autoComplete="off"
                      checked={layout === Layout.Tabs}
                      onChange={onLayoutChange}
                      value={Layout.Tabs}
                      title={"Set layout to Tabs mode"}
                    />
                    <label
                      className="btn btn-outline-secondary"
                      htmlFor="layout-tabs"
                    >
                      <i className="bi bi-square" />
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="layout-radio"
                      id="layout-split"
                      autoComplete="off"
                      checked={layout === Layout.Split}
                      value={Layout.Split}
                      title={"Set layout to Split mode"}
                      onChange={onLayoutChange}
                    />
                    <label
                      className="btn btn-outline-secondary"
                      htmlFor="layout-split"
                    >
                      <i className="bi bi-layout-split" />
                    </label>
                  </div>
                </div>
              )} */}

              <div className={`${tab === Tab.Editor ? "" : "visually-hidden"}`}>
                <div
                  style={{
                    height: "calc(100vh - 90px)",
                    borderTopLeftRadius: "0px",
                  }}
                >
                  <Editor
                    // This is for props
                    theme="light"
                    value={code}
                    path={widgetPath}
                    defaultLanguage="javascript"
                    onChange={(code) => {
                      updateCode(path, code);

                      if (showLiveCodePreview) debouncedFunction();
                    }}
                    wrapperProps={{
                      onBlur: () => reformat(path, code),
                    }}
                  />
                </div>
                <div className="mb-3 d-flex gap-2 flex-wrap"></div>
              </div>

              <div className={`${tab === Tab.Props ? "" : "visually-hidden"}`}>
                <div
                  //  className="form-control"

                  style={{
                    height: "calc(100vh - 90px)",
                    borderTopLeftRadius: "0px",
                  }}
                >
                  <Editor
                    // This is for Component
                    theme="vs-dark"
                    value={widgetProps}
                    defaultLanguage="json"
                    onChange={(props) => setWidgetProps(props)}
                    wrapperProps={{
                      onBlur: () => reformatProps(widgetProps),
                    }}
                  />
                </div>
                <div className=" mb-3">^^ Props for debugging (in JSON)</div>
                {propsError && (
                  <pre className="alert alert-danger">{propsError}</pre>
                )}
              </div>

              <div
                className={`${
                  tab === Tab.Metadata && props.widgets.widgetMetadataEditor
                    ? ""
                    : "visually-hidden"
                }`}
              >
                <div
                  className="mb-3"
                  style={{
                    paddingTop: "20px",
                    padding: "20px",
                    border: "1px solid rgb(206, 212, 218)",
                    appearance: "none",
                    borderRadius: "0.375rem",
                    height: "70vh",
                  }}
                >
                  <Widget
                    src={props.widgets.widgetMetadataEditor}
                    key={`metadata-editor-${jpath}`}
                    props={useMemo(
                      () => ({
                        widgetPath,
                        onChange: setMetadata,
                      }),
                      [widgetPath]
                    )}
                  />
                </div>
              </div>

              <div
                className={`${
                  tab === Tab.Metadata ? layoutClass : "visually-hidden"
                }`}
              >
                <div style={{ padding: 10 }}>
                  <Widget
                    key={`metadata-${jpath}`}
                    src={props.widgets.widgetMetadata}
                    props={useMemo(
                      () => ({ metadata, accountId, widgetName }),
                      [metadata, accountId, widgetName]
                    )}
                  />
                </div>
              </div>
            </div>
          </Allotment.Pane>

          <Allotment.Pane
            key="websiteView"
            snap
            visible={showWebsiteView}
            minSize={300}
            preferredSize="40%"
          >
            <WidgetViewContainer
              parsedWidgetProps={parsedWidgetProps}
              renderCode={renderCode}
              //
              handlePreviewButton={handlePreviewButton}
              handleSaveDraftButton={handleSaveDraftButton}
              handleForkButton={handleForkButton}
              publishWidgetButton={
                props.signedIn ? (
                  filesDetails.get(widgetName)?.isDraft ? (
                    publishDraftAsMainButton
                  ) : (
                    publishButton
                  )
                ) : (
                  <buttton
                    className="btn btn-primary"
                    style={{
                      backgroundColor: theme.buttonColor,
                      paddingInline: 16,
                      borderRadius: 4,
                      fontWeight: 500,
                    }}
                    onClick={() => props.requestSignIn()}
                  >
                    Publish
                  </buttton>
                )
              }
            />
          </Allotment.Pane>
        </Allotment>
      </Box>
    </>
  );
}
