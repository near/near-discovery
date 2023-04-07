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

export default function TabMetadata({
  tab,
  Tab,
  widgets,
  jpath,
  widgetPath,
  setMetadata,
}) {
  return (
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
  );
}
