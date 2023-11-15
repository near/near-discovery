import React from 'react';

export default function RenderPreviewButton({ refs, handleRender, disable }) {
  return (
    <div ref={refs.step9}>
      <div ref={refs.step4}>
        <button disabled={disable.renderPreviewButton} className="btn btn-outline-success" onClick={handleRender}>
          Render Preview
        </button>
      </div>
    </div>
  );
}
