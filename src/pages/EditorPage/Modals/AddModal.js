import React from "react";
import Modal from "react-bootstrap/Modal";
import { Filetype, ModalTypes } from "../utils/const";
import AddModalContent from "./AddModalContent";

export default function AddModal({
  onHide,
  showModal,
  setShowModal,
  createFile,
}) {
  const handleNew = (type) => {
    createFile(type);
    setShowModal(ModalTypes.RenameModal);
  };

  return (
    <Modal
      centered
      scrollable
      show={showModal === ModalTypes.AddModal}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a Component or Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-secondary mb-3">
          Open existing components or modules, or create your own.
        </div>
        <AddModalContent setShowModal={setShowModal} handleNew={handleNew} />
      </Modal.Body>
    </Modal>
  );
}
