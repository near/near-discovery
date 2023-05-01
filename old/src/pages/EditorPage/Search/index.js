import React, { useMemo } from "react";
import { Widget } from "near-social-vm";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Search = ({
  widgets,
  tos,
  logOut,
  loadAndOpenFile,
  refs,
  refSearch,
  disable,
}) => {
  return (
    <>
      {widgets.editorComponentSearch && (
        <div ref={refSearch} style={{ position: "relative" }}>
          <div className={disable.search ? "onboardingDisable" : ""}>
            <div style={{ width: "100%", minHeight: "48px" }}>
              <div ref={refs.step5}>
                <div ref={refs.step6}>
                  <div
                    ref={refs.step7}
                    style={{
                      marginTop: "10px",
                    }}
                  >
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
                            extraButtons: ({
                              widgetName,
                              widgetPath,
                              onHide,
                            }) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
