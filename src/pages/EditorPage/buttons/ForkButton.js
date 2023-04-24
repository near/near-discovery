import React from "react";

export default ({ forkFile, refs, disable }) => (
  <button
    ref={refs.step1}
    disabled={disable.forkButton}
    className="btn btn-outline-primary me-2"
    onClick={forkFile}
  >
    Fork
  </button>
);
