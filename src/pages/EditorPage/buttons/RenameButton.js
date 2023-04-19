import React from "react";
import { ModalTypes } from "../utils/const";

export default ({ setShowModal }) => (
  <button
    className="btn btn-outline-success ms-2"
    style={{ height: "28px" }}
    onClick={() => setShowModal(ModalTypes.RenameModal)}
  >
    <i className="bi bi-pen"></i>
  </button>
);
