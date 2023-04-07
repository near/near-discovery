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

export default function Preview({
  tab,
  Tab,
  layout,
  Layout,
  layoutClass,
  renderCode,
  jpath,
  parsedWidgetProps,
  isModule,
  renderPreviewButton,
}) {
  return (
    <div
      className={`${
        tab === Tab.Widget || (layout === Layout.Split && tab !== Tab.Metadata)
          ? layoutClass
          : "visually-hidden"
      }`}
    >
      <div style={{}}>
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
  );
}
