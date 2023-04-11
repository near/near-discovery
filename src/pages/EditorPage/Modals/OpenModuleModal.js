import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Filetype } from "../utils/const";

export default function OpenModuleModal({ onHide, onConfirm, show }) {
  const [widgetSrc, setWidgetSrc] = useState("");

  const handleSetNewName = (e) => {
    setWidgetSrc(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ""));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm(widgetSrc, Filetype.Module);
    setWidgetSrc("");
    onHide();
  };

  return (
    <Modal centered scrollable show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Open a Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="widget-src-input" className="form-label text-secondary">
          Module name <span className="text-muted">(or path)</span>
        </label>
        <input
          className="form-control"
          id="widget-src-input"
          type="text"
          value={widgetSrc}
          onChange={handleSetNewName}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary"
          disabled={!widgetSrc}
          onClick={handleConfirm}
        >
          Open
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
