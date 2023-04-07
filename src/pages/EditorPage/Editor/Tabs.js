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

export default function Tabs({
  isModule,
  tab,
  Tab,
  setTab,
  widgets,
  layout,
  setRenderCode,
  Layout,
  code,
}) {
  return (
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
          {widgets.widgetMetadataEditor && (
            <li className="nav-item">
              <button
                className={`nav-link ${
                  tab === Tab.Metadata ? "active" : "text-secondary"
                }`}
                aria-current="page"
                onClick={() => setTab(Tab.Metadata)}
              >
                Metadata
              </button>
            </li>
          )}
          {/* remove, and add show preview button on the right column */}
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
  );
}
