import React, { useCallback, useEffect, useMemo, useState } from "react";
import ls from "local-storage";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { useHistory, useParams } from "react-router-dom";
import {
  Widget,
  useCache,
  useNear,
  CommitButton,
  useAccountId,
} from "near-social-vm";

import VsCodeBanner from "./VsCodeBanner";
import Welcome from "./Welcome";
import Modals from "./Modals";
import Navigation from "./Navigation";
import Search from "./Search";
import Tabs from "./Tabs";
import NavigationSub from "./NavigationSub";
import TabEditor from "./TabEditor";
import TabProps from "./TabProps";
import TabMetadata from "./TabMetadata";
import Preview from "./Preview";
import PreviewMetadata from "./PreviewMetadata";

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
const DefaultEditorModuleCode =
  "function square(number) {\n  return number * number;\n}\n";

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
  const { widgetSrc } = useParams();
  const history = useHistory();
  const setWidgetSrc = props.setWidgetSrc;

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(undefined);
  const [path, setPath] = useState(undefined);
  const [files, setFiles] = useState(undefined);
  const [lastPath, setLastPath] = useState(undefined);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showOpenModuleModal, setShowOpenModuleModal] = useState(false);
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
  const [filesDetails, setFilesDetails] = useState(new Map());
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
      if (widgetCode?.branch?.draft?.[""]) {
        setMetadata(widgetCode?.branch?.draft?.metadata);
      } else {
        setMetadata(widgetCode?.metadata);
      }
    };
    fetchCodeAndDraftOnChain();
  }, [draftOnChain, codeOnChain]);

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
      setCode(code);
    },
    [cache, setCode]
  );

  useEffect(() => {
    const widgetSrc = `${accountId}/${path?.type}/${widgetName}/**`;
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
    if (!widgetName || !near) return;
    files.forEach((f) => {
      const widgetSrc = `${accountId}/${f.type}/${f.name}/**`;
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
      const widgetSrc = `${accountId}/${f.type}/${f.name}/**`;
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
    const widgetSrc = `${accountId}/${path?.type}/${widgetName}/**`;
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

  const loadFile = useCallback(
    (nameOrPath, type = Filetype.Widget) => {
      if (!near) {
        return;
      }

      let widgetSrc =
        nameOrPath.indexOf("/") >= 0
          ? nameOrPath
          : `${accountId}/${type.toLocaleLowerCase()}/${nameOrPath}`;

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
          openFile(toPath(type, widgetSrc), currentCode);
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
      openFile(
        path,
        type === Filetype.Module ? DefaultEditorModuleCode : DefaultEditorCode
      );
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
    (newName) => {
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
    if (widgetSrc && !window.location.hash) {
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
      history.replace(`/edit`);
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

  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);

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

  const publishDraftAsMainButton = (
    <CommitButton
      className={`btn btn-primary`}
      disabled={!widgetName}
      near={near}
      data={{
        [path?.type]: {
          [widgetName]: {
            "": code,
            metadata,
            branch: {
              draft: {
                "": null,
                metadata: null,
              },
            },
          },
        },
      }}
    >
      Publish
    </CommitButton>
  );

  const publishButton = (
    <CommitButton
      className={`btn btn-primary`}
      disabled={!widgetName}
      near={near}
      data={{
        [path?.type]: {
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
      href={`#/${widgetPath}${
        filesDetails.get(widgetName)?.isDraft ? "/branch/draft" : ""
      }`}
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

  const showEditor = !(files?.length === 1 && files[0]?.unnamed === true);

  const isModule = path?.type === "module";

  const hideAllModals = () => {
    setShowRenameModal(false);
    setShowOpenModal(false);
    setShowOpenModuleModal(false);
    setShowAddModal(false);
    setShowCreateModal(false);
    setShowSaveDraftModal(false);
  };

  return (
    <>
      <Modals
        hideAllModals={hideAllModals}
        showRenameModal={showRenameModal}
        setShowRenameModal={setShowRenameModal}
        showOpenModal={showOpenModal}
        setShowOpenModal={setShowOpenModal}
        showOpenModuleModal={showOpenModuleModal}
        setShowOpenModuleModal={setShowOpenModuleModal}
        showSaveDraftModal={showSaveDraftModal}
        showAddModal={showAddModal}
        showCreateModal={showCreateModal}
        jpath={jpath}
        path={path}
        renameFile={renameFile}
        loadFile={loadFile}
        createNewFile={createNewFile}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        code={code}
      />
      <div
        className={`text-center d-flex justify-content-center min-vh-100 ${
          showEditor ? `visually-hidden` : ``
        }`}
      >
        <Welcome
          setShowAddModal={setShowAddModal}
          setShowOpenModal={setShowOpenModal}
          createNewFile={createNewFile}
        />
      </div>
      <div className={showEditor ? `` : `visually-hidden`}>
        <VsCodeBanner />

        <div className="container-fluid mt-1">
          <div className="">
            <Navigation
              jpath={jpath}
              openFile={openFile}
              files={files}
              filesDetails={filesDetails}
              removeFromFiles={removeFromFiles}
              createFile={createFile}
              openCreateButton={openCreateButton}
              renameButton={renameButton}
              saveDraftButton={saveDraftButton}
              forkButton={forkButton}
              publishDraftAsMainButton={publishDraftAsMainButton}
              publishButton={publishButton}
              widgetName={widgetName}
            />
            <Search
              widgets={props.widgets}
              tos={props.tos}
              logOut={props.logOut}
              loadFile={loadFile}
            />
          </div>
          <div className="d-flex align-content-start">
            <div className="flex-grow-1">
              <div className="row">
                <div className={layoutClass}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Tabs
                        isModule={isModule}
                        tab={tab}
                        Tab={Tab}
                        setTab={setTab}
                        widgets={props.widgets}
                        layout={layout}
                        setRenderCode={setRenderCode}
                        Layout={Layout}
                        code={code}
                      />
                    </div>
                    <NavigationSub
                      layout={layout}
                      Layout={Layout}
                      path={path}
                      accountId={accountId}
                      openInNewTabButton={openInNewTabButton}
                      onLayoutChange={onLayoutChange}
                      Tab={Tab}
                      renderCode={renderCode}
                      renderPreviewButton={renderPreviewButton}
                      tab={tab}
                    />
                  </div>

                  <TabEditor
                    tab={tab}
                    Tab={Tab}
                    code={code}
                    widgetPath={widgetPath}
                    updateCode={updateCode}
                    reformat={reformat}
                  />
                  <TabProps
                    tab={tab}
                    Tab={Tab}
                    widgetProps={widgetProps}
                    setWidgetProps={setWidgetProps}
                    reformatProps={reformatProps}
                    propsError={propsError}
                  />
                  <TabMetadata
                    tab={tab}
                    Tab={Tab}
                    widgets={props.widgets}
                    jpath={jpath}
                    widgetPath={widgetPath}
                    setMetadata={setMetadata}
                  />
                </div>
                <Preview
                  tab={tab}
                  Tab={Tab}
                  layout={layout}
                  Layout={Layout}
                  layoutClass={layoutClass}
                  renderCode={renderCode}
                  jpath={jpath}
                  parsedWidgetProps={parsedWidgetProps}
                  isModule={isModule}
                  renderPreviewButton={renderPreviewButton}
                />
                <PreviewMetadata
                  tab={tab}
                  Tab={Tab}
                  layoutClass={layoutClass}
                  jpath={jpath}
                  widgets={props.widgets}
                  metadata={metadata}
                  accountId={accountId}
                  widgetName={widgetName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
