import React, { useMemo } from "react";
import { Widget } from "near-social-vm";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Search = ({ widgets, tos, logOut, loadAndOpenFile }) => {
  return (
    <>
      {widgets.editorComponentSearch && (
        <div>
          {/* We use the component search widget as a VM entry point to add a TOS check wrapper.
                It does not need to be this component, just some <Widget /> on the page */}
          <Widget
            src={tos.checkComponentPath}
            props={{
              logOut: logOut,
              tosName: tos.contentComponentPath,
              targetComponent: widgets.editorComponentSearch,
              targetProps: useMemo(
                () => ({
                  extraButtons: ({ widgetName, widgetPath, onHide }) => (
                    <OverlayTrigger
                      placement="auto"
                      overlay={
                        <Tooltip>
                          Open "{widgetName}" component in the editor
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-outline-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          loadAndOpenFile(widgetPath);
                          onHide && onHide();
                        }}
                      >
                        Open
                      </button>
                    </OverlayTrigger>
                  ),
                }),
                [loadAndOpenFile]
              ),
            }}
          />
        </div>
      )}
    </>
  );
};

export default Search;
