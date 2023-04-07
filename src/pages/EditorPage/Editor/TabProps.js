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

export default function TabProps({
  tab,
  Tab,
  widgetProps,
  setWidgetProps,
  reformatProps,
  propsError,
}) {
  return (
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
      {propsError && <pre className="alert alert-danger">{propsError}</pre>}
    </div>
  );
}
