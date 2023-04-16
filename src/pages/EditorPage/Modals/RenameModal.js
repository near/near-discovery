import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalTypes } from "../utils/const";

export default function RenameModal({ showModal, name, onRename, onHide }) {
  const [newName, setNewName] = useState(name);

  const handleSetNewName = (e) => {
    setNewName(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-]/g, ""));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onRename(newName);
    onHide();
  };

  return (
    <Modal
      centered
      scrollable
      show={showModal === ModalTypes.RenameModal}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Rename Component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="rename-input" className="form-label text-secondary">
          New name
        </label>
        <input
          className="form-control"
          id="rename-input"
          type="text"
          value={newName}
          onChange={handleSetNewName}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
          disabled={!newName || newName === name}
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
