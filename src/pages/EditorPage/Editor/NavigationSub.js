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

export default function NavigationSub({
  layout,
  Layout,
  path,
  accountId,
  openInNewTabButton,
  onLayoutChange,
  Tab,
  renderCode,
  renderPreviewButton,
  tab,
}) {
  return (
    <>
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
              {/* render code button as a separate component */}
              {renderCode && (
                <div className="d-flex justify-content-end me-2">
                  {renderPreviewButton}
                </div>
              )}
              {path?.type === "widget" && accountId && openInNewTabButton}
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
    </>
  );
}
