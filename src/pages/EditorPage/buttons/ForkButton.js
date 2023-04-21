import React from "react";

export default ({ forkFile, refs }) => (
  <button
    ref={refs.step1}
    className="btn btn-outline-primary me-2"
    onClick={forkFile}
  >
    Fork
  </button>
);
