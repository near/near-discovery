import React from "react";
import { ModalTypes } from "../utils/const";

export default function SaveDraftButton({ widgetName, setShowModal }) {
  return (
    <button
      className="btn btn-outline-primary me-2"
      disabled={!widgetName}
      onClick={() => setShowModal(ModalTypes.SaveDraftModal)}
    >
      Save Version
    </button>
  );
}
