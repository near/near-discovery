import React from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

const TopMenu = styled.div`
  border-radius: 0.375rem;
  display: flex;
  color: #11181c;
  height: 40px;
  margin: 0 8px 0 0;

  &&& > a {
    border: 1px solid #e5e5e5;
    background: #fff;
    color: #11181c;
    padding-left: 6px;
    padding-right: 6px;

    .close {
      opacity: 0;
    }
  }

  &&& > a:hover {
    border: 1px solid #6c757d;

    .close {
      opacity: 1;
    }
  }
  &&& > a.active {
    border: 1px solid #6c757d;

    .close {
      opacity: 1;
    }
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
    margin-left: 8px;
  }

  .dot {
    background: #fff;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin: 7px 8px 0 4px;
  }

  .dot-red {
    background: #f45858;
  }

  .close {
    width: 28px;
    height: 28px;
  }
`;

export default ({ file, closeFile, disable }) => {
  const jpath = JSON.stringify({ type: file.type, name: file.name });
  const widgetName = file?.name?.split("/")[0];

  const dotRed = !file.savedOnChain || file.changesMade;

  return (
    <div style={{ position: "relative" }}>
      <div className={disable.fileTab ? "onboardingDisable" : ""}>
        <Nav.Item>
          <TopMenu>
            <Nav.Link className="text-decoration-none d-flex" eventKey={jpath}>
              <div className="d-flex">
                <div className={`dot ${dotRed ? `dot-red` : ``}`}></div>
                <div>{widgetName}</div>
                {file.isDraft && <div className="draft">Draft</div>}
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
                  closeFile({ type: file.type, name: file.name });
                }}
              >
                <i className="bi bi-x"></i>
              </button>
            </Nav.Link>
          </TopMenu>
        </Nav.Item>
      </div>
    </div>
  );
};
