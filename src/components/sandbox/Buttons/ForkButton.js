import React from 'react';

export default function ForkButton({ forkFile, refs, disable }) {
  return (
    <div className="me-2">
      <div ref={refs.step1}>
        <button disabled={disable.forkButton} className="btn btn-outline-primary" onClick={forkFile}>
          Fork
        </button>
      </div>
    </div>
  );
}
