import React, { useCallback, useEffect, useState } from "react";
import ls from "local-storage";
import { useHistory, useParams } from "react-router-dom";
import { useCache, useNear, useAccountId } from "near-social-vm";

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
  DefaultEditorCode,
  DefaultEditorModuleCode,
  Filetype,
  StorageDomain,
  StorageType,
  Tab,
  Layout,
} from "./utils/const";
import { generateNewName, toPath } from "./utils/editor";

export default function EditorPage({ setWidgetSrc, widgets, logOut, tos }) {
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

  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(
    ls.get(EditorLayoutKey) || Layout.Tabs
  );

  const { widgetSrc } = useParams();
  const history = useHistory();

  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();
  const widgetName = path?.name?.split("/")[0];

  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);

  const showEditor = !(files?.length === 1 && files[0]?.unnamed === true);

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

  const openFile = useCallback(
    (path, code) => {
      setCodeChangesPresent();
      setPath(path);

      // add to files
      const jpath = JSON.stringify(path);
      setFiles((files) => {
        const newFiles = [...files];
        if (!files.find((file) => JSON.stringify(file) === jpath)) {
          newFiles.push(path);
        }
        return newFiles;
      });
      setLastPath(path);

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
    [updateCode]
  );

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

  const createNewFile = useCallback(
    (type) => {
      const path = generateNewName(type, files);
      path.unnamed = undefined;
      openFile(
        path,
        type === Filetype.Module ? DefaultEditorModuleCode : DefaultEditorCode
      );
    },
    [generateNewName, openFile]
  );

  // helper
  const createFile = useCallback(
    (type) => {
      const path = generateNewName(type, files);
      openFile(path, DefaultEditorCode);
    },
    [generateNewName, openFile]
  );

  // helper
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

  // helper
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

  // helper
  const checkDrafts = () => {
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

  // helper
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

  // helper
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
            filesDetails={filesDetails}
            createFile={createFile}
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
          />
          <Search
            widgets={widgets}
            tos={tos}
            logOut={logOut}
            loadFile={loadFile}
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
