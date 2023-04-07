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

export default function TabEditor({
  tab,
  Tab,
  code,
  widgetPath,
  updateCode,
  reformat,
}) {
  return (
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
  );
}
