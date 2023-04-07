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
import Navigation from "./Navigation";
import Search from "./Search";
import Tabs from "./Tabs";

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
  console.log("Tab", Tab);
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
                {layout === Layout.Tabs && (
                  <div className="ms-auto d-flex">
                    {path?.type === "widget" && accountId && openInNewTabButton}

                    {path && (
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
                    )}
                  </div>
                )}
              </div>

              <div className={`${tab === Tab.Editor ? "" : "visually-hidden"}`}>
                <div
                  className="form-control mb-3"
                  style={{ height: "70vh", borderTopLeftRadius: "0px" }}
                >
                  <Editor
                    value={code}
                    path={widgetPath}
                    defaultLanguage="javascript"
                    onChange={(code) => updateCode(path, code)}
                    wrapperProps={{
                      onBlur: () => reformat(path, code),
                    }}
                  />
                </div>
                <div className="mb-3 d-flex gap-2 flex-wrap"></div>
              </div>
              <div className={`${tab === Tab.Props ? "" : "visually-hidden"}`}>
                <div className="form-control" style={{ height: "70vh" }}>
                  <Editor
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
                  tab === Tab.Metadata && widgets.widgetMetadataEditor
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
                    src={widgets.widgetMetadataEditor}
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
            </div>
            <div
              className={`${
                tab === Tab.Widget ||
                (layout === Layout.Split && tab !== Tab.Metadata)
                  ? layoutClass
                  : "visually-hidden"
              }`}
            >
              <div style={{}}>
                {tab === Tab.Widget || (
                  <div
                    style={{
                      height: "38px",
                      display: "flex",
                      marginBottom: "12px",
                      justifyContent: "end",
                    }}
                  >
                    {tab === Tab.Widget || (
                      <>
                        {renderCode && (
                          <div className="d-flex justify-content-end me-2">
                            {renderPreviewButton}
                          </div>
                        )}
                        {path?.type === "widget" &&
                          accountId &&
                          openInNewTabButton}
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Layout selection"
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
                      </>
                    )}
                  </div>
                )}
                <div
                  className="container"
                  style={
                    tab === Tab.Widget
                      ? {
                          border: "1px solid #ced4da",
                          appearance: "none",
                          borderRadius: "0.375rem",
                          height: "70vh",
                          maxWidth: "100%",
                          padding: "20px",
                        }
                      : {
                          padding: "20px",
                          border: "1px solid #ced4da",
                          appearance: "none",
                          borderRadius: "0.375rem",
                          height: "70vh",
                        }
                  }
                >
                  <div className="h-100 row">
                    <div className="d-inline-block position-relative overflow-auto h-100">
                      {renderCode ? (
                        <div
                          style={{
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          <Widget
                            key={`preview-${jpath}`}
                            code={renderCode}
                            props={parsedWidgetProps}
                          />
                        </div>
                      ) : (
                        !isModule && (
                          <div
                            style={{
                              padding: 0,
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {renderPreviewButton}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${
                tab === Tab.Metadata ? layoutClass : "visually-hidden"
              }`}
            >
              <div className="container" style={{ marginTop: "50px" }}>
                <div className="row">
                  <div className="d-inline-block position-relative overflow-hidden">
                    <Widget
                      key={`metadata-${jpath}`}
                      src={widgets.widgetMetadata}
                      props={useMemo(
                        () => ({ metadata, accountId, widgetName }),
                        [metadata, accountId, widgetName]
                      )}
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
}
