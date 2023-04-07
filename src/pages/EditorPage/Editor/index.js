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
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import RenameModal from "../../../components/Editor/RenameModal";
import OpenModal from "../../../components/Editor/OpenModal";
import OpenModuleModal from "../../../components/Editor/OpenModuleModal";
import AddModal from "../../../components/Editor/AddModal";
import CreateModal from "../../../components/Editor/CreateModal";
import { SaveDraftModal } from "../../../components/SaveDraft";
import styled from "styled-components";
import Editor from "@monaco-editor/react";
import Navigation from "../Navigation";
import Search from "./Search";
import Tabs from "./Tabs";
import NavigationSub from "./NavigationSub";
import TabEditor from "./TabEditor";
import TabProps from "./TabProps";
import TabMetadata from "./TabMetadata";
import Preview from "./Preview";
import PreviewMetadata from "./PreviewMetadata";

export default function EditorComponent({
  loadFile,
  openFile,
  removeFromFiles,
  createFile,
  setTab,
  setRenderCode,
  updateCode,
  reformat,
  setWidgetProps,
  reformatProps,
  //
  //
  jpath,
  path,
  widgetPath,
  widgetName,
  code,
  files,
  filesDetails,
  openCreateButton,
  renameButton,
  saveDraftButton,
  forkButton,
  publishDraftAsMainButton,
  publishButton,
  layoutClass,
  isModule,
  Tab,
  layout,
  accountId,
  openInNewTabButton,
  onLayoutChange,
  widgetProps,
  propsError,
  renderPreviewButton,
  tab,
  Layout,
  renderCode,
  logOut,
  tos,
  widgets,
  setMetadata,
  metadata,
  parsedWidgetProps,
}) {
  return (
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
          widgets={widgets}
          tos={tos}
          logOut={logOut}
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
                    widgets={widgets}
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
                widgets={widgets}
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
              widgets={widgets}
              metadata={metadata}
              accountId={accountId}
              widgetName={widgetName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
