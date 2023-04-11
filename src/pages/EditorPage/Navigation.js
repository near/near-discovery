import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import ForkButton from "./buttons/ForkButton";
import RenameButton from "./buttons/RenameButton";
import OpenCreateButton from "./buttons/OpenCreateButton";
import PublishButton from "./buttons/PublishButton";
import PublishDraftAsMainButton from "./buttons/PublishDraftAsMainButton";
import SaveDraftButton from "./buttons/SaveDraftButton";

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

export default function Navigation({
  jpath,
  openFile,
  files,
  filesDetails,
  createFile,
  widgetName,
  code,
  toPath,
  setShowRenameModal,
  setShowAddModal,
  near,
  path,
  metadata,
  setShowSaveDraftModal,
  setFiles,
  setLastPath,
}) {
  const removeFromFiles = useCallback(
    (path) => {
      path = JSON.stringify(path);
      setFiles((files) =>
        files.filter((file) => JSON.stringify(file) !== path)
      );
      setLastPath(path);
    },
    [setFiles, setLastPath]
  );

  return (
    <>
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
              <OpenCreateButton setShowAddModal={setShowAddModal} />
              <RenameButton setShowRenameModal={setShowRenameModal} />
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
              <SaveDraftButton
                widgetName={widgetName}
                setShowSaveDraftModal={setShowSaveDraftModal}
              />
              <ForkButton
                widgetName={widgetName}
                code={code}
                openFile={openFile}
                toPath={toPath}
              />

              {filesDetails?.get(widgetName)?.isDraft ? (
                <PublishDraftAsMainButton
                  widgetName={widgetName}
                  near={near}
                  path={path}
                  code={code}
                  metadata={metadata}
                />
              ) : (
                <PublishButton
                  widgetName={widgetName}
                  near={near}
                  path={path}
                  code={code}
                  metadata={metadata}
                />
              )}
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
}
