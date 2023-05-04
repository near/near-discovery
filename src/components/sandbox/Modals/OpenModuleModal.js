import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Filetype, ModalTypes } from '../utils/const';

export default function OpenModuleModal({ onHide, onConfirm, showModal }) {
  const [nameOrPath, setNameOrPath] = useState('');

  const handleSetNewName = (e) => {
    setNameOrPath(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ''));
  };

  const handleConfirm = () => {
    onConfirm(nameOrPath, Filetype.Module);
    setNameOrPath('');
    onHide();
  };

  return (
    <Modal centered scrollable show={showModal === ModalTypes.OpenModuleModal} onHide={onHide}>
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
          value={nameOrPath}
          onChange={handleSetNewName}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" disabled={!nameOrPath} onClick={handleConfirm}>
          Open
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
