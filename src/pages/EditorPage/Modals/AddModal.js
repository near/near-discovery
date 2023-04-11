import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Filetype } from "../utils/const";

export default function AddModal({
  onHide,
  onOpenComponent,
  onNewComponent,
  show,
  onNewModule,
  onOpenModule,
  createNewFile,
}) {
  const handleOpen = (open) => {
    onHide();
    open(true);
  };

  const handleNew = (type, open) => {
    createNewFile(type);
    handleOpen(open);
  };

  return (
    <Modal centered scrollable show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Component or Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-secondary mb-3">
          Open existing components or modules, or create your own.
        </div>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button
            className="btn btn-outline-success w-50 mr-5"
            onClick={() => handleOpen(onOpenComponent)}
          >
            Open Component
          </button>
          <button
            className="btn btn-success w-50"
            onClick={() => handleNew(Filetype.Widget, onNewComponent)}
          >
            Create New Component
          </button>
        </div>
        <div className="w-100 text-center text-secondary mb-2">or</div>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button
            className="btn btn-outline-primary w-50 mr-5"
            onClick={() => handleOpen(onOpenModule)}
          >
            Open Module
          </button>
          <button
            className="btn btn-primary w-50"
            onClick={() => handleNew(Filetype.Module, onNewModule)}
          >
            Create New Module
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
