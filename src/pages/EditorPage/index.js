import React, { useEffect, useRef, useState } from "react";
import ls from "local-storage";
import { useHistory, useParams } from "react-router-dom";
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
  fileObjectDefault,
  getForkName,
} from "./utils/const";
import {
  checkChangesMade,
  createFilesObject,
  fileToJpath,
  fileToPath,
  generateNewName,
  getDefaultCode,
  getSrcByNameOrPath,
  getWidgetDetails,
  nameToPath,
  toPath,
  updateCodeLocalStorage,
  updateLocalStorage,
} from "./utils/editor";
import MainLoader from "./Welcome/MainLoader";
import { useHashUrlBackwardsCompatibility } from "../../hooks/useHashUrlBackwardsCompatibility";
import OnBoarding from "./OnBoarding";
import {
  generateRefs,
  getStepLocalStorage,
  onboardingComponents,
  onboardingDisable,
  ONBOARDING_STORAGE,
} from "./utils/onboarding";
import { Helmet } from "react-helmet";
import { recordPageView, recordClick } from "../../utils/analytics";
import styled from "styled-components";
import BannerOboarding from "./Banners/BannerOboarding";
import MobileBlocker from "./Mobile/MobileBlocker";
import MainWrapper from "./css/MainWrapper";

const EditorPage = ({
  setWidgetSrc,
  widgets,
  logOut,
  tos,
  onboarding,
  requestSignIn,
  meta,
}) => {
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();
  const { widgetSrc } = useParams();
  const history = useHistory();

  const [mainLoader, setMainLoader] = useState(false);
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
  const [defaultWidget, setDefaultWidget] = useState(null);

  const widgetName = path?.name?.split("/")[0];
  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);
  const { isDraft } = filesObject[jpath] || {};
  const showEditor = Object.keys(filesObject)?.length;
  const isModule = path?.type === "module";
  const layoutClass = layout === Layout.Split ? "col-lg-6" : "";

  useHashUrlBackwardsCompatibility();

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
    if (!defaultWidget || onboarding) {
      return;
    }

    loadAndOpenFile(defaultWidget);
    history.push("/sandbox");
  }, [defaultWidget]);

  useEffect(() => {
    recordPageView();
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
    if (!cache || !near) {
      return;
    }
    firstLoad();
  }, [cache, near]);

  const selectFile = (file) => {
    setPath(fileToPath(file));
    setLastPath(fileToPath(file));
    setMetadata(undefined);
  };

  const firstLoad = () => {
    cache
      .asyncLocalStorageGet(StorageDomain, { type: StorageType.Files })
      .then(({ files, lastPath, lastSrc } = {}) => {
        let path;
        let filesObject;

        if (onboarding && currentStep === 1) {
          path = onboardingComponents.starter;
          filesObject = createFilesObject([onboardingComponents.starter]);
        } else if (onboarding && currentStep > 1) {
          path = onboardingComponents.starterFork;
          filesObject = createFilesObject([
            onboardingComponents.starter,
            onboardingComponents.starterFork,
          ]);
        } else {
          path = lastPath;
          filesObject = createFilesObject(files);
        }

        setFilesObject(filesObject);
        selectFile(filesObject[fileToJpath(path)]);
        getAllFileLocalStorage(filesObject);
        getAllFileSocialDB(filesObject);

        if (widgetSrc) {
          setWidgetSrc({
            edit: null,
            view: widgetSrc,
          });
          setDefaultWidget(widgetSrc);
        }
      });
  };

  const getAllFileLocalStorage = (filesObject) => {
    Object.values(filesObject).map((file) => {
      getFileLocalStorage(file);
    });
  };

  const getFileLocalStorage = (file) => {
    const path = fileToPath(file);
    const jpath = fileToJpath(file);

    cache
      .asyncLocalStorageGet(StorageDomain, {
        path,
        type: StorageType.Code,
      })
      .then(({ code }) => {
        setFilesObject((state) => ({
          ...state,
          [jpath]: {
            ...state[jpath],
            codeLocalStorage: code,
            codeVisible: code,
          },
        }));
      });
  };

  const getAllFileSocialDB = (filesObject) => {
    Object.values(filesObject).map((file) => {
      getFileSocialDB(file);
    });
  };

  const getFileSocialDB = (file, setLocalStorage = false) => {
    if (!file.src) {
      return;
    }

    const jpath = fileToJpath(file);
    const widgetSrc = `${file.src}/**`;

    const fetchCode = () => {
      const widgetObject = cache.socialGet(
        near,
        widgetSrc,
        false,
        undefined,
        undefined,
        fetchCode
      );

      if (widgetObject && file.new) {
        const { codeMain, codeDraft, isDraft } = getWidgetDetails(widgetObject);

        setFilesObject((state) => ({
          ...state,
          [jpath]: {
            ...state[jpath],
            codeMain,
            codeDraft,
            isDraft,
            changesMade: checkChangesMade(
              codeMain,
              codeDraft,
              state[jpath]?.codeLocalStorage || ""
            ),
            savedOnChain: true,
            new: false,
          },
        }));

        if (setLocalStorage) {
          const newPath = fileToPath(file);
          const code = codeDraft || codeMain;
          updateCodeLocalStorage(newPath, codeDraft || codeMain, cache);
          setFilesObject((state) => ({
            ...state,
            [jpath]: {
              ...state[jpath],
              codeLocalStorage: code,
              codeVisible: code,
              changesMade: false,
            },
          }));
        }
      }
    };
    fetchCode();
  };

  const renameFile = (newName) => {
    const pathNew = nameToPath(path.type, newName);
    const jpathNew = fileToJpath(pathNew);

    setFilesObject((state) => {
      const newState = {
        ...state,
        [jpathNew]: {
          ...state[jpath],
          name: newName,
        },
      };
      delete newState[jpath];
      updateLocalStorage(newState, pathNew, cache);
      return newState;
    });
    selectFile(pathNew);
    setRenderCode(null);
  };

  const changeCode = (path, code) => {
    updateCodeLocalStorage(path, code, cache);
    const jpath = JSON.stringify(path);

    setFilesObject((state) => ({
      ...state,
      [jpath]: {
        ...state[jpath],
        codeLocalStorage: code,
        codeVisible: code,
        changesMade: checkChangesMade(
          state[jpath].codeMain,
          state[jpath].codeDraft,
          code
        ),
      },
    }));
  };

  const reformat = (path, code) => {
    try {
      const formattedCode = prettier.format(code, {
        parser: "babel",
        plugins: [parserBabel],
      });
      changeCode(path, formattedCode);
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

    if (lastFile) {
      updateLocalStorage(newFilesObject, undefined, cache);
      return;
    }

    if (jpath !== JSON.stringify(lastPath)) {
      updateLocalStorage(newFilesObject, lastPath, cache);
      return;
    }

    if (jpath === JSON.stringify(lastPath)) {
      const newFile = Object.values(newFilesObject)[0];
      const newPath = fileToPath(newFile);
      selectFile(newPath);
      setRenderCode(null);
      updateLocalStorage(newFilesObject, newPath, cache);
    }
  };

  const changeFile = (path) => {
    if (filesObject[JSON.stringify(path)]) {
      setRenderCode(null);
      selectFile(path);
      updateLocalStorage(filesObject, path, cache);
    }
  };

  const handleRender = () => {
    setRenderCode(codeVisible);
    if (layout === Layout.Tabs) {
      setTab(Tab.Widget);
    }

    if (onboarding) {
      if (currentStep === 4) {
        const nextStep = 5;
        setCurrentStep(nextStep);
        localStorage.setItem(
          ONBOARDING_STORAGE,
          JSON.stringify({ step: nextStep })
        );
      }
      if (currentStep === 9) {
        const nextStep = 10;
        setCurrentStep(nextStep);
        localStorage.setItem(
          ONBOARDING_STORAGE,
          JSON.stringify({ step: nextStep })
        );
      }
    }
  };

  const forkFile = () => {
    const forkName = getForkName(widgetName);
    const forkPath = nameToPath(Filetype.Widget, forkName);
    const forkedFile = filesObject[JSON.stringify(path)];
    const newFile = {
      ...forkedFile,
      ...forkPath,
      codeDraft: "",
      isDraft: false,
      changesMade: true,
      savedOnChain: false,
      new: false,
      loading: false,
    };
    addFile(newFile);
    updateCodeLocalStorage(forkPath, newFile.codeLocalStorage, cache);
    setRenderCode(null);
    selectFile(forkPath);

    if (onboarding) {
      if (currentStep === 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        localStorage.setItem(
          ONBOARDING_STORAGE,
          JSON.stringify({ step: nextStep })
        );
      }
    }
  };

  const addFile = (file) => {
    const newFilesObject = {
      ...filesObject,
      [fileToJpath(file)]: file,
    };
    setFilesObject(newFilesObject);
    updateLocalStorage(newFilesObject, fileToPath(file), cache);
  };

  const createFile = (type) => {
    const newCode = getDefaultCode(type);
    const files = Object.values(filesObject).map((file) => ({
      type: file.type,
      name: file.name,
    }));

    const newFile = {
      ...fileObjectDefault,
      type,
      name: generateNewName(type, files).name,
      codeMain: "",
      codeDraft: "",
      codeLocalStorage: newCode,
      isDraft: false,
      changesMade: true,
      savedOnChain: false,
      new: false,
    };

    const newPath = fileToPath(newFile);

    addFile(newFile);
    updateCodeLocalStorage(newPath, newCode, cache);
    setRenderCode(null);
    selectFile(newPath);
  };

  const loadAndOpenFile = (nameOrPath, type) => {
    const onboardingId = onboarding && "near";
    const src = getSrcByNameOrPath(nameOrPath, onboardingId || accountId, type);
    const path = toPath(type, nameOrPath);

    const newFile = {
      ...fileObjectDefault,
      ...path,
      src,
      codeMain: "",
      codeDraft: "",
      codeLocalStorage: "",
      isDraft: false,
      changesMade: false,
      savedOnChain: false,
      new: true,
    };
    addFile(newFile);
    setRenderCode(null);
    selectFile(path);
    getFileSocialDB(newFile, true);
  };

  const reloadFile = () => {
    const onboardingPath = onboardingComponents.starter;
    selectFile(onboardingPath);
    setMainLoader(false);
    loadAndOpenFile("near/widget/Onboarding.Starter", Filetype.Widget);
  };

  const handleCommit = () => {
    loadAndOpenFile(lastPath.name, Filetype.Widget);
  };

  // onboarding
  const refs = generateRefs();
  const refEditor = useRef();
  const refSearch = useRef();
  const [currentStep, setCurrentStep] = useState(getStepLocalStorage().step);
  const [disable, setDisable] = useState({});

  useEffect(() => {
    setDisable(onboarding ? onboardingDisable : {});
  }, [onboarding]);

  const handleExitOnboarding = () => {
    setCurrentStep(0);
    history.push("/sandbox");
  };

  return (
    <MainWrapper>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
      </Helmet>
      <div onPointerUp={recordClick}>
        <MobileBlocker onboarding={onboarding} />

        {onboarding && (
          <OnBoarding
            onboarding={onboarding}
            refs={refs}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            reloadFile={reloadFile}
            refEditor={refEditor}
            refSearch={refSearch}
            setLayoutState={setLayoutState}
            cache={cache}
            near={near}
            closeFile={closeFile}
            setDisable={setDisable}
            selectFile={selectFile}
          />
        )}
        {(onboarding && !currentStep) || (
          <>
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
              handleCommit={handleCommit}
            />
            {onboarding || (
              <Welcome
                setShowModal={setShowModal}
                createFile={createFile}
                showEditor={showEditor}
                setCurrentStep={setCurrentStep}
              />
            )}
            <div className={showEditor ? `` : ``}>
              {onboarding || <VsCodeBanner />}
              {onboarding && (
                <BannerOboarding handleExitOnboarding={handleExitOnboarding} />
              )}

              <div
                className="container-fluid mt-1"
                style={{ position: "relative" }}
              >
                <Search
                  widgets={widgets}
                  tos={tos}
                  logOut={logOut}
                  loadAndOpenFile={loadAndOpenFile}
                  refs={refs}
                  refSearch={refSearch}
                  disable={disable}
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
                  refs={refs}
                  onboarding={onboarding}
                  currentStep={currentStep}
                  requestSignIn={requestSignIn}
                  disable={disable}
                  handleCommit={handleCommit}
                  accountId={accountId}
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
                          disable={disable}
                        />
                        <NavigationSub
                          layout={layout}
                          path={path}
                          accountId={accountId}
                          tab={tab}
                          widgetPath={widgetPath}
                          setTab={setTab}
                          setLayoutState={setLayoutState}
                          refs={refs}
                          handleRender={handleRender}
                          disable={disable}
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
                          refs={refs}
                          refEditor={refEditor}
                          filesObject={filesObject}
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
                            widgets={widgets}
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
        )}
      </div>
    </MainWrapper>
  );
};

export default EditorPage;
