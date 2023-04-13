import React, { useCallback, useEffect, useState } from "react";
import ls from "local-storage";
import { useParams } from "react-router-dom";
import { useCache, useNear, useAccountId } from "near-social-vm";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

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

import {
  EditorLayoutKey,
  WidgetPropsKey,
  Filetype,
  StorageDomain,
  StorageType,
  Tab,
  Layout,
} from "./utils/const";
import {
  checkChangesMade,
  generateNewName,
  getDefaultCode,
  getSrcByNameOrPath,
  toPath,
} from "./utils/editor";

export default function EditorPage({ setWidgetSrc, widgets, logOut, tos }) {
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

  const [filesOpened, setFilesOpened] = useState([]);

  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(
    ls.get(EditorLayoutKey) || Layout.Tabs
  );

  const { widgetSrc } = useParams();

  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();
  const widgetName = path?.name?.split("/")[0];

  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);

  const showEditor = !!files?.length;

  const isModule = path?.type === "module";

  const layoutClass = layout === Layout.Split ? "col-lg-6" : "";

  const hideAllModals = () => {
    setShowRenameModal(false);
    setShowOpenModal(false);
    setShowOpenModuleModal(false);
    setShowAddModal(false);
    setShowCreateModal(false);
    setShowSaveDraftModal(false);
  };

  useEffect(() => {
    setWidgetSrc({
      edit: null,
      view: widgetSrc,
    });
  }, [widgetSrc, setWidgetSrc]);

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

  useEffect(() => {
    cache
      .asyncLocalStorageGet(StorageDomain, { type: StorageType.Files })
      .then((value = {}) => {
        const { files, lastPath } = value;
        setFiles(files || []);
        setLastPath(lastPath);
        console.log("files-files-files-files", files);
        near && checkFiles(files);
      });
  }, [cache, near]);

  useEffect(() => {
    if (!near || !files) {
      return;
    }
    if (path === undefined) {
      openFile(lastPath, undefined);
    }
  }, [near, lastPath, files, path]);

  const checkFiles = (files = []) => {
    files.map((file) => {
      console.log("checkFiles");
      setFilesOpened((filesOpened) => {
        filesOpened.push({
          ...file,
          codeMain: "",
          codeDraft: "",
          codeLocalStorage: "",
          isDraft: false,
          changesMade: false,
          savedOnChain: false,
        });
        return filesOpened;
      });

      const widgetSrc = `${accountId}/${file.type}/${file.name}/**`;
      const fetchCode = () => {
        const widgetCode = cache.socialGet(
          near,
          widgetSrc,
          false,
          undefined,
          undefined,
          fetchCode
        );

        const codeMain = widgetCode?.[""];
        const codeDraft = widgetCode?.branch?.draft?.[""];
        const isDraft = (!codeDraft && !codeMain) || !!codeDraft;

        if (codeMain) {
          cache
            .asyncLocalStorageGet(StorageDomain, {
              path: file,
              type: StorageType.Code,
            })
            .then(({ code }) => {
              let changesMade;
              if (codeDraft) {
                changesMade = codeDraft != code;
              } else if (codeMain) {
                changesMade = codeMain != code;
              } else {
                // no code on chain
                changesMade = true;
              }

              setFilesOpened((filesOpened) =>
                filesOpened.map((fileOpened) => {
                  if (fileOpened.name !== file.name) {
                    return fileOpened;
                  }
                  return {
                    ...fileOpened,
                    codeMain,
                    codeDraft,
                    codeLocalStorage: code,
                    isDraft,
                    changesMade,
                    savedOnChain: true,
                  };
                })
              );
            });
        }
      };
      fetchCode();
    });
  };

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

      setFilesOpened((filesOpened) =>
        filesOpened.map((file) => {
          if (
            JSON.stringify({ type: file.type, name: file.name }) ===
            JSON.stringify(path)
          ) {
            const { codeDraft, codeMain } = file;
            const changesMade = checkChangesMade(codeMain, codeDraft, code);

            return {
              ...file,
              codeLocalStorage: code,
              changesMade,
            };
          }
          return file;
        })
      );
    },
    [cache, setCode]
  );

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

  const removeFromFiles = useCallback(
    (path) => {
      path = JSON.stringify(path);
      setFiles((files) =>
        files.filter((file) => JSON.stringify(file) !== path)
      );
      setFilesOpened((filesOpened) =>
        filesOpened.filter(
          (file) =>
            JSON.stringify({ type: file.type, name: file.name }) !== path
        )
      );
      setLastPath(path);
    },
    [setFiles, setLastPath]
  );

  const createNewFile = useCallback(
    (type) => {
      const path = generateNewName(type, files);
      openFile(path, getDefaultCode(type));
    },
    [generateNewName, openFile]
  );

  const loadAndOpenFile = useCallback(
    (nameOrPath, type = Filetype.Widget) => {
      console.log("loadAndOpenFile");
      if (!near) {
        return;
      }
      const widgetSrc = getSrcByNameOrPath(nameOrPath, accountId, type);
      const widget = `${widgetSrc}/**`;

      const cacheGet = () => {
        const code = cache.socialGet(
          near,
          widget,
          false,
          undefined,
          undefined,
          cacheGet
        );

        if (code) {
          const currentCode = code?.branch?.draft?.[""] || code?.[""];
          openFile(toPath(type, widgetSrc), currentCode, code);
        }
      };
      cacheGet();
    },
    [accountId, openFile, toPath, near, cache]
  );

  const openFile = useCallback(
    (path, code, widgetObject) => {
      console.log("openFile");
      setPath(path);
      setLastPath(path);
      setMetadata(undefined);
      setRenderCode(null);

      setFiles((files) => {
        const newFiles = [...files];
        const addToFiles = !files.find(
          (file) => JSON.stringify(file) === JSON.stringify(path)
        );
        if (addToFiles) {
          newFiles.push(path);
        }
        return newFiles;
      });

      const codeMain = widgetObject?.[""];
      const codeDraft = widgetObject?.branch?.draft?.[""] || "";
      const isDraft = (!codeDraft && !codeMain) || !!codeDraft;
      const changesMade = checkChangesMade(codeMain, codeDraft, code);

      setFilesOpened((filesOpened) => {
        filesOpened.push({
          type: path.type,
          name: path.name,
          codeMain,
          codeDraft,
          codeLocalStorage: code,
          isDraft,
          changesMade,
          savedOnChain: !!codeMain,
        });
        return filesOpened;
      });

      if (code !== undefined) {
        updateCode(path, code);
        return;
      }

      cache
        .asyncLocalStorageGet(StorageDomain, {
          path,
          type: StorageType.Code,
        })
        .then(({ code }) => {
          updateCode(path, code);
        });
    },
    [updateCode]
  );

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
        loadAndOpenFile={loadAndOpenFile}
        createNewFile={createNewFile}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        code={code}
      />
      <Welcome
        setShowOpenModal={setShowOpenModal}
        createNewFile={createNewFile}
        hideAllModals={hideAllModals}
        showEditor={showEditor}
      />
      <div className={showEditor ? `` : `visually-hidden`}>
        <VsCodeBanner />

        <div className="container-fluid mt-1">
          <Navigation
            jpath={jpath}
            openFile={openFile}
            files={files}
            createNewFile={createNewFile}
            widgetName={widgetName}
            code={code}
            toPath={toPath}
            setShowRenameModal={setShowRenameModal}
            setShowAddModal={setShowAddModal}
            near={near}
            path={path}
            metadata={metadata}
            setShowSaveDraftModal={setShowSaveDraftModal}
            setFiles={setFiles}
            setLastPath={setLastPath}
            filesOpened={filesOpened}
            removeFromFiles={removeFromFiles}
          />
          <Search
            widgets={widgets}
            tos={tos}
            logOut={logOut}
            loadAndOpenFile={loadAndOpenFile}
          />
          <div className="d-flex align-content-start">
            <div className="flex-grow-1">
              <div className="row">
                <div className={layoutClass}>
                  <div style={{ display: "flex" }}>
                    <Tabs
                      isModule={isModule}
                      tab={tab}
                      setTab={setTab}
                      widgets={widgets}
                      layout={layout}
                      setRenderCode={setRenderCode}
                      code={code}
                    />
                    <NavigationSub
                      layout={layout}
                      path={path}
                      accountId={accountId}
                      renderCode={renderCode}
                      tab={tab}
                      widgetPath={widgetPath}
                      setRenderCode={setRenderCode}
                      setTab={setTab}
                      setLayoutState={setLayoutState}
                    />
                  </div>

                  <TabEditor
                    tab={tab}
                    code={code}
                    widgetPath={widgetPath}
                    updateCode={updateCode}
                    path={path}
                    reformat={reformat}
                  />
                  <TabProps
                    tab={tab}
                    widgetProps={widgetProps}
                    setWidgetProps={setWidgetProps}
                    propsError={propsError}
                  />
                  <TabMetadata
                    tab={tab}
                    widgets={widgets}
                    jpath={jpath}
                    widgetPath={widgetPath}
                    setMetadata={setMetadata}
                  />
                </div>
                <Preview
                  tab={tab}
                  layout={layout}
                  layoutClass={layoutClass}
                  renderCode={renderCode}
                  jpath={jpath}
                  parsedWidgetProps={parsedWidgetProps}
                  isModule={isModule}
                />
                <PreviewMetadata
                  tab={tab}
                  layoutClass={layoutClass}
                  jpath={jpath}
                  widgets={widgets}
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
