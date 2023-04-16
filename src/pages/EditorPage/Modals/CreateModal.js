import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Filetype, ModalTypes } from "../utils/const";

export default function OpenModal({ onHide, onConfirm, showModal }) {
  const [widgetSrc, setWidgetSrc] = useState("");

  const handleSetNewName = (e) => {
    setWidgetSrc(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ""));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm(widgetSrc, Filetype.Widget);
    setWidgetSrc("");
    onHide();
  };

  return (
    <Modal
      centered
      scrollable
      show={showModal === ModalTypes.CreateModal}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="widget-src-input" className="form-label text-secondary">
          Component name
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
          className="btn btn-success"
          disabled={!widgetSrc}
          onClick={handleConfirm}
        >
          Create
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
