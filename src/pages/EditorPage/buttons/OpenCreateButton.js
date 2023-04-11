import React from "react";

export default function OpenCreateButton({ setShowAddModal }) {
  return (
    <button
      className="btn btn-success ms-2"
      onClick={() => setShowAddModal(true)}
      style={{
        fontSize: "20px",
        height: "40px",
        lineHeight: "38px",
        paddingTop: "0",
        marginTop: "0",
      }}
    >
      <i className="bi bi-plus"></i>
    </button>
  );
}
