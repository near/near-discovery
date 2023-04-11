import React from "react";

export default function SaveDraftButton({ widgetName, setShowSaveDraftModal }) {
  return (
    <button
      className="btn btn-outline-primary me-2"
      disabled={!widgetName}
      onClick={() => {
        setShowSaveDraftModal(true);
      }}
    >
      Save Version
    </button>
  );
}
