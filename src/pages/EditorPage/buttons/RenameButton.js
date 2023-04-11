import React from "react";

export default function RenameButton({ setShowRenameModal }) {
  return (
    <button
      className="btn btn-outline-success ms-2"
      style={{ height: "40px" }}
      onClick={() => {
        setShowRenameModal(true);
      }}
    >
      <i className="bi bi-pen"></i>
    </button>
  );
}
