import React from "react";
import { ModalTypes } from "../utils/const";

export default function RenameButton({ setShowRenameModal, setShowModal }) {
  return (
    <button
      className="btn btn-outline-success ms-2"
      style={{ height: "40px" }}
      onClick={() => setShowModal(ModalTypes.RenameModal)}
    >
      <i className="bi bi-pen"></i>
    </button>
  );
}
