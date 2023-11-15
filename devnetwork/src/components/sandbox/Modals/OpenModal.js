import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Filetype, ModalTypes } from '../utils/const';

export default function OpenModal({ onHide, onConfirm, showModal }) {
  const [nameOrPath, setNameOrPath] = useState('');

  const handleInput = (e) => {
    setNameOrPath(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ''));
  };

  const handleConfirm = () => {
    onConfirm(nameOrPath, Filetype.Widget);
    setNameOrPath('');
    onHide();
  };

  return (
    <Modal centered scrollable show={showModal === ModalTypes.OpenModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Open a Component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="widget-src-input" className="form-label text-secondary">
          Widget name <span className="text-muted">(or path)</span>
        </label>
        <input className="form-control" id="widget-src-input" type="text" value={nameOrPath} onChange={handleInput} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-success" disabled={!nameOrPath} onClick={handleConfirm}>
          Open
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
