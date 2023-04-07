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

const TopMenu = styled.div`
  border-radius: 0.375rem;
  display: flex;
  color: #11181c;
  height: 40px;

  &&& > a.active {
    border: 1px solid #ced4da;
  }
  &&& > a {
    background: #fff;
    color: #11181c;
    padding-left: 6px;
    padding-right: 6px;
  }

  .draft {
    height: 24px;
    width: 50px;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
    color: #ad5700;
    font-size: 12px;
    border-radius: 50px;
    background-color: #ffecbc;
    margin-right: 6px;
  }

  .dot {
    background: #f45858;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin: 7px 8px 0;
  }

  .close {
    width: 28px;
    height: 28px;
  }
`;

export default function EditorComponent({
  renameFile,
  setShowRenameModal,
  loadFile,
  setShowOpenModal,
  setShowOpenModuleModal,
  setShowAddModal,
  createNewFile,
  setShowCreateModal,
  setShowSaveDraftModal,
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
  showRenameModal,
  path,
  showOpenModal,
  showOpenModuleModal,
  showAddModal,
  showCreateModal,
  showSaveDraftModal,
  near,
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
}) {
  console.log("Tab", Tab);
  return (
    <div className="container-fluid mt-1">
      <div className="">
        <div className="w-100 d-flex " style={{ flexWrap: "nowrap" }}>
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <Nav
              variant="pills mb-2 mt-2"
              activeKey={jpath}
              onSelect={(key) => openFile(JSON.parse(key))}
            >
              {files?.map((p, idx) => {
                if (p.unnamed) {
                  return;
                }

                const jp = JSON.stringify(p);
                const widgetName = p?.name?.split("/")[0];
                const { codeChangesPresent, isDraft } =
                  filesDetails?.get(widgetName) || {};

                return (
                  <Nav.Item key={jp}>
                    <TopMenu>
                      <Nav.Link
                        className="text-decoration-none d-flex"
                        eventKey={jp}
                      >
                        <div className="d-flex">
                          {isDraft && <div className="draft">Draft</div>}
                          <div>{widgetName}</div>
                          {codeChangesPresent && <div className="dot"></div>}
                        </div>
                        <button
                          className={`close btn btn-lg border-0 py-0 px-1 ms-1 rounded-circle btn-outline-secondary`}
                          style={{
                            marginTop: "-3px",
                            marginBottom: "0px",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFromFiles(p);
                            if (jp === jpath) {
                              if (files.length > 1) {
                                openFile(files[idx - 1] || files[idx + 1]);
                              } else {
                                createFile(Filetype.Widget);
                              }
                            }
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </Nav.Link>
                    </TopMenu>
                  </Nav.Item>
                );
              })}
              <Nav.Item className="me-1">
                {openCreateButton}
                {renameButton}
              </Nav.Item>
            </Nav>
          </div>
          <div
            className="d-flex ms-auto"
            style={{ minWidth: "280px", flexWrap: "wrap" }}
          >
            <Nav
              variant="pills mb-2 mt-2 ms-auto"
              activeKey={jpath}
              onSelect={(key) => openFile(JSON.parse(key))}
            >
              <Nav.Item className="">
                {saveDraftButton}
                {forkButton}

                {filesDetails?.get(widgetName)?.isDraft
                  ? publishDraftAsMainButton
                  : publishButton}
              </Nav.Item>
            </Nav>
          </div>
        </div>

        {widgets.editorComponentSearch && (
          <div>
            {/* We use the component search widget as a VM entry point to add a TOS check wrapper.
                It does not need to be this component, just some <Widget /> on the page */}
            <Widget
              src={tos.checkComponentPath}
              props={{
                logOut: logOut,
                tosName: tos.contentComponentPath,
                targetComponent: widgets.editorComponentSearch,
                targetProps: useMemo(
                  () => ({
                    extraButtons: ({ widgetName, widgetPath, onHide }) => (
                      <OverlayTrigger
                        placement="auto"
                        overlay={
                          <Tooltip>
                            Open "{widgetName}" component in the editor
                          </Tooltip>
                        }
                      >
                        <button
                          className="btn btn-outline-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            loadFile(widgetPath);
                            onHide && onHide();
                          }}
                        >
                          Open
                        </button>
                      </OverlayTrigger>
                    ),
                  }),
                  [loadFile]
                ),
              }}
            />
          </div>
        )}
      </div>
      <div className="d-flex align-content-start">
        <div className="flex-grow-1">
          <div className="row">
            <div className={layoutClass}>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div>
                  <ul
                    className={`nav nav-tabs`}
                    style={{
                      borderBottom: "0px",
                      marginTop: "9px",
                    }}
                  >
                    {isModule && (
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            tab === Tab.Editor ? "active" : "text-secondary"
                          }`}
                          aria-current="page"
                          onClick={() => setTab(Tab.Editor)}
                        >
                          Module
                        </button>
                      </li>
                    )}
                    {isModule || (
                      <>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              tab === Tab.Editor ? "active" : "text-secondary"
                            }`}
                            aria-current="page"
                            onClick={() => setTab(Tab.Editor)}
                          >
                            Component
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              tab === Tab.Props ? "active" : "text-secondary"
                            }`}
                            aria-current="page"
                            onClick={() => setTab(Tab.Props)}
                          >
                            Props
                          </button>
                        </li>
                        {/* {props.widgets.widgetMetadataEditor && (
                          <li className="nav-item">
                            <button
                              className={`nav-link ${
                                tab === Tab.Metadata
                                  ? "active"
                                  : "text-secondary"
                              }`}
                              aria-current="page"
                              onClick={() => setTab(Tab.Metadata)}
                            >
                              Metadata
                            </button>
                          </li>
                        )} */}
                        {layout === Layout.Tabs && (
                          <li className="nav-item">
                            <button
                              className={`nav-link ${
                                tab === Tab.Widget ? "active" : "text-secondary"
                              }`}
                              aria-current="page"
                              onClick={() => {
                                setRenderCode(code);
                                setTab(Tab.Widget);
                              }}
                            >
                              Component Preview
                            </button>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
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
