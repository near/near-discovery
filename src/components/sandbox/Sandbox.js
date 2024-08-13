import { PlaceholderCard } from '@near-pagoda/ui';
import ls from 'local-storage';
import { useRouter } from 'next/router';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useCurrentComponentStore } from '@/stores/current-component';
import { useVmStore } from '@/stores/vm';
import { recordHandledError } from '@/utils/analytics';

import { NearContext } from '../WalletSelector';
import BannerOboarding from './Banners/BannerOboarding';
import VsCodeBanner from './Banners/VsCodeBanner';
import MainWrapper from './css/MainWrapper';
import MobileBlocker from './Mobile/MobileBlocker';
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
import {
  EditorLayoutKey,
  fileObjectDefault,
  Filetype,
  getForkName,
  Layout,
  StorageDomain,
  StorageType,
  Tab,
  WidgetPropsKey,
} from './utils/const';
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

export const Sandbox = ({ onboarding = false }) => {
  const near = useVmStore((store) => store.near);
  const cache = useVmStore((store) => store.cache);
  const { signedAccountId, wallet } = useContext(NearContext);

  const router = useRouter();
  const widgets = useBosComponents();

  const [mainLoader, setMainLoader] = useState(false);
  const [filesObject, setFilesObject] = useState({});
  const [localChecked, setLocalChecked] = useState();
  const [path, setPath] = useState(undefined);
  const [lastPath, setLastPath] = useState(undefined);
  const [renderCode, setRenderCode] = useState();
  const [widgetProps, setWidgetProps] = useState(ls.get(WidgetPropsKey) || '{}');
  const [parsedWidgetProps, setParsedWidgetProps] = useState({});
  const [propsError, setPropsError] = useState(null);
  const [metadata, setMetadata] = useState(undefined);
  const [showModal, setShowModal] = useState(null);
  const [tab, setTab] = useState(Tab.Editor);
  const [layout, setLayoutState] = useState(ls.get(EditorLayoutKey) || Layout.Tabs);
  const [defaultWidget, setDefaultWidget] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [disable, setDisable] = useState({});

  const widgetName = path?.name?.split('/')[0];
  const widgetPath = `${signedAccountId}/${path?.type}/${path?.name}`;
  const jpath = JSON.stringify(path);
  const { isDraft } = filesObject[jpath] || {};
  const showEditor = !!Object.keys(filesObject)?.length || !localChecked;
  const isModule = path?.type === 'module';
  const layoutClass = layout === Layout.Split ? 'col-lg-6' : '';
  const shouldRender = !!near && !!cache;

  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  const getFileData = useCallback(
    (file) => {
      if (!file.src) {
        return;
      }

      const path = fileToPath(file);
      const jpath = fileToJpath(file);
      const widgetSrc = `${file.src}/**`;

      const fetchCode = () => {
        const widgetObject = cache.socialGet(near, widgetSrc, false, undefined, undefined, fetchCode);
        fetch(`${near.config.apiUrl}/keys`, {
          method: 'POST',
          body: JSON.stringify({ keys: [file.src], options: { return_type: 'BlockHeight' } }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((sourceWidget) => {
            const srcArr = file.src.split('/');
            const forkOf = file.src + '@' + sourceWidget[srcArr[0]][srcArr[1]][srcArr[2]];

            if (widgetObject && file.new) {
              const { codeMain, codeDraft, isDraft } = getWidgetDetails(widgetObject);
              const onChainCode = codeDraft || codeMain;
              cache
                .asyncLocalStorageGet(StorageDomain, {
                  path,
                  type: StorageType.Code,
                })
                .then(({ code } = {}) => {
                  setFilesObject((state) => ({
                    ...state,
                    [jpath]: {
                      ...state[jpath],
                      codeMain,
                      codeDraft,
                      isDraft,
                      savedOnChain: true,
                      changesMade: code ? checkChangesMade(onChainCode, codeDraft, code) : false,
                      codeLocalStorage: code || onChainCode,
                      codeVisible: code || state[jpath].codeVisible || onChainCode,
                      forkOf,
                    },
                  }));
                });
            }

            cache
              .asyncLocalStorageGet(StorageDomain, {
                path,
                type: StorageType.Code,
              })
              .then(({ code } = {}) => {
                setFilesObject((state) => ({
                  ...state,
                  [jpath]: {
                    ...state[jpath],
                    codeLocalStorage: code,
                    codeVisible: code || state[jpath].codeVisible,
                  },
                }));
              });
          });
      };
      fetchCode();
    },
    [cache, near],
  );

  const addFile = useCallback(
    (file) => {
      const newFilesObject = {
        ...filesObject,
        [fileToJpath(file)]: file,
      };
      setFilesObject(newFilesObject);
      updateLocalStorage(newFilesObject, fileToPath(file), cache);
    },
    [cache, filesObject],
  );

  const loadAndOpenFile = useCallback(
    (nameOrPath, type) => {
      const onboardingId = onboarding && 'near';
      const src = getSrcByNameOrPath(nameOrPath, onboardingId || signedAccountId, type);
      const path = toPath(type, nameOrPath);

      const newFile = {
        ...fileObjectDefault,
        ...path,
        src,
        codeMain: '',
        codeDraft: '',
        codeLocalStorage: '',
        isDraft: false,
        changesMade: false,
        savedOnChain: false,
        new: true,
      };
      addFile(newFile);
      setRenderCode(null);
      selectFile(path);
      getFileData(newFile);
    },
    [signedAccountId, addFile, getFileData, onboarding],
  );

  useEffect(() => {
    if (!defaultWidget || onboarding) {
      return;
    }

    setLocalChecked(true);
    loadAndOpenFile(defaultWidget, defaultWidget.split('/')[1]);
    setDefaultWidget(null);
    router.replace('/sandbox');
  }, [defaultWidget, loadAndOpenFile, onboarding, router]);

  const selectFile = (file) => {
    setPath(fileToPath(file));
    setLastPath(fileToPath(file));
    setMetadata(undefined);
  };

  const collectAllFileData = useCallback(
    (filesObject) => {
      Object.values(filesObject).map((file) => {
        getFileData(file);
      });
    },
    [getFileData],
  );

  const firstLoad = useCallback(() => {
    setComponentSrc(null);

    cache.asyncLocalStorageGet(StorageDomain, { type: StorageType.Files }).then(({ files, lastPath } = {}) => {
      let path;
      let filesObject;

      if (onboarding && currentStep === 1) {
        path = onboardingComponents.starter;
        filesObject = createFilesObject([onboardingComponents.starter]);
      } else if (onboarding && currentStep > 1) {
        path = onboardingComponents.starterFork;
        filesObject = createFilesObject([onboardingComponents.starter, onboardingComponents.starterFork]);
      } else {
        path = lastPath;
        filesObject = createFilesObject(files);
      }

      setFilesObject(filesObject);
      selectFile(filesObject[fileToJpath(path)]);
      collectAllFileData(filesObject);

      if (onboarding) {
        return;
      }

      const { componentSrc } = router.query;

      if (!Array.isArray(router.query.componentSrc)) {
        setLocalChecked(true);
        return;
      }

      setDefaultWidget(componentSrc.join('/'));
    });
  }, [cache, collectAllFileData, currentStep, onboarding, router.query, setComponentSrc]);

  const renameFile = (newName) => {
    const pathNew = nameToPath(path.type, newName);
    const jpathNew = fileToJpath(pathNew);

    const onboardingId = onboarding && 'near';
    const src = getSrcByNameOrPath(pathNew.name, onboardingId || signedAccountId, pathNew.type);

    setFilesObject((state) => {
      const newState = {
        ...state,
        [jpathNew]: {
          ...state[jpath],
          src,
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
    const jpath = JSON.stringify(path);

    setFilesObject((state) => ({
      ...state,
      [jpath]: {
        ...state[jpath],
        codeLocalStorage: code,
        codeVisible: code,
        savedOnChain: false,
        changesMade: checkChangesMade(state[jpath].codeMain, state[jpath].codeDraft, code),
      },
    }));
    updateCodeLocalStorage(path, code, cache);
  };

  const reformat = (path, code) => {
    try {
      const formattedCode = prettier.format(code, {
        parser: 'babel',
        plugins: [parserBabel],
      });
      changeCode(path, formattedCode);
    } catch (e) {
      console.error(e);
      recordHandledError({ scope: 'sandbox reformatting', message: e.message || e });
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
    setRenderCode(filesObject[JSON.stringify(path)]?.codeVisible);

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

  const forkFile = () => {
    const forkName = getForkName(widgetName);
    const forkPath = nameToPath(Filetype.Widget, forkName);
    const forkedFile = filesObject[JSON.stringify(path)];
    const newFile = {
      ...forkedFile,
      ...forkPath,
      codeDraft: '',
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
        localStorage.setItem(ONBOARDING_STORAGE, JSON.stringify({ step: nextStep }));
      }
    }
  };

  const createFile = (type) => {
    const newCode = getDefaultCode(type);
    const files = Object.values(filesObject).map((file) => ({
      type: file.type,
      name: file.name,
    }));

    const newName = generateNewName(type, files).name;

    const onboardingId = onboarding && 'near';
    const src = getSrcByNameOrPath(newName, onboardingId || signedAccountId, type);
    const path = toPath(type, newName);

    const newFile = {
      ...fileObjectDefault,
      ...path,
      src,
      type,
      name: newName,
      codeMain: '',
      codeDraft: '',
      codeLocalStorage: newCode,
      codeVisible: newCode,
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

  // possibly unused
  const reloadFile = () => {
    console.log('reloadFile which is never called');
    const onboardingPath = onboardingComponents.starter;
    selectFile(onboardingPath);
    setMainLoader(false);
    loadAndOpenFile('near/widget/Onboarding.Starter', Filetype.Widget);
  };

  const handleCommit = () => {
    loadAndOpenFile(lastPath.name, Filetype.Widget);
  };

  // onboarding
  const refs = generateRefs();
  const refEditor = useRef();
  const refSearch = useRef();

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

  useEffect(() => {
    const pathArr = router.asPath.split('/');
    if (onboarding && pathArr[2] === 'start') {
      setCurrentStep(0);
      router.replace('/onboarding');
    }
  }, [router, onboarding]);

  useEffect(() => {
    ls.set(WidgetPropsKey, widgetProps);
    try {
      const parsedWidgetProps = JSON.parse(widgetProps);
      setParsedWidgetProps(parsedWidgetProps);
      setPropsError(null);
    } catch (e) {
      setParsedWidgetProps({});
      setPropsError(e.message);
      recordHandledError({ scope: 'setting component props within the sandbox editor', message: e.message || e });
    }
  }, [widgetProps]);

  useEffect(() => {
    if (!cache || !near) {
      return;
    }
    firstLoad();
  }, [cache, firstLoad, near]);

  if (!shouldRender) return <PlaceholderCard />;

  return (
    <MainWrapper>
      <div>
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
              showModal={showModal}
              createFile={createFile}
              loadAndOpenFile={loadAndOpenFile}
              handleCommit={handleCommit}
              filesObject={filesObject}
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
                  logOut={wallet.signOut}
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
                  near={near}
                  path={path}
                  metadata={metadata}
                  closeFile={closeFile}
                  isDraft={isDraft}
                  changeFile={changeFile}
                  refs={refs}
                  onboarding={onboarding}
                  currentStep={currentStep}
                  requestSignIn={wallet.signIn}
                  disable={disable}
                  handleCommit={handleCommit}
                  accountId={signedAccountId}
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
                          disable={disable}
                          filesObject={filesObject}
                          path={path}
                        />
                        <NavigationSub
                          layout={layout}
                          path={path}
                          accountId={signedAccountId}
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
                            accountId={signedAccountId}
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
