import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function OpenModal({ onHide, onConfirm, show }) {
  const [widgetSrc, setWidgetSrc] = useState("");

  const handleInput = (e) => {
    setWidgetSrc(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ""));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm(widgetSrc);
    setWidgetSrc("");
    onHide();
  };

  return (
    <Modal centered scrollable show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Open a Component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="widget-src-input" className="form-label text-secondary">
          Widget name <span className="text-muted">(or path)</span>
        </label>
        <input
          className="form-control"
          id="widget-src-input"
          type="text"
          value={widgetSrc}
          onChange={handleInput}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
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
