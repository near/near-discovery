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
  getWidgetDetails,
  toPath,
} from "./utils/editor";

export default function EditorPage({ setWidgetSrc, widgets, logOut, tos }) {
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();
  const { widgetSrc } = useParams();

  // component state
  const [code, setCode] = useState(undefined);
  const [path, setPath] = useState(undefined);
  const [files, setFiles] = useState(undefined);
  const [lastPath, setLastPath] = useState(undefined);
  const [renderCode, setRenderCode] = useState(code);
  const [widgetProps, setWidgetProps] = useState(
    ls.get(WidgetPropsKey) || "{}"
  );
  const [parsedWidgetProps, setParsedWidgetProps] = useState({});
  const [propsError, setPropsError] = useState(null);
  const [metadata, setMetadata] = useState(undefined);
  const [showModal, setShowModal] = useState(null);
  const [filesOpened, setFilesOpened] = useState();
  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(
    ls.get(EditorLayoutKey) || Layout.Tabs
  );

  const widgetName = path?.name?.split("/")[0];
  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);
  const fileDetails = filesOpened?.find((file) => {
    if (jpath === JSON.stringify({ type: file.type, name: file.name })) {
      return true;
    }
  });
  const isDraft = fileDetails?.isDraft;
  const showEditor = !!files?.length;
  const isModule = path?.type === "module";
  const layoutClass = layout === Layout.Split ? "col-lg-6" : "";

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
      .then((value = {}) => {
        const { files, lastPath } = value;
        setFiles(files || []);
        setLastPath(lastPath);
        near && checkFiles(files);
      });
  }, [cache, near]);

  useEffect(() => {
    if (!near || !files?.length) {
      return;
    }
    if (path === undefined) {
      selectFile(lastPath);
    }
  }, [near, lastPath]);

  const updateLocalStorage = (newFiles, path) => {
    cache.localStorageSet(
      StorageDomain,
      {
        type: StorageType.Files,
      },
      { files: newFiles, lastPath: path }
    );
  };

  const checkFiles = (files = []) => {
    files.map((file) => {
      const newFilesOpened = [];
      newFilesOpened.push({
        ...file,
        codeMain: "",
        codeDraft: "",
        codeLocalStorage: "",
        isDraft: false,
        changesMade: false,
        savedOnChain: false,
      });
      setFilesOpened(newFilesOpened);
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

        const { codeMain, codeDraft, isDraft } = getWidgetDetails(widgetCode);

        if (codeMain) {
          cache
            .asyncLocalStorageGet(StorageDomain, {
              path: file,
              type: StorageType.Code,
            })
            .then(({ code }) => {
              const changesMade = checkChangesMade(codeMain, codeDraft, code);

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
        filesOpened?.map((file) => {
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

    const newFiles = files.filter((file) => JSON.stringify(file) !== jpath);
    const newFilesOpened = filesOpened.filter(
      (file) => JSON.stringify({ type: file.type, name: file.name }) !== jpath
    );

    setFiles(newFiles);
    setFilesOpened(newFilesOpened);
    // sprawdzamy czy zamyka otwarty plik czy nie otwarty plik
    if (jpath === JSON.stringify(lastPath)) {
      setLastPath(newFiles[0]);
      setPath();
    }
    updateLocalStorage(newFiles, newFiles[0]);
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

  const updateFiles = (newFiles, newFilesOpened, lastPath) => {
    cache.localStorageSet(
      StorageDomain,
      {
        type: StorageType.Files,
      },
      { files: newFiles, lastPath }
    );
    setFiles(newFiles);
    setFilesOpened(newFilesOpened);
  };

  const changeFile = (path) => {
    selectFile(path);
    updateFiles(files, filesOpened, path);
  };

  const forkFile = () => {
    const forkName = widgetName + "-fork";
    const path = toPath(Filetype.Widget, forkName);

    const { newFiles, newFilesOpened } = addFile(
      path,
      files,
      filesOpened,
      code
    );
    updateCode(path, code);
    updateFiles(newFiles, newFilesOpened, path);
    selectFile(path);
  };

  const createFile = (type) => {
    const path = generateNewName(type, files);
    const code = getDefaultCode(type);
    const { newFiles, newFilesOpened } = addFile(
      path,
      files,
      filesOpened,
      code
    );
    updateCode(path, code);
    updateFiles(newFiles, newFilesOpened, path);
    selectFile(path);
  };

  const loadAndOpenFile = (nameOrPath, type) => {
    const widgetSrc = getSrcByNameOrPath(nameOrPath, accountId, type);
    const widget = `${widgetSrc}/**`;
    const cacheGet = () => {
      const widgetObject = cache.socialGet(
        near,
        widget,
        false,
        undefined,
        undefined,
        cacheGet
      );

      if (widgetObject) {
        const codeMain = widgetObject?.[""];
        const codeDraft = widgetObject?.branch?.draft?.[""];
        const code = codeDraft || codeMain;
        const path = toPath(type, widgetSrc);
        const { newFiles, newFilesOpened } = addFile(
          path,
          files,
          filesOpened,
          codeMain,
          codeDraft
        );
        updateCode(path, code);
        updateFiles(newFiles, newFilesOpened, path);
        selectFile(path);
      }
    };
    cacheGet();
  };

  const addFile = (path, files, filesOpened, codeMain, codeDraft) => {
    const newFiles = files ? [...files] : [];
    const addToFiles = !files?.find(
      (file) => JSON.stringify(file) === JSON.stringify(path)
    );
    if (addToFiles) {
      newFiles.push(path);
    }

    const newFilesOpened = filesOpened ? [...filesOpened] : [];
    const addToFilesOpened = !filesOpened?.find(
      (file) =>
        JSON.stringify({
          type: file.type,
          name: file.name,
        }) === JSON.stringify(path)
    );
    if (addToFilesOpened) {
      newFilesOpened.push({
        type: path.type,
        name: path.name,
        codeMain,
        codeDraft,
        codeLocalStorage: code,
        isDraft,
      });
    }

    return {
      newFiles,
      newFilesOpened,
    };
  };

  return (
    <>
      <Modals
        setShowModal={setShowModal}
        jpath={jpath}
        path={path}
        renameFile={renameFile}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        code={code}
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

        <div className="container-fluid mt-1">
          <Navigation
            setShowModal={setShowModal}
            jpath={jpath}
            forkFile={forkFile}
            files={files}
            widgetName={widgetName}
            code={code}
            toPath={toPath}
            near={near}
            path={path}
            metadata={metadata}
            filesOpened={filesOpened}
            closeFile={closeFile}
            isDraft={isDraft}
            changeFile={changeFile}
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
                    </div>
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
                <div className={layoutClass}>
                  <div className="row">
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
        </div>
      </div>
    </>
  );
}
