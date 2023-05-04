import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { DISABLE_MODULES, Filetype, ModalTypes } from '../utils/const';

export default function AddModal({ onHide, showModal, setShowModal, createFile }) {
  const handleNew = (type) => {
    createFile(type);
    setShowModal();
  };

  return (
    <Modal centered scrollable show={showModal === ModalTypes.AddModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Component or Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-secondary mb-3">Open existing components or modules, or create your own.</div>
        <div class="text-center w-100">
          <button
            className="btn btn-outline-success px-0 w-100 mb-2"
            onClick={() => setShowModal(ModalTypes.OpenModal)}
          >
            Open Component
          </button>
          or
          <button className="btn btn-success px-0 w-100 my-2" onClick={() => handleNew(Filetype.Widget)}>
            Create New Component
          </button>
        </div>
        {!DISABLE_MODULES && (
          <>
            <div className="w-100 text-center text-secondary mb-2">or</div>
            <div class="btn-group w-100" role="group" aria-label="Basic example">
              <button
                className="btn btn-outline-primary w-50 mr-5"
                onClick={() => setShowModal(ModalTypes.OpenModuleModal)}
              >
                Open Module
              </button>
              <button className="btn btn-primary w-50" onClick={() => handleNew(Filetype.Module)}>
                Create New Module
              </button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
