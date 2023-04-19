import React, { useEffect, useState } from "react";
import ls from "local-storage";
import { useParams } from "react-router-dom";
import { useCache, useNear, useAccountId } from "near-social-vm";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

import VsCodeBanner from "./Banners/VsCodeBanner";
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
  getWidgetDetails,
  toPath,
  updateLocalStorage,
} from "./utils/editor";
import MainLoader from "./Welcome/MainLoader";

const EditorPage = ({ setWidgetSrc, widgets, logOut, tos }) => {
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();
  const { widgetSrc } = useParams();

  const [mainLoader, setMainLoader] = useState(true);
  const [filesObject, setFilesObject] = useState({});
  const [codeVisible, setCodeVisible] = useState(undefined);
  const [path, setPath] = useState(undefined);
  const [lastPath, setLastPath] = useState(undefined);
  const [renderCode, setRenderCode] = useState(codeVisible);
  const [widgetProps, setWidgetProps] = useState(
    ls.get(WidgetPropsKey) || "{}"
  );
  const [parsedWidgetProps, setParsedWidgetProps] = useState({});
  const [propsError, setPropsError] = useState(null);
  const [metadata, setMetadata] = useState(undefined);
  const [showModal, setShowModal] = useState(null);
  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(
    ls.get(EditorLayoutKey) || Layout.Tabs
  );

  const widgetName = path?.name?.split("/")[0];
  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);
  const { isDraft } = filesObject[jpath] || {};
  const showEditor = Object.keys(filesObject)?.length;
  const isModule = path?.type === "module";
  const layoutClass = layout === Layout.Split ? "col-lg-6" : "";

  useEffect(() => {
    const newFilesObject = { ...filesObject };

    Object.keys(filesObject).map((key) => {
      const file = filesObject[key];
      const { codeMain, codeDraft, codeLocalStorage } = file;

      const changesMade = checkChangesMade(
        codeMain,
        codeDraft,
        codeLocalStorage
      );
      newFilesObject[key].changesMade = changesMade;

      const isDraft = !!codeDraft;
      newFilesObject[key].isDraft = isDraft;
    });
    setFilesObject(newFilesObject);
  }, [codeVisible]);

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
    cache
      .asyncLocalStorageGet(StorageDomain, { type: StorageType.Files })
      .then((res = {}) => {
        setLastPath(res.lastPath);
        near && createFilesObject(res.files || []);
        selectFile(res.lastPath);
        setMainLoader(false);
      });
  }, [cache, near]);

  const createFilesObject = (files = []) => {
    const filesObject = files.reduce(
      (x, file) => ({
        ...x,
        [JSON.stringify({ type: file.type, name: file.name })]: {
          ...file,
          codeMain: "",
          codeDraft: "",
          codeLocalStorage: "",
          isDraft: false,
          changesMade: false,
          savedOnChain: true,
          new: true,
        },
      }),
      {}
    );
    setFilesObject(filesObject);

    Object.values(filesObject).map((fileObject) => {
      const path = { type: fileObject.type, name: fileObject.name };
      const jpath = JSON.stringify(path);
      const widgetSrc = `${accountId}/${fileObject.type}/${fileObject.name}/**`;

      const fetchCode = () => {
        const widgetObject = cache.socialGet(
          near,
          widgetSrc,
          false,
          undefined,
          undefined,
          fetchCode
        );

        if (widgetObject) {
          const { codeMain, codeDraft, isDraft } =
            getWidgetDetails(widgetObject);

          cache
            .asyncLocalStorageGet(StorageDomain, {
              path: path,
              type: StorageType.Code,
            })
            .then(({ code }) => {
              let changesMade = checkChangesMade(codeMain, codeDraft, code);

              if (!filesObject[jpath].new) {
                changesMade = false;
              }

              filesObject[jpath] = {
                ...filesObject[jpath],
                codeMain,
                codeDraft,
                codeLocalStorage: code,
                isDraft,
                changesMade: changesMade,
                savedOnChain: true,
                new: false,
              };
              setFilesObject(filesObject);
            });
        }
      };
      fetchCode();
    });
  };

  const renameFile = (newName) => {
    const newPath = toPath(path.type, newName);
    const jNewPath = JSON.stringify(newPath);
    let newFilesObject = { ...filesObject };

    const fileObject = { ...newFilesObject[jpath] };
    delete newFilesObject[jpath];

    newFilesObject = {
      ...newFilesObject,
      [jNewPath]: {
        ...fileObject,
        name: newName,
      },
    };
    updateFiles(newFilesObject, newPath);
    selectFile(newPath);
    updateCode(newPath, codeVisible);
  };

  const changeCode = (path, code) => {
    updateCode(path, code);

    const jpath = JSON.stringify(path);
    setFilesObject(
      (files) => files[jpath] && (files[jpath].codeLocalStorage = code) && files
    );
  };

  const updateCode = (path, code) => {
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
    setCodeVisible(code);
  };

  const reformat = (path, code) => {
    try {
      const formattedCode = prettier.format(code, {
        parser: "babel",
        plugins: [parserBabel],
      });
      updateCode(path, formattedCode);
    } catch (e) {
      console.log(e);
    }
  };

  const closeFile = (path) => {
    const jpath = JSON.stringify(path);
    const newFilesObject = { ...filesObject };
    delete newFilesObject[jpath];
    setFilesObject(newFilesObject);

    const lastFile = !Object.keys(newFilesObject).length;

    let newPath;
    if (lastFile) {
      newPath = undefined;
      updateLocalStorage(newFilesObject, newPath, cache);
      return;
    }

    if (jpath !== JSON.stringify(lastPath)) {
      updateLocalStorage(newFilesObject, lastPath, cache);
      return;
    }

    if (jpath === JSON.stringify(lastPath)) {
      const newFile = Object.values(newFilesObject)[0];
      newPath = { type: newFile.type, name: newFile.name };
      selectFile(newPath);
      updateLocalStorage(newFilesObject, newPath, cache);
    }
  };

  const selectFile = (path) => {
    setPath(path);
    setLastPath(path);
    setMetadata(undefined);
    setRenderCode(null);
    cache
      .asyncLocalStorageGet(StorageDomain, {
        path,
        type: StorageType.Code,
      })
      .then(({ code }) => {
        updateCode(path, code);
      });
  };

  const updateFiles = (newFilesObject, lastPath) => {
    updateLocalStorage(newFilesObject, lastPath, cache);
    setFilesObject(newFilesObject);
  };

  const changeFile = (path) => {
    if (filesObject[JSON.stringify(path)]) {
      selectFile(path);
      updateFiles(filesObject, path);
    }
  };

  const forkFile = () => {
    const forkName = widgetName + "-fork";
    const path = toPath(Filetype.Widget, forkName);

    addFile(filesObject, path, codeVisible, "", false, false);
    updateCode(path, codeVisible);
    selectFile(path);
  };

  const createFile = (type) => {
    const files = Object.values(filesObject).map((file) => ({
      type: file.type,
      name: file.name,
    }));
    const path = generateNewName(type, files);
    const code = getDefaultCode(type);

    addFile(filesObject, path, code, "", false, false);
    updateCode(path, code);
    selectFile(path);
  };

  const loadAndOpenFile = (nameOrPath, type) => {
    const widgetSrc = getSrcByNameOrPath(nameOrPath, accountId, type);
    const widgetSrcFull = `${widgetSrc}/**`;
    const cacheGet = () => {
      const widgetObject = cache.socialGet(
        near,
        widgetSrcFull,
        false,
        undefined,
        undefined,
        cacheGet
      );

      if (widgetObject) {
        const { codeMain, codeDraft, isDraft } = getWidgetDetails(widgetObject);
        const codeCurrent = codeDraft || codeMain;
        const path = toPath(type, widgetSrc);

        addFile(filesObject, path, codeMain, codeDraft, isDraft);
        updateCode(path, codeCurrent);
        selectFile(path);
      }
    };
    cacheGet();
  };

  const addFile = (
    filesObject,
    path,
    codeMain,
    codeDraft,
    isDraft,
    savedOnChain = true
  ) => {
    const newFilesObject = {
      ...filesObject,
      [JSON.stringify(path)]: {
        ...path,
        codeMain: codeMain,
        codeDraft: codeDraft,
        codeLocalStorage: codeDraft || codeMain,
        isDraft: isDraft,
        changesMade: false,
        savedOnChain: savedOnChain,
      },
    };

    updateFiles(newFilesObject, path);
  };

  return (
    <div style={{ position: "relative" }}>
      <MainLoader mainLoader={mainLoader} />
      <Modals
        setShowModal={setShowModal}
        jpath={jpath}
        path={path}
        renameFile={renameFile}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        codeVisible={codeVisible}
        showModal={showModal}
        createFile={createFile}
        loadAndOpenFile={loadAndOpenFile}
      />
      <Welcome
        setShowModal={setShowModal}
        createFile={createFile}
        showEditor={showEditor}
      />
      <div className={showEditor ? `` : `visually-hidden`}>
        <VsCodeBanner />

        <div className="container-fluid mt-1" style={{ position: "relative" }}>
          <Search
            widgets={widgets}
            tos={tos}
            logOut={logOut}
            loadAndOpenFile={loadAndOpenFile}
          />
          <Navigation
            setShowModal={setShowModal}
            jpath={jpath}
            forkFile={forkFile}
            filesObject={filesObject}
            widgetName={widgetName}
            codeVisible={codeVisible}
            near={near}
            path={path}
            metadata={metadata}
            closeFile={closeFile}
            isDraft={isDraft}
            changeFile={changeFile}
          />

          <div className="d-flex align-content-start">
            <div className="flex-grow-1">
              <div className="row">
                <div style={{ display: "flex" }}>
                  <Tabs
                    isModule={isModule}
                    tab={tab}
                    setTab={setTab}
                    widgets={widgets}
                    layout={layout}
                    setRenderCode={setRenderCode}
                    codeVisible={codeVisible}
                  />
                  <NavigationSub
                    layout={layout}
                    path={path}
                    accountId={accountId}
                    tab={tab}
                    widgetPath={widgetPath}
                    setRenderCode={setRenderCode}
                    setTab={setTab}
                    setLayoutState={setLayoutState}
                    codeVisible={codeVisible}
                  />
                </div>
              </div>
              <div className="row">
                <div className={layoutClass}>
                  <TabEditor
                    tab={tab}
                    codeVisible={codeVisible}
                    widgetPath={widgetPath}
                    changeCode={changeCode}
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
                <div className={layoutClass}>
                  <div className="row">
                    <Preview
                      tab={tab}
                      layout={layout}
                      renderCode={renderCode}
                      jpath={jpath}
                      parsedWidgetProps={parsedWidgetProps}
                      isModule={isModule}
                      setRenderCode={setRenderCode}
                      setTab={setTab}
                      codeVisible={codeVisible}
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
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
