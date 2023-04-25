import React from "react";

export default ({ forkFile, refs, disable }) => (
  <div className="me-2">
    <div ref={refs.step1}>
      <button
        disabled={disable.forkButton}
        className="btn btn-outline-primary"
        onClick={forkFile}
      >
        Fork
      </button>
    </div>
  </div>
);
