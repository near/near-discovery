import React from "react";

export default ({ widgetPath, disable }) => (
  <a
    disabled={disable.openInNewTabButton}
    className="btn me-2 btn-outline-secondary"
    style={{ height: "38px" }}
    href={`#/${widgetPath}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Open Component
  </a>
);
