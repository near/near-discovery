import React from "react";
import AddModalContent from "../Modals/AddModalContent";
import { ModalTypes } from "../utils/const";

export default function Welcome({ setShowModal, createFile, showEditor }) {
  const handleNew = (type) => {
    createFile(type);
    setShowModal(ModalTypes.RenameModal);
  };

  return (
    <div
      className={`text-center d-flex justify-content-center min-vh-100 ${
        showEditor ? `visually-hidden` : ``
      }`}
    >
      <div
        className="container-fluid mt-5"
        style={{
          width: "460px",
        }}
      >
        <h4 style={{ lineHeight: "50px" }}>
          Welcome to the Component Sandbox!
        </h4>
        <p className="text-secondary">
          Use this sandbox to create, inspect, modify, and compose components to
          create new experiences on NEAR.
        </p>
        <AddModalContent setShowModal={setShowModal} handleNew={handleNew} />
      </div>
    </div>
  );
}
