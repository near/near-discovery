import React from "react";
import styled from "styled-components";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

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

export default function FileTab({ file, closeFile, filesOpened }) {
  const jp = JSON.stringify(file);
  const widgetName = file?.name?.split("/")[0];

  let fileOpened = {};
  fileOpened =
    filesOpened.find((file) => {
      return file.name === widgetName;
    }) || {};

  return (
    <Nav.Item key={jp}>
      <TopMenu>
        <Nav.Link className="text-decoration-none d-flex" eventKey={jp}>
          <div className="d-flex">
            {fileOpened?.isDraft && <div className="draft">Draft</div>}
            <div>{widgetName}</div>
            {(!fileOpened?.savedOnChain || fileOpened?.changesMade) && (
              <div className="dot"></div>
            )}
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
              closeFile(file);
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </Nav.Link>
      </TopMenu>
    </Nav.Item>
  );
}
