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

export default function PreviewMetadata({
  tab,
  Tab,
  layoutClass,
  jpath,
  widgets,
  metadata,
  accountId,
  widgetName,
}) {
  return (
    <div
      className={`${tab === Tab.Metadata ? layoutClass : "visually-hidden"}`}
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
  );
}
