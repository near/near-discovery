import ls from 'local-storage';
import { useRouter } from 'next/router';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { useVmStore } from '@/stores/vm';
import { recordClick, recordPageView } from '@/utils/analytics';

import { Spinner } from '../lib/Spinner';
import BannerOboarding from './Banners/BannerOboarding';
import VsCodeBanner from './Banners/VsCodeBanner';
import Modals from './Modals';
import Navigation from './Navigation';
import NavigationSub from './NavigationSub';
import OnBoarding from './OnBoarding';
import Preview from './Preview';
import PreviewMetadata from './PreviewMetadata';
import Search from './Search';
import TabEditor from './TabEditor';
import TabMetadata from './TabMetadata';
import TabProps from './TabProps';
import Tabs from './Tabs';
import { EditorLayoutKey, Filetype, Layout, StorageDomain, StorageType, Tab, WidgetPropsKey } from './utils/const';
import {
  checkChangesMade,
  generateNewName,
  getDefaultCode,
  getSrcByNameOrPath,
  getWidgetDetails,
  toPath,
  updateLocalStorage,
} from './utils/editor';
import {
  generateRefs,
  getStepLocalStorage,
  ONBOARDING_STORAGE,
  onboardingComponents,
  onboardingDisable,
} from './utils/onboarding';
import Welcome from './Welcome';
import MainLoader from './Welcome/MainLoader';

const Wrapper = styled.div`
  .mobile {
    position: absolute;
    z-index: 95;
    width: 100%;
    height: 100%;
    background: #fff;
    display: none;
    top: 40px;

    h4 {
      color: #1b1b18;
      font-weight: 700;
    }
  }

  @media only screen and (max-width: 1200px) {
    .mobile {
      ${'' /* display: block; */}
    }
    .desktop {
      ${'' /* display: none; */}
    }
  }

  .glow {
    -webkit-animation: glowing 1000ms infinite;
    -moz-animation: glowing 1000ms infinite;
    -o-animation: glowing 1000ms infinite;
    animation: glowing 1000ms infinite;

    border-radius: 6px;

    @-webkit-keyframes glowing {
      0% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 3px #0d6efd;
      }
      50% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 15px #0d6efd;
      }
      100% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 3px #0d6efd;
      }
    }
    @keyframes glowing {
      0% {
        border-color: #0d6efd;
        box-shadow: 0 0 3px #0d6efd;
      }
      50% {
        border-color: #0d6efd;
        box-shadow: 0 0 15px #0d6efd;
      }
      100% {
        border-color: #0d6efd;
        box-shadow: 0 0 3px #0d6efd;
      }
    }
  }

  .onboardingDisable {
    &::before {
      border: 10px;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
      background: white;
      opacity: 0.5;
    }
  }
`;

export const Sandbox = ({ onboarding }) => {
  const near = useVmStore((store) => store.near);
  const cache = useVmStore((store) => store.cache);
  const accountId = useAuthStore((store) => store.accountId);
  const logOut = useAuthStore((store) => store.logOut);
  const requestSignIn = useAuthStore((store) => store.requestSignIn);
  const componentSrc = useCurrentComponentStore((store) => store.src);
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const router = useRouter();
  const widgets = useBosComponents();
  const tos = {
    checkComponentPath: widgets.tosCheck,
    contentComponentPath: widgets.tosContent,
  };

  const [mainLoader, setMainLoader] = useState(false);
  const [filesObject, setFilesObject] = useState({});
  const [codeVisible, setCodeVisible] = useState(undefined);
  const [path, setPath] = useState(undefined);
  const [lastPath, setLastPath] = useState(undefined);
  const [renderCode, setRenderCode] = useState(codeVisible);
  const [widgetProps, setWidgetProps] = useState('{}');
  const [parsedWidgetProps, setParsedWidgetProps] = useState({});
  const [propsError, setPropsError] = useState(null);
  const [metadata, setMetadata] = useState(undefined);
  const [showModal, setShowModal] = useState(null);
  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(Layout.Tabs);
  const [defaultWidget, setDefaultWidget] = useState(null);

  const widgetName = path?.name?.split('/')[0];
  const widgetPath = `${accountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);
  const { isDraft } = filesObject[jpath] || {};
  const showEditor = Object.keys(filesObject)?.length;
  const isModule = path?.type === 'module';
  const layoutClass = layout === Layout.Split ? 'col-lg-6' : '';
  const shouldRender = !!near && !!cache;

  useEffect(() => {
    setWidgetProps(ls.get(WidgetPropsKey) || '{}');
    setLayoutState(ls.get(EditorLayoutKey) || Layout.Tabs);
  }, []);

  useEffect(() => {
    const newFilesObject = { ...filesObject };

    Object.keys(filesObject).map((key) => {
      const file = filesObject[key];
      const { codeMain, codeDraft, codeLocalStorage } = file;

      const changesMade = checkChangesMade(codeMain, codeDraft, codeLocalStorage);
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
    router.replace('/sandbox');
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
    if (!cache || !near) return;

    cache.asyncLocalStorageGet(StorageDomain, { type: StorageType.Files }).then((res = {}) => {
      let onboardingPath;
      if (onboarding && currentStep === 1) {
        onboardingPath = onboardingComponents.starter;
        setLastPath(onboardingPath);
      }
      if (onboarding && currentStep > 1) {
        onboardingPath = onboardingComponents.starterFork;
        setLastPath(onboardingPath);
      }

      if (onboarding && currentStep === 1) {
        const onboardingPath = onboardingComponents.starter;
        near && createFilesObject([onboardingPath]);
        selectFile(onboardingPath);
        setMainLoader(false);
        return;
      }

      setLastPath(res.lastPath);
      near && createFilesObject(res.files || []);
      selectFile(res.lastPath);
      setMainLoader(false);

      if (componentSrc) {
        setComponentSrc(null);
        setDefaultWidget(componentSrc);
      }
    });
  }, [cache, near]);

  const reloadFile = () => {
    const onboardingPath = onboardingComponents.starter;
    near && createFilesObject([onboardingPath]);
    selectFile(onboardingPath);
    setMainLoader(false);
    loadAndOpenFile('near/widget/Onboarding.Starter', Filetype.Widget);
  };

  const createFilesObject = (files = []) => {
    const filesObject = files.reduce(
      (x, file) => ({
        ...x,
        [JSON.stringify({ type: file.type, name: file.name })]: {
          ...file,
          codeMain: '',
          codeDraft: '',
          codeLocalStorage: '',
          isDraft: false,
          changesMade: false,
          savedOnChain: undefined,
          new: true,
        },
      }),
      {},
    );
    setFilesObject(filesObject);

    Object.values(filesObject).map((fileObject) => {
      const path = { type: fileObject.type, name: fileObject.name };
      const jpath = JSON.stringify(path);
      const widgetSrc = `${accountId}/${fileObject.type}/${fileObject.name}/**`;

      const fetchCode = () => {
        const widgetObject = cache?.socialGet(near, widgetSrc, false, undefined, undefined, fetchCode);

        if (widgetObject && filesObject[jpath].new) {
          cache
            .asyncLocalStorageGet(StorageDomain, {
              path: path,
              type: StorageType.Code,
            })
            .then(({ code }) => {
              const { codeMain, codeDraft, isDraft } = getWidgetDetails(widgetObject);

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
    setRenderCode(null);
    updateCode(newPath, codeVisible);
  };

  const changeCode = (path, code) => {
    updateCode(path, code);

    const jpath = JSON.stringify(path);
    setFilesObject((files) => files[jpath] && (files[jpath].codeLocalStorage = code) && files);
  };

  const updateCode = (path, code) => {
    cache?.localStorageSet(
      StorageDomain,
      {
        path,
        type: StorageType.Code,
      },
      {
        code,
        time: Date.now(),
      },
    );
    setCodeVisible(code);
  };

  const reformat = (path, code) => {
    try {
      const formattedCode = prettier.format(code, {
        parser: 'babel',
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
      setRenderCode(null);
      updateLocalStorage(newFilesObject, newPath, cache);
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
        localStorage.setItem(ONBOARDING_STORAGE, JSON.stringify({ step: nextStep }));
      }
      if (currentStep === 9) {
        const nextStep = 10;
        setCurrentStep(nextStep);
        localStorage.setItem(ONBOARDING_STORAGE, JSON.stringify({ step: nextStep }));
      }
    }
  };

  const selectFile = (path) => {
    if (!path) return;

    setPath(path);
    setLastPath(path);
    setMetadata(undefined);
    cache
      .asyncLocalStorageGet(StorageDomain, {
        path,
        type: StorageType.Code,
      })
      .then((result) => {
        updateCode(path, result?.code);
      });
  };

  const updateFiles = (newFilesObject, lastPath) => {
    updateLocalStorage(newFilesObject, lastPath, cache);
    setFilesObject(newFilesObject);
  };

  const closeAllFiles = () => {
    Object.values(filesObject).map((file) => {
      closeFile({ type: file.type, name: file.name });
    });
  };

  const changeFile = (path) => {
    if (filesObject[JSON.stringify(path)]) {
      setRenderCode(null);
      selectFile(path);
      updateFiles(filesObject, path);
    }
  };

  const forkFile = () => {
    const forkName = widgetName + '-fork';
    const path = toPath(Filetype.Widget, forkName);

    addFile(filesObject, path, codeVisible, '', false, false);
    updateCode(path, codeVisible);
    setRenderCode(null);
    selectFile(path);

    if (onboarding) {
      if (currentStep === 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        localStorage.setItem(ONBOARDING_STORAGE, JSON.stringify({ step: nextStep }));
      }
    }
  };

  const createFile = (type) => {
    const files = Object.values(filesObject).map((file) => ({
      type: file.type,
      name: file.name,
    }));
    const path = generateNewName(type, files);
    const code = getDefaultCode(type);

    addFile(filesObject, path, code, '', false, false);
    updateCode(path, code);
    selectFile(path);
    setRenderCode(null);
  };

  const loadAndOpenFile = (nameOrPath, type) => {
    const onboardingId = onboarding && 'near';
    const widgetSrc = getSrcByNameOrPath(nameOrPath, onboardingId || accountId, type);
    const widgetSrcFull = `${widgetSrc}/**`;
    const cacheGet = () => {
      const widgetObject = cache?.socialGet(near, widgetSrcFull, false, undefined, undefined, cacheGet);

      if (widgetObject) {
        const { codeMain, codeDraft, isDraft } = getWidgetDetails(widgetObject);
        const codeCurrent = codeDraft || codeMain;
        const path = toPath(type, widgetSrc);

        addFile(filesObject, path, codeMain, codeDraft, isDraft, true);
        updateCode(path, codeCurrent);
        selectFile(path);
        setRenderCode(null);
      }
    };
    cacheGet();
  };

  const addFile = (filesObject, path, codeMain, codeDraft, isDraft, savedOnChain) => {
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

  const handleCommit = () => {
    loadAndOpenFile(lastPath.name, Filetype.Widget);
  };

  // onboarding
  const refs = generateRefs();
  const refEditor = useRef();
  const refSearch = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [disable, setDisable] = useState({});

  useEffect(() => {
    setCurrentStep(getStepLocalStorage().step);
  }, []);

  useEffect(() => {
    setDisable(onboarding ? onboardingDisable : {});
  }, [onboarding]);

  const handleExitOnboarding = () => {
    setCurrentStep(0);
    router.replace('/sandbox');
  };

  if (!shouldRender) return <Spinner />;

  return (
    <Wrapper>
      <div style={{ position: 'relative' }} onPointerUp={recordClick}>
        {onboarding && (
          <div className="mobile">
            <div className={`d-flex min-vh-100 `}>
              <div
                className="container-fluid mt-5"
                style={{
                  width: '500px',
                }}
              >
                <h4>{`Oops...We're gonna need a bigger screen.`}</h4>
                <br />
                Please visit the onboarding flow from a larger screen.
              </div>
            </div>
          </div>
        )}

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
              {onboarding && <BannerOboarding handleExitOnboarding={handleExitOnboarding} />}

              <div className="container-fluid mt-1" style={{ position: 'relative' }}>
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
                      <div style={{ display: 'flex' }}>
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
    </Wrapper>
  );
};
